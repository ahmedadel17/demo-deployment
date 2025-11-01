import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link';
function DropDownSubMenu({ label, items }: { label: string, items: any }) {
  const [openSubmenus, setOpenSubmenus] = useState(false);
  const t = useTranslations()
 const toggleSubMenu = () => {
  setOpenSubmenus(prev => !prev);
 }
//  console.log('items 📱',items);
  return (
   <>
    <a
    href="#" 
    className={`te-navbar-link-mobile te-navbar-link-mobile-has-submenu  dark:text-white${openSubmenus ? 'te-mobile-submenu-open dark:text-white' : ''}`}
    onClick={(e) => {
     toggleSubMenu();
    }}
  >
    {label}
  </a>
    <div className={`te-navbar-submenu-mobile  ${openSubmenus ? 'te-submenu-mobile-open ' : ' '}`}>
    {items?.map((item: any,index: number) => (
      <div key={index} className="te-navbar-submenu-mobile-link">{item?.label}
      <hr/>
      {item?.items?.map((item: any,index: number) => (
        <Link key={index} href={item?.url} className="te-navbar-submenu-mobile-link">{item?.label}</Link>
      ))}
    
      </div>
    ))}
</div>
   </>
  )
}

export default DropDownSubMenu
