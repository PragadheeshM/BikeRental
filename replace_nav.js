const fs = require('fs');
const path = require('path');

const files = [
  "services.html", 
  "service-details.html", 
  "pricing.html", 
  "index.html", 
  "index-niche.html", 
  "contact.html", 
  "blog.html", 
  "blog-details.html", 
  "about.html"
];

const basePath = 'd:\\HTML templates\\BikeRental&TourCompany';

files.forEach(file => {
  const filePath = path.join(basePath, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace the button classes outside the hamburger menu
    content = content.replace(/hidden lg:inline-flex/g, 'hidden md:inline-flex');
    
    // Replace the list item class inside the hamburger menu
    content = content.replace(/navbar__item lg:hidden/g, 'navbar__item md:hidden');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes needed for ${file}`);
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
  }
});
console.log('Done');
