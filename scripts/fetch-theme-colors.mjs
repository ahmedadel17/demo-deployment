// Fetch brand colors from API and write to components/theme-colors.json
// Run this before dev/build: `node scripts/fetch-theme-colors.mjs`

import { writeFile } from 'node:fs/promises'

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL
// Your API says the endpoint is named "settings"
const ENDPOINT = process.env.NEXT_PUBLIC_THEME_COLORS_ENDPOINT || '/settings'

async function main() {
  try {
    if (!BASE) {
      console.error('NEXT_PUBLIC_API_BASE_URL is not set; skipping theme color fetch')
      return
    }
    const base = BASE.replace(/\/+$/, '')
    const url = `${base}${ENDPOINT.startsWith('/') ? '' : '/'}${ENDPOINT}`
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
    if (!res.ok) {
      console.error('Failed to fetch theme colors:', res.status, res.statusText)
      return
    }
    const data = await res.json()

    // Normalize known keys from endpoint response
    const primary_color = data?.primary_color || data?.data?.primary_color || data?.primary || data?.data?.primary || '#0A2463'
    const location_color = data?.location_color || data?.data?.location_color || '#00b0ff'
    const black_color = data?.black_color || data?.data?.black_color || '#171717'
    const black1c_color = data?.black1c_color || data?.data?.black1c_color || '#000000'
    const title_color = data?.title_color || data?.data?.title_color || '#171717'
    const divider_color = data?.divider_color || data?.data?.divider_color || '#d9dbe9'
    const border_color = data?.border_color || data?.data?.border_color || '#f4f4f4'
    const red_color = data?.red_color || data?.data?.red_color || '#e22400'

    // Backward-compat common aliases used by tailwind.config
    const primary = primary_color
    const accent = location_color
    const secondary = data?.secondary || data?.data?.secondary || '#CAA34E'

    const out = {
      // Original fields consumed by tailwind.config
      primary,
      secondary,
      accent,
      // Full palette from endpoint
      primary_color,
      location_color,
      black_color,
      black1c_color,
      title_color,
      divider_color,
      border_color,
      red_color
    }
    await writeFile('components/theme-colors.json', JSON.stringify(out, null, 2), 'utf8')
    console.log('Wrote components/theme-colors.json with', out)
  } catch (err) {
    console.error('Error fetching theme colors:', err)
  }
}

await main()


