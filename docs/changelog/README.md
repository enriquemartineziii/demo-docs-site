# Changelog

All notable changes to this documentation site.

## [2.1.0] - 2024-12-15

### Added
- New tutorial on custom theme development
- API reference for plugin development
- FAQ section with common questions
- Code examples in multiple languages
- Dark mode toggle in header

### Changed
- Updated installation instructions for Node 18
- Improved navigation structure
- Enhanced search functionality
- Better mobile responsive design

### Fixed
- Broken links in API documentation
- Image loading issues on slow connections
- Build errors with large documentation sets
- Sidebar navigation on mobile devices

## [2.0.5] - 2024-11-20

### Added
- Troubleshooting guide for common issues
- Performance optimization tips
- CI/CD integration examples

### Changed
- Updated to VuePress 2.0.0-rc.26
- Improved code block styling
- Better contrast for dark mode

### Fixed
- Search indexing for special characters
- Memory leaks in dev server
- Asset optimization in production builds

## [2.0.0] - 2024-10-01

### Added
- Complete rewrite using VuePress 2.x
- New default theme with improved UI
- Support for Vue 3 components
- Better TypeScript integration
- Enhanced markdown features

### Changed
- New plugin API (breaking change)
- Updated configuration format
- Improved build performance
- Better tree-shaking

### Removed
- Deprecated v1 plugins
- Legacy theme support
- Old markdown extensions

### Migration
See the [Migration Guide](/guide/migration.html) for upgrading from v1.x.

## [1.9.2] - 2024-09-15

### Fixed
- Security vulnerability in dependencies
- Build issues on Windows
- Hot reload not working in some cases

## [1.9.0] - 2024-08-10

### Added
- PWA support with offline capabilities
- Sitemap generation
- RSS feed generation
- Google Analytics integration

### Changed
- Updated all dependencies to latest versions
- Improved SEO meta tags
- Better accessibility (WCAG 2.1 AA compliant)

## [1.8.5] - 2024-07-01

### Added
- Multi-language support (i18n)
- Custom container types
- Mermaid diagram support

### Fixed
- Code highlighting for new languages
- Navigation scroll behavior
- Mobile menu overflow issues

## [1.8.0] - 2024-05-20

### Added
- Search plugin with better indexing
- Code copy buttons
- Reading time estimates
- Last updated timestamps

### Changed
- Faster build times (30% improvement)
- Reduced bundle size
- Optimized images automatically

## [1.7.0] - 2024-04-10

### Added
- GitHub Pages deployment script
- Custom 404 page
- Print-friendly styling

### Fixed
- Code blocks overflow on mobile
- Anchor link scrolling
- External link icons

## [1.6.5] - 2024-03-01

### Security
- Updated vulnerable dependencies
- Added CSP headers recommendation
- Improved XSS protection in custom components

## [1.6.0] - 2024-02-15

### Added
- Plugin system for extensibility
- Custom Vue components support
- Markdown extensions (footnotes, task lists)

### Changed
- New sidebar configuration format
- Improved navbar dropdowns
- Better code theme (Dracula)

## [1.5.0] - 2024-01-10

### Added
- Initial public release
- Basic documentation structure
- Getting started guide
- API reference
- Deployment instructions

---

## Version Support

| Version | Status | Released | End of Life |
|---------|--------|----------|-------------|
| 2.1.x   | ✅ Stable | Dec 2024 | - |
| 2.0.x   | ✅ Stable | Oct 2024 | Dec 2025 |
| 1.9.x   | ⚠️ Maintenance | Sep 2024 | Jun 2025 |
| 1.8.x   | ❌ EOL | Jul 2024 | Dec 2024 |
| < 1.8   | ❌ EOL | - | - |

## Upgrade Guide

### From 2.0.x to 2.1.x

No breaking changes. Update dependencies:

```bash
npm update vuepress @vuepress/client @vuepress/theme-default
```

### From 1.x to 2.x

See the complete [Migration Guide](/guide/migration.html).

Key changes:
- New configuration format
- Plugin API changes
- Component registration changes
- Theme structure updates

## Deprecation Warnings

### Version 2.1.0
- `legacy.mode` option will be removed in v3.0
- `markdown.externalLinks` format changing in v3.0

### Version 2.0.0
- v1 plugin format no longer supported
- Old permalink format removed
- `themeConfig` renamed to `theme`

## Release Schedule

We aim to release:
- **Major versions**: Once per year
- **Minor versions**: Every 2-3 months
- **Patch versions**: As needed for bugs/security

## Contributing

Found a bug or want to suggest a feature?

- Open an issue on [GitHub](https://github.com/example/docs/issues)
- Submit a pull request
- Join our [Discord](https://discord.gg/docs) to discuss

## License

This documentation is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

*Last updated: December 9, 2025*
