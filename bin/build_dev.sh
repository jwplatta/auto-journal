#!/bin/bash
cd ..

npm install
npm run build

cp ./main.js '/Users/jplatta/Library/Mobile Documents/iCloud~md~obsidian/Documents/development_vault/.obsidian/plugins/auto-journal'
cp ./manifest.json '/Users/jplatta/Library/Mobile Documents/iCloud~md~obsidian/Documents/development_vault/.obsidian/plugins/auto-journal'
cp ./styles.css '/Users/jplatta/Library/Mobile Documents/iCloud~md~obsidian/Documents/development_vault/.obsidian/plugins/auto-journal'

mv ./main.js ./dist
cp ./styles.css ./dist
cp ./manifest.json ./dist