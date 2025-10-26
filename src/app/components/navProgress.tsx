"use client";
import React, { useEffect, useRef, useState } from "react";

const NavProgress: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [progressWidth, setProgressWidth] = useState(0);

  // 🔹 Scroll progress bar effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgressWidth(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Close all dropdowns and menus
  const closeAll = () => {
    setActiveDropdown(null);
    setActiveMegaMenu(null);
    setActiveSubmenu(null);
    setMobileMenuOpen(false);
  };

  // 🔹 Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!navbarRef.current?.contains(e.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // 🔹 Escape key closes all
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* ✅ Scroll progress bar */}
      <div
        id="navbar-progress"
        className="te-navbar-progress fixed top-0 left-0 h-[2px] z-50 transition-[width] ease-out duration-150 bg-gradient-to-r from-primary-500 to-secondary-500"
        style={{ width: `${progressWidth}%` }}
      ></div>

     
    </>
  );
};

export default NavProgress;
