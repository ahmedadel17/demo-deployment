import React from 'react'
import DashboardSidebar from '../components/dashboard/dashboardSidebar'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className="container mt-4">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      {/* Replace with your Sidebar Component */}
      <DashboardSidebar />
      {children}
      </div>
    </div>
  )
}

export default layout
