import fs from 'fs';
import xmlBuilder from 'xmlbuilder';

// Define your routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/news', changefreq: 'daily', priority: 0.8 },
  { url: '/device/:id', changefreq: 'daily', priority: 0.7 },
];

// Create XML structure for sitemap
const root = xmlBuilder.create({ urlset: { '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9' } });
routes.forEach(route => {
  root.ele('url')
    .ele('loc', `https://uzexpo.com${route.url}`)
    .up()
    .ele('changefreq', route.changefreq)
    .up()
    .ele('priority', route.priority);
});

// Convert XML to string
const xmlString = root.end({ pretty: true });

// Write XML string to file
fs.writeFileSync('./public/sitemap.xml', xmlString, 'utf8');
