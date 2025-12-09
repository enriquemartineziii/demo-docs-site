# Deploying to GitHub Pages

Learn how to deploy your VuePress site to GitHub Pages for free hosting.

## Prerequisites

Before you begin:

- A GitHub account
- Your VuePress site in a Git repository
- Push access to your repository

## Step 1: Configure Base Path

Update your `config.js` to set the correct base path:

```js
export default defineUserConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

::: warning Important
The `base` path must match your repository name exactly, including capitalization.
:::

## Step 2: Create Deploy Script

Create a `deploy.sh` file in your project root:

```bash
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# create a new git repository
git init
git branch -m main
git add -A
git commit -m 'deploy'

# push to gh-pages branch
git push -f git@github.com:USERNAME/REPO.git main:gh-pages

cd -
```

Replace `USERNAME` and `REPO` with your GitHub username and repository name.

## Step 3: Make Script Executable

Make the deploy script executable:

```bash
chmod +x deploy.sh
```

## Step 4: Run Deployment

Execute the deploy script:

```bash
./deploy.sh
```

This will:
1. Build your site
2. Create a new Git repository in the dist folder
3. Commit the built files
4. Push to the `gh-pages` branch

## Step 5: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Navigate to **Pages** in the sidebar
4. Under **Source**, select the `gh-pages` branch
5. Click **Save**

## Step 6: Access Your Site

Your site will be availible at:

```
https://USERNAME.github.io/REPO/
```

It may take a few minutes for GitHub to build and deploy your site.

## Automated Deployment with GitHub Actions

For automatic deployment on every push, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vuepress/dist
```

Now your site will automatically deploy whenever you push to the main branch!

## Troubleshooting

### 404 Error on GitHub Pages

**Problem:** All pages except home show 404.

**Solution:** Double-check your `base` configuration:

```js
base: '/exact-repo-name/',  // Must match exactly!
```

### Styles Not Loading

**Problem:** Site loads but looks unstyled.

**Solution:** Ensure your `base` path is correct and matches your repository name.

### Permission Denied

**Problem:** Deploy script fails with permission error.

**Solution:** Make sure you have:
1. SSH keys set up with GitHub
2. Push access to the repository

Test your SSH connection:

```bash
ssh -T git@github.com
```

### Deploy Takes Too Long

**Problem:** Deployment process is very slow.

**Solution:** Consider using GitHub Actions instead of manual deployment for better performance.

## Alternative Hosting Options

While this guide focuses on GitHub Pages, you can also deploy to:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitLab Pages**: Similar process to GitHub Pages
- **AWS S3**: Upload dist folder to S3 bucket

## Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to your `docs/.vuepress/public/` directory
2. Add your domain name to the file (e.g., `docs.example.com`)
3. Configure your DNS provider to point to GitHub Pages
4. Update your repository settings to use the custom domain

## Next Steps

- [Set up CI/CD](/tutorials/ci-cd.md)
- [Configure custom domain](https://docs.github.com/pages/custom-domains)
- [Monitor site analytics](/tutorials/analytics.md)
