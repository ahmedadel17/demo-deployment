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
              const shouldBeDark = theme === 'dark' || (!theme && prefersDark);
              
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
              document.body.classList.add('light');
            }
          })();
        `,
      }}
    />
  );
}




