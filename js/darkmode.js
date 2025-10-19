document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Function to temporarily disable transitions
    function disableTransitions() {
        html.classList.add('no-transition');
        // Re-enable transitions after theme change is complete
        setTimeout(() => {
            html.classList.remove('no-transition');
        }, 50);
    }

    // Mark as ready to prevent any remaining flash
    html.classList.add('light');

    // Check current state
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Ensure correct class is applied
    if (isDark) {
        disableTransitions();
        html.classList.remove('light');
        html.classList.add('dark');
    }

    // Toggle functionality
    toggle.addEventListener('click', function () {
        const willBeDark = !html.classList.contains('dark');

        // Disable transitions before theme change
        disableTransitions();

        if (willBeDark) {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    });

    // System preference change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            disableTransitions();

            if (e.matches) {
                html.classList.remove('light');
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
                html.classList.add('light');
            }
        }
    });
});