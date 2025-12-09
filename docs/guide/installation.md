# Installation

This guide will walk you through installing and setting up your documentation site.

## Prerequisites

<SystemRequirements />

::: tip
You can check your Node.js version by running `node --version` in your terminal.
:::

## Quick Install

Install VuePress and its dependencies:

<InstallCommand package="vuepress@next @vuepress/client@next" />

## Full Installation

For a complete setup with all recommended packages:

```bash
# Create a new project directory
mkdir my-docs
cd my-docs

# Initialize npm
npm init -y

# Install VuePress and theme
npm install -D vuepress@next
npm install -D @vuepress/theme-default@next
npm install -D @vuepress/bundler-vite@next

# Install optional dependencies
npm install -D sass-embedded
```

## Verification

After installation, verify everything is working:

```bash
npx vuepress --version
```

You should see output similar to:

```
vuepress/2.0.0-rc.26
@vuepress/bundler-vite/2.0.0-rc.26
@vuepress/theme-default/2.0.0-rc.120
```

## Next Steps

- [Configuration](/guide/configuration.md) - Configure your site
- [Getting Started](/guide/getting-started.md) - Create your first page
- [Troubleshooting](/guide/troubleshoting.md) - Common issues and solutions

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Node.js   | 16.0    | 18.x        |
| npm       | 7.0     | 9.x         |
| RAM       | 2GB     | 4GB         |
| Disk Space| 500MB   | 1GB         |
