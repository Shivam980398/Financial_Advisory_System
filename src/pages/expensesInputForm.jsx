import React, { useContext, useState } from "react";
import { dataToSend } from "../context/dataToSend";
import { expenseFormFields } from "../assets/expensFormFields";
import FormComponent from "../components/formComponent";
import { useNavigate } from "react-router-dom";

const ExpensesInputForm = () => {
  const navigate = useNavigate();
  const [compareSalary, setCompareSalary] = useState(null);
  const contextData = useContext(dataToSend);

  const handlePredict = () => {
    // Apply fallback values before logging

    // Log final data
    console.log("Context Data Before Predict:", {
      salary: contextData.salary,
      Total_Food_Expenditure: contextData.totalFoodExpenditure,
      Restaurant_and_hotels_Expenditure:
        contextData.restaurantAndHotelsExpenditure,
      Alcoholic_Beverages_and_Tobacco_Expenditure:
        contextData.alcoholicBeveragesAndTobaccoExpenditure,
      Clothing_Footwear_and_Other_Wear_Expenditure:
        contextData.clothingFootwearAndOtherWearExpenditure,
      House_Rent__Water_and_Electricity_Expenditure:
        contextData.houseRentWaterAndElectricityExpenditure,
      Medical_Care_Expenditure: contextData.medicalCareExpenditure,
      Transportation_Expenditure: contextData.transportationExpenditure,
      Communication_Expenditure: contextData.communicationExpenditure,
      Education_Expenditure: contextData.educationExpenditure,
      Miscellaneous_Goods_and_Services_Expenditure:
        contextData.miscellaneousGoodsAndServicesExpenditure,
      Savings: contextData.savings,
    });

    navigate("/report");
  };

  return (
    <div className="w-auto max-w-250 flex-wrap h-fit m-5 border-none">
      <div className="m-5">
        <h1 className="font-sans font-bold text-xl">
          Enter UR Expenses to get a better prediction
        </h1>
      </div>

      <div className="px-3">
        <label className="text-sm font-semibold px-2 text-[#6C25FF]">
          <span className="text-red-600">*</span> Do you want to compare salary?
        </label>
        <br />
        <input
          type="radio"
          name="compareSalary"
          value="yes"
          className="ml-3"
          required
          onChange={() => setCompareSalary(true)}
        />{" "}
        Yes
        <input
          type="radio"
          name="compareSalary"
          value="no"
          className="ml-1"
          required
          onChange={() => setCompareSalary(false)}
        />{" "}
        No
        <span className="text-red-600">*</span>
        {compareSalary && (
          <div className="mt-3">
            <label className="text-sm font-semibold px-2 text-[#6C25FF]">
              Enter Your Salary
            </label>
            <br />
            <input
              type="number"
              placeholder="Enter Salary"
              className="border rounded-md px-3 py-2"
              value={contextData.salary}
              onChange={(e) => contextData.setSalary(Number(e.target.value))}
            />
          </div>
        )}
      </div>

      <FormComponent
        fields={expenseFormFields}
        updateExpenseField={contextData.updateExpenseField}
        expenseData={{
          salary: contextData.salary,
          Total_Food_Expenditure: contextData.totalFoodExpenditure,
          Restaurant_and_hotels_Expenditure:
            contextData.restaurantAndHotelsExpenditure,
          Alcoholic_Beverages_and_Tobacco_Expenditure:
            contextData.alcoholicBeveragesAndTobaccoExpenditure,
          Clothing_Footwear_and_Other_Wear_Expenditure:
            contextData.clothingFootwearAndOtherWearExpenditure,
          House_Rent__Water_and_Electricity_Expenditure:
            contextData.houseRentWaterAndElectricityExpenditure,
          Medical_Care_Expenditure: contextData.medicalCareExpenditure,
          Transportation_Expenditure: contextData.transportationExpenditure,
          Communication_Expenditure: contextData.communicationExpenditure,
          Education_Expenditure: contextData.educationExpenditure,
          Miscellaneous_Goods_and_Services_Expenditure:
            contextData.miscellaneousGoodsAndServicesExpenditure,
          Savings: contextData.savings,
        }}
      />

      <div className="bottom-8 mt-5 flex justify-center align-bottom self-end">
        <button
          onClick={handlePredict}
          className="w-80 bg-[#6C25FF] text-center text-white text-xl py-2 px-12 rounded-md font-medium"
        >
          Predict
        </button>
      </div>
    </div>
  );
};

export default ExpensesInputForm;
