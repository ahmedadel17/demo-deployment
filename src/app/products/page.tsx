import React from 'react'
import { Product } from '../dummyData/products'
import Breadcrumb from '@/components/header/headerBreadcrumb'
import axios from "axios";
import PriceFilterWidget from '@/components/product/widgets/priceWidget';
import CategoryWidget from '@/components/product/widgets/categoryWidget';
import SizeColorFilter from '@/components/product/widgets/variableWidget';
import ProductSortControls from '@/components/product/widgets/filterform';
import ProductPagination from '@/components/product/productPagination';
import { getLocale, getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import ProductCard2 from '@/components/product/productCard2';
import FilterSidebar from '@/components/product/widgets/FilterSidebar';
interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    per_page?: string;
    category?: string;
    categories?: string | string[];
    'categories[]'?: string | string[];
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
  
 
  const currentPage = parseInt(searchParams.page || '1');
  const itemsPerPage = parseInt(searchParams.limit || searchParams.per_page || '12');
  const sortBy = searchParams.sort || searchParams.order || 'newest';
  
  // Get grid columns based on per_page value
  const perPage = parseInt(searchParams.per_page || '9');
  const getGridCols = (perPageValue: number) => {
    switch (perPageValue) {
      case 6:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2';
      case 9:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3';
      case 12:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3';
    }
  };
  const gridColsClass = getGridCols(perPage);
  const category = searchParams.category;
  // Handle categories[] array format from URL
  const categoriesParam = searchParams['categories[]'];
  const categoriesArray = Array.isArray(categoriesParam)
    ? categoriesParam
    : categoriesParam
      ? [categoriesParam]
      : Array.isArray(searchParams.categories)
        ? searchParams.categories
        : searchParams.categories
          ? [searchParams.categories]
          : [];
  const priceMin = searchParams.min_price;
  const priceMax = searchParams.max_price;
  const searchQuery = searchParams.keyword;
  const sizes = searchParams.sizes;
  const colors = searchParams.colors;
  const attributes = searchParams.attributes;

  // console.log('Search params received:', {
  //   searchQuery,
  //   category,
  //   categoriesArray,
  //   priceMin,
  //   priceMax,
  //   sizes,
  //   colors,
  //   attributes,
  //   allSearchParams: searchParams
  // });

  // Build query parameters for API
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
    sort: sortBy,
  });

  // Handle categories[] array format for API
  if (categoriesArray.length > 0) {
    categoriesArray.forEach((cat: string) => {
      queryParams.append('categories[]', cat);
    });
  } else if (category) {
    queryParams.append('category', category);
  }
  
  if (priceMin) queryParams.append('min_price', priceMin);
  if (priceMax) queryParams.append('max_price', priceMax);
  if (searchQuery && searchQuery.trim()) queryParams.append('keyword', searchQuery.trim());
  if (sizes) queryParams.append('sizes', sizes);
  if (colors) queryParams.append('colors', colors);
  if (attributes) queryParams.append('attributes', attributes);

  // console.log('API Query Parameters:', queryParams.toString());
  // console.log('Category parameters being sent to API:', { category, categoriesArray });
  // console.log('Price parameters being sent to API:', { priceMin, priceMax });
  // console.log('Size and color parameters being sent to API:', { sizes, colors });
  // console.log('Attributes parameter being sent to API:', { attributes });

  try {
    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Debug: Check what the API base URL is
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    // console.log('Products page - Environment check:', {
    //   'process.env.NEXT_PUBLIC_API_BASE_URL': apiBaseUrl,
    //   'typeof apiBaseUrl': typeof apiBaseUrl,
    //   'NODE_ENV': process.env.NODE_ENV
    // });
    
    if (!apiBaseUrl) {
      console.error('NEXT_PUBLIC_API_BASE_URL is not set! This will cause requests to go to localhost.');
      throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not set. Please check your .env file.');
    }
    
    // Ensure proper URL construction
    const cleanBaseUrl = apiBaseUrl.replace(/\/+$/, '');
    const apiUrl = `${cleanBaseUrl}/catalog/products?${queryParams.toString()}`;
    
    // console.log('🟢 Products Page - Making API request to:', apiUrl);
    // console.log('🟢 Products Page - Request URL:', apiUrl);
    // console.log('🟢 Products Page - Query Parameters:', queryParams.toString());
    // console.log('🟢 Products Page - Selected Categories:', categoriesArray);
    // console.log('🟢 Products Page - Full Request Details:', {
    //   baseUrl: cleanBaseUrl,
    //   endpoint: '/catalog/products',
    //   queryParams: Object.fromEntries(queryParams),
    //   headers: {
    //     ...headers,
    //     "Accept-Language": locale,
    //   }
    // });
    
    // Helper function to retry with exponential backoff
    const retryWithBackoff = async <T,>(fn: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> => {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await fn();
        } catch (error) {
          const isLastAttempt = i === maxRetries - 1;
          const axiosError = error as { response?: { status?: number } };
          
          // Check if it's a 429 error and not the last attempt
          if (axiosError?.response?.status === 429 && !isLastAttempt) {
            const retryDelay = delay * Math.pow(2, i); // Exponential backoff
            console.warn(`Rate limited (429). Retrying in ${retryDelay}ms... (Attempt ${i + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            continue;
          }
          
          // If it's not a 429 or it's the last attempt, throw the error
          throw error;
        }
      }
      throw new Error('Max retries exceeded');
    };

    const response = await retryWithBackoff(
      () => axios.get(
        apiUrl,
        {
          headers: {
            ...headers,
            "Accept-Language": locale,
          },  
        }
      ),
      3, // max retries
      1000 // initial delay in ms
    );
    
    // console.log('🟢 Products Page - API Response received:', {
    //   status: response.status,
    //   dataCount: response.data?.data?.items?.length || 0,
    //   totalPages: response.data?.data?.paginate?.total_pages || 0
    // });

    const productsData = response.data.data;
    const products = (productsData.items || []).map((product: Product & { is_favourite?: boolean }) => ({
      ...product,
      is_favourite: product.is_favourite || false // Ensure is_favourite property exists
    }));
    console.log('products', products);
    
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
                    className={`grid gap-3 ${gridColsClass} lg:gap-6`}
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
    
    // Check if it's a 429 rate limit error
    const axiosError = error as { response?: { status?: number } };
    const isRateLimited = axiosError?.response?.status === 429;
    const errorMessage = isRateLimited 
      ? 'Too many requests. Please wait a moment and try again.'
      : 'Error loading products. Please try again later.';
    
    return (
      <div className="container my-12">
        <Breadcrumb name="Products" />
        <div className="text-center py-12">
          <div className="text-red-500">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {isRateLimited ? 'Rate Limit Exceeded' : 'Error loading products'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">{errorMessage}</p>
            {isRateLimited && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                The server is receiving too many requests. Please wait a few seconds before refreshing.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Products
