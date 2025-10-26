'use client'
import React from 'react'
import FooterMenus from '../footerMenu'
import FooterApp from '../footerApp'
import FooterSocialMedia from '../footerSocialMedia'
import { useTranslations } from 'next-intl'
function footerStyle1() {

    // const t = useTranslations();
  return (
  <>
  <footer className="te-footer flex-shrink-0">
    <div className="container">

        <div className="te-footer-content">
            <div className="te-footer-grid te-footer-grid-5">
                <div className="te-footer-widget footer-widget-1">  <div className="footer-widget">      <div className="te-footer-title">Company</div>      <div className="menu-footer-container">          <ul className="menu"><li><a href="#about" className="te-footer-link">About Us</a></li><li><a href="#careers" className="te-footer-link">Careers</a></li><li><a href="#press" className="te-footer-link">Press</a></li><li><a href="#blog" className="te-footer-link">Blog</a></li><li><a href="#partners" className="te-footer-link">Partners</a></li>          </ul>      </div>  </div></div><div className="te-footer-widget footer-widget-1">  <div className="footer-widget">      <div className="te-footer-title">Support</div>      <div className="menu-footer-container">          <ul className="menu"><li><a href="#help" className="te-footer-link">Help Center</a></li><li><a href="#contact" className="te-footer-link">Contact</a></li><li><a href="#faqs" className="te-footer-link">FAQs</a></li><li><a href="#chat" className="te-footer-link">Live Chat</a></li><li><a href="#guides" className="te-footer-link">Guides</a></li>          </ul>      </div>  </div></div><div className="te-footer-widget footer-widget-1">  <div className="footer-widget">      <div className="te-footer-title">Legal</div>      <div className="menu-footer-container">          <ul className="menu"><li><a href="privacy-page.php" className="te-footer-link">Privacy Policy</a></li><li><a href="terms-page.php" className="te-footer-link">Terms of Service</a></li><li><a href="cookies-page.php" className="te-footer-link">Cookies</a></li><li><a href="#disclaimer" className="te-footer-link">Disclaimer</a></li><li><a href="#accessibility" className="te-footer-link">Accessibility</a></li>          </ul>      </div>  </div></div><div className="te-footer-widget footer-widget-1">  <div className="footer-widget">      <div className="te-footer-title">Social</div>      <div className="menu-footer-container">          <ul className="menu"><li><a href="#facebook" className="te-footer-link">Facebook</a></li><li><a href="#twitter" className="te-footer-link">Twitter</a></li><li><a href="#instagram" className="te-footer-link">Instagram</a></li><li><a href="#linkedin" className="te-footer-link">LinkedIn</a></li><li><a href="#youtube" className="te-footer-link">YouTube</a></li>          </ul>      </div>  </div></div>        
                        {/* <!-- Footer Widget --> */}
<div className="te-footer-widget footer-widget-1">
    <div className="footer-widget">
        <div className="te-footer-title">Get the App</div>
        <p className="te-footer-description text-sm mb-4">Download our app for the best experience and latest updates.</p>
        <div className="te-footer-app-download">
            <a href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <div className="text-start">
                    <div className="mb-1 text-xs">Download on the</div>
                    <div className="-mt-1 text-sm font-semibold">Mac App Store</div>
                </div>
            </a>
            <a href="#" className="mt-2 w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                </svg>
                <div className="text-start">
                    <div className="mb-1 text-xs">Get in on</div>
                    <div className="-mt-1 text-sm font-semibold">Google Play</div>
                </div>
            </a>
        </div>
    </div>
</div>            </div>
        </div>

        {/* <!-- Footer Bottom --> */}
        <div className="te-footer-bottom">
            <div className="te-footer-bottom-content">

                {/* <!-- Dynamic Copyright --> */}
                <div className="te-footer-copyright">
                    <p>© 2025 Naseem. All rights reserved. </p>
                </div>

                <div className="te-footer-bottom-links">
                    <div className="social-media-links flex gap-2">

    <a href="#" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 text-gray-200 hover:text-gray-500 transition-all duration-200 social-icon-facebook" aria-label="facebook">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    </a>

    <a href="#" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 text-gray-200 hover:text-gray-500 transition-all duration-200 social-icon-twitter" aria-label="twitter">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
    </a>

    <a href="#" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 text-gray-200 hover:text-gray-500 transition-all duration-200 social-icon-instagram" aria-label="instagram">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
    </a>

    <a href="#" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 text-gray-200 hover:text-gray-500 transition-all duration-200 social-icon-youtube" aria-label="youtube">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
            <path d="m10 15 5-3-5-3z"></path>
        </svg>
    </a>

    <a href="#" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 text-gray-200 hover:text-gray-500 transition-all duration-200 social-icon-linkedin" aria-label="linkedin">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect width="4" height="12" x="2" y="9"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </svg>
    </a>

</div>                </div>

            </div>
        </div>
        
    </div>
</footer>
  </>
  )
}

export default footerStyle1
