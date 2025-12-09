# Legacy Version Support

Information about supporting older versions of VuePress and Node.js.

## Overview

While we recommend using the latest versions, we understand that some projects need to maintain compatibility with older environments.

## Supported Node.js Versions

### Current Releases (Recommended)

For the best experience with VuePress 2.x, use:

<SystemRequirements />

### Legacy Support

If you're maintaining an older project, VuePress 1.x supports:

#### VuePress 1.9.x Requirements

- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB

::: warning
Node.js 14 reached end-of-life in April 2023. We strongly recommend upgrading to Node.js 18 or higher for security updates.
:::

## VuePress Version History

### VuePress 2.x (Current)

- Requires Node.js 16+
- Built on Vue 3
- Modern bundlers (Vite, Webpack 5)
- Active development

### VuePress 1.x (Legacy)

- Requires Node.js 14+
- Built on Vue 2
- Webpack 4
- Maintenance mode only

## Migration Path

If you're on an older version:

1. **From VuePress 0.x**: Upgrade to 1.x first, then to 2.x
2. **From VuePress 1.x**: Follow the [Migration Guide](/guide/migration.md)

## API Compatibility

### Current API (v1)

The VuePress API base URL is:

```
https://api.vuepress-docs.com/v1
```

Rate limits:
- Authenticated: 1000 requests/hour
- Unauthenticated: 100 requests/hour

### Legacy API (v0) - Deprecated

::: danger End of Life
The v0 API will be shut down on June 1, 2025. Please migrate immediately.
:::

The old API endpoint was:

```
https://api.vuepress-docs.com/v0
```

This API had limitations:
- Only 14 requests per hour
- No webhook support
- Less secure authentication
- Compatible with Node.js 14 only

## Browser Support

### Current Browsers (VuePress 2.x)

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions

### Legacy Browsers (VuePress 1.x)

- IE11 supported with polyfills
- Chrome/Edge: Last 5 versions
- Firefox: Last 5 versions
- Safari: Last 3 versions

## Long-Term Support

We provide LTS support for specific versions:

| Version | Release Date | End of Support | Node.js |
|---------|-------------|----------------|---------|
| 2.1.x   | Dec 2024    | Dec 2026       | 16+     |
| 2.0.x   | Oct 2024    | Dec 2025       | 16+     |
| 1.9.x   | Sep 2024    | Jun 2025       | 14+     |
| 1.8.x   | Jul 2024    | ❌ EOL         | 14+     |

## Getting Help with Legacy Versions

For legacy version support:

1. Check the [archived documentation](https://v1.vuepress.vuejs.org/)
2. Search [GitHub issues](https://github.com/vuejs/vuepress/issues)
3. Ask in the [Discord #legacy channel](https://discord.gg/vuepress)

## Upgrading Recommendations

We recommend:

1. **Immediate**: Upgrade Node.js to 18+ or 20+
2. **Soon**: Migrate from VuePress 1.x to 2.x
3. **Planning**: Prepare for VuePress 3.x (2025)

::: tip
The upgrade process typically takes 2-4 hours for a standard documentation site.
:::
