"use client"
import React, { useState, useEffect, useRef } from 'react'
import * as countriesData from "country-codes-flags-phone-codes";
import Flag from 'react-world-flags'
import { useTranslations, useLocale } from 'next-intl';  
const countries = countriesData?.countries || [];

// Default to Saudi Arabia
const defaultCountry = countries.find(country => country.code === 'SA') || countries[0];

interface CountryPhoneInputProps {
  value: string;
  onChange: (value: string, countryCode: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  initialCountryCode?: string;
}

export default function CountryPhoneInput({
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  placeholder = "XXXXXXXX (max 11 digits)",
  label = "Phone Number",
  required = false,
  className = "",
  initialCountryCode = 'SA'
}: CountryPhoneInputProps) {
  const t = useTranslations();
  const locale = useLocale();
  
  // Consolidated state management
  const [state, setState] = useState(() => ({
    selectedCountry: (() => {
      const country = countries.find(c => c.code === initialCountryCode);
      return country || defaultCountry;
    })(),
    isCountryDropdownOpen: false,
    searchQuery: '',
    highlightedIndex: -1
  }));
  
  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search query
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    country.dialCode.includes(state.searchQuery)
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!state.isCountryDropdownOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setState(prev => ({
          ...prev,
          highlightedIndex: prev.highlightedIndex < filteredCountries.length - 1 
            ? prev.highlightedIndex + 1 
            : 0
        }));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setState(prev => ({
          ...prev,
          highlightedIndex: prev.highlightedIndex > 0 
            ? prev.highlightedIndex - 1 
            : filteredCountries.length - 1
        }));
        break;
      case 'Enter':
        e.preventDefault();
        if (state.highlightedIndex >= 0 && filteredCountries[state.highlightedIndex]) {
          const country = filteredCountries[state.highlightedIndex];
          setState(prev => ({
            ...prev,
            selectedCountry: country,
            isCountryDropdownOpen: false,
            searchQuery: '',
            highlightedIndex: -1
          }));
          onChange(value, country.code);
        }
        break;
      case 'Escape':
        setState(prev => ({
          ...prev,
          isCountryDropdownOpen: false,
          searchQuery: '',
          highlightedIndex: -1
        }));
        break;
    }
  };

  // Focus search input when dropdown opens
  useEffect(() => {
    if (state.isCountryDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [state.isCountryDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setState(prev => ({
          ...prev,
          isCountryDropdownOpen: false,
          searchQuery: '',
          highlightedIndex: -1
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected country when initialCountryCode changes
  useEffect(() => {
    const country = countries.find(c => c.code === initialCountryCode);
    if (country && country.code !== state.selectedCountry.code) {
      setState(prev => ({
        ...prev,
        selectedCountry: country
      }));
      onChange(value, country.code);
    }
  }, [initialCountryCode]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 11 characters
    const phoneValue = e.target.value.replace(/\D/g, '').slice(0, 11);
    onChange(phoneValue, state.selectedCountry.code);
  };

  const handleCountrySelect = (country: any) => {
    setState(prev => ({
      ...prev,
      selectedCountry: country,
      isCountryDropdownOpen: false,
      searchQuery: '',
      highlightedIndex: -1
    }));
    onChange(value, country.code);
  };

  // CSS Classes
  const countryButtonClasses = `
    flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 
    rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 
    hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none 
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const inputClasses = `
    flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
    shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 
    focus:border-primary-500 dark:bg-gray-700 dark:text-white
    ${error && touched ? 'border-red-500 dark:border-red-500' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-600' : ''}
    ${locale === 'ar' ? 'text-right' : 'text-left'}
  `;

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {t(label)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Phone Input Container */}
      <div className="flex gap-2" ref={dropdownRef}>
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setState(prev => ({ ...prev, isCountryDropdownOpen: !prev.isCountryDropdownOpen }))}
          disabled={disabled}
          className={countryButtonClasses}
        >
          <Flag code={state.selectedCountry.code} className="w-4 h-3" />
          <span className="text-sm font-medium">{state.selectedCountry.dialCode}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Country Dropdown */}
        {state.isCountryDropdownOpen && (
          <div className="absolute z-20 w-80 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-600">
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t("Search countries")}
                value={state.searchQuery}
                onChange={(e) => {
                  setState(prev => ({
                    ...prev,
                    searchQuery: e.target.value,
                    highlightedIndex: -1
                  }));
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:text-white"
                autoFocus
              />
            </div>
            
            {/* Countries List */}
            <div className="max-h-48 overflow-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 ${
                      index === state.highlightedIndex ? 'bg-primary-50 dark:bg-primary-900' : ''
                    }`}
                  >
                    <Flag code={country.code} className="w-5 h-4" />
                    <span className="text-sm">{country.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">{country.dialCode}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  {t("No countries found")}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Phone Number Input */}
        <input
          type="tel"
          required={required}
          maxLength={11}
          disabled={disabled}
          className={inputClasses}
          placeholder={placeholder}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          value={value}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>
      
      {/* Helper Text */}
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {t("Enter your")} {state.selectedCountry.name} {t("phone number")} (7-11 {t("digits")})
      </p>
      
      {/* Error Message */}
      {error && touched && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Success Message */}
      {!error && touched && value && value.length >= 7 && value.length <= 11 && (
        <p className="mt-1 text-xs text-green-500 dark:text-green-400 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {t("Valid phone number")}
        </p>
      )}
    </div>
  );
}
