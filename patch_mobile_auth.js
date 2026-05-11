const fs = require('fs');
const path = require('path');

const pages = [
  'about.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'pricing.html',
  'services.html',
  'service-details.html',
  'index-niche.html',
];

const authBlock =
  '<li class="navbar__item navbar__item--auth md:hidden">' +
  '<div class="navbar__mobile-auth">' +
  '<a href="login.html" class="btn btn--ghost btn--sm w-full">Sign In</a>' +
  '<a href="register.html" class="btn btn--primary btn--sm w-full">Sign Up</a>' +
  '</div></li>';

// The closing pattern that ends the navbar__menu <ul>
// All minified pages end their menu with: </ul></li></ul><div class="navbar__actions">
const SEARCH = '</ul></li></ul><div class="navbar__actions">';
const REPLACE = `</ul></li>${authBlock}</ul><div class="navbar__actions">`;

const base = __dirname;

pages.forEach((page) => {
  const filePath = path.join(base, page);
  if (!fs.existsSync(filePath)) {
    console.log(`NOT FOUND: ${page}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('navbar__item--auth')) {
    console.log(`Already patched: ${page}`);
    return;
  }
  if (!content.includes(SEARCH)) {
    console.log(`Pattern not found in: ${page}`);
    return;
  }
  content = content.replace(SEARCH, REPLACE);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched: ${page}`);
});

console.log('Done.');
