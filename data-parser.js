(function(root){
'use strict';
const LANGUAGES=['TypeScript','JavaScript','Objective-C','C++','C#','Assembly','Python','Java','Go','Rust','Ruby','PHP','Swift','Kotlin','Scala','Dart','Perl','Lua','Haskell','Elixir','Erlang','Clojure','Bash','Shell','SQL','R','Julia','Zig','OCaml','Fortran','MATLAB','Solidity','HTML','CSS','C'];
function detectLanguage(text){const t=String(text||'').toLowerCase();for(const l of LANGUAGES){if(l==='R'||l==='C'){if(new RegExp('(^|[^a-z])'+l+'([^a-z]|$)','i').test(t))return l;}else if(t.includes(l.toLowerCase()))return l;}return 'Not specified';}
function parse(md){
const cats=[];let current=null;const seen=new Set();
for(const line of String(md||'').split(/\r?\n/)){
const h=line.match(/^#{2,4}\s+(.+?)\s*#*$/);
if(h){current={name:h[1].replace(/[*_`]/g,'').trim(),items:[]};cats.push(current);continue;}
if(!current)continue;
const re=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;let m;
while((m=re.exec(line))){const title=m[1].trim();const url=m[2].replace(/[.,;]+$/,'');if(!title||seen.has(url))continue;seen.add(url);current.items.push({title:title,url:url,language:detectLanguage(title+' '+line)});}
}
return cats.filter(c=>c.items.length);
}
const api={parse:parse,detectLanguage:detectLanguage};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.FromZeroParser=api;
})(typeof globalThis!=='undefined'?globalThis:this);