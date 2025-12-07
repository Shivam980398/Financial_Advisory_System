// Dashboard.jsx

import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as BarTooltip,
} from "recharts";
import {
  DashboardContext,
  DashboardContextProvider,
} from "../context/dashboardContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28BD4",
  "#F95D6A",
  "#8DD1E1",
];

function Dashboard() {
  const {
    isLoading,
    errorMessage,
    statusMessages,
    salary,
    recommendedExpenses,
    filterType,
    setFilterType,
    pieData,
    barData,
    actualExpenses,
    spendingMessages,
    handleExportPDF,
    handleExportCSV,
  } = useContext(DashboardContext);
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading financial report...
      </div>
    );
  }
  return (
    // <DashboardContextProvider>
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">
        Finance Advisory Report
      </h1>

      {/* {errorMessage && (
        <div className="text-red-600 text-center mt-2">{errorMessage}</div>
      )} */}

      {statusMessages.length > 0 && (
        <div className="mt-4 max-w-2xl mx-auto text-center space-y-2">
          {statusMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded ${
                msg.startsWith("⚠️")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl text-center my-4">
        {salary && Number(salary) > 0
          ? `Using Provided Salary: ₹${salary}`
          : ` Household Income: ₹${Math.round(
              recommendedExpenses?.Savings || 0
            )}`}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-[350px]">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Recommended Financial Distribution
          </h3>
          <PieChart width={350} height={350}>
            <Pie
              dataKey="value"
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <PieTooltip />
          </PieChart>
        </div>

        <div className="w-[500px]">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Actual vs Recommended Expenses
          </h3>
          <BarChart width={500} height={350} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-20}
              textAnchor="end"
              interval={0}
              height={80}
            />
            <YAxis />
            <BarTooltip />
            <Legend />
            <Bar dataKey="Actual" fill="#8884d8" />
            <Bar dataKey="Recommended" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      <div className="text-center mt-4">
        <label className="font-semibold mr-2">Filter by Status:</label>
        <select
          className="border px-3 py-1 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="⚠️ Overspending">⚠️ Overspending</option>
          <option value="✅ Balanced spending">✅ Balanced spending</option>
          <option value="✅ Saving well">✅ Saving well</option>
          <option value="⚠️ Saving less">⚠️ Saving less</option>
          <option value="✅ Underspending">✅ Underspending</option>
        </select>
      </div>

      <div className="overflow-x-auto mt-6">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Recommendation Table
        </h3>
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Recommended</th>
              <th className="px-4 py-2 border">Actual</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(recommendedExpenses)
              .filter(([category]) => {
                const msg = spendingMessages[category] || "";
                return filterType === "All" || msg.startsWith(filterType);
              })
              .map(([category, value], idx) => (
                <tr key={idx} className="text-center">
                  <td className="border px-4 py-2">{category}</td>
                  <td className="border px-4 py-2">₹{value}</td>
                  <td className="border px-4 py-2">
                    ₹{actualExpenses[category] || 0}
                  </td>
                  <td className="border px-4 py-2">
                    {spendingMessages[category]}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Export to PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export to CSV
          </button>
        </div>
      </div>

      <div className="text-center mt-6   w-full relative">
        <button
          onClick={() => navigate("/expensesinputform")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute left-0 bottom-2.5"
        >
          Input New Details
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4 absolute right-0 bottom-2.5"
        >
          Go to Home
        </button>
      </div>
    </div>
    // </DashboardContextProvider>
  );
}

export default Dashboard;
