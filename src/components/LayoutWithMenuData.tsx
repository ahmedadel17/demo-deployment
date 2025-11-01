import React, { Suspense } from 'react';
import HeaderTopBar from './header/headerTopBar';
import HeaderStyle1 from './header/styles/headerStyle1';
import FooterStyle1 from './footer/styles/footerStyle1';
import Marquee from './marquee';
import HeaderTopBarSkeleton from './skeleton/HeaderTopBarSkeleton';
import HeaderSkeleton from './skeleton/HeaderSkeleton';
import FooterSkeleton from './skeleton/FooterSkeleton';
import MarqueeSkeleton from './skeleton/MarqueeSkeleton';

// Server component that fetches menu data
async function MenuDataProvider({ children }: { children: React.ReactNode }) {
  const { getLocale } = await import('next-intl/server');
  const getRequest = (await import('../../helpers/get')).default;
  
  const locale = await getLocale();
  
  // Fetch menus server-side
  let menuData = null;
  try {
    menuData = await getRequest('/core/menus', {}, null, locale);
    // console.log('📋 Menus fetched server-side:', menuData?.data);
  } catch (error) {
    console.error('❌ Failed to fetch menus server-side:', error);
  }
  
  return (
    <>
      <Marquee />
      <HeaderTopBar menuData={menuData?.data?.top_menu} />
      <HeaderStyle1 menuData={menuData?.data?.main_menu} />
      {children}
      <FooterStyle1 menuData={menuData?.data?.footer_menus} />
    </>
  );
}

// Loading fallback component
function LoadingFallback({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarqueeSkeleton />
      {/* <HeaderTopBarSkeleton /> */}
      <HeaderSkeleton />
      {children}
      <FooterSkeleton />
    </>
  );
}

// Main component with Suspense boundary
export default function LayoutWithMenuData({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingFallback>{children}</LoadingFallback>}>
      <MenuDataProvider>
        {children}
      </MenuDataProvider>
    </Suspense>
  );
}

