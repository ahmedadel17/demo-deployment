import React from 'react'

function FooterLink( { url,label }: { url: string, label: string } ) {
  return (
    <li><a href={url} className="te-footer-link">{label}</a></li>
  )
}

export default FooterLink
