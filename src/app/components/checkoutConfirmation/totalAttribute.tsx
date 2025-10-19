import React from 'react'

function TotalAttribute({value, label}: {value: string | number | undefined, label: string}) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
    <div className="flex justify-between">
      <span className="text-lg font-semibold text-gray-900 dark:text-white">{label}</span>
      <span className="text-lg font-semibold text-gray-900 dark:text-white"><span className="icon-riyal-symbol" /><span>{value}</span></span>
    </div>
  </div>
  )
}

export default TotalAttribute
