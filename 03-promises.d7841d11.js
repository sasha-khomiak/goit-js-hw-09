!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},i=n.parcelRequire7bc7;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequire7bc7=i);var r=i("6JpON"),c=document.querySelector(".form"),a=0;function u(n,o){new Promise((function(e,t){var i=Math.random()>.3;setTimeout((function(){i?e({position:n,delay:o}):t({position:n,delay:o})}),o)})).then((function(n){var o=n.position,t=n.delay;e(r).Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms")),console.log("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms"))})).catch((function(n){var o=n.position,t=n.delay;e(r).Notify.success("❌ Rejected promise ".concat(o," in ").concat(t,"ms"),{success:{background:"#ff5549"}}),console.log("❌ Rejected promise ".concat(o," in ").concat(t,"ms"))}))}c.addEventListener("submit",(function(e){e.preventDefault();var n=e.currentTarget.elements,o=n.delay,t=n.step,i=n.amount,r=Number(o.value),c=Number(t.value),l=Number(i.value);a=r;for(var s=1;s<=l;s+=1)u(s,a),a+=c}))}();
//# sourceMappingURL=03-promises.d7841d11.js.map
