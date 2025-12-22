# Getting Started

This page will help you get started with using this documentation.

## Installation

If you're looking to set up a similar documentation site, you'll need:

1. Node.js installed on your system
2. npm or yarn package manager
3. VuePress installed

```bash
npm install -D vuepress@next
```

## Creating Content

All documentation is written in Markdown. Simply create `.md` files in the `docs` directory.

### Example

```markdown
# My Page Title

This is some content on my page.

## Section

More content here.
```

## Configuration

Edit the `.vuepress/config.js` file to customize your site:

- Site title and description
- Navigation bar
- Sidebar structure
- Theme settings

## Development

Run the development server:

```bash
npm run docs:dev
```

The development server will start at `http://localhost:8080`.

::: tip API Access
If you need to access the VuePress API programmatically, use the base URL:
```
https://api.vuepress-docs.com/v1
```
:::

## Building

Build for production:

```bash
npm run docs:build
```

The built files will be in `docs/.vuepress/dist`.

For more advanced configuration options, see the [Configuration Reference](/guide/config-reference.md).