
import React, { useState } from 'react'
import { useCart } from '@/app/hooks/useCart';
import { useAuth } from '@/app/hooks/useAuth';
import postRequest from '../../../../helpers/post';
import { CheckCircle2, X } from 'lucide-react';
function AppliedPromoCode() {
  const { cartData,setCartData } = useCart();
  const { token } = useAuth();
  const [isRemovingPromo, setIsRemovingPromo] = useState(false);
  
  const removePromoCode = async () => {
    setIsRemovingPromo(true);
    try {
      // Get cart ID from the cart data structure
      const cartId = cartData?.id;
      const response = await postRequest('/marketplace/cart/delete-voucher/'+cartId, {}, {}, token);
      // toastHelper(response.data.status,response.data.message);
      setCartData(response.data.data);
    } catch (error) {
      console.error('Failed to remove promo code:', error);
    } finally {
      setIsRemovingPromo(false);
    }
  }
  return (
    <div>
      <div className="mb-6 mt-2">
            <div className="flex items-center justify-between p-2 bg-[#f0fdf4] dark:bg-gray-700 rounded-lg border border-[#f0fdf4] dark:border-gray-600">
              <div className="flex-1">
                <div className='flex gap-2'>

                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 text-capitalize ">
                    {cartData?.voucher?.code}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    {cartData?.voucher?.message}
                </p>
              </div>
              <div className="flex items-center">
                {isRemovingPromo && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                  <X
                    className={`w-4 h-4 ${isRemovingPromo ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-red-500'}`} 
                    onClick={isRemovingPromo ? undefined : removePromoCode} 
                  />
                </label>
              </div>
            </div>
          </div>
    </div>
  )
}

export default AppliedPromoCode
