(()=>{var e={113:()=>{const e=document.querySelectorAll(".currency__item_top"),t=document.querySelectorAll(".currency__item_bottom"),o=document.querySelector("#currency-list-top"),r=document.querySelector("#currency-list-bottom");e.forEach((e=>{e.addEventListener("click",(()=>{o.classList.toggle("currency__items_active")}))})),t.forEach((e=>{e.addEventListener("click",(()=>{r.classList.toggle("currency__items_active")}))}))},482:()=>{const e=document.querySelector("#slider");document.addEventListener("DOMContentLoaded",(()=>{"dark"===localStorage.getItem("theme")&&(e.checked=!0,document.body.classList.add("dark"))})),e.addEventListener("change",(e=>{e.target.checked?(document.body.classList.add("dark"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark"),localStorage.setItem("theme","light"))}))},389:()=>{const e=document.querySelectorAll(".faq-item");document.addEventListener("DOMContentLoaded",(()=>{e.forEach((e=>{setTimeout((()=>{const t=e.offsetHeight,o=parseFloat(window.getComputedStyle(e.querySelector(".faq-top")).getPropertyValue("margin-bottom")),r=e.querySelector(".faq-top").offsetHeight+o+o;e.setAttribute("data-expanded-height",t),e.setAttribute("data-height",r),e.style.height=`${r}px`,e.addEventListener("click",(t=>{e.classList.contains("open")?(e.classList.remove("open"),e.style.height=`${e.getAttribute("data-height")}px`):(e.classList.add("open"),e.style.height=`${e.getAttribute("data-expanded-height")}px`)}))}),1e3)}))}))},536:()=>{document.querySelector("html").getAttribute("lang");const e=document.querySelector(".language__item_active"),t=document.querySelector(".language__items");e.addEventListener("click",(()=>{t.classList.toggle("language__items_active")}))},708:()=>{const e=document.querySelector("#global-scroll-top-button");window.addEventListener("scroll",(t=>{const o=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;e.style.display=o>195?"flex":"none"})),e.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})}))}},t={};function o(r){var c=t[r];if(void 0!==c)return c.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,o),n.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";o(113),o(482),o(389),o(536),o(708)})()})();
//# sourceMappingURL=index.201b9de85a603c3d2de6.js.map