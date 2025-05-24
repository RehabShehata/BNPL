// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import InstallmentCalendar from "../components/InstallmentCalendar";

const UserDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/plans/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setPlans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed", err);
        setLoading(false);
      });
  }, []);

  const handlePay = (installmentId) => {
    axios
      .post(`${API_BASE_URL}/api/installments/${installmentId}/pay/`, {}, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => {
        setPlans((prev) =>
          prev.map((plan) => ({
            ...plan,
            installments: plan.installments.map((inst) =>
              inst.id === installmentId ? { ...inst, status: "Paid" } : inst
            ),
          }))
        );
      })
      .catch((err) => console.error("Payment error", err));
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-6">
      {plans.map((plan) => {
        const paid = plan.installments.filter((i) => i.status === "Paid").length;
        const total = plan.installments.length;
        const progress = Math.round((paid / total) * 100);

        return (
          <div key={plan.id} className="border rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-2">
              Plan #{plan.id} – {paid}/{total} Paid - Plan Status: {plan.status}
            </h3>
            <div className="w-full bg-gray-200 h-4 rounded-full mb-4">
              <div
                className="h-4 bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <table className="w-1/3 text-sm mb-4">
              <thead >
                <tr>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {plan.installments.map((inst) => (
                  <tr key={inst.id}>
                    <td>{inst.due_date}</td>
                    <td>{inst.amount_due}</td>
                    <td
                      className={
                        inst.status === "Paid"
                          ? "text-green-600"
                          : inst.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }
                    >
                      {inst.status}
                    </td>
                    <td>
                      {inst.status === "Pending" && (
                        <button
                        disabled = {!((plan.installments.find(x=>inst.id - x.id === 1)?.status === "Paid") 
                          || plan.installments.findIndex(x=>x.id === inst.id) === 0)}
                          onClick={() => handlePay(inst.id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <InstallmentCalendar installments={plan.installments} />
          </div>
        );
      })}
    </div>
  );
};

export default UserDashboard;
