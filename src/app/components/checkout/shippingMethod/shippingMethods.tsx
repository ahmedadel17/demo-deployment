'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ShippingMethodRadioButton from './ShippingMethodRadioButton';
import { useCart } from '@/app/hooks/useCart';
import { useOrder } from '@/app/hooks/useOrder';
import { useAuth } from '@/app/hooks/useAuth';
import postRequest from '../../../../../helpers/post';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

interface ShippingMethod {
  id: number;
  name: string;
  slug: string;
  price: string;
  estimated_days: string;
  image?: string;
}

const ShippingMethod = () => {
  const t = useTranslations();
  const { cartData } = useCart();
  const { order, updateShippingMethod } = useOrder();
  const { token } = useAuth();
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const locale = useLocale(); 
  const getshippingRates = useCallback(async () => {
    const response =await postRequest(`/marketplace/cart/shipping-rates`, { order_id: cartData?.id,user_address_id: order.shipping_address_id},{},token,locale  );

    const methods = response.data.data.shipping_methods || [];
    setShippingMethods(methods);
  }, [cartData?.id, order.shipping_address_id, token, locale])
  useEffect(() => {
    getshippingRates();
  }, [getshippingRates]);

  // Auto-select first shipping method when methods are loaded
  useEffect(() => {
    if (shippingMethods.length > 0 && !order.shipping_method_slug) {
      const firstMethod = shippingMethods[0];
      updateShippingMethod(firstMethod.slug, cartData);
    }
  }, [shippingMethods, order.shipping_method_slug, updateShippingMethod, cartData]);

  const validationSchema = Yup.object({
    shipping: Yup.string().required('Please select a shipping method')
  });

  const initialValues = {
    shipping: order.shipping_method_slug || ''
  }
  
  const onSubmit = (values: { shipping: string }) => {
    console.log('Shipping method selected:', values.shipping);
    updateShippingMethod(values.shipping, cartData);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 my-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Method')}</h2>

      <Formik
        key={shippingMethods.length > 0 ? shippingMethods[0].slug : 'default'}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="space-y-3">
          
              {shippingMethods?.map((shippingMethod: ShippingMethod,index: number) => {
                // Transform ShippingRate to ShippingOption format
                const option = {
                  slug: shippingMethod.slug,
                  name: shippingMethod.name,
                  price: shippingMethod?.price?.toString(),
                  description: `Estimated delivery: ${shippingMethod.estimated_days}`,
                  image: shippingMethod?.image || '', // Default image
                  value: shippingMethod.id.toString(),
                  label: shippingMethod.name
                };
                
                return (
                <ShippingMethodRadioButton
                  key={index}
                  option={option}
                  name="shipping"
                  onChange={(value: string) => {
                    setFieldValue('shipping', value);
                    updateShippingMethod(value, cartData);
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