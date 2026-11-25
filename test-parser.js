const assert=require('node:assert/strict');
const {parse,detectLanguage,languages}=require('./data-parser.js');
const sample='# title\\n## Tutorials\\n#### Build your own `Database`\\n* [**Go**: _Build Your Own Database from Scratch_](https://db.test/)\\n* [**C++**: _Simple Database_](https://cpp.test/)\\n#### Build your own `Shell`\\n* [**Bash**: _Build a shell_](https://shell.test/)\\n#### Build your own `AI Model`\\n* [**Python**: _A Large Language Model_](https://ai.test/)\\n## Contribute\\n[issue](https://issues.test)';
const p=parse(sample);assert.equal(p.length,3);assert.equal(p[0].name,'Build your own Database');assert.equal(p[0].items.length,2);assert.equal(p[0].items[0].language,'Go');assert.equal(p[0].items[1].language,'C++');assert.equal(p[1].items[0].language,'Bash');assert.equal(p[2].items[0].language,'Python');assert.equal(p[0].items[0].url,'https://db.test/');
for(const [input,expected] of [['TypeScript build','TypeScript'],['Build with Java','Java'],['golang service','Go'],['cpp project','C++'],['Rust project','Rust'],['bash script','Bash'],['Node.js app','Node.js'],['No language here','Not specified']])assert.equal(detectLanguage(input),expected,input);
assert.ok(languages.length>=50,'language coverage list should be broad');
assert.equal(parse('[outside heading](https://x.test)').length,0);
assert.equal(parse('## Contribute\\n[issue](https://issues.test)').length,0);
console.log('Parser tests passed');