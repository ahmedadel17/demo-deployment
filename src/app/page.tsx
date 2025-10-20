import FooterStyle1 from "./components/footer/styles/footerStyle1";
import HeaderStyle1 from "./components/header/styles/headerStyle1";
import ProductItem from "./components/products";
import ProductCarousel from "./components/product/productCarousel";
import { Product, products } from "./dummyData/products";
import ProductSlider from './components/Home/productSlider'
import Slider from './components/Home/slider'
import Breadcrumb from "./components/header/headerBreadcrumb";
import axios from "axios";
import {getTranslations} from 'next-intl/server'
import { EmblaCarousel } from "./components/Home/emblaslider";
export default  async function Home() {
  const t = await getTranslations();
  const home = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home-v2`);
  console.log('home',home.data.data.sections.sliders.data || []);
  return (
    <div className="" >
        <Breadcrumb />

        <EmblaCarousel slides={home.data.data.sections.sliders.data} />
      {/* <Slider slides={home.data.data.sections.sliders.data || []} /> */}
        <ProductSlider products={home.data.data.sections.featured_products.data} />
    </div>


  );
}
