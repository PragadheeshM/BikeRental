const fs = require('fs');

const dir = '.';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(file, 'utf8');
        
        const navMenuSearch = /<ul class="navbar__menu" id="navMenu">([\s\S]*?)<\/ul>\s*(?:<!--\s*Actions\s*-->\s*)?<div class="navbar__actions">/i;
        
        const match = content.match(navMenuSearch);
        if (match) {
            const currentMenu = match[1];
            if (!currentMenu.includes('md:hidden') && !currentMenu.includes('login.html')) {
                const mobileAuthHTML = `
        <li class="navbar__item md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
          <a href="login.html" class="btn btn--ghost w-full justify-center" style="justify-content:center;">Sign In</a>
          <a href="register.html" class="btn btn--primary w-full justify-center" style="justify-content:center;">Sign Up</a>
        </li>
      `;
                const newMenu = currentMenu + mobileAuthHTML;
                const replacement = '<ul class="navbar__menu" id="navMenu">' + newMenu + '</ul>\n      <div class="navbar__actions">';
                const newContent = content.replace(navMenuSearch, replacement);
                fs.writeFileSync(file, newContent, 'utf8');
                console.log('Patched ' + file);
            } else {
                console.log('Already patched: ' + file);
            }
        }
    }
});
