class NavbarManager {
    constructor() {
        this.elements = this.cacheElements();
        this.state = {
            activeDropdown: null,
            activeMegaMenu: null,
            activeSubmenu: null,
            mobileMenuOpen: false,
            isTouch: this.isTouchDevice()
        };
        this.bindEvents();
    }

    // Detect if device supports touch
    isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    cacheElements() {
        return {
            toggles: document.querySelectorAll(".te-navbar-toggle"),
            mobileMenus: document.querySelectorAll(".te-navbar-nav-mobile"),
            dropdownButtons: document.querySelectorAll("[data-dropdown]"),
            dropdownContents: document.querySelectorAll(".te-navbar-dropdown-content"),
            submenuLinks: document.querySelectorAll(".te-navbar-link-has-submenu"),
            megaMenuLinks: document.querySelectorAll(".te-navbar-link-has-mega-menu"),
            megaMenus: document.querySelectorAll(".te-navbar-mega-menu"),
            submenuContents: document.querySelectorAll(".te-navbar-submenu-content"),
            mobileSubmenuLinks: document.querySelectorAll(".te-navbar-link-mobile-has-submenu"),
            mobileSubmenus: document.querySelectorAll(".te-navbar-submenu-mobile"),
        };
    }

    bindEvents() {
        try {
            this.initMobileMenu();
            this.initDropdowns();
            this.initSubmenus();
            this.initMegaMenus();
            this.initMobileSubmenus();
            this.initGlobalEvents();
        } catch (e) {
            console.error("Error initializing navbar:", e);
        }
    }

    initMobileMenu() {
        this.elements.toggles.forEach((toggle, index) => {
            if (toggle) {
                toggle.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.toggleMobileMenu(index);
                });
            }
        });
    }

    toggleMenuIcon(toggle, isOpen) {
        const svg = toggle.querySelector("svg");
        if (svg) {
            if (isOpen) {
                svg.innerHTML = `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>`;
            } else {
                svg.innerHTML = `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
            }
        }
    }

    toggleMobileMenu(index) {
        const mobileMenu = this.elements.mobileMenus[index];
        const toggle = this.elements.toggles[index];

        if (!mobileMenu || !toggle) return;

        const isOpen = mobileMenu.classList.contains("te-navbar-nav-mobile-show");

        this.closeAllMobileMenus();

        if (isOpen) {
            this.state.mobileMenuOpen = false;
            this.toggleMenuIcon(toggle, false);
        } else {
            mobileMenu.classList.add("te-navbar-nav-mobile-show");
            this.state.mobileMenuOpen = true;
            this.toggleMenuIcon(toggle, true);
        }
    }

    initDropdowns() {
        this.elements.dropdownButtons.forEach((button) => {
            if (!button) return;

            const content = this.getDropdownContent(button);
            if (!content) return;

            button.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown(content);
            });

            content.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });
    }

    getDropdownContent(button) {
        const dropdown = button.closest(".te-navbar-dropdown");
        return dropdown?.querySelector(".te-navbar-dropdown-content");
    }

    toggleDropdown(content) {
        const isOpen = content.classList.contains("te-dropdown-show");

        // Close ALL menu types before opening dropdown
        this.closeAllDropdowns();
        this.closeAllSubmenus();
        this.closeAllMegaMenus();

        if (isOpen) {
            this.state.activeDropdown = null;
        } else {
            content.classList.add("te-dropdown-show");
            this.state.activeDropdown = content;
        }
    }

    initSubmenus() {
        this.elements.submenuLinks.forEach((link) => {
            if (!link) return;

            const submenuContent = this.getSubmenuContent(link);
            if (!submenuContent) return;

            const dropdown = link.closest(".te-navbar-dropdown");
            if (!dropdown) return;

            if (this.state.isTouch) {
                // Touch devices: use click events
                link.addEventListener("click", (e) => {
                    // Only prevent default if this link has a submenu
                    if (submenuContent) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleSubmenu(submenuContent);
                    }
                });
            } else {
                // Desktop: use hover events
                dropdown.addEventListener("mouseenter", () => {
                    this.showSubmenu(submenuContent);
                });

                dropdown.addEventListener("mouseleave", () => {
                    this.hideSubmenu(submenuContent);
                });
            }
        });
    }

    getSubmenuContent(link) {
        const dropdown = link.closest(".te-navbar-dropdown");
        return dropdown?.querySelector(".te-navbar-submenu-content");
    }

    toggleSubmenu(content) {
        const isOpen = content.classList.contains("te-submenu-show");
        this.closeAllSubmenus();

        if (isOpen) {
            this.state.activeSubmenu = null;
        } else {
            this.showSubmenu(content);
        }
    }

    showSubmenu(content) {
        // Close ALL menu types before opening submenu
        this.closeAllSubmenus();
        this.closeAllMegaMenus();
        this.closeAllDropdowns();
        content.classList.add("te-submenu-show");
        this.state.activeSubmenu = content;
    }

    hideSubmenu(content) {
        content.classList.remove("te-submenu-show");
        if (this.state.activeSubmenu === content) {
            this.state.activeSubmenu = null;
        }
    }


    initMobileSubmenus() {
        this.elements.mobileSubmenuLinks.forEach((link) => {
            if (!link) return;

            link.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                const submenu = link.nextElementSibling;
                if (submenu && submenu.classList.contains('te-navbar-submenu-mobile')) {
                    this.toggleMobileSubmenu(link, submenu);
                }
            });
        });
    }

    toggleMobileSubmenu(link, submenu) {
        const isOpen = submenu.classList.contains('te-submenu-mobile-open');

        // Close all other mobile submenus
        this.elements.mobileSubmenus.forEach((menu) => {
            if (menu !== submenu) {
                menu.classList.remove('te-submenu-mobile-open');
            }
        });

        // Remove open state from all mobile submenu links
        this.elements.mobileSubmenuLinks.forEach((menuLink) => {
            if (menuLink !== link) {
                menuLink.classList.remove('te-mobile-submenu-open');
            }
        });

        // Toggle current submenu
        if (isOpen) {
            submenu.classList.remove('te-submenu-mobile-open');
            link.classList.remove('te-mobile-submenu-open');
        } else {
            submenu.classList.add('te-submenu-mobile-open');
            link.classList.add('te-mobile-submenu-open');
        }
    }

    closeAllMobileSubmenus() {
        this.elements.mobileSubmenus.forEach((menu) => {
            menu?.classList.remove('te-submenu-mobile-open');
        });
        this.elements.mobileSubmenuLinks.forEach((link) => {
            link?.classList.remove('te-mobile-submenu-open');
        });
    }

    initMegaMenus() {
        this.elements.megaMenuLinks.forEach((link) => {
            if (!link) return;

            const megaMenuContent = this.getMegaMenuContent(link);
            if (!megaMenuContent) return;

            const megaDropdown = link.closest(".te-navbar-mega-dropdown");
            if (!megaDropdown) return;

            if (this.state.isTouch) {
                // Touch devices: use click events
                link.addEventListener("click", (e) => {
                    // Only prevent default if this link has a mega menu
                    if (megaMenuContent) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleMegaMenu(megaMenuContent);
                    }
                });
            } else {
                // Desktop: use hover events
                megaDropdown.addEventListener("mouseenter", () => {
                    this.showMegaMenu(megaMenuContent);
                });

                megaDropdown.addEventListener("mouseleave", () => {
                    this.hideMegaMenu(megaMenuContent);
                });
            }
        });
    }

    getMegaMenuContent(link) {
        const megaDropdown = link.closest(".te-navbar-mega-dropdown");
        return megaDropdown?.querySelector(".te-navbar-mega-menu");
    }

    toggleMegaMenu(content) {
        const isOpen = content.classList.contains("te-mega-menu-show");
        this.closeAllMegaMenus();

        if (isOpen) {
            this.state.activeMegaMenu = null;
        } else {
            this.showMegaMenu(content);
        }
    }

    showMegaMenu(content) {
        // Close ALL menu types before opening mega menu
        this.closeAllMegaMenus();
        this.closeAllSubmenus();
        this.closeAllDropdowns();
        content.classList.add("te-mega-menu-show");
        this.state.activeMegaMenu = content;
    }

    hideMegaMenu(content) {
        content.classList.remove("te-mega-menu-show");
        if (this.state.activeMegaMenu === content) {
            this.state.activeMegaMenu = null;
        }
    }

    initGlobalEvents() {
        document.addEventListener("click", (e) => {
            this.handleOutsideClick(e);
        });

        document.addEventListener("keydown", (e) => {
            this.handleKeydown(e);
        });

        window.addEventListener("resize", this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    handleOutsideClick(e) {
        const dropdownClick = e.target.closest("[data-dropdown]") ||
            e.target.closest(".te-navbar-dropdown-content");

        const megaMenuClick = e.target.closest(".te-navbar-link-has-mega-menu") ||
            e.target.closest(".te-navbar-mega-menu");

        const submenuClick = e.target.closest(".te-navbar-link-has-submenu") ||
            e.target.closest(".te-navbar-submenu-content");

        const mobileMenuClick = e.target.closest(".te-navbar-toggle") ||
            e.target.closest(".te-navbar-nav-mobile");

        if (!dropdownClick) {
            this.closeAllDropdowns();
        }

        if (!megaMenuClick) {
            this.closeAllMegaMenus();
        }

        if (!submenuClick && this.state.isTouch) {
            this.closeAllSubmenus();
        }

        if (!mobileMenuClick) {
            this.closeAllMobileMenus();
        }
    }

    handleKeydown(e) {
        if (e.key === "Escape") {
            this.closeAll();
        }
    }

    handleResize() {
        if (window.innerWidth >= 1024) {
            this.closeAllMobileMenus();
        }

        // Update touch detection on resize (for devices that can switch modes)
        this.state.isTouch = this.isTouchDevice();
    }

    closeAll() {
        this.closeAllDropdowns();
        this.closeAllMegaMenus();
        this.closeAllSubmenus();
        this.closeAllMobileMenus();
        this.closeAllMobileSubmenus();
    }

    closeAllDropdowns() {
        this.elements.dropdownContents.forEach((content) => {
            content?.classList.remove("te-dropdown-show");
        });
        this.state.activeDropdown = null;
    }

    closeAllMegaMenus() {
        this.elements.megaMenus.forEach((menu) => {
            menu?.classList.remove("te-mega-menu-show");
        });
        this.state.activeMegaMenu = null;
    }

    closeAllSubmenus() {
        this.elements.submenuContents.forEach((content) => {
            content?.classList.remove("te-submenu-show");
        });
        this.state.activeSubmenu = null;
    }

    closeAllMobileMenus() {
        this.elements.mobileMenus.forEach((menu, index) => {
            menu?.classList.remove("te-navbar-nav-mobile-show");
            if (this.elements.toggles[index]) {
                this.toggleMenuIcon(this.elements.toggles[index], false);
            }
        });
        this.closeAllMobileSubmenus();
        this.state.mobileMenuOpen = false;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    destroy() {
        this.closeAll();
    }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    try {
        window.navbarManager = new NavbarManager();
    } catch (e) {
        console.error("Failed to initialize navbar:", e);
    }
});

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
    if (window.navbarManager) {
        window.navbarManager.destroy();
    }
});