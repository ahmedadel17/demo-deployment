"use client";
import React, { useEffect, useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const shoeSizes = ["38", "39", "40", "41", "42", "43", "44", "45"];
const colors = ["black", "white", "gray", "red", "blue", "yellow", "green"];

const SizeColorFilter: React.FC = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [filteredCount, setFilteredCount] = useState<number>(124);

  const toggleSelection = (
    list: string[],
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const removeSize = (size: string) => {
    setSelectedSizes((prev) => prev.filter((s) => s !== size));
  };

  const removeColor = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const applyFilter = () => {
    console.log("Filter applied - Sizes:", selectedSizes, "Colors:", selectedColors);
  };

  useEffect(() => {
    const baseCount = 124;
    const sizeMultiplier = selectedSizes.length > 0 ? 0.3 + selectedSizes.length * 0.1 : 1;
    const colorMultiplier = selectedColors.length > 0 ? 0.4 + selectedColors.length * 0.1 : 1;
    const count = Math.max(5, Math.floor(baseCount * sizeMultiplier * colorMultiplier));
    setFilteredCount(count);
  }, [selectedSizes, selectedColors]);

  return (
    <div className="variable-widget w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Size & Color</h3>
        <button
          onClick={clearAll}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h4>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSelection(selectedSizes, size, setSelectedSizes)}
              className={`px-3 py-1 text-sm rounded border ${
                selectedSizes.includes(size)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 dark:text-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Shoe Sizes */}
        <div className="mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Shoe Sizes</div>
          <div className="grid grid-cols-4 gap-2">
            {shoeSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleSelection(selectedSizes, s, setSelectedSizes)}
                className={`px-3 py-1 text-sm rounded border ${
                  selectedSizes.includes(s)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700 dark:text-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleSelection(selectedColors, color, setSelectedColors)}
              className={`w-6 h-6 rounded-full border-2 ${
                selectedColors.includes(color) ? "ring-2 ring-blue-600" : ""
              }`}
              style={{ backgroundColor: color }}
              title={color}
            >
              <span className="sr-only">{color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Filters */}
      {(selectedSizes.length > 0 || selectedColors.length > 0) && (
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Selected:</div>
          <div className="space-y-2">
            {selectedSizes.length > 0 && (
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Sizes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedSizes.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100"
                    >
                      {size}
                      <button
                        onClick={() => removeSize(size)}
                        className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700"
                        aria-label={`Remove size ${size}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedColors.length > 0 && (
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Colors:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedColors.map((color) => (
                    <span
                      key={color}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100"
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                      <button
                        onClick={() => removeColor(color)}
                        className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700"
                        aria-label={`Remove color ${color}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <button
        onClick={applyFilter}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
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

export default SizeColorFilter;
