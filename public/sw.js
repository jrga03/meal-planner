if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise(async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()})),s.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},s=(s,c)=>{Promise.all(s.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(s)};self.define=(s,a,n)=>{c[s]||(c[s]=Promise.resolve().then(()=>{let c={};const i={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return c;case"module":return i;default:return e(s)}})).then(e=>{const s=n(...e);return c.default||(c.default=s),c})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/3SggLf4EY1wf29RbjX96A/_buildManifest.js",revision:"7f49ad523741c9b771855cbe2e0b6654"},{url:"/_next/static/3SggLf4EY1wf29RbjX96A/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/84edd6910ed6629039dbd5ce6d7d41d1d52a8d82.337c4601b775b1517af3.js",revision:"94ec3b7d061a0d326e82f8b213a31310"},{url:"/_next/static/chunks/d67079ee6f1960233e288858bdbf1b88699465cd.f9bb849b5bd2d67171e5.js",revision:"684b5cc7ba89d4c91c7482d4e85b2ce7"},{url:"/_next/static/chunks/fc4510d37b115b11ef64fbbce0641a5281be513b.ea558ed9fab0647f4c72.js",revision:"3bc9dadb8695bc4ae027bc4db3461bca"},{url:"/_next/static/chunks/framework.0c4211edf3f7638b9e1c.js",revision:"8c5d71771fbb32b2f71d6a689f4017a5"},{url:"/_next/static/chunks/main-e8ffff08332cfd79b489.js",revision:"db5f41b6ae11ed43ce122d926f09e626"},{url:"/_next/static/chunks/pages/404-e40915ea1ea79ee15d8d.js",revision:"213699ed969cd5e74529ef89de1938a5"},{url:"/_next/static/chunks/pages/_app-36c39de5165d963757fa.js",revision:"a128c8a3da27280a07c7067a8e0c6c87"},{url:"/_next/static/chunks/pages/_error-b52f8b678ce4b85a362a.js",revision:"0ffc5512b987cb9dbdf2f00ea42a8761"},{url:"/_next/static/chunks/pages/categories-9aee4fe576073f949ac0.js",revision:"fcec64db65d9c5c258abf00941c4af60"},{url:"/_next/static/chunks/pages/index-8df78c4e6c09c51e7404.js",revision:"7854c754e6bfd3bfc033de0848ec2d9b"},{url:"/_next/static/chunks/pages/plan-5ea2107a6e75b2d0bb0c.js",revision:"151fece5503801823a74f0cdc169e09d"},{url:"/_next/static/chunks/pages/recipe/add-b1d19e97652378077144.js",revision:"e1798a57151f70cf9332a6dd0e3a1e84"},{url:"/_next/static/chunks/pages/recipes-35e656dc86f3115f8c80.js",revision:"f6111cf54b3ff171f316526f2357a450"},{url:"/_next/static/chunks/polyfills-555defa4e62ba07d4446.js",revision:"d66b7bb9a3de4c8a45e3a28c2a9c2859"},{url:"/_next/static/chunks/webpack-e067438c4cf4ef2ef178.js",revision:"8c19f623e8389f11131a054a7e17ff95"},{url:"/_next/static/css/124f7bcbc1e0931de4e9.css",revision:"141213eadb0ecdb8ba0a6bd0f9202683"},{url:"/_next/static/css/18f69e0c6749a7dc9918.css",revision:"e1f5332fe95ec3fb08c984cc6c2ddd5f"},{url:"/favicon.ico",revision:"4169492c70f26d080cefd8498ae4f19e"},{url:"/images/icons/icon-128x128.png",revision:"2b7464ac133213c8ecb18e6e7ad01f6f"},{url:"/images/icons/icon-144x144.png",revision:"cc5bc803f3aa2969cf49e022d5c27190"},{url:"/images/icons/icon-152x152.png",revision:"323776e91e9528d2f7b14d2bf8eb436f"},{url:"/images/icons/icon-192x192.png",revision:"0e38d58b62477b28285253f492a87185"},{url:"/images/icons/icon-384x384.png",revision:"d26106bd4af52e5acc6e879d807ae5d0"},{url:"/images/icons/icon-512x512.png",revision:"04a718e1298bd60d22ec67ca15b552ce"},{url:"/images/icons/icon-72x72.png",revision:"7f8f4706e1cf3fada94f76e1f8ac8985"},{url:"/images/icons/icon-96x96.png",revision:"fed80880ced2f1299232afb95ddc1ee5"},{url:"/manifest.json",revision:"d0dc76df57677540349c389349685b24"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
