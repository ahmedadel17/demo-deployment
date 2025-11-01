import React from 'react'

function TopBarLink( { url,label }: { url: string, label: string } ) {
  return (
    <li>
                        <a href={url} className="hover:text-gray-800 dark:hover:text-gray-400 transition-colors duration-200">{label}</a>
                    </li>
  )
}

export default TopBarLink
