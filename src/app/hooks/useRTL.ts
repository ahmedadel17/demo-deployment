'use client';

import { useLocale } from 'next-intl';

export const useRTL = () => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return {
    locale,
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
    flexDirection: isRTL ? 'row-reverse' : 'row',
  };
};




