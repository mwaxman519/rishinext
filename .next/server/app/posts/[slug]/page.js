(()=>{var e={};e.id=858,e.ids=[858],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},4123:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>s.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var o=t(260),n=t(8203),l=t(5155),s=t.n(l),i=t(7292),a={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(a[e]=()=>i[e]);t.d(r,a);let d=["",{children:["posts",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,243)),"/home/runner/workspace/app/posts/[slug]/page.tsx"]}]},{error:[()=>Promise.resolve().then(t.bind(t,4789)),"/home/runner/workspace/app/posts/[slug]/error.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,9696)),"/home/runner/workspace/app/posts/[slug]/loading.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,9719)),"/home/runner/workspace/app/posts/layout.tsx"]}]},{"not-found":[()=>Promise.resolve().then(t.t.bind(t,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,1485,23)),"next/dist/client/components/unauthorized-error"]}],c=["/home/runner/workspace/app/posts/[slug]/page.tsx"],u={require:t,loadChunk:()=>Promise.resolve()},p=new o.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/posts/[slug]/page",pathname:"/posts/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},7811:(e,r,t)=>{Promise.resolve().then(t.bind(t,4789))},3467:(e,r,t)=>{Promise.resolve().then(t.bind(t,4507))},6522:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,3219,23)),Promise.resolve().then(t.t.bind(t,4863,23)),Promise.resolve().then(t.t.bind(t,5155,23)),Promise.resolve().then(t.t.bind(t,802,23)),Promise.resolve().then(t.t.bind(t,9350,23)),Promise.resolve().then(t.t.bind(t,8530,23)),Promise.resolve().then(t.t.bind(t,8921,23))},9570:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,6959,23)),Promise.resolve().then(t.t.bind(t,3875,23)),Promise.resolve().then(t.t.bind(t,8903,23)),Promise.resolve().then(t.t.bind(t,7174,23)),Promise.resolve().then(t.t.bind(t,4178,23)),Promise.resolve().then(t.t.bind(t,7190,23)),Promise.resolve().then(t.t.bind(t,1365,23))},6487:()=>{},8335:()=>{},4507:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>ec});var o=t(5512);function n(){for(var e,r,t=0,o="",n=arguments.length;t<n;t++)(e=arguments[t])&&(r=function e(r){var t,o,n="";if("string"==typeof r||"number"==typeof r)n+=r;else if("object"==typeof r){if(Array.isArray(r)){var l=r.length;for(t=0;t<l;t++)r[t]&&(o=e(r[t]))&&(n&&(n+=" "),n+=o)}else for(o in r)r[o]&&(n&&(n+=" "),n+=o)}return n}(e))&&(o&&(o+=" "),o+=r);return o}let l=e=>{let r=d(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:e=>{let t=e.split("-");return""===t[0]&&1!==t.length&&t.shift(),s(t,r)||a(e)},getConflictingClassGroupIds:(e,r)=>{let n=t[e]||[];return r&&o[e]?[...n,...o[e]]:n}}},s=(e,r)=>{if(0===e.length)return r.classGroupId;let t=e[0],o=r.nextPart.get(t),n=o?s(e.slice(1),o):void 0;if(n)return n;if(0===r.validators.length)return;let l=e.join("-");return r.validators.find(({validator:e})=>e(l))?.classGroupId},i=/^\[(.+)\]$/,a=e=>{if(i.test(e)){let r=i.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},d=e=>{let{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return f(Object.entries(e.classGroups),t).forEach(([e,t])=>{c(t,o,e,r)}),o},c=(e,r,t,o)=>{e.forEach(e=>{if("string"==typeof e){(""===e?r:u(r,e)).classGroupId=t;return}if("function"==typeof e){if(p(e)){c(e(o),r,t,o);return}r.validators.push({validator:e,classGroupId:t});return}Object.entries(e).forEach(([e,n])=>{c(n,u(r,e),t,o)})})},u=(e,r)=>{let t=e;return r.split("-").forEach(e=>{t.nextPart.has(e)||t.nextPart.set(e,{nextPart:new Map,validators:[]}),t=t.nextPart.get(e)}),t},p=e=>e.isThemeGetter,f=(e,r)=>r?e.map(([e,t])=>[e,t.map(e=>"string"==typeof e?r+e:"object"==typeof e?Object.fromEntries(Object.entries(e).map(([e,t])=>[r+e,t])):e)]):e,b=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let r=0,t=new Map,o=new Map,n=(n,l)=>{t.set(n,l),++r>e&&(r=0,o=t,t=new Map)};return{get(e){let r=t.get(e);return void 0!==r?r:void 0!==(r=o.get(e))?(n(e,r),r):void 0},set(e,r){t.has(e)?t.set(e,r):n(e,r)}}},m=e=>{let{separator:r,experimentalParseClassName:t}=e,o=1===r.length,n=r[0],l=r.length,s=e=>{let t;let s=[],i=0,a=0;for(let d=0;d<e.length;d++){let c=e[d];if(0===i){if(c===n&&(o||e.slice(d,d+l)===r)){s.push(e.slice(a,d)),a=d+l;continue}if("/"===c){t=d;continue}}"["===c?i++:"]"===c&&i--}let d=0===s.length?e:e.substring(a),c=d.startsWith("!"),u=c?d.substring(1):d;return{modifiers:s,hasImportantModifier:c,baseClassName:u,maybePostfixModifierPosition:t&&t>a?t-a:void 0}};return t?e=>t({className:e,parseClassName:s}):s},g=e=>{if(e.length<=1)return e;let r=[],t=[];return e.forEach(e=>{"["===e[0]?(r.push(...t.sort(),e),t=[]):t.push(e)}),r.push(...t.sort()),r},h=e=>({cache:b(e.cacheSize),parseClassName:m(e),...l(e)}),v=/\s+/,y=(e,r)=>{let{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:n}=r,l=[],s=e.trim().split(v),i="";for(let e=s.length-1;e>=0;e-=1){let r=s[e],{modifiers:a,hasImportantModifier:d,baseClassName:c,maybePostfixModifierPosition:u}=t(r),p=!!u,f=o(p?c.substring(0,u):c);if(!f){if(!p||!(f=o(c))){i=r+(i.length>0?" "+i:i);continue}p=!1}let b=g(a).join(":"),m=d?b+"!":b,h=m+f;if(l.includes(h))continue;l.push(h);let v=n(f,p);for(let e=0;e<v.length;++e){let r=v[e];l.push(m+r)}i=r+(i.length>0?" "+i:i)}return i};function x(){let e,r,t=0,o="";for(;t<arguments.length;)(e=arguments[t++])&&(r=w(e))&&(o&&(o+=" "),o+=r);return o}let w=e=>{let r;if("string"==typeof e)return e;let t="";for(let o=0;o<e.length;o++)e[o]&&(r=w(e[o]))&&(t&&(t+=" "),t+=r);return t},j=e=>{let r=r=>r[e]||[];return r.isThemeGetter=!0,r},_=/^\[(?:([a-z-]+):)?(.+)\]$/i,R=/^\d+\/\d+$/,P=new Set(["px","full","screen"]),k=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,O=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,E=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,z=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,N=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,C=e=>S(e)||P.has(e)||R.test(e),M=e=>V(e,"length",H),S=e=>!!e&&!Number.isNaN(Number(e)),T=e=>V(e,"number",S),A=e=>!!e&&Number.isInteger(Number(e)),D=e=>e.endsWith("%")&&S(e.slice(0,-1)),G=e=>_.test(e),I=e=>k.test(e),L=new Set(["length","size","percentage"]),F=e=>V(e,L,K),B=e=>V(e,"position",K),$=new Set(["image","url"]),q=e=>V(e,$,Q),W=e=>V(e,"",X),U=()=>!0,V=(e,r,t)=>{let o=_.exec(e);return!!o&&(o[1]?"string"==typeof r?o[1]===r:r.has(o[1]):t(o[2]))},H=e=>O.test(e)&&!E.test(e),K=()=>!1,X=e=>z.test(e),Q=e=>N.test(e);Symbol.toStringTag;let Z=function(e,...r){let t,o,n;let l=function(i){return o=(t=h(r.reduce((e,r)=>r(e),e()))).cache.get,n=t.cache.set,l=s,s(i)};function s(e){let r=o(e);if(r)return r;let l=y(e,t);return n(e,l),l}return function(){return l(x.apply(null,arguments))}}(()=>{let e=j("colors"),r=j("spacing"),t=j("blur"),o=j("brightness"),n=j("borderColor"),l=j("borderRadius"),s=j("borderSpacing"),i=j("borderWidth"),a=j("contrast"),d=j("grayscale"),c=j("hueRotate"),u=j("invert"),p=j("gap"),f=j("gradientColorStops"),b=j("gradientColorStopPositions"),m=j("inset"),g=j("margin"),h=j("opacity"),v=j("padding"),y=j("saturate"),x=j("scale"),w=j("sepia"),_=j("skew"),R=j("space"),P=j("translate"),k=()=>["auto","contain","none"],O=()=>["auto","hidden","clip","visible","scroll"],E=()=>["auto",G,r],z=()=>[G,r],N=()=>["",C,M],L=()=>["auto",S,G],$=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],V=()=>["solid","dashed","dotted","double","none"],H=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],K=()=>["start","end","center","between","around","evenly","stretch"],X=()=>["","0",G],Q=()=>["auto","avoid","all","avoid-page","page","left","right","column"],Z=()=>[S,G];return{cacheSize:500,separator:":",theme:{colors:[U],spacing:[C,M],blur:["none","",I,G],brightness:Z(),borderColor:[e],borderRadius:["none","","full",I,G],borderSpacing:z(),borderWidth:N(),contrast:Z(),grayscale:X(),hueRotate:Z(),invert:X(),gap:z(),gradientColorStops:[e],gradientColorStopPositions:[D,M],inset:E(),margin:E(),opacity:Z(),padding:z(),saturate:Z(),scale:Z(),sepia:X(),skew:Z(),space:z(),translate:z()},classGroups:{aspect:[{aspect:["auto","square","video",G]}],container:["container"],columns:[{columns:[I]}],"break-after":[{"break-after":Q()}],"break-before":[{"break-before":Q()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...$(),G]}],overflow:[{overflow:O()}],"overflow-x":[{"overflow-x":O()}],"overflow-y":[{"overflow-y":O()}],overscroll:[{overscroll:k()}],"overscroll-x":[{"overscroll-x":k()}],"overscroll-y":[{"overscroll-y":k()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[m]}],"inset-x":[{"inset-x":[m]}],"inset-y":[{"inset-y":[m]}],start:[{start:[m]}],end:[{end:[m]}],top:[{top:[m]}],right:[{right:[m]}],bottom:[{bottom:[m]}],left:[{left:[m]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",A,G]}],basis:[{basis:E()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",G]}],grow:[{grow:X()}],shrink:[{shrink:X()}],order:[{order:["first","last","none",A,G]}],"grid-cols":[{"grid-cols":[U]}],"col-start-end":[{col:["auto",{span:["full",A,G]},G]}],"col-start":[{"col-start":L()}],"col-end":[{"col-end":L()}],"grid-rows":[{"grid-rows":[U]}],"row-start-end":[{row:["auto",{span:[A,G]},G]}],"row-start":[{"row-start":L()}],"row-end":[{"row-end":L()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",G]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",G]}],gap:[{gap:[p]}],"gap-x":[{"gap-x":[p]}],"gap-y":[{"gap-y":[p]}],"justify-content":[{justify:["normal",...K()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...K(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...K(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[R]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[R]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",G,r]}],"min-w":[{"min-w":[G,r,"min","max","fit"]}],"max-w":[{"max-w":[G,r,"none","full","min","max","fit","prose",{screen:[I]},I]}],h:[{h:[G,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[G,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[G,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[G,r,"auto","min","max","fit"]}],"font-size":[{text:["base",I,M]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",T]}],"font-family":[{font:[U]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",G]}],"line-clamp":[{"line-clamp":["none",S,T]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",C,G]}],"list-image":[{"list-image":["none",G]}],"list-style-type":[{list:["none","disc","decimal",G]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[h]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[h]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...V(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",C,M]}],"underline-offset":[{"underline-offset":["auto",C,G]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:z()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",G]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",G]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[h]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...$(),B]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",F]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},q]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[b]}],"gradient-via-pos":[{via:[b]}],"gradient-to-pos":[{to:[b]}],"gradient-from":[{from:[f]}],"gradient-via":[{via:[f]}],"gradient-to":[{to:[f]}],rounded:[{rounded:[l]}],"rounded-s":[{"rounded-s":[l]}],"rounded-e":[{"rounded-e":[l]}],"rounded-t":[{"rounded-t":[l]}],"rounded-r":[{"rounded-r":[l]}],"rounded-b":[{"rounded-b":[l]}],"rounded-l":[{"rounded-l":[l]}],"rounded-ss":[{"rounded-ss":[l]}],"rounded-se":[{"rounded-se":[l]}],"rounded-ee":[{"rounded-ee":[l]}],"rounded-es":[{"rounded-es":[l]}],"rounded-tl":[{"rounded-tl":[l]}],"rounded-tr":[{"rounded-tr":[l]}],"rounded-br":[{"rounded-br":[l]}],"rounded-bl":[{"rounded-bl":[l]}],"border-w":[{border:[i]}],"border-w-x":[{"border-x":[i]}],"border-w-y":[{"border-y":[i]}],"border-w-s":[{"border-s":[i]}],"border-w-e":[{"border-e":[i]}],"border-w-t":[{"border-t":[i]}],"border-w-r":[{"border-r":[i]}],"border-w-b":[{"border-b":[i]}],"border-w-l":[{"border-l":[i]}],"border-opacity":[{"border-opacity":[h]}],"border-style":[{border:[...V(),"hidden"]}],"divide-x":[{"divide-x":[i]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[i]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[h]}],"divide-style":[{divide:V()}],"border-color":[{border:[n]}],"border-color-x":[{"border-x":[n]}],"border-color-y":[{"border-y":[n]}],"border-color-s":[{"border-s":[n]}],"border-color-e":[{"border-e":[n]}],"border-color-t":[{"border-t":[n]}],"border-color-r":[{"border-r":[n]}],"border-color-b":[{"border-b":[n]}],"border-color-l":[{"border-l":[n]}],"divide-color":[{divide:[n]}],"outline-style":[{outline:["",...V()]}],"outline-offset":[{"outline-offset":[C,G]}],"outline-w":[{outline:[C,M]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:N()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[h]}],"ring-offset-w":[{"ring-offset":[C,M]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",I,W]}],"shadow-color":[{shadow:[U]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend":[...H(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":H()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[a]}],"drop-shadow":[{"drop-shadow":["","none",I,G]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[c]}],invert:[{invert:[u]}],saturate:[{saturate:[y]}],sepia:[{sepia:[w]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[a]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[c]}],"backdrop-invert":[{"backdrop-invert":[u]}],"backdrop-opacity":[{"backdrop-opacity":[h]}],"backdrop-saturate":[{"backdrop-saturate":[y]}],"backdrop-sepia":[{"backdrop-sepia":[w]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",G]}],duration:[{duration:Z()}],ease:[{ease:["linear","in","out","in-out",G]}],delay:[{delay:Z()}],animate:[{animate:["none","spin","ping","pulse","bounce",G]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[x]}],"scale-x":[{"scale-x":[x]}],"scale-y":[{"scale-y":[x]}],rotate:[{rotate:[A,G]}],"translate-x":[{"translate-x":[P]}],"translate-y":[{"translate-y":[P]}],"skew-x":[{"skew-x":[_]}],"skew-y":[{"skew-y":[_]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",G]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",G]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":z()}],"scroll-mx":[{"scroll-mx":z()}],"scroll-my":[{"scroll-my":z()}],"scroll-ms":[{"scroll-ms":z()}],"scroll-me":[{"scroll-me":z()}],"scroll-mt":[{"scroll-mt":z()}],"scroll-mr":[{"scroll-mr":z()}],"scroll-mb":[{"scroll-mb":z()}],"scroll-ml":[{"scroll-ml":z()}],"scroll-p":[{"scroll-p":z()}],"scroll-px":[{"scroll-px":z()}],"scroll-py":[{"scroll-py":z()}],"scroll-ps":[{"scroll-ps":z()}],"scroll-pe":[{"scroll-pe":z()}],"scroll-pt":[{"scroll-pt":z()}],"scroll-pr":[{"scroll-pr":z()}],"scroll-pb":[{"scroll-pb":z()}],"scroll-pl":[{"scroll-pl":z()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",G]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[C,M,T]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}});function J(...e){return Z(n(e))}function Y({children:e,className:r,size:t="lg",...n}){return(0,o.jsx)("div",{className:J("mx-auto px-4 sm:px-6 lg:px-8",{"max-w-screen-sm":"sm"===t,"max-w-screen-md":"md"===t,"max-w-screen-lg":"lg"===t,"w-full":"full"===t},r),...n,children:e})}var ee=t(8009);function er(e,r){if("function"==typeof e)return e(r);null!=e&&(e.current=r)}var et=ee.forwardRef((e,r)=>{let{children:t,...n}=e,l=ee.Children.toArray(t),s=l.find(el);if(s){let e=s.props.children,t=l.map(r=>r!==s?r:ee.Children.count(e)>1?ee.Children.only(null):ee.isValidElement(e)?e.props.children:null);return(0,o.jsx)(eo,{...n,ref:r,children:ee.isValidElement(e)?ee.cloneElement(e,void 0,t):null})}return(0,o.jsx)(eo,{...n,ref:r,children:t})});et.displayName="Slot";var eo=ee.forwardRef((e,r)=>{let{children:t,...o}=e;if(ee.isValidElement(t)){let e=function(e){let r=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?e.ref:(t=(r=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in r&&r.isReactWarning)?e.props.ref:e.props.ref||e.ref}(t);return ee.cloneElement(t,{...function(e,r){let t={...r};for(let o in r){let n=e[o],l=r[o];/^on[A-Z]/.test(o)?n&&l?t[o]=(...e)=>{l(...e),n(...e)}:n&&(t[o]=n):"style"===o?t[o]={...n,...l}:"className"===o&&(t[o]=[n,l].filter(Boolean).join(" "))}return{...e,...t}}(o,t.props),ref:r?function(...e){return r=>{let t=!1,o=e.map(e=>{let o=er(e,r);return t||"function"!=typeof o||(t=!0),o});if(t)return()=>{for(let r=0;r<o.length;r++){let t=o[r];"function"==typeof t?t():er(e[r],null)}}}}(r,e):e})}return ee.Children.count(t)>1?ee.Children.only(null):null});eo.displayName="SlotClone";var en=({children:e})=>(0,o.jsx)(o.Fragment,{children:e});function el(e){return ee.isValidElement(e)&&e.type===en}let es=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,ei=((e,r)=>t=>{var o;if((null==r?void 0:r.variants)==null)return n(e,null==t?void 0:t.class,null==t?void 0:t.className);let{variants:l,defaultVariants:s}=r,i=Object.keys(l).map(e=>{let r=null==t?void 0:t[e],o=null==s?void 0:s[e];if(null===r)return null;let n=es(r)||es(o);return l[e][n]}),a=t&&Object.entries(t).reduce((e,r)=>{let[t,o]=r;return void 0===o||(e[t]=o),e},{});return n(e,i,null==r?void 0:null===(o=r.compoundVariants)||void 0===o?void 0:o.reduce((e,r)=>{let{class:t,className:o,...n}=r;return Object.entries(n).every(e=>{let[r,t]=e;return Array.isArray(t)?t.includes({...s,...a}[r]):({...s,...a})[r]===t})?[...e,t,o]:e},[]),null==t?void 0:t.class,null==t?void 0:t.className)})("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"underline-offset-4 hover:underline text-primary"},size:{default:"h-10 py-2 px-4",sm:"h-9 px-3 rounded-md",lg:"h-11 px-8 rounded-md",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),ea=ee.forwardRef(({className:e,variant:r,size:t,asChild:n=!1,...l},s)=>{let i=n?et:"button";return(0,o.jsx)(i,{className:J(ei({variant:r,size:t,className:e})),ref:s,...l})});ea.displayName="Button";var ed=t(8686);function ec(){let e=(0,ed.useRouter)();return(0,o.jsx)(Y,{className:"py-12",children:(0,o.jsxs)("div",{className:"text-center",children:[(0,o.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"Something went wrong!"}),(0,o.jsx)("p",{className:"text-muted-foreground mb-8",children:"There was an error loading this post."}),(0,o.jsx)(ea,{onClick:()=>e.back(),children:"Go Back"})]})})}},4789:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});let o=(0,t(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/runner/workspace/app/posts/[slug]/error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/runner/workspace/app/posts/[slug]/error.tsx","default")},9696:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l});var o=t(2740),n=t(958);function l(){return(0,o.jsx)(n.m,{className:"py-12",children:(0,o.jsxs)("div",{className:"max-w-prose mx-auto",children:[(0,o.jsx)("div",{className:"h-8 w-3/4 bg-muted rounded animate-pulse mb-4"}),(0,o.jsx)("div",{className:"h-4 w-1/4 bg-muted rounded animate-pulse mb-8"}),(0,o.jsxs)("div",{className:"space-y-4",children:[(0,o.jsx)("div",{className:"h-4 w-full bg-muted rounded animate-pulse"}),(0,o.jsx)("div",{className:"h-4 w-full bg-muted rounded animate-pulse"}),(0,o.jsx)("div",{className:"h-4 w-3/4 bg-muted rounded animate-pulse"})]})]})})}},243:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>d,generateMetadata:()=>i,generateStaticParams:()=>a});var o=t(2740),n=t(958),l=t(7359);async function s(e){return({"getting-started":{slug:"getting-started",title:"Getting Started with Our Platform",description:"Learn how to use our modern documentation platform",date:"2025-02-02",content:"Welcome to our platform! This is the content of the post."}})[e]||null}async function i({params:e}){let r=await s(e.slug);return r?{title:r.title,description:r.description}:{title:"Post Not Found"}}async function a(){return[{slug:"getting-started"}]}async function d({params:e}){let r=await s(e.slug);return r||(0,l.notFound)(),(0,o.jsx)(n.m,{className:"py-12",children:(0,o.jsxs)("article",{className:"prose dark:prose-invert mx-auto",children:[(0,o.jsx)("h1",{className:"text-4xl font-bold mb-4",children:r.title}),r.description&&(0,o.jsx)("p",{className:"text-xl text-muted-foreground mb-8",children:r.description}),(0,o.jsx)("time",{className:"text-sm text-muted-foreground block mb-8",children:new Date(r.date).toLocaleDateString()}),(0,o.jsx)("div",{className:"mt-8",children:r.content})]})})}},9719:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var o=t(2740);function n({children:e}){return(0,o.jsx)("div",{className:"w-full min-h-screen",children:e})}},958:(e,r,t)=>{"use strict";t.d(r,{m:()=>s});var o=t(2740),n=t(3673),l=t(7317);function s({children:e,className:r,size:t="lg",...s}){return(0,o.jsx)("div",{className:function(...e){return(0,l.QP)((0,n.$)(e))}("mx-auto px-4 sm:px-6 lg:px-8",{"max-w-screen-sm":"sm"===t,"max-w-screen-md":"md"===t,"max-w-screen-lg":"lg"===t,"w-full":"full"===t},r),...s,children:e})}},6347:(e,r,t)=>{"use strict";function o(){throw Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.")}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"forbidden",{enumerable:!0,get:function(){return o}}),t(6003).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},1271:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isNextRouterError",{enumerable:!0,get:function(){return l}});let o=t(6003),n=t(3543);function l(e){return(0,n.isRedirectError)(e)||(0,o.isHTTPAccessFallbackError)(e)}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},7359:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{ReadonlyURLSearchParams:function(){return c},RedirectType:function(){return n.RedirectType},forbidden:function(){return s.forbidden},notFound:function(){return l.notFound},permanentRedirect:function(){return o.permanentRedirect},redirect:function(){return o.redirect},unauthorized:function(){return i.unauthorized},unstable_rethrow:function(){return a.unstable_rethrow}});let o=t(6552),n=t(3543),l=t(6893),s=t(6347),i=t(590),a=t(1370);class d extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class c extends URLSearchParams{append(){throw new d}delete(){throw new d}set(){throw new d}sort(){throw new d}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},6893:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"notFound",{enumerable:!0,get:function(){return n}});let o=""+t(6003).HTTP_ERROR_FALLBACK_ERROR_CODE+";404";function n(){let e=Error(o);throw e.digest=o,e}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},3543:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{REDIRECT_ERROR_CODE:function(){return n},RedirectType:function(){return l},isRedirectError:function(){return s}});let o=t(1541),n="NEXT_REDIRECT";var l=function(e){return e.push="push",e.replace="replace",e}({});function s(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let r=e.digest.split(";"),[t,l]=r,s=r.slice(2,-2).join(";"),i=Number(r.at(-2));return t===n&&("replace"===l||"push"===l)&&"string"==typeof s&&!isNaN(i)&&i in o.RedirectStatusCode}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},1541:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RedirectStatusCode",{enumerable:!0,get:function(){return t}});var t=function(e){return e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e}({});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},6552:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{getRedirectError:function(){return s},getRedirectStatusCodeFromError:function(){return u},getRedirectTypeFromError:function(){return c},getURLFromRedirectError:function(){return d},permanentRedirect:function(){return a},redirect:function(){return i}});let o=t(9121),n=t(1541),l=t(3543);function s(e,r,t){void 0===t&&(t=n.RedirectStatusCode.TemporaryRedirect);let o=Error(l.REDIRECT_ERROR_CODE);return o.digest=l.REDIRECT_ERROR_CODE+";"+r+";"+e+";"+t+";",o}function i(e,r){let t=o.actionAsyncStorage.getStore();throw s(e,r||((null==t?void 0:t.isAction)?l.RedirectType.push:l.RedirectType.replace),n.RedirectStatusCode.TemporaryRedirect)}function a(e,r){throw void 0===r&&(r=l.RedirectType.replace),s(e,r,n.RedirectStatusCode.PermanentRedirect)}function d(e){return(0,l.isRedirectError)(e)?e.digest.split(";").slice(2,-2).join(";"):null}function c(e){if(!(0,l.isRedirectError)(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function u(e){if(!(0,l.isRedirectError)(e))throw Error("Not a redirect error");return Number(e.digest.split(";").at(-2))}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},590:(e,r,t)=>{"use strict";function o(){throw Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.")}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"unauthorized",{enumerable:!0,get:function(){return o}}),t(6003).HTTP_ERROR_FALLBACK_ERROR_CODE,("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},1370:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"unstable_rethrow",{enumerable:!0,get:function(){return function e(r){if((0,s.isNextRouterError)(r)||(0,l.isBailoutToCSRError)(r)||(0,o.isDynamicUsageError)(r)||(0,n.isPostpone)(r))throw r;r instanceof Error&&"cause"in r&&e(r.cause)}}});let o=t(2349),n=t(7418),l=t(627),s=t(1271);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},2349:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isDynamicUsageError",{enumerable:!0,get:function(){return i}});let o=t(2490),n=t(627),l=t(1271),s=t(436),i=e=>(0,o.isDynamicServerError)(e)||(0,n.isBailoutToCSRError)(e)||(0,l.isNextRouterError)(e)||(0,s.isDynamicPostpone)(e)},7418:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isPostpone",{enumerable:!0,get:function(){return o}});let t=Symbol.for("react.postpone");function o(e){return"object"==typeof e&&null!==e&&e.$$typeof===t}},627:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{BailoutToCSRError:function(){return o},isBailoutToCSRError:function(){return n}});let t="BAILOUT_TO_CLIENT_SIDE_RENDERING";class o extends Error{constructor(e){super("Bail out to client-side rendering: "+e),this.reason=e,this.digest=t}}function n(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===t}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[403,85],()=>t(4123));module.exports=o})();