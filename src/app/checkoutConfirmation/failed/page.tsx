"use client";
import { useRouter } from "next/navigation";
import { XCircle, RotateCcw } from "lucide-react";

export default function PaymentFailed() {
  const router = useRouter();

  const handleRetry = () => {
    // Redirect to payment page or retry logic
    router.push("/pending-payment");
  };

  const handleBack = () => {
    router.push("/products");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center text-center px-6">
      <XCircle className="w-20 h-20 text-red-600 dark:text-red-500 mb-6 animate-pulse" />

      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
        Payment Failed
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-10">
        Unfortunately, your payment could not be processed. This may be due to
        insufficient funds, incorrect card details, or a temporary connection issue.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleRetry}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>

        <button
          onClick={handleBack}
          className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Back to Shop
        </button>
      </div>

      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-500">
        Need help? Contact our support team for assistance.
      </footer>
    </main>
  );
}
