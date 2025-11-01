"use client";

import React from 'react';
import { Field, FieldProps } from 'formik';
import CitySearchSelect from './CitySearchSelect';

interface FormikCitySearchSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormikCitySearchSelect: React.FC<FormikCitySearchSelectProps> = ({
  name,
  label,
  placeholder,
  className,
  disabled,
  required
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <CitySearchSelect
          value={field.value}
          onChange={(value) => {
            form.setFieldValue(name, value);
            form.setFieldTouched(name, true);
          }}
          label={label}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          required={required}
          error={meta.touched && meta.error ? meta.error : undefined}
          touched={meta.touched}
          countryId={form.values.country_id}
        />
      )}
    </Field>
  );
};

export default FormikCitySearchSelect;
