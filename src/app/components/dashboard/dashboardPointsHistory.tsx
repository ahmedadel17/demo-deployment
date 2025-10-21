"use client";

import React, { useMemo, useState } from "react";

interface Transaction {
  id: string;
  date: string;
  type: "Earned" | "Redeemed" | "Expired";
  points: number;
  description: string;
}

// Mock Data (like in PHP)
const transactionsData: Transaction[] = [
  { id: "TRX-001", date: "2025-09-01", type: "Earned", points: 50, description: "Purchase from Store A" },
  { id: "TRX-002", date: "2025-08-28", type: "Redeemed", points: -30, description: "Discount Coupon Used" },
  { id: "TRX-003", date: "2025-08-25", type: "Earned", points: 70, description: "Referral Bonus" },
  { id: "TRX-004", date: "2025-08-22", type: "Expired", points: -10, description: "Points Expired" },
  { id: "TRX-005", date: "2025-08-20", type: "Earned", points: 120, description: "Bulk Purchase Reward" },
  { id: "TRX-006", date: "2025-08-18", type: "Redeemed", points: -50, description: "Gift Card Redeemed" },
  { id: "TRX-007", date: "2025-08-15", type: "Earned", points: 90, description: "App Signup Bonus" },
  { id: "TRX-008", date: "2025-08-12", type: "Expired", points: -20, description: "Points Expired" },
  { id: "TRX-009", date: "2025-08-10", type: "Earned", points: 60, description: "Special Event Reward" },
  { id: "TRX-010", date: "2025-08-05", type: "Redeemed", points: -40, description: "Discount Applied" },
];

const typeColors: Record<Transaction["type"], string> = {
  Earned: "text-green-600 bg-green-100 dark:bg-green-900/30",
  Redeemed: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
  Expired: "text-red-600 bg-red-100 dark:bg-red-900/30",
};

export default function PointsHistory() {
  const [filterType, setFilterType] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((t) => {
      const matchesType = filterType ? t.type === filterType : true;
      const matchesSearch = search
        ? t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.id.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesType && matchesSearch;
    });
  }, [filterType, search]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const earnedPoints = transactionsData
    .filter((t) => t.type === "Earned")
    .reduce((sum, t) => sum + t.points, 0);

  const redeemedPoints = Math.abs(
    transactionsData
      .filter((t) => t.type === "Redeemed")
      .reduce((sum, t) => sum + t.points, 0)
  );

  const expiredPoints = Math.abs(
    transactionsData
      .filter((t) => t.type === "Expired")
      .reduce((sum, t) => sum + t.points, 0)
  );

  const balance = earnedPoints - redeemedPoints - expiredPoints;

  return (
  <>
     {/* Main Section */}
     <div className="lg:col-span-3 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Points Transaction History
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <StatCard label="Total Earned" value={earnedPoints} color="text-green-600" />
            <StatCard label="Total Redeemed" value={redeemedPoints} color="text-blue-600" />
            <StatCard label="Total Expired" value={expiredPoints} color="text-red-600" />
            <StatCard label="Balance" value={balance} color="text-primary-600" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 px-6 pb-4">
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="">All Types</option>
              <option value="Earned">Earned</option>
              <option value="Redeemed">Redeemed</option>
              <option value="Expired">Expired</option>
            </select>

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm flex-1 bg-white dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto p-6">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left">Transaction ID</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((t) => (
                  <tr key={t.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{t.id}</td>
                    <td className="px-6 py-4">{t.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${typeColors[t.type]}`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{t.description}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-800 dark:text-gray-200">
                      {t.points > 0 ? `+${t.points}` : t.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 text-sm">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  </>
  );
}

const StatCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
    <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
    <h3 className={`text-xl font-bold ${color}`}>{value}</h3>
  </div>
);
