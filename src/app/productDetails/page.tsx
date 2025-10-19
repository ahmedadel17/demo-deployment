import React from 'react'
import ProductGalleryCarousel from '../components/product/ProductGalleryCarousel'
import ProductMerchant from '../components/product/productMerchant';
import ProductShare from '../components/product/productShare';
import ProductInteractions from '../components/ProductInteractions';
import ProductTitle from '../components/productDetails/productTitle';
import ProductPrice from '../components/productDetails/productPrice';
import ProductDescription from '../components/productDetails/productDescription';
import ProductVariations from '../components/productDetails/productVariations';
import ProductMeta from '../components/productDetails/productMeta';
function ProductDetails() {
      const images = [
    "/assets/images/product-6.jpg",
    "/assets/images/product-6-1.jpg",
    "/assets/images/product-6-2.jpg",
    "/assets/images/product-6-3.jpg",
    "/assets/images/product-6-4.jpg",
  ];
  return (
    <>
      <ProductInteractions 
        productId="product-6"
        productTitle="Mercer 7 Inch Chino Shorts"
        productPrice="200.00"
        productImage="/assets/images/product-6.jpg"
      />
      <div className=" container space-y-16">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* <!-- Left Side - Image Slider --> */}
        <div>
            <div className="sticky top-8 space-y-6">
                {/* <?php include 'template-parts/product/product-gallery.php'; ?> */}
                <ProductGalleryCarousel images={images} discount="20% OFF" />
            </div>
        </div>

        {/* <!-- Right Side - Product Details --> */}
        <div>

            <div className="space-y-6">
                {/* <!-- Product Title and Rating --> */}
             <ProductTitle 
               name=""
               rate={0}
               rate1={0}
               rate2={0}
               rate3={0}
               rate4={0}
               rate5={0}
               out_of_stock={false}
             />

                {/* <!-- Price --> */}
                <ProductPrice 
                  price={0}
                  old_price={0}
                />

                {/* <!-- Product Description --> */}
                <ProductDescription 
                  short_description=""
                  description=""
                />

                <hr className="border-gray-300 dark:border-gray-800"/>

                {/* <!-- Quantity --> */}
              <ProductVariations 
                variations={{
                  id: 1,
                  name: "Size",
                  values: []
                }}
                hasVariations={false}
              />

                <div className="space-y-2">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-900 dark:text-white">Do you have another comment?</label>
                    <textarea id="comment" name="comment" rows={3} className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your comment here..."></textarea>
                </div>

                {/* <!-- Action Buttons --> */}
                <div className="product-actions space-y-3">

                    <button id="addToCart" className="w-full py-1 product-add-to-cart flex-1 te-btn te-btn-primary flex gap-2 items-center justify-center">
                        {/* <!-- Cart Icon --> */}
                        <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                            <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                        </svg>
                        <span>Add to Cart</span>
                    </button>

                    <a href="/cart" className="w-full py-1 te-btn flex gap-2 bg-gray-800 text-white hover:bg-gray-600 text-center">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="8" cy="21" r="1"></circle>
                            <circle cx="19" cy="21" r="1"></circle>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                        </svg>
                        <span>Buy Now</span>
                    </a>

                    {/* <!-- WhatsApp Button --> */}
                    <button id="whatsappBtn" className="w-full py-3 bg-[#075E54] hover:bg-green-600 text-white font-medium rounded-md flex gap-2 items-center justify-center transition-colors">
                        {/* <!-- WhatsApp Icon --> */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
                        </svg>
                        Contact via WhatsApp
                    </button>

                </div>

                {/* <!-- Product Meta --> */}
               <ProductMeta />

                {/* <!-- Merchant Details --> */}
                <ProductMerchant />
                {/* <!-- <?php include 'template-parts/product/product-merchant.php'; ?> --> */}

                {/* <!-- Product Share --> */}
                <ProductShare />
                {/* <?php include 'template-parts/product/product-share.php'; ?> */}

            </div>
        </div>

    </div>
    {/* <!-- Grid --> */}

    {/* <?php include 'template-parts/product/product-tabs.php'; ?> */}


  

</div>
    </>
  )
}

export default ProductDetails
