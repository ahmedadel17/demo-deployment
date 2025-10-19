'use client'
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ShippingMethodRadioButton from './ShippingMethodRadioButton';
import { useCart } from '@/app/hooks/useCart';
import { useOrder } from '@/app/hooks/useOrder';
import axios from 'axios';
import { useAuth } from '@/app/hooks/useAuth';
import postRequest from '../../../../../helpers/post';

interface ShippingMethodType {
  id: number;
  name: string;
  description: string;
  slug: string;
  price: string;
  image: string;
}

const ShippingMethod = () => {
  const { cartData } = useCart();
  const { order, updateShippingMethod,updateOrderStatus } = useOrder();
  const { token } = useAuth();
  const [shippingMethods, setShippingMethods] = useState<string[]>([]);
  const getshippingRates = async () => {
    const response =await postRequest(`/marketplace/cart/shipping-rates`, { order_id: cartData?.id,user_address_id: order.shipping_address_id},{},token,'en'
      
    );

    setShippingMethods(response.data.data.shipping_methods || []);
    console.log('shippingMethods',response.data.data)
  }
  useEffect(() => {
    getshippingRates();
  }, []);

  const validationSchema = Yup.object({
    shipping: Yup.string().required('Please select a shipping method')
  });

  const initialValues = {
    shipping: order.shipping_method_slug || ''
  }
  
  const onSubmit = (values: { shipping: string }) => {
    console.log('Shipping method selected:', values.shipping);
    updateShippingMethod(values.shipping);
  }
  console.log(order)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 my-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{('Shipping Method')}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="space-y-3">
          
              {shippingMethods?.map((shippingMethod: any) => {
                // Transform ShippingRate to ShippingOption format
                const option = {
                  slug: shippingMethod.slug,
                  name: shippingMethod.name,
                  price: shippingMethod?.price?.toString(),
                  description: `Estimated delivery: ${shippingMethod.estimated_days}`,
                  image: shippingMethod?.image, // Default image
                  value: shippingMethod.id,
                  label: shippingMethod.name
                };
                
                return (
                <ShippingMethodRadioButton
                  key={shippingMethod.id}
                  option={option}
                  name="shipping"
                  onChange={(value: string) => {
                    setFieldValue('shipping', value);
                    updateShippingMethod(value);
                  }}
                />
                );
              })}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShippingMethod;