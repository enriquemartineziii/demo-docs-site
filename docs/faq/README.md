# Frequently Asked Questions

Common questions and answers about VuePress.

## General

### What is VuePress?

VuePress is a static site generator powered by Vue.js. It's designed for creating documentation sites with a focus on simplicity and performance.

### Do I need to know Vue.js to use VuePress?

No! For basic documentation sites, you only need to write Markdown. Vue.js knowledge is only needed for advanced customization.

### Is VuePress free?

Yes, VuePress is completely free and open source under the MIT license.

### Can I use VuePress for non-documentation sites?

Yes! While VuePress excels at documentation, it can be used for blogs, portfolios, and other content-driven sites.

## Installation & Setup

### What are the system requirements?

- Node.js 14.0 or higher
- npm 6.0 or higher
- At least 2GB of RAM (4GB recomended)
- 500MB of free disk space

### How do I install VuePress?

```bash
npm install -D vuepress@next
```

See the [Installation Guide](/guide/installation.md) for detailed instructions.

### Can I use yarn or pnpm instead of npm?

Yes! VuePress works with all major package managers:

```bash
# yarn
yarn add -D vuepress@next

# pnpm
pnpm add -D vuepress@next
```

### Why does installation take so long?

VuePress has many dependencies. This is normal and only happens once. Subsequent installs will be faster thanks to caching.

## Configuration

### Where do I put the configuration file?

Create a `config.js` file at `docs/.vuepress/config.js`.

### Do I need a configuration file?

No, VuePress works with sensible defaults. Configuration is only needed for customization.

### How do I change the theme colors?

Create a `docs/.vuepress/styles/palette.scss` file:

```scss
$accentColor: #3eaf7c;
$textColor: #2c3e50;
```

See [Custom Theme](/tutorials/custom-theme.md) for more details.

### Can I use custom fonts?

Yes! Add them to your `head` configuration:

```js
export default {
  head: [
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
    }]
  ]
}
```

## Content

### What markdown features are supported?

VuePress supports:
- Standard markdown syntax
- GitHub Flavored Markdown
- Emoji :tada:
- Custom containers
- Code syntax highlighting
- Tables
- Table of contents

### Can I use HTML in markdown?

Yes, you can mix HTML and markdown freely:

```markdown
# Markdown Heading

<div class="custom-block">
  Custom HTML content
</div>

More markdown content...
```

### How do I add images?

Place images in `docs/.vuepress/public/images/` and reference them:

```markdown
![Alt text](/images/photo.jpg)
```

Or use relative paths:

```markdown
![Alt text](./images/photo.jpg)
```

### Can I embed videos?

Yes, use HTML:

```html
<video controls>
  <source src="/videos/demo.mp4" type="video/mp4">
</video>
```

Or embed from YouTube:

```html
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0" allowfullscreen>
</iframe>
```

## Building & Deployment

### How do I build my site?

```bash
npm run docs:build
```

Built files will be in `docs/.vuepress/dist/`.

### Can I deploy to GitHub Pages?

Yes! See our [Deployment Guide](/tutorials/deployment.md) for step-by-step instructions.

### What about other hosting platforms?

VuePress works with any static hosting:
- Netlify
- Vercel
- AWS S3
- Azure Static Web Apps
- GitLab Pages

### Why is my site showing 404 errors after deployment?

Check your `base` configuration. For GitHub Pages at `username.github.io/repo/`, set:

```js
base: '/repo/'
```

### How do I use a custom domain?

1. Add a `CNAME` file to `docs/.vuepress/public/`
2. Put your domain in the file
3. Configure DNS with your provider
4. Update GitHub Pages settings

## Performance

### Why is the build slow?

Large sites take longer to build. Try:
- Reducing image sizes
- Removing unused plugins
- Enabling caching
- Using fewer pages

### Can I lazy load images?

Yes, use native browser lazy loading:

```html
<img src="/images/large.jpg" loading="lazy" alt="Description">
```

### How do I optimize for SEO?

VuePress is SEO-friendly by default. Improve it further:
- Add proper meta descriptions
- Use semantic headings
- Add alt text to images
- Generate a sitemap
- Add structured data

## Customization

### Can I create custom components?

Yes! Create `.vue` files in `docs/.vuepress/components/`:

```vue
<template>
  <div class="my-component">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello!'
    }
  }
}
</script>
```

### How do I add a custom page layout?

Create a layout component and reference it in frontmatter:

```markdown
---
layout: CustomLayout
---

# Page content
```

### Can I use TypeScript?

Yes! VuePress has full TypeScript support. Just use `.ts` extensions.

## Troubleshooting

### My changes aren't showing up

Try:
1. Restart the dev server
2. Clear browser cache
3. Clean VuePress cache: `rm -rf docs/.vuepress/.cache`

### Build fails with memory error

Increase Node.js memory:

```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run docs:build
```

### Links are broken after deployment

Ensure you're using the correct link format:

```markdown
<!-- Correct -->
[Link](/guide/page.md)

<!-- Incorrect -->
[Link](/guide/page)
```

### Plugins aren't working

Make sure you:
1. Installed the plugin
2. Added it to your config
3. Restarted the dev server

## Migration

### How do I migrate from VuePress 1.x?

See the [Migration Guide](https://v2.vuepress.vuejs.org/guide/migration.html) in the official documentation.

### Can I migrate from other static site generators?

Yes, but you'll need to convert your content to markdown and adapt the configuration. Each generator is different.

## Getting Help

### Where can I get help?

- [Official Documentation](https://v2.vuepress.vuejs.org/)
- [GitHub Discussions](https://github.com/vuepress/vuepress-next/discussions)
- [Discord Community](https://discord.gg/vuepress)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vuepress)

### How do I report a bug?

Open an issue on [GitHub](https://github.com/vuepress/vuepress-next/issues) with:
- VuePress version (`vuepress info`)
- Steps to reproduce
- Expected vs actual behavior
- Relevant code/config

### Can I contribute to VuePress?

Yes! Contributions are welcome. Check the [Contributing Guide](https://github.com/vuepress/vuepress-next/blob/main/CONTRIBUTING.md).

## Still Have Questions?

If your question isn't answered here:

1. Search the [official documentation](https://v2.vuepress.vuejs.org/)
2. Check [existing issues](https://github.com/vuepress/vuepress-next/issues)
3. Ask in [Discord](https://discord.gg/vuepress)
4. Post on [Stack Overflow](https://stackoverflow.com/questions/tagged/vuepress)
