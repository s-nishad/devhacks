import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Blog & Hacks',
  description: 'A place for my thoughts and tutorials',
  base: '/devhacks/',
  ignoreDeadLinks: true,

  head: [
    // Favicon
    ['link', { rel: 'icon', href: '/devhacks/favicon.ico' }],
    
    // Google AdSense
    ['script', {
      async: true,
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      'data-ad-client': 'ca-pub-1931706243774783'
    }],

    // Optional: Google Analytics / GTM
    ['script', {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=GTM-P9V4MFVJ'
    }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GTM-P9V4MFVJ');
    `]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Hacks', link: '/hacks/' }
    ],
    sidebar: {
      // You can uncomment and add blog posts here
      // '/blog/': [
      //   {
      //     text: 'Blog Posts',
      //     items: [
      //       { text: 'First Post', link: '/blog/first_post' }
      //     ]
      //   }
      // ],
      '/hacks/': [
        {
          text: 'Tutorials',
          items: [
            { text: 'PostgreSQL Cooking', link: '/hacks/postgres-setup' },
            { text: 'Git SSH Setup', link: '/hacks/git-ssh-setup' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/s-nishad/devhacks' }
    ],
    footer: {
      message: 'Made with ❤️ by <a href="https://github.com/s-nishad" target="_blank" rel="noopener">Shohanur Nishad</a>. Powered by VitePress.',
      copyright: '© 2025 DevHacks'
    }
  }
})
