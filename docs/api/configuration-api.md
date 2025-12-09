# Configuration API

Complete reference for all configuration options.

## Core Options

### title

- **Type:** `string`
- **Default:** `''`
- **Required:** No

The title of your documentation site. Displayed in the browser tab and site header.

```js
export default {
  title: 'My Documentation'
}
```

### description

- **Type:** `string`
- **Default:** `''`

Site description for SEO purposes.

```js
export default {
  description: 'Comprehensive documentation for my project'
}
```

### base

- **Type:** `string`
- **Default:** `'/'`

Base URL for your site. Important for GitHub Pages deployment.

```js
export default {
  base: 'my-repo/'
}
```

::: warning
The `base` value must start and end with a forward slash.
:::

### lang

- **Type:** `string`
- **Default:** `'en-US'`

Language for the site.

```js
export default {
  lang: 'en-US'
}
```

### head

- **Type:** `HeadConfig[]`
- **Default:** `[]`

Extra tags to add to the `<head>` section.

```js
export default {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ]
}
```

## Theme Options

### navbar

- **Type:** `NavbarConfig`
- **Default:** `[]`

Configuration for the navigation bar.

```js
navbar: [
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide/' },
  {
    text: 'Dropdown',
    children: [
      { text: 'Item 1', link: '/item1/' },
      { text: 'Item 2', link: '/item2/' },
    ]
  }
]
```

### sidebar

- **Type:** `SidebarConfig`
- **Default:** `{}`

Configuration for the sidebar navigation.

```js
sidebar: {
  '/guide/': [
    {
      text: 'Getting Started',
      collapsible: true,
      children: [
        '/guide/introduction.md',
        '/guide/installation.md',
      ]
    }
  ]
}
```

### logo

- **Type:** `string`
- **Default:** `undefined`

Path to the logo image.

```js
logo: '/images/logo.png'
```

### repo

- **Type:** `string`
- **Default:** `undefined`

GitHub repository URL.

```js
repo: 'username/repository'
```

### editLink

- **Type:** `boolean`
- **Default:** `true`

Enable "Edit this page" links.

```js
editLink: true
```

### lastUpdated

- **Type:** `boolean`
- **Default:** `true`

Display last updated timestamp.

```js
lastUpdated: true
```

## Plugin Options

### search

Configure built-in search:

```js
plugins: [
  searchPlugin({
    maxSuggestions: 10,
    hotKeys: ['s', '/'],
    locales: {
      '/': {
        placeholder: 'Search',
      }
    }
  })
]
```

### googleAnalytics

Add Google Analytics tracking:

```js
plugins: [
  googleAnalyticsPlugin({
    id: 'G-XXXXXXXXXX'
  })
]
```

## Build Configuration

### bundler

- **Type:** `Bundler`
- **Default:** `viteBundler()`

Bundler to use for building the site.

```js
import { viteBundler } from '@vuepress/bundler-vite'

export default {
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  })
}
```

### dest

- **Type:** `string`
- **Default:** `'${sourceDir}/.vuepress/dist'`

Output directory for built files.

```js
dest: 'dist'
```

### temp

- **Type:** `string`
- **Default:** `'${sourceDir}/.vuepress/.temp'`

Directory for temporary files.

### cache

- **Type:** `string`
- **Default:** `'${sourceDir}/.vuepress/.cache'`

Directory for cache files.

### public

- **Type:** `string`
- **Default:** `'${sourceDir}/.vuepress/public'`

Directory for public assets.

## Markdown Options

### links

- **Type:** `boolean`
- **Default:** `true`

Convert relative links to `<router-link>`.

### lineNumbers

- **Type:** `boolean`
- **Default:** `true`

Show line numbers in code blocks.

```js
markdown: {
  lineNumbers: true
}
```

### toc

- **Type:** `MarkdownItTocOptions`

Table of contents configuration.

```js
markdown: {
  toc: {
    level: [2, 3]
  }
}
```

## Advanced Options

### shouldPrefetch

- **Type:** `boolean | ((file: string, type: string) => boolean)`
- **Default:** `true`

Control resource prefetching.

### shouldPreload

- **Type:** `boolean | ((file: string, type: string) => boolean)`
- **Default:** `true`

Control resource preloading.

### pagePatterns

- **Type:** `string[]`
- **Default:** `['**/*.md', '!.vuepress', '!node_modules']`

Patterns for page files.

## TypeScript Support

VuePress has full TypeScript support. Use `.ts` extension for config:

```ts
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  // Config with TypeScript autocomplete
})
```

## See Also

- [Theme Configuration](/guide/configuration.html)
- [Plugin Development](/api/plugins.html)
- [CLI Reference](/api/cli.html)
