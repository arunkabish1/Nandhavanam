export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nfakuwait.com/</loc></url>
  <url><loc>https://nfakuwait.com/about</loc></url>
  <url><loc>https://nfakuwait.com/gallery</loc></url>
  <url><loc>https://nfakuwait.com/admission</loc></url>
  <url><loc>https://nfakuwait.com/contact</loc></url>
  <url><loc>https://nfakuwait.com/login</loc></url>
</urlset>`);
}
