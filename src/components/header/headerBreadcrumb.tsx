"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Breadcrumb: React.FC<{name: string}> = ({name}) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useState("home");

  // Get current page name from URL - moved to useEffect to prevent hydration mismatch
  useEffect(() => {
    const path = pathname || "/";
    const extractedPageName = path
      .split("/")
      .filter(Boolean)
      .pop() || "home";
    
    // Format like PHP: replace dashes/dots → spaces and capitalize words
    const formattedName = extractedPageName
      .replace(/[-.]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    
    setPageName(formattedName);
  }, [pathname]);

  return (
<nav className="mb-8">
    <div className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Home</a>
        <svg className="w-4 h-4 rtl:scale-x-[-1]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
        </svg>
        <span className="text-gray-900 dark:text-white font-medium">{name}</span>
    </div>
</nav>

  );
};

export default Breadcrumb;
