import React from 'react'

interface ProductThumbnailImagesProps {
  thumbnail: string
  hover?: string
  name: string
  title?: string
}

function ProductThumbnailImages({ thumbnail, hover, name, title }: ProductThumbnailImagesProps) {
  return (
    <>
      {/* Thumbnail Images */}
      <img
        src={thumbnail}
        alt={name}
        width={300}
        height={320}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out transform"
      />
      {hover && (
        <img
          src={hover}
          alt={`${title || name} hover`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
        />
      )}
    </>
  )
}

export default ProductThumbnailImages

