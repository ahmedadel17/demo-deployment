import React from 'react'
import DashboardSidebar from '../../components/dashboard/dashboardSidebar'
import Breadcrumb from '../../components/header/headerBreadcrumb'

function layout({children}: {children: React.ReactNode}) {
  return (
      <div id="content" className="flex-1 mt-8 mb-8 site-content">

    <div className="container">

    <main id="main" role="main">
                    <Breadcrumb name="Dashboard" />                         
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

    
    <DashboardSidebar />
    {children}
   
</div>

</main>
</div>
</div>


  )
}

export default layout
