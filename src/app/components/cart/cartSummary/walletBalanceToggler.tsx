'use client'
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { useCart } from '@/app/hooks/useCart';
import postRequest from '../../../../../helpers/post';
import {useAuth} from '@/app/hooks/useAuth';

function WalletBallanceToggler() {
  const { cartData,setCartData } = useCart();
  const [useWalletBalance, setUseWalletBalance] = useState(cartData?.use_wallet);
    const [isWalletToggleLoading, setIsWalletToggleLoading] = useState(false);
    const t = useTranslations();
    const { token } = useAuth();
    const locale = useLocale();
    const handleWalletBalanceToggle = async (checked: boolean) => {
        try {
          setIsWalletToggleLoading(true);
          
          const response = await postRequest('/marketplace/order/use_wallet/'+cartData?.id, {
           
          }, {}, token, locale);
          // toastHelper(response.data.status,response.data.message);
          // Update cart data with new wallet balance information
          setCartData(response.data.data);
          setUseWalletBalance(checked);
        } catch (error) {
          console.error('Failed to toggle wallet balance:', error);
          // You can add error handling here (show error message, etc.)
        } finally {
          setIsWalletToggleLoading(false);
        }
      };
  return (
    <div>
        {/* Wallet Balance Toggle */}
        <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{t('Use Wallet Balance')}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">                {cartData?.user_balance}
                </p>
              </div>
              <div className="flex items-center">
                {isWalletToggleLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-3"></div>
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useWalletBalance}
                    onChange={(e) => handleWalletBalanceToggle(e.target.checked)}
                    disabled={isWalletToggleLoading}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
    </div>
  )
}

export default WalletBallanceToggler
