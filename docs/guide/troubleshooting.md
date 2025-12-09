# Troubleshooting

Common issues and their solutions.

## Installation Issues

### Node Version Error

**Problem:** Error message about incompatible Node version.

**Solution:** Ensure you're using Node.js 16.0 or higher:

```bash
node --version
```

If you need to upgrade, download the latest version from [nodejs.org](https://nodejs.org/).

### npm Install Fails

**Problem:** Dependencies fail to install.

**Solution:** Try clearing the npm cache:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Build Issues

### Build Hangs or Freezes

**Problem:** The build process hangs indefinitely.

**Solution:** Increase Node.js memory limit:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run docs:build
```

### Out of Memory Error

**Problem:** Build fails with "JavaScript heap out of memory".

**Solution:** Add this to your `package.json`:

```json
{
  "scripts": {
    "docs:build": "NODE_OPTIONS=--max_old_space_size=4096 vuepress build docs"
  }
}
```

### Port Already in Use

**Problem:** Dev server can't start because port 8080 is in use.

**Solution:** Specify a different port:

```bash
npm run docs:dev -- --port 8081
```

## Content Issues

### Images Not Loading

**Problem:** Images don't display in the built site.

**Solution:** Use the correct path format:

```markdown
<!-- Correct -->
![Image](./images/photo.jpg)
![Image](/images/photo.jpg)

<!-- Incorrect -->
![Image](images/photo.jpg)
```

### Broken Links

**Problem:** Internal links return 404 errors.

**Solution:** Use the proper link format:

```markdown
<!-- Correct -->
[Link](/guide/configuration.html)
[Link](./configuration.html)

<!-- Incorrect -->
[Link](/guide/configuration)
[Link](guide/configuration.html)
```

### Markdown Not Rendering

**Problem:** Markdown syntax not rendering correctly.

**Solution:** Check for proper spacing and syntax:

```markdown
<!-- Correct -->
# Heading

Content here.

<!-- Incorrect (missing blank line) -->
# Heading
Content here.
```

## Deployment Issues

### GitHub Pages 404 Error

**Problem:** GitHub Pages shows 404 for all pages except home.

**Solution:** Ensure `base` is set correctly in config:

```js
export default defineUserConfig({
  base: '/repository-name/',
})
```

### Styles Not Loading on GitHub Pages

**Problem:** Site loads but styles are missing.

**Solution:** Check the `base` configuration matches your repository name exactly.

### Deploy Script Fails

**Problem:** Deploy script throws errors.

**Solution:** Ensure you have push access and the remote is configured:

```bash
git remote -v
# Should show your GitHub repository

# If not set:
git remote add origin git@github.com:username/repo.git
```

## Performance Issues

### Slow Build Times

**Problem:** Build takes several minutes to complete.

**Solution:**

1. Reduce the number of pages being built
2. Optimize images before adding them
3. Use fewer plugins
4. Enable caching:

```js
export default defineUserConfig({
  cache: true,
})
```

### Slow Dev Server

**Problem:** Dev server is slow to reload changes.

**Solution:** Disable plugins you don't need during development:

```js
export default defineUserConfig({
  plugins: process.env.NODE_ENV === 'production'
    ? [/* all plugins */]
    : [/* essential plugins only */],
})
```

## Getting Help

If you're still experiencing issues:

1. Check the [VuePress documentation](https://v2.vuepress.vuejs.org/)
2. Search [existing issues](https://github.com/vuepress/vuepress-next/issues)
3. Ask in the [Discord community](https://discord.gg/vuepress)
4. Open a new issue with details about your problem

## Common Error Messages

### `Error: Cannot find module`

**Cause:** Missing dependency or incorrect import path.

**Fix:** Install the missing package or fix the import path.

### `Error: ENOSPC: System limit`

**Cause:** System file watcher limit reached (Linux).

**Fix:** Increase the limit:

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### `Error: Failed to resolve component`

**Cause:** Component not registered or incorrect name.

**Fix:** Ensure the component is in `.vuepress/components/` and the name matches the file name.
