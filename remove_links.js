const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Remove footer links
  content = content.replace(/<a href="terms\.html">Terms<\/a>\s*<a href="privacy\.html">Privacy<\/a>/g, '');
  
  // Update register.html text
  content = content.replace(
    /<a href="terms\.html" class="text-primary hover:underline">Terms of Service<\/a> and <a href="privacy\.html" class="text-primary hover:underline">Privacy Policy<\/a>/g, 
    'Terms of Service and Privacy Policy'
  );
  
  fs.writeFileSync(f, content);
});
console.log('Successfully unlinked privacy and terms pages.');
