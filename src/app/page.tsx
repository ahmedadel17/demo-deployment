import ProductSlider from './components/Home/productSlider'
import Breadcrumb from "./components/header/headerBreadcrumb";
import axios from "axios";
import {getLocale} from 'next-intl/server'
import { SliderComponent } from "./components/Home/sliderComponent";
import ProductCard2 from "./components/productCard2";
export default  async function Home() {
  const locale = await getLocale();
  const home = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home-v2`, {
    headers: {
      'Accept-Language': locale
    }
  });
  
  // Add is_favourite property to featured products
  interface Product {
    id: string | number;
    name: string;
    price: number;
    is_favourite?: boolean;
    [key: string]: unknown;
  }
  
  const featuredProducts = home.data.data.sections.featured_products.data.map((product: Product) => ({
    ...product,
    is_favourite: product.is_favourite || false
  }));
  
  return (
<div className='flex flex-col min-h-screen'>

<div id="content" className="flex-1 site-content" role="main">
 
   <div className='primary'>

    <div className="main" >
        {home.data.data.sections.sliders.data.length > 0 && (
          <SliderComponent slides={home.data.data.sections.sliders.data} />
        )}
        {featuredProducts.length > 0 && (
          <ProductSlider products={featuredProducts} />
        )}
    </div>
    </div>
    </div>
</div>




  );
}
