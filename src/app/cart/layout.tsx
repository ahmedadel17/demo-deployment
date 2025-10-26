
function Layout({children}: {children: React.ReactNode}) {
  return (
    <div id="content" className="flex-1 mt-8 mb-8 site-content" role="main">
    <div id="primary" className="container">
        <main id="main" role="main">
            {/* <!-- Breadcrumb --> */}
            <nav className="mb-8">
<div className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
<a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Home</a>
<svg className="w-4 h-4 rtl:scale-x-[-1]" fill="currentColor" viewBox="0 0 20 20">
<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
</svg>
<span className="text-gray-900 dark:text-white font-medium">Cart</span>
</div>
</nav>                            

{children}










</main>
</div>
</div>

  )
}

export default Layout
