import React from 'react'
import ProductItem from '../components/products'
import { Product } from '../dummyData/products'
import Breadcrumb from '../components/header/headerBreadcrumb'
import axios from "axios";
import PriceFilterWidget from '../components/product/widgets/priceWidget';
import CategoryWidget from '../components/product/widgets/categoryWidget';
import SizeColorFilter from '../components/product/widgets/variableWidget';
import ProductSortControls from '../components/product/widgets/filterform';
import ProductPagination from '../components/product/productPagination';
import ProductCard from '../components/Home/product/ProductCard';

interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    sort?: string;
    category?: string;
    price_min?: string;
    price_max?: string;
  };
}

async function Products({ searchParams }: ProductsPageProps) {
  // Get pagination parameters from URL
  const currentPage = parseInt(searchParams.page || '1');
  const itemsPerPage = parseInt(searchParams.limit || '12');
  const sortBy = searchParams.sort || 'newest';
  const category = searchParams.category;
  const priceMin = searchParams.price_min;
  const priceMax = searchParams.price_max;

  // Build query parameters for API
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
    sort: sortBy,
  });

  if (category) queryParams.append('category', category);
  if (priceMin) queryParams.append('price_min', priceMin);
  if (priceMax) queryParams.append('price_max', priceMax);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${"47|rxMmn1NTKT6v7hPbLqUkKvPWVdLejbK5G2NZ8WK6c5561f6d"}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }
    );

    const productsData = response.data.data;
    const products = productsData.items || [];
    
    // Extract pagination data from the API response
    const paginationData = productsData.paginate || {};
    const totalItems = paginationData.total || 0;
    const totalPages = paginationData.total_pages || 0;
    const currentPageFromAPI = paginationData.current_page || currentPage;
    const itemsPerPageFromAPI = paginationData.per_page || itemsPerPage;

    console.log('Products API Response:', {
      products: products.length,
      totalItems,
      currentPage: currentPageFromAPI,
      totalPages,
      itemsPerPage: itemsPerPageFromAPI,
      paginationData
    });

    return (
      <div className="container my-12">
        <Breadcrumb />
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 hidden xl:block">
            <div className="sticky top-8 space-y-6">
              <PriceFilterWidget />
              <CategoryWidget />
              <SizeColorFilter />
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="space-y-6">
              <div className="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Products
                </h2>
                <ProductSortControls />
              </div>

              {/* Products Grid */}
              <div className="te-products">
                {products.length > 0 ? (
                  <div
                    id="products-grid"
                    className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                  >
                    {products.map((product: Product) => (

                      <ProductCard key={product.id} product={product} carousel={false} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-500 dark:text-gray-400">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                      <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <ProductPagination
                currentPage={currentPageFromAPI}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPageFromAPI}
              />
            </div>
          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error('Error fetching products:', error);
    
    return (
      <div className="container my-12">
        <Breadcrumb />
        <div className="text-center py-12">
          <div className="text-red-500">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error loading products</h3>
            <p className="text-gray-500 dark:text-gray-400">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Products
