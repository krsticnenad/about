#!/bin/bash

# Build for prod
npm run production

# Move prod assets because of zip path
cp -r web/js ./js
cp -r web/css ./css
cp web/mix-manifest.json ./

# Zip everything together
zip -r deploy.zip ./vendor/ ./config/project/ ./css ./js/ ./mix-manifest.json ./templates

# Cleanup files
rm -rf ./js ./css ./mix-manifest

echo "Archive prepared for deployment."
echo "Delete the following folders on the server:"
echo "- vendor"
echo "- css"
echo "- js"
echo "- templates"
echo "- config/project"

echo "--------"
echo "Upload 'deploy.zip' and unarchive"