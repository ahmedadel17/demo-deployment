import axios from "axios";

// Helper function to retry with exponential backoff for 429 errors
const retryWithBackoff = async <T,>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = i === maxRetries - 1;
      const axiosError = error as { response?: { status?: number } };
      
      // Check if it's a 429 error and not the last attempt
      if (axiosError?.response?.status === 429 && !isLastAttempt) {
        const retryDelay = delay * Math.pow(2, i); // Exponential backoff: 1s, 2s, 4s
        console.warn(`Rate limited (429) on ${fn.toString().substring(0, 50)}... Retrying in ${retryDelay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
      
      // If it's not a 429 or it's the last attempt, throw the error
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
};

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
    
    // Use retry logic with exponential backoff for the request
    const response = await retryWithBackoff(
      () => axios.get(
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
      ),
      3, // max retries
      1000 // initial delay in ms
    );
    
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const statusText = error.response?.statusText || error.message;
      
      // Provide more specific error messages
      if (status === 429) {
        console.error("Rate limit exceeded (429): Too many requests. Please wait a moment and try again.");
        throw new Error("Network Error: Too many requests. Please wait a moment and try again.");
      } else if (status === 404) {
        console.error("Axios error (404): Resource not found -", error.message);
        throw new Error("Network Error: The requested resource was not found.");
      } else if (status === 500) {
        console.error("Axios error (500): Server error -", error.message);
        throw new Error("Network Error: Something went wrong on the server. Please try again later.");
      } else if (status && status >= 400) {
        console.error(`Axios error (${status}): ${statusText} -`, error.message);
        throw new Error(`Network Error: ${statusText || 'Something went wrong. Please try again.'}`);
      } else if (!error.response) {
        // Network error (no response)
        console.error("Network error: No response from server -", error.message);
        throw new Error("Network Error: Unable to connect to the server. Please check your internet connection.");
      } else {
        console.error("Axios error:", error.message);
        throw new Error("Network Error: Something went wrong. Please try again.");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Network Error: An unexpected error occurred. Please try again.");
    }
  }
};

export default getRequest;
