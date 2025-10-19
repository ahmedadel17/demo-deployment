"use client";
import React, { useState, useEffect } from "react";

const PriceFilterWidget: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [filteredCount, setFilteredCount] = useState<number>(124);
  const [activeRange, setActiveRange] = useState<string | null>(null);

  const updateResults = (min: number, max: number) => {
    // Use a deterministic calculation instead of Math.random() to prevent hydration mismatches
    const filtered = Math.max(10, Math.floor(200 * ((max - min) / 1000) + 10));
    setFilteredCount(filtered);
  };

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, maxPrice - 10);
    setMinPrice(newMin);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, minPrice + 10);
    setMaxPrice(newMax);
  };

  const handleQuickSelect = (min: number, max: number, id: string) => {
    setMinPrice(min);
    setMaxPrice(max);
    setActiveRange(id);
  };

  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setActiveRange(null);
  };

  const handleApply = () => {
    alert(`Filter applied: ${minPrice} - ${maxPrice}`);
    console.log(`Filtering: ${minPrice} - ${maxPrice}`);
  };

  useEffect(() => {
    updateResults(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  const minPercent = (minPrice / 1000) * 100;
  const maxPercent = (maxPrice / 1000) * 100;

  return (
    <div className="price-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filter by Price
        </h3>
        <button
          onClick={handleClear}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Price Range Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Price Range
          </span>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
            <span>
              <span className="icon-riyal-symbol text-xs me-1"></span>
              {minPrice}
            </span>
            <span className="text-gray-400">-</span>
            <span>
              <span className="icon-riyal-symbol text-xs me-1"></span>
              {maxPrice}
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="relative mb-4 py-2">
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
            <div
              className="absolute h-full bg-primary-500 rounded-full dark:bg-primary-300"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            ></div>
          </div>

          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={minPrice}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
          />
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
          />
        </div>

        {/* Manual Inputs */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
              Min
            </label>
            <input
              type="number"
              min={0}
              max={1000}
              value={minPrice}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
              Max
            </label>
            <input
              type="number"
              min={0}
              max={1000}
              value={maxPrice}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Quick Select
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "u50", min: 0, max: 50, label: "Under 50" },
            { id: "50-100", min: 50, max: 100, label: "50 - 100" },
            { id: "100-250", min: 100, max: 250, label: "100 - 250" },
            { id: "250-500", min: 250, max: 500, label: "250 - 500" },
            { id: "500+", min: 500, max: 1000, label: "500+" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleQuickSelect(btn.min, btn.max, btn.id)}
              className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                activeRange === btn.id
                  ? "bg-primary-500 border-primary-500 text-white"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white"
              }`}
            >
              <span className="icon-riyal-symbol text-xs me-1"></span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button onClick={handleApply} className="w-full te-btn te-btn-default">
        Apply Filter
      </button>

      {/* Results Count */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Showing {filteredCount} products
        </span>
      </div>
    </div>
  );
};

export default PriceFilterWidget;
