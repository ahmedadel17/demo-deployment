'use client';
import { useCart } from "@/app/hooks/useCart";
import React, { useState } from "react";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";

function Cart() {
  const { 
    cartData, 
    products: cartItems, 
    totalItems, 
    totalPrice, 
    clearCart
  } = useCart();
  const [error, setError] = useState<string | null>(null);
  
  // Debug: Log cart data from Redux
  console.log('Cart data from Redux:', cartData);
  console.log('Products:', cartItems);
  console.log('Total items:', totalItems);
  console.log('Total price:', totalPrice);



  const handleClearCart = () => {
    clearCart();
  };

  // Cart totals are managed by Redux

  return (
    <>
     {/* Error Display */}
     {error && (
       <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
         <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
         <button 
           onClick={() => setError(null)}
           className="mt-2 text-xs text-red-500 hover:text-red-700"
         >
           Dismiss
         </button>
       </div>
     )}

     {/* Debug: Redux Cart State Display */}
     {cartData && (
       <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
         <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
           🔍 Redux Cart State Debug
         </h3>
         <div className="mb-3 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
           <p className="text-sm text-green-800 dark:text-green-200">
             💾 <strong>localStorage Status:</strong> Cart data is automatically saved to localStorage
           </p>
           <p className="text-xs text-green-600 dark:text-green-300 mt-1">
             Check browser DevTools → Application → Local Storage to see saved data
           </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
           <div>
             <p><strong>Cart ID:</strong> {cartData.id}</p>
             <p><strong>Status:</strong> {cartData.status} ({cartData.status_value})</p>
             <p><strong>Type:</strong> {cartData.type}</p>
             <p><strong>Cart Count:</strong> {cartData.cart_count}</p>
           </div>
           <div>
             <p><strong>Sub Total:</strong> SAR {cartData.sub_total}</p>
             <p><strong>VAT Amount:</strong> SAR {cartData.vat_amount}</p>
             <p><strong>Total Amount:</strong> SAR {cartData.total_amount}</p>
             <p><strong>Amount to Pay:</strong> SAR {cartData.amount_to_pay}</p>
           </div>
         </div>
         <div className="mt-3">
           <p><strong>Products ({cartData.products.length}):</strong></p>
           <div className="max-h-32 overflow-y-auto bg-white dark:bg-gray-800 p-2 rounded text-xs">
             {cartData.products.map((product) => (
               <div key={product.id} className="mb-1 p-1 border-b border-gray-200 dark:border-gray-600">
                 <span className="font-medium">{product.name}</span> - 
                 <span className="text-green-600"> SAR {product.price}</span> x 
                 <span className="text-blue-600">{product.qty}</span> - 
                 <span className="text-gray-600">{product.variation}</span>
               </div>
             ))}
           </div>
         </div>
         <div className="mt-3">
           <p><strong>Order Attributes:</strong></p>
           <div className="flex flex-wrap gap-2">
             {cartData.order_attributes.map((attr, index) => (
               <span 
                 key={index} 
                 className="px-2 py-1 rounded text-xs"
                 style={{ backgroundColor: attr.color + '20', color: attr.color }}
               >
                 {attr.label}: {attr.show_currency ? `SAR ${attr.value}` : attr.value}
               </span>
             ))}
           </div>
         </div>
       </div>
     )}

     <div className="flex justify-between items-center mb-8 my-2">
    <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{totalItems} items in your cart</p>
    </div>
    <button 
      onClick={handleClearCart}
      className="text-gray-500 hover:text-red-500 transition-colors text-sm"
    >
        Clear Cart
    </button>
</div> 
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Add some items to get started!</p>
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Start Shopping
            </a>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={{
                id: item.id.toString(),
                title: item.name,
                image: item.image,
                color: item.variation.split(' / ')[1] || 'Default', // Extract color from variation string
                size: item.variation.split(' / ')[0] || 'Default', // Extract size from variation string
                qty: item.qty,
                price: item.price,
              }} 
            />
          ))
        )}

        {/* Continue Shopping */}
        <div className="pt-4 ">
          <a
            href="#"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Continue Shopping
          </a>
        </div>
      </div>

      {/* Cart Summary */}
     {
      cartItems.length > 0 && (
        <CartSummary />
      )
     }
    </div>
    </>
  )
}

export default Cart
