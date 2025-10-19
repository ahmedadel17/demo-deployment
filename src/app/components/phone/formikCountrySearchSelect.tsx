"use client";

import React from 'react';
import { Field, FieldProps } from 'formik';
import CountrySearchSelect from './countrySearchSelect';

interface FormikCountrySearchSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormikCountrySearchSelect: React.FC<FormikCountrySearchSelectProps> = ({
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
        <CountrySearchSelect
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
        />
      )}
    </Field>
  );
};

export default FormikCountrySearchSelect;
