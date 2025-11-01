import Link from 'next/link'
import React from 'react'

function MegaMenuLink({url, label}: {url: string, label: string}) {
  return (
    <Link href={url} className="te-navbar-mega-menu-link">{label}</Link>

  )
}

export default MegaMenuLink
