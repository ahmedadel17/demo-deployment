import axios from "axios";

const getRequest = async (
    endpoint: string, headers: Record<string, string>, token: string | null, locale?: string | null
) => {
  try {
    // Debug: Check what the API base URL is
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    // console.log('Environment check:', {
    //   'process.env.NEXT_PUBLIC_API_BASE_URL': apiBaseUrl,
    //   'typeof apiBaseUrl': typeof apiBaseUrl,
    //   'endpoint': endpoint,
    //   'NODE_ENV': process.env.NODE_ENV
    // });
    
    if (!apiBaseUrl) {
      console.error('NEXT_PUBLIC_API_BASE_URL is not set! This will cause requests to go to localhost.');
      console.error('Available env vars:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
      throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not set. Please check your .env file.');
    }
    
    // Ensure proper URL construction
    const cleanBaseUrl = apiBaseUrl.replace(/\/+$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;
    
    // console.log('URL construction:', {
    //   'original apiBaseUrl': apiBaseUrl,
    //   'cleanBaseUrl': cleanBaseUrl,
    //   'endpoint': endpoint,
    //   'cleanEndpoint': cleanEndpoint,
    //   'final URL': fullUrl
    // });
    
    const response = await axios.get(
      fullUrl,
      {
        headers: {
          "Content-Type": "application/json",
          'Accept-Language': locale || 'en',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
           // merge custom headers
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export default getRequest;
