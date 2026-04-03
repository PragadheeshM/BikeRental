const fs = require('fs');
const path = require('path');

const dir = __dirname;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const buildNav = (filename) => {
    const d = (page) => {
        if (page === 'Home' && ['index.html', 'index-niche.html'].includes(filename)) return ' navbar__link--active';
        if (page === 'About' && filename === 'about.html') return ' navbar__link--active';
        if (page === 'Services' && ['services.html', 'service-details.html'].includes(filename)) return ' navbar__link--active';
        if (page === 'Pricing' && filename === 'pricing.html') return ' navbar__link--active';
        if (page === 'Blog' && ['blog.html', 'blog-details.html'].includes(filename)) return ' navbar__link--active';
        if (page === 'Dashboard' && ['admin-dashboard.html', 'user-dashboard.html'].includes(filename)) return ' navbar__link--active';
        if (page === 'Contact' && filename === 'contact.html') return ' navbar__link--active';
        return '';
    };

    return `<ul class="navbar__menu" id="navMenu">
        <li class="navbar__item">
          <a href="#" class="navbar__link${d('Home')}" data-dropdown>
            Home <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </a>
          <ul class="navbar__dropdown">
            <li><a href="index.html" class="navbar__dropdown-link">Corporate Home</a></li>
            <li><a href="index-niche.html" class="navbar__dropdown-link">Adventure Home</a></li>
          </ul>
        </li>
        <li class="navbar__item"><a href="about.html" class="navbar__link${d('About')}">About</a></li>
        <li class="navbar__item"><a href="services.html" class="navbar__link${d('Services')}">Services</a></li>
        <li class="navbar__item"><a href="pricing.html" class="navbar__link${d('Pricing')}">Pricing</a></li>
        <li class="navbar__item">
          <a href="#" class="navbar__link${d('Blog')}" data-dropdown>
            Blog <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </a>
          <ul class="navbar__dropdown">
            <li><a href="blog.html" class="navbar__dropdown-link">Blog Grid</a></li>
            <li><a href="blog-details.html" class="navbar__dropdown-link">Blog Details</a></li>
          </ul>
        </li>
        <li class="navbar__item">
          <a href="#" class="navbar__link${d('Dashboard')}" data-dropdown>
            Dashboard <i data-lucide="chevron-down" class="w-4 h-4"></i>
          </a>
          <ul class="navbar__dropdown">
            <li><a href="admin-dashboard.html" class="navbar__dropdown-link">Admin Dashboard</a></li>
            <li><a href="user-dashboard.html" class="navbar__dropdown-link">User Dashboard</a></li>
          </ul>
        </li>
        <li class="navbar__item"><a href="contact.html" class="navbar__link${d('Contact')}">Contact</a></li>
      </ul>`.replace(/\s+/g, ' ').replace(/> </g, '><'); // condense it nicely but uniformly
};

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // The navMenu in all files will be replaced.
    // It starts with <ul class="navbar__menu" id="navMenu"> and ends with </ul> before <div class="navbar__actions">
    const regex = /<ul class="navbar__menu" id="navMenu">([\s\S]*?)<\/ul>\s*<div class="navbar__actions">/;
    
    if (regex.test(content)) {
        const replacement = buildNav(file) + '<div class="navbar__actions">';
        content = content.replace(regex, replacement);
        
        // Let's also restore nice line breaks in index.html and index-niche
        if (['index.html', 'index-niche.html'].includes(file)) {
            // It might be squashed, let it be. Or format it using prettier? 
            // We just let the regex do its thing.
        }

        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log('Updated: ' + file);
    } else {
        console.log('Nav pattern not found in: ' + file);
    }
}

console.log('Total files updated: ' + updatedCount);
