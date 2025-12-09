# Custom Theme

Learn how to customize the appearance of your VuePress site.

## Theme Basics

VuePress uses the default theme, but you can customize it extensively.

## Color Customization

### Using Palette

Create `.vuepress/styles/palette.scss`:

```scss
// Brand colors
$accentColor: #3eaf7c;
$textColor: #2c3e50;
$borderColor: #eaecef;
$bgColor: #ffffff;

// Code blocks
$codeBgColor: #282c34;
$codeTextColor: #ffffff;

// Custom colors
$headerBgColor: #1a1a1a;
$sidebarBgColor: #f8f9fa;
```

### Dark Mode Support

Enable dark mode in your config:

```js
theme: defaultTheme({
  colorMode: 'auto', // 'auto' | 'light' | 'dark'
  colorModeSwitch: true,
})
```

## Custom Styles

Create `.vuepress/styles/index.scss`:

```scss
// Custom button styles
.custom-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--c-brand);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--c-brand-dark);
  }
}

// Custom container styles
.custom-container {
  margin: 1rem 0;
  padding: 1rem;
  border-left: 4px solid var(--c-brand);
  background-color: var(--c-bg-light);
}

// Improve code block appearance
div[class*="language-"] {
  border-radius: 6px;
  margin: 1rem 0;
}
```

## Layout Customization

### Custom Home Page

Override the default home page layout by creating `docs/.vuepress/components/HomeLayout.vue`:

```vue
<template>
  <div class="custom-home">
    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="data.heroImage"
        :alt="data.heroAlt || 'hero'"
      >
      <h1>{{ data.heroText }}</h1>
      <p class="description">{{ data.tagline }}</p>
      <div class="actions">
        <a class="action-button primary" :href="data.actionLink">
          {{ data.actionText }}
        </a>
      </div>
    </header>

    <div class="features" v-if="data.features">
      <div class="feature" v-for="feature in data.features" :key="feature.title">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$page.frontmatter
    }
  }
}
</script>

<style scoped>
.custom-home {
  padding: 0;
  max-width: 100%;
}

.hero {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero h1 {
  font-size: 3rem;
  margin: 1rem 0;
}

.description {
  font-size: 1.4rem;
  margin: 1rem auto;
  max-width: 600px;
}

.action-button {
  display: inline-block;
  padding: 1rem 2rem;
  margin-top: 1rem;
  background-color: white;
  color: #667eea;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s;
}

.action-button:hover {
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  padding: 1.5rem;
  border: 1px solid #eaecef;
  border-radius: 8px;
}

.feature h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
</style>
```

## Logo Customization

Add your logo to the navbar:

```js
theme: defaultTheme({
  logo: '/images/logo.png',
  logoDark: '/images/logo-dark.png', // For dark mode
})
```

Place your logo files in `docs/.vuepress/public/images/`.

## Typography

Customize fonts in `palette.scss`:

```scss
// Font families
$fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
$fontFamilyCode: "JetBrains Mono", "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;

// Font sizes
$fontSize: 16px;
$lineHeight: 1.7;
```

## Advanced: Creating a Custom Theme

For complete control, create a custom theme:

```js
// .vuepress/theme/index.js
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  name: 'my-custom-theme',
  extends: defaultTheme({
    // default theme options
  }),
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}
```

## Responsive Design

Ensure your customizations work on all devices:

```scss
// Mobile styles
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}

// Tablet styles
@media (max-width: 1024px) {
  .container {
    padding: 1rem;
  }
}
```

## Animation Effects

Add subtle animations:

```scss
// Fade in animation
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature {
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.feature:nth-child(1) { animation-delay: 0.1s; }
.feature:nth-child(2) { animation-delay: 0.2s; }
.feature:nth-child(3) { animation-delay: 0.3s; }
```

## Testing Your Theme

Test your theme across different:

- Screen sizes (mobile, tablet, desktop)
- Browsers (Chrome, Firefox, Safari)
- Color modes (light, dark)
- Operating systems

## Resources

- [VuePress Theme Documentation](https://v2.vuepress.vuejs.org/reference/default-theme/)
- [Vue.js Documentation](https://vuejs.org/)
- [SCSS Guide](https://sass-lang.com/guide)

## Examples

Browse these sites for inspiration:

- [Vue.js Docs](https://vuejs.org)
- [Vite Docs](https://vitejs.dev)
- [Nuxt Docs](https://nuxt.com)
