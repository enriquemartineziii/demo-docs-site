# API Reference

This section contains the API reference documentation.

## Core API

### Configuration

The main configuration object for the site.

#### Options

- `title` (string): The title of your site
- `description` (string): The description of your site
- `base` (string): The base URL for your site (important for GitHub Pages)

### Theme Configuration

Customize the appearance and behavior of your site.

#### Navbar

Configure the navigation bar items:

```js
navbar: [
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide/' },
]
```

#### Sidebar

Configure the sidebar structure:

```js
sidebar: {
  '/guide/': [
    {
      text: 'Guide',
      children: ['/guide/README.md'],
    },
  ],
}
```

## Examples

See the [Getting Started](/guide/getting-started.html) guide for practical examples.
