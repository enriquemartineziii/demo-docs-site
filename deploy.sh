#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# create a new git repository in the dist folder
git init
git branch -m master main
git add -A
git commit -m 'deploy'

# deploy to GitHub Pages
git push -f git@github.com:enriquemartineziii/demo-docs-site.git main:gh-pages

cd -
