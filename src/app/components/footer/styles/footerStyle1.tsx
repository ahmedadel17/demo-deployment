import React from 'react'
import FooterMenus from '../footerMenu'
import FooterApp from '../footerApp'
import FooterSocialMedia from '../footerSocialMedia'
function footerStyle1() {
  return (
      <footer className="te-footer flex-shrink-0">
    <div className="container">

        <div className="te-footer-content">
            <div className="te-footer-grid te-footer-grid-5">
                <FooterMenus />
                <FooterApp />       
            </div>
        </div>

        {/* <!-- Footer Bottom --> */}
        <div className="te-footer-bottom">
            <div className="te-footer-bottom-content">

                {/* <!-- Dynamic Copyright --> */}
                <div className="te-footer-copyright">
                    <p>© 2025 Naseem. All rights reserved. </p>
                </div>

                <div className="te-footer-bottom-links">
                    <FooterSocialMedia />
                </div>

            </div>
        </div>
        
    </div>
</footer>
  )
}

export default footerStyle1
