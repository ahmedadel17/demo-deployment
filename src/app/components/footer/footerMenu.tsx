'use client'
import React from "react";
import { useTranslations } from 'next-intl';
interface FooterLink {
  name: string;
  url: string;
}

interface FooterMenu {
  title: string;
  links: FooterLink[];
}

const footerMenus: FooterMenu[] = [
  {
    title: "Company",
    links: [
      { name: "About Us", url: "#about" },
      { name: "Careers", url: "#careers" },
      { name: "Press", url: "#press" },
      { name: "Blog", url: "#blog" },
      { name: "Partners", url: "#partners" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", url: "#help" },
      { name: "Contact", url: "#contact" },
      { name: "FAQs", url: "#faqs" },
      { name: "Live Chat", url: "#chat" },
      { name: "Guides", url: "#guides" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "privacy-page.php" },
      { name: "Terms of Service", url: "terms-page.php" },
      { name: "Cookies", url: "cookies-page.php" },
      { name: "Disclaimer", url: "#disclaimer" },
      { name: "Accessibility", url: "#accessibility" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Facebook", url: "#facebook" },
      { name: "Twitter", url: "#twitter" },
      { name: "Instagram", url: "#instagram" },
      { name: "LinkedIn", url: "#linkedin" },
      { name: "YouTube", url: "#youtube" },
    ],
  },
];

const FooterMenus: React.FC = () => {
  const t = useTranslations();
  return (
    <>
      {footerMenus.map((menu) => (
        <div key={menu.title} className="te-footer-widget footer-widget-1">
          <div className="footer-widget dark:text-white">
            <div className="te-footer-title text-white mb-3 font-semibold text-gray-900 ">
              {t(menu.title)}
            </div>
            <div className="menu-footer-container">
              <ul className="menu space-y-2">
                {menu.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="te-footer-link text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {t(link.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterMenus;
