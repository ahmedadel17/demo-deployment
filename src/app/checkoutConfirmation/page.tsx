'use client'
import { useLocale } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import SuccessHeader from "@/app/components/checkoutConfirmation/successHeader";
import OrderDetails from "@/app/components/checkoutConfirmation/orderDetails";
import ShippingInfo from "@/app/components/checkoutConfirmation/shippingInfo";
import ActionButtons from "@/app/components/checkoutConfirmation/actionButtons";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/hooks/useCart";
import { useAuth } from "@/app/hooks/useAuth";
import getRequest from "../../../helpers/get";
import { useOrder } from "@/app/hooks/useOrder";
 function Confirmation() {
  const { updateOrderStatus } = useOrder();
  const { setCartData } = useCart();
    const { token } = useAuth();
    const locale = useLocale();
    const [orderData, setOrderData] = useState<{data?: unknown} | null>(null);
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const paymentId=searchParams.get('id');
    
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

    const getOrderData = useCallback(async () => {
        try {
            // Check if token exists and is valid
            if (!token) {
                console.error('No token available');
                return;
            }
            
            console.log('Token:', token);
            console.log('Order ID:', orderId);
            
            const orderData = await getRequest(`/order/orders/${orderId}`, { 'Content-Type': 'application/json' }, token, locale);
            setOrderData(orderData);
            
            // Only check payment status once and if paymentId exists
            if(paymentId && !hasStatusBeenChecked()){
                markStatusAsChecked();
                const paymentData = await getRequest(`/payment/hyper-pay/check-status?id=${paymentId}`, { 'Content-Type': 'application/json' }, token, locale);
                console.log('Payment Status Response:', paymentData);
                
                // Log the status specifically if it exists
                if (paymentData?.status) {
                    console.log('Payment Status:', paymentData.status);
                }
                if (paymentData?.data?.status) {
                    console.log('Payment Data Status:', paymentData.data.status);
                }
            }
               setCartData({
                 id: '',
                 products: [],
                 amount_to_pay: 0
               });
        } catch (error: unknown) {
            console.error('Error fetching order data:', error);
            // Handle authentication error
            if ((error as {response?: {status?: number}})?.response?.status === 401) {
                console.error('Authentication failed - token may be invalid or expired');
            }
        }
    }, [token, orderId, paymentId, locale, setCartData, hasStatusBeenChecked, markStatusAsChecked]);
    useEffect(() => {
        if (token && orderId) {
            getOrderData();
        }
    }, [token, orderId]);

  return (
    <div className='container mx-auto mt-6 mb-4' >
      
{/* <!-- Success Header --> */}
<SuccessHeader />

{/* <!-- Order Details --> */}
<OrderDetails orderData={orderData as {data?: {order_num?: string; created_at?: string; estimated_delivery?: string; products?: any[]; order_attributes?: any[]; total_amount?: string | number;}} | null}/>

{/* <!-- Shipping & Contact Info --> */}
<ShippingInfo address={(orderData?.data as {address?: unknown})?.address} />

{/* <!-- Next Steps --> */}
{/* <NextSteps /> */}

{/* <!-- Action Buttons --> */}

<ActionButtons/>
{/* <!-- Email Confirmation Notice --> */}
{/* <EmailConfirmation /> */}

    </div>
  )
}

export default Confirmation
