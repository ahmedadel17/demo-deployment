"use client";
import { useCallback, useEffect, useState } from "react";
import { Clock, CreditCard } from "lucide-react";
import { useOrder } from "@/app/hooks/useOrder";
import { useSearchParams } from "next/navigation";
import getRequest from "../../../../helpers/get";
import { useCart } from "@/app/hooks/useCart";
import { useAuth } from "@/app/hooks/useAuth";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
export default function PendingPayment() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const { updateOrderStatus } = useOrder();
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
        console.log('Payment Status Response:', paymentData);
        
        // Log the status specifically if it exists
        if (paymentData?.status) {
            console.log('Payment Status:', paymentData.status);

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
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center text-center px-6">
      <Clock className="w-16 h-16 text-yellow-600 dark:text-yellow-400 mb-6 animate-pulse" />

      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
        Payment Pending
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-10">
        Your order is currently awaiting payment confirmation. Please complete your
        payment before the timer runs out.
      </p>

      <div className="space-y-2 mb-10 text-gray-700 dark:text-gray-300">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Amount:</strong> ${order.amount}
        </p>
        <p>
          <strong>Payment Method:</strong> {order.method}
        </p>
        <p>
          <strong>Date:</strong> {order.date}
        </p>
      </div>

      <div className="text-yellow-700 dark:text-yellow-400 font-bold text-2xl mb-8">
        ⏳ Time Left: {formatTime(timeLeft)}
      </div>

      <button
        onClick={handleRetry}
        className="flex items-center gap-3 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full transition"
      >
        <CreditCard className="w-5 h-5" />
        Retry Payment
      </button>

      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-500">
        You will be redirected automatically once payment is confirmed.
      </footer>
    </main>
  );
}
