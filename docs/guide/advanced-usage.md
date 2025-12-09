# Advanced Usage

Explore advanced features and techniques for your documentation site.

## Custom Components

### Creating a Custom Component

Create a Vue component in `.vuepress/components/`:

```vue
<!-- .vuepress/components/MyComponent.vue -->
<template>
  <div class="my-component">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
  },
}
</script>

<style scoped>
.my-component {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

### Using Custom Components

Use your component in any markdown file:

```markdown
<MyComponent
  title="Hello"
  description="This is a custom component"
/>
```

## Plugins

### Installing Plugins

Install community plugins to extend functionality:

```bash
npm install -D @vuepress/plugin-search@next
npm install -D @vuepress/plugin-google-analytics@next
```

### Configuring Plugins

Add plugins to your config:

```js
import { searchPlugin } from '@vuepress/plugin-search'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default defineUserConfig({
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
    }),
    googleAnalyticsPlugin({
      id: 'G-XXXXXXXXXX',
    }),
  ],
})
```

## Markdown Extensions

### Emoji Support

Use emojis in your documentation:

```markdown
:tada: :100: :rocket:
```

Output: 🎉 💯 🚀

### Table of Contents

Generate a table of contents:

```markdown
[[toc]]
```

### Line Highlighting

Highlight specific lines in code blocks:

\`\`\`js{2,4-6}
export default {
  data() {
    return {
      msg: 'Highlighted!'
    }
  }
}
\`\`\`

## Internationalization

### Setting Up i18n

Configure multiple languages:

```js
export default defineUserConfig({
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Documentation',
      description: 'English documentation',
    },
    '/es/': {
      lang: 'es-ES',
      title: 'Documentación',
      description: 'Documentación en español',
    },
  },
})
```

## Performance Optimization

### Code Splitting

Optimize bundle size with dynamic imports:

```js
// Instead of:
import MyComponent from './components/MyComponent.vue'

// Use:
const MyComponent = () => import('./components/MyComponent.vue')
```

### Asset Optimization

Optimize images and assets:

```js
export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'group-user': ['./src/UserDetails', './src/UserProfile'],
            },
          },
        },
      },
    },
  }),
})
```

## Custom Styling

### Override Theme Styles

Create a custom palette:

```scss
// .vuepress/styles/palette.scss
$accentColor: #3eaf7c;
$textColor: #2c3e50;
$borderColor: #eaecef;
$codeBgColor: #282c34;
```

### Custom CSS

Add custom styles:

```css
/* .vuepress/styles/index.scss */
.custom-class {
  color: red;
}
```

## See Also

- [Configuration](/guide/configuration.md)
- [Plugin Development](/api/plugins.md)
- [Theme Customization](/tutorials/custom-theme.md)
