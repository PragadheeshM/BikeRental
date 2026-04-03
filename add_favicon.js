const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('rel="icon"')) {
    content = content.replace('</head>', '  <link rel="icon" type="image/svg+xml" href="favicon.svg" />\n</head>');
    fs.writeFileSync(f, content);
    count++;
  }
});
console.log('Added favicon link to ' + count + ' HTML files.');
