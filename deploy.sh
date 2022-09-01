#!/use/bin/env sh

set -e

npm run build

cd dist

git init 
git add -A 
git commit -m "New deployment"
git push -f git@github.com:Yaacov-Zerrad/ecom-pre.git master:gh-pages

cd -