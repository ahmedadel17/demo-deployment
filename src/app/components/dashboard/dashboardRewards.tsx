"use client";
import Link from "next/link";
import React, { useState } from "react";

interface ConversionTier {
  points: number;
  bonus: number;
  value: number;
  label: string;
  highlight?: boolean;
}

interface Transaction {
  type: "earned" | "converted";
  description: string;
  amount: number;
  date: string;
  balance_after: number;
}

export default function RewardsWalletCenter() {
  // Mock data (from PHP)
  const current_points = 1250;
  const wallet_balance = 50.0;
  const total_earned_lifetime = 3250;
  const total_converted_lifetime = 2000;
  const points_to_next_tier = 750;
  const current_tier = "Silver";
  const next_tier = "Gold";

  const conversion_tiers: ConversionTier[] = [
    { points: 100, bonus: 0, value: 10.0, label: "Basic" },
    { points: 500, bonus: 5, value: 52.5, label: "Popular", highlight: true },
    { points: 1000, bonus: 10, value: 110.0, label: "Best Value" },
  ];

  const recent_transactions: Transaction[] = [
    {
      type: "earned",
      description: "Purchase Reward - Order #ORD-001234",
      amount: 250,
      date: "Sep 1, 2025",
      balance_after: 1250,
    },
    {
      type: "converted",
      description: "Converted to wallet balance",
      amount: -500,
      date: "Aug 28, 2025",
      balance_after: 1000,
    },
    {
      type: "earned",
      description: "Welcome Bonus",
      amount: 100,
      date: "Aug 25, 2025",
      balance_after: 1500,
    },
    {
      type: "earned",
      description: "Purchase Reward - Order #ORD-001230",
      amount: 180,
      date: "Aug 20, 2025",
      balance_after: 1400,
    },
  ];

  const [pointsToConvert, setPointsToConvert] = useState<number>(0);
  const [resultAmount, setResultAmount] = useState<number>(0);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const handleSelectTier = (tier: ConversionTier, index: number) => {
    if (tier.points > current_points) return;
    setSelectedTier(index);
    setPointsToConvert(tier.points);
    setResultAmount(tier.value);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const points = parseInt(e.target.value) || 0;
    setPointsToConvert(points);
    setResultAmount((points / 100) * 10);
    setSelectedTier(null);
  };

  const percentage = Math.round(
    (current_points / (current_points + points_to_next_tier)) * 100
  );

  return (
   <>
     <div className="lg:col-span-3 space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Rewards & Wallet Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your points, track your progress, and maximize your rewards.
          </p>
        </div>
        <div className="space-y-8">
      {/* Current Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 flex justify-center items-center bg-purple-100 dark:bg-purple-800 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
            </div>
            <span className="text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded-full">
              Available
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Wallet Balance
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            <span className="text-lg mr-1">﷼</span>
            {wallet_balance.toFixed(2)}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-300">
            Ready to spend
          </p>
        </div>

        {/* Reward Points */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg shadow-sm border border-green-200 dark:border-green-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 flex justify-center items-center bg-green-100 dark:bg-green-800 rounded-full">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-300 bg-green-200 dark:bg-green-800 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Reward Points
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {current_points.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 dark:text-green-300">
            Worth <span className="text-xs">﷼</span>
            {(current_points / 10).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Convert Points */}
        <a
          href="#conversion-section"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-primary-100 rounded-full group-hover:scale-110 transition-transform">
              <svg
                className="w-5 h-5 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                ></path>
              </svg>
            </div>
            <div className="ms-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Convert Points
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Turn points into cash
              </p>
            </div>
          </div>
        </a>

        {/* View History */}
        <Link
          href="/dashboard/points-history"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-full group-hover:scale-110 transition-transform">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <div className="ms-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                View History
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track all transactions
              </p>
            </div>
          </div>
        </Link>

        {/* Earn More */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-700 p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-yellow-100 dark:bg-yellow-800 rounded-full">
              <svg
                className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="ms-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Earn More
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Shop & earn points
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        {/* Loyalty Progress */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Loyalty Progress
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You are currently a{" "}
                <span className="font-bold text-gray-500 dark:text-gray-300">
                  {current_tier}
                </span>{" "}
                member. Only{" "}
                <span className="font-bold text-yellow-500">
                  {points_to_next_tier} points
                </span>{" "}
                away from{" "}
                <span className="font-bold text-yellow-500">{next_tier}</span>!
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{percentage}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
            <div
              className="bg-gradient-to-r from-primary-500 to-yellow-500 h-3 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{current_tier} (Current)</span>
            <span>
              {next_tier} (+{points_to_next_tier} pts)
            </span>
          </div>
        </div>

        {/* Conversion Section */}
        <div
          id="conversion-section"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Convert Points to Wallet Balance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {conversion_tiers.map((tier, i) => {
              const unavailable = tier.points > current_points;
              return (
                <div
                  key={i}
                  onClick={() => handleSelectTier(tier, i)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTier === i
                      ? "ring-2 ring-primary-500"
                      : tier.highlight
                      ? "border-primary-500 bg-primary-50/20"
                      : "border-gray-200 hover:border-primary-300"
                  } ${unavailable ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {tier.points} Points
                    </h3>
                    {tier.highlight && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        {tier.label}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {tier.value.toFixed(2)} SAR
                  </div>
                  {tier.bonus > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      +{tier.bonus}% Bonus!
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {unavailable
                      ? `Need ${tier.points - current_points} more points`
                      : "Available"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Conversion */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              Custom Amount
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="points"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                >
                  Points to Convert
                </label>
                <input
                  type="number"
                  id="points"
                  min={100}
                  max={current_points}
                  step={10}
                  value={pointsToConvert || ""}
                  onChange={handleCustomChange}
                  className="w-full rounded-md border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  You will receive
                </label>
                <div className="block w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-white">
                  {resultAmount.toFixed(2)} SAR
                </div>
              </div>
            </div>
            <button
              disabled={pointsToConvert < 100 || pointsToConvert > current_points}
              className="bg-primary-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Convert Points
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
          <div className="p-6 border-b flex justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <a href="#" className="text-sm text-primary-600 hover:underline">
              View All
            </a>
          </div>
          <div className="p-6 space-y-4">
            {recent_transactions.map((t, i) => (
              <div
                key={i}
                className="flex justify-between p-4 border rounded-lg dark:border-gray-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t.description}
                  </p>
                  <p className="text-sm text-gray-500">{t.date}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`font-semibold ${
                      t.type === "earned"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {t.type === "earned" ? "+" : ""}
                    {t.amount} points
                  </div>
                  <div className="text-xs text-gray-500">
                    Balance: {t.balance_after}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
   </>
  );
}
