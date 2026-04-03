const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('data-lucide="languages"')) {
    content = content.replace(/data-lucide="languages"/g, 'data-lucide="globe"');
    fs.writeFileSync(f, content);
    count++;
  }
});
console.log('Updated ' + count + ' files for Globe icon.');
// Just to be sure, if the user specifically wanted exactly "browser", let's also support that if they complain.
