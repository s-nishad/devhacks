import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'


// Helper function to capitalize words
function capitalizeWords(str) {
  return str
    .split(/[-_ ]+/)          // Split by dash, underscore, or space
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}


// Helper function to generate sidebar from a folder
function generateSidebar(dir) {
  const dirPath = path.resolve(__dirname, '../', dir)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && f.toLowerCase() !== 'index.md') // Ignore index.md

  return files.map(f => {
    const name = f.replace(/\.md$/, '')
    return { text: capitalizeWords(name), link: `/${dir}/${name}` }
  })
}


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
      // '/hacks/': [
      //   {
      //     text: 'Tutorials',
      //     items: [
      //       { text: 'PostgreSQL Cooking', link: '/hacks/postgres-setup' },
      //       { text: 'Git SSH Setup', link: '/hacks/git-ssh-setup' },
      //       { text: 'Multi Git Setup', link: '/hacks/multi-git-setup' },
      //       { text: 'WSL + Docker', link: '/hacks/wsl_docker_setup.md' },
      //       { text: 'Docker CheatSheet', link: '/hacks/docker_commands.md' },
      //     ]
      //   }
      // ]
      '/blog/': generateSidebar('blog'),
      '/hacks/': generateSidebar('hacks')
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
