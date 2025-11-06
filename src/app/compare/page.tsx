'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFromCompare, clearCompare } from "../store/slices/compareSlice";
import { CompareProduct } from "../store/slices/compareSlice";

interface VariationValue {
  id?: number;
  value?: string;
  name?: string;
}

interface Variation {
  id?: number;
  name?: string;
  attribute_name?: string;
  attribute_type?: string;
  values?: VariationValue[];
}

const badgeClasses: Record<string, string> = {
  new: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  sale: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  bestseller: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  limited: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  hot: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

const CompareProducts: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const compareProducts = useAppSelector(state => state.compare.products);

  // Redirect to products if no items to compare
  React.useEffect(() => {
    if (compareProducts.length === 0) {
      router.push("/products");
    }
  }, [compareProducts.length, router]);

  const removeProduct = (id: string | number) => {
    dispatch(removeFromCompare(id));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all products from comparison?")) {
      dispatch(clearCompare());
      router.push("/products");
    }
  };

  // Helper function to get product display values
  const getProductValue = (product: CompareProduct, field: string) => {
    return product[field] || product.title || product.name || "N/A";
  };

  const getProductImage = (product: CompareProduct) => {
    return product.image || product.thumbnail || "https://via.placeholder.com/150";
  };

  const getProductPrice = (product: CompareProduct) => {
    const price = product.price || product.price_after_discount || product.min_price;
    return price ? (typeof price === 'string' ? parseFloat(price) : price) : 0;
  };

  const getProductOldPrice = (product: CompareProduct) => {
    const oldPrice = product.old_price || product.price_before_discount;
    return oldPrice ? (typeof oldPrice === 'string' ? parseFloat(oldPrice) : oldPrice) : undefined;
  };

  // Get all unique variation types across all products
  const getAllVariationTypes = (): Variation[] => {
    const variationMap = new Map<string, Variation>();
    
    compareProducts.forEach((product) => {
      if (product.variations && Array.isArray(product.variations)) {
        (product.variations as Variation[]).forEach((variation) => {
          const variationName = variation.name || variation.attribute_name || '';
          if (variationName && !variationMap.has(variationName)) {
            variationMap.set(variationName, variation);
          }
        });
      }
    });
    
    return Array.from(variationMap.values());
  };

  const allVariationTypes = getAllVariationTypes();

  // Get variation for a specific product by name
  const getProductVariation = (product: CompareProduct, variationName: string): Variation | null => {
    if (!product.variations || !Array.isArray(product.variations)) return null;
    
    const variation = (product.variations as Variation[]).find(
      (v) => (v.name || v.attribute_name) === variationName
    );
    
    return variation || null;
  };

  // Check if variation is a color type
  const isColorVariation = (variation: Variation | null): boolean => {
    if (!variation) return false;
    return variation.attribute_type === 'color' || 
           (variation.name || variation.attribute_name || '').toLowerCase().includes('color');
  };

  if (compareProducts.length === 0)
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No products to compare
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select products from the catalog to start comparing.
        </p>
        <a
          href="/products"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </a>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compare Products</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Compare up to 4 products side by side
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase tracking-wider w-48">
                  Features
                </th>
                {compareProducts.map((product) => (
                  <th
                    key={product.id}
                    className="px-6 py-4 text-center text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-64"
                  >
                    {getProductValue(product, 'name') || getProductValue(product, 'title') || `Product ${product.id}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Product Images */}
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                  Product Image
                </td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {getProductImage(product) ? (
                        <img
                          src={getProductImage(product)}
                          alt={getProductValue(product, 'title') || getProductValue(product, 'name')}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Product Names */}
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
                  Product Name
                </td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="px-6 py-4 text-center">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {getProductValue(p, 'name') || getProductValue(p, 'title')}
                    </h3>
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                  Category
                </td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    {getProductValue(p, 'category')}
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
                  Price
                </td>
                
                {compareProducts.map((p) => {
                  const price = getProductPrice(p);
                  const oldPrice = getProductOldPrice(p);
                  return (
                    <td key={p.id} className="px-6 py-4 text-center">
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${price}</p>
                        {oldPrice && (
                          <>
                            <p className="text-sm text-gray-500 line-through">${oldPrice}</p>
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                              {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              
              {allVariationTypes.map((variationType) => {
                const variationName = variationType.name || variationType.attribute_name || 'Variation';
                const isColor = isColorVariation(variationType);
                
                return (
                  <tr key={variationName} className={isColor ? '' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className={`px-6 py-4 text-sm font-medium text-gray-900 dark:text-white ${isColor ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-600'}`}>
                      {variationName}
                    </td>
                    {compareProducts.map((p) => {
                      const productVariation = getProductVariation(p, variationName);
                      
                      return (
                        <td key={p.id} className="px-6 py-4 text-center">
                          {productVariation && productVariation.values && productVariation.values.length > 0 ? (
                            isColor ? (
                              // Color variation - use color selector style
                              <div className="flex justify-center gap-1 flex-wrap">
                                {productVariation.values.map((val: VariationValue, valIdx: number) => {
                                  const colorValue = val.value || val.name || String(val);
                                  return (
                                    <div
                                      key={valIdx}
                                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                                      style={{ backgroundColor: colorValue }}
                                      title={colorValue}
                                    />
                                  );
                                })}
                              </div>
                            ) : (
                              // Non-color variation - use size/text style
                              <div className="flex justify-center gap-1 flex-wrap">
                                {productVariation.values.map((val: VariationValue, valIdx: number) => {
                                  const valueText = val.value || val.name || String(val);
                                  return (
                                    <span key={valIdx} className="px-2 py-1 text-xs border border-gray-300 rounded">
                                      {valueText}
                                    </span>
                                  );
                                })}
                              </div>
                            )
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {/* Badges */}
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                  Special Offers
                </td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="px-6 py-4 text-center">
                    {p.badges && p.badges.length > 0 ? (
                      <div className="flex justify-center gap-1 flex-wrap">
                        {p.badges.map((b, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              badgeClasses[b.type] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {b.text}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No special offers</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Variations - Dynamic rows for each variation type */}
             

              {/* Remove */}
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
                  Remove
                </td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="px-6 py-4 text-center">
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Remove from comparison"
                    >
                      <svg
                        className="w-5 h-5 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={clearAll} className="te-btn te-btn-default">
          Clear All
        </button>
        <a href="/products" className="te-btn te-btn-primary">
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default CompareProducts;
