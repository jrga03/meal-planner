if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return a[e]||(c=new Promise(async c=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=c}else importScripts(e),c()})),c.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},c=(c,a)=>{Promise.all(c.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(c)};self.define=(c,s,n)=>{a[c]||(a[c]=Promise.resolve().then(()=>{let a={};const i={uri:location.origin+c.slice(1)};return Promise.all(s.map(c=>{switch(c){case"exports":return a;case"module":return i;default:return e(c)}})).then(e=>{const c=n(...e);return a.default||(a.default=c),a})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/-0pgjxO6cYiHYFkZ7IZBB/_buildManifest.js",revision:"4a16bd4ed9affeb80f3ce438bce8b128"},{url:"/_next/static/-0pgjxO6cYiHYFkZ7IZBB/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/10b4975664c3e57d7fa4339ee6ca5f968971951f.0e3f3a8bb477b6338080.js",revision:"9fa33137d1ea657b0c5fc41037a6e686"},{url:"/_next/static/chunks/20.529f2dbe144ac37ebcff.js",revision:"d052fe6d4628643e9c6549baa38eea12"},{url:"/_next/static/chunks/21.f2f1a500cbee09e2091f.js",revision:"ca7280e2a91320d35c4bd5ac8091c51e"},{url:"/_next/static/chunks/22.2a12b00bcdccda492958.js",revision:"a2a7dd319e327d47570c24310b5ce79f"},{url:"/_next/static/chunks/332e26728814c5a9a494e1c7123d6913afd8339a.2e87bb0b2903c11e0b72.js",revision:"b071dd348cdc6c0737f46e274fb5fa04"},{url:"/_next/static/chunks/655d1bf00082367e32514709dd61f5f40f8f2bcc.4d5ed578ccde87b6ef54.js",revision:"74afdaad3b3e2deeb810ff1c529ecb7e"},{url:"/_next/static/chunks/b34ca6da30970d4fc65574cc381bd22fd218c982.4024d67e94a23c096bbb.js",revision:"725237bedd847af1f15fb4e9de0e0cda"},{url:"/_next/static/chunks/commons.0c1523c3a82deabc30ff.js",revision:"ce585ceb204d9bc82d172ddc0594f588"},{url:"/_next/static/chunks/f7b05900d983f9e6610bc811304c7d769ff050af.a64c12ada1ff8dcd069a.js",revision:"99bf0ea69b640f11d8b4e8880b420760"},{url:"/_next/static/chunks/framework.9c3a95562d3313e46372.js",revision:"55ebcf25d3ee46adeb366fcd30a715e2"},{url:"/_next/static/chunks/main-3f5ec64498d681671d68.js",revision:"416cb580c786896833aaeae931ebb4e7"},{url:"/_next/static/chunks/pages/404-fdaf2694c677979f8f32.js",revision:"48115e13e097f9253af6610c24e81a91"},{url:"/_next/static/chunks/pages/_app-95d11ca70bc202f218cf.js",revision:"f25ab754b4027f33f54266d1cb2736cd"},{url:"/_next/static/chunks/pages/_error-56d8475534f8d1296474.js",revision:"ad7f5649c92c0095c7c8e19d3e378278"},{url:"/_next/static/chunks/pages/categories-304b393da842fc798d20.js",revision:"8d9561d21bd483cb84a7ac0829926f33"},{url:"/_next/static/chunks/pages/index-b3da7bad091871a6b298.js",revision:"12e2011bcc211becb5929c2cb4fa0a81"},{url:"/_next/static/chunks/pages/plan-e93aedba4be18f3f8594.js",revision:"2ea06306412562a1a765bdaed36efdba"},{url:"/_next/static/chunks/pages/privacy-policy-21ac4f15718fefc616e7.js",revision:"98f048d38e8529a89073fb8593900ab0"},{url:"/_next/static/chunks/pages/recipe/add-5075cc6ebdaae070ab18.js",revision:"b8a8a36611ee70ab52228c70c52dedfe"},{url:"/_next/static/chunks/pages/recipes-cf4eacaa53d0ccf7e71e.js",revision:"638aac7baeb010b3d81aeaafdbee86e3"},{url:"/_next/static/chunks/pages/terms-and-conditions-f2a4a786d014a4758799.js",revision:"3207a107369efa2fec39a05c0ba352b6"},{url:"/_next/static/chunks/polyfills-0a2dccd2aa0d7ea1a89f.js",revision:"dc57e31a3bf18e0306300c1a9fba3bc6"},{url:"/_next/static/chunks/webpack-e075275b64b4a326e8ef.js",revision:"642a9dcea205b71a33af34c9862009ff"},{url:"/favicon.ico",revision:"4169492c70f26d080cefd8498ae4f19e"},{url:"/images/icons/icon-128x128.png",revision:"2b7464ac133213c8ecb18e6e7ad01f6f"},{url:"/images/icons/icon-144x144.png",revision:"cc5bc803f3aa2969cf49e022d5c27190"},{url:"/images/icons/icon-152x152.png",revision:"323776e91e9528d2f7b14d2bf8eb436f"},{url:"/images/icons/icon-192x192.png",revision:"0e38d58b62477b28285253f492a87185"},{url:"/images/icons/icon-384x384.png",revision:"d26106bd4af52e5acc6e879d807ae5d0"},{url:"/images/icons/icon-512x512.png",revision:"04a718e1298bd60d22ec67ca15b552ce"},{url:"/images/icons/icon-72x72.png",revision:"7f8f4706e1cf3fada94f76e1f8ac8985"},{url:"/images/icons/icon-96x96.png",revision:"fed80880ced2f1299232afb95ddc1ee5"},{url:"/manifest.json",revision:"d0dc76df57677540349c389349685b24"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
