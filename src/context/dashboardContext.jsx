import { createContext } from "react";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { dataToSend } from "./dataToSend";
export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const {
    salary,
    totalFoodExpenditure,
    restaurantAndHotelsExpenditure,
    alcoholicBeveragesAndTobaccoExpenditure,
    clothingFootwearAndOtherWearExpenditure,
    houseRentWaterAndElectricityExpenditure,
    medicalCareExpenditure,
    transportationExpenditure,
    communicationExpenditure,
    educationExpenditure,
    miscellaneousGoodsAndServicesExpenditure,
    savings,
  } = useContext(dataToSend);

  const [predictedIncome, setPredictedIncome] = useState(null);
  const [recommendedExpenses, setRecommendedExpenses] = useState({});
  const [actualExpenses, setActualExpenses] = useState({});
  const [statusMessages, setStatusMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [spendingMessages, setSpendingMessages] = useState({});
  const [filterType, setFilterType] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Helper local fallback spending messages
  const calculateSpendingMessages = (actualData, recommendations) => {
    const safeActualData = actualData || {};
    const safeRecommendations = recommendations || {};
    const messages = {};
    Object.entries(safeActualData).forEach(([category, actual]) => {
      const recommended = safeRecommendations?.[category] || 0;
      const diff = Math.round((actual || 0) - (recommended || 0));

      if (category === "Savings") {
        messages[category] =
          diff >= 0
            ? `✅ Saving well by ₹${diff}`
            : `⚠️ Saving less by ₹${Math.abs(diff)}`;
      } else if (recommended === 0) {
        // if no recommendation available treat as balanced if actual is zero else overspending
        messages[category] =
          actual === 0 ? `✅ Balanced spending` : `⚠️ Overspending by ₹${diff}`;
      } else if (actual <= recommended * 1.1 && actual >= recommended * 0.9) {
        messages[category] = `✅ Balanced spending`;
      } else if (actual > recommended * 1.1) {
        messages[category] = `⚠️ Overspending by ₹${diff}`;
      } else {
        messages[category] = `✅ Underspending by ₹${Math.abs(diff)}`;
      }
    });
    return messages;
  };

  // Use env var for python backend (default fallback)
  const PY_API = "https://sofia-ml.onrender.com";
  const Backend_API = "https://sofia-node.onrender.com/api/v1";

  // Build expense data object
  const buildExpenseData = () => ({
    Total_Food_Expenditure: Number(totalFoodExpenditure) || 0,
    Restaurant_and_hotels_Expenditure:
      Number(restaurantAndHotelsExpenditure) || 0,
    Alcoholic_Beverages_and_Tobacco_Expenditure:
      Number(alcoholicBeveragesAndTobaccoExpenditure) || 0,
    Clothing_Footwear_and_Other_Wear_Expenditure:
      Number(clothingFootwearAndOtherWearExpenditure) || 0,
    House_Rent__Water_and_Electricity_Expenditure:
      Number(houseRentWaterAndElectricityExpenditure) || 0,
    Medical_Care_Expenditure: Number(medicalCareExpenditure) || 0,
    Transportation_Expenditure: Number(transportationExpenditure) || 0,
    Communication_Expenditure: Number(communicationExpenditure) || 0,
    Education_Expenditure: Number(educationExpenditure) || 0,
    Miscellaneous_Goods_and_Services_Expenditure:
      Number(miscellaneousGoodsAndServicesExpenditure) || 0,
    Savings: Number(savings) || 0,
  });

  // Fetch new prediction from Python backend
  const fetchNewPrediction = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const expenseData = buildExpenseData();
      console.log(expenseData);
      const pythonResponse = await axios.post(
        `${PY_API}/predict`,
        // send using older shape to be compatible with your Flask
        {
          features: expenseData,
          salary: Number(salary) || null,
        }
      );

      const data = pythonResponse.data || {};
      // backend fields: predicted_income, recommendations, warning, overspending
      const predicted_income = data.predicted_income;
      const recommendations =
        data.recommendations || data.recommendations || {};
      const warning = data.warning || null;
      const overspending = data.overspending || null;

      // NOTE: do NOT set PredictedIncome from server (as requested)
      // setPredictedIncome(predicted_income);   <-- intentionally removed

      // Update UI states
      setRecommendedExpenses(recommendations || {});
      setActualExpenses(expenseData);
      setStatusMessages([...(warning ? [warning] : [])]);

      // prefer server messages, fallback to local compute
      setSpendingMessages(
        overspending || calculateSpendingMessages(expenseData, recommendations)
      );

      setErrorMessage(null);

      // Save prediction to Node backend (existing flow)
      try {
        const token = document.cookie.split("=")[1];
        await axios.post(
          `${Backend_API}/predict`,
          {
            salary: Number(salary) || null,
            features: expenseData,
            predictedIncome: predicted_income,
            recommendations,
            warnings: warning || null,
            overspendingMessages: overspending || {},
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } catch (saveErr) {
        // Log but do not fail UI
        console.warn(
          "Warning: Failed to save prediction to Node backend:",
          saveErr?.response?.data || saveErr.message
        );
      }
    } catch (err) {
      console.error(
        "API Error (New Prediction):",
        err.response?.data || err.message
      );
      setErrorMessage("Failed to generate new financial report.");
    } finally {
      setIsLoading(false);
    }
  }, [
    salary,
    totalFoodExpenditure,
    restaurantAndHotelsExpenditure,
    alcoholicBeveragesAndTobaccoExpenditure,
    clothingFootwearAndOtherWearExpenditure,
    houseRentWaterAndElectricityExpenditure,
    medicalCareExpenditure,
    transportationExpenditure,
    communicationExpenditure,
    educationExpenditure,
    miscellaneousGoodsAndServicesExpenditure,
    savings,
    PY_API,
  ]);

  // Fetch last saved prediction from Node backend
  const fetchLastPrediction = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = document.cookie.split("=")[1];
      const response = await axios.get(`${Backend_API}/predictions`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const predictions = response.data?.predictions;

      if (!predictions || predictions.length === 0) {
        throw new Error("No predictions found from backend.");
      }

      // Already sorted by backend (createdAt: -1)
      const latest = predictions[0];

      const {
        predictedIncome: savedPredictedIncome,
        recommendations: savedRecommendations = {},
        features: savedFeatures = {},
        warnings: savedWarning,
        overspendingMessages: savedOverspendingMessages = {},
      } = latest;

      // Set UI using saved values
      setPredictedIncome(savedPredictedIncome ?? null);
      setRecommendedExpenses(savedRecommendations);
      setActualExpenses(savedFeatures);
      setStatusMessages([...(savedWarning ? [savedWarning] : [])]);

      setSpendingMessages(
        Object.keys(savedOverspendingMessages).length > 0
          ? savedOverspendingMessages
          : calculateSpendingMessages(savedFeatures, savedRecommendations)
      );

      setErrorMessage(null);
    } catch (err) {
      console.error(
        "API Error (Last Prediction):",
        err.response?.data || err.message
      );
      setErrorMessage(
        "No previous financial report found or failed to load. Please input new details."
      );
      setPredictedIncome(null);
      setRecommendedExpenses({});
      setActualExpenses({});
      setStatusMessages([]);
      setSpendingMessages({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  // only fetch when inputs change or if no inputs, fetch last
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    const hasNewInput = Object.values({
      salary,
      totalFoodExpenditure,
      restaurantAndHotelsExpenditure,
      alcoholicBeveragesAndTobaccoExpenditure,
      clothingFootwearAndOtherWearExpenditure,
      houseRentWaterAndElectricityExpenditure,
      medicalCareExpenditure,
      transportationExpenditure,
      communicationExpenditure,
      educationExpenditure,
      miscellaneousGoodsAndServicesExpenditure,
      savings,
    }).some((val) => Number(val) > 0);

    if (hasNewInput) {
      if (!hasFetchedRef.current) {
        console.log("New input detected, fetching new prediction...");
        fetchNewPrediction();
        hasFetchedRef.current = true;
      }
    } else {
      console.log("No new input, fetching last prediction from database...");
      fetchLastPrediction();
      hasFetchedRef.current = false;
    }
  }, [
    salary,
    totalFoodExpenditure,
    restaurantAndHotelsExpenditure,
    alcoholicBeveragesAndTobaccoExpenditure,
    clothingFootwearAndOtherWearExpenditure,
    houseRentWaterAndElectricityExpenditure,
    medicalCareExpenditure,
    transportationExpenditure,
    communicationExpenditure,
    educationExpenditure,
    miscellaneousGoodsAndServicesExpenditure,
    savings,
    fetchNewPrediction,
    fetchLastPrediction,
  ]);

  // prepare chart data
  const pieData = Object.keys(recommendedExpenses).map((key) => ({
    name: key,
    value: recommendedExpenses[key],
  }));

  const barData = Object.keys(actualExpenses).map((key) => ({
    name: key,
    Actual: actualExpenses[key],
    Recommended: recommendedExpenses[key] || 0,
  }));

  // Export handlers (unchanged)
  const handleExportPDF = () => {
    const input = document.querySelector("table");
    if (!input) {
      console.error("No table data to export!");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("financial_report.pdf");
    });
  };

  const handleExportCSV = () => {
    const filteredData = Object.entries(recommendedExpenses)
      .filter(([category]) => {
        const msg = spendingMessages[category] || "";
        return filterType === "All" || msg.startsWith(filterType.split(" ")[0]);
      })
      .map(([category, recommended]) => ({
        Category: category,
        Recommended: recommended,
        Actual: actualExpenses[category] || 0,
        Status: spendingMessages[category] || "",
      }));

    if (filteredData.length === 0) {
      console.error("No data to export based on current filter!");
      return;
    }

    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardContext.Provider
      value={{
        predictedIncome,
        recommendedExpenses,
        actualExpenses,
        statusMessages,
        spendingMessages,
        filterType,
        setFilterType,
        handleExportPDF,
        handleExportCSV,
        isLoading,
        errorMessage,
        barData,
        pieData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
