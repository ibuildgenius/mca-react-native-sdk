const fs = require('fs');
const path = require('path');

function processSvgFiles(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    if (path.extname(file) === '.svg') {
      const filePath = path.join(directory, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Remove any TypeScript imports or declarations
      content = content.replace(/^import.*$/gm, '');
      content = content.replace(/^declare.*$/gm, '');
      content = content.replace(/^type.*$/gm, '');

      fs.writeFileSync(filePath, content);
    }
  });
}

// Process SVG files in your icons directory
processSvgFiles(path.join(__dirname, '../src/assets/icons'));
