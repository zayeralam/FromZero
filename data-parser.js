(function(root){
'use strict';
const LANGUAGES=['TypeScript','JavaScript','Objective-C','C++','C#','Assembly','Python','Java','Go','Rust','Ruby','PHP','Swift','Kotlin','Scala','Dart','Perl','Lua','Haskell','Elixir','Erlang','Clojure','Bash','Shell','SQL','Julia','Zig','OCaml','Fortran','MATLAB','Solidity','HTML','CSS','C'];
function detectLanguage(text){
const t=String(text||'').replace(/[*_`]/g,'').toLowerCase();
for(const l of LANGUAGES){const key=l.toLowerCase();const re=new RegExp('(^|[^a-z0-9])'+key.replace(/[.*+?^$()|[\]\\]/g,'\\$&')+'([^a-z0-9]|$)','i');if(re.test(t))return l;}
return 'Not specified';
}
function cleanTitle(raw){return String(raw||'').replace(/[*_`]/g,'').replace(/\s+/g,' ').trim().replace(/^\[[^\]]*\]\s*/,'');}
function parse(md){
const cats=[];let current=null;const seen=new Set();
for(const line of String(md||'').split(/\r?\n/)){
const h=line.match(/^#{2,4}\s+(.+?)\s*#*$/);
if(h){const name=cleanTitle(h[1]);if(name.toLowerCase()==='tutorials'||name.toLowerCase()==='build your own <insert-technology-here>')continue;current={name,items:[]};cats.push(current);continue;}
if(!current)continue;
const re=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;let m;
while((m=re.exec(line))){const raw=m[1].trim(),url=m[2].replace(/[.,;]+$/,'');if(!raw||seen.has(url))continue;seen.add(url);const title=cleanTitle(raw);current.items.push({title,url,language:detectLanguage(raw+' '+line)});}
}
return cats.filter(c=>c.items.length);
}
const api={parse,detectLanguage};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.FromZeroParser=api;
})(typeof globalThis!=='undefined'?globalThis:this);