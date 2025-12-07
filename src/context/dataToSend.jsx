import { createContext, useState } from "react";

export const dataToSend = createContext(null);

const DataToSendProvider = (props) => {
  // State declarations
  const [salary, setSalary] = useState(0);
  const [totalFoodExpenditure, setTotalFoodExpenditure] = useState(0);
  const [restaurantAndHotelsExpenditure, setRestaurantAndHotelsExpenditure] =
    useState(0);
  const [
    alcoholicBeveragesAndTobaccoExpenditure,
    setAlcoholicBeveragesAndTobaccoExpenditure,
  ] = useState(0);
  const [
    clothingFootwearAndOtherWearExpenditure,
    setClothingFootwearAndOtherWearExpenditure,
  ] = useState(0);
  const [
    houseRentWaterAndElectricityExpenditure,
    setHouseRentWaterAndElectricityExpenditure,
  ] = useState(0);
  const [medicalCareExpenditure, setMedicalCareExpenditure] = useState(0);
  const [transportationExpenditure, setTransportationExpenditure] = useState(0);
  const [communicationExpenditure, setCommunicationExpenditure] = useState(0);
  const [educationExpenditure, setEducationExpenditure] = useState(0);
  const [
    miscellaneousGoodsAndServicesExpenditure,
    setMiscellaneousGoodsAndServicesExpenditure,
  ] = useState(0);
  const [savings, setSavings] = useState(0);

  // Function to update state dynamically
  const updateExpenseField = (key, value) => {
    switch (key) {
      case "salary":
        setSalary(value);
        break;
      case "Total_Food_Expenditure":
        setTotalFoodExpenditure(value);
        break;
      case "Restaurant_and_hotels_Expenditure":
        setRestaurantAndHotelsExpenditure(value);
        break;
      case "Alcoholic_Beverages_and_Tobacco_Expenditure":
        setAlcoholicBeveragesAndTobaccoExpenditure(value);
        break;
      case "Clothing_Footwear_and_Other_Wear_Expenditure":
        setClothingFootwearAndOtherWearExpenditure(value);
        break;
      case "House_Rent__Water_and_Electricity_Expenditure":
        setHouseRentWaterAndElectricityExpenditure(value);
        break;
      case "Medical_Care_Expenditure":
        setMedicalCareExpenditure(value);
        break;
      case "Transportation_Expenditure":
        setTransportationExpenditure(value);
        break;
      case "Communication_Expenditure":
        setCommunicationExpenditure(value);
        break;
      case "Education_Expenditure":
        setEducationExpenditure(value);
        break;
      case "Miscellaneous_Goods_and_Services_Expenditure":
        setMiscellaneousGoodsAndServicesExpenditure(value);
        break;
      case "Savings":
        setSavings(value);
        break;
      default:
        console.warn(`Unknown expense key: ${key}`);
    }
  };

  const contextValue = {
    salary,
    setSalary,
    totalFoodExpenditure,
    setTotalFoodExpenditure,
    restaurantAndHotelsExpenditure,
    setRestaurantAndHotelsExpenditure,
    alcoholicBeveragesAndTobaccoExpenditure,
    setAlcoholicBeveragesAndTobaccoExpenditure,
    clothingFootwearAndOtherWearExpenditure,
    setClothingFootwearAndOtherWearExpenditure,
    houseRentWaterAndElectricityExpenditure,
    setHouseRentWaterAndElectricityExpenditure,
    medicalCareExpenditure,
    setMedicalCareExpenditure,
    transportationExpenditure,
    setTransportationExpenditure,
    communicationExpenditure,
    setCommunicationExpenditure,
    educationExpenditure,
    setEducationExpenditure,
    miscellaneousGoodsAndServicesExpenditure,
    setMiscellaneousGoodsAndServicesExpenditure,
    savings,
    setSavings,
    updateExpenseField, // Adding function to context
  };

  return (
    <dataToSend.Provider value={contextValue}>
      {props.children}
    </dataToSend.Provider>
  );
};

export default DataToSendProvider;
