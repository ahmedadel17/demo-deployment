import ProductSlider from './components/Home/productSlider'
import Breadcrumb from "./components/header/headerBreadcrumb";
import axios from "axios";
import {getLocale} from 'next-intl/server'
import { EmblaCarousel } from "./components/Home/emblaslider";
export default  async function Home() {
  const locale = await getLocale();
  const home = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home-v2`, {
    headers: {
      'Accept-Language': locale
    }
  });
  return (
    <div className="" >
        <Breadcrumb />
        {home.data.data.sections.sliders.data.length > 0 && (
          <EmblaCarousel slides={home.data.data.sections.sliders.data} />
        )}
        {home.data.data.sections.featured_products.data.length > 0 && (
          <ProductSlider products={home.data.data.sections.featured_products.data} />
        )}
    </div>


  );
}
