(function(root){
'use strict';
function parse(md){
const cats=[];let current=null;
for(const line of String(md||'').split(/\r?\n/)){
const h=line.match(/^#{2,4}\s+(.+?)\s*#*$/);
if(h){current={name:h[1].replace(/[*_]/g,'').trim(),items:[]};cats.push(current);continue;}
if(!current)continue;
const re=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;let m;
while((m=re.exec(line))){
const title=m[1].trim(),url=m[2];if(!title)continue;
const langs=['Python','JavaScript','TypeScript','Java','C++','C#','Go','Rust','Ruby','PHP','Swift','Kotlin','Scala','Dart','Perl','Lua','Haskell','Elixir','Erlang','Clojure','Objective-C','Assembly','Bash','Shell','SQL','R','Julia','Zig','OCaml','Fortran','MATLAB','Solidity','HTML','CSS'];
let language='Not specified';for(const l of langs){if(line.toLowerCase().includes(l.toLowerCase())){language=l;break;}}
current.items.push({title,url,language});
}}
return cats.filter(c=>c.items.length);
}
const api={parse};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.FromZeroParser=api;
})(typeof globalThis!=='undefined'?globalThis:this);