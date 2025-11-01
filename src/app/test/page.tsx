'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function TestPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`)
        const colors = res.data.data.settings

        // 🟢 Define the variable early in :root
        const root = document.documentElement
        root.style.setProperty('--apicolor-primary', colors.primary_color)
        root.style.setProperty('--apicolor-secondary', colors.gradient_two)

        setLoaded(true)
      } catch (err) {
        console.error(err)
      }
    }

    fetchColors()
  }, [])

  return (
    <div
      className={`min-h-screen flex items-center justify-center text-white text-3xl font-bold transition-colors duration-500 ${
        loaded ? 'bg-primaryapp' : 'bg-gray-500'
      }`}
    >
      {loaded ? '✅ Colors Loaded' : 'Loading...'}
    </div>
  )
}
