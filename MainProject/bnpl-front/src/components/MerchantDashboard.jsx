// src/pages/MerchantDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const MerchantDashboard = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [numInstallments, setNumInstallments] = useState(4);
  const [startDate, setStartDate] = useState("");
  const [plans, setPlans] = useState([]);

  const token = localStorage.getItem("token");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

  const fetchPlans = () => {
    axios
      .get(`${API_BASE_URL}/api/plans/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Fetch plans error", err));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreatePlan = (e) => {
    e.preventDefault();

    axios
      .post(
        `${API_BASE_URL}/api/plans/`,
        {
          total_amount: parseFloat(amount),
          customer_email: email,
          number_of_installments: parseInt(numInstallments),
          start_date: startDate,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then(() => {
        alert("Plan created successfully");
        fetchPlans();
        setAmount("");
        setEmail("");
        setNumInstallments(4);
        setStartDate("");
      })
      .catch((err) => {
        console.error("Create plan error", err);
        alert("Failed to create plan");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Create a BNPL Plan</h2>

      <form onSubmit={handleCreatePlan} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          className="w-full border p-2"
          type="number"
          placeholder="Total Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="number"
          placeholder="Number of Installments"
          value={numInstallments}
          onChange={(e) => setNumInstallments(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create Plan
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Created Plans</h3>
        {plans.length === 0 ? (
          <p>No plans created yet.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="border rounded p-4 mb-4 shadow-sm">
              <h4 className="font-semibold mb-2">Plan #{plan.id}</h4>
              <ul className="text-sm">
                {plan.installments.map((inst) => (
                  <li key={inst.id}>
                    {inst.due_date}: {inst.amount} -{" "}
                    <span
                      className={
                        inst.status === "Paid"
                          ? "text-green-600"
                          : inst.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }
                    >
                      {inst.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;
