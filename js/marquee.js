class MarqueeSlider {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.marquee-track');
        this.content = container.querySelector('.marquee-content');
        this.speed = 1;
        this.position = 0;
        this.isRTL = false;
        this.animationId = null;

        this.init();
    }

    init() {
        this.checkDirection();
        this.cloneContent();
        this.setupContent();
        this.start();

        // Listen for direction changes
        new MutationObserver(() => {
            this.checkDirection();
            this.resetPosition();
        }).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir']
        });

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.pause());
        this.container.addEventListener('mouseleave', () => this.start());
    }

    checkDirection() {
        const htmlDir = document.documentElement.getAttribute('dir');
        this.isRTL = htmlDir === 'rtl';
    }

    cloneContent() {
        // Clone the content multiple times to ensure seamless loop
        const originalContent = this.content.cloneNode(true);
        const clone1 = originalContent.cloneNode(true);
        const clone2 = originalContent.cloneNode(true);

        clone1.setAttribute('aria-hidden', 'true');
        clone2.setAttribute('aria-hidden', 'true');

        this.track.appendChild(clone1);
        this.track.appendChild(clone2);
    }

    setupContent() {
        this.contentWidth = this.content.scrollWidth;
    }

    start() {
        if (this.animationId) return;

        const animate = () => {
            if (this.isRTL) {
                this.position += this.speed;
                // Reset position when we've moved one full content width
                if (this.position >= this.contentWidth) {
                    this.position = 0;
                }
                this.track.style.transform = `translateX(${this.position}px)`;
            } else {
                this.position -= this.speed;
                // Reset position when we've moved one full content width to the left
                if (this.position <= -this.contentWidth) {
                    this.position = 0;
                }
                this.track.style.transform = `translateX(${this.position}px)`;
            }

            this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resetPosition() {
        this.position = 0;
        this.track.style.transform = 'translateX(0)';
        this.pause();
        this.start();
    }
}

// Initialize marquee slider
document.addEventListener('DOMContentLoaded', () => {
    const marqueeContainer = document.querySelector('.marquee-container');
    new MarqueeSlider(marqueeContainer);
});