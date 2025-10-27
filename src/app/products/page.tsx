import React from 'react'
import { Product } from '../dummyData/products'
import Breadcrumb from '../components/header/headerBreadcrumb'
import axios from "axios";
import PriceFilterWidget from '../components/product/widgets/priceWidget';
import CategoryWidget from '../components/product/widgets/categoryWidget';
import SizeColorFilter from '../components/product/widgets/variableWidget';
import ProductSortControls from '../components/product/widgets/filterform';
import ProductPagination from '../components/product/productPagination';
import { getLocale, getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import ProductCard2 from '../components/productCard2';
import FilterSidebar from '../components/product/widgets/FilterSidebar';
interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    sort?: string;
    category?: string;
    categories?: string;
    min_price?: string;
    max_price?: string;
    keyword?: string;
    sizes?: string;
    colors?: string;
    attributes?: string;
  };
}

async function Products({ searchParams }: ProductsPageProps) {
  const locale = await getLocale();
  const t = await getTranslations();
  
  // Get token from cookies (preferred method)
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || null;
  
  // Alternative: Get token from headers
  // const headersList = await headers();
  // const token = headersList.get('authorization')?.replace('Bearer ', '') || null;
  // Get pagination parameters from URL
  const currentPage = parseInt(searchParams.page || '1');
  const itemsPerPage = parseInt(searchParams.limit || '12');
  const sortBy = searchParams.sort || 'newest';
  const category = searchParams.category;
  const categories = searchParams.categories;
  
  // Handle categories[] array parameter - extract from searchParams
  const categoriesArray: string[] = [];
  const searchParamsString = searchParams.toString();
  if (searchParamsString) {
    const urlParams = new URLSearchParams(searchParamsString);
    const categoriesArrayFromUrl = urlParams.getAll('categories[]');
    categoriesArray.push(...categoriesArrayFromUrl);
  }

  const priceMin = searchParams.min_price;
  const priceMax = searchParams.max_price;
  const searchQuery = searchParams.keyword;
  const sizes = searchParams.sizes;
  const colors = searchParams.colors;
  
  // Handle nested attributes format (attributes[1]=3&attributes[2]=20)
  const attributesObject: Record<string, string[]> = {};
  if (searchParamsString) {
    const urlParams = new URLSearchParams(searchParamsString);
    for (const [key, value] of urlParams.entries()) {
      if (key.startsWith('attributes[') && key.endsWith(']')) {
        const attrId = key.slice(11, -1); // Extract attribute ID from "attributes[1]"
        if (!attributesObject[attrId]) {
          attributesObject[attrId] = [];
        }
        attributesObject[attrId].push(value);
      }
    }
  }

  console.log('Search params received:', {
    searchQuery,
    category,
    categories,
    categoriesArray,
    priceMin,
    priceMax,
    sizes,
    colors,
    attributesObject,
    allSearchParams: searchParams
  });

  // Build query parameters for API
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
    sort: sortBy,
  });

  // Handle both single category and multiple categories
  if (categoriesArray && categoriesArray.length > 0) {
    // Use categories[] array parameter
    categoriesArray.forEach(catId => {
      queryParams.append('categories[]', catId);
    });
  } else if (categories) {
    queryParams.append('categories', categories);
  } else if (category) {
    queryParams.append('category', category);
  }
  
  if (priceMin) queryParams.append('min_price', priceMin);
  if (priceMax) queryParams.append('max_price', priceMax);
  if (searchQuery && searchQuery.trim()) queryParams.append('keyword', searchQuery.trim());
  if (sizes) queryParams.append('sizes', sizes);
  if (colors) queryParams.append('colors', colors);
  
  // Add nested attributes to query parameters
  Object.entries(attributesObject).forEach(([attrId, values]) => {
    values.forEach(value => {
      queryParams.append(`attributes[${attrId}]`, value);
    });
  });

  console.log('API Query Parameters:', queryParams.toString());
  console.log('Category parameters being sent to API:', { category, categories, categoriesArray });
  console.log('Price parameters being sent to API:', { priceMin, priceMax });
  console.log('Size and color parameters being sent to API:', { sizes, colors });
  console.log('Attributes parameter being sent to API:', { attributesObject });
  try {
    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products?${queryParams.toString()}`,
      {
        headers: {
          ...headers,
          "Accept-Language": locale,
        },  
      }
    );

    const productsData = response.data.data;
    console.log('productsData',productsData)
    const products = (productsData.items || []).map((product: Product & { is_favourite?: boolean }) => ({
      ...product,
      is_favourite: product.is_favourite || false // Ensure is_favourite property exists
    }));
    
    // Extract pagination data from the API response
    const paginationData = productsData.paginate || {};
    const totalItems = paginationData.total || 0;
    const totalPages = paginationData.total_pages || 0;
    const currentPageFromAPI = paginationData.current_page || currentPage;
    const itemsPerPageFromAPI = paginationData.per_page || itemsPerPage;

   

    return (
      <div className="container my-12">
        <Breadcrumb name="Products" />
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar */}
         <FilterSidebar/>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="space-y-6">
              <div className="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchQuery ? t('Search Results') : t('Our Products')}
                  </h2>
               
                </div>
                <ProductSortControls />
             
              </div>

              {/* Products Grid */}
              <div className="te-products">

                {products.length > 0 ? (
                  <div
                    id="products-grid"
                    className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                  >
                    {products?.map((product: Product) => (
                    <ProductCard2 key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-500 dark:text-gray-400">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {searchQuery ? t('No products found for your search') : t('No products found')}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchQuery 
                          ? `No products found for "${searchQuery}". Try different keywords or browse all products.` 
                          : t('Try adjusting your search or filter criteria')
                        }
                      </p>
                      {searchQuery && (
                        <button 
                          onClick={() => window.location.href = '/products'}
                          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                        >
                          {t('Browse All Products')}
                        </button>
                      )}
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
        <Breadcrumb name="Products" />
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
