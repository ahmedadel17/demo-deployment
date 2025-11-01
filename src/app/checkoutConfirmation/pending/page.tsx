"use client";
import { useCallback, useEffect } from "react";
import { Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import getRequest from "../../../../helpers/get";
import { useCart } from "@/app/hooks/useCart";
import { useAuth } from "@/app/hooks/useAuth";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
export default function PendingPayment() {
  const searchParams = useSearchParams();   
  const paymentId=searchParams.get('id');
  const { token } = useAuth();
  const locale = useLocale();
  const { cartData } = useCart();
  const router = useRouter();
  // Check if status has already been checked for this payment ID
  const getStatusCheckKey = useCallback(() => `payment_status_checked_${paymentId}`, [paymentId]);
  const hasStatusBeenChecked = useCallback(() => {
      if (!paymentId) return false;
      return localStorage.getItem(getStatusCheckKey()) === 'true';
  }, [paymentId, getStatusCheckKey]);
  const markStatusAsChecked = useCallback(() => {
      if (paymentId) {
          localStorage.setItem(getStatusCheckKey(), 'true');
      }
  }, [paymentId, getStatusCheckKey]);
const checkPaymentStatus = useCallback(async () => {
    if(paymentId && !hasStatusBeenChecked()){
        markStatusAsChecked();
        const paymentData = await getRequest(`/payment/hyper-pay/check-status?id=${paymentId}`, { 'Content-Type': 'application/json' }, token, locale);
        // console.log('Payment Status Response:', paymentData);
        
        // Log the status specifically if it exists
        if (paymentData?.status) {
            // console.log('Payment Status:', paymentData.status);

            router.push('/checkoutConfirmation/?orderId='+cartData?.id);
        }else{
            router.push('/checkoutConfirmation/failed');

        }
       
    }
  
}, [paymentId, token, locale]);
  useEffect(() => {
   checkPaymentStatus();
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const order = {
    id: "ORD-98217",
    amount: 249.99,
    method: "Credit Card",
    date: "October 21, 2025",
  };

  const handleRetry = () => {
    alert("Redirecting to payment gateway...");
    // Replace with actual payment retry logic
  };

  return (
    <div className="container mx-auto px-4 py-12">
    {/* Pending Header */}
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Payment Pending
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Your order has been received but the payment is not yet confirmed.
      </p>
    </div>

    {/* Info Box */}
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        What happens next?
      </h3>
      <div className="space-y-6">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
              1
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Payment Verification
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We are verifying your payment. This may take a few minutes.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
              2
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Confirmation
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Once payment is confirmed, you’ll receive a confirmation email.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
              3
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Shipping
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              After confirmation, we’ll process and ship your order.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
 

   
  </div>
  );
}
