import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Blog & Hacks',
  description: 'A place for my thoughts and tutorials',
  base: '/devhacks/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Hacks', link: '/hacks/' }
    ],
    sidebar: {
      '/blog/': [
        {
          text: 'Blog Posts',
          items: [
            { text: 'First Post', link: '/blog/first_post' }
          ]
        }
      ],
      '/hacks/': [
        {
          text: 'Tutorials',
          items: [
            { text: 'First Tutorial', link: '/hacks/first_tut' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/s-nishad/devhacks' }
    ]
  }
})