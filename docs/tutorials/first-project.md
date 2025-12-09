# Your First Project

Create your first VuePress documentation site from scratch.

## What You'll Build

In this tutorial, you'll create a complete documentation site with:

- A home page
- Multiple documentation pages
- Navigation menu
- Sidebar navigation
- Code examples

**Estimated time:** 30 minutes

## Step 1: Create Project Directory

Create a new directory for your project:

```bash
mkdir my-awesome-docs
cd my-awesome-docs
```

## Step 2: Initialize npm

Initialize a new npm project:

```bash
npm init -y
```

This creates a `package.json` file with default settings.

## Step 3: Install VuePress

Install VuePress as a dev dependency:

```bash
npm install -D vuepress@next
```

Wait for the installation to complete. This may take a few minutes.

## Step 4: Create Directory Structure

Create the necessary directories:

```bash
mkdir -p docs/.vuepress
```

Your project structure should now look like this:

```
my-awesome-docs/
├── docs/
│   └── .vuepress/
├── node_modules/
└── package.json
```

## Step 5: Create Your First Page

Create a home page:

```bash
echo "# Hello VuePress" > docs/README.md
```

Or create it manually with this content:

```markdown
# Hello VuePress

Welcome to my documentation site!

## Features

- Fast and responsive
- Easy to use
- Markdown-based
```

## Step 6: Add Scripts

Edit your `package.json` and add these scripts:

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

## Step 7: Start Dev Server

Start the development server:

```bash
npm run docs:dev
```

Open your browser to `http://localhost:8080` to see your site!

## Step 8: Add Configuration

Create a configuration file at `docs/.vuepress/config.js`:

```js
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'en-US',
  title: 'My Awesome Docs',
  description: 'A VuePress documentation site',

  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
  }),
})
```

## Step 9: Add More Pages

Create a guide section:

```bash
mkdir docs/guide
echo "# Guide\n\nThis is the guide page." > docs/guide/README.md
```

Create a getting started page:

```bash
echo "# Getting Started\n\nLet's get started!" > docs/guide/getting-started.md
```

## Step 10: Configure Sidebar

Update your config to add a sidebar:

```js
theme: defaultTheme({
  navbar: [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/' },
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        children: [
          '/guide/README.md',
          '/guide/getting-started.md',
        ],
      },
    ],
  },
}),
```

## Step 11: Build for Production

When you're ready to deploy, build your site:

```bash
npm run docs:build
```

The built files will be in `docs/.vuepress/dist/`.

## Next Steps

Now that you have a basic site running:

1. [Customize the theme](/tutorials/custom-theme.html)
2. [Deploy to GitHub Pages](/tutorials/deployment.html)
3. [Add advanced features](/guide/advanced-usage.html)

## Troubleshooting

### Port Already in Use

If port 8080 is busy, use a different port:

```bash
npm run docs:dev -- --port 8081
```

### Changes Not Reflecting

Try restarting the dev server with Ctrl+C and then `npm run docs:dev` again.

## Complete Example

You can find a complete example project in our [GitHub repository](https://github.com/example/vuepress-starter).

Congratulations! You've created your first VuePress documentation site! 🎉
