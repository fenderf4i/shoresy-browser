const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../site');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const entries=walk(root).filter(f=>path.basename(f)!=='checksums.json').sort().map(f=>[path.relative(root,f).replaceAll(path.sep,'/'),crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')]);
fs.writeFileSync(path.join(root,'checksums.json'),JSON.stringify(Object.fromEntries(entries),null,2)+'\n');
console.log(`Recorded ${entries.length} asset hashes.`);
