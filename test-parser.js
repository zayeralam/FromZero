const assert=require('node:assert/strict');
const parse=require('./data-parser.js').parse;
const sample='# title
## Category A
- [Build a parser](https://example.com) in Python
- [Build a shell](https://example.org) using Bash
### Category B
[Build a database](https://db.test) in Go
';
const p=parse(sample);assert.equal(p.length,2);assert.equal(p[0].items.length,2);assert.equal(p[0].items[0].language,'Python');assert.equal(p[0].items[1].language,'Bash');assert.equal(p[1].items[0].language,'Go');assert.equal(p[0].items[0].url,'https://example.com');console.log('Parser tests passed');