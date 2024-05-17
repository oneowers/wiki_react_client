const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');

const pages = [
  // List of URLs of your website
  { url: '/page1', changefreq: 'daily', priority: 0.3 },
  { url: '/page2', changefreq: 'daily', priority: 0.5 },
  // Add more URLs as needed
];

// Create a ReadableStream to pass to the SitemapStream
const stream = new SitemapStream({ hostname: 'https://yourwebsite.com' });
const writeStream = createWriteStream('./public/sitemap.xml');

(async () => {
  for (const page of pages) {
    stream.write(page);
  }
  stream.end();
  await streamToPromise(stream).then((data) => {
    writeStream.write(data.toString());
    writeStream.end();
  });
})();
