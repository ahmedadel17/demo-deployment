'use client'
import { useEffect, useState, ReactNode } from 'react'
import axios from 'axios'

type Props = {
  children: ReactNode
}

export default function ColorProvider({ children }: Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`)
        const colors = res.data.data.settings

        const root = document.documentElement
        // console.log('colors 📱',colors);
        // Set all colors as CSS variables dynamically
        Object.entries(colors).forEach(([key, value]) => {
            // Handle colors that end with '_color', start with 'gradient_', or are gray/green/red with numbers
            if (key.endsWith('_color') || key.startsWith('gradient_') || 
                key.startsWith('gray_') || key.startsWith('green_') || key.startsWith('red_')) {
              let variableName = `--apicolor-${key}`
              
              // Remove '_color' suffix if present
              if (key.endsWith('_color')) {
                variableName = `--apicolor-${key.replace('_color', '')}`
              }
              
              root.style.setProperty(variableName, value as string)
          
              // 🟢 اطبع اسم اللون وقيمته
              console.log(`${variableName}: ${value}`)
            }
          })

        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch colors:', err)
        setLoading(false)
      }
    }

    fetchColors()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading theme...
      </div>
    )
  }

  return <>{children}</>
}
