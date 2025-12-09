import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'API', link: '/api/' },
      { text: 'FAQ', link: '/faq/' },
      { text: 'Changelog', link: '/changelog/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
            '/guide/README.md',
            '/guide/installation.md',
            '/guide/getting-started.md',
            '/guide/configuration.md',
            '/guide/advanced-usage.md',
            '/guide/troubleshooting.md',
          ],
        },
      ],
      '/tutorials/': [
        {
          text: 'Tutorials',
          children: [
            '/tutorials/README.md',
            '/tutorials/first-project.md',
            '/tutorials/deployment.md',
            '/tutorials/custom-theme.md',
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          children: [
            '/api/README.md',
            '/api/configuration-api.md',
            '/api/cli.md',
            '/api/plugins.md',
          ],
        },
      ],
    },
  }),

  lang: 'en-US',
  title: 'Demo Docs Site',
  description: 'A simple demo documentation site built with VuePress',

  base: '/demo-docs-site/',
})
