import React from 'react'
import FooterLink from './FooterLink';
import FooterTitle from './FooterTitle';

function FooterWidget( { title, links }: { title: string, links: any[] } ) {
  return (
    <div className="te-footer-widget footer-widget-1">
    <div className="footer-widget">
        <FooterTitle title={title} />
    <div className="menu-footer-container">
<ul className="menu">
        {links.map((link) => (
            <FooterLink key={link.url} url={link.url} label={link.label} />
            ))}
            </ul>
        </div>
        </div>
    </div>
    )
}

export default FooterWidget;
