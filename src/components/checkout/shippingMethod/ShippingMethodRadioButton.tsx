import React from 'react';
import Image from 'next/image';
import { useOrder } from '@/app/hooks/useOrder';
interface ShippingOption {
  slug: string;
  name: string;
  price: string;
  description: string;
  image: string;
  value: string;
  label: string;
}

interface ShippingMethodRadioButtonProps {
  option: ShippingOption;
  name: string;
  className?: string;
  labelClassName?: string;
  radioClassName?: string;
  contentClassName?: string;
  onChange?: (value: string) => void;
}

const ShippingMethodRadioButton: React.FC<ShippingMethodRadioButtonProps> = ({
  option,
  name,
  className = "",
  labelClassName = "flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer",
  radioClassName = "text-primary-600",
  contentClassName = "ms-3 flex-1",
  onChange
}) => {
  const { order } = useOrder();
  return (
    <label key={option.slug} className={`${labelClassName} ${className}`}>
      <input
        type="radio"
        name={name}
        value={option.slug}
        checked={order.shipping_method_slug === option.slug}
        className={radioClassName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
      <div className={contentClassName}>
        <div className="flex justify-between">
          <span className="flex">
            <Image className='rounded-lg w-10 h-10 mr-2' src={option.image} alt={option.name} width={100} height={100} />
            <span className="font-medium text-gray-900 dark:text-white">
              {option.name}
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
            </span>
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            <span className="icon-riyal-symbol ms-1"></span>{option.price}
          </span>
        </div>
      </div>
    </label>
  );
};

export default ShippingMethodRadioButton;
