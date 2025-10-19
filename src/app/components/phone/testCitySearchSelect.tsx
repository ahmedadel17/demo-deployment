"use client";

import React, { useState } from 'react';
import CitySearchSelect from './CitySearchSelect';

const TestCitySearchSelect: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | number>('');

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Test City Search Select</h2>
      <CitySearchSelect
        value={selectedCity}
        onChange={(cityId) => {
          console.log('Selected city ID:', cityId);
          setSelectedCity(cityId);
        }}
        label="Select City"
        placeholder="Choose your city"
        required
      />
      <div className="mt-4">
        <p>Selected City ID: {selectedCity}</p>
      </div>
    </div>
  );
};

export default TestCitySearchSelect;
