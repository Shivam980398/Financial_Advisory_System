// import React from "react";

// const FormComponent = ({
//   fields,
//   setEmail,
//   setName,
//   setNumber,
//   setPassword,
//   updateExpenseField, // Function to handle financial inputs
// }) => {
//   return (
//     <div>
//       <form action="" type="submit">
//         <div className="space-y-0 px-5">
//           {Object.keys(fields).map((key) => {
//             const field = fields[key];
//             console.log("key", key);
//             return (
//               <fieldset
//                 key={key}
//                 className="border-2 border-gray-300 rounded-md px-3 relative"
//               >
//                 <legend className="text-sm font-semibold px-2 text-[#6C25FF]">
//                   {field.label}{" "}
//                   {field.required && <span className="text-red-600">*</span>}
//                 </legend>
//                 <input
//                   type={field.type || "text"}
//                   id={key}
//                   placeholder={field.placeholder}
//                   required={field.required}
//                   className="w-full pb-2 outline-none bg-transparent"
//                   onChange={(e) => {
//                     const value = e.target.value;

//                     // Handling authentication fields
//                     if (key === "emailAddress" || key === "username") {
//                       setEmail(value);
//                     } else if (key === "fullName") {
//                       setName(value);
//                     } else if (key === "phoneNumber") {
//                       setNumber(value);
//                     } else if (key === "password") {
//                       setPassword(value);
//                     }

//                     // Handling expense-related fields
//                     if (
//                       [
//                         "salary",
//                         "Total_Food_Expenditure",
//                         "Restaurant_and_hotels_Expenditure",
//                         "Alcoholic_Beverages_and_Tobacco_Expenditure",
//                         "Clothing_Footwear_and_Other_Wear_Expenditure",
//                         "House_Rent__Water_and_Electricity_Expenditure",
//                         "Medical_Care_Expenditure",
//                         "Transportation_Expenditure",
//                         "Communication_Expenditure",
//                         "Education_Expenditure",
//                         "Miscellaneous_Goods_and_Services_Expenditure",
//                         "Savings",
//                       ].includes(key)
//                     ) {
//                       updateExpenseField(key, parseInt(value) || 10); // Ensures numerical values for expenses
//                     }
//                   }}
//                 />
//               </fieldset>
//             );
//           })}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormComponent;

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const FormComponent = ({
  fields,
  setEmail,
  setFirstName,
  setLastName,
  setPhone,
  setPassword,
  setConfirmPassword,
  updateExpenseField,
  expenseData,
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
  phone,
}) => {
  return (
    <div>
      <form action="" type="submit">
        <div className="space-y-0 px-5">
          {Object.keys(fields).map((key) => {
            const field = fields[key];
            return (
              <fieldset
                key={key}
                className="border-2 border-gray-300 rounded-md px-3 relative"
              >
                <legend className="text-sm font-semibold px-2 text-[#6C25FF]">
                  {field.label}{" "}
                  {field.required && <span className="text-red-600">*</span>}
                </legend>

                {key === "phone" ? (
                  <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="IN"
                    onChange={(value) => setPhone(value)}
                    className="w-full pb-2 outline-none bg-transparent"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    id={key}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full pb-2 outline-none bg-transparent"
                    // value={
                    //   [
                    //     "Total_Food_Expenditure",
                    //     "Restaurant_and_hotels_Expenditure",
                    //     "Alcoholic_Beverages_and_Tobacco_Expenditure",
                    //     "Clothing_Footwear_and_Other_Wear_Expenditure",
                    //     "House_Rent__Water_and_Electricity_Expenditure",
                    //     "Medical_Care_Expenditure",
                    //     "Transportation_Expenditure",
                    //     "Communication_Expenditure",
                    //     "Education_Expenditure",
                    //     "Miscellaneous_Goods_and_Services_Expenditure",
                    //     "Savings",
                    //   ].includes(key)
                    //     ? expenseData?.[key] ?? ""
                    //     : key === "email" ||
                    //       key === "emailAddress" ||
                    //       key === "username"
                    //     ? email
                    //     : key === "firstName"
                    //     ? firstName
                    //     : key === "lastName"
                    //     ? lastName
                    //     : key === "password"
                    //     ? password
                    //     : key === "number"
                    //     ? number
                    //     : key === "confirmPassword"
                    //     ? confirmPassword
                    //     : ""
                    // }
                    onChange={(e) => {
                      const value = e.target.value;

                      if (
                        key === "emailAddress" ||
                        key === "username" ||
                        key === "email"
                      ) {
                        setEmail(value);
                      } else if (key === "firstName") {
                        setFirstName(value);
                      } else if (key === "lastName") {
                        setLastName(value);
                      } else if (key === "password") {
                        setPassword(value);
                      } else if (key === "confirmPassword") {
                        setConfirmPassword(value);
                      }

                      if (
                        [
                          "salary",
                          "Total_Food_Expenditure",
                          "Restaurant_and_hotels_Expenditure",
                          "Alcoholic_Beverages_and_Tobacco_Expenditure",
                          "Clothing_Footwear_and_Other_Wear_Expenditure",
                          "House_Rent__Water_and_Electricity_Expenditure",
                          "Medical_Care_Expenditure",
                          "Transportation_Expenditure",
                          "Communication_Expenditure",
                          "Education_Expenditure",
                          "Miscellaneous_Goods_and_Services_Expenditure",
                          "Savings",
                        ].includes(key)
                      ) {
                        updateExpenseField(key, parseInt(value) || 0);
                      }
                      console.log("key", key, "value", value);
                    }}
                  />
                )}
              </fieldset>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
