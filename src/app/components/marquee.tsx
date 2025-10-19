import React from 'react'

function Marquee() {
  return (
    // <!-- Marquee Slider -->
<div className="marquee-container overflow-hidden bg-primary-500 py-2">
    <div className="marquee-track flex">
        <div className="marquee-content flex whitespace-nowrap animate-marquee">
            <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Free Shipping on Orders Over $50</a>
            <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">30-Day Return Policy</a>
            <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">24/7 Customer Support</a>
            <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">New Collection Available Now</a>
            <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Subscribe for 10% Off</a>
            <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">Limited Time Offer</a>
        </div>
    </div>
</div>
  )
}

export default Marquee
