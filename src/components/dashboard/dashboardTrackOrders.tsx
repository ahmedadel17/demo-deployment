"use client";
import React, { useState } from "react";

interface Step {
  label: string;
  date: string;
  status: "completed" | "current" | "pending";
  icon: string;
}

interface OrderData {
  orderNumber: string;
  date: string;
  status: string;
  delivery: string;
  steps: Step[];
}

const mockOrderData: Record<string, OrderData> = {
  "ORD-2024-001234": {
    orderNumber: "ORD-2024-001234",
    date: "September 1, 2025",
    status: "In Transit",
    delivery: "September 5, 2025",
    steps: [
      { label: "Order Confirmed", date: "Sep 1, 2025 - 10:30 AM", status: "completed", icon: "✅" },
      { label: "Order Shipped", date: "Sep 2, 2025 - 2:15 PM", status: "completed", icon: "✅" },
      { label: "In Transit", date: "Sep 3, 2025 - 8:45 AM", status: "current", icon: "🚚" },
      { label: "Out for Delivery", date: "Expected: Sep 5, 2025", status: "pending", icon: "📦" },
      { label: "Delivered", date: "Expected: Sep 5, 2025", status: "pending", icon: "📬" },
    ],
  },
  "ORD-2024-001235": {
    orderNumber: "ORD-2024-001235",
    date: "August 28, 2025",
    status: "Out for Delivery",
    delivery: "September 2, 2025",
    steps: [
      { label: "Order Confirmed", date: "Aug 28, 2025 - 9:00 AM", status: "completed", icon: "✅" },
      { label: "Order Shipped", date: "Aug 28, 2025 - 4:00 PM", status: "completed", icon: "✅" },
      { label: "In Transit", date: "Aug 30, 2025 - 11:00 AM", status: "completed", icon: "✅" },
      { label: "Out for Delivery", date: "Sep 1, 2025 - 7:30 AM", status: "current", icon: "🚚" },
      { label: "Delivered", date: "Expected: Sep 2, 2025", status: "pending", icon: "📦" },
    ],
  },
  "ORD-2024-001236": {
    orderNumber: "ORD-2024-001236",
    date: "August 25, 2025",
    status: "Delivered",
    delivery: "August 29, 2025",
    steps: [
      { label: "Order Confirmed", date: "Aug 25, 2025 - 2:00 PM", status: "completed", icon: "✅" },
      { label: "Order Shipped", date: "Aug 26, 2025 - 11:00 AM", status: "completed", icon: "✅" },
      { label: "In Transit", date: "Aug 27, 2025 - 3:00 PM", status: "completed", icon: "✅" },
      { label: "Out for Delivery", date: "Aug 29, 2025 - 8:00 AM", status: "completed", icon: "📦" },
      { label: "Delivered", date: "Aug 29, 2025 - 2:00 PM", status: "completed", icon: "📬" },
    ],
  },
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState(false);

  const handleTrackOrder = () => {
    const found = mockOrderData[orderId];
    if (found) {
      setOrder(found);
      setError(false);
    } else {
      setOrder(null);
      setError(true);
    }
  };

  const handleQuickSelect = (id: string) => {
    setOrderId(id);
    const found = mockOrderData[id];
    if (found) {
      setOrder(found);
      setError(false);
    } else {
      setOrder(null);
      setError(true);
    }
  };

  return (
  <>
    <div className="lg:col-span-3 space-y-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track Your Order</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Enter your order ID to track your package
            </p>
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Order ID (e.g., ORD-2024-001234)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <button onClick={handleTrackOrder} className="te-btn te-btn-primary px-6 py-3 rounded-md bg-blue-600 text-white">
              Track Order
            </button>
          </div>
        </div>

        {/* Quick Select */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Select</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(mockOrderData).map((id) => (
              <button
                key={id}
                onClick={() => handleQuickSelect(id)}
                className="flex flex-col items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">#{id}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Placed {mockOrderData[id].date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 text-sm text-red-700 dark:text-red-200">
            <div className="flex items-center">
              ❌ <span className="ml-2">Order not found. Please check the ID and try again.</span>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {order && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{order.orderNumber}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                    {order.status}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Expected Delivery</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.delivery}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Tracking Progress</h3>
              <div className="space-y-6">
                {order.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        step.status === "completed"
                          ? "bg-green-500 text-white"
                          : step.status === "current"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{step.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
  </>
  );
}
