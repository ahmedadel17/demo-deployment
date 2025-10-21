"use client";
import React, { useState } from "react";
import Link from "next/link";

// 🏠 Address interface
interface Address {
  id: number;
  label: string;
  lines: string[];
  country?: string;
}

const Header: React.FC = () => (
  <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">My Account</h1>
    <Link href="/" className="text-primary hover:underline text-sm font-medium">
      Back to Home
    </Link>
  </header>
);

const DashboardSidebar: React.FC = () => (
  <aside className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dashboard</h2>
    <nav className="space-y-2">
      <Link href="/dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-primary transition">
        Overview
      </Link>
      <Link href="/dashboard/orders" className="block text-gray-700 dark:text-gray-300 hover:text-primary transition">
        My Orders
      </Link>
      <Link href="/dashboard/wishlist" className="block text-gray-700 dark:text-gray-300 hover:text-primary transition">
        My Wishlist
      </Link>
      <Link href="/dashboard/addresses" className="block text-gray-900 dark:text-white font-medium">
        My Addresses
      </Link>
      <Link href="/dashboard/settings" className="block text-gray-700 dark:text-gray-300 hover:text-primary transition">
        Settings
      </Link>
    </nav>
  </aside>
);

const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 text-center text-gray-600 dark:text-gray-400 text-sm mt-10">
    © {new Date().getFullYear()} Your Company. All rights reserved.
  </footer>
);

const MyAddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home Address",
      lines: ["123 Main Street", "Anytown, USA 12345"],
    },
    {
      id: 2,
      label: "Work Address",
      lines: [
        "456 Business Avenue",
        "Suite 100",
        "Cityville, USA 67890",
        "United States",
      ],
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  return (
   <>
   <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Addresses
                </h1>
                <Link
                  href="/dashboard/edit-address"
                  className="te-btn te-btn-primary px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                >
                  Add New Address
                </Link>
              </div>

              {/* Address List */}
              <div className="p-6 space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {address.label}
                    </h3>

                    {address.lines.map((line, idx) => (
                      <p
                        key={idx}
                        className={`text-sm text-gray-600 dark:text-gray-400 ${idx === 0 ? "mt-1" : ""}`}
                      >
                        {line}
                      </p>
                    ))}

                    <div className="mt-4 flex space-x-2 rtl:space-x-reverse">
                      <Link
                        href={`/dashboard/edit-address?id=${address.id}`}
                        className="text-sm font-medium text-primary-600 dark:text-primary-100 hover:underline"
                      >
                        Edit
                      </Link>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="text-sm font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {addresses.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                    You have no saved addresses.
                  </p>
                )}
              </div>
            </div>
          </div>
   </>
  );
};

export default MyAddressesPage;
