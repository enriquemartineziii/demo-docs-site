# CLI Reference

Command line interface reference for VuePress.

## Commands

### dev

Start a development server with hot reload.

```bash
vuepress dev [sourceDir]
```

**Options:**

- `--host <host>` - Specify host (default: `'0.0.0.0'`)
- `--port <port>` - Specify port (default: `8080`)
- `--open` - Open browser on server start
- `--clean-cache` - Clean cache before dev
- `--clean-temp` - Clean temp before dev
- `--debug` - Enable debug mode

**Examples:**

```bash
# Start dev server
vuepress dev docs

# Use custom port
vuepress dev docs --port 3000

# Open browser automatically
vuepress dev docs --open

# Clean cache and start
vuepress dev docs --clean-cache
```

### build

Build your site for production.

```bash
vuepress build [sourceDir]
```

**Options:**

- `--dest <dest>` - Output directory (default: `.vuepress/dist`)
- `--clean-cache` - Clean cache before build
- `--clean-temp` - Clean temp before build
- `--debug` - Enable debug mode

**Examples:**

```bash
# Build site
vuepress build docs

# Build to custom directory
vuepress build docs --dest public

# Clean cache before build
vuepress build docs --clean-cache
```

### info

Display environment information.

```bash
vuepress info
```

**Output includes:**

- Operating system
- CPU architecture
- Node.js version
- Package manager (npm/yarn/pnpm)
- VuePress version
- Bundler version
- Theme version

**Example output:**

```
Environment Info:
  System:
    OS: macOS 13.0
    CPU: (8) arm64 Apple M1
  Binaries:
    Node: 18.12.0
    npm: 8.19.2
  VuePress:
    vuepress: 2.0.0-rc.0
    @vuepress/bundler-vite: 2.0.0-rc.0
    @vuepress/theme-default: 2.0.0-rc.0
```

## Configuration

### Using Config File

VuePress automatically loads config from:

- `.vuepress/config.js`
- `.vuepress/config.ts`
- `.vuepress/config.mjs`

**Example:**

```js
// .vuepress/config.js
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'My Site',
  description: 'My VuePress site'
})
```

### Config Priority

When multiple config files exist:

1. `.vuepress/config.ts`
2. `.vuepress/config.js`
3. `.vuepress/config.mjs`

## Environment Variables

### NODE_ENV

Set the environment mode.

```bash
NODE_ENV=production vuepress build docs
```

### DEBUG

Enable debug logging.

```bash
DEBUG=vuepress:* vuepress dev docs
```

### VUEPRESS_TEMP

Override temp directory location.

```bash
VUEPRESS_TEMP=/tmp/vuepress vuepress dev docs
```

### VUEPRESS_CACHE

Override cache directory location.

```bash
VUEPRESS_CACHE=/tmp/cache vuepress dev docs
```

## Package Manager Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "docs:serve": "vuepress dev docs --open",
    "docs:clean": "rm -rf docs/.vuepress/.cache docs/.vuepress/.temp",
    "docs:info": "vuepress info"
  }
}
```

Then run:

```bash
npm run docs:dev
npm run docs:build
npm run docs:clean
```

## CI/CD Usage

### GitHub Actions

```yaml
name: Build Docs

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run docs:build
```

### GitLab CI

```yaml
image: node:18

cache:
  paths:
    - node_modules/

build:
  stage: build
  script:
    - npm ci
    - npm run docs:build
  artifacts:
    paths:
      - docs/.vuepress/dist
```

## Debugging

### Enable Verbose Logging

```bash
DEBUG=vuepress:* vuepress dev docs
```

### Check Configuration

View resolved configuration:

```bash
vuepress info
```

### Clean Build

Remove cache and temp files:

```bash
# Manual cleanup
rm -rf docs/.vuepress/.cache
rm -rf docs/.vuepress/.temp
rm -rf docs/.vuepress/dist

# Or use flags
vuepress build docs --clean-cache --clean-temp
```

## Performance Tips

### Development Mode

- Use `--host 127.0.0.1` for faster local access
- Increase Node memory: `NODE_OPTIONS=--max_old_space_size=4096`
- Disable unnecessary plugins during development

### Production Build

- Clean cache before building
- Use production mode: `NODE_ENV=production`
- Enable caching in CI/CD pipelines

## Troubleshooting

### Command Not Found

If `vuepress` command isn't found:

```bash
# Use npx
npx vuepress dev docs

# Or install globally
npm install -g vuepress@next
```

### Port Already in Use

Change the port:

```bash
vuepress dev docs --port 8081
```

### Build Fails

Try cleaning cache:

```bash
vuepress build docs --clean-cache --clean-temp
```

## See Also

- [Configuration API](/api/configuration-api.md)
- [Plugin API](/api/plugins.md)
- [Troubleshooting Guide](/guide/troubleshooting.md)
