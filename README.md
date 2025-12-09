# Demo Docs Site

A simple documentation site built with VuePress for demonstration purposes.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run docs:dev
```

The site will be available at `http://localhost:8080`

### Build

Build for production:

```bash
npm run docs:build
```

The built files will be in `docs/.vuepress/dist/`

## Deploying to GitHub Pages

1. Update the `base` option in `docs/.vuepress/config.js` with your repository name:
   ```js
   base: '/your-repo-name/',
   ```

2. Update the deploy script `deploy.sh` with your GitHub username and repository name

3. Run the deploy script:
   ```bash
   ./deploy.sh
   ```

Alternatively, you can set up GitHub Actions for automatic deployment.

## Project Structure

```
.
├── docs/
│   ├── .vuepress/
│   │   └── config.js      # VuePress configuration
│   ├── guide/             # Guide section
│   ├── api/               # API reference section
│   └── README.md          # Home page
├── package.json
└── README.md
```

## Customization

Edit `docs/.vuepress/config.js` to customize:
- Site title and description
- Navigation bar
- Sidebar structure
- Theme settings

## Documentation

For more information, visit the [VuePress documentation](https://v2.vuepress.vuejs.org/).
