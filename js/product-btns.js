document.addEventListener('DOMContentLoaded', function () {
    // Prevent multiple initializations
    if (window.productCardsInitialized) {
        return;
    }
    window.productCardsInitialized = true;

    // Compare functionality
    let compareList = [];
    const compareBar = document.getElementById('compareBar');
    const compareCount = document.getElementById('compareCount');
    const compareBtn = document.getElementById('compareBtn');
    const clearCompareBtn = document.getElementById('clearCompare');

    // Wishlist functionality
    let wishlistCount = 0;

    // Initialize wishlist count
    fetch('wishlist-handler.php?action=count')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                wishlistCount = data.count;
                updateWishlistUI();
            }
        })
        .catch(error => console.error('Error loading wishlist count:', error));

    // Load existing wishlist items and update UI
    loadWishlistItems();

    // Handle compare buttons
    const compareButtons = document.querySelectorAll('.compare-btn');

    compareButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const productId = this.getAttribute('data-product-id');
            const productCard = this.closest('.product-item');
            const productTitle = productCard.getAttribute('data-product-title');
            const productPrice = productCard.getAttribute('data-product-price');
            const productImage = productCard.getAttribute('data-product-image');

            // Toggle compare state
            if (this.classList.contains('active')) {
                // Remove from compare
                compareList = compareList.filter(function (item) {
                    return item.id !== productId;
                });
                this.classList.remove('active');
            } else {
                // Add to compare
                if (compareList.length < 4) { // Limit to 4 products
                    compareList.push({
                        id: productId,
                        title: productTitle,
                        price: productPrice,
                        image: productImage
                    });
                    this.classList.add('active');
                } else {
                    showNotification('You can only compare up to 4 products at a time.', 'warning');
                    return;
                }
            }

            updateCompareBar();
        });
    });

    function updateCompareBar() {
        const count = compareList.length;
        if (compareCount) {
            compareCount.textContent = count + ' selected';
        }

        if (compareBar && count > 0) {
            compareBar.style.transform = 'translateY(0)';
            if (compareBtn) {
                compareBtn.disabled = count < 2;
            }
        } else if (compareBar) {
            compareBar.style.transform = 'translateY(100%)';
            if (compareBtn) {
                compareBtn.disabled = true;
            }
        }
    }

    // Compare button click
    if (compareBtn) {
        compareBtn.addEventListener('click', function () {
            if (compareList.length >= 2) {
                const productIds = compareList.map(function (p) {
                    return p.id;
                }).join(',');
                window.location.href = 'compare.php?products=' + productIds;
            }
        });
    }

    // Clear compare button
    if (clearCompareBtn) {
        clearCompareBtn.addEventListener('click', function () {
            compareList = [];
            compareButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            updateCompareBar();
        });
    }

    // Quick View functionality
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');

    quickViewBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const productCard = this.closest('.product-item');
            const productId = productCard.getAttribute('data-product-id');
            const productTitle = productCard.getAttribute('data-product-title');
            const productPrice = productCard.getAttribute('data-product-price');
            const productImage = productCard.getAttribute('data-product-image');

            openQuickView(productId, productTitle, productPrice, productImage);
        });
    });

    function openQuickView(productId, productTitle, productPrice, productImage) {
        // Check if modal already exists
        const existingModal = document.querySelector('.quickViewModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create a new modal
        const modal = document.createElement('div');
        modal.className = 'quickViewModal animate-fade-in fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';

        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center p-4 border-b sticky top-0 bg-white dark:bg-gray-800">
                    <h2 class="quickViewTitle text-xl font-semibold">${productTitle}</h2>
                    <button class="closeQuickView text-gray-400 hover:text-gray-600 text-3xl leading-none w-8 h-8 flex items-center justify-center" type="button">&times;</button>
                </div>
                <div class="quickViewContent p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="product-image">
                            <img src="${productImage}" alt="${productTitle}" class="w-full h-64 object-cover rounded-lg">
                        </div>
                        <div class="product-details">
                            <h3 class="text-lg font-semibold mb-2">${productTitle}</h3>
                            <p class="text-2xl font-bold text-blue-600 mb-4">$${productPrice}</p>
                            <div class="space-y-4">
                                <button class="w-full te-btn te-btn-primary" onclick="alert('Added to cart!')">
                                    Add to Cart
                                </button>
                                <a href="single.php?id=${productId}" class="w-full te-btn te-btn-default block text-center">
                                    View Full Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Setup close functionality
        const closeBtn = modal.querySelector('.closeQuickView');
        closeBtn.addEventListener('click', function () {
            closeQuickView(modal);
        });

        // Close on overlay click
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeQuickView(modal);
            }
        });
    }

    function closeQuickView(modal) {
        document.body.style.overflow = 'auto';
        modal.remove();
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.quickViewModal');
            openModals.forEach(function (modal) {
                closeQuickView(modal);
            });
        }
    });

    // Size/color functionality for product cards
    const productCards = document.querySelectorAll('.product-item');

    productCards.forEach(function (card) {
        // Size buttons in product cards
        const sizeButtons = card.querySelectorAll('.size-option');
        sizeButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                sizeButtons.forEach(function (b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        // Color buttons in product cards
        const colorButtons = card.querySelectorAll('.color-option');
        colorButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                colorButtons.forEach(function (b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    });

    // Add to cart functionality - Standalone version with inline icons
    const addToCartButtons = document.querySelectorAll('.product-add-to-cart');

    addToCartButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Initialize button if not already done (add icons directly)
            if (!this.hasAttribute('data-cart-initialized')) {
                // Add all icons if they don't exist
                if (!this.querySelector('.icon-cart')) {
                    this.insertAdjacentHTML('afterbegin', `<svg class="w-5 h-5 icon-cart" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                    <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                </svg>`);
                }
                if (!this.querySelector('.icon-loading')) {
                    this.insertAdjacentHTML('afterbegin', `<svg class="w-5 h-5 icon-loading animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="display: none;">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>`);
                }
                if (!this.querySelector('.icon-added')) {
                    this.insertAdjacentHTML('afterbegin', `<svg class="w-5 h-5 icon-added" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="display: none;">
                    <path d="M20 6 9 17l-5-5"></path>
                </svg>`);
                }
                this.setAttribute('data-cart-initialized', 'true');
            }

            // Prevent double-clicks
            if (this.disabled || this.classList.contains('tewido-disabled')) {
                return;
            }

            const iconCart = this.querySelector('.icon-cart');
            const iconLoading = this.querySelector('.icon-loading');
            const iconAdded = this.querySelector('.icon-added');
            const textSpan = this.querySelector('span');

            if (!textSpan) return;

            // Get original text
            const origText = textSpan.textContent.trim() || 'Add to cart';

            // STEP 1: Show loading state
            textSpan.textContent = 'Adding...';
            if (iconCart) iconCart.style.display = 'none';
            if (iconLoading) iconLoading.style.display = 'inline-block';
            if (iconAdded) iconAdded.style.display = 'none';

            this.classList.add('btn-clicked', 'tewido-disabled');
            this.setAttribute('aria-disabled', 'true');

            // STEP 2: After 800ms, show "added" state
            setTimeout(() => {
                if (!document.contains(this)) return;

                // Show "Added" with checkmark
                textSpan.textContent = 'Added';
                if (iconLoading) iconLoading.style.display = 'none';
                if (iconAdded) iconAdded.style.display = 'inline-block';
                this.classList.add('product-added'); // Turn button green
            }, 800);

            // STEP 3: After another 1200ms, reset to original state
            setTimeout(() => {
                if (!document.contains(this)) return;

                // Reset to original state
                textSpan.textContent = origText;
                if (iconAdded) iconAdded.style.display = 'none';
                if (iconCart) iconCart.style.display = 'inline-block';

                this.classList.remove('btn-clicked', 'tewido-disabled', 'product-added');
                this.removeAttribute('aria-disabled');
            }, 2000); // Total time: 2 seconds

            // Optional: Show notification if function exists
            if (typeof showNotification === 'function') {
                showNotification('Product added to cart!', 'success');
            }
        });
    });

    // Wishlist button functionality
    const wishlistButtons = document.querySelectorAll('.product-add-to-wishlist');

    wishlistButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const productCard = this.closest('.product-item');
            if (productCard) {
                const productId = productCard.getAttribute('data-product-id');
                if (productId) {
                    toggleWishlist(productId, this);
                }
            }
        });
    });

    // Wishlist functions
    function loadWishlistItems() {
        fetch('wishlist-handler.php?action=get')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const wishlistItems = data.wishlist;
                    wishlistCount = data.count;

                    // Update wishlist button states
                    const allWishlistBtns = document.querySelectorAll('.product-add-to-wishlist');
                    allWishlistBtns.forEach(function (btn) {
                        const productCard = btn.closest('.product-item');
                        if (productCard) {
                            const productId = productCard.getAttribute('data-product-id');
                            if (wishlistItems.includes(productId)) {
                                btn.classList.add('active');
                                const svg = btn.querySelector('svg');
                                if (svg) {
                                    svg.classList.add('wishlist-active');
                                    svg.classList.remove('wishlist-inactive');
                                }
                            }
                        }
                    });

                    updateWishlistUI();
                }
            })
            .catch(error => console.error('Error loading wishlist:', error));
    }

    function toggleWishlist(productId, button) {
        fetch('wishlist-handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'toggle',
                product_id: productId
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    wishlistCount = data.count;

                    // Update button state
                    const svg = button.querySelector('svg');

                    if (data.action === 'added') {
                        button.classList.add('active');
                        if (svg) {
                            svg.classList.add('wishlist-active');
                            svg.classList.remove('wishlist-inactive');
                        }
                        showNotification('Added to wishlist!', 'success');
                    } else {
                        button.classList.remove('active');
                        if (svg) {
                            svg.classList.add('wishlist-inactive');
                            svg.classList.remove('wishlist-active');
                        }
                        showNotification('Removed from wishlist!', 'info');
                    }

                    updateWishlistUI();
                } else {
                    showNotification('Error updating wishlist', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error updating wishlist', 'error');
            });
    }

    function updateWishlistUI() {
        // Update wishlist counter in header/navigation if it exists
        const wishlistCounter = document.querySelector('.wishlist-counter');
        if (wishlistCounter) {
            wishlistCounter.textContent = wishlistCount;
            wishlistCounter.style.display = wishlistCount > 0 ? 'block' : 'none';
        }

        // Update wishlist badge
        const wishlistBadge = document.querySelector('.wishlist-badge');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlistCount;
            wishlistBadge.style.display = wishlistCount > 0 ? 'inline-block' : 'none';
        }

        // Update wishlist link text if it exists
        const wishlistLinks = document.querySelectorAll('.wishlist-link-text');
        wishlistLinks.forEach(function (link) {
            link.textContent = `Wishlist (${wishlistCount})`;
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.toast-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `toast-notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out translate-x-full`;

        // Set colors based on type
        const typeClasses = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-black',
            info: 'bg-blue-500 text-white'
        };

        notification.className += ' ' + (typeClasses[type] || typeClasses.info);

        notification.innerHTML = `
            <div class="flex items-center justify-between min-w-[200px]">
                <span>${message}</span>
                <button class="close-notification ml-3 text-lg font-bold opacity-70 hover:opacity-100" type="button">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', function () {
            removeNotification(notification);
        });

        // Auto close after 3 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 3000);
    }

    function removeNotification(notification) {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    // Initialize the page
    updateCompareBar();
});