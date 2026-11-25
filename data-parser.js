(function(root){
'use strict';
const LANGUAGES=['JavaScript','TypeScript','Python','C++','C#','C','Java','Go','Rust','Ruby','PHP','Swift','Kotlin','Objective-C','Scala','Dart','Perl','Lua','Haskell','Elixir','Erlang','Clojure','Bash','Shell','PowerShell','SQL','Julia','Zig','OCaml','Fortran','MATLAB','Solidity','Assembly','HTML','CSS','R','F#','Visual Basic','Groovy','Crystal','Nim','V','Verilog','VHDL','WebAssembly','React','Node.js','Tcl','Prolog','Scheme','Common Lisp','Ada','Pascal','Delphi','Cobol','Lisp','Pony','Elm','Svelte','Vue','Angular'];
const aliases={'js':'JavaScript','ts':'TypeScript','py':'Python','cpp':'C++','cxx':'C++','cs':'C#','golang':'Go','rb':'Ruby','rs':'Rust','kt':'Kotlin','sh':'Shell','bash':'Bash','ps':'PowerShell','node':'Node.js'};
function detectLanguage(text){
 const t=String(text||'').replace(/[*_`]/g,'');
 const low=t.toLowerCase();
 for(const [a,l] of Object.entries(aliases)){if(new RegExp('(^|[^a-z0-9])'+a+'([^a-z0-9]|$)','i').test(low))return l;}
 for(const l of LANGUAGES){if(new RegExp('(^|[^a-z0-9])'+l.replace(/[.*+?^${}()|[\\]\\]/g,'\\\\$&')+'([^a-z0-9]|$)','i').test(t))return l;}
 return 'Not specified';
}
function cleanTitle(raw){return String(raw||'').replace(/[*_`]/g,'').replace(/\\s+/g,' ').trim().replace(/^\\[[^\\]]*\\]\\s*/,'');}
function parse(md){
 const cats=[],seen=new Set();let current=null;
 for(const line of String(md||'').split(/\\r?\\n/)){
  const h=line.match(/^#{2,4}\\s+(.+?)\\s*#*$/);
  if(h){
   const name=cleanTitle(h[1]);
   if(/^tutorials$|^contribute$|^contributing$|^license$|^table of contents$/i.test(name)){current=null;continue;}
   if(/^#{2,3}/.test(line)){current=null;continue;}
   current={name,items:[]};cats.push(current);continue;
  }
  if(!current)continue;
  const re=/\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/g;let m;
  while((m=re.exec(line))){const raw=m[1].trim(),url=m[2].replace(/[.,;]+$/,'');if(!raw||seen.has(url))continue;seen.add(url);current.items.push({title:cleanTitle(raw),url,language:detectLanguage(raw+' '+line)});}
 }
 return cats.filter(c=>c.items.length);
}
const api={parse,detectLanguage,languages:LANGUAGES.slice()};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.FromZeroParser=api;
})(typeof globalThis!=='undefined'?globalThis:this);