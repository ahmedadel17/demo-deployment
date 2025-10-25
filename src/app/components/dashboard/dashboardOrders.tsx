"use client";
import React, { useState, useMemo, useEffect } from "react";
import getRequest from "../../../../helpers/get";
import { useAuth } from "@/app/hooks/useAuth";
import { useLocale } from "next-intl";
import Link from "next/link";
import OrderItem from "./dashboardOrdersComponents/orderItem";
import { useTranslations } from "next-intl";
interface Order {
  id: string;
  date: string;
  status: {
    text: "Delivered" | "Shipped" | "Processing" | "Cancelled";
    color: string;
  };
  total: string;
}

const OrdersPage: React.FC = () => {
  const t = useTranslations();
  const { token } = useAuth();
  const locale = useLocale();
  const [ordersNew,setOrdersNew]=useState<Order[]>([]);
  const [filters, setFilters] = useState({
    orderId: "",
    date: "",
    status: "",
    total: "",
  });

  const orders: Order[] = [
    { id: "ORD-2024-001234", date: "September 1, 2025", status: { text: "Delivered", color: "green" }, total: "65.00" },
    { id: "ORD-2024-001233", date: "August 28, 2025", status: { text: "Shipped", color: "blue" }, total: "55.50" },
    { id: "ORD-2024-001232", date: "August 25, 2025", status: { text: "Processing", color: "yellow" }, total: "72.00" },
    { id: "ORD-2024-001231", date: "August 20, 2025", status: { text: "Delivered", color: "green" }, total: "48.75" },
    { id: "ORD-2024-001230", date: "August 18, 2025", status: { text: "Shipped", color: "blue" }, total: "120.00" },
    { id: "ORD-2024-001229", date: "August 15, 2025", status: { text: "Cancelled", color: "red" }, total: "0.00" },
    { id: "ORD-2024-001228", date: "August 12, 2025", status: { text: "Processing", color: "yellow" }, total: "99.99" },
    { id: "ORD-2024-001227", date: "August 10, 2025", status: { text: "Delivered", color: "green" }, total: "75.00" },
    { id: "ORD-2024-001226", date: "August 5, 2025", status: { text: "Shipped", color: "blue" }, total: "89.50" },
    { id: "ORD-2024-001225", date: "August 1, 2025", status: { text: "Processing", color: "yellow" }, total: "150.00" },
  ];

  // Filtering logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const idMatch = order.id.toLowerCase().includes(filters.orderId.toLowerCase());
      const dateMatch = filters.date ? order.date.includes(filters.date) : true;
      const statusMatch = filters.status ? order.status.text === filters.status : true;

      const total = parseFloat(order.total);
      let totalMatch = true;
      if (filters.total === "0-50") totalMatch = total >= 0 && total <= 50;
      if (filters.total === "50-100") totalMatch = total > 50 && total <= 100;
      if (filters.total === "100+") totalMatch = total > 100;

      return idMatch && dateMatch && statusMatch && totalMatch;
    });
  }, [filters, orders]);
  const getOrders=async()=>{
    const response=await getRequest('/order/orders',{'Content-Type': 'application/json'},token,locale);
    console.log('orders',response.data.my_orders.items);
    setOrdersNew(response.data.my_orders.items);
  }
  useEffect(()=>{
    getOrders();
  },[token,locale]);  
  return (
<>
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('My Orders')}</h1>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm text-start text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <span>{t('Order ID')}</span>
                      <input
                        type="text"
                        placeholder="Filter..."
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                        value={filters.orderId}
                        onChange={(e) => setFilters({ ...filters, orderId: e.target.value })}
                      />
                    </div>
                  </th>

                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <span>{t('Date')}</span>
                      <select
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                      >
                        <option value="">{t('All Dates')}</option>
                        <option value="September">September 2025</option>
                        <option value="August">August 2025</option>
                      </select>
                    </div>
                  </th>

                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <span>{t('Status')}</span>
                      <select
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      >
                        <option value="">{t('All Status')}  </option>
                        <option value="Delivered">{t('Delivered')}</option>
                        <option value="Shipped">{t('Shipped')}</option>
                        <option value="Processing">{t('Processing')}</option>
                        <option value="Cancelled">{t('Cancelled')}</option>
                      </select>
                    </div>
                  </th>

                  <th className="px-6 py-3">
                    <div className="flex flex-col space-y-2">
                      <span>{t('Total')}</span>
                      <select
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                        value={filters.total}
                        onChange={(e) => setFilters({ ...filters, total: e.target.value })}
                      >
                        <option value="">{t('All Amounts')}</option>
                        <option value="0-50">0 - 50</option>
                        <option value="50-100">50 - 100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>
                  </th>
                  <th className="px-6 py-3">{t('Actions')}</th>
                </tr>
              </thead>

              <tbody>
                {ordersNew.map((order) => (
                 <OrderItem key={order?.id} order={order} />
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
  );
};

export default OrdersPage;
