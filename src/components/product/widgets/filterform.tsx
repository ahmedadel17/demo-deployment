"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // if using Next.js

export default function ProductSortControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [order, setOrder] = useState(searchParams.get("order") || "default");
  const [perPage, setPerPage] = useState(searchParams.get("per_page") || "9");

  const updateURL = (newOrder: string, newPerPage: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newOrder && newOrder !== "default") {
      params.set("order", newOrder);
    } else {
      params.delete("order");
    }
    if (newPerPage) {
      params.set("per_page", newPerPage);
    } else {
      params.delete("per_page");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    updateURL(newOrder, perPage);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = e.target.value;
    setPerPage(newPerPage);
    updateURL(order, newPerPage);
  };

  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {/* <!-- Order Select --> */}
                    <form method="GET" className="flex items-center space-x-2 rtl:space-x-reverse">
                        <label htmlFor="order" className="sr-only">Sort by:</label>
                        <select 
                          id="order" 
                          name="order"
                          value={order}
                          onChange={handleOrderChange}
                        >
                            <option value="default">Default</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="newest">Newest</option>
                        </select>
                    </form>

                    {/* <!-- Products Per Page / Grid Columns Select --> */}
                    <form method="GET" className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
                        <label htmlFor="per_page" className="sr-only">Products per page / grid columns:</label>
                        <select 
                          id="per_page" 
                          name="per_page"
                          value={perPage}
                          onChange={handlePerPageChange}
                        >
                            <option value="6">2 Columns</option>
                            <option value="9">3 Columns</option>
                            <option value="12">4 Columns</option>
                        </select>
                    </form>

                </div>
  );
}
