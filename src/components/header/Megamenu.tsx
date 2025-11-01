import React from 'react'
import { useState } from 'react';
import MegaMenuTitle from './MegaMenu/MegaMenuTitle';
import MegaMenuLink from './MegaMenu/MegaMenuLink';

function MegaMenu({data}: {data: any}) {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsMegaMenuOpen(true);
    };

    const handleMouseLeave = () => {
        setIsMegaMenuOpen(false);
    };
  return (
    <>
    <div 
    className="te-navbar-mega-dropdown" 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
>
    <a href="#" className="te-navbar-link te-navbar-link-has-mega-menu">{data?.label}</a>
    <div className={`te-navbar-mega-menu te-navbar-mega-menu-${data?.mega_menu_columns}-col${isMegaMenuOpen ? ' te-mega-menu-show' : ''}`}>   
        <div className="te-navbar-mega-menu-grid">
            {data?.mega_menu_children_columns?.map((item: any, index: number) => (
                <div key={index} className="te-navbar-mega-menu-column">
                    <MegaMenuTitle label={item?.label} />
                {item?.items?.map((item: any)=>{
                    return (
                        <MegaMenuLink key={item?.id} url={item?.url} label={item?.label} />
                    )
                })}
            </div>
            ))}
           
            
        </div>
    </div>
</div>
</>

  )
}

export default MegaMenu
