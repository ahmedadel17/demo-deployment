import axios from "axios"

const postRequest = async (endpoint: string, data: unknown, headers: Record<string, string>, token: string | null, locale?: string | null) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {}),
        'Accept-Language': locale || 'en'
      }
    }
  )
  return response;
}
export default postRequest;