const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const tailwindConfig = path.join(__dirname, 'tailwind.config.js');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/#C8A97E/g, '#ca641b')
    .replace(/#D4B88E/g, '#df782c');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
};

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js')) {
      replaceInFile(filePath);
    }
  }
};

walkSync(srcDir);
replaceInFile(tailwindConfig);
console.log('Color replacement complete.');
