#!/bin/sh
echo "Deploy doc to github pages.";
mkdir gh_pages;
cp -r doc gh_pages/;
cd gh_pages && git init;
git config user.name "leancloud-bot";
git config user.email "ci@leancloud.cn";
git add .;
git commit -m "Deploy demos to Github Pages [skip ci]";
git push -qf https://${TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git master:gh-pages > /dev/null 2>&1;
echo "done.";
cd ..
