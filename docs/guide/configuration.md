# Configuration

Learn how to configure your VuePress site to meet your needs.

## Basic Configuration

Create a `.vuepress/config.js` file in your docs directory:

```js
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'en-US',
  title: 'My Documentation',
  description: 'My awesome documentation site',

  theme: defaultTheme({
    // Theme configuration here
  }),
})
```

## Site Metadata

### Title and Description

```js
export default defineUserConfig({
  title: 'My Docs',
  description: 'Documentation for my project',
})
```

### Base URL

For GitHub Pages deployment:

```js
export default defineUserConfig({
  base: '/my-repo/',
})
```

## Theme Configuration

### Navbar

Configure your navigation bar:

```js
theme: defaultTheme({
  navbar: [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/' },
    { text: 'API', link: '/api/' },
    {
      text: 'External',
      link: 'https://example.com'
    },
  ],
})
```

### Sidebar

Create a structured sidebar:

```js
theme: defaultTheme({
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        children: [
          '/guide/README.md',
          '/guide/installation.md',
          '/guide/configuration.md',
        ],
      },
    ],
  },
})
```

## Advanced Options

### Custom Containers

Use custom containers in your markdown:

```markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
```

### Code Groups

Create tabbed code blocks:

```markdown
::: code-group

\`\`\`bash [npm]
npm install vuepress
\`\`\`

\`\`\`bash [yarn]
yarn add vuepress
\`\`\`

:::
```

## Environment Variables

Set environment-specific configuration:

```js
export default defineUserConfig({
  define: {
    __API_URL__: process.env.API_URL || 'https://api.example.com',
  },
})
```

## Build Options

Configure the build process:

```js
export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      build: {
        chunkSizeWarningLimit: 1000,
      },
    },
  }),
})
```

## See Also

- [Advanced Usage](/guide/advanced-usage.html)
- [API Reference](/api/)
- [Deployment Guide](/tutorials/deployment.html)
