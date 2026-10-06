const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../site');
const prefix = '/shoresy-browser/';
const port = Number(process.env.SHORESY_PORT || 4186);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.bin': 'application/octet-stream', '.data': 'application/octet-stream' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/' || url.pathname === '/shoresy-browser') { res.writeHead(302, { Location: prefix }); return res.end(); }
  if (!url.pathname.startsWith(prefix)) { res.writeHead(404); return res.end('Not found'); }
  const relative = decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html';
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (err, info) => {
    if (err || !info.isFile()) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': info.size, 'Cache-Control': 'no-cache' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, '127.0.0.1', () => console.log(`Shoresy preview: http://127.0.0.1:${port}${prefix}`));
