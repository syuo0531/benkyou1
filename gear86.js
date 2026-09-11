(function(){
'use strict';
/* v8.8 loader only. Existing app/game logic and gear art are untouched. */
function load88(){
 if(document.querySelector('script[data-gear88]'))return;
 const s=document.createElement('script');
 s.src='gear88.js?v=88';
 s.dataset.gear88='1';
 document.body.appendChild(s);
}
if(document.readyState==='complete')load88();
else window.addEventListener('load',load88,{once:true});
})();