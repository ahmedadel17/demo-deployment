'use client'
import React, { useRef } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import FormikInput from '@/app/components/phone/formikInput';
import ClientOnly from '@/app/components/clientOnly';
import * as Yup from 'yup';
import MapComponent from './map';
import TextArea from '@/app/components/phone/textarea';
import CountryPhoneInput from '@/app/components/phone/countryphoneInput';
import FormikCountrySearchSelect from '@/app/components/phone/formikCountrySearchSelect';
import { getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji } from 'country-codes-flags-phone-codes';
import axios from 'axios';
import { useAuth } from '@/app/hooks/useAuth';
import FormikCitySearchSelect from '../../phone/formikCitySearchSelect';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
interface CreateAddressData {
  name: string;
  address: string;
  contact_phone: string;
  countryCode: string;
  country: string;
  house: string;
  street: string;
  notes: string;
  lat: string;
  lng: string;
  city_id: string;
  country_id: string;
}

interface CreateNewAddressFormProps {
  onAddressCreated?: (addressData: CreateAddressData) => void;
}

const CreateNewAddressForm: React.FC<CreateNewAddressFormProps> = ({ onAddressCreated }) => {
  const { token } = useAuth()
  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const initialValues: CreateAddressData = {
    name: '',
    address: '',
    contact_phone: '',
    countryCode: 'SA',
    country: 'SA',
    house: '',
    street: '',
    notes: '',
    lat: '',
    lng: '',
    city_id: '',
    country_id: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(('Name is required')).min(2, ('Name must be at least 2 characters')),
    contact_phone: Yup.string().required(('Phone number is required')).matches(/^[0-9]+$/, ('Phone number must contain only digits')).min(7, ('Phone number must be at least 7 digits')).max(15, ('Phone number must not exceed 15 digits')),
    country: Yup.string().required(('Country is required')),
    address: Yup.string().notRequired().nullable(),
    street: Yup.string().notRequired().nullable(),
    house: Yup.string().notRequired().nullable(),
    notes: Yup.string().notRequired().nullable().max(500, ('Notes must not exceed 500 characters')),
  });

  const onSubmit = async(values: CreateAddressData, { resetForm, setFieldTouched, }: FormikHelpers<CreateAddressData>) => {
    // Check if location is selected
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/create-address`, values, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if(response.data.status){
      toast.success(response.data.message);
      resetForm();
      // Trigger refresh of existing addresses
      onAddressCreated?.(values);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <ClientOnly fallback={
      <div className="bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('Create New Address')}</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    }>
      <div className="bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 p-1">

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, handleChange, handleBlur, errors, touched, isSubmitting }) => {
            // Debug: Log validation errors
            console.log('Form errors:', errors);
            console.log('Form touched:', touched);
            
            return (
            <Form>
              <div className="space-y-4">
                {/* Location Search Input */}
             

                <MapComponent
                  searchInputRef={searchInputRef}
                  onLocationSelect={(lat: number, lng: number, address?: string) => {
                    setFieldValue('lat', String(lat));
                    setFieldValue('lng', String(lng));
                    if (address) {  
                      setFieldValue('address', address);
                    }
                  }}
                />
                   <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Search Location
                  </label>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for a location..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                {/* Map Location Validation Display */}
                <div className="space-y-2">
                  {(errors.lat || errors.lng) && (touched.lat || touched.lng) && (
                    <div className="text-red-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                          {t('Please select a location on the map')}
                    </div>
                  )}
                  {values.lat && values.lng && !errors.lat && !errors.lng && (
                    <div className="text-green-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t('Location selected successfully')}
                    </div>
                  )}
                </div>

                <FormikInput
                  name="name"
                  label={t('Name')}
                  placeholder="Enter your name"
                  required
                />

                <FormikCountrySearchSelect
                  name="country_id"
                  label={t("Country")}
                  placeholder="Select your country"
                  required
                />
                
                <FormikCitySearchSelect
                  name="city_id"
                  label={t("City")}
                  placeholder="Select your city"
                  required
                />    
                <CountryPhoneInput
                  value={values.contact_phone}
                  onChange={(phoneValue, countryCode) => {
                    handleChange({
                      target: {
                        name: 'contact_phone',
                        value: phoneValue
                      }
                    } as React.ChangeEvent<HTMLInputElement>);
                    handleChange({
                      target: {
                        name: 'countryCode',
                        value: countryCode
                      }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onBlur={handleBlur}
                  error={errors.contact_phone}
                  touched={touched.contact_phone}
                  disabled={isSubmitting}
                  label={t('Phone Number')}
                  required
                  initialCountryCode="SA"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormikInput
                    name="address"
                    label={('Address')}
                    placeholder="123 Main Street"
                    required
                  />
                  <FormikInput
                    name="street"
                    label={t('Street Address')}
                    placeholder="123 Main Street"
                    required
                  />
                  <FormikInput
                    name="house"
                    label={t('Apartment, suite, etc. (optional)')}
                    placeholder="Apt 4B"
                  />
                </div>
                
                <TextArea
                  name="notes"
                  label={t('Notes') as string}
                  placeholder={t('Add any delivery notes (optional)') as string}
                  rows={4}
                />

                {/* Hidden lat/lng fields */}
                <input type="hidden" name="lat" value={values.lat} />
                <input type="hidden" name="lng" value={values.lng} />

                <button type="submit" className="te-btn te-btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ?   t('Saving...') : t('Save Address')}
                </button>
              </div>
            </Form>
            );
          }}
        </Formik>
      </div>
    </ClientOnly>
  );
};

export default CreateNewAddressForm;
