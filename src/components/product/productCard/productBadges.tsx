import React from 'react'

interface Badge {
  type: string
  text: string
}

interface ProductBadgesProps {
  badges?: Badge[]
}

const badgeClasses: Record<string, string> = {
  new: "bg-green-500/20 text-green-500",
  sale: "bg-red-500/20 text-red-500",
  bestseller: "bg-blue-500/20 text-blue-500",
  limited: "bg-purple-500/20 text-purple-500",
  hot: "bg-orange-500/20 text-orange-500",
}

function ProductBadges({ badges }: ProductBadgesProps) {
  if (!badges || badges.length === 0) {
    return null
  }

  return (
    <div className="product-badges absolute top-2 start-2 z-10 flex flex-col gap-1">
      {badges.map((badge, i) => (
        <span
          key={i}
          className={`product-badge px-2 py-1 text-xs font-semibold rounded-full ${
            badgeClasses[badge.type] || "bg-gray-500 text-white"
          }`}
        >
          {badge.text}
        </span>
      ))}
    </div>
  )
}

export default ProductBadges

