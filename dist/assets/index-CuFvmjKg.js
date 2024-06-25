(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();const c=document.getElementById("input-field"),d=document.getElementById("input-field-episode"),p=document.getElementById("select"),u=document.getElementById("gender"),i=document.querySelector(".loader");i.style.display="none";const l=document.getElementById("form");l.addEventListener("submit",e=>{e.preventDefault(),y()});const m=document.getElementById("form-episode");m.addEventListener("submit",e=>{e.preventDefault(),E()});function h(){const e="https://rickandmortyapi.com/api/character/",a=`?name=${c.value}`,t=`&status=${p.value}`,s=`&gender=${u.value}`;return`${e}${a}${t}${s}`}function f(){const e="https://rickandmortyapi.com/api/episode",a=`?name=${d.value}`;return`${e}${a}`}function E(){fetch(f()).then(e=>{if(!e.ok)throw Error(`${e.status} ${e.statusText}`);return e.json()}).then(e=>e.results).then(e=>(console.log("Epsode",e),v(e),e)).catch(e=>{console.error(e);const o=document.getElementById("output");if(o){let a=`<div class="errorCard-wrapper"><div class="errorCard">I'm sorry this happened to you. No matches found!</div></div>`;return o.innerHTML=a," output.innerHTML= errorCard "}}).finally(()=>{i.style.display="none"})}function y(){fetch(h()).then(e=>{if(!e.ok)throw Error(`${e.status} ${e.statusText}`);return e.json()}).then(e=>e.results).then(e=>{g(e)}).catch(e=>{console.error(e);const o=document.getElementById("output");if(o){let a=`<div class="errorCard-wrapper"><div class="errorCard">I'm sorry this happened to you. No matches found!</div></div>`;return o.innerHTML=a," output.innerHTML= errorCard "}}).finally(()=>{i.style.display="none"})}function g(e){const o=document.getElementById("output");if(o){i.style.display="block";let a=e.map(r=>{const t=r.location,n=r.origin;return` <div class="card">
      <div class="img-wrapper">
       <img  src='${r.image}' alt="Image">
      </div>
   <h2>${r.name}</h2>
   <p id=description-paragraph">Gender: ${r.gender}</p>
   <p id=description-paragraph">Origin: ${n.name}</p>
   <p id=description-paragraph">Location: ${t.name}</p>
   <div class="author-wrapper">
   <p class="status">Species: ${r.species}</p>
   <p class="status">Status: ${r.status}</p>
   </div>
   <p class="status">Status: ${r.episode}</p>
      </div>`});o.innerHTML=a.join("")}}function v(e){const o=document.getElementById("output");if(o){i.style.display="block";let a=e.map(r=>` <div class="card">
   <h2>${r.name}</h2>
   <p id=description-paragraph">Air Date: ${r.air_date}</p>
   <p id=description-paragraph">Episode: ${r.episode}</p>
   <p id=description-paragraph">Characters: ${r.characters} </p>
   
      </div>`);o.innerHTML=a.join("")}}
