'use client'
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLocale, useTranslations } from 'next-intl';
import AppliedPromoCode from './appliedPromoCode';
import { useAuth } from '@/app/hooks/useAuth';
import { useCart } from '@/app/hooks/useCart';
import postRequest from '../../../../../helpers/post';
    function PromoCode() {
    const t = useTranslations();
    const { token } = useAuth();
    const { cartData,setCartData } = useCart();
    const locale = useLocale();
    const promoCodeSchema = Yup.object({
        promo_code_id: Yup.string()
          .min(3, 'Promo code must be at least 3 characters')
          .max(20, 'Promo code must be less than 20 characters')
      });
      const [isApplyingPromo, setIsApplyingPromo] = useState(false);
      const handlePromoCodeSubmit = async (
        values: { promo_code_id: string }, 
        { setSubmitting, setFieldError, resetForm }: { 
          setSubmitting: (isSubmitting: boolean) => void;
          setFieldError: (field: string, message: string) => void;
          resetForm: () => void;
        }
      ) => {
        setIsApplyingPromo(true);
        try {
          // Here you would typically make an API call to validate and apply the promo code
          // Get cart ID from the cart data structure
          const cartId = cartData?.id;
          const response = await postRequest('/marketplace/cart/apply-voucher/'+cartId, { promo_code_id: values.promo_code_id }, {},token,locale);
          // toastHelper(response.data.status,response.data.message);
          setCartData(response.data.data);
          resetForm();
        } catch {
          setFieldError('promo_code_id', t('Invalid promo code'));
        } finally {
          setIsApplyingPromo(false);
          setSubmitting(false);
        }
      };
  return (
    <div>
          {!cartData?.voucher?.code && <Formik
              initialValues={{ promo_code_id: '' }}
              validationSchema={promoCodeSchema}
              onSubmit={handlePromoCodeSubmit}
            >
              {({ errors, touched, isSubmitting, values }) => (
                <Form>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('Promo Code')}</label>
                  <div className="flex">
                    <Field
                      name="promo_code_id"
                      type="text"
                      className={`flex-1 px-3 py-2 border rounded-l-md rtl:rounded-l-none rtl:rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white ${
                        errors.promo_code_id && touched.promo_code_id
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder={t("Enter code")}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || isApplyingPromo || !values.promo_code_id?.trim()}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-l-0 rtl:border-l rtl:border-r-0 border-gray-300 dark:border-gray-600 rounded-r-md rtl:rounded-r-none rtl:rounded-l-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isApplyingPromo ? t('Applying') : t('Apply')}
                    </button>
                  </div>
                  {errors.promo_code_id && touched.promo_code_id && (
                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.promo_code_id}
                    </div>
                  )}
                </Form>
              )}
            </Formik>}
            {cartData?.voucher?.code && (
         <AppliedPromoCode />
            )}
    </div>
  )
}

export default PromoCode
