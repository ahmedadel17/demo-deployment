'use client';

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              // If no theme is set, use system preference
              let shouldBeDark = false;
              if (theme === 'dark') {
                shouldBeDark = true;
              } else if (theme === 'light') {
                shouldBeDark = false;
              } else {
                // No theme set, use system preference
                shouldBeDark = prefersDark;
              }
              
              if (shouldBeDark) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.body.classList.add('dark');
                document.body.classList.remove('light');
              } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.body.classList.add('light');
                document.body.classList.remove('dark');
              }
            } catch (e) {
              // Fallback to light mode if there's an error
              document.documentElement.classList.add('light');
              document.documentElement.classList.remove('dark');
              document.body.classList.add('light');
              document.body.classList.remove('dark');
            }
          })();
        `,
      }}
    />
  );
}




