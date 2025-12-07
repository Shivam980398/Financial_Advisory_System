import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const Backend_API = "https://sofia-node.onrender.com/api/v1";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = document.cookie.split("=")[1];
        const res = await axios.get(`${Backend_API}/predictions`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setHistory(res.data.predictions || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Prediction History
      </h1>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Predicted Income</th>
            <th className="px-4 py-2 border">Salary</th>
            <th className="px-4 py-2 border">Top Category</th>
            <th className="px-4 py-2 border">Expenses</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">₹{item.predictedIncome}</td>
              <td className="border px-4 py-2">₹{item.salary || "N/A"}</td>
              <td className="border px-4 py-2">
                {
                  Object.entries(item.recommendations || {}).sort(
                    (a, b) => b[1] - a[1]
                  )[0]?.[0]
                }
              </td>
              <td className="border px-4 py-2 text-left">
                <ul className="list-disc pl-4">
                  {item.features &&
                    Object.entries(item.features).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key.replaceAll("_", " ")}:</strong> ₹{value}
                      </li>
                    ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
