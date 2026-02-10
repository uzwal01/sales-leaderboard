"use client";

import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    agentName: "",
    amount: "",
    salesCount: 1,
  });

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async () => {
  setLoading(true);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`
    );
    const data = await response.json();
    if (data.success) {
      setLeaderboard(data.data);
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  } finally {
    setLoading(false);
  }
}, []);

  // Add new sale
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentName: formData.agentName,
          amount: Number(formData.amount),
          salesCount: Number(formData.salesCount),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setFormData({ agentName: "", amount: "", salesCount: 1 });
        fetchLeaderboard();
        alert("Sale added successfully!");
      }
    } catch (error) {
      console.error("Error adding sale:", error);
      alert("Failed to add sale");
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Sales Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Track and rank your top sales performers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Add Sale Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add New Sale
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.agentName}
                    onChange={(e) =>
                      setFormData({ ...formData, agentName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., Ram Sharma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sales Amount (Rs.)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., 250000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Sales
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.salesCount}
                    onChange={(e) =>
                      setFormData({ ...formData, salesCount: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., 5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
                >
                  Add Sale
                </button>
              </form>
            </div>
          </div>

          {/* Leaderboard Display */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  📊 Today&apos;s Leaderboard
                </h2>
                <p className="text-sm text-gray-600">
                  Total Sales:{" "}
                  {leaderboard.reduce((s, a) => s + a.totalSales, 0)} | Total
                  Amount: Rs.{" "}
                  {leaderboard
                    .reduce((s, a) => s + a.totalAmount, 0)
                    .toLocaleString()}
                </p>
              </div>

              {/* Leaderboard Items */}
              <div className="space-y-3">
                {leaderboard.map((agent) => (
                  <div
                    key={agent.rank}
                    className="bg-blue-600 text-white rounded-xl px-5 py-4 flex items-center justify-between"
                  >
                    {/* Left */}
                    <div>
                      <p className="font-semibold text-lg">
                        #{agent.rank} {agent.agentName}
                      </p>
                      <p className="text-sm text-blue-100 mt-1">
                        🧾 {agent.totalSales} sales | 💰 Rs.{" "}
                        {agent.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
