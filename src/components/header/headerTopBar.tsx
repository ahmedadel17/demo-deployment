import React from 'react'
import TopBarLink from './TopBarLink';
function HeaderTopBar({ menuData }: { menuData: { items: any[] } }) {
//   console.log('menuData ✅✅ headerTopBar', menuData.items);
  return (
    <div className="site-topbar bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-3 flex items-center text-sm hidden lg:flex">
    <div className="container">
        <div className="flex items-center justify-between gap-2">
            <div>
                <div className="topbar-contact flex gap-4">

                    <span className="contact-info-inline-item flex items-center gap-2">
                        <svg className="inline-block w-4 h-4 text-primary-500 dark:text-primary-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                        </svg>
                        <span className="whitespace-nowrap"><a href="tel:546660001" className="hover:text-gray-800 dark:hover:text-gray-400 transition-colors duration-200">546660001</a></span>
                    </span>

                    <span className="contact-info-inline-item flex items-center gap-2">
                        <svg className="inline-block w-4 h-4 text-primary-500 dark:text-primary-200" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        </svg>
                        <span className="whitespace-nowrap"><a href="mailto:info@naseem.sa" className="hover:text-gray-800 dark:hover:text-gray-400 transition-colors duration-200">info@naseem.sa</a></span>
                    </span>

                </div>
            </div>
            <div>
                <ul className="flex gap-4">
                    {menuData?.items?.map((item: any) => (
                        <TopBarLink key={item.id} url={item.url} label={item.label} />
                    ))}
                </ul>

            </div>
        </div>
    </div>
</div>
  )
}

export default HeaderTopBar
