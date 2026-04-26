const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = 'https://calvinrdevelopment.com';
const pagesDirectory = path.join(__dirname, '../src/pages');
const outputPath = path.join(__dirname, '../public/sitemap.xml');
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' }
];

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Generate sitemap XML content
const generateSitemapXml = () => {
  const currentDate = getCurrentDate();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Write sitemap to file
const writeSitemap = () => {
  const sitemapContent = generateSitemapXml();
  
  // Create directory if it doesn't exist
  const directory = path.dirname(outputPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  
  // Write sitemap file
  fs.writeFileSync(outputPath, sitemapContent);
  console.log(`Sitemap generated at: ${outputPath}`);
};

// Execute
writeSitemap();
