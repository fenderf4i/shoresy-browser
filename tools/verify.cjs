/* Verify the exact ROM and all shipped assets, locally or over HTTP(S). */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../site');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const files = walk(root).filter(f => path.basename(f) !== 'checksums.json');
const expected = JSON.parse(fs.readFileSync(path.join(root,'checksums.json'),'utf8'));
const meta = JSON.parse(fs.readFileSync(path.join(root,'roms/provenance.json'),'utf8'));
const rom = fs.readFileSync(path.join(root,'roms',meta.publishedFilename));
assert.equal(rom.length, meta.bytes);
assert.equal(sha(rom), meta.sha256, 'The supplied ROM must remain unchanged');
assert.equal(rom.subarray(0x100,0x10c).toString('ascii'), 'SEGA GENESIS');
assert.ok(fs.existsSync(path.join(root,'.nojekyll')));
assert.equal(files.length, Object.keys(expected).length, 'Regenerate checksums after adding files');
let bytes=0;
for (const file of files) {
  const name=path.relative(root,file).replaceAll(path.sep,'/');
  const content=fs.readFileSync(file);
  assert.equal(sha(content),expected[name],`Asset differs: ${name}`);
  assert.ok(content.length < 100 * 1024 * 1024, `GitHub file limit: ${name}`);
  bytes+=content.length;
}
assert.ok(bytes < 1024 * 1024 * 1024);
console.log(`LOCAL PASS: ${files.length} assets, ${(bytes/1048576).toFixed(2)} MiB; exact ROM hash verified.`);
async function hosted() {
  const base=process.argv[2];
  if (!base) return;
  assert.match(base,/^https?:\/\/.+\/$/);
  // The source archive and .nojekyll do not participate in runtime loading.
  for (const name of Object.keys(expected).filter(n=>n !== '.nojekyll' && !n.endsWith('.tar.gz'))) {
    const res=await fetch(new URL(name,base), {signal:AbortSignal.timeout(20000)});
    assert.equal(res.status,200,`${name}: HTTP ${res.status}`);
    assert.equal(sha(Buffer.from(await res.arrayBuffer())),expected[name],`Hosted asset differs: ${name}`);
  }
  console.log(`HOSTED PASS: published assets match local files at ${base}`);
}
hosted().catch(e=>{console.error(e.message);process.exitCode=1;});
