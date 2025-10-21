import React from 'react'
import Link from 'next/link'
function OrderItem({order}: {order: any}) {
  return (
    <>
             <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">ORD-2024-{order?.order_num}</td>
                    <td className="px-6 py-4">{order?.created_at}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 bg-${order?.status?.color}-100 dark:bg-${order?.status?.color}-900 text-${order?.status?.color}-800 dark:text-${order?.status?.color}-200 text-xs font-medium rounded-full`}
                      >
                        {order?.status_value}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs">﷼</span> {order?.total_amount}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/order/${order?.id}`} className="font-medium text-primary-600 dark:text-primary-100 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
    </>
  )
}

export default OrderItem
