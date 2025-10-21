"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface Order {
  id: string;
  date: string;
  status: string;
}

interface Item {
  id: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

interface ReturnRequest {
  id: string;
  orderId: string;
  date: string;
  status: "Processing" | "Completed";
  productName: string;
  reason: string;
  price: number;
  type: "Refund" | "Exchange";
  image: string;
}

export default function ReturnPage() {
  const orders: Order[] = [
    { id: "ORD-2024-001234", date: "September 1, 2025", status: "Delivered" },
    { id: "ORD-2024-001233", date: "August 28, 2025", status: "Delivered" },
    { id: "ORD-2024-001231", date: "August 20, 2025", status: "Delivered" },
  ];

  const orderItems: Item[] = [
    {
      id: "item1",
      name: "Straight-leg jeans",
      size: "M",
      color: "Blue",
      quantity: 1,
      price: 65,
      image: "/assets/images/product-1.jpg",
    },
    {
      id: "item2",
      name: "Cotton T-shirt",
      size: "L",
      color: "White",
      quantity: 2,
      price: 130,
      image: "/assets/images/product-2.jpg",
    },
  ];

  const activeReturns: ReturnRequest[] = [
    {
      id: "RET-2024-001",
      orderId: "ORD-2024-001230",
      date: "August 20, 2025",
      status: "Processing",
      productName: "Denim Jacket",
      reason: "Wrong size received",
      price: 89,
      type: "Exchange",
      image: "/assets/images/product-3.jpg",
    },
    {
      id: "RET-2024-002",
      orderId: "ORD-2024-001229",
      date: "August 15, 2025",
      status: "Completed",
      productName: "Sneakers",
      reason: "Defective item",
      price: 120,
      type: "Refund",
      image: "/assets/images/product-4.jpg",
    },
  ];

  // Form state
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [returnReason, setReturnReason] = useState("");
  const [returnType, setReturnType] = useState("");
  const [comments, setComments] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // Handlers
  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder(e.target.value);
    setSelectedItems([]);
    setReturnReason("");
    setReturnType("");
    setComments("");
  };

  const handleItemCheck = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedOrder) return alert("Please select an order");
    if (selectedItems.length === 0)
      return alert("Please select at least one item");
    if (!returnReason) return alert("Please select a reason");
    if (!returnType) return alert("Please select a return type");

    alert("Return request submitted successfully!");
  };

  return (
    <>
       <div className="lg:col-span-3 space-y-8">
        {/* Return Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Return Item
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Request a return for your purchased items
            </p>
          </div>

          <div className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Order Select */}
              <div>
                <label
                  htmlFor="orderSelect"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Select Order
                </label>
                <select
                  id="orderSelect"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  value={selectedOrder}
                  onChange={handleOrderChange}
                >
                  <option value="">Choose an order</option>
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.id} - {o.date} ({o.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Items */}
              {selectedOrder && (
                <div className="space-y-4 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Select Items to Return
                  </h3>

                  {orderItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start space-x-4 p-4 border border-gray-100 dark:border-gray-700 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleItemCheck(item.id)}
                        className="mt-1 h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full objectCover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Size: {item.size}, Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Return Details */}
              {selectedItems.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="returnReason"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Reason for Return *
                    </label>
                    <select
                      id="returnReason"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                    >
                      <option value="">Select a reason</option>
                      <option value="defective">Defective/damaged</option>
                      <option value="wrong_item">Wrong item</option>
                      <option value="wrong_size">Wrong size/color</option>
                      <option value="not_as_described">
                        Item not as described
                      </option>
                      <option value="quality">Quality not expected</option>
                      <option value="changed_mind">Changed my mind</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Return Type *
                    </label>
                    <div className="space-y-3">
                      {["Refund", "Exchange", "Store Credit"].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="returnType"
                            value={type}
                            checked={returnType === type}
                            onChange={(e) => setReturnType(e.target.value)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="comments"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Additional Comments
                    </label>
                    <textarea
                      id="comments"
                      rows={4}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Provide details about your return..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Photos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        id="photos"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="photos" className="cursor-pointer">
                        <p className="text-sm text-gray-900 dark:text-white">
                          Click to upload photos
                        </p>
                      </label>
                      {files.length > 0 && (
                        <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
                          {files.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg"
                    >
                      Submit Return Request
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Return Policy */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Return Policy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <ul className="space-y-2">
              <li>30 days from delivery date</li>
              <li>Items must be in original condition</li>
              <li>Tags and packaging included</li>
            </ul>
            <ol className="space-y-2">
              <li>Submit return request</li>
              <li>Receive return label via email</li>
              <li>Package and ship items back</li>
              <li>Refund processed within 5-7 days</li>
            </ol>
          </div>
        </div>

        {/* Active Return Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            My Return Requests
          </h2>
          <div className="space-y-4">
            {activeReturns.map((ret) => (
              <div
                key={ret.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Return Request #{ret.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Order #{ret.orderId} - Requested on {ret.date}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      ret.status === "Processing"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {ret.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={ret.image}
                    alt={ret.productName}
                    className="w-12 h-12 rounded-lg objectCover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ret.productName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Reason: {ret.reason}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ret.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ret.type}
                    </p>
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
