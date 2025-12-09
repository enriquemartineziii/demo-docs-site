import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: ['/guide/README.md', '/guide/getting-started.md'],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          children: ['/api/README.md'],
        },
      ],
    },
  }),

  lang: 'en-US',
  title: 'Demo Docs Site',
  description: 'A simple demo documentation site built with VuePress',

  // Uncomment and set this when deploying to GitHub Pages
  // base: '/your-repo-name/',
})
