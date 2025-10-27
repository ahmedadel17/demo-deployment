"use client";
import { useRouter } from "next/navigation";
import { XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

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
    <div className="container mx-auto px-4 py-12">
    {/* Failure Header */}
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Payment Failed
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Unfortunately, your payment could not be processed.
      </p>
    </div>

    {/* Info Box */}
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        What can you do?
      </h3>
      <div className="space-y-6">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-red-600 dark:text-red-300">
              1
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Check Your Payment Method
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ensure your card or payment account has sufficient balance and is active.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-red-600 dark:text-red-300">
              2
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Try Again
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You can attempt the payment again using the same or a different method.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-red-600 dark:text-red-300">
              3
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Contact Support
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If the issue persists, please contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/retry-payment" className="te-btn te-btn-primary">
        Try Again
      </Link>
      <Link href="/" className="te-btn te-btn-default">
        Continue Shopping
      </Link>
    </div>

    {/* Email Confirmation Notice */}
    <div className="mt-8 text-center">
      <p className="text-gray-600 dark:text-gray-400">
        If you’ve been charged, please reach out to{' '}
        <a
          href="mailto:support@example.com"
          className="text-primary-600 hover:text-primary-300 underline"
        >
          support@example.com
        </a>{' '}
        for assistance.
      </p>
    </div>
  </div>
  );
}
