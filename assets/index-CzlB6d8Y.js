const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/browserAll-BncTpf2y.js","assets/webworkerAll-DFI107U9.js","assets/colorToUniform-DmtBy-2V.js","assets/WebGPURenderer-CtBztJZ0.js","assets/SharedSystems-DH2SNqYD.js","assets/WebGLRenderer-znjEA8Tc.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const zd="modulepreload",Gd=function(i){return"/garden-makeover/"+i},Rl={},Fr=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.allSettled(e.map(l=>{if(l=Gd(l),l in Rl)return;Rl[l]=!0;const c=l.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":zd,c||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),c)return new Promise((d,f)=>{u.addEventListener("load",d),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};var jt=(i=>(i.Application="application",i.WebGLPipes="webgl-pipes",i.WebGLPipesAdaptor="webgl-pipes-adaptor",i.WebGLSystem="webgl-system",i.WebGPUPipes="webgpu-pipes",i.WebGPUPipesAdaptor="webgpu-pipes-adaptor",i.WebGPUSystem="webgpu-system",i.CanvasSystem="canvas-system",i.CanvasPipesAdaptor="canvas-pipes-adaptor",i.CanvasPipes="canvas-pipes",i.Asset="asset",i.LoadParser="load-parser",i.ResolveParser="resolve-parser",i.CacheParser="cache-parser",i.DetectionParser="detection-parser",i.MaskEffect="mask-effect",i.BlendMode="blend-mode",i.TextureSource="texture-source",i.Environment="environment",i.ShapeBuilder="shape-builder",i.Batcher="batcher",i))(jt||{});const to=i=>{if(typeof i=="function"||typeof i=="object"&&i.extension){if(!i.extension)throw new Error("Extension class must have an extension object");i={...typeof i.extension!="object"?{type:i.extension}:i.extension,ref:i}}if(typeof i=="object")i={...i};else throw new Error("Invalid extension type");return typeof i.type=="string"&&(i.type=[i.type]),i},Xs=(i,t)=>{var e;return(e=to(i).priority)!=null?e:t},$e={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...i){return i.map(to).forEach(t=>{t.type.forEach(e=>{var n,s;return(s=(n=this._removeHandlers)[e])==null?void 0:s.call(n,t)})}),this},add(...i){return i.map(to).forEach(t=>{t.type.forEach(e=>{var r,a;const n=this._addHandlers,s=this._queue;n[e]?(a=n[e])==null||a.call(n,t):(s[e]=s[e]||[],(r=s[e])==null||r.push(t))})}),this},handle(i,t,e){var a;const n=this._addHandlers,s=this._removeHandlers;if(n[i]||s[i])throw new Error(`Extension type ${i} already has a handler`);n[i]=t,s[i]=e;const r=this._queue;return r[i]&&((a=r[i])==null||a.forEach(o=>t(o)),delete r[i]),this},handleByMap(i,t){return this.handle(i,e=>{e.name&&(t[e.name]=e.ref)},e=>{e.name&&delete t[e.name]})},handleByNamedList(i,t,e=-1){return this.handle(i,n=>{t.findIndex(r=>r.name===n.name)>=0||(t.push({name:n.name,value:n.ref}),t.sort((r,a)=>Xs(a.value,e)-Xs(r.value,e)))},n=>{const s=t.findIndex(r=>r.name===n.name);s!==-1&&t.splice(s,1)})},handleByList(i,t,e=-1){return this.handle(i,n=>{t.includes(n.ref)||(t.push(n.ref),t.sort((s,r)=>Xs(r,e)-Xs(s,e)))},n=>{const s=t.indexOf(n.ref);s!==-1&&t.splice(s,1)})},mixin(i,...t){for(const e of t)Object.defineProperties(i.prototype,Object.getOwnPropertyDescriptors(e))}},Hd={extension:{type:jt.Environment,name:"browser",priority:-1},test:()=>!0,load:async()=>{await Fr(()=>import("./browserAll-BncTpf2y.js"),__vite__mapDeps([0,1,2]))}},Vd={extension:{type:jt.Environment,name:"webworker",priority:0},test:()=>typeof self!="undefined"&&self.WorkerGlobalScope!==void 0,load:async()=>{await Fr(()=>import("./webworkerAll-DFI107U9.js"),__vite__mapDeps([1,2]))}};class Me{constructor(t,e,n){this._x=e||0,this._y=n||0,this._observer=t}clone(t){return new Me(t!=null?t:this._observer,this._x,this._y)}set(t=0,e=t){return(this._x!==t||this._y!==e)&&(this._x=t,this._y=e,this._observer._onUpdate(this)),this}copyFrom(t){return(this._x!==t.x||this._y!==t.y)&&(this._x=t.x,this._y=t.y,this._observer._onUpdate(this)),this}copyTo(t){return t.set(this._x,this._y),t}equals(t){return t.x===this._x&&t.y===this._y}toString(){return`[pixi.js/math:ObservablePoint x=${this._x} y=${this._y} scope=${this._observer}]`}get x(){return this._x}set x(t){this._x!==t&&(this._x=t,this._observer._onUpdate(this))}get y(){return this._y}set y(t){this._y!==t&&(this._y=t,this._observer._onUpdate(this))}}function Fh(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Oh={exports:{}};(function(i){var t=Object.prototype.hasOwnProperty,e="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(e=!1));function s(l,c,h){this.fn=l,this.context=c,this.once=h||!1}function r(l,c,h,u,d){if(typeof h!="function")throw new TypeError("The listener must be a function");var f=new s(h,u||l,d),g=e?e+c:c;return l._events[g]?l._events[g].fn?l._events[g]=[l._events[g],f]:l._events[g].push(f):(l._events[g]=f,l._eventsCount++),l}function a(l,c){--l._eventsCount===0?l._events=new n:delete l._events[c]}function o(){this._events=new n,this._eventsCount=0}o.prototype.eventNames=function(){var c=[],h,u;if(this._eventsCount===0)return c;for(u in h=this._events)t.call(h,u)&&c.push(e?u.slice(1):u);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(h)):c},o.prototype.listeners=function(c){var h=e?e+c:c,u=this._events[h];if(!u)return[];if(u.fn)return[u.fn];for(var d=0,f=u.length,g=new Array(f);d<f;d++)g[d]=u[d].fn;return g},o.prototype.listenerCount=function(c){var h=e?e+c:c,u=this._events[h];return u?u.fn?1:u.length:0},o.prototype.emit=function(c,h,u,d,f,g){var _=e?e+c:c;if(!this._events[_])return!1;var p=this._events[_],m=arguments.length,y,x;if(p.fn){switch(p.once&&this.removeListener(c,p.fn,void 0,!0),m){case 1:return p.fn.call(p.context),!0;case 2:return p.fn.call(p.context,h),!0;case 3:return p.fn.call(p.context,h,u),!0;case 4:return p.fn.call(p.context,h,u,d),!0;case 5:return p.fn.call(p.context,h,u,d,f),!0;case 6:return p.fn.call(p.context,h,u,d,f,g),!0}for(x=1,y=new Array(m-1);x<m;x++)y[x-1]=arguments[x];p.fn.apply(p.context,y)}else{var S=p.length,R;for(x=0;x<S;x++)switch(p[x].once&&this.removeListener(c,p[x].fn,void 0,!0),m){case 1:p[x].fn.call(p[x].context);break;case 2:p[x].fn.call(p[x].context,h);break;case 3:p[x].fn.call(p[x].context,h,u);break;case 4:p[x].fn.call(p[x].context,h,u,d);break;default:if(!y)for(R=1,y=new Array(m-1);R<m;R++)y[R-1]=arguments[R];p[x].fn.apply(p[x].context,y)}}return!0},o.prototype.on=function(c,h,u){return r(this,c,h,u,!1)},o.prototype.once=function(c,h,u){return r(this,c,h,u,!0)},o.prototype.removeListener=function(c,h,u,d){var f=e?e+c:c;if(!this._events[f])return this;if(!h)return a(this,f),this;var g=this._events[f];if(g.fn)g.fn===h&&(!d||g.once)&&(!u||g.context===u)&&a(this,f);else{for(var _=0,p=[],m=g.length;_<m;_++)(g[_].fn!==h||d&&!g[_].once||u&&g[_].context!==u)&&p.push(g[_]);p.length?this._events[f]=p.length===1?p[0]:p:a(this,f)}return this},o.prototype.removeAllListeners=function(c){var h;return c?(h=e?e+c:c,this._events[h]&&a(this,h)):(this._events=new n,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=e,o.EventEmitter=o,i.exports=o})(Oh);var Wd=Oh.exports;const gn=Fh(Wd),Xd=Math.PI*2,Yd=180/Math.PI,qd=Math.PI/180;class Te{constructor(t=0,e=0){this.x=0,this.y=0,this.x=t,this.y=e}clone(){return new Te(this.x,this.y)}copyFrom(t){return this.set(t.x,t.y),this}copyTo(t){return t.set(this.x,this.y),t}equals(t){return t.x===this.x&&t.y===this.y}set(t=0,e=t){return this.x=t,this.y=e,this}toString(){return`[pixi.js/math:Point x=${this.x} y=${this.y}]`}static get shared(){return ra.x=0,ra.y=0,ra}}const ra=new Te;class Bt{constructor(t=1,e=0,n=0,s=1,r=0,a=0){this.array=null,this.a=t,this.b=e,this.c=n,this.d=s,this.tx=r,this.ty=a}fromArray(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]}set(t,e,n,s,r,a){return this.a=t,this.b=e,this.c=n,this.d=s,this.tx=r,this.ty=a,this}toArray(t,e){this.array||(this.array=new Float32Array(9));const n=e||this.array;return t?(n[0]=this.a,n[1]=this.b,n[2]=0,n[3]=this.c,n[4]=this.d,n[5]=0,n[6]=this.tx,n[7]=this.ty,n[8]=1):(n[0]=this.a,n[1]=this.c,n[2]=this.tx,n[3]=this.b,n[4]=this.d,n[5]=this.ty,n[6]=0,n[7]=0,n[8]=1),n}apply(t,e){e=e||new Te;const n=t.x,s=t.y;return e.x=this.a*n+this.c*s+this.tx,e.y=this.b*n+this.d*s+this.ty,e}applyInverse(t,e){e=e||new Te;const n=this.a,s=this.b,r=this.c,a=this.d,o=this.tx,l=this.ty,c=1/(n*a+r*-s),h=t.x,u=t.y;return e.x=a*c*h+-r*c*u+(l*r-o*a)*c,e.y=n*c*u+-s*c*h+(-l*n+o*s)*c,e}translate(t,e){return this.tx+=t,this.ty+=e,this}scale(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this}rotate(t){const e=Math.cos(t),n=Math.sin(t),s=this.a,r=this.c,a=this.tx;return this.a=s*e-this.b*n,this.b=s*n+this.b*e,this.c=r*e-this.d*n,this.d=r*n+this.d*e,this.tx=a*e-this.ty*n,this.ty=a*n+this.ty*e,this}append(t){const e=this.a,n=this.b,s=this.c,r=this.d;return this.a=t.a*e+t.b*s,this.b=t.a*n+t.b*r,this.c=t.c*e+t.d*s,this.d=t.c*n+t.d*r,this.tx=t.tx*e+t.ty*s+this.tx,this.ty=t.tx*n+t.ty*r+this.ty,this}appendFrom(t,e){const n=t.a,s=t.b,r=t.c,a=t.d,o=t.tx,l=t.ty,c=e.a,h=e.b,u=e.c,d=e.d;return this.a=n*c+s*u,this.b=n*h+s*d,this.c=r*c+a*u,this.d=r*h+a*d,this.tx=o*c+l*u+e.tx,this.ty=o*h+l*d+e.ty,this}setTransform(t,e,n,s,r,a,o,l,c){return this.a=Math.cos(o+c)*r,this.b=Math.sin(o+c)*r,this.c=-Math.sin(o-l)*a,this.d=Math.cos(o-l)*a,this.tx=t-(n*this.a+s*this.c),this.ty=e-(n*this.b+s*this.d),this}prepend(t){const e=this.tx;if(t.a!==1||t.b!==0||t.c!==0||t.d!==1){const n=this.a,s=this.c;this.a=n*t.a+this.b*t.c,this.b=n*t.b+this.b*t.d,this.c=s*t.a+this.d*t.c,this.d=s*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this}decompose(t){const e=this.a,n=this.b,s=this.c,r=this.d,a=t.pivot,o=-Math.atan2(-s,r),l=Math.atan2(n,e),c=Math.abs(o+l);return c<1e-5||Math.abs(Xd-c)<1e-5?(t.rotation=l,t.skew.x=t.skew.y=0):(t.rotation=0,t.skew.x=o,t.skew.y=l),t.scale.x=Math.sqrt(e*e+n*n),t.scale.y=Math.sqrt(s*s+r*r),t.position.x=this.tx+(a.x*e+a.y*s),t.position.y=this.ty+(a.x*n+a.y*r),t}invert(){const t=this.a,e=this.b,n=this.c,s=this.d,r=this.tx,a=t*s-e*n;return this.a=s/a,this.b=-e/a,this.c=-n/a,this.d=t/a,this.tx=(n*this.ty-s*r)/a,this.ty=-(t*this.ty-e*r)/a,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const t=new Bt;return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}copyTo(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}copyFrom(t){return this.a=t.a,this.b=t.b,this.c=t.c,this.d=t.d,this.tx=t.tx,this.ty=t.ty,this}equals(t){return t.a===this.a&&t.b===this.b&&t.c===this.c&&t.d===this.d&&t.tx===this.tx&&t.ty===this.ty}toString(){return`[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`}static get IDENTITY(){return jd.identity()}static get shared(){return $d.identity()}}const $d=new Bt,jd=new Bt,si=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],ri=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],ai=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],oi=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],eo=[],Bh=[],Ys=Math.sign;function Kd(){for(let i=0;i<16;i++){const t=[];eo.push(t);for(let e=0;e<16;e++){const n=Ys(si[i]*si[e]+ai[i]*ri[e]),s=Ys(ri[i]*si[e]+oi[i]*ri[e]),r=Ys(si[i]*ai[e]+ai[i]*oi[e]),a=Ys(ri[i]*ai[e]+oi[i]*oi[e]);for(let o=0;o<16;o++)if(si[o]===n&&ri[o]===s&&ai[o]===r&&oi[o]===a){t.push(o);break}}}for(let i=0;i<16;i++){const t=new Bt;t.set(si[i],ri[i],ai[i],oi[i],0,0),Bh.push(t)}}Kd();const Jt={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:i=>si[i],uY:i=>ri[i],vX:i=>ai[i],vY:i=>oi[i],inv:i=>i&8?i&15:-i&7,add:(i,t)=>eo[i][t],sub:(i,t)=>eo[i][Jt.inv(t)],rotate180:i=>i^4,isVertical:i=>(i&3)===2,byDirection:(i,t)=>Math.abs(i)*2<=Math.abs(t)?t>=0?Jt.S:Jt.N:Math.abs(t)*2<=Math.abs(i)?i>0?Jt.E:Jt.W:t>0?i>0?Jt.SE:Jt.SW:i>0?Jt.NE:Jt.NW,matrixAppendRotationInv:(i,t,e=0,n=0)=>{const s=Bh[Jt.inv(t)];s.tx=e,s.ty=n,i.append(s)},transformRectCoords:(i,t,e,n)=>{const{x:s,y:r,width:a,height:o}=i,{x:l,y:c,width:h,height:u}=t;return e===Jt.E?(n.set(s+l,r+c,a,o),n):e===Jt.S?n.set(h-r-o+l,s+c,o,a):e===Jt.W?n.set(h-s-a+l,u-r-o+c,a,o):e===Jt.N?n.set(r+l,u-s-a+c,o,a):n.set(s+l,r+c,a,o)}},qs=[new Te,new Te,new Te,new Te];class ce{constructor(t=0,e=0,n=0,s=0){this.type="rectangle",this.x=Number(t),this.y=Number(e),this.width=Number(n),this.height=Number(s)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}isEmpty(){return this.left===this.right||this.top===this.bottom}static get EMPTY(){return new ce(0,0,0,0)}clone(){return new ce(this.x,this.y,this.width,this.height)}copyFromBounds(t){return this.x=t.minX,this.y=t.minY,this.width=t.maxX-t.minX,this.height=t.maxY-t.minY,this}copyFrom(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this}copyTo(t){return t.copyFrom(this),t}contains(t,e){return this.width<=0||this.height<=0?!1:t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height}strokeContains(t,e,n,s=.5){const{width:r,height:a}=this;if(r<=0||a<=0)return!1;const o=this.x,l=this.y,c=n*(1-s),h=n-c,u=o-c,d=o+r+c,f=l-c,g=l+a+c,_=o+h,p=o+r-h,m=l+h,y=l+a-h;return t>=u&&t<=d&&e>=f&&e<=g&&!(t>_&&t<p&&e>m&&e<y)}intersects(t,e){if(!e){const I=this.x<t.x?t.x:this.x;if((this.right>t.right?t.right:this.right)<=I)return!1;const v=this.y<t.y?t.y:this.y;return(this.bottom>t.bottom?t.bottom:this.bottom)>v}const n=this.left,s=this.right,r=this.top,a=this.bottom;if(s<=n||a<=r)return!1;const o=qs[0].set(t.left,t.top),l=qs[1].set(t.left,t.bottom),c=qs[2].set(t.right,t.top),h=qs[3].set(t.right,t.bottom);if(c.x<=o.x||l.y<=o.y)return!1;const u=Math.sign(e.a*e.d-e.b*e.c);if(u===0||(e.apply(o,o),e.apply(l,l),e.apply(c,c),e.apply(h,h),Math.max(o.x,l.x,c.x,h.x)<=n||Math.min(o.x,l.x,c.x,h.x)>=s||Math.max(o.y,l.y,c.y,h.y)<=r||Math.min(o.y,l.y,c.y,h.y)>=a))return!1;const d=u*(l.y-o.y),f=u*(o.x-l.x),g=d*n+f*r,_=d*s+f*r,p=d*n+f*a,m=d*s+f*a;if(Math.max(g,_,p,m)<=d*o.x+f*o.y||Math.min(g,_,p,m)>=d*h.x+f*h.y)return!1;const y=u*(o.y-c.y),x=u*(c.x-o.x),S=y*n+x*r,R=y*s+x*r,T=y*n+x*a,A=y*s+x*a;return!(Math.max(S,R,T,A)<=y*o.x+x*o.y||Math.min(S,R,T,A)>=y*h.x+x*h.y)}pad(t=0,e=t){return this.x-=t,this.y-=e,this.width+=t*2,this.height+=e*2,this}fit(t){const e=Math.max(this.x,t.x),n=Math.min(this.x+this.width,t.x+t.width),s=Math.max(this.y,t.y),r=Math.min(this.y+this.height,t.y+t.height);return this.x=e,this.width=Math.max(n-e,0),this.y=s,this.height=Math.max(r-s,0),this}ceil(t=1,e=.001){const n=Math.ceil((this.x+this.width-e)*t)/t,s=Math.ceil((this.y+this.height-e)*t)/t;return this.x=Math.floor((this.x+e)*t)/t,this.y=Math.floor((this.y+e)*t)/t,this.width=n-this.x,this.height=s-this.y,this}scale(t,e=t){return this.x*=t,this.y*=e,this.width*=t,this.height*=e,this}enlarge(t){const e=Math.min(this.x,t.x),n=Math.max(this.x+this.width,t.x+t.width),s=Math.min(this.y,t.y),r=Math.max(this.y+this.height,t.y+t.height);return this.x=e,this.width=n-e,this.y=s,this.height=r-s,this}getBounds(t){return t||(t=new ce),t.copyFrom(this),t}containsRect(t){if(this.width<=0||this.height<=0)return!1;const e=t.x,n=t.y,s=t.x+t.width,r=t.y+t.height;return e>=this.x&&e<this.x+this.width&&n>=this.y&&n<this.y+this.height&&s>=this.x&&s<this.x+this.width&&r>=this.y&&r<this.y+this.height}set(t,e,n,s){return this.x=t,this.y=e,this.width=n,this.height=s,this}toString(){return`[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`}}const aa={default:-1};function oe(i="default"){return aa[i]===void 0&&(aa[i]=-1),++aa[i]}const Pl=new Set,Ge="8.0.0",Zd="8.3.4",Vi={quiet:!1,noColor:!1},le=(i,t,e=3)=>{if(Vi.quiet||Pl.has(t))return;let n=new Error().stack;const s=`${t}
Deprecated since v${i}`,r=typeof console.groupCollapsed=="function"&&!Vi.noColor;typeof n=="undefined"?console.warn("PixiJS Deprecation Warning: ",s):(n=n.split(`
`).splice(e).join(`
`),r?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",s),console.warn(n),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",s),console.warn(n))),Pl.add(t)};Object.defineProperties(le,{quiet:{get:()=>Vi.quiet,set:i=>{Vi.quiet=i},enumerable:!0,configurable:!1},noColor:{get:()=>Vi.noColor,set:i=>{Vi.noColor=i},enumerable:!0,configurable:!1}});const kh=()=>{};function $i(i){return i+=i===0?1:0,--i,i|=i>>>1,i|=i>>>2,i|=i>>>4,i|=i>>>8,i|=i>>>16,i+1}function Il(i){return!(i&i-1)&&!!i}function zh(i){const t={};for(const e in i)i[e]!==void 0&&(t[e]=i[e]);return t}const Ll=Object.create(null);function Jd(i){const t=Ll[i];return t===void 0&&(Ll[i]=oe("resource")),t}const Gh=class Hh extends gn{constructor(t={}){var e,n,s,r,a,o,l;super(),this._resourceType="textureSampler",this._touched=0,this._maxAnisotropy=1,this.destroyed=!1,t={...Hh.defaultOptions,...t},this.addressMode=t.addressMode,this.addressModeU=(e=t.addressModeU)!=null?e:this.addressModeU,this.addressModeV=(n=t.addressModeV)!=null?n:this.addressModeV,this.addressModeW=(s=t.addressModeW)!=null?s:this.addressModeW,this.scaleMode=t.scaleMode,this.magFilter=(r=t.magFilter)!=null?r:this.magFilter,this.minFilter=(a=t.minFilter)!=null?a:this.minFilter,this.mipmapFilter=(o=t.mipmapFilter)!=null?o:this.mipmapFilter,this.lodMinClamp=t.lodMinClamp,this.lodMaxClamp=t.lodMaxClamp,this.compare=t.compare,this.maxAnisotropy=(l=t.maxAnisotropy)!=null?l:1}set addressMode(t){this.addressModeU=t,this.addressModeV=t,this.addressModeW=t}get addressMode(){return this.addressModeU}set wrapMode(t){le(Ge,"TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=t}get wrapMode(){return this.addressMode}set scaleMode(t){this.magFilter=t,this.minFilter=t,this.mipmapFilter=t}get scaleMode(){return this.magFilter}set maxAnisotropy(t){this._maxAnisotropy=Math.min(t,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get _resourceId(){return this._sharedResourceId||this._generateResourceId()}update(){this.emit("change",this),this._sharedResourceId=null}_generateResourceId(){const t=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._sharedResourceId=Jd(t),this._resourceId}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this.removeAllListeners()}};Gh.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};let Or=Gh;const Vh=class Wh extends gn{constructor(t={}){var e,n,s;super(),this.options=t,this.uid=oe("textureSource"),this._resourceType="textureSource",this._resourceId=oe("resource"),this.uploadMethodId="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm",this.dimension="2d",this.antialias=!1,this._touched=0,this._batchTick=-1,this._textureBindLocation=-1,t={...Wh.defaultOptions,...t},this.label=(e=t.label)!=null?e:"",this.resource=t.resource,this.autoGarbageCollect=t.autoGarbageCollect,this._resolution=t.resolution,t.width?this.pixelWidth=t.width*this._resolution:this.pixelWidth=this.resource&&(n=this.resourceWidth)!=null?n:1,t.height?this.pixelHeight=t.height*this._resolution:this.pixelHeight=this.resource&&(s=this.resourceHeight)!=null?s:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=t.format,this.dimension=t.dimensions,this.mipLevelCount=t.mipLevelCount,this.autoGenerateMipmaps=t.autoGenerateMipmaps,this.sampleCount=t.sampleCount,this.antialias=t.antialias,this.alphaMode=t.alphaMode,this.style=new Or(zh(t)),this.destroyed=!1,this._refreshPOT()}get source(){return this}get style(){return this._style}set style(t){var e,n;this.style!==t&&((e=this._style)==null||e.off("change",this._onStyleChange,this),this._style=t,(n=this._style)==null||n.on("change",this._onStyleChange,this),this._onStyleChange())}set maxAnisotropy(t){this._style.maxAnisotropy=t}get maxAnisotropy(){return this._style.maxAnisotropy}get addressMode(){return this._style.addressMode}set addressMode(t){this._style.addressMode=t}get repeatMode(){return this._style.addressMode}set repeatMode(t){this._style.addressMode=t}get magFilter(){return this._style.magFilter}set magFilter(t){this._style.magFilter=t}get minFilter(){return this._style.minFilter}set minFilter(t){this._style.minFilter=t}get mipmapFilter(){return this._style.mipmapFilter}set mipmapFilter(t){this._style.mipmapFilter=t}get lodMinClamp(){return this._style.lodMinClamp}set lodMinClamp(t){this._style.lodMinClamp=t}get lodMaxClamp(){return this._style.lodMaxClamp}set lodMaxClamp(t){this._style.lodMaxClamp=t}_onStyleChange(){this.emit("styleChange",this)}update(){if(this.resource){const t=this._resolution;if(this.resize(this.resourceWidth/t,this.resourceHeight/t))return}this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this._style&&(this._style.destroy(),this._style=null),this.uploadMethodId=null,this.resource=null,this.removeAllListeners()}unload(){this._resourceId=oe("resource"),this.emit("change",this),this.emit("unload",this)}get resourceWidth(){const{resource:t}=this;return t.naturalWidth||t.videoWidth||t.displayWidth||t.width}get resourceHeight(){const{resource:t}=this;return t.naturalHeight||t.videoHeight||t.displayHeight||t.height}get resolution(){return this._resolution}set resolution(t){this._resolution!==t&&(this._resolution=t,this.width=this.pixelWidth/t,this.height=this.pixelHeight/t)}resize(t,e,n){n||(n=this._resolution),t||(t=this.width),e||(e=this.height);const s=Math.round(t*n),r=Math.round(e*n);return this.width=s/n,this.height=r/n,this._resolution=n,this.pixelWidth===s&&this.pixelHeight===r?!1:(this._refreshPOT(),this.pixelWidth=s,this.pixelHeight=r,this.emit("resize",this),this._resourceId=oe("resource"),this.emit("change",this),!0)}updateMipmaps(){this.autoGenerateMipmaps&&this.mipLevelCount>1&&this.emit("updateMipmaps",this)}set wrapMode(t){this._style.wrapMode=t}get wrapMode(){return this._style.wrapMode}set scaleMode(t){this._style.scaleMode=t}get scaleMode(){return this._style.scaleMode}_refreshPOT(){this.isPowerOfTwo=Il(this.pixelWidth)&&Il(this.pixelHeight)}static test(t){throw new Error("Unimplemented")}};Vh.defaultOptions={resolution:1,format:"bgra8unorm",alphaMode:"premultiply-alpha-on-upload",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,autoGarbageCollect:!1};let rn=Vh;class Qo extends rn{constructor(t){const e=t.resource||new Float32Array(t.width*t.height*4);let n=t.format;n||(e instanceof Float32Array?n="rgba32float":e instanceof Int32Array||e instanceof Uint32Array?n="rgba32uint":e instanceof Int16Array||e instanceof Uint16Array?n="rgba16uint":(e instanceof Int8Array,n="bgra8unorm")),super({...t,resource:e,format:n}),this.uploadMethodId="buffer"}static test(t){return t instanceof Int8Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array}}Qo.extension=jt.TextureSource;const Dl=new Bt;class Qd{constructor(t,e){this.mapCoord=new Bt,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,typeof e=="undefined"?this.clampMargin=t.width<10?0:.5:this.clampMargin=e,this.isSimple=!1,this.texture=t}get texture(){return this._texture}set texture(t){var e;this.texture!==t&&((e=this._texture)==null||e.removeListener("update",this.update,this),this._texture=t,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(t,e){e===void 0&&(e=t);const n=this.mapCoord;for(let s=0;s<t.length;s+=2){const r=t[s],a=t[s+1];e[s]=r*n.a+a*n.c+n.tx,e[s+1]=r*n.b+a*n.d+n.ty}return e}update(){const t=this._texture;this._updateID++;const e=t.uvs;this.mapCoord.set(e.x1-e.x0,e.y1-e.y0,e.x3-e.x0,e.y3-e.y0,e.x0,e.y0);const n=t.orig,s=t.trim;s&&(Dl.set(n.width/s.width,0,0,n.height/s.height,-s.x/s.width,-s.y/s.height),this.mapCoord.append(Dl));const r=t.source,a=this.uClampFrame,o=this.clampMargin/r._resolution,l=this.clampOffset/r._resolution;return a[0]=(t.frame.x+o+l)/r.width,a[1]=(t.frame.y+o+l)/r.height,a[2]=(t.frame.x+t.frame.width-o+l)/r.width,a[3]=(t.frame.y+t.frame.height-o+l)/r.height,this.uClampOffset[0]=this.clampOffset/r.pixelWidth,this.uClampOffset[1]=this.clampOffset/r.pixelHeight,this.isSimple=t.frame.width===r.width&&t.frame.height===r.height&&t.rotate===0,!0}}let Zt=class extends gn{constructor({source:t,label:e,frame:n,orig:s,trim:r,defaultAnchor:a,defaultBorders:o,rotate:l,dynamic:c}={}){var h;if(super(),this.uid=oe("texture"),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=new ce,this.noFrame=!1,this.dynamic=!1,this.isTexture=!0,this.label=e,this.source=(h=t==null?void 0:t.source)!=null?h:new rn,this.noFrame=!n,n)this.frame.copyFrom(n);else{const{width:u,height:d}=this._source;this.frame.width=u,this.frame.height=d}this.orig=s||this.frame,this.trim=r,this.rotate=l!=null?l:0,this.defaultAnchor=a,this.defaultBorders=o,this.destroyed=!1,this.dynamic=c||!1,this.updateUvs()}set source(t){this._source&&this._source.off("resize",this.update,this),this._source=t,t.on("resize",this.update,this),this.emit("update",this)}get source(){return this._source}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new Qd(this)),this._textureMatrix}get width(){return this.orig.width}get height(){return this.orig.height}updateUvs(){const{uvs:t,frame:e}=this,{width:n,height:s}=this._source,r=e.x/n,a=e.y/s,o=e.width/n,l=e.height/s;let c=this.rotate;if(c){const h=o/2,u=l/2,d=r+h,f=a+u;c=Jt.add(c,Jt.NW),t.x0=d+h*Jt.uX(c),t.y0=f+u*Jt.uY(c),c=Jt.add(c,2),t.x1=d+h*Jt.uX(c),t.y1=f+u*Jt.uY(c),c=Jt.add(c,2),t.x2=d+h*Jt.uX(c),t.y2=f+u*Jt.uY(c),c=Jt.add(c,2),t.x3=d+h*Jt.uX(c),t.y3=f+u*Jt.uY(c)}else t.x0=r,t.y0=a,t.x1=r+o,t.y1=a,t.x2=r+o,t.y2=a+l,t.x3=r,t.y3=a+l}destroy(t=!1){this._source&&t&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}update(){this.noFrame&&(this.frame.width=this._source.width,this.frame.height=this._source.height),this.updateUvs(),this.emit("update",this)}get baseTexture(){return le(Ge,"Texture.baseTexture is now Texture.source"),this._source}};Zt.EMPTY=new Zt({label:"EMPTY",source:new rn({label:"EMPTY"})});Zt.EMPTY.destroy=kh;Zt.WHITE=new Zt({source:new Qo({resource:new Uint8Array([255,255,255,255]),width:1,height:1,alphaMode:"premultiply-alpha-on-upload",label:"WHITE"}),label:"WHITE"});Zt.WHITE.destroy=kh;function tf(i,t,e){const{width:n,height:s}=e.orig,r=e.trim;if(r){const a=r.width,o=r.height;i.minX=r.x-t._x*n,i.maxX=i.minX+a,i.minY=r.y-t._y*s,i.maxY=i.minY+o}else i.minX=-t._x*n,i.maxX=i.minX+n,i.minY=-t._y*s,i.maxY=i.minY+s}const Ul=new Bt;class sn{constructor(t=1/0,e=1/0,n=-1/0,s=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=Ul,this.minX=t,this.minY=e,this.maxX=n,this.maxY=s}isEmpty(){return this.minX>this.maxX||this.minY>this.maxY}get rectangle(){this._rectangle||(this._rectangle=new ce);const t=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(t.x=0,t.y=0,t.width=0,t.height=0):t.copyFromBounds(this),t}clear(){return this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrix=Ul,this}set(t,e,n,s){this.minX=t,this.minY=e,this.maxX=n,this.maxY=s}addFrame(t,e,n,s,r){r||(r=this.matrix);const a=r.a,o=r.b,l=r.c,c=r.d,h=r.tx,u=r.ty;let d=this.minX,f=this.minY,g=this.maxX,_=this.maxY,p=a*t+l*e+h,m=o*t+c*e+u;p<d&&(d=p),m<f&&(f=m),p>g&&(g=p),m>_&&(_=m),p=a*n+l*e+h,m=o*n+c*e+u,p<d&&(d=p),m<f&&(f=m),p>g&&(g=p),m>_&&(_=m),p=a*t+l*s+h,m=o*t+c*s+u,p<d&&(d=p),m<f&&(f=m),p>g&&(g=p),m>_&&(_=m),p=a*n+l*s+h,m=o*n+c*s+u,p<d&&(d=p),m<f&&(f=m),p>g&&(g=p),m>_&&(_=m),this.minX=d,this.minY=f,this.maxX=g,this.maxY=_}addRect(t,e){this.addFrame(t.x,t.y,t.x+t.width,t.y+t.height,e)}addBounds(t,e){this.addFrame(t.minX,t.minY,t.maxX,t.maxY,e)}addBoundsMask(t){this.minX=this.minX>t.minX?this.minX:t.minX,this.minY=this.minY>t.minY?this.minY:t.minY,this.maxX=this.maxX<t.maxX?this.maxX:t.maxX,this.maxY=this.maxY<t.maxY?this.maxY:t.maxY}applyMatrix(t){const e=this.minX,n=this.minY,s=this.maxX,r=this.maxY,{a,b:o,c:l,d:c,tx:h,ty:u}=t;let d=a*e+l*n+h,f=o*e+c*n+u;this.minX=d,this.minY=f,this.maxX=d,this.maxY=f,d=a*s+l*n+h,f=o*s+c*n+u,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=a*e+l*r+h,f=o*e+c*r+u,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=a*s+l*r+h,f=o*s+c*r+u,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY}fit(t){return this.minX<t.left&&(this.minX=t.left),this.maxX>t.right&&(this.maxX=t.right),this.minY<t.top&&(this.minY=t.top),this.maxY>t.bottom&&(this.maxY=t.bottom),this}fitBounds(t,e,n,s){return this.minX<t&&(this.minX=t),this.maxX>e&&(this.maxX=e),this.minY<n&&(this.minY=n),this.maxY>s&&(this.maxY=s),this}pad(t,e=t){return this.minX-=t,this.maxX+=t,this.minY-=e,this.maxY+=e,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new sn(this.minX,this.minY,this.maxX,this.maxY)}scale(t,e=t){return this.minX*=t,this.minY*=e,this.maxX*=t,this.maxY*=e,this}get x(){return this.minX}set x(t){const e=this.maxX-this.minX;this.minX=t,this.maxX=t+e}get y(){return this.minY}set y(t){const e=this.maxY-this.minY;this.minY=t,this.maxY=t+e}get width(){return this.maxX-this.minX}set width(t){this.maxX=this.minX+t}get height(){return this.maxY-this.minY}set height(t){this.maxY=this.minY+t}get left(){return this.minX}get right(){return this.maxX}get top(){return this.minY}get bottom(){return this.maxY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(t,e,n,s){let r=this.minX,a=this.minY,o=this.maxX,l=this.maxY;s||(s=this.matrix);const c=s.a,h=s.b,u=s.c,d=s.d,f=s.tx,g=s.ty;for(let _=e;_<n;_+=2){const p=t[_],m=t[_+1],y=c*p+u*m+f,x=h*p+d*m+g;r=y<r?y:r,a=x<a?x:a,o=y>o?y:o,l=x>l?x:l}this.minX=r,this.minY=a,this.maxX=o,this.maxY=l}containsPoint(t,e){return this.minX<=t&&this.minY<=e&&this.maxX>=t&&this.maxY>=e}toString(){return`[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}copyFrom(t){return this.minX=t.minX,this.minY=t.minY,this.maxX=t.maxX,this.maxY=t.maxY,this}}var ef={grad:.9,turn:360,rad:360/(2*Math.PI)},xn=function(i){return typeof i=="string"?i.length>0:typeof i=="number"},ve=function(i,t,e){return t===void 0&&(t=0),e===void 0&&(e=Math.pow(10,t)),Math.round(e*i)/e+0},Xe=function(i,t,e){return t===void 0&&(t=0),e===void 0&&(e=1),i>e?e:i>t?i:t},Xh=function(i){return(i=isFinite(i)?i%360:0)>0?i:i+360},Nl=function(i){return{r:Xe(i.r,0,255),g:Xe(i.g,0,255),b:Xe(i.b,0,255),a:Xe(i.a)}},oa=function(i){return{r:ve(i.r),g:ve(i.g),b:ve(i.b),a:ve(i.a,3)}},nf=/^#([0-9a-f]{3,8})$/i,$s=function(i){var t=i.toString(16);return t.length<2?"0"+t:t},Yh=function(i){var t=i.r,e=i.g,n=i.b,s=i.a,r=Math.max(t,e,n),a=r-Math.min(t,e,n),o=a?r===t?(e-n)/a:r===e?2+(n-t)/a:4+(t-e)/a:0;return{h:60*(o<0?o+6:o),s:r?a/r*100:0,v:r/255*100,a:s}},qh=function(i){var t=i.h,e=i.s,n=i.v,s=i.a;t=t/360*6,e/=100,n/=100;var r=Math.floor(t),a=n*(1-e),o=n*(1-(t-r)*e),l=n*(1-(1-t+r)*e),c=r%6;return{r:255*[n,o,a,a,l,n][c],g:255*[l,n,n,o,a,a][c],b:255*[a,a,l,n,n,o][c],a:s}},Fl=function(i){return{h:Xh(i.h),s:Xe(i.s,0,100),l:Xe(i.l,0,100),a:Xe(i.a)}},Ol=function(i){return{h:ve(i.h),s:ve(i.s),l:ve(i.l),a:ve(i.a,3)}},Bl=function(i){return qh((e=(t=i).s,{h:t.h,s:(e*=((n=t.l)<50?n:100-n)/100)>0?2*e/(n+e)*100:0,v:n+e,a:t.a}));var t,e,n},Es=function(i){return{h:(t=Yh(i)).h,s:(s=(200-(e=t.s))*(n=t.v)/100)>0&&s<200?e*n/100/(s<=100?s:200-s)*100:0,l:s/2,a:t.a};var t,e,n,s},sf=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,rf=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,af=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,of=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,no={string:[[function(i){var t=nf.exec(i);return t?(i=t[1]).length<=4?{r:parseInt(i[0]+i[0],16),g:parseInt(i[1]+i[1],16),b:parseInt(i[2]+i[2],16),a:i.length===4?ve(parseInt(i[3]+i[3],16)/255,2):1}:i.length===6||i.length===8?{r:parseInt(i.substr(0,2),16),g:parseInt(i.substr(2,2),16),b:parseInt(i.substr(4,2),16),a:i.length===8?ve(parseInt(i.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(i){var t=af.exec(i)||of.exec(i);return t?t[2]!==t[4]||t[4]!==t[6]?null:Nl({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(i){var t=sf.exec(i)||rf.exec(i);if(!t)return null;var e,n,s=Fl({h:(e=t[1],n=t[2],n===void 0&&(n="deg"),Number(e)*(ef[n]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return Bl(s)},"hsl"]],object:[[function(i){var t=i.r,e=i.g,n=i.b,s=i.a,r=s===void 0?1:s;return xn(t)&&xn(e)&&xn(n)?Nl({r:Number(t),g:Number(e),b:Number(n),a:Number(r)}):null},"rgb"],[function(i){var t=i.h,e=i.s,n=i.l,s=i.a,r=s===void 0?1:s;if(!xn(t)||!xn(e)||!xn(n))return null;var a=Fl({h:Number(t),s:Number(e),l:Number(n),a:Number(r)});return Bl(a)},"hsl"],[function(i){var t=i.h,e=i.s,n=i.v,s=i.a,r=s===void 0?1:s;if(!xn(t)||!xn(e)||!xn(n))return null;var a=function(o){return{h:Xh(o.h),s:Xe(o.s,0,100),v:Xe(o.v,0,100),a:Xe(o.a)}}({h:Number(t),s:Number(e),v:Number(n),a:Number(r)});return qh(a)},"hsv"]]},kl=function(i,t){for(var e=0;e<t.length;e++){var n=t[e][0](i);if(n)return[n,t[e][1]]}return[null,void 0]},lf=function(i){return typeof i=="string"?kl(i.trim(),no.string):typeof i=="object"&&i!==null?kl(i,no.object):[null,void 0]},la=function(i,t){var e=Es(i);return{h:e.h,s:Xe(e.s+100*t,0,100),l:e.l,a:e.a}},ca=function(i){return(299*i.r+587*i.g+114*i.b)/1e3/255},zl=function(i,t){var e=Es(i);return{h:e.h,s:e.s,l:Xe(e.l+100*t,0,100),a:e.a}},io=function(){function i(t){this.parsed=lf(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return i.prototype.isValid=function(){return this.parsed!==null},i.prototype.brightness=function(){return ve(ca(this.rgba),2)},i.prototype.isDark=function(){return ca(this.rgba)<.5},i.prototype.isLight=function(){return ca(this.rgba)>=.5},i.prototype.toHex=function(){return t=oa(this.rgba),e=t.r,n=t.g,s=t.b,a=(r=t.a)<1?$s(ve(255*r)):"","#"+$s(e)+$s(n)+$s(s)+a;var t,e,n,s,r,a},i.prototype.toRgb=function(){return oa(this.rgba)},i.prototype.toRgbString=function(){return t=oa(this.rgba),e=t.r,n=t.g,s=t.b,(r=t.a)<1?"rgba("+e+", "+n+", "+s+", "+r+")":"rgb("+e+", "+n+", "+s+")";var t,e,n,s,r},i.prototype.toHsl=function(){return Ol(Es(this.rgba))},i.prototype.toHslString=function(){return t=Ol(Es(this.rgba)),e=t.h,n=t.s,s=t.l,(r=t.a)<1?"hsla("+e+", "+n+"%, "+s+"%, "+r+")":"hsl("+e+", "+n+"%, "+s+"%)";var t,e,n,s,r},i.prototype.toHsv=function(){return t=Yh(this.rgba),{h:ve(t.h),s:ve(t.s),v:ve(t.v),a:ve(t.a,3)};var t},i.prototype.invert=function(){return ln({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},i.prototype.saturate=function(t){return t===void 0&&(t=.1),ln(la(this.rgba,t))},i.prototype.desaturate=function(t){return t===void 0&&(t=.1),ln(la(this.rgba,-t))},i.prototype.grayscale=function(){return ln(la(this.rgba,-1))},i.prototype.lighten=function(t){return t===void 0&&(t=.1),ln(zl(this.rgba,t))},i.prototype.darken=function(t){return t===void 0&&(t=.1),ln(zl(this.rgba,-t))},i.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},i.prototype.alpha=function(t){return typeof t=="number"?ln({r:(e=this.rgba).r,g:e.g,b:e.b,a:t}):ve(this.rgba.a,3);var e},i.prototype.hue=function(t){var e=Es(this.rgba);return typeof t=="number"?ln({h:t,s:e.s,l:e.l,a:e.a}):ve(e.h)},i.prototype.isEqual=function(t){return this.toHex()===ln(t).toHex()},i}(),ln=function(i){return i instanceof io?i:new io(i)},Gl=[],cf=function(i){i.forEach(function(t){Gl.indexOf(t)<0&&(t(io,no),Gl.push(t))})};function hf(i,t){var e={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},n={};for(var s in e)n[e[s]]=s;var r={};i.prototype.toName=function(a){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var o,l,c=n[this.toHex()];if(c)return c;if(a!=null&&a.closest){var h=this.toRgb(),u=1/0,d="black";if(!r.length)for(var f in e)r[f]=new i(e[f]).toRgb();for(var g in e){var _=(o=h,l=r[g],Math.pow(o.r-l.r,2)+Math.pow(o.g-l.g,2)+Math.pow(o.b-l.b,2));_<u&&(u=_,d=g)}return d}},t.string.push([function(a){var o=a.toLowerCase(),l=o==="transparent"?"#0000":e[o];return l?new i(l).toRgb():null},"name"])}cf([hf]);const ji=class vs{constructor(t=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=t}get red(){return this._components[0]}get green(){return this._components[1]}get blue(){return this._components[2]}get alpha(){return this._components[3]}setValue(t){return this.value=t,this}set value(t){if(t instanceof vs)this._value=this._cloneSource(t._value),this._int=t._int,this._components.set(t._components);else{if(t===null)throw new Error("Cannot set Color#value to null");(this._value===null||!this._isSourceEqual(this._value,t))&&(this._value=this._cloneSource(t),this._normalize(this._value))}}get value(){return this._value}_cloneSource(t){return typeof t=="string"||typeof t=="number"||t instanceof Number||t===null?t:Array.isArray(t)||ArrayBuffer.isView(t)?t.slice(0):typeof t=="object"&&t!==null?{...t}:t}_isSourceEqual(t,e){const n=typeof t;if(n!==typeof e)return!1;if(n==="number"||n==="string"||t instanceof Number)return t===e;if(Array.isArray(t)&&Array.isArray(e)||ArrayBuffer.isView(t)&&ArrayBuffer.isView(e))return t.length!==e.length?!1:t.every((r,a)=>r===e[a]);if(t!==null&&e!==null){const r=Object.keys(t),a=Object.keys(e);return r.length!==a.length?!1:r.every(o=>t[o]===e[o])}return t===e}toRgba(){const[t,e,n,s]=this._components;return{r:t,g:e,b:n,a:s}}toRgb(){const[t,e,n]=this._components;return{r:t,g:e,b:n}}toRgbaString(){const[t,e,n]=this.toUint8RgbArray();return`rgba(${t},${e},${n},${this.alpha})`}toUint8RgbArray(t){const[e,n,s]=this._components;return this._arrayRgb||(this._arrayRgb=[]),t||(t=this._arrayRgb),t[0]=Math.round(e*255),t[1]=Math.round(n*255),t[2]=Math.round(s*255),t}toArray(t){this._arrayRgba||(this._arrayRgba=[]),t||(t=this._arrayRgba);const[e,n,s,r]=this._components;return t[0]=e,t[1]=n,t[2]=s,t[3]=r,t}toRgbArray(t){this._arrayRgb||(this._arrayRgb=[]),t||(t=this._arrayRgb);const[e,n,s]=this._components;return t[0]=e,t[1]=n,t[2]=s,t}toNumber(){return this._int}toBgrNumber(){const[t,e,n]=this.toUint8RgbArray();return(n<<16)+(e<<8)+t}toLittleEndianNumber(){const t=this._int;return(t>>16)+(t&65280)+((t&255)<<16)}multiply(t){const[e,n,s,r]=vs._temp.setValue(t)._components;return this._components[0]*=e,this._components[1]*=n,this._components[2]*=s,this._components[3]*=r,this._refreshInt(),this._value=null,this}premultiply(t,e=!0){return e&&(this._components[0]*=t,this._components[1]*=t,this._components[2]*=t),this._components[3]=t,this._refreshInt(),this._value=null,this}toPremultiplied(t,e=!0){if(t===1)return(255<<24)+this._int;if(t===0)return e?0:this._int;let n=this._int>>16&255,s=this._int>>8&255,r=this._int&255;return e&&(n=n*t+.5|0,s=s*t+.5|0,r=r*t+.5|0),(t*255<<24)+(n<<16)+(s<<8)+r}toHex(){const t=this._int.toString(16);return`#${"000000".substring(0,6-t.length)+t}`}toHexa(){const e=Math.round(this._components[3]*255).toString(16);return this.toHex()+"00".substring(0,2-e.length)+e}setAlpha(t){return this._components[3]=this._clamp(t),this}_normalize(t){let e,n,s,r;if((typeof t=="number"||t instanceof Number)&&t>=0&&t<=16777215){const a=t;e=(a>>16&255)/255,n=(a>>8&255)/255,s=(a&255)/255,r=1}else if((Array.isArray(t)||t instanceof Float32Array)&&t.length>=3&&t.length<=4)t=this._clamp(t),[e,n,s,r=1]=t;else if((t instanceof Uint8Array||t instanceof Uint8ClampedArray)&&t.length>=3&&t.length<=4)t=this._clamp(t,0,255),[e,n,s,r=255]=t,e/=255,n/=255,s/=255,r/=255;else if(typeof t=="string"||typeof t=="object"){if(typeof t=="string"){const o=vs.HEX_PATTERN.exec(t);o&&(t=`#${o[2]}`)}const a=ln(t);a.isValid()&&({r:e,g:n,b:s,a:r}=a.rgba,e/=255,n/=255,s/=255)}if(e!==void 0)this._components[0]=e,this._components[1]=n,this._components[2]=s,this._components[3]=r,this._refreshInt();else throw new Error(`Unable to convert color ${t}`)}_refreshInt(){this._clamp(this._components);const[t,e,n]=this._components;this._int=(t*255<<16)+(e*255<<8)+(n*255|0)}_clamp(t,e=0,n=1){return typeof t=="number"?Math.min(Math.max(t,e),n):(t.forEach((s,r)=>{t[r]=Math.min(Math.max(s,e),n)}),t)}static isColorLike(t){return typeof t=="number"||typeof t=="string"||t instanceof Number||t instanceof vs||Array.isArray(t)||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Float32Array||t.r!==void 0&&t.g!==void 0&&t.b!==void 0||t.r!==void 0&&t.g!==void 0&&t.b!==void 0&&t.a!==void 0||t.h!==void 0&&t.s!==void 0&&t.l!==void 0||t.h!==void 0&&t.s!==void 0&&t.l!==void 0&&t.a!==void 0||t.h!==void 0&&t.s!==void 0&&t.v!==void 0||t.h!==void 0&&t.s!==void 0&&t.v!==void 0&&t.a!==void 0}};ji.shared=new ji;ji._temp=new ji;ji.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;let me=ji;const uf={cullArea:null,cullable:!1,cullableChildren:!0};let ha=0;const Hl=500;function Re(...i){ha!==Hl&&(ha++,ha===Hl?console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS."):console.warn("PixiJS Warning: ",...i))}const Os={_registeredResources:new Set,register(i){this._registeredResources.add(i)},unregister(i){this._registeredResources.delete(i)},release(){this._registeredResources.forEach(i=>i.clear())},get registeredCount(){return this._registeredResources.size},isRegistered(i){return this._registeredResources.has(i)},reset(){this._registeredResources.clear()}};class df{constructor(t,e){this._pool=[],this._count=0,this._index=0,this._classType=t,e&&this.prepopulate(e)}prepopulate(t){for(let e=0;e<t;e++)this._pool[this._index++]=new this._classType;this._count+=t}get(t){var n;let e;return this._index>0?e=this._pool[--this._index]:e=new this._classType,(n=e.init)==null||n.call(e,t),e}return(t){var e;(e=t.reset)==null||e.call(t),this._pool[this._index++]=t}get totalSize(){return this._count}get totalFree(){return this._index}get totalUsed(){return this._count-this._index}clear(){if(this._pool.length>0&&this._pool[0].destroy)for(let t=0;t<this._index;t++)this._pool[t].destroy();this._pool.length=0,this._count=0,this._index=0}}class ff{constructor(){this._poolsByClass=new Map}prepopulate(t,e){this.getPool(t).prepopulate(e)}get(t,e){return this.getPool(t).get(e)}return(t){this.getPool(t.constructor).return(t)}getPool(t){return this._poolsByClass.has(t)||this._poolsByClass.set(t,new df(t)),this._poolsByClass.get(t)}stats(){const t={};return this._poolsByClass.forEach(e=>{const n=t[e._classType.name]?e._classType.name+e._classType.ID:e._classType.name;t[n]={free:e.totalFree,used:e.totalUsed,size:e.totalSize}}),t}clear(){this._poolsByClass.forEach(t=>t.clear()),this._poolsByClass.clear()}}const qe=new ff;Os.register(qe);const pf={get isCachedAsTexture(){var i;return!!((i=this.renderGroup)!=null&&i.isCachedAsTexture)},cacheAsTexture(i){typeof i=="boolean"&&i===!1?this.disableRenderGroup():(this.enableRenderGroup(),this.renderGroup.enableCacheAsTexture(i===!0?{}:i))},updateCacheTexture(){var i;(i=this.renderGroup)==null||i.updateCacheTexture()},get cacheAsBitmap(){return this.isCachedAsTexture},set cacheAsBitmap(i){le("v8.6.0","cacheAsBitmap is deprecated, use cacheAsTexture instead."),this.cacheAsTexture(i)}};function mf(i,t,e){const n=i.length;let s;if(t>=n||e===0)return;e=t+e>n?n-t:e;const r=n-e;for(s=t;s<r;++s)i[s]=i[s+e];i.length=r}const gf={allowChildren:!0,removeChildren(i=0,t){var r;const e=t!=null?t:this.children.length,n=e-i,s=[];if(n>0&&n<=e){for(let o=e-1;o>=i;o--){const l=this.children[o];l&&(s.push(l),l.parent=null)}mf(this.children,i,e);const a=this.renderGroup||this.parentRenderGroup;a&&a.removeChildren(s);for(let o=0;o<s.length;++o){const l=s[o];(r=l.parentRenderLayer)==null||r.detach(l),this.emit("childRemoved",l,this,o),s[o].emit("removed",this)}return s.length>0&&this._didViewChangeTick++,s}else if(n===0&&this.children.length===0)return s;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(i){const t=this.getChildAt(i);return this.removeChild(t)},getChildAt(i){if(i<0||i>=this.children.length)throw new Error(`getChildAt: Index (${i}) does not exist.`);return this.children[i]},setChildIndex(i,t){if(t<0||t>=this.children.length)throw new Error(`The index ${t} supplied is out of bounds ${this.children.length}`);this.getChildIndex(i),this.addChildAt(i,t)},getChildIndex(i){const t=this.children.indexOf(i);if(t===-1)throw new Error("The supplied Container must be a child of the caller");return t},addChildAt(i,t){this.allowChildren||le(Ge,"addChildAt: Only Containers will be allowed to add children in v8.0.0");const{children:e}=this;if(t<0||t>e.length)throw new Error(`${i}addChildAt: The index ${t} supplied is out of bounds ${e.length}`);if(i.parent){const s=i.parent.children.indexOf(i);if(i.parent===this&&s===t)return i;s!==-1&&i.parent.children.splice(s,1)}t===e.length?e.push(i):e.splice(t,0,i),i.parent=this,i.didChange=!0,i._updateFlags=15;const n=this.renderGroup||this.parentRenderGroup;return n&&n.addChild(i),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",i,this,t),i.emit("added",this),i},swapChildren(i,t){if(i===t)return;const e=this.getChildIndex(i),n=this.getChildIndex(t);this.children[e]=t,this.children[n]=i;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0),this._didContainerChangeTick++},removeFromParent(){var i;(i=this.parent)==null||i.removeChild(this)},reparentChild(...i){return i.length===1?this.reparentChildAt(i[0],this.children.length):(i.forEach(t=>this.reparentChildAt(t,this.children.length)),i[0])},reparentChildAt(i,t){if(i.parent===this)return this.setChildIndex(i,t),i;const e=i.worldTransform.clone();i.removeFromParent(),this.addChildAt(i,t);const n=this.worldTransform.clone();return n.invert(),e.prepend(n),i.setFromMatrix(e),i},replaceChild(i,t){i.updateLocalTransform(),this.addChildAt(t,this.getChildIndex(i)),t.setFromMatrix(i.localTransform),t.updateLocalTransform(),this.removeChild(i)}},_f={collectRenderables(i,t,e){this.parentRenderLayer&&this.parentRenderLayer!==e||this.globalDisplayStatus<7||!this.includeInBuild||(this.sortableChildren&&this.sortChildren(),this.isSimple?this.collectRenderablesSimple(i,t,e):this.renderGroup?t.renderPipes.renderGroup.addRenderGroup(this.renderGroup,i):this.collectRenderablesWithEffects(i,t,e))},collectRenderablesSimple(i,t,e){const n=this.children,s=n.length;for(let r=0;r<s;r++)n[r].collectRenderables(i,t,e)},collectRenderablesWithEffects(i,t,e){const{renderPipes:n}=t;for(let s=0;s<this.effects.length;s++){const r=this.effects[s];n[r.pipe].push(r,this,i)}this.collectRenderablesSimple(i,t,e);for(let s=this.effects.length-1;s>=0;s--){const r=this.effects[s];n[r.pipe].pop(r,this,i)}}};class Vl{constructor(){this.pipe="filter",this.priority=1}destroy(){for(let t=0;t<this.filters.length;t++)this.filters[t].destroy();this.filters=null,this.filterArea=null}}class xf{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(t=>{this.add({test:t.test,maskClass:t})}))}add(t){this._tests.push(t)}getMaskEffect(t){this._initialized||this.init();for(let e=0;e<this._tests.length;e++){const n=this._tests[e];if(n.test(t))return qe.get(n.maskClass,t)}return t}returnMaskEffect(t){qe.return(t)}}const so=new xf;$e.handleByList(jt.MaskEffect,so._effectClasses);const vf={_maskEffect:null,_maskOptions:{inverse:!1},_filterEffect:null,effects:[],_markStructureAsChanged(){const i=this.renderGroup||this.parentRenderGroup;i&&(i.structureDidChange=!0)},addEffect(i){this.effects.indexOf(i)===-1&&(this.effects.push(i),this.effects.sort((e,n)=>e.priority-n.priority),this._markStructureAsChanged(),this._updateIsSimple())},removeEffect(i){const t=this.effects.indexOf(i);t!==-1&&(this.effects.splice(t,1),this._markStructureAsChanged(),this._updateIsSimple())},set mask(i){const t=this._maskEffect;(t==null?void 0:t.mask)!==i&&(t&&(this.removeEffect(t),so.returnMaskEffect(t),this._maskEffect=null),i!=null&&(this._maskEffect=so.getMaskEffect(i),this.addEffect(this._maskEffect)))},get mask(){var i;return(i=this._maskEffect)==null?void 0:i.mask},setMask(i){this._maskOptions={...this._maskOptions,...i},i.mask&&(this.mask=i.mask),this._markStructureAsChanged()},set filters(i){var r;!Array.isArray(i)&&i&&(i=[i]);const t=this._filterEffect||(this._filterEffect=new Vl);i=i;const e=(i==null?void 0:i.length)>0,n=((r=t.filters)==null?void 0:r.length)>0,s=e!==n;i=Array.isArray(i)?i.slice(0):i,t.filters=Object.freeze(i),s&&(e?this.addEffect(t):(this.removeEffect(t),t.filters=i!=null?i:null))},get filters(){var i;return(i=this._filterEffect)==null?void 0:i.filters},set filterArea(i){this._filterEffect||(this._filterEffect=new Vl),this._filterEffect.filterArea=i},get filterArea(){var i;return(i=this._filterEffect)==null?void 0:i.filterArea}},yf={label:null,get name(){return le(Ge,"Container.name property has been removed, use Container.label instead"),this.label},set name(i){le(Ge,"Container.name property has been removed, use Container.label instead"),this.label=i},getChildByName(i,t=!1){return this.getChildByLabel(i,t)},getChildByLabel(i,t=!1){const e=this.children;for(let n=0;n<e.length;n++){const s=e[n];if(s.label===i||i instanceof RegExp&&i.test(s.label))return s}if(t)for(let n=0;n<e.length;n++){const r=e[n].getChildByLabel(i,!0);if(r)return r}return null},getChildrenByLabel(i,t=!1,e=[]){const n=this.children;for(let s=0;s<n.length;s++){const r=n[s];(r.label===i||i instanceof RegExp&&i.test(r.label))&&e.push(r)}if(t)for(let s=0;s<n.length;s++)n[s].getChildrenByLabel(i,!0,e);return e}},Ce=qe.getPool(Bt),Rn=qe.getPool(sn),Sf=new Bt,Mf={getFastGlobalBounds(i,t){t||(t=new sn),t.clear(),this._getGlobalBoundsRecursive(!!i,t,this.parentRenderLayer),t.isValid||t.set(0,0,0,0);const e=this.renderGroup||this.parentRenderGroup;return t.applyMatrix(e.worldTransform),t},_getGlobalBoundsRecursive(i,t,e){let n=t;if(i&&this.parentRenderLayer&&this.parentRenderLayer!==e||this.localDisplayStatus!==7||!this.measurable)return;const s=!!this.effects.length;if((this.renderGroup||s)&&(n=Rn.get().clear()),this.boundsArea)t.addRect(this.boundsArea,this.worldTransform);else{if(this.renderPipeId){const a=this.bounds;n.addFrame(a.minX,a.minY,a.maxX,a.maxY,this.groupTransform)}const r=this.children;for(let a=0;a<r.length;a++)r[a]._getGlobalBoundsRecursive(i,n,e)}if(s){let r=!1;const a=this.renderGroup||this.parentRenderGroup;for(let o=0;o<this.effects.length;o++)this.effects[o].addBounds&&(r||(r=!0,n.applyMatrix(a.worldTransform)),this.effects[o].addBounds(n,!0));r&&n.applyMatrix(a.worldTransform.copyTo(Sf).invert()),t.addBounds(n),Rn.return(n)}else this.renderGroup&&(t.addBounds(n,this.relativeGroupTransform),Rn.return(n))}};function $h(i,t,e){e.clear();let n,s;return i.parent?t?n=i.parent.worldTransform:(s=Ce.get().identity(),n=tl(i,s)):n=Bt.IDENTITY,jh(i,e,n,t),s&&Ce.return(s),e.isValid||e.set(0,0,0,0),e}function jh(i,t,e,n){var o,l;if(!i.visible||!i.measurable)return;let s;n?s=i.worldTransform:(i.updateLocalTransform(),s=Ce.get(),s.appendFrom(i.localTransform,e));const r=t,a=!!i.effects.length;if(a&&(t=Rn.get().clear()),i.boundsArea)t.addRect(i.boundsArea,s);else{const c=i.bounds;c&&!c.isEmpty()&&(t.matrix=s,t.addBounds(c));for(let h=0;h<i.children.length;h++)jh(i.children[h],t,s,n)}if(a){for(let c=0;c<i.effects.length;c++)(l=(o=i.effects[c]).addBounds)==null||l.call(o,t);r.addBounds(t,Bt.IDENTITY),Rn.return(t)}n||Ce.return(s)}function tl(i,t){const e=i.parent;return e&&(tl(e,t),e.updateLocalTransform(),t.append(e.localTransform)),t}function Kh(i,t){if(i===16777215||!t)return t;if(t===16777215||!i)return i;const e=i>>16&255,n=i>>8&255,s=i&255,r=t>>16&255,a=t>>8&255,o=t&255,l=e*r/255|0,c=n*a/255|0,h=s*o/255|0;return(l<<16)+(c<<8)+h}const Wl=16777215;function Xl(i,t){return i===Wl?t:t===Wl?i:Kh(i,t)}function Cr(i){return((i&255)<<16)+(i&65280)+(i>>16&255)}const bf={getGlobalAlpha(i){if(i)return this.renderGroup?this.renderGroup.worldAlpha:this.parentRenderGroup?this.parentRenderGroup.worldAlpha*this.alpha:this.alpha;let t=this.alpha,e=this.parent;for(;e;)t*=e.alpha,e=e.parent;return t},getGlobalTransform(i=new Bt,t){if(t)return i.copyFrom(this.worldTransform);this.updateLocalTransform();const e=tl(this,Ce.get().identity());return i.appendFrom(this.localTransform,e),Ce.return(e),i},getGlobalTint(i){if(i)return this.renderGroup?Cr(this.renderGroup.worldColor):this.parentRenderGroup?Cr(Xl(this.localColor,this.parentRenderGroup.worldColor)):this.tint;let t=this.localColor,e=this.parent;for(;e;)t=Xl(t,e.localColor),e=e.parent;return Cr(t)}};function Zh(i,t,e){return t.clear(),e||(e=Bt.IDENTITY),Jh(i,t,e,i,!0),t.isValid||t.set(0,0,0,0),t}function Jh(i,t,e,n,s){var l,c;let r;if(s)r=Ce.get(),r=e.copyTo(r);else{if(!i.visible||!i.measurable)return;i.updateLocalTransform();const h=i.localTransform;r=Ce.get(),r.appendFrom(h,e)}const a=t,o=!!i.effects.length;if(o&&(t=Rn.get().clear()),i.boundsArea)t.addRect(i.boundsArea,r);else{i.renderPipeId&&(t.matrix=r,t.addBounds(i.bounds));const h=i.children;for(let u=0;u<h.length;u++)Jh(h[u],t,r,n,!1)}if(o){for(let h=0;h<i.effects.length;h++)(c=(l=i.effects[h]).addLocalBounds)==null||c.call(l,t,n);a.addBounds(t,Bt.IDENTITY),Rn.return(t)}Ce.return(r)}function Qh(i,t){const e=i.children;for(let n=0;n<e.length;n++){const s=e[n],r=s.uid,a=(s._didViewChangeTick&65535)<<16|s._didContainerChangeTick&65535,o=t.index;(t.data[o]!==r||t.data[o+1]!==a)&&(t.data[t.index]=r,t.data[t.index+1]=a,t.didChange=!0),t.index=o+2,s.children.length&&Qh(s,t)}return t.didChange}const Ef=new Bt,Tf={_localBoundsCacheId:-1,_localBoundsCacheData:null,_setWidth(i,t){const e=Math.sign(this.scale.x)||1;t!==0?this.scale.x=i/t*e:this.scale.x=e},_setHeight(i,t){const e=Math.sign(this.scale.y)||1;t!==0?this.scale.y=i/t*e:this.scale.y=e},getLocalBounds(){this._localBoundsCacheData||(this._localBoundsCacheData={data:[],index:1,didChange:!1,localBounds:new sn});const i=this._localBoundsCacheData;return i.index=1,i.didChange=!1,i.data[0]!==this._didViewChangeTick&&(i.didChange=!0,i.data[0]=this._didViewChangeTick),Qh(this,i),i.didChange&&Zh(this,i.localBounds,Ef),i.localBounds},getBounds(i,t){return $h(this,i,t||new sn)}},Af={_onRender:null,set onRender(i){const t=this.renderGroup||this.parentRenderGroup;if(!i){this._onRender&&(t==null||t.removeOnRender(this)),this._onRender=null;return}this._onRender||t==null||t.addOnRender(this),this._onRender=i},get onRender(){return this._onRender}},wf={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(i){this._zIndex!==i&&(this._zIndex=i,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(Cf))}};function Cf(i,t){return i._zIndex-t._zIndex}const Rf={getGlobalPosition(i=new Te,t=!1){return this.parent?this.parent.toGlobal(this._position,i,t):(i.x=this._position.x,i.y=this._position.y),i},toGlobal(i,t,e=!1){const n=this.getGlobalTransform(Ce.get(),e);return t=n.apply(i,t),Ce.return(n),t},toLocal(i,t,e,n){t&&(i=t.toGlobal(i,e,n));const s=this.getGlobalTransform(Ce.get(),n);return e=s.applyInverse(i,e),Ce.return(s),e}};class tu{constructor(){this.uid=oe("instructionSet"),this.instructions=[],this.instructionSize=0,this.renderables=[],this.gcTick=0}reset(){this.instructionSize=0}destroy(){this.instructions.length=0,this.renderables.length=0,this.renderPipes=null,this.gcTick=0}add(t){this.instructions[this.instructionSize++]=t}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}}let Pf=0;class If{constructor(t){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1,this.textureStyle=new Or(this.textureOptions)}createTexture(t,e,n){const s=new rn({...this.textureOptions,width:t,height:e,resolution:1,antialias:n,autoGarbageCollect:!1});return new Zt({source:s,label:`texturePool_${Pf++}`})}getOptimalTexture(t,e,n=1,s){let r=Math.ceil(t*n-1e-6),a=Math.ceil(e*n-1e-6);r=$i(r),a=$i(a);const o=(r<<17)+(a<<1)+(s?1:0);this._texturePool[o]||(this._texturePool[o]=[]);let l=this._texturePool[o].pop();return l||(l=this.createTexture(r,a,s)),l.source._resolution=n,l.source.width=r/n,l.source.height=a/n,l.source.pixelWidth=r,l.source.pixelHeight=a,l.frame.x=0,l.frame.y=0,l.frame.width=t,l.frame.height=e,l.updateUvs(),this._poolKeyHash[l.uid]=o,l}getSameSizeTexture(t,e=!1){const n=t.source;return this.getOptimalTexture(t.width,t.height,n._resolution,e)}returnTexture(t,e=!1){const n=this._poolKeyHash[t.uid];e&&(t.source.style=this.textureStyle),this._texturePool[n].push(t)}clear(t){if(t=t!==!1,t)for(const e in this._texturePool){const n=this._texturePool[e];if(n)for(let s=0;s<n.length;s++)n[s].destroy(!0)}this._texturePool={}}}const eu=new If;Os.register(eu);class Lf{constructor(){this.renderPipeId="renderGroup",this.root=null,this.canBundle=!1,this.renderGroupParent=null,this.renderGroupChildren=[],this.worldTransform=new Bt,this.worldColorAlpha=4294967295,this.worldColor=16777215,this.worldAlpha=1,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.gcTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new tu,this._onRenderContainers=[],this.textureNeedsUpdate=!0,this.isCachedAsTexture=!1,this._matrixDirty=7}init(t){this.root=t,t._onRender&&this.addOnRender(t),t.didChange=!0;const e=t.children;for(let n=0;n<e.length;n++){const s=e[n];s._updateFlags=15,this.addChild(s)}}enableCacheAsTexture(t={}){this.textureOptions=t,this.isCachedAsTexture=!0,this.textureNeedsUpdate=!0}disableCacheAsTexture(){this.isCachedAsTexture=!1,this.texture&&(eu.returnTexture(this.texture,!0),this.texture=null)}updateCacheTexture(){this.textureNeedsUpdate=!0;const t=this._parentCacheAsTextureRenderGroup;t&&!t.textureNeedsUpdate&&t.updateCacheTexture()}reset(){this.renderGroupChildren.length=0;for(const t in this.childrenToUpdate){const e=this.childrenToUpdate[t];e.list.fill(null),e.index=0}this.childrenRenderablesToUpdate.index=0,this.childrenRenderablesToUpdate.list.fill(null),this.root=null,this.updateTick=0,this.structureDidChange=!0,this._onRenderContainers.length=0,this.renderGroupParent=null,this.disableCacheAsTexture()}get localTransform(){return this.root.localTransform}addRenderGroupChild(t){t.renderGroupParent&&t.renderGroupParent._removeRenderGroupChild(t),t.renderGroupParent=this,this.renderGroupChildren.push(t)}_removeRenderGroupChild(t){const e=this.renderGroupChildren.indexOf(t);e>-1&&this.renderGroupChildren.splice(e,1),t.renderGroupParent=null}addChild(t){if(this.structureDidChange=!0,t.parentRenderGroup=this,t.updateTick=-1,t.parent===this.root?t.relativeRenderGroupDepth=1:t.relativeRenderGroupDepth=t.parent.relativeRenderGroupDepth+1,t.didChange=!0,this.onChildUpdate(t),t.renderGroup){this.addRenderGroupChild(t.renderGroup);return}t._onRender&&this.addOnRender(t);const e=t.children;for(let n=0;n<e.length;n++)this.addChild(e[n])}removeChild(t){if(this.structureDidChange=!0,t._onRender&&(t.renderGroup||this.removeOnRender(t)),t.parentRenderGroup=null,t.renderGroup){this._removeRenderGroupChild(t.renderGroup);return}const e=t.children;for(let n=0;n<e.length;n++)this.removeChild(e[n])}removeChildren(t){for(let e=0;e<t.length;e++)this.removeChild(t[e])}onChildUpdate(t){let e=this.childrenToUpdate[t.relativeRenderGroupDepth];e||(e=this.childrenToUpdate[t.relativeRenderGroupDepth]={index:0,list:[]}),e.list[e.index++]=t}updateRenderable(t){t.globalDisplayStatus<7||(this.instructionSet.renderPipes[t.renderPipeId].updateRenderable(t),t.didViewUpdate=!1)}onChildViewUpdate(t){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=t}get isRenderable(){return this.root.localDisplayStatus===7&&this.worldAlpha>0}addOnRender(t){this._onRenderContainers.push(t)}removeOnRender(t){this._onRenderContainers.splice(this._onRenderContainers.indexOf(t),1)}runOnRender(t){for(let e=0;e<this._onRenderContainers.length;e++)this._onRenderContainers[e]._onRender(t)}destroy(){this.disableCacheAsTexture(),this.renderGroupParent=null,this.root=null,this.childrenRenderablesToUpdate=null,this.childrenToUpdate=null,this.renderGroupChildren=null,this._onRenderContainers=null,this.instructionSet=null}getChildren(t=[]){const e=this.root.children;for(let n=0;n<e.length;n++)this._getChildren(e[n],t);return t}_getChildren(t,e=[]){if(e.push(t),t.renderGroup)return e;const n=t.children;for(let s=0;s<n.length;s++)this._getChildren(n[s],e);return e}invalidateMatrices(){this._matrixDirty=7}get inverseWorldTransform(){return this._matrixDirty&1?(this._matrixDirty&=-2,this._inverseWorldTransform||(this._inverseWorldTransform=new Bt),this._inverseWorldTransform.copyFrom(this.worldTransform).invert()):this._inverseWorldTransform}get textureOffsetInverseTransform(){return this._matrixDirty&2?(this._matrixDirty&=-3,this._textureOffsetInverseTransform||(this._textureOffsetInverseTransform=new Bt),this._textureOffsetInverseTransform.copyFrom(this.inverseWorldTransform).translate(-this._textureBounds.x,-this._textureBounds.y)):this._textureOffsetInverseTransform}get inverseParentTextureTransform(){if(!(this._matrixDirty&4))return this._inverseParentTextureTransform;this._matrixDirty&=-5;const t=this._parentCacheAsTextureRenderGroup;return t?(this._inverseParentTextureTransform||(this._inverseParentTextureTransform=new Bt),this._inverseParentTextureTransform.copyFrom(this.worldTransform).prepend(t.inverseWorldTransform).translate(-t._textureBounds.x,-t._textureBounds.y)):this.worldTransform}get cacheToLocalTransform(){return this.isCachedAsTexture?this.textureOffsetInverseTransform:this._parentCacheAsTextureRenderGroup?this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform:null}}function Df(i,t,e={}){for(const n in t)!e[n]&&t[n]!==void 0&&(i[n]=t[n])}const ua=new Me(null),js=new Me(null),da=new Me(null,1,1),Ks=new Me(null),Yl=1,Uf=2,fa=4;class Yn extends gn{constructor(t={}){var e,n;super(),this.uid=oe("renderable"),this._updateFlags=15,this.renderGroup=null,this.parentRenderGroup=null,this.parentRenderGroupIndex=0,this.didChange=!1,this.didViewUpdate=!1,this.relativeRenderGroupDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new Bt,this.relativeGroupTransform=new Bt,this.groupTransform=this.relativeGroupTransform,this.destroyed=!1,this._position=new Me(this,0,0),this._scale=da,this._pivot=js,this._origin=Ks,this._skew=ua,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=16777215,this.localAlpha=1,this.groupAlpha=1,this.groupColor=16777215,this.groupColorAlpha=4294967295,this.localBlendMode="inherit",this.groupBlendMode="normal",this.localDisplayStatus=7,this.globalDisplayStatus=7,this._didContainerChangeTick=0,this._didViewChangeTick=0,this._didLocalTransformChangeId=-1,this.effects=[],Df(this,t,{children:!0,parent:!0,effects:!0}),(e=t.children)==null||e.forEach(s=>this.addChild(s)),(n=t.parent)==null||n.addChild(this)}static mixin(t){le("8.8.0","Container.mixin is deprecated, please use extensions.mixin instead."),$e.mixin(Yn,t)}set _didChangeId(t){this._didViewChangeTick=t>>12&4095,this._didContainerChangeTick=t&4095}get _didChangeId(){return this._didContainerChangeTick&4095|(this._didViewChangeTick&4095)<<12}addChild(...t){if(this.allowChildren||le(Ge,"addChild: Only Containers will be allowed to add children in v8.0.0"),t.length>1){for(let s=0;s<t.length;s++)this.addChild(t[s]);return t[0]}const e=t[0],n=this.renderGroup||this.parentRenderGroup;return e.parent===this?(this.children.splice(this.children.indexOf(e),1),this.children.push(e),n&&(n.structureDidChange=!0),e):(e.parent&&e.parent.removeChild(e),this.children.push(e),this.sortableChildren&&(this.sortDirty=!0),e.parent=this,e.didChange=!0,e._updateFlags=15,n&&n.addChild(e),this.emit("childAdded",e,this,this.children.length-1),e.emit("added",this),this._didViewChangeTick++,e._zIndex!==0&&e.depthOfChildModified(),e)}removeChild(...t){if(t.length>1){for(let s=0;s<t.length;s++)this.removeChild(t[s]);return t[0]}const e=t[0],n=this.children.indexOf(e);return n>-1&&(this._didViewChangeTick++,this.children.splice(n,1),this.renderGroup?this.renderGroup.removeChild(e):this.parentRenderGroup&&this.parentRenderGroup.removeChild(e),e.parentRenderLayer&&e.parentRenderLayer.detach(e),e.parent=null,this.emit("childRemoved",e,this,n),e.emit("removed",this)),e}_onUpdate(t){t&&t===this._skew&&this._updateSkew(),this._didContainerChangeTick++,!this.didChange&&(this.didChange=!0,this.parentRenderGroup&&this.parentRenderGroup.onChildUpdate(this))}set isRenderGroup(t){!!this.renderGroup!==t&&(t?this.enableRenderGroup():this.disableRenderGroup())}get isRenderGroup(){return!!this.renderGroup}enableRenderGroup(){if(this.renderGroup)return;const t=this.parentRenderGroup;t==null||t.removeChild(this),this.renderGroup=qe.get(Lf,this),this.groupTransform=Bt.IDENTITY,t==null||t.addChild(this),this._updateIsSimple()}disableRenderGroup(){if(!this.renderGroup)return;const t=this.parentRenderGroup;t==null||t.removeChild(this),qe.return(this.renderGroup),this.renderGroup=null,this.groupTransform=this.relativeGroupTransform,t==null||t.addChild(this),this._updateIsSimple()}_updateIsSimple(){this.isSimple=!this.renderGroup&&this.effects.length===0}get worldTransform(){return this._worldTransform||(this._worldTransform=new Bt),this.renderGroup?this._worldTransform.copyFrom(this.renderGroup.worldTransform):this.parentRenderGroup&&this._worldTransform.appendFrom(this.relativeGroupTransform,this.parentRenderGroup.worldTransform),this._worldTransform}get x(){return this._position.x}set x(t){this._position.x=t}get y(){return this._position.y}set y(t){this._position.y=t}get position(){return this._position}set position(t){this._position.copyFrom(t)}get rotation(){return this._rotation}set rotation(t){this._rotation!==t&&(this._rotation=t,this._onUpdate(this._skew))}get angle(){return this.rotation*Yd}set angle(t){this.rotation=t*qd}get pivot(){return this._pivot===js&&(this._pivot=new Me(this,0,0)),this._pivot}set pivot(t){this._pivot===js&&(this._pivot=new Me(this,0,0),this._origin!==Ks&&Re("Setting both a pivot and origin on a Container is not recommended. This can lead to unexpected behavior if not handled carefully.")),typeof t=="number"?this._pivot.set(t):this._pivot.copyFrom(t)}get skew(){return this._skew===ua&&(this._skew=new Me(this,0,0)),this._skew}set skew(t){this._skew===ua&&(this._skew=new Me(this,0,0)),this._skew.copyFrom(t)}get scale(){return this._scale===da&&(this._scale=new Me(this,1,1)),this._scale}set scale(t){this._scale===da&&(this._scale=new Me(this,0,0)),typeof t=="string"&&(t=parseFloat(t)),typeof t=="number"?this._scale.set(t):this._scale.copyFrom(t)}get origin(){return this._origin===Ks&&(this._origin=new Me(this,0,0)),this._origin}set origin(t){this._origin===Ks&&(this._origin=new Me(this,0,0),this._pivot!==js&&Re("Setting both a pivot and origin on a Container is not recommended. This can lead to unexpected behavior if not handled carefully.")),typeof t=="number"?this._origin.set(t):this._origin.copyFrom(t)}get width(){return Math.abs(this.scale.x*this.getLocalBounds().width)}set width(t){const e=this.getLocalBounds().width;this._setWidth(t,e)}get height(){return Math.abs(this.scale.y*this.getLocalBounds().height)}set height(t){const e=this.getLocalBounds().height;this._setHeight(t,e)}getSize(t){t||(t={});const e=this.getLocalBounds();return t.width=Math.abs(this.scale.x*e.width),t.height=Math.abs(this.scale.y*e.height),t}setSize(t,e){var s;const n=this.getLocalBounds();typeof t=="object"?(e=(s=t.height)!=null?s:t.width,t=t.width):e!=null||(e=t),t!==void 0&&this._setWidth(t,n.width),e!==void 0&&this._setHeight(e,n.height)}_updateSkew(){const t=this._rotation,e=this._skew;this._cx=Math.cos(t+e._y),this._sx=Math.sin(t+e._y),this._cy=-Math.sin(t-e._x),this._sy=Math.cos(t-e._x)}updateTransform(t){return this.position.set(typeof t.x=="number"?t.x:this.position.x,typeof t.y=="number"?t.y:this.position.y),this.scale.set(typeof t.scaleX=="number"?t.scaleX||1:this.scale.x,typeof t.scaleY=="number"?t.scaleY||1:this.scale.y),this.rotation=typeof t.rotation=="number"?t.rotation:this.rotation,this.skew.set(typeof t.skewX=="number"?t.skewX:this.skew.x,typeof t.skewY=="number"?t.skewY:this.skew.y),this.pivot.set(typeof t.pivotX=="number"?t.pivotX:this.pivot.x,typeof t.pivotY=="number"?t.pivotY:this.pivot.y),this.origin.set(typeof t.originX=="number"?t.originX:this.origin.x,typeof t.originY=="number"?t.originY:this.origin.y),this}setFromMatrix(t){t.decompose(this)}updateLocalTransform(){const t=this._didContainerChangeTick;if(this._didLocalTransformChangeId===t)return;this._didLocalTransformChangeId=t;const e=this.localTransform,n=this._scale,s=this._pivot,r=this._origin,a=this._position,o=n._x,l=n._y,c=s._x,h=s._y,u=-r._x,d=-r._y;e.a=this._cx*o,e.b=this._sx*o,e.c=this._cy*l,e.d=this._sy*l,e.tx=a._x-(c*e.a+h*e.c)+(u*e.a+d*e.c)-u,e.ty=a._y-(c*e.b+h*e.d)+(u*e.b+d*e.d)-d}set alpha(t){t!==this.localAlpha&&(this.localAlpha=t,this._updateFlags|=Yl,this._onUpdate())}get alpha(){return this.localAlpha}set tint(t){const n=me.shared.setValue(t!=null?t:16777215).toBgrNumber();n!==this.localColor&&(this.localColor=n,this._updateFlags|=Yl,this._onUpdate())}get tint(){return Cr(this.localColor)}set blendMode(t){this.localBlendMode!==t&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=Uf,this.localBlendMode=t,this._onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localDisplayStatus&2)}set visible(t){const e=t?2:0;(this.localDisplayStatus&2)!==e&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=fa,this.localDisplayStatus^=2,this._onUpdate())}get culled(){return!(this.localDisplayStatus&4)}set culled(t){const e=t?0:4;(this.localDisplayStatus&4)!==e&&(this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._updateFlags|=fa,this.localDisplayStatus^=4,this._onUpdate())}get renderable(){return!!(this.localDisplayStatus&1)}set renderable(t){const e=t?1:0;(this.localDisplayStatus&1)!==e&&(this._updateFlags|=fa,this.localDisplayStatus^=1,this.parentRenderGroup&&(this.parentRenderGroup.structureDidChange=!0),this._onUpdate())}get isRenderable(){return this.localDisplayStatus===7&&this.groupAlpha>0}destroy(t=!1){var s;if(this.destroyed)return;this.destroyed=!0;let e;if(this.children.length&&(e=this.removeChildren(0,this.children.length)),this.removeFromParent(),this.parent=null,this._maskEffect=null,this._filterEffect=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._origin=null,this._skew=null,this.emit("destroyed",this),this.removeAllListeners(),(typeof t=="boolean"?t:t==null?void 0:t.children)&&e)for(let r=0;r<e.length;++r)e[r].destroy(t);(s=this.renderGroup)==null||s.destroy(),this.renderGroup=null}}$e.mixin(Yn,gf,Mf,Rf,Af,Tf,vf,yf,wf,uf,pf,bf,_f);class nu extends Yn{constructor(t){super(t),this.canBundle=!0,this.allowChildren=!1,this._roundPixels=0,this._lastUsed=-1,this._gpuData=Object.create(null),this._bounds=new sn(0,1,0,0),this._boundsDirty=!0}get bounds(){return this._boundsDirty?(this.updateBounds(),this._boundsDirty=!1,this._bounds):this._bounds}get roundPixels(){return!!this._roundPixels}set roundPixels(t){this._roundPixels=t?1:0}containsPoint(t){const e=this.bounds,{x:n,y:s}=t;return n>=e.minX&&n<=e.maxX&&s>=e.minY&&s<=e.maxY}onViewUpdate(){if(this._didViewChangeTick++,this._boundsDirty=!0,this.didViewUpdate)return;this.didViewUpdate=!0;const t=this.renderGroup||this.parentRenderGroup;t&&t.onChildViewUpdate(this)}destroy(t){var e,n;super.destroy(t),this._bounds=null;for(const s in this._gpuData)(n=(e=this._gpuData[s]).destroy)==null||n.call(e);this._gpuData=null}collectRenderablesSimple(t,e,n){const{renderPipes:s}=e;s.blendMode.pushBlendMode(this,this.groupBlendMode,t),s[this.renderPipeId].addRenderable(this,t),this.didViewUpdate=!1;const a=this.children,o=a.length;for(let l=0;l<o;l++)a[l].collectRenderables(t,e,n);s.blendMode.popBlendMode(t)}}class Rs extends nu{constructor(t=Zt.EMPTY){t instanceof Zt&&(t={texture:t});const{texture:e=Zt.EMPTY,anchor:n,roundPixels:s,width:r,height:a,...o}=t;super({label:"Sprite",...o}),this.renderPipeId="sprite",this.batched=!0,this._visualBounds={minX:0,maxX:1,minY:0,maxY:0},this._anchor=new Me({_onUpdate:()=>{this.onViewUpdate()}}),n?this.anchor=n:e.defaultAnchor&&(this.anchor=e.defaultAnchor),this.texture=e,this.allowChildren=!1,this.roundPixels=s!=null?s:!1,r!==void 0&&(this.width=r),a!==void 0&&(this.height=a)}static from(t,e=!1){return t instanceof Zt?new Rs(t):new Rs(Zt.from(t,e))}set texture(t){t||(t=Zt.EMPTY);const e=this._texture;e!==t&&(e&&e.dynamic&&e.off("update",this.onViewUpdate,this),t.dynamic&&t.on("update",this.onViewUpdate,this),this._texture=t,this._width&&this._setWidth(this._width,this._texture.orig.width),this._height&&this._setHeight(this._height,this._texture.orig.height),this.onViewUpdate())}get texture(){return this._texture}get visualBounds(){return tf(this._visualBounds,this._anchor,this._texture),this._visualBounds}get sourceBounds(){return le("8.6.1","Sprite.sourceBounds is deprecated, use visualBounds instead."),this.visualBounds}updateBounds(){const t=this._anchor,e=this._texture,n=this._bounds,{width:s,height:r}=e.orig;n.minX=-t._x*s,n.maxX=n.minX+s,n.minY=-t._y*r,n.maxY=n.minY+r}destroy(t=!1){if(super.destroy(t),typeof t=="boolean"?t:t==null?void 0:t.texture){const n=typeof t=="boolean"?t:t==null?void 0:t.textureSource;this._texture.destroy(n)}this._texture=null,this._visualBounds=null,this._bounds=null,this._anchor=null,this._gpuData=null}get anchor(){return this._anchor}set anchor(t){typeof t=="number"?this._anchor.set(t):this._anchor.copyFrom(t)}get width(){return Math.abs(this.scale.x)*this._texture.orig.width}set width(t){this._setWidth(t,this._texture.orig.width),this._width=t}get height(){return Math.abs(this.scale.y)*this._texture.orig.height}set height(t){this._setHeight(t,this._texture.orig.height),this._height=t}getSize(t){return t||(t={}),t.width=Math.abs(this.scale.x)*this._texture.orig.width,t.height=Math.abs(this.scale.y)*this._texture.orig.height,t}setSize(t,e){var n;typeof t=="object"?(e=(n=t.height)!=null?n:t.width,t=t.width):e!=null||(e=t),t!==void 0&&this._setWidth(t,this._texture.orig.width),e!==void 0&&this._setHeight(e,this._texture.orig.height)}}const Nf=new sn;function iu(i,t,e){const n=Nf;i.measurable=!0,$h(i,e,n),t.addBoundsMask(n),i.measurable=!1}function su(i,t,e){const n=Rn.get();i.measurable=!0;const s=Ce.get().identity(),r=ru(i,e,s);Zh(i,n,r),i.measurable=!1,t.addBoundsMask(n),Ce.return(s),Rn.return(n)}function ru(i,t,e){return i?(i!==t&&(ru(i.parent,t,e),i.updateLocalTransform(),e.append(i.localTransform)),e):(Re("Mask bounds, renderable is not inside the root container"),e)}class au{constructor(t){this.priority=0,this.inverse=!1,this.pipe="alphaMask",t!=null&&t.mask&&this.init(t.mask)}init(t){this.mask=t,this.renderMaskToTexture=!(t instanceof Rs),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(t,e){this.inverse||iu(this.mask,t,e)}addLocalBounds(t,e){su(this.mask,t,e)}containsPoint(t,e){const n=this.mask;return e(n,t)}destroy(){this.reset()}static test(t){return t instanceof Rs}}au.extension=jt.MaskEffect;class ou{constructor(t){this.priority=0,this.pipe="colorMask",t!=null&&t.mask&&this.init(t.mask)}init(t){this.mask=t}destroy(){}static test(t){return typeof t=="number"}}ou.extension=jt.MaskEffect;class lu{constructor(t){this.priority=0,this.pipe="stencilMask",t!=null&&t.mask&&this.init(t.mask)}init(t){this.mask=t,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(t,e){iu(this.mask,t,e)}addLocalBounds(t,e){su(this.mask,t,e)}containsPoint(t,e){const n=this.mask;return e(n,t)}destroy(){this.reset()}static test(t){return t instanceof Yn}}lu.extension=jt.MaskEffect;const Ff={createCanvas:(i,t)=>{const e=document.createElement("canvas");return e.width=i,e.height=t,e},createImage:()=>new Image,getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>{var i;return(i=document.baseURI)!=null?i:window.location.href},getFontFaceSet:()=>document.fonts,fetch:(i,t)=>fetch(i,t),parseXML:i=>new DOMParser().parseFromString(i,"text/xml")};let ql=Ff;const ze={get(){return ql},set(i){ql=i}};class cu extends rn{constructor(t){t.resource||(t.resource=ze.get().createCanvas()),t.width||(t.width=t.resource.width,t.autoDensity||(t.width/=t.resolution)),t.height||(t.height=t.resource.height,t.autoDensity||(t.height/=t.resolution)),super(t),this.uploadMethodId="image",this.autoDensity=t.autoDensity,this.resizeCanvas(),this.transparent=!!t.transparent}resizeCanvas(){this.autoDensity&&"style"in this.resource&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),(this.resource.width!==this.pixelWidth||this.resource.height!==this.pixelHeight)&&(this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight)}resize(t=this.width,e=this.height,n=this._resolution){const s=super.resize(t,e,n);return s&&this.resizeCanvas(),s}static test(t){return globalThis.HTMLCanvasElement&&t instanceof HTMLCanvasElement||globalThis.OffscreenCanvas&&t instanceof OffscreenCanvas}get context2D(){return this._context2D||(this._context2D=this.resource.getContext("2d"))}}cu.extension=jt.TextureSource;class Br extends rn{constructor(t){super(t),this.uploadMethodId="image",this.autoGarbageCollect=!0}static test(t){return globalThis.HTMLImageElement&&t instanceof HTMLImageElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap||globalThis.VideoFrame&&t instanceof VideoFrame}}Br.extension=jt.TextureSource;var ro=(i=>(i[i.INTERACTION=50]="INTERACTION",i[i.HIGH=25]="HIGH",i[i.NORMAL=0]="NORMAL",i[i.LOW=-25]="LOW",i[i.UTILITY=-50]="UTILITY",i))(ro||{});class pa{constructor(t,e=null,n=0,s=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=t,this._context=e,this.priority=n,this._once=s}match(t,e=null){return this._fn===t&&this._context===e}emit(t){this._fn&&(this._context?this._fn.call(this._context,t):this._fn(t));const e=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),e}connect(t){this.previous=t,t.next&&(t.next.previous=this),this.next=t.next,t.next=this}destroy(t=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const e=this.next;return this.next=t?null:e,this.previous=null,e}}const hu=class ke{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new pa(null,null,1/0),this.deltaMS=1/ke.targetFPMS,this.elapsedMS=1/ke.targetFPMS,this._tick=t=>{this._requestId=null,this.started&&(this.update(t),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(t,e,n=ro.NORMAL){return this._addListener(new pa(t,e,n))}addOnce(t,e,n=ro.NORMAL){return this._addListener(new pa(t,e,n,!0))}_addListener(t){let e=this._head.next,n=this._head;if(!e)t.connect(n);else{for(;e;){if(t.priority>e.priority){t.connect(n);break}n=e,e=e.next}t.previous||t.connect(n)}return this._startIfPossible(),this}remove(t,e){let n=this._head.next;for(;n;)n.match(t,e)?n=n.destroy():n=n.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let t=0,e=this._head;for(;e=e.next;)t++;return t}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let t=this._head.next;for(;t;)t=t.destroy(!0);this._head.destroy(),this._head=null}}update(t=performance.now()){let e;if(t>this.lastTime){if(e=this.elapsedMS=t-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const r=t-this._lastFrame|0;if(r<this._minElapsedMS)return;this._lastFrame=t-r%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*ke.targetFPMS;const n=this._head;let s=n.next;for(;s;)s=s.emit(this);n.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=t}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(t){const e=Math.min(this.maxFPS,t),n=Math.min(Math.max(0,e)/1e3,ke.targetFPMS);this._maxElapsedMS=1/n}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(t){if(t===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,t);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!ke._shared){const t=ke._shared=new ke;t.autoStart=!0,t._protected=!0}return ke._shared}static get system(){if(!ke._system){const t=ke._system=new ke;t.autoStart=!0,t._protected=!0}return ke._system}};hu.targetFPMS=.06;let Zs=hu,rs;async function Of(){return rs!=null||(rs=(async()=>{var a;const t=ze.get().createCanvas(1,1).getContext("webgl");if(!t)return"premultiply-alpha-on-upload";const e=await new Promise(o=>{const l=document.createElement("video");l.onloadeddata=()=>o(l),l.onerror=()=>o(null),l.autoplay=!1,l.crossOrigin="anonymous",l.preload="auto",l.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",l.load()});if(!e)return"premultiply-alpha-on-upload";const n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n);const s=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e);const r=new Uint8Array(4);return t.readPixels(0,0,1,1,t.RGBA,t.UNSIGNED_BYTE,r),t.deleteFramebuffer(s),t.deleteTexture(n),(a=t.getExtension("WEBGL_lose_context"))==null||a.loseContext(),r[0]<=r[3]?"premultiplied-alpha":"premultiply-alpha-on-upload"})()),rs}const qr=class uu extends rn{constructor(t){var e;super(t),this.isReady=!1,this.uploadMethodId="video",t={...uu.defaultOptions,...t},this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=t.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=t.autoPlay!==!1,this.alphaMode=(e=t.alphaMode)!=null?e:"premultiply-alpha-on-upload",this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onCanPlayThrough=this._onCanPlayThrough.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),t.autoLoad!==!1&&this.load()}updateFrame(){if(!this.destroyed){if(this._updateFPS){const t=Zs.shared.elapsedMS*this.resource.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-t)}(!this._updateFPS||this._msToNextUpdate<=0)&&(this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0),this.isValid&&this.update()}}_videoFrameRequestCallback(){this.updateFrame(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback)}get isValid(){return!!this.resource.videoWidth&&!!this.resource.videoHeight}async load(){if(this._load)return this._load;const t=this.resource,e=this.options;return(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),t.addEventListener("play",this._onPlayStart),t.addEventListener("pause",this._onPlayStop),t.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._mediaReady():(e.preload||t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlayThrough),t.addEventListener("error",this._onError,!0)),this.alphaMode=await Of(),this._load=new Promise((n,s)=>{this.isValid?n(this):(this._resolve=n,this._reject=s,e.preloadTimeoutMs!==void 0&&(this._preloadTimeout=setTimeout(()=>{this._onError(new ErrorEvent(`Preload exceeded timeout of ${e.preloadTimeoutMs}ms`))})),t.load())}),this._load}_onError(t){this.resource.removeEventListener("error",this._onError,!0),this.emit("error",t),this._reject&&(this._reject(t),this._reject=null,this._resolve=null)}_isSourcePlaying(){const t=this.resource;return!t.paused&&!t.ended}_isSourceReady(){return this.resource.readyState>2}_onPlayStart(){this.isValid||this._mediaReady(),this._configureAutoUpdate()}_onPlayStop(){this._configureAutoUpdate()}_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0)}_onCanPlay(){this.resource.removeEventListener("canplay",this._onCanPlay),this._mediaReady()}_onCanPlayThrough(){this.resource.removeEventListener("canplaythrough",this._onCanPlay),this._preloadTimeout&&(clearTimeout(this._preloadTimeout),this._preloadTimeout=void 0),this._mediaReady()}_mediaReady(){const t=this.resource;this.isValid&&(this.isReady=!0,this.resize(t.videoWidth,t.videoHeight)),this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0,this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.resource.play()}destroy(){this._configureAutoUpdate();const t=this.resource;t&&(t.removeEventListener("play",this._onPlayStart),t.removeEventListener("pause",this._onPlayStop),t.removeEventListener("seeked",this._onSeeked),t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlayThrough),t.removeEventListener("error",this._onError,!0),t.pause(),t.src="",t.load()),super.destroy()}get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,this._configureAutoUpdate())}get updateFPS(){return this._updateFPS}set updateFPS(t){t!==this._updateFPS&&(this._updateFPS=t,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.resource.requestVideoFrameCallback?(this._isConnectedToTicker&&(Zs.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),this._videoFrameRequestCallbackHandle===null&&(this._videoFrameRequestCallbackHandle=this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(Zs.shared.add(this.updateFrame,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(this._videoFrameRequestCallbackHandle!==null&&(this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(Zs.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}static test(t){return globalThis.HTMLVideoElement&&t instanceof HTMLVideoElement}};qr.extension=jt.TextureSource;qr.defaultOptions={...rn.defaultOptions,autoLoad:!0,autoPlay:!0,updateFPS:0,crossorigin:!0,loop:!1,muted:!0,playsinline:!0,preload:!1};qr.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};let Bf=qr;const ki=(i,t,e=!1)=>(Array.isArray(i)||(i=[i]),t?i.map(n=>typeof n=="string"||e?t(n):n):i);class kf{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(t){return this._cache.has(t)}get(t){const e=this._cache.get(t);return e||Re(`[Assets] Asset id ${t} was not found in the Cache`),e}set(t,e){const n=ki(t);let s;for(let l=0;l<this.parsers.length;l++){const c=this.parsers[l];if(c.test(e)){s=c.getCacheableAssets(n,e);break}}const r=new Map(Object.entries(s||{}));s||n.forEach(l=>{r.set(l,e)});const a=[...r.keys()],o={cacheKeys:a,keys:n};n.forEach(l=>{this._cacheMap.set(l,o)}),a.forEach(l=>{const c=s?s[l]:e;this._cache.has(l)&&this._cache.get(l)!==c&&Re("[Cache] already has key:",l),this._cache.set(l,r.get(l))})}remove(t){if(!this._cacheMap.has(t)){Re(`[Assets] Asset id ${t} was not found in the Cache`);return}const e=this._cacheMap.get(t);e.cacheKeys.forEach(s=>{this._cache.delete(s)}),e.keys.forEach(s=>{this._cacheMap.delete(s)})}get parsers(){return this._parsers}}const zi=new kf,ao=[];$e.handleByList(jt.TextureSource,ao);function du(i={}){const t=i&&i.resource,e=t?i.resource:i,n=t?i:{resource:i};for(let s=0;s<ao.length;s++){const r=ao[s];if(r.test(e))return new r(n)}throw new Error(`Could not find a source type for resource: ${n.resource}`)}function zf(i={},t=!1){const e=i&&i.resource,n=e?i.resource:i,s=e?i:{resource:i};if(!t&&zi.has(n))return zi.get(n);const r=new Zt({source:du(s)});return r.on("destroy",()=>{zi.has(n)&&zi.remove(n)}),t||zi.set(n,r),r}function Gf(i,t=!1){return typeof i=="string"?zi.get(i):i instanceof rn?new Zt({source:i}):zf(i,t)}Zt.from=Gf;rn.from=du;$e.add(au,ou,lu,Bf,Br,cu,Qo);var fu=(i=>(i[i.Low=0]="Low",i[i.Normal=1]="Normal",i[i.High=2]="High",i))(fu||{});function Ke(i){if(typeof i!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(i)}`)}function as(i){return i.split("?")[0].split("#")[0]}function Hf(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Vf(i,t,e){return i.replace(new RegExp(Hf(t),"g"),e)}function Wf(i,t){let e="",n=0,s=-1,r=0,a=-1;for(let o=0;o<=i.length;++o){if(o<i.length)a=i.charCodeAt(o);else{if(a===47)break;a=47}if(a===47){if(!(s===o-1||r===1))if(s!==o-1&&r===2){if(e.length<2||n!==2||e.charCodeAt(e.length-1)!==46||e.charCodeAt(e.length-2)!==46){if(e.length>2){const l=e.lastIndexOf("/");if(l!==e.length-1){l===-1?(e="",n=0):(e=e.slice(0,l),n=e.length-1-e.lastIndexOf("/")),s=o,r=0;continue}}else if(e.length===2||e.length===1){e="",n=0,s=o,r=0;continue}}}else e.length>0?e+=`/${i.slice(s+1,o)}`:e=i.slice(s+1,o),n=o-s-1;s=o,r=0}else a===46&&r!==-1?++r:r=-1}return e}const Ps={toPosix(i){return Vf(i,"\\","/")},isUrl(i){return/^https?:/.test(this.toPosix(i))},isDataUrl(i){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(i)},isBlobUrl(i){return i.startsWith("blob:")},hasProtocol(i){return/^[^/:]+:/.test(this.toPosix(i))},getProtocol(i){Ke(i),i=this.toPosix(i);const t=/^file:\/\/\//.exec(i);if(t)return t[0];const e=/^[^/:]+:\/{0,2}/.exec(i);return e?e[0]:""},toAbsolute(i,t,e){if(Ke(i),this.isDataUrl(i)||this.isBlobUrl(i))return i;const n=as(this.toPosix(t!=null?t:ze.get().getBaseUrl())),s=as(this.toPosix(e!=null?e:this.rootname(n)));return i=this.toPosix(i),i.startsWith("/")?Ps.join(s,i.slice(1)):this.isAbsolute(i)?i:this.join(n,i)},normalize(i){if(Ke(i),i.length===0)return".";if(this.isDataUrl(i)||this.isBlobUrl(i))return i;i=this.toPosix(i);let t="";const e=i.startsWith("/");this.hasProtocol(i)&&(t=this.rootname(i),i=i.slice(t.length));const n=i.endsWith("/");return i=Wf(i),i.length>0&&n&&(i+="/"),e?`/${i}`:t+i},isAbsolute(i){return Ke(i),i=this.toPosix(i),this.hasProtocol(i)?!0:i.startsWith("/")},join(...i){var e;if(i.length===0)return".";let t;for(let n=0;n<i.length;++n){const s=i[n];if(Ke(s),s.length>0)if(t===void 0)t=s;else{const r=(e=i[n-1])!=null?e:"";this.joinExtensions.includes(this.extname(r).toLowerCase())?t+=`/../${s}`:t+=`/${s}`}}return t===void 0?".":this.normalize(t)},dirname(i){if(Ke(i),i.length===0)return".";i=this.toPosix(i);let t=i.charCodeAt(0);const e=t===47;let n=-1,s=!0;const r=this.getProtocol(i),a=i;i=i.slice(r.length);for(let o=i.length-1;o>=1;--o)if(t=i.charCodeAt(o),t===47){if(!s){n=o;break}}else s=!1;return n===-1?e?"/":this.isUrl(a)?r+i:r:e&&n===1?"//":r+i.slice(0,n)},rootname(i){Ke(i),i=this.toPosix(i);let t="";if(i.startsWith("/")?t="/":t=this.getProtocol(i),this.isUrl(i)){const e=i.indexOf("/",t.length);e!==-1?t=i.slice(0,e):t=i,t.endsWith("/")||(t+="/")}return t},basename(i,t){Ke(i),t&&Ke(t),i=as(this.toPosix(i));let e=0,n=-1,s=!0,r;if(t!==void 0&&t.length>0&&t.length<=i.length){if(t.length===i.length&&t===i)return"";let a=t.length-1,o=-1;for(r=i.length-1;r>=0;--r){const l=i.charCodeAt(r);if(l===47){if(!s){e=r+1;break}}else o===-1&&(s=!1,o=r+1),a>=0&&(l===t.charCodeAt(a)?--a===-1&&(n=r):(a=-1,n=o))}return e===n?n=o:n===-1&&(n=i.length),i.slice(e,n)}for(r=i.length-1;r>=0;--r)if(i.charCodeAt(r)===47){if(!s){e=r+1;break}}else n===-1&&(s=!1,n=r+1);return n===-1?"":i.slice(e,n)},extname(i){Ke(i),i=as(this.toPosix(i));let t=-1,e=0,n=-1,s=!0,r=0;for(let a=i.length-1;a>=0;--a){const o=i.charCodeAt(a);if(o===47){if(!s){e=a+1;break}continue}n===-1&&(s=!1,n=a+1),o===46?t===-1?t=a:r!==1&&(r=1):t!==-1&&(r=-1)}return t===-1||n===-1||r===0||r===1&&t===n-1&&t===e+1?"":i.slice(t,n)},parse(i){Ke(i);const t={root:"",dir:"",base:"",ext:"",name:""};if(i.length===0)return t;i=as(this.toPosix(i));let e=i.charCodeAt(0);const n=this.isAbsolute(i);let s;t.root=this.rootname(i),n||this.hasProtocol(i)?s=1:s=0;let r=-1,a=0,o=-1,l=!0,c=i.length-1,h=0;for(;c>=s;--c){if(e=i.charCodeAt(c),e===47){if(!l){a=c+1;break}continue}o===-1&&(l=!1,o=c+1),e===46?r===-1?r=c:h!==1&&(h=1):r!==-1&&(h=-1)}return r===-1||o===-1||h===0||h===1&&r===o-1&&r===a+1?o!==-1&&(a===0&&n?t.base=t.name=i.slice(1,o):t.base=t.name=i.slice(a,o)):(a===0&&n?(t.name=i.slice(1,r),t.base=i.slice(1,o)):(t.name=i.slice(a,r),t.base=i.slice(a,o)),t.ext=i.slice(r,o)),t.dir=this.dirname(i),t},sep:"/",delimiter:":",joinExtensions:[".html"]};function pu(i,t,e,n,s){const r=t[e];for(let a=0;a<r.length;a++){const o=r[a];e<t.length-1?pu(i.replace(n[e],o),t,e+1,n,s):s.push(i.replace(n[e],o))}}function Xf(i){const t=/\{(.*?)\}/g,e=i.match(t),n=[];if(e){const s=[];e.forEach(r=>{const a=r.substring(1,r.length-1).split(",");s.push(a)}),pu(i,s,0,e,n)}else n.push(i);return n}const $l=i=>!Array.isArray(i);class mu{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(t,e)=>`${t}${this._bundleIdConnector}${e}`,extractAssetIdFromBundle:(t,e)=>e.replace(`${t}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(t){var e,n,s;if(this._bundleIdConnector=(e=t.connector)!=null?e:this._bundleIdConnector,this._createBundleAssetId=(n=t.createBundleAssetId)!=null?n:this._createBundleAssetId,this._extractAssetIdFromBundle=(s=t.extractAssetIdFromBundle)!=null?s:this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...t){t.forEach(e=>{this._preferredOrder.push(e),e.priority||(e.priority=Object.keys(e.params))}),this._resolverHash={}}set basePath(t){this._basePath=t}get basePath(){return this._basePath}set rootPath(t){this._rootPath=t}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(t){if(typeof t=="string")this._defaultSearchParams=t;else{const e=t;this._defaultSearchParams=Object.keys(e).map(n=>`${encodeURIComponent(n)}=${encodeURIComponent(e[n])}`).join("&")}}getAlias(t){const{alias:e,src:n}=t;return ki(e||n,r=>typeof r=="string"?r:Array.isArray(r)?r.map(a=>{var o;return(o=a==null?void 0:a.src)!=null?o:a}):r!=null&&r.src?r.src:r,!0)}addManifest(t){this._manifest&&Re("[Resolver] Manifest already exists, this will be overwritten"),this._manifest=t,t.bundles.forEach(e=>{this.addBundle(e.name,e.assets)})}addBundle(t,e){const n=[];let s=e;Array.isArray(e)||(s=Object.entries(e).map(([r,a])=>typeof a=="string"||Array.isArray(a)?{alias:r,src:a}:{alias:r,...a})),s.forEach(r=>{const a=r.src,o=r.alias;let l;if(typeof o=="string"){const c=this._createBundleAssetId(t,o);n.push(c),l=[o,c]}else{const c=o.map(h=>this._createBundleAssetId(t,h));n.push(...c),l=[...o,...c]}this.add({...r,alias:l,src:a})}),this._bundles[t]=n}add(t){const e=[];Array.isArray(t)?e.push(...t):e.push(t);let n;n=r=>{this.hasKey(r)&&Re(`[Resolver] already has key: ${r} overwriting`)},ki(e).forEach(r=>{const{src:a}=r;let{data:o,format:l,loadParser:c,parser:h}=r;const u=ki(a).map(g=>typeof g=="string"?Xf(g):Array.isArray(g)?g:[g]),d=this.getAlias(r);Array.isArray(d)?d.forEach(n):n(d);const f=[];u.forEach(g=>{g.forEach(_=>{var m,y,x,S;let p={};if(typeof _!="object"){p.src=_;for(let R=0;R<this._parsers.length;R++){const T=this._parsers[R];if(T.test(_)){p=T.parse(_);break}}}else o=(m=_.data)!=null?m:o,l=(y=_.format)!=null?y:l,(_.loadParser||_.parser)&&(c=(x=_.loadParser)!=null?x:c,h=(S=_.parser)!=null?S:h),p={...p,..._};if(!d)throw new Error(`[Resolver] alias is undefined for this asset: ${p.src}`);p=this._buildResolvedAsset(p,{aliases:d,data:o,format:l,loadParser:c,parser:h}),f.push(p)})}),d.forEach(g=>{this._assetMap[g]=f})})}resolveBundle(t){const e=$l(t);t=ki(t);const n={};return t.forEach(s=>{const r=this._bundles[s];if(r){const a=this.resolve(r),o={};for(const l in a){const c=a[l];o[this._extractAssetIdFromBundle(s,l)]=c}n[s]=o}}),e?n[t[0]]:n}resolveUrl(t){const e=this.resolve(t);if(typeof t!="string"){const n={};for(const s in e)n[s]=e[s].src;return n}return e.src}resolve(t){const e=$l(t);t=ki(t);const n={};return t.forEach(s=>{if(!this._resolverHash[s])if(this._assetMap[s]){let r=this._assetMap[s];const a=this._getPreferredOrder(r);a==null||a.priority.forEach(o=>{a.params[o].forEach(l=>{const c=r.filter(h=>h[o]?h[o]===l:!1);c.length&&(r=c)})}),this._resolverHash[s]=r[0]}else this._resolverHash[s]=this._buildResolvedAsset({alias:[s],src:s},{});n[s]=this._resolverHash[s]}),e?n[t[0]]:n}hasKey(t){return!!this._assetMap[t]}hasBundle(t){return!!this._bundles[t]}_getPreferredOrder(t){for(let e=0;e<t.length;e++){const n=t[e],s=this._preferredOrder.find(r=>r.params.format.includes(n.format));if(s)return s}return this._preferredOrder[0]}_appendDefaultSearchParams(t){if(!this._defaultSearchParams)return t;const e=/\?/.test(t)?"&":"?";return`${t}${e}${this._defaultSearchParams}`}_buildResolvedAsset(t,e){var l,c;const{aliases:n,data:s,loadParser:r,parser:a,format:o}=e;return(this._basePath||this._rootPath)&&(t.src=Ps.toAbsolute(t.src,this._basePath,this._rootPath)),t.alias=(l=n!=null?n:t.alias)!=null?l:[t.src],t.src=this._appendDefaultSearchParams(t.src),t.data={...s||{},...t.data},t.loadParser=r!=null?r:t.loadParser,t.parser=a!=null?a:t.parser,t.format=(c=o!=null?o:t.format)!=null?c:Yf(t.src),t}}mu.RETINA_PREFIX=/@([0-9\.]+)x/;function Yf(i){return i.split(".").pop().split("?").shift().split("#").shift()}const jl=(i,t)=>{const e=t.split("?")[1];return e&&(i+=`?${e}`),i},gu=class ys{constructor(t,e){this.linkedSheets=[];let n=t;(t==null?void 0:t.source)instanceof rn&&(n={texture:t,data:e});const{texture:s,data:r,cachePrefix:a=""}=n;this.cachePrefix=a,this._texture=s instanceof Zt?s:null,this.textureSource=s.source,this.textures={},this.animations={},this.data=r;const o=parseFloat(r.meta.scale);o?(this.resolution=o,s.source.resolution=this.resolution):this.resolution=s.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(t=>{this._callback=t,this._batchIndex=0,this._frameKeys.length<=ys.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(t){let e=t;const n=ys.BATCH_SIZE;for(;e-t<n&&e<this._frameKeys.length;){const s=this._frameKeys[e],r=this._frames[s],a=r.frame;if(a){let o=null,l=null;const c=r.trimmed!==!1&&r.sourceSize?r.sourceSize:r.frame,h=new ce(0,0,Math.floor(c.w)/this.resolution,Math.floor(c.h)/this.resolution);r.rotated?o=new ce(Math.floor(a.x)/this.resolution,Math.floor(a.y)/this.resolution,Math.floor(a.h)/this.resolution,Math.floor(a.w)/this.resolution):o=new ce(Math.floor(a.x)/this.resolution,Math.floor(a.y)/this.resolution,Math.floor(a.w)/this.resolution,Math.floor(a.h)/this.resolution),r.trimmed!==!1&&r.spriteSourceSize&&(l=new ce(Math.floor(r.spriteSourceSize.x)/this.resolution,Math.floor(r.spriteSourceSize.y)/this.resolution,Math.floor(a.w)/this.resolution,Math.floor(a.h)/this.resolution)),this.textures[s]=new Zt({source:this.textureSource,frame:o,orig:h,trim:l,rotate:r.rotated?2:0,defaultAnchor:r.anchor,defaultBorders:r.borders,label:s.toString()})}e++}}_processAnimations(){const t=this.data.animations||{};for(const e in t){this.animations[e]=[];for(let n=0;n<t[e].length;n++){const s=t[e][n];this.animations[e].push(this.textures[s])}}}_parseComplete(){const t=this._callback;this._callback=null,this._batchIndex=0,t.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*ys.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*ys.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(t=!1){var e;for(const n in this.textures)this.textures[n].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,t&&((e=this._texture)==null||e.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};gu.BATCH_SIZE=1e3;let Kl=gu;const qf=["jpg","png","jpeg","avif","webp","basis","etc2","bc7","bc6h","bc5","bc4","bc3","bc2","bc1","eac","astc"];function _u(i,t,e){const n={};if(i.forEach(s=>{n[s]=t}),Object.keys(t.textures).forEach(s=>{n[`${t.cachePrefix}${s}`]=t.textures[s]}),!e){const s=Ps.dirname(i[0]);t.linkedSheets.forEach((r,a)=>{const o=_u([`${s}/${t.data.meta.related_multi_packs[a]}`],r,!0);Object.assign(n,o)})}return n}const $f={extension:jt.Asset,cache:{test:i=>i instanceof Kl,getCacheableAssets:(i,t)=>_u(i,t,!1)},resolver:{extension:{type:jt.ResolveParser,name:"resolveSpritesheet"},test:i=>{const e=i.split("?")[0].split("."),n=e.pop(),s=e.pop();return n==="json"&&qf.includes(s)},parse:i=>{var e,n;const t=i.split(".");return{resolution:parseFloat((n=(e=mu.RETINA_PREFIX.exec(i))==null?void 0:e[1])!=null?n:"1"),format:t[t.length-2],src:i}}},loader:{name:"spritesheetLoader",id:"spritesheet",extension:{type:jt.LoadParser,priority:fu.Normal,name:"spritesheetLoader"},async testParse(i,t){return Ps.extname(t.src).toLowerCase()===".json"&&!!i.frames},async parse(i,t,e){var u,d,f;const{texture:n,imageFilename:s,textureOptions:r,cachePrefix:a}=(u=t==null?void 0:t.data)!=null?u:{};let o=Ps.dirname(t.src);o&&o.lastIndexOf("/")!==o.length-1&&(o+="/");let l;if(n instanceof Zt)l=n;else{const g=jl(o+(s!=null?s:i.meta.image),t.src);l=(await e.load([{src:g,data:r}]))[g]}const c=new Kl({texture:l.source,data:i,cachePrefix:a});await c.parse();const h=(d=i==null?void 0:i.meta)==null?void 0:d.related_multi_packs;if(Array.isArray(h)){const g=[];for(const p of h){if(typeof p!="string")continue;let m=o+p;(f=t.data)!=null&&f.ignoreMultiPack||(m=jl(m,t.src),g.push(e.load({src:m,data:{textureOptions:r,ignoreMultiPack:!0}})))}const _=await Promise.all(g);c.linkedSheets=_,_.forEach(p=>{p.linkedSheets=[c].concat(c.linkedSheets.filter(m=>m!==p))})}return c},async unload(i,t,e){await e.unload(i.textureSource._sourceOrigin),i.destroy(!1)}}};$e.add($f);const ma=Object.create(null),Zl=Object.create(null);function el(i,t){let e=Zl[i];return e===void 0&&(ma[t]===void 0&&(ma[t]=1),Zl[i]=e=ma[t]++),e}let vi;function xu(){return(!vi||vi!=null&&vi.isContextLost())&&(vi=ze.get().createCanvas().getContext("webgl",{})),vi}let Js;function jf(){if(!Js){Js="mediump";const i=xu();i&&i.getShaderPrecisionFormat&&(Js=i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision?"highp":"mediump")}return Js}function Kf(i,t,e){return t?i:e?(i=i.replace("out vec4 finalColor;",""),`

        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${i}
        `):`

        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${i}
        `}function Zf(i,t,e){const n=e?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if(i.substring(0,9)!=="precision"){let s=e?t.requestedFragmentPrecision:t.requestedVertexPrecision;return s==="highp"&&n!=="highp"&&(s="mediump"),`precision ${s} float;
${i}`}else if(n!=="highp"&&i.substring(0,15)==="precision highp")return i.replace("precision highp","precision mediump");return i}function Jf(i,t){return t?`#version 300 es
${i}`:i}const Qf={},tp={};function ep(i,{name:t="pixi-program"},e=!0){t=t.replace(/\s+/g,"-"),t+=e?"-fragment":"-vertex";const n=e?Qf:tp;return n[t]?(n[t]++,t+=`-${n[t]}`):n[t]=1,i.indexOf("#define SHADER_NAME")!==-1?i:`${`#define SHADER_NAME ${t}`}
${i}`}function np(i,t){return t?i.replace("#version 300 es",""):i}const ga={stripVersion:np,ensurePrecision:Zf,addProgramDefines:Kf,setProgramName:ep,insertVersion:Jf},os=Object.create(null),vu=class oo{constructor(t){t={...oo.defaultOptions,...t};const e=t.fragment.indexOf("#version 300 es")!==-1,n={stripVersion:e,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:jf()},setProgramName:{name:t.name},addProgramDefines:e,insertVersion:e};let s=t.fragment,r=t.vertex;Object.keys(ga).forEach(a=>{const o=n[a];s=ga[a](s,o,!0),r=ga[a](r,o,!1)}),this.fragment=s,this.vertex=r,this.transformFeedbackVaryings=t.transformFeedbackVaryings,this._key=el(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null,os[this._cacheKey]=null}static from(t){const e=`${t.vertex}:${t.fragment}`;return os[e]||(os[e]=new oo(t),os[e]._cacheKey=e),os[e]}};vu.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let yu=vu;const Jl={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function ip(i){var t;return(t=Jl[i])!=null?t:Jl.float32}const sp={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function rp({source:i,entryPoint:t}){var s;const e={},n=i.indexOf(`fn ${t}`);if(n!==-1){const r=i.indexOf("->",n);if(r!==-1){const a=i.substring(n,r),o=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let l;for(;(l=o.exec(a))!==null;){const c=(s=sp[l[3]])!=null?s:"float32";e[l[2]]={location:parseInt(l[1],10),format:c,stride:ip(c).stride,offset:0,instance:!1,start:0}}}}return e}function _a(i){var u,d,f;const t=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,e=/@group\((\d+)\)/,n=/@binding\((\d+)\)/,s=/var(<[^>]+>)? (\w+)/,r=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,o=/(\w+)\s*:\s*([\w\<\>]+)/g,l=/struct\s+(\w+)/,c=(u=i.match(t))==null?void 0:u.map(g=>({group:parseInt(g.match(e)[1],10),binding:parseInt(g.match(n)[1],10),name:g.match(s)[2],isUniform:g.match(s)[1]==="<uniform>",type:g.match(r)[1]}));if(!c)return{groups:[],structs:[]};const h=(f=(d=i.match(a))==null?void 0:d.map(g=>{const _=g.match(l)[1],p=g.match(o).reduce((m,y)=>{const[x,S]=y.split(":");return m[x.trim()]=S.trim(),m},{});return p?{name:_,members:p}:null}).filter(({name:g})=>c.some(_=>_.type===g)))!=null?f:[];return{groups:c,structs:h}}var Ss=(i=>(i[i.VERTEX=1]="VERTEX",i[i.FRAGMENT=2]="FRAGMENT",i[i.COMPUTE=4]="COMPUTE",i))(Ss||{});function ap({groups:i}){const t=[];for(let e=0;e<i.length;e++){const n=i[e];t[n.group]||(t[n.group]=[]),n.isUniform?t[n.group].push({binding:n.binding,visibility:Ss.VERTEX|Ss.FRAGMENT,buffer:{type:"uniform"}}):n.type==="sampler"?t[n.group].push({binding:n.binding,visibility:Ss.FRAGMENT,sampler:{type:"filtering"}}):n.type==="texture_2d"&&t[n.group].push({binding:n.binding,visibility:Ss.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}function op({groups:i}){const t=[];for(let e=0;e<i.length;e++){const n=i[e];t[n.group]||(t[n.group]={}),t[n.group][n.name]=n.binding}return t}function lp(i,t){const e=new Set,n=new Set,s=[...i.structs,...t.structs].filter(a=>e.has(a.name)?!1:(e.add(a.name),!0)),r=[...i.groups,...t.groups].filter(a=>{const o=`${a.name}-${a.binding}`;return n.has(o)?!1:(n.add(o),!0)});return{structs:s,groups:r}}const ls=Object.create(null);class $r{constructor(t){var o,l;this._layoutKey=0,this._attributeLocationsKey=0;const{fragment:e,vertex:n,layout:s,gpuLayout:r,name:a}=t;if(this.name=a,this.fragment=e,this.vertex=n,e.source===n.source){const c=_a(e.source);this.structsAndGroups=c}else{const c=_a(n.source),h=_a(e.source);this.structsAndGroups=lp(c,h)}this.layout=s!=null?s:op(this.structsAndGroups),this.gpuLayout=r!=null?r:ap(this.structsAndGroups),this.autoAssignGlobalUniforms=((o=this.layout[0])==null?void 0:o.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((l=this.layout[1])==null?void 0:l.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:t,fragment:e}=this,n=t.source+e.source+t.entryPoint+e.entryPoint;this._layoutKey=el(n,"program")}get attributeData(){var t;return(t=this._attributeData)!=null||(this._attributeData=rp(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null,ls[this._cacheKey]=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return ls[e]||(ls[e]=new $r(t),ls[e]._cacheKey=e),ls[e]}}const Su=["f32","i32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","mat3x3<f32>","mat4x4<f32>","mat3x2<f32>","mat4x2<f32>","mat2x3<f32>","mat4x3<f32>","mat2x4<f32>","mat3x4<f32>","vec2<i32>","vec3<i32>","vec4<i32>"],cp=Su.reduce((i,t)=>(i[t]=!0,i),{});function hp(i,t){switch(i){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const Mu=class bu{constructor(t,e){var s,r;this._touched=0,this.uid=oe("uniform"),this._resourceType="uniformGroup",this._resourceId=oe("resource"),this.isUniformGroup=!0,this._dirtyId=0,this.destroyed=!1,e={...bu.defaultOptions,...e},this.uniformStructures=t;const n={};for(const a in t){const o=t[a];if(o.name=a,o.size=(s=o.size)!=null?s:1,!cp[o.type]){const l=o.type.match(/^array<(\w+(?:<\w+>)?),\s*(\d+)>$/);if(l){const[,c,h]=l;throw new Error(`Uniform type ${o.type} is not supported. Use type: '${c}', size: ${h} instead.`)}throw new Error(`Uniform type ${o.type} is not supported. Supported uniform types are: ${Su.join(", ")}`)}(r=o.value)!=null||(o.value=hp(o.type,o.size)),n[a]=o.value}this.uniforms=n,this._dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this._signature=el(Object.keys(n).map(a=>`${a}-${t[a].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};Mu.defaultOptions={ubo:!1,isStatic:!1};let Eu=Mu;class Rr{constructor(t){this.resources=Object.create(null),this._dirty=!0;let e=0;for(const n in t){const s=t[n];this.setResource(s,e++)}this._updateKey()}_updateKey(){if(!this._dirty)return;this._dirty=!1;const t=[];let e=0;for(const n in this.resources)t[e++]=this.resources[n]._resourceId;this._key=t.join("|")}setResource(t,e){var s,r;const n=this.resources[e];t!==n&&(n&&((s=t.off)==null||s.call(t,"change",this.onResourceChange,this)),(r=t.on)==null||r.call(t,"change",this.onResourceChange,this),this.resources[e]=t,this._dirty=!0)}getResource(t){return this.resources[t]}_touch(t){const e=this.resources;for(const n in e)e[n]._touched=t}destroy(){var e;const t=this.resources;for(const n in t){const s=t[n];(e=s==null?void 0:s.off)==null||e.call(s,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(t){if(this._dirty=!0,t.destroyed){const e=this.resources;for(const n in e)e[n]===t&&(e[n]=null)}else this._updateKey()}}var lo=(i=>(i[i.WEBGL=1]="WEBGL",i[i.WEBGPU=2]="WEBGPU",i[i.BOTH=3]="BOTH",i))(lo||{});class nl extends gn{constructor(t){super(),this.uid=oe("shader"),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:e,glProgram:n,groups:s,resources:r,compatibleRenderers:a,groupMap:o}=t;this.gpuProgram=e,this.glProgram=n,a===void 0&&(a=0,e&&(a|=lo.WEBGPU),n&&(a|=lo.WEBGL)),this.compatibleRenderers=a;const l={};if(!r&&!s&&(r={}),r&&s)throw new Error("[Shader] Cannot have both resources and groups");if(!e&&s&&!o)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&s&&o)for(const c in o)for(const h in o[c]){const u=o[c][h];l[u]={group:c,binding:h,name:u}}else if(e&&s&&!o){const c=e.structsAndGroups.groups;o={},c.forEach(h=>{o[h.group]=o[h.group]||{},o[h.group][h.binding]=h.name,l[h.name]=h})}else if(r){s={},o={},e&&e.structsAndGroups.groups.forEach(u=>{o[u.group]=o[u.group]||{},o[u.group][u.binding]=u.name,l[u.name]=u});let c=0;for(const h in r)l[h]||(s[99]||(s[99]=new Rr,this._ownedBindGroups.push(s[99])),l[h]={group:99,binding:c,name:h},o[99]=o[99]||{},o[99][c]=h,c++);for(const h in r){const u=h;let d=r[h];!d.source&&!d._resourceType&&(d=new Eu(d));const f=l[u];f&&(s[f.group]||(s[f.group]=new Rr,this._ownedBindGroups.push(s[f.group])),s[f.group].setResource(d,f.binding))}}this.groups=s,this._uniformBindMap=o,this.resources=this._buildResourceAccessor(s,l)}addResource(t,e,n){var s,r;(s=this._uniformBindMap)[e]||(s[e]={}),(r=this._uniformBindMap[e])[n]||(r[n]=t),this.groups[e]||(this.groups[e]=new Rr,this._ownedBindGroups.push(this.groups[e]))}_buildResourceAccessor(t,e){const n={};for(const s in e){const r=e[s];Object.defineProperty(n,r.name,{get(){return t[r.group].getResource(r.binding)},set(a){t[r.group].setResource(a,r.binding)}})}return n}destroy(t=!1){var e,n;this.emit("destroy",this),t&&((e=this.gpuProgram)==null||e.destroy(),(n=this.glProgram)==null||n.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(s=>{s.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(t){const{gpu:e,gl:n,...s}=t;let r,a;return e&&(r=$r.from(e)),n&&(a=yu.from(n)),new nl({gpuProgram:r,glProgram:a,...s})}}const co=[];$e.handleByNamedList(jt.Environment,co);async function up(i){if(!i)for(let t=0;t<co.length;t++){const e=co[t];if(e.value.test()){await e.value.load();return}}}let cs;function dp(){if(typeof cs=="boolean")return cs;try{cs=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{cs=!1}return cs}function Ql(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Tu(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=_p(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,u=l;for(let d=e;d<s;d+=e){const f=i[d],g=i[d+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Is(r,a,e,o,l,c,0),a}function Tu(i,t,e,n,s){let r;if(s===Cp(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=tc(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=tc(a/n|0,i[a],i[a+1],r);return r&&Ki(r,r.next)&&(Ds(r),r=r.next),r}function mi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ki(e,e.next)||ie(e.prev,e,e.next)===0)){if(Ds(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Is(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Mp(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?pp(i,n,s,r):fp(i)){t.push(l.i,i.i,c.i),Ds(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=mp(mi(i),t),Is(i,t,e,n,s,r,2)):a===2&&gp(i,t,e,n,s,r):Is(mi(i),t,e,n,s,r,1);break}}}function fp(i){const t=i.prev,e=i,n=i.next;if(ie(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),u=Math.min(o,l,c),d=Math.max(s,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Ms(s,o,r,l,a,c,g.x,g.y)&&ie(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function pp(i,t,e,n){const s=i.prev,r=i,a=i.next;if(ie(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),_=Math.max(o,l,c),p=Math.max(h,u,d),m=ho(f,g,t,e,n),y=ho(_,p,t,e,n);let x=i.prevZ,S=i.nextZ;for(;x&&x.z>=m&&S&&S.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Ms(o,h,l,u,c,d,x.x,x.y)&&ie(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&Ms(o,h,l,u,c,d,S.x,S.y)&&ie(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Ms(o,h,l,u,c,d,x.x,x.y)&&ie(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&Ms(o,h,l,u,c,d,S.x,S.y)&&ie(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function mp(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Ki(n,s)&&wu(n,e,e.next,s)&&Ls(n,s)&&Ls(s,n)&&(t.push(n.i,e.i,s.i),Ds(e),Ds(e.next),e=i=s),e=e.next}while(e!==i);return mi(e)}function gp(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Tp(a,o)){let l=Cu(a,o);a=mi(a,a.next),l=mi(l,l.next),Is(a,t,e,n,s,r,0),Is(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function _p(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Tu(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Ep(c))}s.sort(xp);for(let r=0;r<s.length;r++)e=vp(s[r],e);return e}function xp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function vp(i,t){const e=yp(i,t);if(!e)return t;const n=Cu(e,i);return mi(n,n.next),mi(e,e.next)}function yp(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(Ki(i,e))return e;do{if(Ki(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Au(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);Ls(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Sp(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Sp(i,t){return ie(i.prev,i,t.prev)<0&&ie(t.next,i,i.next)<0}function Mp(i,t,e,n){let s=i;do s.z===0&&(s.z=ho(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,bp(s)}function bp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function ho(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Ep(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Au(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Ms(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Au(i,t,e,n,s,r,a,o)}function Tp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Ap(i,t)&&(Ls(i,t)&&Ls(t,i)&&wp(i,t)&&(ie(i.prev,i,t.prev)||ie(i,t.prev,t))||Ki(i,t)&&ie(i.prev,i,i.next)>0&&ie(t.prev,t,t.next)>0)}function ie(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ki(i,t){return i.x===t.x&&i.y===t.y}function wu(i,t,e,n){const s=tr(ie(i,t,e)),r=tr(ie(i,t,n)),a=tr(ie(e,n,i)),o=tr(ie(e,n,t));return!!(s!==r&&a!==o||s===0&&Qs(i,e,t)||r===0&&Qs(i,n,t)||a===0&&Qs(e,i,n)||o===0&&Qs(e,t,n))}function Qs(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function tr(i){return i>0?1:i<0?-1:0}function Ap(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&wu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ls(i,t){return ie(i.prev,i,i.next)<0?ie(i,t,i.next)>=0&&ie(i,i.prev,t)>=0:ie(i,t,i.prev)<0||ie(i,i.next,t)<0}function wp(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Cu(i,t){const e=uo(i.i,i.x,i.y),n=uo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function tc(i,t,e,n){const s=uo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ds(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function uo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Cp(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}const Rp=Ql.default||Ql;var Ru=(i=>(i[i.NONE=0]="NONE",i[i.COLOR=16384]="COLOR",i[i.STENCIL=1024]="STENCIL",i[i.DEPTH=256]="DEPTH",i[i.COLOR_DEPTH=16640]="COLOR_DEPTH",i[i.COLOR_STENCIL=17408]="COLOR_STENCIL",i[i.DEPTH_STENCIL=1280]="DEPTH_STENCIL",i[i.ALL=17664]="ALL",i))(Ru||{});class Pp{constructor(t){this.items=[],this._name=t}emit(t,e,n,s,r,a,o,l){const{name:c,items:h}=this;for(let u=0,d=h.length;u<d;u++)h[u][c](t,e,n,s,r,a,o,l);return this}add(t){return t[this._name]&&(this.remove(t),this.items.push(t)),this}remove(t){const e=this.items.indexOf(t);return e!==-1&&this.items.splice(e,1),this}contains(t){return this.items.indexOf(t)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Ip=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Pu=class Iu extends gn{constructor(t){var n;super(),this.uid=oe("renderer"),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=t.type,this.name=t.name,this.config=t;const e=[...Ip,...(n=this.config.runners)!=null?n:[]];this._addRunners(...e),this._unsafeEvalCheck()}async init(t={}){const e=t.skipExtensionImports===!0?!0:t.manageImports===!1;await up(e),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const n in this._systemsHash)t={...this._systemsHash[n].constructor.defaultOptions,...t};t={...Iu.defaultOptions,...t},this._roundPixels=t.roundPixels?1:0;for(let n=0;n<this.runners.init.items.length;n++)await this.runners.init.items[n].init(t);this._initOptions=t}render(t,e){var s,r;let n=t;if(n instanceof Yn&&(n={container:n},e&&(le(Ge,"passing a second argument is deprecated, please use render options instead"),n.target=e.renderTexture)),n.target||(n.target=this.view.renderTarget),n.target===this.view.renderTarget&&(this._lastObjectRendered=n.container,(s=n.clearColor)!=null||(n.clearColor=this.background.colorRgba),(r=n.clear)!=null||(n.clear=this.background.clearBeforeRender)),n.clearColor){const a=Array.isArray(n.clearColor)&&n.clearColor.length===4;n.clearColor=a?n.clearColor:me.shared.setValue(n.clearColor).toArray()}n.transform||(n.container.updateLocalTransform(),n.transform=n.container.localTransform),n.container.visible&&(n.container.enableRenderGroup(),this.runners.prerender.emit(n),this.runners.renderStart.emit(n),this.runners.render.emit(n),this.runners.renderEnd.emit(n),this.runners.postrender.emit(n))}resize(t,e,n){const s=this.view.resolution;this.view.resize(t,e,n),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),n!==void 0&&n!==s&&this.runners.resolutionChange.emit(n)}clear(t={}){var a;const e=this;t.target||(t.target=e.renderTarget.renderTarget),t.clearColor||(t.clearColor=this.background.colorRgba),(a=t.clear)!=null||(t.clear=Ru.ALL);const{clear:n,clearColor:s,target:r}=t;me.shared.setValue(s!=null?s:this.background.colorRgba),e.renderTarget.clear(r,n,me.shared.toArray())}get resolution(){return this.view.resolution}set resolution(t){this.view.resolution=t,this.runners.resolutionChange.emit(t)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...t){t.forEach(e=>{this.runners[e]=new Pp(e)})}_addSystems(t){let e;for(e in t){const n=t[e];this._addSystem(n.value,n.name)}}_addSystem(t,e){const n=new t(this);if(this[e])throw new Error(`Whoops! The name "${e}" is already in use`);this[e]=n,this._systemsHash[e]=n;for(const s in this.runners)this.runners[s].add(n);return this}_addPipes(t,e){const n=e.reduce((s,r)=>(s[r.name]=r.value,s),{});t.forEach(s=>{const r=s.value,a=s.name,o=n[a];this.renderPipes[a]=new r(this,o?new o:null),this.runners.destroy.add(this.renderPipes[a])})}destroy(t=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(t),Object.values(this.runners).forEach(e=>{e.destroy()}),(t===!0||typeof t=="object"&&t.releaseGlobalResources)&&Os.release(),this._systemsHash=null,this.renderPipes=null}generateTexture(t){return this.textureGenerator.generateTexture(t)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!dp())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Pu.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Lu=Pu,er;function Lp(i){return er!==void 0||(er=(()=>{var e;const t={stencil:!0,failIfMajorPerformanceCaveat:i!=null?i:Lu.defaultOptions.failIfMajorPerformanceCaveat};try{if(!ze.get().getWebGLRenderingContext())return!1;let s=ze.get().createCanvas().getContext("webgl",t);const r=!!((e=s==null?void 0:s.getContextAttributes())!=null&&e.stencil);if(s){const a=s.getExtension("WEBGL_lose_context");a&&a.loseContext()}return s=null,r}catch{return!1}})()),er}let nr;async function Dp(i={}){return nr!==void 0||(nr=await(async()=>{const t=ze.get().getNavigator().gpu;if(!t)return!1;try{return await(await t.requestAdapter(i)).requestDevice(),!0}catch{return!1}})()),nr}const ec=["webgl","webgpu","canvas"];async function Up(i){var r;let t=[];i.preference?(t.push(i.preference),ec.forEach(a=>{a!==i.preference&&t.push(a)})):t=ec.slice();let e,n={};for(let a=0;a<t.length;a++){const o=t[a];if(o==="webgpu"&&await Dp()){const{WebGPURenderer:l}=await Fr(async()=>{const{WebGPURenderer:c}=await import("./WebGPURenderer-CtBztJZ0.js");return{WebGPURenderer:c}},__vite__mapDeps([3,2,4]));e=l,n={...i,...i.webgpu};break}else if(o==="webgl"&&Lp((r=i.failIfMajorPerformanceCaveat)!=null?r:Lu.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:l}=await Fr(async()=>{const{WebGLRenderer:c}=await import("./WebGLRenderer-znjEA8Tc.js");return{WebGLRenderer:c}},__vite__mapDeps([5,2,4]));e=l,n={...i,...i.webgl};break}else if(o==="canvas")throw n={...i},new Error("CanvasRenderer is not yet implemented")}if(delete n.webgpu,delete n.webgl,!e)throw new Error("No available renderer for the current environment");const s=new e;return await s.init(n),s}const Du="8.13.2";class Uu{static init(){var t;(t=globalThis.__PIXI_APP_INIT__)==null||t.call(globalThis,this,Du)}static destroy(){}}Uu.extension=jt.Application;class Np{constructor(t){this._renderer=t}init(){var t;(t=globalThis.__PIXI_RENDERER_INIT__)==null||t.call(globalThis,this._renderer,Du)}destroy(){this._renderer=null}}Np.extension={type:[jt.WebGLSystem,jt.WebGPUSystem],name:"initHook",priority:-10};const Nu=class fo{constructor(...t){this.stage=new Yn,t[0]!==void 0&&le(Ge,"Application constructor options are deprecated, please use Application.init() instead.")}async init(t){t={...t},this.renderer=await Up(t),fo._plugins.forEach(e=>{e.init.call(this,t)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return le(Ge,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(t=!1,e=!1){const n=fo._plugins.slice(0);n.reverse(),n.forEach(s=>{s.destroy.call(this)}),this.stage.destroy(e),this.stage=null,this.renderer.destroy(t),this.renderer=null}};Nu._plugins=[];let Fu=Nu;$e.handleByList(jt.Application,Fu._plugins);$e.add(Uu);/**
 * tiny-lru
 *
 * @copyright 2025 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 11.4.5
 */class Fp{constructor(t=0,e=0,n=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=t,this.resetTtl=n,this.size=0,this.ttl=e}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(t){if(this.has(t)){const e=this.items[t];delete this.items[t],this.size--,e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),this.last===e&&(this.last=e.prev)}return this}entries(t=this.keys()){return t.map(e=>[e,this.get(e)])}evict(t=!1){if(t||this.size>0){const e=this.first;delete this.items[e.key],--this.size===0?(this.first=null,this.last=null):(this.first=e.next,this.first.prev=null)}return this}expiresAt(t){let e;return this.has(t)&&(e=this.items[t].expiry),e}get(t){const e=this.items[t];if(e!==void 0){if(this.ttl>0&&e.expiry<=Date.now()){this.delete(t);return}return this.moveToEnd(e),e.value}}has(t){return t in this.items}moveToEnd(t){this.last!==t&&(t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),t.prev=this.last,t.next=null,this.last!==null&&(this.last.next=t),this.last=t,this.first===null&&(this.first=t))}keys(){const t=[];let e=this.first;for(;e!==null;)t.push(e.key),e=e.next;return t}setWithEvicted(t,e,n=this.resetTtl){let s=null;if(this.has(t))this.set(t,e,!0,n);else{this.max>0&&this.size===this.max&&(s={...this.first},this.evict(!0));let r=this.items[t]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:t,prev:this.last,next:null,value:e};++this.size===1?this.first=r:this.last.next=r,this.last=r}return s}set(t,e,n=!1,s=this.resetTtl){let r=this.items[t];return n||r!==void 0?(r.value=e,n===!1&&s&&(r.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(r)):(this.max>0&&this.size===this.max&&this.evict(!0),r=this.items[t]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:t,prev:this.last,next:null,value:e},++this.size===1?this.first=r:this.last.next=r,this.last=r),this}values(t=this.keys()){return t.map(e=>this.get(e))}}function Op(i=1e3,t=0,e=!1){if(isNaN(i)||i<0)throw new TypeError("Invalid max value");if(isNaN(t)||t<0)throw new TypeError("Invalid ttl value");if(typeof e!="boolean")throw new TypeError("Invalid resetTtl value");return new Fp(i,t,e)}const Bp=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function Ou(i){const t=typeof i.fontSize=="number"?`${i.fontSize}px`:i.fontSize;let e=i.fontFamily;Array.isArray(i.fontFamily)||(e=i.fontFamily.split(","));for(let n=e.length-1;n>=0;n--){let s=e[n].trim();!/([\"\'])[^\'\"]+\1/.test(s)&&!Bp.includes(s)&&(s=`"${s}"`),e[n]=s}return`${i.fontStyle} ${i.fontVariant} ${i.fontWeight} ${t} ${e.join(",")}`}const xa={willReadFrequently:!0},an=class gt{static get experimentalLetterSpacingSupported(){let t=gt._experimentalLetterSpacingSupported;if(t===void 0){const e=ze.get().getCanvasRenderingContext2D().prototype;t=gt._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return t}constructor(t,e,n,s,r,a,o,l,c){this.text=t,this.style=e,this.width=n,this.height=s,this.lines=r,this.lineWidths=a,this.lineHeight=o,this.maxLineWidth=l,this.fontProperties=c}static measureText(t=" ",e,n=gt._canvas,s=e.wordWrap){var y;const r=`${t}-${e.styleKey}-wordWrap-${s}`;if(gt._measurementCache.has(r))return gt._measurementCache.get(r);const a=Ou(e),o=gt.measureFont(a);o.fontSize===0&&(o.fontSize=e.fontSize,o.ascent=e.fontSize);const l=gt.__context;l.font=a;const h=(s?gt._wordWrap(t,e,n):t).split(/(?:\r\n|\r|\n)/),u=new Array(h.length);let d=0;for(let x=0;x<h.length;x++){const S=gt._measureText(h[x],e.letterSpacing,l);u[x]=S,d=Math.max(d,S)}const f=((y=e._stroke)==null?void 0:y.width)||0;let g=d+f;e.dropShadow&&(g+=e.dropShadow.distance);const _=e.lineHeight||o.fontSize;let p=Math.max(_,o.fontSize+f)+(h.length-1)*(_+e.leading);e.dropShadow&&(p+=e.dropShadow.distance);const m=new gt(t,e,g,p,h,u,_+e.leading,d,o);return gt._measurementCache.set(r,m),m}static _measureText(t,e,n){let s=!1;gt.experimentalLetterSpacingSupported&&(gt.experimentalLetterSpacing?(n.letterSpacing=`${e}px`,n.textLetterSpacing=`${e}px`,s=!0):(n.letterSpacing="0px",n.textLetterSpacing="0px"));const r=n.measureText(t);let a=r.width;const o=-r.actualBoundingBoxLeft;let c=r.actualBoundingBoxRight-o;if(a>0)if(s)a-=e,c-=e;else{const h=(gt.graphemeSegmenter(t).length-1)*e;a+=h,c+=h}return Math.max(a,c)}static _wordWrap(t,e,n=gt._canvas){const s=n.getContext("2d",xa);let r=0,a="",o="";const l=Object.create(null),{letterSpacing:c,whiteSpace:h}=e,u=gt._collapseSpaces(h),d=gt._collapseNewlines(h);let f=!u;const g=e.wordWrapWidth+c,_=gt._tokenize(t);for(let p=0;p<_.length;p++){let m=_[p];if(gt._isNewline(m)){if(!d){o+=gt._addLine(a),f=!u,a="",r=0;continue}m=" "}if(u){const x=gt.isBreakingSpace(m),S=gt.isBreakingSpace(a[a.length-1]);if(x&&S)continue}const y=gt._getFromCache(m,c,l,s);if(y>g)if(a!==""&&(o+=gt._addLine(a),a="",r=0),gt.canBreakWords(m,e.breakWords)){const x=gt.wordWrapSplit(m);for(let S=0;S<x.length;S++){let R=x[S],T=R,A=1;for(;x[S+A];){const b=x[S+A];if(!gt.canBreakChars(T,b,m,S,e.breakWords))R+=b;else break;T=b,A++}S+=A-1;const I=gt._getFromCache(R,c,l,s);I+r>g&&(o+=gt._addLine(a),f=!1,a="",r=0),a+=R,r+=I}}else{a.length>0&&(o+=gt._addLine(a),a="",r=0);const x=p===_.length-1;o+=gt._addLine(m,!x),f=!1,a="",r=0}else y+r>g&&(f=!1,o+=gt._addLine(a),a="",r=0),(a.length>0||!gt.isBreakingSpace(m)||f)&&(a+=m,r+=y)}return o+=gt._addLine(a,!1),o}static _addLine(t,e=!0){return t=gt._trimRight(t),t=e?`${t}
`:t,t}static _getFromCache(t,e,n,s){let r=n[t];return typeof r!="number"&&(r=gt._measureText(t,e,s)+e,n[t]=r),r}static _collapseSpaces(t){return t==="normal"||t==="pre-line"}static _collapseNewlines(t){return t==="normal"}static _trimRight(t){if(typeof t!="string")return"";for(let e=t.length-1;e>=0;e--){const n=t[e];if(!gt.isBreakingSpace(n))break;t=t.slice(0,-1)}return t}static _isNewline(t){return typeof t!="string"?!1:gt._newlines.includes(t.charCodeAt(0))}static isBreakingSpace(t,e){return typeof t!="string"?!1:gt._breakingSpaces.includes(t.charCodeAt(0))}static _tokenize(t){const e=[];let n="";if(typeof t!="string")return e;for(let s=0;s<t.length;s++){const r=t[s],a=t[s+1];if(gt.isBreakingSpace(r,a)||gt._isNewline(r)){n!==""&&(e.push(n),n=""),r==="\r"&&a===`
`?(e.push(`\r
`),s++):e.push(r);continue}n+=r}return n!==""&&e.push(n),e}static canBreakWords(t,e){return e}static canBreakChars(t,e,n,s,r){return!0}static wordWrapSplit(t){return gt.graphemeSegmenter(t)}static measureFont(t){if(gt._fonts[t])return gt._fonts[t];const e=gt._context;e.font=t;const n=e.measureText(gt.METRICS_STRING+gt.BASELINE_SYMBOL),s={ascent:n.actualBoundingBoxAscent,descent:n.actualBoundingBoxDescent,fontSize:n.actualBoundingBoxAscent+n.actualBoundingBoxDescent};return gt._fonts[t]=s,s}static clearMetrics(t=""){t?delete gt._fonts[t]:gt._fonts={}}static get _canvas(){if(!gt.__canvas){let t;try{const e=new OffscreenCanvas(0,0),n=e.getContext("2d",xa);if(n!=null&&n.measureText)return gt.__canvas=e,e;t=ze.get().createCanvas()}catch{t=ze.get().createCanvas()}t.width=t.height=10,gt.__canvas=t}return gt.__canvas}static get _context(){return gt.__context||(gt.__context=gt._canvas.getContext("2d",xa)),gt.__context}};an.METRICS_STRING="|ÉqÅ";an.BASELINE_SYMBOL="M";an.BASELINE_MULTIPLIER=1.4;an.HEIGHT_MULTIPLIER=2;an.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const i=new Intl.Segmenter;return t=>{const e=i.segment(t),n=[];let s=0;for(const r of e)n[s++]=r.segment;return n}}return i=>[...i]})();an.experimentalLetterSpacing=!1;an._fonts={};an._newlines=[10,13];an._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288];an._measurementCache=Op(1e3);let Gi=an;const nc=[{offset:0,color:"white"},{offset:1,color:"black"}],il=class po{constructor(...t){var s;this.uid=oe("fillGradient"),this._tick=0,this.type="linear",this.colorStops=[];let e=kp(t);e={...e.type==="radial"?po.defaultRadialOptions:po.defaultLinearOptions,...zh(e)},this._textureSize=e.textureSize,this._wrapMode=e.wrapMode,e.type==="radial"?(this.center=e.center,this.outerCenter=(s=e.outerCenter)!=null?s:this.center,this.innerRadius=e.innerRadius,this.outerRadius=e.outerRadius,this.scale=e.scale,this.rotation=e.rotation):(this.start=e.start,this.end=e.end),this.textureSpace=e.textureSpace,this.type=e.type,e.colorStops.forEach(r=>{this.addColorStop(r.offset,r.color)})}addColorStop(t,e){return this.colorStops.push({offset:t,color:me.shared.setValue(e).toHexa()}),this}buildLinearGradient(){if(this.texture)return;let{x:t,y:e}=this.start,{x:n,y:s}=this.end,r=n-t,a=s-e;const o=r<0||a<0;if(this._wrapMode==="clamp-to-edge"){if(r<0){const p=t;t=n,n=p,r*=-1}if(a<0){const p=e;e=s,s=p,a*=-1}}const l=this.colorStops.length?this.colorStops:nc,c=this._textureSize,{canvas:h,context:u}=sc(c,1),d=o?u.createLinearGradient(this._textureSize,0,0,0):u.createLinearGradient(0,0,this._textureSize,0);ic(d,l),u.fillStyle=d,u.fillRect(0,0,c,1),this.texture=new Zt({source:new Br({resource:h,addressMode:this._wrapMode})});const f=Math.sqrt(r*r+a*a),g=Math.atan2(a,r),_=new Bt;_.scale(f/c,1),_.rotate(g),_.translate(t,e),this.textureSpace==="local"&&_.scale(c,c),this.transform=_}buildGradient(){this.texture||this._tick++,this.type==="linear"?this.buildLinearGradient():this.buildRadialGradient()}buildRadialGradient(){if(this.texture)return;const t=this.colorStops.length?this.colorStops:nc,e=this._textureSize,{canvas:n,context:s}=sc(e,e),{x:r,y:a}=this.center,{x:o,y:l}=this.outerCenter,c=this.innerRadius,h=this.outerRadius,u=o-h,d=l-h,f=e/(h*2),g=(r-u)*f,_=(a-d)*f,p=s.createRadialGradient(g,_,c*f,(o-u)*f,(l-d)*f,h*f);ic(p,t),s.fillStyle=t[t.length-1].color,s.fillRect(0,0,e,e),s.fillStyle=p,s.translate(g,_),s.rotate(this.rotation),s.scale(1,this.scale),s.translate(-g,-_),s.fillRect(0,0,e,e),this.texture=new Zt({source:new Br({resource:n,addressMode:this._wrapMode})});const m=new Bt;m.scale(1/f,1/f),m.translate(u,d),this.textureSpace==="local"&&m.scale(e,e),this.transform=m}destroy(){var t;(t=this.texture)==null||t.destroy(!0),this.texture=null,this.transform=null,this.colorStops=[],this.start=null,this.end=null,this.center=null,this.outerCenter=null}get styleKey(){return`fill-gradient-${this.uid}-${this._tick}`}};il.defaultLinearOptions={start:{x:0,y:0},end:{x:0,y:1},colorStops:[],textureSpace:"local",type:"linear",textureSize:256,wrapMode:"clamp-to-edge"};il.defaultRadialOptions={center:{x:.5,y:.5},innerRadius:0,outerRadius:.5,colorStops:[],scale:1,textureSpace:"local",type:"radial",textureSize:256,wrapMode:"clamp-to-edge"};let In=il;function ic(i,t){for(let e=0;e<t.length;e++){const n=t[e];i.addColorStop(n.offset,n.color)}}function sc(i,t){const e=ze.get().createCanvas(i,t),n=e.getContext("2d");return{canvas:e,context:n}}function kp(i){var e,n;let t=(e=i[0])!=null?e:{};return(typeof t=="number"||i[1])&&(le("8.5.2","use options object instead"),t={type:"linear",start:{x:i[0],y:i[1]},end:{x:i[2],y:i[3]},textureSpace:i[4],textureSize:(n=i[5])!=null?n:In.defaultLinearOptions.textureSize}),t}const rc={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};class jr{constructor(t,e){this.uid=oe("fillPattern"),this._tick=0,this.transform=new Bt,this.texture=t,this.transform.scale(1/t.frame.width,1/t.frame.height),e&&(t.source.style.addressModeU=rc[e].addressModeU,t.source.style.addressModeV=rc[e].addressModeV)}setTransform(t){const e=this.texture;this.transform.copyFrom(t),this.transform.invert(),this.transform.scale(1/e.frame.width,1/e.frame.height),this._tick++}get texture(){return this._texture}set texture(t){this._texture!==t&&(this._texture=t,this._tick++)}get styleKey(){return`fill-pattern-${this.uid}-${this._tick}`}destroy(){this.texture.destroy(!0),this.texture=null}}var zp=Hp,va={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},Gp=/([astvzqmhlc])([^astvzqmhlc]*)/ig;function Hp(i){var t=[];return i.replace(Gp,function(e,n,s){var r=n.toLowerCase();for(s=Wp(s),r=="m"&&s.length>2&&(t.push([n].concat(s.splice(0,2))),r="l",n=n=="m"?"l":"L");;){if(s.length==va[r])return s.unshift(n),t.push(s);if(s.length<va[r])throw new Error("malformed path data");t.push([n].concat(s.splice(0,va[r])))}}),t}var Vp=/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;function Wp(i){var t=i.match(Vp);return t?t.map(Number):[]}const Xp=Fh(zp);function Yp(i,t){const e=Xp(i),n=[];let s=null,r=0,a=0;for(let o=0;o<e.length;o++){const l=e[o],c=l[0],h=l;switch(c){case"M":r=h[1],a=h[2],t.moveTo(r,a);break;case"m":r+=h[1],a+=h[2],t.moveTo(r,a);break;case"H":r=h[1],t.lineTo(r,a);break;case"h":r+=h[1],t.lineTo(r,a);break;case"V":a=h[1],t.lineTo(r,a);break;case"v":a+=h[1],t.lineTo(r,a);break;case"L":r=h[1],a=h[2],t.lineTo(r,a);break;case"l":r+=h[1],a+=h[2],t.lineTo(r,a);break;case"C":r=h[5],a=h[6],t.bezierCurveTo(h[1],h[2],h[3],h[4],r,a);break;case"c":t.bezierCurveTo(r+h[1],a+h[2],r+h[3],a+h[4],r+h[5],a+h[6]),r+=h[5],a+=h[6];break;case"S":r=h[3],a=h[4],t.bezierCurveToShort(h[1],h[2],r,a);break;case"s":t.bezierCurveToShort(r+h[1],a+h[2],r+h[3],a+h[4]),r+=h[3],a+=h[4];break;case"Q":r=h[3],a=h[4],t.quadraticCurveTo(h[1],h[2],r,a);break;case"q":t.quadraticCurveTo(r+h[1],a+h[2],r+h[3],a+h[4]),r+=h[3],a+=h[4];break;case"T":r=h[1],a=h[2],t.quadraticCurveToShort(r,a);break;case"t":r+=h[1],a+=h[2],t.quadraticCurveToShort(r,a);break;case"A":r=h[6],a=h[7],t.arcToSvg(h[1],h[2],h[3],h[4],h[5],r,a);break;case"a":r+=h[6],a+=h[7],t.arcToSvg(h[1],h[2],h[3],h[4],h[5],r,a);break;case"Z":case"z":t.closePath(),n.length>0&&(s=n.pop(),s?(r=s.startX,a=s.startY):(r=0,a=0)),s=null;break;default:Re(`Unknown SVG path command: ${c}`)}c!=="Z"&&c!=="z"&&s===null&&(s={startX:r,startY:a},n.push(s))}return t}class sl{constructor(t=0,e=0,n=0){this.type="circle",this.x=t,this.y=e,this.radius=n}clone(){return new sl(this.x,this.y,this.radius)}contains(t,e){if(this.radius<=0)return!1;const n=this.radius*this.radius;let s=this.x-t,r=this.y-e;return s*=s,r*=r,s+r<=n}strokeContains(t,e,n,s=.5){if(this.radius===0)return!1;const r=this.x-t,a=this.y-e,o=this.radius,l=(1-s)*n,c=Math.sqrt(r*r+a*a);return c<=o+l&&c>o-(n-l)}getBounds(t){return t||(t=new ce),t.x=this.x-this.radius,t.y=this.y-this.radius,t.width=this.radius*2,t.height=this.radius*2,t}copyFrom(t){return this.x=t.x,this.y=t.y,this.radius=t.radius,this}copyTo(t){return t.copyFrom(this),t}toString(){return`[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`}}class rl{constructor(t=0,e=0,n=0,s=0){this.type="ellipse",this.x=t,this.y=e,this.halfWidth=n,this.halfHeight=s}clone(){return new rl(this.x,this.y,this.halfWidth,this.halfHeight)}contains(t,e){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let n=(t-this.x)/this.halfWidth,s=(e-this.y)/this.halfHeight;return n*=n,s*=s,n+s<=1}strokeContains(t,e,n,s=.5){const{halfWidth:r,halfHeight:a}=this;if(r<=0||a<=0)return!1;const o=n*(1-s),l=n-o,c=r-l,h=a-l,u=r+o,d=a+o,f=t-this.x,g=e-this.y,_=f*f/(c*c)+g*g/(h*h),p=f*f/(u*u)+g*g/(d*d);return _>1&&p<=1}getBounds(t){return t||(t=new ce),t.x=this.x-this.halfWidth,t.y=this.y-this.halfHeight,t.width=this.halfWidth*2,t.height=this.halfHeight*2,t}copyFrom(t){return this.x=t.x,this.y=t.y,this.halfWidth=t.halfWidth,this.halfHeight=t.halfHeight,this}copyTo(t){return t.copyFrom(this),t}toString(){return`[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`}}function qp(i,t,e,n,s,r){const a=i-e,o=t-n,l=s-e,c=r-n,h=a*l+o*c,u=l*l+c*c;let d=-1;u!==0&&(d=h/u);let f,g;d<0?(f=e,g=n):d>1?(f=s,g=r):(f=e+d*l,g=n+d*c);const _=i-f,p=t-g;return _*_+p*p}let $p,jp;class Ts{constructor(...t){this.type="polygon";let e=Array.isArray(t[0])?t[0]:t;if(typeof e[0]!="number"){const n=[];for(let s=0,r=e.length;s<r;s++)n.push(e[s].x,e[s].y);e=n}this.points=e,this.closePath=!0}isClockwise(){let t=0;const e=this.points,n=e.length;for(let s=0;s<n;s+=2){const r=e[s],a=e[s+1],o=e[(s+2)%n],l=e[(s+3)%n];t+=(o-r)*(l+a)}return t<0}containsPolygon(t){const e=this.getBounds($p),n=t.getBounds(jp);if(!e.containsRect(n))return!1;const s=t.points;for(let r=0;r<s.length;r+=2){const a=s[r],o=s[r+1];if(!this.contains(a,o))return!1}return!0}clone(){const t=this.points.slice(),e=new Ts(t);return e.closePath=this.closePath,e}contains(t,e){let n=!1;const s=this.points.length/2;for(let r=0,a=s-1;r<s;a=r++){const o=this.points[r*2],l=this.points[r*2+1],c=this.points[a*2],h=this.points[a*2+1];l>e!=h>e&&t<(c-o)*((e-l)/(h-l))+o&&(n=!n)}return n}strokeContains(t,e,n,s=.5){const r=n*n,a=r*(1-s),o=r-a,{points:l}=this,c=l.length-(this.closePath?0:2);for(let h=0;h<c;h+=2){const u=l[h],d=l[h+1],f=l[(h+2)%l.length],g=l[(h+3)%l.length],_=qp(t,e,u,d,f,g),p=Math.sign((f-u)*(e-d)-(g-d)*(t-u));if(_<=(p<0?o:a))return!0}return!1}getBounds(t){t||(t=new ce);const e=this.points;let n=1/0,s=-1/0,r=1/0,a=-1/0;for(let o=0,l=e.length;o<l;o+=2){const c=e[o],h=e[o+1];n=c<n?c:n,s=c>s?c:s,r=h<r?h:r,a=h>a?h:a}return t.x=n,t.width=s-n,t.y=r,t.height=a-r,t}copyFrom(t){return this.points=t.points.slice(),this.closePath=t.closePath,this}copyTo(t){return t.copyFrom(this),t}toString(){return`[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t,e)=>`${t}, ${e}`,"")}]`}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return le("8.11.0","Polygon.lastX is deprecated, please use Polygon.lastX instead."),this.points[this.points.length-2]}get y(){return le("8.11.0","Polygon.y is deprecated, please use Polygon.lastY instead."),this.points[this.points.length-1]}get startX(){return this.points[0]}get startY(){return this.points[1]}}const ir=(i,t,e,n,s,r,a)=>{const o=i-e,l=t-n,c=Math.sqrt(o*o+l*l);return c>=s-r&&c<=s+a};class al{constructor(t=0,e=0,n=0,s=0,r=20){this.type="roundedRectangle",this.x=t,this.y=e,this.width=n,this.height=s,this.radius=r}getBounds(t){return t||(t=new ce),t.x=this.x,t.y=this.y,t.width=this.width,t.height=this.height,t}clone(){return new al(this.x,this.y,this.width,this.height,this.radius)}copyFrom(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this}copyTo(t){return t.copyFrom(this),t}contains(t,e){if(this.width<=0||this.height<=0)return!1;if(t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height){const n=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(e>=this.y+n&&e<=this.y+this.height-n||t>=this.x+n&&t<=this.x+this.width-n)return!0;let s=t-(this.x+n),r=e-(this.y+n);const a=n*n;if(s*s+r*r<=a||(s=t-(this.x+this.width-n),s*s+r*r<=a)||(r=e-(this.y+this.height-n),s*s+r*r<=a)||(s=t-(this.x+n),s*s+r*r<=a))return!0}return!1}strokeContains(t,e,n,s=.5){const{x:r,y:a,width:o,height:l,radius:c}=this,h=n*(1-s),u=n-h,d=r+c,f=a+c,g=o-c*2,_=l-c*2,p=r+o,m=a+l;return(t>=r-h&&t<=r+u||t>=p-u&&t<=p+h)&&e>=f&&e<=f+_||(e>=a-h&&e<=a+u||e>=m-u&&e<=m+h)&&t>=d&&t<=d+g?!0:t<d&&e<f&&ir(t,e,d,f,c,u,h)||t>p-c&&e<f&&ir(t,e,p-c,f,c,u,h)||t>p-c&&e>m-c&&ir(t,e,p-c,m-c,c,u,h)||t<d&&e>m-c&&ir(t,e,d,m-c,c,u,h)}toString(){return`[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`}}const Bu={};function Kp(i,t,e){let n=2166136261;for(let s=0;s<t;s++)n^=i[s].uid,n=Math.imul(n,16777619),n>>>=0;return Bu[n]||Zp(i,t,n,e)}function Zp(i,t,e,n){const s={};let r=0;for(let o=0;o<n;o++){const l=o<t?i[o]:Zt.EMPTY.source;s[r++]=l.source,s[r++]=l.style}const a=new Rr(s);return Bu[e]=a,a}class ac{constructor(t){typeof t=="number"?this.rawBinaryData=new ArrayBuffer(t):t instanceof Uint8Array?this.rawBinaryData=t.buffer:this.rawBinaryData=t,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(t){return this[`${t}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(t){switch(t){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${t} isn't a valid view type`)}}}function oc(i,t){const e=i.byteLength/8|0,n=new Float64Array(i,0,e);new Float64Array(t,0,e).set(n);const r=i.byteLength-e*8;if(r>0){const a=new Uint8Array(i,e*8,r);new Uint8Array(t,e*8,r).set(a)}}const Jp={normal:"normal-npm",add:"add-npm",screen:"screen-npm"};var Qp=(i=>(i[i.DISABLED=0]="DISABLED",i[i.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",i[i.MASK_ACTIVE=2]="MASK_ACTIVE",i[i.INVERSE_MASK_ACTIVE=3]="INVERSE_MASK_ACTIVE",i[i.RENDERING_MASK_REMOVE=4]="RENDERING_MASK_REMOVE",i[i.NONE=5]="NONE",i))(Qp||{});function lc(i,t){return t.alphaMode==="no-premultiply-alpha"&&Jp[i]||i}const tm=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function em(i){let t="";for(let e=0;e<i;++e)e>0&&(t+=`
else `),e<i-1&&(t+=`if(test == ${e}.0){}`);return t}function nm(i,t){if(i===0)throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");const e=t.createShader(t.FRAGMENT_SHADER);try{for(;;){const n=tm.replace(/%forloop%/gi,em(i));if(t.shaderSource(e,n),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS))i=i/2|0;else break}}finally{t.deleteShader(e)}return i}let yi=null;function im(){var t;if(yi)return yi;const i=xu();return yi=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),yi=nm(yi,i),(t=i.getExtension("WEBGL_lose_context"))==null||t.loseContext(),yi}class sm{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let t=0;t<this.count;t++){const e=this.textures[t];this.textures[t]=null,this.ids[e.uid]=null}this.count=0}}class rm{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.textures=new sm,this.blendMode="normal",this.topology="triangle-strip",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}const As=[];let kr=0;Os.register({clear:()=>{if(As.length>0)for(const i of As)i&&i.destroy();As.length=0,kr=0}});function cc(){return kr>0?As[--kr]:new rm}function hc(i){As[kr++]=i}let hs=0;const ku=class zu{constructor(t){this.uid=oe("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._elements=[],t={...zu.defaultOptions,...t},t.maxTextures||(le("v8.8.0","maxTextures is a required option for Batcher now, please pass it in the options"),t.maxTextures=im());const{maxTextures:e,attributesInitialSize:n,indicesInitialSize:s}=t;this.attributeBuffer=new ac(n*4),this.indexBuffer=new Uint16Array(s),this.maxTextures=e}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let t=0;t<this.batchIndex;t++)hc(this.batches[t]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(t){this._elements[this.elementSize++]=t,t._indexStart=this.indexSize,t._attributeStart=this.attributeSize,t._batcher=this,this.indexSize+=t.indexSize,this.attributeSize+=t.attributeSize*this.vertexSize}checkAndUpdateTexture(t,e){const n=t._batch.textures.ids[e._source.uid];return!n&&n!==0?!1:(t._textureId=n,t.texture=e,!0)}updateElement(t){this.dirty=!0;const e=this.attributeBuffer;t.packAsQuad?this.packQuadAttributes(t,e.float32View,e.uint32View,t._attributeStart,t._textureId):this.packAttributes(t,e.float32View,e.uint32View,t._attributeStart,t._textureId)}break(t){const e=this._elements;if(!e[this.elementStart])return;let n=cc(),s=n.textures;s.clear();const r=e[this.elementStart];let a=lc(r.blendMode,r.texture._source),o=r.topology;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const l=this.attributeBuffer.float32View,c=this.attributeBuffer.uint32View,h=this.indexBuffer;let u=this._batchIndexSize,d=this._batchIndexStart,f="startBatch";const g=this.maxTextures;for(let _=this.elementStart;_<this.elementSize;++_){const p=e[_];e[_]=null;const y=p.texture._source,x=lc(p.blendMode,y),S=a!==x||o!==p.topology;if(y._batchTick===hs&&!S){p._textureId=y._textureBindLocation,u+=p.indexSize,p.packAsQuad?(this.packQuadAttributes(p,l,c,p._attributeStart,p._textureId),this.packQuadIndex(h,p._indexStart,p._attributeStart/this.vertexSize)):(this.packAttributes(p,l,c,p._attributeStart,p._textureId),this.packIndex(p,h,p._indexStart,p._attributeStart/this.vertexSize)),p._batch=n;continue}y._batchTick=hs,(s.count>=g||S)&&(this._finishBatch(n,d,u-d,s,a,o,t,f),f="renderBatch",d=u,a=x,o=p.topology,n=cc(),s=n.textures,s.clear(),++hs),p._textureId=y._textureBindLocation=s.count,s.ids[y.uid]=s.count,s.textures[s.count++]=y,p._batch=n,u+=p.indexSize,p.packAsQuad?(this.packQuadAttributes(p,l,c,p._attributeStart,p._textureId),this.packQuadIndex(h,p._indexStart,p._attributeStart/this.vertexSize)):(this.packAttributes(p,l,c,p._attributeStart,p._textureId),this.packIndex(p,h,p._indexStart,p._attributeStart/this.vertexSize))}s.count>0&&(this._finishBatch(n,d,u-d,s,a,o,t,f),d=u,++hs),this.elementStart=this.elementSize,this._batchIndexStart=d,this._batchIndexSize=u}_finishBatch(t,e,n,s,r,a,o,l){t.gpuBindGroup=null,t.bindGroup=null,t.action=l,t.batcher=this,t.textures=s,t.blendMode=r,t.topology=a,t.start=e,t.size=n,++hs,this.batches[this.batchIndex++]=t,o.add(t)}finish(t){this.break(t)}ensureAttributeBuffer(t){t*4<=this.attributeBuffer.size||this._resizeAttributeBuffer(t*4)}ensureIndexBuffer(t){t<=this.indexBuffer.length||this._resizeIndexBuffer(t)}_resizeAttributeBuffer(t){const e=Math.max(t,this.attributeBuffer.size*2),n=new ac(e);oc(this.attributeBuffer.rawBinaryData,n.rawBinaryData),this.attributeBuffer=n}_resizeIndexBuffer(t){const e=this.indexBuffer;let n=Math.max(t,e.length*1.5);n+=n%2;const s=n>65535?new Uint32Array(n):new Uint16Array(n);if(s.BYTES_PER_ELEMENT!==e.BYTES_PER_ELEMENT)for(let r=0;r<e.length;r++)s[r]=e[r];else oc(e.buffer,s.buffer);this.indexBuffer=s}packQuadIndex(t,e,n){t[e]=n+0,t[e+1]=n+1,t[e+2]=n+2,t[e+3]=n+0,t[e+4]=n+2,t[e+5]=n+3}packIndex(t,e,n,s){const r=t.indices,a=t.indexSize,o=t.indexOffset,l=t.attributeOffset;for(let c=0;c<a;c++)e[n++]=s+r[c+o]-l}destroy(){if(this.batches!==null){for(let t=0;t<this.batches.length;t++)hc(this.batches[t]);this.batches=null;for(let t=0;t<this._elements.length;t++)this._elements[t]&&(this._elements[t]._batch=null);this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}};ku.defaultOptions={maxTextures:null,attributesInitialSize:4,indicesInitialSize:6};let am=ku;var Ie=(i=>(i[i.MAP_READ=1]="MAP_READ",i[i.MAP_WRITE=2]="MAP_WRITE",i[i.COPY_SRC=4]="COPY_SRC",i[i.COPY_DST=8]="COPY_DST",i[i.INDEX=16]="INDEX",i[i.VERTEX=32]="VERTEX",i[i.UNIFORM=64]="UNIFORM",i[i.STORAGE=128]="STORAGE",i[i.INDIRECT=256]="INDIRECT",i[i.QUERY_RESOLVE=512]="QUERY_RESOLVE",i[i.STATIC=1024]="STATIC",i))(Ie||{});class Us extends gn{constructor(t){let{data:e,size:n}=t;const{usage:s,label:r,shrinkToFit:a}=t;super(),this.uid=oe("buffer"),this._resourceType="buffer",this._resourceId=oe("resource"),this._touched=0,this._updateID=1,this._dataInt32=null,this.shrinkToFit=!0,this.destroyed=!1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,n!=null||(n=e==null?void 0:e.byteLength);const o=!!e;this.descriptor={size:n,usage:s,mappedAtCreation:o,label:r},this.shrinkToFit=a!=null?a:!0}get data(){return this._data}set data(t){this.setDataWithSize(t,t.length,!0)}get dataInt32(){return this._dataInt32||(this._dataInt32=new Int32Array(this.data.buffer)),this._dataInt32}get static(){return!!(this.descriptor.usage&Ie.STATIC)}set static(t){t?this.descriptor.usage|=Ie.STATIC:this.descriptor.usage&=~Ie.STATIC}setDataWithSize(t,e,n){if(this._updateID++,this._updateSize=e*t.BYTES_PER_ELEMENT,this._data===t){n&&this.emit("update",this);return}const s=this._data;if(this._data=t,this._dataInt32=null,!s||s.length!==t.length){!this.shrinkToFit&&s&&t.byteLength<s.byteLength?n&&this.emit("update",this):(this.descriptor.size=t.byteLength,this._resourceId=oe("resource"),this.emit("change",this));return}n&&this.emit("update",this)}update(t){this._updateSize=t!=null?t:this._updateSize,this._updateID++,this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this.emit("change",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}function Gu(i,t){if(!(i instanceof Us)){let e=t?Ie.INDEX:Ie.VERTEX;i instanceof Array&&(t?(i=new Uint32Array(i),e=Ie.INDEX|Ie.COPY_DST):(i=new Float32Array(i),e=Ie.VERTEX|Ie.COPY_DST)),i=new Us({data:i,label:t?"index-mesh-buffer":"vertex-mesh-buffer",usage:e})}return i}function om(i,t,e){const n=i.getAttribute(t);if(!n)return e.minX=0,e.minY=0,e.maxX=0,e.maxY=0,e;const s=n.buffer.data;let r=1/0,a=1/0,o=-1/0,l=-1/0;const c=s.BYTES_PER_ELEMENT,h=(n.offset||0)/c,u=(n.stride||2*4)/c;for(let d=h;d<s.length;d+=u){const f=s[d],g=s[d+1];f>o&&(o=f),g>l&&(l=g),f<r&&(r=f),g<a&&(a=g)}return e.minX=r,e.minY=a,e.maxX=o,e.maxY=l,e}function lm(i){return(i instanceof Us||Array.isArray(i)||i.BYTES_PER_ELEMENT)&&(i={buffer:i}),i.buffer=Gu(i.buffer,!1),i}class cm extends gn{constructor(t={}){var r;super(),this.uid=oe("geometry"),this._layoutKey=0,this.instanceCount=1,this._bounds=new sn,this._boundsDirty=!0;const{attributes:e,indexBuffer:n,topology:s}=t;if(this.buffers=[],this.attributes={},e)for(const a in e)this.addAttribute(a,e[a]);this.instanceCount=(r=t.instanceCount)!=null?r:1,n&&this.addIndex(n),this.topology=s||"triangle-list"}onBufferUpdate(){this._boundsDirty=!0,this.emit("update",this)}getAttribute(t){return this.attributes[t]}getIndex(){return this.indexBuffer}getBuffer(t){return this.getAttribute(t).buffer}getSize(){for(const t in this.attributes){const e=this.attributes[t];return e.buffer.data.length/(e.stride/4||e.size)}return 0}addAttribute(t,e){const n=lm(e);this.buffers.indexOf(n.buffer)===-1&&(this.buffers.push(n.buffer),n.buffer.on("update",this.onBufferUpdate,this),n.buffer.on("change",this.onBufferUpdate,this)),this.attributes[t]=n}addIndex(t){this.indexBuffer=Gu(t,!0),this.buffers.push(this.indexBuffer)}get bounds(){return this._boundsDirty?(this._boundsDirty=!1,om(this,"aPosition",this._bounds)):this._bounds}destroy(t=!1){this.emit("destroy",this),this.removeAllListeners(),t&&this.buffers.forEach(e=>e.destroy()),this.attributes=null,this.buffers=null,this.indexBuffer=null,this._bounds=null}}const hm=new Float32Array(1),um=new Uint32Array(1);class dm extends cm{constructor(){const e=new Us({data:hm,label:"attribute-batch-buffer",usage:Ie.VERTEX|Ie.COPY_DST,shrinkToFit:!1}),n=new Us({data:um,label:"index-batch-buffer",usage:Ie.INDEX|Ie.COPY_DST,shrinkToFit:!1}),s=6*4;super({attributes:{aPosition:{buffer:e,format:"float32x2",stride:s,offset:0},aUV:{buffer:e,format:"float32x2",stride:s,offset:2*4},aColor:{buffer:e,format:"unorm8x4",stride:s,offset:4*4},aTextureIdAndRound:{buffer:e,format:"uint16x2",stride:s,offset:5*4}},indexBuffer:n})}}function uc(i,t,e){if(i)for(const n in i){const s=n.toLocaleLowerCase(),r=t[s];if(r){let a=i[n];n==="header"&&(a=a.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),e&&r.push(`//----${e}----//`),r.push(a)}else Re(`${n} placement hook does not exist in shader`)}}const fm=/\{\{(.*?)\}\}/g;function dc(i){var n,s;const t={};return((s=(n=i.match(fm))==null?void 0:n.map(r=>r.replace(/[{()}]/g,"")))!=null?s:[]).forEach(r=>{t[r]=[]}),t}function fc(i,t){let e;const n=/@in\s+([^;]+);/g;for(;(e=n.exec(i))!==null;)t.push(e[1])}function pc(i,t,e=!1){const n=[];fc(t,n),i.forEach(o=>{o.header&&fc(o.header,n)});const s=n;e&&s.sort();const r=s.map((o,l)=>`       @location(${l}) ${o},`).join(`
`);let a=t.replace(/@in\s+[^;]+;\s*/g,"");return a=a.replace("{{in}}",`
${r}
`),a}function mc(i,t){let e;const n=/@out\s+([^;]+);/g;for(;(e=n.exec(i))!==null;)t.push(e[1])}function pm(i){const e=/\b(\w+)\s*:/g.exec(i);return e?e[1]:""}function mm(i){const t=/@.*?\s+/g;return i.replace(t,"")}function gm(i,t){const e=[];mc(t,e),i.forEach(l=>{l.header&&mc(l.header,e)});let n=0;const s=e.sort().map(l=>l.indexOf("builtin")>-1?l:`@location(${n++}) ${l}`).join(`,
`),r=e.sort().map(l=>`       var ${mm(l)};`).join(`
`),a=`return VSOutput(
            ${e.sort().map(l=>` ${pm(l)}`).join(`,
`)});`;let o=t.replace(/@out\s+[^;]+;\s*/g,"");return o=o.replace("{{struct}}",`
${s}
`),o=o.replace("{{start}}",`
${r}
`),o=o.replace("{{return}}",`
${a}
`),o}function gc(i,t){let e=i;for(const n in t){const s=t[n];s.join(`
`).length?e=e.replace(`{{${n}}}`,`//-----${n} START-----//
${s.join(`
`)}
//----${n} FINISH----//`):e=e.replace(`{{${n}}}`,"")}return e}const Gn=Object.create(null),ya=new Map;let _m=0;function xm({template:i,bits:t}){const e=Hu(i,t);if(Gn[e])return Gn[e];const{vertex:n,fragment:s}=ym(i,t);return Gn[e]=Vu(n,s,t),Gn[e]}function vm({template:i,bits:t}){const e=Hu(i,t);return Gn[e]||(Gn[e]=Vu(i.vertex,i.fragment,t)),Gn[e]}function ym(i,t){const e=t.map(a=>a.vertex).filter(a=>!!a),n=t.map(a=>a.fragment).filter(a=>!!a);let s=pc(e,i.vertex,!0);s=gm(e,s);const r=pc(n,i.fragment,!0);return{vertex:s,fragment:r}}function Hu(i,t){return t.map(e=>(ya.has(e)||ya.set(e,_m++),ya.get(e))).sort((e,n)=>e-n).join("-")+i.vertex+i.fragment}function Vu(i,t,e){const n=dc(i),s=dc(t);return e.forEach(r=>{uc(r.vertex,n,r.name),uc(r.fragment,s,r.name)}),{vertex:gc(i,n),fragment:gc(t,s)}}const Sm=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}

        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);

        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,Mm=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;

    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {

        {{start}}

        var outColor:vec4<f32>;

        {{main}}

        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,bm=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;

        {{start}}

        vColor = vec4(1.);

        {{main}}

        vUV = uv;

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,Em=`

    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {

        {{start}}

        vec4 outColor;

        {{main}}

        finalColor = outColor * vColor;

        {{end}}
    }
`,Tm={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},Am={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function wm({bits:i,name:t}){const e=xm({template:{fragment:Mm,vertex:Sm},bits:[Tm,...i]});return $r.from({name:t,vertex:{source:e.vertex,entryPoint:"main"},fragment:{source:e.fragment,entryPoint:"main"}})}function Cm({bits:i,name:t}){return new yu({name:t,...vm({template:{vertex:bm,fragment:Em},bits:[Am,...i]})})}const Rm={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},Pm={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},Sa={};function Im(i){const t=[];if(i===1)t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),t.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let e=0;for(let n=0;n<i;n++)t.push(`@group(1) @binding(${e++}) var textureSource${n+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${n+1}: sampler;`)}return t.join(`
`)}function Lm(i){const t=[];if(i===1)t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{t.push("switch vTextureId {");for(let e=0;e<i;e++)e===i-1?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");t.push("}")}return t.join(`
`)}function Dm(i){return Sa[i]||(Sa[i]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${Im(i)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${Lm(i)}
            `}}),Sa[i]}const Ma={};function Um(i){const t=[];for(let e=0;e<i;e++)e>0&&t.push("else"),e<i-1&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join(`
`)}function Nm(i){return Ma[i]||(Ma[i]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${i}];

            `,main:`

                ${Um(i)}
            `}}),Ma[i]}const Fm={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},Om={name:"round-pixels-bit",vertex:{header:`
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},_c={};function Bm(i){let t=_c[i];if(t)return t;const e=new Int32Array(i);for(let n=0;n<i;n++)e[n]=n;return t=_c[i]=new Eu({uTextures:{value:e,type:"i32",size:i}},{isStatic:!0}),t}class km extends nl{constructor(t){const e=Cm({name:"batch",bits:[Pm,Nm(t),Om]}),n=wm({name:"batch",bits:[Rm,Dm(t),Fm]});super({glProgram:e,gpuProgram:n,resources:{batchSamplers:Bm(t)}})}}let us=null;const Wu=class Xu extends am{constructor(t){super(t),this.geometry=new dm,this.name=Xu.extension.name,this.vertexSize=6,us!=null||(us=new km(t.maxTextures)),this.shader=us}packAttributes(t,e,n,s,r){const a=r<<16|t.roundPixels&65535,o=t.transform,l=o.a,c=o.b,h=o.c,u=o.d,d=o.tx,f=o.ty,{positions:g,uvs:_}=t,p=t.color,m=t.attributeOffset,y=m+t.attributeSize;for(let x=m;x<y;x++){const S=x*2,R=g[S],T=g[S+1];e[s++]=l*R+h*T+d,e[s++]=u*T+c*R+f,e[s++]=_[S],e[s++]=_[S+1],n[s++]=p,n[s++]=a}}packQuadAttributes(t,e,n,s,r){const a=t.texture,o=t.transform,l=o.a,c=o.b,h=o.c,u=o.d,d=o.tx,f=o.ty,g=t.bounds,_=g.maxX,p=g.minX,m=g.maxY,y=g.minY,x=a.uvs,S=t.color,R=r<<16|t.roundPixels&65535;e[s+0]=l*p+h*y+d,e[s+1]=u*y+c*p+f,e[s+2]=x.x0,e[s+3]=x.y0,n[s+4]=S,n[s+5]=R,e[s+6]=l*_+h*y+d,e[s+7]=u*y+c*_+f,e[s+8]=x.x1,e[s+9]=x.y1,n[s+10]=S,n[s+11]=R,e[s+12]=l*_+h*m+d,e[s+13]=u*m+c*_+f,e[s+14]=x.x2,e[s+15]=x.y2,n[s+16]=S,n[s+17]=R,e[s+18]=l*p+h*m+d,e[s+19]=u*m+c*p+f,e[s+20]=x.x3,e[s+21]=x.y3,n[s+22]=S,n[s+23]=R}};Wu.extension={type:[jt.Batcher],name:"default"};let zm=Wu;function Gm(i,t,e,n,s,r,a,o=null){let l=0;e*=t,s*=r;const c=o.a,h=o.b,u=o.c,d=o.d,f=o.tx,g=o.ty;for(;l<a;){const _=i[e],p=i[e+1];n[s]=c*_+u*p+f,n[s+1]=h*_+d*p+g,s+=r,e+=t,l++}}function Hm(i,t,e,n){let s=0;for(t*=e;s<n;)i[t]=0,i[t+1]=0,t+=e,s++}function Yu(i,t,e,n,s){const r=t.a,a=t.b,o=t.c,l=t.d,c=t.tx,h=t.ty;e||(e=0),n||(n=2),s||(s=i.length/n-e);let u=e*n;for(let d=0;d<s;d++){const f=i[u],g=i[u+1];i[u]=r*f+o*g+c,i[u+1]=a*f+l*g+h,u+=n}}const Vm=new Bt;class qu{constructor(){this.packAsQuad=!1,this.batcherName="default",this.topology="triangle-list",this.applyTransform=!0,this.roundPixels=0,this._batcher=null,this._batch=null}get uvs(){return this.geometryData.uvs}get positions(){return this.geometryData.vertices}get indices(){return this.geometryData.indices}get blendMode(){return this.renderable&&this.applyTransform?this.renderable.groupBlendMode:"normal"}get color(){const t=this.baseColor,e=t>>16|t&65280|(t&255)<<16,n=this.renderable;return n?Kh(e,n.groupColor)+(this.alpha*n.groupAlpha*255<<24):e+(this.alpha*255<<24)}get transform(){var t;return((t=this.renderable)==null?void 0:t.groupTransform)||Vm}copyTo(t){t.indexOffset=this.indexOffset,t.indexSize=this.indexSize,t.attributeOffset=this.attributeOffset,t.attributeSize=this.attributeSize,t.baseColor=this.baseColor,t.alpha=this.alpha,t.texture=this.texture,t.geometryData=this.geometryData,t.topology=this.topology}reset(){this.applyTransform=!0,this.renderable=null,this.topology="triangle-list"}destroy(){this.renderable=null,this.texture=null,this.geometryData=null,this._batcher=null,this._batch=null}}const Ns={extension:{type:jt.ShapeBuilder,name:"circle"},build(i,t){let e,n,s,r,a,o;if(i.type==="circle"){const S=i;if(a=o=S.radius,a<=0)return!1;e=S.x,n=S.y,s=r=0}else if(i.type==="ellipse"){const S=i;if(a=S.halfWidth,o=S.halfHeight,a<=0||o<=0)return!1;e=S.x,n=S.y,s=r=0}else{const S=i,R=S.width/2,T=S.height/2;e=S.x+R,n=S.y+T,a=o=Math.max(0,Math.min(S.radius,Math.min(R,T))),s=R-a,r=T-o}if(s<0||r<0)return!1;const l=Math.ceil(2.3*Math.sqrt(a+o)),c=l*8+(s?4:0)+(r?4:0);if(c===0)return!1;if(l===0)return t[0]=t[6]=e+s,t[1]=t[3]=n+r,t[2]=t[4]=e-s,t[5]=t[7]=n-r,!0;let h=0,u=l*4+(s?2:0)+2,d=u,f=c,g=s+a,_=r,p=e+g,m=e-g,y=n+_;if(t[h++]=p,t[h++]=y,t[--u]=y,t[--u]=m,r){const S=n-_;t[d++]=m,t[d++]=S,t[--f]=S,t[--f]=p}for(let S=1;S<l;S++){const R=Math.PI/2*(S/l),T=s+Math.cos(R)*a,A=r+Math.sin(R)*o,I=e+T,b=e-T,v=n+A,w=n-A;t[h++]=I,t[h++]=v,t[--u]=v,t[--u]=b,t[d++]=b,t[d++]=w,t[--f]=w,t[--f]=I}g=s,_=r+o,p=e+g,m=e-g,y=n+_;const x=n-_;return t[h++]=p,t[h++]=y,t[--f]=x,t[--f]=p,s&&(t[h++]=m,t[h++]=y,t[--f]=x,t[--f]=m),!0},triangulate(i,t,e,n,s,r){if(i.length===0)return;let a=0,o=0;for(let h=0;h<i.length;h+=2)a+=i[h],o+=i[h+1];a/=i.length/2,o/=i.length/2;let l=n;t[l*e]=a,t[l*e+1]=o;const c=l++;for(let h=0;h<i.length;h+=2)t[l*e]=i[h],t[l*e+1]=i[h+1],h>0&&(s[r++]=l,s[r++]=c,s[r++]=l-1),l++;s[r++]=c+1,s[r++]=c,s[r++]=l-1}},Wm={...Ns,extension:{...Ns.extension,name:"ellipse"}},Xm={...Ns,extension:{...Ns.extension,name:"roundedRectangle"}},$u=1e-4,xc=1e-4;function Ym(i){const t=i.length;if(t<6)return 1;let e=0;for(let n=0,s=i[t-2],r=i[t-1];n<t;n+=2){const a=i[n],o=i[n+1];e+=(a-s)*(o+r),s=a,r=o}return e<0?-1:1}function vc(i,t,e,n,s,r,a,o){const l=i-e*s,c=t-n*s,h=i+e*r,u=t+n*r;let d,f;a?(d=n,f=-e):(d=-n,f=e);const g=l+d,_=c+f,p=h+d,m=u+f;return o.push(g,_),o.push(p,m),2}function Kn(i,t,e,n,s,r,a,o){const l=e-i,c=n-t;let h=Math.atan2(l,c),u=Math.atan2(s-i,r-t);o&&h<u?h+=Math.PI*2:!o&&h>u&&(u+=Math.PI*2);let d=h;const f=u-h,g=Math.abs(f),_=Math.sqrt(l*l+c*c),p=(15*g*Math.sqrt(_)/Math.PI>>0)+1,m=f/p;if(d+=m,o){a.push(i,t),a.push(e,n);for(let y=1,x=d;y<p;y++,x+=m)a.push(i,t),a.push(i+Math.sin(x)*_,t+Math.cos(x)*_);a.push(i,t),a.push(s,r)}else{a.push(e,n),a.push(i,t);for(let y=1,x=d;y<p;y++,x+=m)a.push(i+Math.sin(x)*_,t+Math.cos(x)*_),a.push(i,t);a.push(s,r),a.push(i,t)}return p*2}function qm(i,t,e,n,s,r){const a=$u;if(i.length===0)return;const o=t;let l=o.alignment;if(t.alignment!==.5){let J=Ym(i);l=(l-.5)*J+.5}const c=new Te(i[0],i[1]),h=new Te(i[i.length-2],i[i.length-1]),u=n,d=Math.abs(c.x-h.x)<a&&Math.abs(c.y-h.y)<a;if(u){i=i.slice(),d&&(i.pop(),i.pop(),h.set(i[i.length-2],i[i.length-1]));const J=(c.x+h.x)*.5,rt=(h.y+c.y)*.5;i.unshift(J,rt),i.push(J,rt)}const f=s,g=i.length/2;let _=i.length;const p=f.length/2,m=o.width/2,y=m*m,x=o.miterLimit*o.miterLimit;let S=i[0],R=i[1],T=i[2],A=i[3],I=0,b=0,v=-(R-A),w=S-T,B=0,F=0,O=Math.sqrt(v*v+w*w);v/=O,w/=O,v*=m,w*=m;const Y=l,L=(1-Y)*2,H=Y*2;u||(o.cap==="round"?_+=Kn(S-v*(L-H)*.5,R-w*(L-H)*.5,S-v*L,R-w*L,S+v*H,R+w*H,f,!0)+2:o.cap==="square"&&(_+=vc(S,R,v,w,L,H,!0,f))),f.push(S-v*L,R-w*L),f.push(S+v*H,R+w*H);for(let J=1;J<g-1;++J){S=i[(J-1)*2],R=i[(J-1)*2+1],T=i[J*2],A=i[J*2+1],I=i[(J+1)*2],b=i[(J+1)*2+1],v=-(R-A),w=S-T,O=Math.sqrt(v*v+w*w),v/=O,w/=O,v*=m,w*=m,B=-(A-b),F=T-I,O=Math.sqrt(B*B+F*F),B/=O,F/=O,B*=m,F*=m;const rt=T-S,dt=R-A,It=T-I,kt=b-A,X=rt*It+dt*kt,Q=dt*It-kt*rt,ct=Q<0;if(Math.abs(Q)<.001*Math.abs(X)){f.push(T-v*L,A-w*L),f.push(T+v*H,A+w*H),X>=0&&(o.join==="round"?_+=Kn(T,A,T-v*L,A-w*L,T-B*L,A-F*L,f,!1)+4:_+=2,f.push(T-B*H,A-F*H),f.push(T+B*L,A+F*L));continue}const lt=(-v+S)*(-w+A)-(-v+T)*(-w+R),St=(-B+I)*(-F+A)-(-B+T)*(-F+b),Mt=(rt*St-It*lt)/Q,Pt=(kt*lt-dt*St)/Q,Qt=(Mt-T)*(Mt-T)+(Pt-A)*(Pt-A),P=T+(Mt-T)*L,Kt=A+(Pt-A)*L,Ft=T-(Mt-T)*H,Ot=A-(Pt-A)*H,xt=Math.min(rt*rt+dt*dt,It*It+kt*kt),ee=ct?L:H,Tt=xt+ee*ee*y;Qt<=Tt?o.join==="bevel"||Qt/y>x?(ct?(f.push(P,Kt),f.push(T+v*H,A+w*H),f.push(P,Kt),f.push(T+B*H,A+F*H)):(f.push(T-v*L,A-w*L),f.push(Ft,Ot),f.push(T-B*L,A-F*L),f.push(Ft,Ot)),_+=2):o.join==="round"?ct?(f.push(P,Kt),f.push(T+v*H,A+w*H),_+=Kn(T,A,T+v*H,A+w*H,T+B*H,A+F*H,f,!0)+4,f.push(P,Kt),f.push(T+B*H,A+F*H)):(f.push(T-v*L,A-w*L),f.push(Ft,Ot),_+=Kn(T,A,T-v*L,A-w*L,T-B*L,A-F*L,f,!1)+4,f.push(T-B*L,A-F*L),f.push(Ft,Ot)):(f.push(P,Kt),f.push(Ft,Ot)):(f.push(T-v*L,A-w*L),f.push(T+v*H,A+w*H),o.join==="round"?ct?_+=Kn(T,A,T+v*H,A+w*H,T+B*H,A+F*H,f,!0)+2:_+=Kn(T,A,T-v*L,A-w*L,T-B*L,A-F*L,f,!1)+2:o.join==="miter"&&Qt/y<=x&&(ct?(f.push(Ft,Ot),f.push(Ft,Ot)):(f.push(P,Kt),f.push(P,Kt)),_+=2),f.push(T-B*L,A-F*L),f.push(T+B*H,A+F*H),_+=2)}S=i[(g-2)*2],R=i[(g-2)*2+1],T=i[(g-1)*2],A=i[(g-1)*2+1],v=-(R-A),w=S-T,O=Math.sqrt(v*v+w*w),v/=O,w/=O,v*=m,w*=m,f.push(T-v*L,A-w*L),f.push(T+v*H,A+w*H),u||(o.cap==="round"?_+=Kn(T-v*(L-H)*.5,A-w*(L-H)*.5,T-v*L,A-w*L,T+v*H,A+w*H,f,!1)+2:o.cap==="square"&&(_+=vc(T,A,v,w,L,H,!1,f)));const W=xc*xc;for(let J=p;J<_+p-2;++J)S=f[J*2],R=f[J*2+1],T=f[(J+1)*2],A=f[(J+1)*2+1],I=f[(J+2)*2],b=f[(J+2)*2+1],!(Math.abs(S*(A-b)+T*(b-R)+I*(R-A))<W)&&r.push(J,J+1,J+2)}function $m(i,t,e,n){const s=$u;if(i.length===0)return;const r=i[0],a=i[1],o=i[i.length-2],l=i[i.length-1],c=t||Math.abs(r-o)<s&&Math.abs(a-l)<s,h=e,u=i.length/2,d=h.length/2;for(let f=0;f<u;f++)h.push(i[f*2]),h.push(i[f*2+1]);for(let f=0;f<u-1;f++)n.push(d+f,d+f+1);c&&n.push(d+u-1,d)}function ju(i,t,e,n,s,r,a){const o=Rp(i,t,2);if(!o)return;for(let c=0;c<o.length;c+=3)r[a++]=o[c]+s,r[a++]=o[c+1]+s,r[a++]=o[c+2]+s;let l=s*n;for(let c=0;c<i.length;c+=2)e[l]=i[c],e[l+1]=i[c+1],l+=n}const jm=[],Km={extension:{type:jt.ShapeBuilder,name:"polygon"},build(i,t){for(let e=0;e<i.points.length;e++)t[e]=i.points[e];return!0},triangulate(i,t,e,n,s,r){ju(i,jm,t,e,n,s,r)}},Zm={extension:{type:jt.ShapeBuilder,name:"rectangle"},build(i,t){const e=i,n=e.x,s=e.y,r=e.width,a=e.height;return r>0&&a>0?(t[0]=n,t[1]=s,t[2]=n+r,t[3]=s,t[4]=n+r,t[5]=s+a,t[6]=n,t[7]=s+a,!0):!1},triangulate(i,t,e,n,s,r){let a=0;n*=e,t[n+a]=i[0],t[n+a+1]=i[1],a+=e,t[n+a]=i[2],t[n+a+1]=i[3],a+=e,t[n+a]=i[6],t[n+a+1]=i[7],a+=e,t[n+a]=i[4],t[n+a+1]=i[5],a+=e;const o=n/e;s[r++]=o,s[r++]=o+1,s[r++]=o+2,s[r++]=o+1,s[r++]=o+3,s[r++]=o+2}},Jm={extension:{type:jt.ShapeBuilder,name:"triangle"},build(i,t){return t[0]=i.x,t[1]=i.y,t[2]=i.x2,t[3]=i.y2,t[4]=i.x3,t[5]=i.y3,!0},triangulate(i,t,e,n,s,r){let a=0;n*=e,t[n+a]=i[0],t[n+a+1]=i[1],a+=e,t[n+a]=i[2],t[n+a+1]=i[3],a+=e,t[n+a]=i[4],t[n+a+1]=i[5];const o=n/e;s[r++]=o,s[r++]=o+1,s[r++]=o+2}},Qm=new Bt,tg=new ce;function eg(i,t,e,n){const s=t.matrix?i.copyFrom(t.matrix).invert():i.identity();if(t.textureSpace==="local"){const a=e.getBounds(tg);t.width&&a.pad(t.width);const{x:o,y:l}=a,c=1/a.width,h=1/a.height,u=-o*c,d=-l*h,f=s.a,g=s.b,_=s.c,p=s.d;s.a*=c,s.b*=c,s.c*=h,s.d*=h,s.tx=u*f+d*_+s.tx,s.ty=u*g+d*p+s.ty}else s.translate(t.texture.frame.x,t.texture.frame.y),s.scale(1/t.texture.source.width,1/t.texture.source.height);const r=t.texture.source.style;return!(t.fill instanceof In)&&r.addressMode==="clamp-to-edge"&&(r.addressMode="repeat",r.update()),n&&s.append(Qm.copyFrom(n).invert()),s}const Kr={};$e.handleByMap(jt.ShapeBuilder,Kr);$e.add(Zm,Km,Jm,Ns,Wm,Xm);const ng=new ce,ig=new Bt;function sg(i,t){const{geometryData:e,batches:n}=t;n.length=0,e.indices.length=0,e.vertices.length=0,e.uvs.length=0;for(let s=0;s<i.instructions.length;s++){const r=i.instructions[s];if(r.action==="texture")rg(r.data,n,e);else if(r.action==="fill"||r.action==="stroke"){const a=r.action==="stroke",o=r.data.path.shapePath,l=r.data.style,c=r.data.hole;a&&c&&yc(c.shapePath,l,!0,n,e),c&&(o.shapePrimitives[o.shapePrimitives.length-1].holes=c.shapePath.shapePrimitives),yc(o,l,a,n,e)}}}function rg(i,t,e){const n=[],s=Kr.rectangle,r=ng;r.x=i.dx,r.y=i.dy,r.width=i.dw,r.height=i.dh;const a=i.transform;if(!s.build(r,n))return;const{vertices:o,uvs:l,indices:c}=e,h=c.length,u=o.length/2;a&&Yu(n,a),s.triangulate(n,o,2,u,c,h);const d=i.image,f=d.uvs;l.push(f.x0,f.y0,f.x1,f.y1,f.x3,f.y3,f.x2,f.y2);const g=qe.get(qu);g.indexOffset=h,g.indexSize=c.length-h,g.attributeOffset=u,g.attributeSize=o.length/2-u,g.baseColor=i.style,g.alpha=i.alpha,g.texture=d,g.geometryData=e,t.push(g)}function yc(i,t,e,n,s){const{vertices:r,uvs:a,indices:o}=s;i.shapePrimitives.forEach(({shape:l,transform:c,holes:h})=>{var x;const u=[],d=Kr[l.type];if(!d.build(l,u))return;const f=o.length,g=r.length/2;let _="triangle-list";if(c&&Yu(u,c),e){const S=(x=l.closePath)!=null?x:!0,R=t;R.pixelLine?($m(u,S,r,o),_="line-list"):qm(u,R,!1,S,r,o)}else if(h){const S=[],R=u.slice();ag(h).forEach(A=>{S.push(R.length/2),R.push(...A)}),ju(R,S,r,2,g,o,f)}else d.triangulate(u,r,2,g,o,f);const p=a.length/2,m=t.texture;if(m!==Zt.WHITE){const S=eg(ig,t,l,c);Gm(r,2,g,a,p,2,r.length/2-g,S)}else Hm(a,p,2,r.length/2-g);const y=qe.get(qu);y.indexOffset=f,y.indexSize=o.length-f,y.attributeOffset=g,y.attributeSize=r.length/2-g,y.baseColor=t.color,y.alpha=t.alpha,y.texture=m,y.geometryData=s,y.topology=_,n.push(y)})}function ag(i){const t=[];for(let e=0;e<i.length;e++){const n=i[e].shape,s=[];Kr[n.type].build(n,s)&&t.push(s)}return t}class og{constructor(){this.batches=[],this.geometryData={vertices:[],uvs:[],indices:[]}}}class lg{constructor(){this.instructions=new tu}init(t){this.batcher=new zm({maxTextures:t}),this.instructions.reset()}get geometry(){return le(Zd,"GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."),this.batcher.geometry}destroy(){this.batcher.destroy(),this.instructions.destroy(),this.batcher=null,this.instructions=null}}const ol=class mo{constructor(t){this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),this._renderer=t,t.renderableGC.addManagedHash(this,"_gpuContextHash"),t.renderableGC.addManagedHash(this,"_graphicsDataContextHash")}init(t){var e;mo.defaultOptions.bezierSmoothness=(e=t==null?void 0:t.bezierSmoothness)!=null?e:mo.defaultOptions.bezierSmoothness}getContextRenderData(t){return this._graphicsDataContextHash[t.uid]||this._initContextRenderData(t)}updateGpuContext(t){let e=this._gpuContextHash[t.uid]||this._initContext(t);if(t.dirty){e?this._cleanGraphicsContextData(t):e=this._initContext(t),sg(t,e);const n=t.batchMode;t.customShader||n==="no-batch"?e.isBatchable=!1:n==="auto"?e.isBatchable=e.geometryData.vertices.length<400:e.isBatchable=!0,t.dirty=!1}return e}getGpuContext(t){return this._gpuContextHash[t.uid]||this._initContext(t)}_initContextRenderData(t){const e=qe.get(lg,{maxTextures:this._renderer.limits.maxBatchableTextures}),{batches:n,geometryData:s}=this._gpuContextHash[t.uid],r=s.vertices.length,a=s.indices.length;for(let h=0;h<n.length;h++)n[h].applyTransform=!1;const o=e.batcher;o.ensureAttributeBuffer(r),o.ensureIndexBuffer(a),o.begin();for(let h=0;h<n.length;h++){const u=n[h];o.add(u)}o.finish(e.instructions);const l=o.geometry;l.indexBuffer.setDataWithSize(o.indexBuffer,o.indexSize,!0),l.buffers[0].setDataWithSize(o.attributeBuffer.float32View,o.attributeSize,!0);const c=o.batches;for(let h=0;h<c.length;h++){const u=c[h];u.bindGroup=Kp(u.textures.textures,u.textures.count,this._renderer.limits.maxBatchableTextures)}return this._graphicsDataContextHash[t.uid]=e,e}_initContext(t){const e=new og;return e.context=t,this._gpuContextHash[t.uid]=e,t.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[t.uid]}onGraphicsContextDestroy(t){this._cleanGraphicsContextData(t),t.off("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[t.uid]=null}_cleanGraphicsContextData(t){const e=this._gpuContextHash[t.uid];e.isBatchable||this._graphicsDataContextHash[t.uid]&&(qe.return(this.getContextRenderData(t)),this._graphicsDataContextHash[t.uid]=null),e.batches&&e.batches.forEach(n=>{qe.return(n)})}destroy(){for(const t in this._gpuContextHash)this._gpuContextHash[t]&&this.onGraphicsContextDestroy(this._gpuContextHash[t].context)}};ol.extension={type:[jt.WebGLSystem,jt.WebGPUSystem,jt.CanvasSystem],name:"graphicsContext"};ol.defaultOptions={bezierSmoothness:.5};let Ku=ol;const cg=8,sr=11920929e-14,hg=1;function Zu(i,t,e,n,s,r,a,o,l,c){const u=Math.min(.99,Math.max(0,c!=null?c:Ku.defaultOptions.bezierSmoothness));let d=(hg-u)/1;return d*=d,ug(t,e,n,s,r,a,o,l,i,d),i}function ug(i,t,e,n,s,r,a,o,l,c){go(i,t,e,n,s,r,a,o,l,c,0),l.push(a,o)}function go(i,t,e,n,s,r,a,o,l,c,h){if(h>cg)return;const u=(i+e)/2,d=(t+n)/2,f=(e+s)/2,g=(n+r)/2,_=(s+a)/2,p=(r+o)/2,m=(u+f)/2,y=(d+g)/2,x=(f+_)/2,S=(g+p)/2,R=(m+x)/2,T=(y+S)/2;if(h>0){let A=a-i,I=o-t;const b=Math.abs((e-a)*I-(n-o)*A),v=Math.abs((s-a)*I-(r-o)*A);if(b>sr&&v>sr){if((b+v)*(b+v)<=c*(A*A+I*I)){l.push(R,T);return}}else if(b>sr){if(b*b<=c*(A*A+I*I)){l.push(R,T);return}}else if(v>sr){if(v*v<=c*(A*A+I*I)){l.push(R,T);return}}else if(A=R-(i+a)/2,I=T-(t+o)/2,A*A+I*I<=c){l.push(R,T);return}}go(i,t,u,d,m,y,R,T,l,c,h+1),go(R,T,x,S,_,p,a,o,l,c,h+1)}const dg=8,fg=11920929e-14,pg=1;function mg(i,t,e,n,s,r,a,o){const c=Math.min(.99,Math.max(0,o!=null?o:Ku.defaultOptions.bezierSmoothness));let h=(pg-c)/1;return h*=h,gg(t,e,n,s,r,a,i,h),i}function gg(i,t,e,n,s,r,a,o){_o(a,i,t,e,n,s,r,o,0),a.push(s,r)}function _o(i,t,e,n,s,r,a,o,l){if(l>dg)return;const c=(t+n)/2,h=(e+s)/2,u=(n+r)/2,d=(s+a)/2,f=(c+u)/2,g=(h+d)/2;let _=r-t,p=a-e;const m=Math.abs((n-r)*p-(s-a)*_);if(m>fg){if(m*m<=o*(_*_+p*p)){i.push(f,g);return}}else if(_=f-(t+r)/2,p=g-(e+a)/2,_*_+p*p<=o){i.push(f,g);return}_o(i,t,e,c,h,f,g,o,l+1),_o(i,f,g,u,d,r,a,o,l+1)}function Ju(i,t,e,n,s,r,a,o){let l=Math.abs(s-r);(!a&&s>r||a&&r>s)&&(l=2*Math.PI-l),o||(o=Math.max(6,Math.floor(6*Math.pow(n,1/3)*(l/Math.PI)))),o=Math.max(o,3);let c=l/o,h=s;c*=a?-1:1;for(let u=0;u<o+1;u++){const d=Math.cos(h),f=Math.sin(h),g=t+d*n,_=e+f*n;i.push(g,_),h+=c}}function _g(i,t,e,n,s,r){const a=i[i.length-2],l=i[i.length-1]-e,c=a-t,h=s-e,u=n-t,d=Math.abs(l*u-c*h);if(d<1e-8||r===0){(i[i.length-2]!==t||i[i.length-1]!==e)&&i.push(t,e);return}const f=l*l+c*c,g=h*h+u*u,_=l*h+c*u,p=r*Math.sqrt(f)/d,m=r*Math.sqrt(g)/d,y=p*_/f,x=m*_/g,S=p*u+m*c,R=p*h+m*l,T=c*(m+y),A=l*(m+y),I=u*(p+x),b=h*(p+x),v=Math.atan2(A-R,T-S),w=Math.atan2(b-R,I-S);Ju(i,S+t,R+e,r,v,w,c*h>u*l)}const ws=Math.PI*2,ba={centerX:0,centerY:0,ang1:0,ang2:0},Ea=({x:i,y:t},e,n,s,r,a,o,l)=>{i*=e,t*=n;const c=s*i-r*t,h=r*i+s*t;return l.x=c+a,l.y=h+o,l};function xg(i,t){const e=t===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(t/4),n=t===1.5707963267948966?.551915024494:e,s=Math.cos(i),r=Math.sin(i),a=Math.cos(i+t),o=Math.sin(i+t);return[{x:s-r*n,y:r+s*n},{x:a+o*n,y:o-a*n},{x:a,y:o}]}const Sc=(i,t,e,n)=>{const s=i*n-t*e<0?-1:1;let r=i*e+t*n;return r>1&&(r=1),r<-1&&(r=-1),s*Math.acos(r)},vg=(i,t,e,n,s,r,a,o,l,c,h,u,d)=>{const f=Math.pow(s,2),g=Math.pow(r,2),_=Math.pow(h,2),p=Math.pow(u,2);let m=f*g-f*p-g*_;m<0&&(m=0),m/=f*p+g*_,m=Math.sqrt(m)*(a===o?-1:1);const y=m*s/r*u,x=m*-r/s*h,S=c*y-l*x+(i+e)/2,R=l*y+c*x+(t+n)/2,T=(h-y)/s,A=(u-x)/r,I=(-h-y)/s,b=(-u-x)/r,v=Sc(1,0,T,A);let w=Sc(T,A,I,b);o===0&&w>0&&(w-=ws),o===1&&w<0&&(w+=ws),d.centerX=S,d.centerY=R,d.ang1=v,d.ang2=w};function yg(i,t,e,n,s,r,a,o=0,l=0,c=0){if(r===0||a===0)return;const h=Math.sin(o*ws/360),u=Math.cos(o*ws/360),d=u*(t-n)/2+h*(e-s)/2,f=-h*(t-n)/2+u*(e-s)/2;if(d===0&&f===0)return;r=Math.abs(r),a=Math.abs(a);const g=Math.pow(d,2)/Math.pow(r,2)+Math.pow(f,2)/Math.pow(a,2);g>1&&(r*=Math.sqrt(g),a*=Math.sqrt(g)),vg(t,e,n,s,r,a,l,c,h,u,d,f,ba);let{ang1:_,ang2:p}=ba;const{centerX:m,centerY:y}=ba;let x=Math.abs(p)/(ws/4);Math.abs(1-x)<1e-7&&(x=1);const S=Math.max(Math.ceil(x),1);p/=S;let R=i[i.length-2],T=i[i.length-1];const A={x:0,y:0};for(let I=0;I<S;I++){const b=xg(_,p),{x:v,y:w}=Ea(b[0],r,a,u,h,m,y,A),{x:B,y:F}=Ea(b[1],r,a,u,h,m,y,A),{x:O,y:Y}=Ea(b[2],r,a,u,h,m,y,A);Zu(i,R,T,v,w,B,F,O,Y),R=O,T=Y,_+=p}}function Sg(i,t,e){var a;const n=(o,l)=>{const c=l.x-o.x,h=l.y-o.y,u=Math.sqrt(c*c+h*h),d=c/u,f=h/u;return{len:u,nx:d,ny:f}},s=(o,l)=>{o===0?i.moveTo(l.x,l.y):i.lineTo(l.x,l.y)};let r=t[t.length-1];for(let o=0;o<t.length;o++){const l=t[o%t.length],c=(a=l.radius)!=null?a:e;if(c<=0){s(o,l),r=l;continue}const h=t[(o+1)%t.length],u=n(l,r),d=n(l,h);if(u.len<1e-4||d.len<1e-4){s(o,l),r=l;continue}let f=Math.asin(u.nx*d.ny-u.ny*d.nx),g=1,_=!1;u.nx*d.nx-u.ny*-d.ny<0?f<0?f=Math.PI+f:(f=Math.PI-f,g=-1,_=!0):f>0&&(g=-1,_=!0);const p=f/2;let m,y=Math.abs(Math.cos(p)*c/Math.sin(p));y>Math.min(u.len/2,d.len/2)?(y=Math.min(u.len/2,d.len/2),m=Math.abs(y*Math.sin(p)/Math.cos(p))):m=c;const x=l.x+d.nx*y+-d.ny*m*g,S=l.y+d.ny*y+d.nx*m*g,R=Math.atan2(u.ny,u.nx)+Math.PI/2*g,T=Math.atan2(d.ny,d.nx)-Math.PI/2*g;o===0&&i.moveTo(x+Math.cos(R)*m,S+Math.sin(R)*m),i.arc(x,S,m,R,T,_),r=l}}function Mg(i,t,e,n){var o;const s=(l,c)=>Math.sqrt((l.x-c.x)**2+(l.y-c.y)**2),r=(l,c,h)=>({x:l.x+(c.x-l.x)*h,y:l.y+(c.y-l.y)*h}),a=t.length;for(let l=0;l<a;l++){const c=t[(l+1)%a],h=(o=c.radius)!=null?o:e;if(h<=0){l===0?i.moveTo(c.x,c.y):i.lineTo(c.x,c.y);continue}const u=t[l],d=t[(l+2)%a],f=s(u,c);let g;if(f<1e-4)g=c;else{const m=Math.min(f/2,h);g=r(c,u,m/f)}const _=s(d,c);let p;if(_<1e-4)p=c;else{const m=Math.min(_/2,h);p=r(c,d,m/_)}l===0?i.moveTo(g.x,g.y):i.lineTo(g.x,g.y),i.quadraticCurveTo(c.x,c.y,p.x,p.y,n)}}const bg=new ce;class Eg{constructor(t){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new sn,this._graphicsPath2D=t,this.signed=t.checkForHoles}moveTo(t,e){return this.startPoly(t,e),this}lineTo(t,e){this._ensurePoly();const n=this._currentPoly.points,s=n[n.length-2],r=n[n.length-1];return(s!==t||r!==e)&&n.push(t,e),this}arc(t,e,n,s,r,a){this._ensurePoly(!1);const o=this._currentPoly.points;return Ju(o,t,e,n,s,r,a),this}arcTo(t,e,n,s,r){this._ensurePoly();const a=this._currentPoly.points;return _g(a,t,e,n,s,r),this}arcToSvg(t,e,n,s,r,a,o){const l=this._currentPoly.points;return yg(l,this._currentPoly.lastX,this._currentPoly.lastY,a,o,t,e,n,s,r),this}bezierCurveTo(t,e,n,s,r,a,o){this._ensurePoly();const l=this._currentPoly;return Zu(this._currentPoly.points,l.lastX,l.lastY,t,e,n,s,r,a,o),this}quadraticCurveTo(t,e,n,s,r){this._ensurePoly();const a=this._currentPoly;return mg(this._currentPoly.points,a.lastX,a.lastY,t,e,n,s,r),this}closePath(){return this.endPoly(!0),this}addPath(t,e){this.endPoly(),e&&!e.isIdentity()&&(t=t.clone(!0),t.transform(e));const n=this.shapePrimitives,s=n.length;for(let r=0;r<t.instructions.length;r++){const a=t.instructions[r];this[a.action](...a.data)}if(t.checkForHoles&&n.length-s>1){let r=null;for(let a=s;a<n.length;a++){const o=n[a];if(o.shape.type==="polygon"){const l=o.shape,c=r==null?void 0:r.shape;c&&c.containsPolygon(l)?(r.holes||(r.holes=[]),r.holes.push(o),n.copyWithin(a,a+1),n.length--,a--):r=o}}}return this}finish(t=!1){this.endPoly(t)}rect(t,e,n,s,r){return this.drawShape(new ce(t,e,n,s),r),this}circle(t,e,n,s){return this.drawShape(new sl(t,e,n),s),this}poly(t,e,n){const s=new Ts(t);return s.closePath=e,this.drawShape(s,n),this}regularPoly(t,e,n,s,r=0,a){s=Math.max(s|0,3);const o=-1*Math.PI/2+r,l=Math.PI*2/s,c=[];for(let h=0;h<s;h++){const u=o-h*l;c.push(t+n*Math.cos(u),e+n*Math.sin(u))}return this.poly(c,!0,a),this}roundPoly(t,e,n,s,r,a=0,o){if(s=Math.max(s|0,3),r<=0)return this.regularPoly(t,e,n,s,a);const l=n*Math.sin(Math.PI/s)-.001;r=Math.min(r,l);const c=-1*Math.PI/2+a,h=Math.PI*2/s,u=(s-2)*Math.PI/s/2;for(let d=0;d<s;d++){const f=d*h+c,g=t+n*Math.cos(f),_=e+n*Math.sin(f),p=f+Math.PI+u,m=f-Math.PI-u,y=g+r*Math.cos(p),x=_+r*Math.sin(p),S=g+r*Math.cos(m),R=_+r*Math.sin(m);d===0?this.moveTo(y,x):this.lineTo(y,x),this.quadraticCurveTo(g,_,S,R,o)}return this.closePath()}roundShape(t,e,n=!1,s){return t.length<3?this:(n?Mg(this,t,e,s):Sg(this,t,e),this.closePath())}filletRect(t,e,n,s,r){if(r===0)return this.rect(t,e,n,s);const a=Math.min(n,s)/2,o=Math.min(a,Math.max(-a,r)),l=t+n,c=e+s,h=o<0?-o:0,u=Math.abs(o);return this.moveTo(t,e+u).arcTo(t+h,e+h,t+u,e,u).lineTo(l-u,e).arcTo(l-h,e+h,l,e+u,u).lineTo(l,c-u).arcTo(l-h,c-h,t+n-u,c,u).lineTo(t+u,c).arcTo(t+h,c-h,t,c-u,u).closePath()}chamferRect(t,e,n,s,r,a){if(r<=0)return this.rect(t,e,n,s);const o=Math.min(r,Math.min(n,s)/2),l=t+n,c=e+s,h=[t+o,e,l-o,e,l,e+o,l,c-o,l-o,c,t+o,c,t,c-o,t,e+o];for(let u=h.length-1;u>=2;u-=2)h[u]===h[u-2]&&h[u-1]===h[u-3]&&h.splice(u-1,2);return this.poly(h,!0,a)}ellipse(t,e,n,s,r){return this.drawShape(new rl(t,e,n,s),r),this}roundRect(t,e,n,s,r,a){return this.drawShape(new al(t,e,n,s,r),a),this}drawShape(t,e){return this.endPoly(),this.shapePrimitives.push({shape:t,transform:e}),this}startPoly(t,e){let n=this._currentPoly;return n&&this.endPoly(),n=new Ts,n.points.push(t,e),this._currentPoly=n,this}endPoly(t=!1){const e=this._currentPoly;return e&&e.points.length>2&&(e.closePath=t,this.shapePrimitives.push({shape:e})),this._currentPoly=null,this}_ensurePoly(t=!0){if(!this._currentPoly&&(this._currentPoly=new Ts,t)){const e=this.shapePrimitives[this.shapePrimitives.length-1];if(e){let n=e.shape.x,s=e.shape.y;if(e.transform&&!e.transform.isIdentity()){const r=e.transform,a=n;n=r.a*n+r.c*s+r.tx,s=r.b*a+r.d*s+r.ty}this._currentPoly.points.push(n,s)}else this._currentPoly.points.push(0,0)}}buildPath(){const t=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let e=0;e<t.instructions.length;e++){const n=t.instructions[e];this[n.action](...n.data)}this.finish()}get bounds(){const t=this._bounds;t.clear();const e=this.shapePrimitives;for(let n=0;n<e.length;n++){const s=e[n],r=s.shape.getBounds(bg);s.transform?t.addRect(r,s.transform):t.addRect(r)}return t}}class Pn{constructor(t,e=!1){var n;this.instructions=[],this.uid=oe("graphicsPath"),this._dirty=!0,this.checkForHoles=e,typeof t=="string"?Yp(t,this):this.instructions=(n=t==null?void 0:t.slice())!=null?n:[]}get shapePath(){return this._shapePath||(this._shapePath=new Eg(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(t,e){return t=t.clone(),this.instructions.push({action:"addPath",data:[t,e]}),this._dirty=!0,this}arc(...t){return this.instructions.push({action:"arc",data:t}),this._dirty=!0,this}arcTo(...t){return this.instructions.push({action:"arcTo",data:t}),this._dirty=!0,this}arcToSvg(...t){return this.instructions.push({action:"arcToSvg",data:t}),this._dirty=!0,this}bezierCurveTo(...t){return this.instructions.push({action:"bezierCurveTo",data:t}),this._dirty=!0,this}bezierCurveToShort(t,e,n,s,r){const a=this.instructions[this.instructions.length-1],o=this.getLastPoint(Te.shared);let l=0,c=0;if(!a||a.action!=="bezierCurveTo")l=o.x,c=o.y;else{l=a.data[2],c=a.data[3];const h=o.x,u=o.y;l=h+(h-l),c=u+(u-c)}return this.instructions.push({action:"bezierCurveTo",data:[l,c,t,e,n,s,r]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...t){return this.instructions.push({action:"ellipse",data:t}),this._dirty=!0,this}lineTo(...t){return this.instructions.push({action:"lineTo",data:t}),this._dirty=!0,this}moveTo(...t){return this.instructions.push({action:"moveTo",data:t}),this}quadraticCurveTo(...t){return this.instructions.push({action:"quadraticCurveTo",data:t}),this._dirty=!0,this}quadraticCurveToShort(t,e,n){const s=this.instructions[this.instructions.length-1],r=this.getLastPoint(Te.shared);let a=0,o=0;if(!s||s.action!=="quadraticCurveTo")a=r.x,o=r.y;else{a=s.data[0],o=s.data[1];const l=r.x,c=r.y;a=l+(l-a),o=c+(c-o)}return this.instructions.push({action:"quadraticCurveTo",data:[a,o,t,e,n]}),this._dirty=!0,this}rect(t,e,n,s,r){return this.instructions.push({action:"rect",data:[t,e,n,s,r]}),this._dirty=!0,this}circle(t,e,n,s){return this.instructions.push({action:"circle",data:[t,e,n,s]}),this._dirty=!0,this}roundRect(...t){return this.instructions.push({action:"roundRect",data:t}),this._dirty=!0,this}poly(...t){return this.instructions.push({action:"poly",data:t}),this._dirty=!0,this}regularPoly(...t){return this.instructions.push({action:"regularPoly",data:t}),this._dirty=!0,this}roundPoly(...t){return this.instructions.push({action:"roundPoly",data:t}),this._dirty=!0,this}roundShape(...t){return this.instructions.push({action:"roundShape",data:t}),this._dirty=!0,this}filletRect(...t){return this.instructions.push({action:"filletRect",data:t}),this._dirty=!0,this}chamferRect(...t){return this.instructions.push({action:"chamferRect",data:t}),this._dirty=!0,this}star(t,e,n,s,r,a,o){r||(r=s/2);const l=-1*Math.PI/2+a,c=n*2,h=Math.PI*2/c,u=[];for(let d=0;d<c;d++){const f=d%2?r:s,g=d*h+l;u.push(t+f*Math.cos(g),e+f*Math.sin(g))}return this.poly(u,!0,o),this}clone(t=!1){const e=new Pn;if(e.checkForHoles=this.checkForHoles,!t)e.instructions=this.instructions.slice();else for(let n=0;n<this.instructions.length;n++){const s=this.instructions[n];e.instructions.push({action:s.action,data:s.data.slice()})}return e}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(t){if(t.isIdentity())return this;const e=t.a,n=t.b,s=t.c,r=t.d,a=t.tx,o=t.ty;let l=0,c=0,h=0,u=0,d=0,f=0,g=0,_=0;for(let p=0;p<this.instructions.length;p++){const m=this.instructions[p],y=m.data;switch(m.action){case"moveTo":case"lineTo":l=y[0],c=y[1],y[0]=e*l+s*c+a,y[1]=n*l+r*c+o;break;case"bezierCurveTo":h=y[0],u=y[1],d=y[2],f=y[3],l=y[4],c=y[5],y[0]=e*h+s*u+a,y[1]=n*h+r*u+o,y[2]=e*d+s*f+a,y[3]=n*d+r*f+o,y[4]=e*l+s*c+a,y[5]=n*l+r*c+o;break;case"quadraticCurveTo":h=y[0],u=y[1],l=y[2],c=y[3],y[0]=e*h+s*u+a,y[1]=n*h+r*u+o,y[2]=e*l+s*c+a,y[3]=n*l+r*c+o;break;case"arcToSvg":l=y[5],c=y[6],g=y[0],_=y[1],y[0]=e*g+s*_,y[1]=n*g+r*_,y[5]=e*l+s*c+a,y[6]=n*l+r*c+o;break;case"circle":y[4]=ds(y[3],t);break;case"rect":y[4]=ds(y[4],t);break;case"ellipse":y[8]=ds(y[8],t);break;case"roundRect":y[5]=ds(y[5],t);break;case"addPath":y[0].transform(t);break;case"poly":y[2]=ds(y[2],t);break;default:Re("unknown transform action",m.action);break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}getLastPoint(t){let e=this.instructions.length-1,n=this.instructions[e];if(!n)return t.x=0,t.y=0,t;for(;n.action==="closePath";){if(e--,e<0)return t.x=0,t.y=0,t;n=this.instructions[e]}switch(n.action){case"moveTo":case"lineTo":t.x=n.data[0],t.y=n.data[1];break;case"quadraticCurveTo":t.x=n.data[2],t.y=n.data[3];break;case"bezierCurveTo":t.x=n.data[4],t.y=n.data[5];break;case"arc":case"arcToSvg":t.x=n.data[5],t.y=n.data[6];break;case"addPath":n.data[0].getLastPoint(t);break}return t}}function ds(i,t){return i?i.prepend(t):t.clone()}function ae(i,t,e){const n=i.getAttribute(t);return n?Number(n):e}function Tg(i,t){const e=i.querySelectorAll("defs");for(let n=0;n<e.length;n++){const s=e[n];for(let r=0;r<s.children.length;r++){const a=s.children[r];switch(a.nodeName.toLowerCase()){case"lineargradient":t.defs[a.id]=Ag(a);break;case"radialgradient":t.defs[a.id]=wg();break}}}}function Ag(i){const t=ae(i,"x1",0),e=ae(i,"y1",0),n=ae(i,"x2",1),s=ae(i,"y2",0),r=i.getAttribute("gradientUnits")||"objectBoundingBox",a=new In(t,e,n,s,r==="objectBoundingBox"?"local":"global");for(let o=0;o<i.children.length;o++){const l=i.children[o],c=ae(l,"offset",0),h=me.shared.setValue(l.getAttribute("stop-color")).toNumber();a.addColorStop(c,h)}return a}function wg(i){return Re("[SVG Parser] Radial gradients are not yet supported"),new In(0,0,1,0)}function Mc(i){const t=i.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);return t?t[1]:""}const bc={fill:{type:"paint",default:0},"fill-opacity":{type:"number",default:1},stroke:{type:"paint",default:0},"stroke-width":{type:"number",default:1},"stroke-opacity":{type:"number",default:1},"stroke-linecap":{type:"string",default:"butt"},"stroke-linejoin":{type:"string",default:"miter"},"stroke-miterlimit":{type:"number",default:10},"stroke-dasharray":{type:"string",default:"none"},"stroke-dashoffset":{type:"number",default:0},opacity:{type:"number",default:1}};function Qu(i,t){const e=i.getAttribute("style"),n={},s={},r={strokeStyle:n,fillStyle:s,useFill:!1,useStroke:!1};for(const a in bc){const o=i.getAttribute(a);o&&Ec(t,r,a,o.trim())}if(e){const a=e.split(";");for(let o=0;o<a.length;o++){const l=a[o].trim(),[c,h]=l.split(":");bc[c]&&Ec(t,r,c,h.trim())}}return{strokeStyle:r.useStroke?n:null,fillStyle:r.useFill?s:null,useFill:r.useFill,useStroke:r.useStroke}}function Ec(i,t,e,n){switch(e){case"stroke":if(n!=="none"){if(n.startsWith("url(")){const s=Mc(n);t.strokeStyle.fill=i.defs[s]}else t.strokeStyle.color=me.shared.setValue(n).toNumber();t.useStroke=!0}break;case"stroke-width":t.strokeStyle.width=Number(n);break;case"fill":if(n!=="none"){if(n.startsWith("url(")){const s=Mc(n);t.fillStyle.fill=i.defs[s]}else t.fillStyle.color=me.shared.setValue(n).toNumber();t.useFill=!0}break;case"fill-opacity":t.fillStyle.alpha=Number(n);break;case"stroke-opacity":t.strokeStyle.alpha=Number(n);break;case"opacity":t.fillStyle.alpha=Number(n),t.strokeStyle.alpha=Number(n);break}}function Cg(i){if(i.length<=2)return!0;const t=i.map(o=>o.area).sort((o,l)=>l-o),[e,n]=t,s=t[t.length-1],r=e/n,a=n/s;return!(r>3&&a<2)}function Rg(i){return i.split(/(?=[Mm])/).filter(n=>n.trim().length>0)}function Pg(i){const t=i.match(/[-+]?[0-9]*\.?[0-9]+/g);if(!t||t.length<4)return 0;const e=t.map(Number),n=[],s=[];for(let h=0;h<e.length;h+=2)h+1<e.length&&(n.push(e[h]),s.push(e[h+1]));if(n.length===0||s.length===0)return 0;const r=Math.min(...n),a=Math.max(...n),o=Math.min(...s),l=Math.max(...s);return(a-r)*(l-o)}function Tc(i,t){const e=new Pn(i,!1);for(const n of e.instructions)t.instructions.push(n)}function Ig(i,t){if(typeof i=="string"){const a=document.createElement("div");a.innerHTML=i.trim(),i=a.querySelector("svg")}const e={context:t,defs:{},path:new Pn};Tg(i,e);const n=i.children,{fillStyle:s,strokeStyle:r}=Qu(i,e);for(let a=0;a<n.length;a++){const o=n[a];o.nodeName.toLowerCase()!=="defs"&&td(o,e,s,r)}return t}function td(i,t,e,n){const s=i.children,{fillStyle:r,strokeStyle:a}=Qu(i,t);r&&e?e={...e,...r}:r&&(e=r),a&&n?n={...n,...a}:a&&(n=a);const o=!e&&!n;o&&(e={color:0});let l,c,h,u,d,f,g,_,p,m,y,x,S,R,T,A,I;switch(i.nodeName.toLowerCase()){case"path":{R=i.getAttribute("d");const b=i.getAttribute("fill-rule"),v=Rg(R),w=b==="evenodd",B=v.length>1;if(w&&B){const O=v.map(L=>({path:L,area:Pg(L)}));if(O.sort((L,H)=>H.area-L.area),v.length>3||!Cg(O))for(let L=0;L<O.length;L++){const H=O[L],W=L===0;t.context.beginPath();const J=new Pn(void 0,!0);Tc(H.path,J),t.context.path(J),W?(e&&t.context.fill(e),n&&t.context.stroke(n)):t.context.cut()}else for(let L=0;L<O.length;L++){const H=O[L],W=L%2===1;t.context.beginPath();const J=new Pn(void 0,!0);Tc(H.path,J),t.context.path(J),W?t.context.cut():(e&&t.context.fill(e),n&&t.context.stroke(n))}}else{const O=b?b==="evenodd":!0;T=new Pn(R,O),t.context.path(T),e&&t.context.fill(e),n&&t.context.stroke(n)}break}case"circle":g=ae(i,"cx",0),_=ae(i,"cy",0),p=ae(i,"r",0),t.context.ellipse(g,_,p,p),e&&t.context.fill(e),n&&t.context.stroke(n);break;case"rect":l=ae(i,"x",0),c=ae(i,"y",0),A=ae(i,"width",0),I=ae(i,"height",0),m=ae(i,"rx",0),y=ae(i,"ry",0),m||y?t.context.roundRect(l,c,A,I,m||y):t.context.rect(l,c,A,I),e&&t.context.fill(e),n&&t.context.stroke(n);break;case"ellipse":g=ae(i,"cx",0),_=ae(i,"cy",0),m=ae(i,"rx",0),y=ae(i,"ry",0),t.context.beginPath(),t.context.ellipse(g,_,m,y),e&&t.context.fill(e),n&&t.context.stroke(n);break;case"line":h=ae(i,"x1",0),u=ae(i,"y1",0),d=ae(i,"x2",0),f=ae(i,"y2",0),t.context.beginPath(),t.context.moveTo(h,u),t.context.lineTo(d,f),n&&t.context.stroke(n);break;case"polygon":S=i.getAttribute("points"),x=S.match(/\d+/g).map(b=>parseInt(b,10)),t.context.poly(x,!0),e&&t.context.fill(e),n&&t.context.stroke(n);break;case"polyline":S=i.getAttribute("points"),x=S.match(/\d+/g).map(b=>parseInt(b,10)),t.context.poly(x,!1),n&&t.context.stroke(n);break;case"g":case"svg":break;default:{Re(`[SVG parser] <${i.nodeName}> elements unsupported`);break}}o&&(e=null);for(let b=0;b<s.length;b++)td(s[b],t,e,n)}function Lg(i){return me.isColorLike(i)}function Ac(i){return i instanceof jr}function wc(i){return i instanceof In}function Dg(i){return i instanceof Zt}function Ug(i,t,e){const n=me.shared.setValue(t!=null?t:0);return i.color=n.toNumber(),i.alpha=n.alpha===1?e.alpha:n.alpha,i.texture=Zt.WHITE,{...e,...i}}function Ng(i,t,e){return i.texture=t,{...e,...i}}function Cc(i,t,e){return i.fill=t,i.color=16777215,i.texture=t.texture,i.matrix=t.transform,{...e,...i}}function Rc(i,t,e){return t.buildGradient(),i.fill=t,i.color=16777215,i.texture=t.texture,i.matrix=t.transform,i.textureSpace=t.textureSpace,{...e,...i}}function Fg(i,t){const e={...t,...i},n=me.shared.setValue(e.color);return e.alpha*=n.alpha,e.color=n.toNumber(),e}function di(i,t){if(i==null)return null;const e={},n=i;return Lg(i)?Ug(e,i,t):Dg(i)?Ng(e,i,t):Ac(i)?Cc(e,i,t):wc(i)?Rc(e,i,t):n.fill&&Ac(n.fill)?Cc(n,n.fill,t):n.fill&&wc(n.fill)?Rc(n,n.fill,t):Fg(n,t)}function zr(i,t){const{width:e,alignment:n,miterLimit:s,cap:r,join:a,pixelLine:o,...l}=t,c=di(i,l);return c?{width:e,alignment:n,miterLimit:s,cap:r,join:a,pixelLine:o,...c}:null}const Og=new Te,Pc=new Bt,ll=class cn extends gn{constructor(){super(...arguments),this.uid=oe("graphicsContext"),this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new Pn,this._transform=new Bt,this._fillStyle={...cn.defaultFillStyle},this._strokeStyle={...cn.defaultStrokeStyle},this._stateStack=[],this._tick=0,this._bounds=new sn,this._boundsDirty=!0}clone(){const t=new cn;return t.batchMode=this.batchMode,t.instructions=this.instructions.slice(),t._activePath=this._activePath.clone(),t._transform=this._transform.clone(),t._fillStyle={...this._fillStyle},t._strokeStyle={...this._strokeStyle},t._stateStack=this._stateStack.slice(),t._bounds=this._bounds.clone(),t._boundsDirty=!0,t}get fillStyle(){return this._fillStyle}set fillStyle(t){this._fillStyle=di(t,cn.defaultFillStyle)}get strokeStyle(){return this._strokeStyle}set strokeStyle(t){this._strokeStyle=zr(t,cn.defaultStrokeStyle)}setFillStyle(t){return this._fillStyle=di(t,cn.defaultFillStyle),this}setStrokeStyle(t){return this._strokeStyle=di(t,cn.defaultStrokeStyle),this}texture(t,e,n,s,r,a){return this.instructions.push({action:"texture",data:{image:t,dx:n||0,dy:s||0,dw:r||t.frame.width,dh:a||t.frame.height,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e?me.shared.setValue(e).toNumber():16777215}}),this.onUpdate(),this}beginPath(){return this._activePath=new Pn,this}fill(t,e){let n;const s=this.instructions[this.instructions.length-1];return this._tick===0&&s&&s.action==="stroke"?n=s.data.path:n=this._activePath.clone(),n?(t!=null&&(e!==void 0&&typeof t=="number"&&(le(Ge,"GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),t={color:t,alpha:e}),this._fillStyle=di(t,cn.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:this.fillStyle,path:n}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}_initNextPathLocation(){const{x:t,y:e}=this._activePath.getLastPoint(Te.shared);this._activePath.clear(),this._activePath.moveTo(t,e)}stroke(t){let e;const n=this.instructions[this.instructions.length-1];return this._tick===0&&n&&n.action==="fill"?e=n.data.path:e=this._activePath.clone(),e?(t!=null&&(this._strokeStyle=zr(t,cn.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:this.strokeStyle,path:e}}),this.onUpdate(),this._initNextPathLocation(),this._tick=0,this):this}cut(){for(let t=0;t<2;t++){const e=this.instructions[this.instructions.length-1-t],n=this._activePath.clone();if(e&&(e.action==="stroke"||e.action==="fill"))if(e.data.hole)e.data.hole.addPath(n);else{e.data.hole=n;break}}return this._initNextPathLocation(),this}arc(t,e,n,s,r,a){this._tick++;const o=this._transform;return this._activePath.arc(o.a*t+o.c*e+o.tx,o.b*t+o.d*e+o.ty,n,s,r,a),this}arcTo(t,e,n,s,r){this._tick++;const a=this._transform;return this._activePath.arcTo(a.a*t+a.c*e+a.tx,a.b*t+a.d*e+a.ty,a.a*n+a.c*s+a.tx,a.b*n+a.d*s+a.ty,r),this}arcToSvg(t,e,n,s,r,a,o){this._tick++;const l=this._transform;return this._activePath.arcToSvg(t,e,n,s,r,l.a*a+l.c*o+l.tx,l.b*a+l.d*o+l.ty),this}bezierCurveTo(t,e,n,s,r,a,o){this._tick++;const l=this._transform;return this._activePath.bezierCurveTo(l.a*t+l.c*e+l.tx,l.b*t+l.d*e+l.ty,l.a*n+l.c*s+l.tx,l.b*n+l.d*s+l.ty,l.a*r+l.c*a+l.tx,l.b*r+l.d*a+l.ty,o),this}closePath(){var t;return this._tick++,(t=this._activePath)==null||t.closePath(),this}ellipse(t,e,n,s){return this._tick++,this._activePath.ellipse(t,e,n,s,this._transform.clone()),this}circle(t,e,n){return this._tick++,this._activePath.circle(t,e,n,this._transform.clone()),this}path(t){return this._tick++,this._activePath.addPath(t,this._transform.clone()),this}lineTo(t,e){this._tick++;const n=this._transform;return this._activePath.lineTo(n.a*t+n.c*e+n.tx,n.b*t+n.d*e+n.ty),this}moveTo(t,e){this._tick++;const n=this._transform,s=this._activePath.instructions,r=n.a*t+n.c*e+n.tx,a=n.b*t+n.d*e+n.ty;return s.length===1&&s[0].action==="moveTo"?(s[0].data[0]=r,s[0].data[1]=a,this):(this._activePath.moveTo(r,a),this)}quadraticCurveTo(t,e,n,s,r){this._tick++;const a=this._transform;return this._activePath.quadraticCurveTo(a.a*t+a.c*e+a.tx,a.b*t+a.d*e+a.ty,a.a*n+a.c*s+a.tx,a.b*n+a.d*s+a.ty,r),this}rect(t,e,n,s){return this._tick++,this._activePath.rect(t,e,n,s,this._transform.clone()),this}roundRect(t,e,n,s,r){return this._tick++,this._activePath.roundRect(t,e,n,s,r,this._transform.clone()),this}poly(t,e){return this._tick++,this._activePath.poly(t,e,this._transform.clone()),this}regularPoly(t,e,n,s,r=0,a){return this._tick++,this._activePath.regularPoly(t,e,n,s,r,a),this}roundPoly(t,e,n,s,r,a){return this._tick++,this._activePath.roundPoly(t,e,n,s,r,a),this}roundShape(t,e,n,s){return this._tick++,this._activePath.roundShape(t,e,n,s),this}filletRect(t,e,n,s,r){return this._tick++,this._activePath.filletRect(t,e,n,s,r),this}chamferRect(t,e,n,s,r,a){return this._tick++,this._activePath.chamferRect(t,e,n,s,r,a),this}star(t,e,n,s,r=0,a=0){return this._tick++,this._activePath.star(t,e,n,s,r,a,this._transform.clone()),this}svg(t){return this._tick++,Ig(t,this),this}restore(){const t=this._stateStack.pop();return t&&(this._transform=t.transform,this._fillStyle=t.fillStyle,this._strokeStyle=t.strokeStyle),this}save(){return this._stateStack.push({transform:this._transform.clone(),fillStyle:{...this._fillStyle},strokeStyle:{...this._strokeStyle}}),this}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(t){return this._transform.rotate(t),this}scale(t,e=t){return this._transform.scale(t,e),this}setTransform(t,e,n,s,r,a){return t instanceof Bt?(this._transform.set(t.a,t.b,t.c,t.d,t.tx,t.ty),this):(this._transform.set(t,e,n,s,r,a),this)}transform(t,e,n,s,r,a){return t instanceof Bt?(this._transform.append(t),this):(Pc.set(t,e,n,s,r,a),this._transform.append(Pc),this)}translate(t,e=t){return this._transform.translate(t,e),this}clear(){return this._activePath.clear(),this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this._boundsDirty=!0,!this.dirty&&(this.emit("update",this,16),this.dirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;this._boundsDirty=!1;const t=this._bounds;t.clear();for(let e=0;e<this.instructions.length;e++){const n=this.instructions[e],s=n.action;if(s==="fill"){const r=n.data;t.addBounds(r.path.bounds)}else if(s==="texture"){const r=n.data;t.addFrame(r.dx,r.dy,r.dx+r.dw,r.dy+r.dh,r.transform)}if(s==="stroke"){const r=n.data,a=r.style.alignment,o=r.style.width*(1-a),l=r.path.bounds;t.addFrame(l.minX-o,l.minY-o,l.maxX+o,l.maxY+o)}}return t}containsPoint(t){var s;if(!this.bounds.containsPoint(t.x,t.y))return!1;const e=this.instructions;let n=!1;for(let r=0;r<e.length;r++){const a=e[r],o=a.data,l=o.path;if(!a.action||!l)continue;const c=o.style,h=l.shapePath.shapePrimitives;for(let u=0;u<h.length;u++){const d=h[u].shape;if(!c||!d)continue;const f=h[u].transform,g=f?f.applyInverse(t,Og):t;if(a.action==="fill")n=d.contains(g.x,g.y);else{const p=c;n=d.strokeContains(g.x,g.y,p.width,p.alignment)}const _=o.hole;if(_){const p=(s=_.shapePath)==null?void 0:s.shapePrimitives;if(p)for(let m=0;m<p.length;m++)p[m].shape.contains(g.x,g.y)&&(n=!1)}if(n)return!0}}return n}destroy(t=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof t=="boolean"?t:t==null?void 0:t.texture){const n=typeof t=="boolean"?t:t==null?void 0:t.textureSource;this._fillStyle.texture&&(this._fillStyle.fill&&"uid"in this._fillStyle.fill?this._fillStyle.fill.destroy():this._fillStyle.texture.destroy(n)),this._strokeStyle.texture&&(this._strokeStyle.fill&&"uid"in this._strokeStyle.fill?this._strokeStyle.fill.destroy():this._strokeStyle.texture.destroy(n))}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};ll.defaultFillStyle={color:16777215,alpha:1,texture:Zt.WHITE,matrix:null,fill:null,textureSpace:"local"};ll.defaultStrokeStyle={width:1,color:16777215,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:Zt.WHITE,matrix:null,fill:null,textureSpace:"local",pixelLine:!1};let Si=ll;const cl=class Hi extends gn{constructor(t={}){super(),this.uid=oe("textStyle"),this._tick=0,Bg(t);const e={...Hi.defaultTextStyle,...t};for(const n in e){const s=n;this[s]=e[n]}this.update(),this._tick=0}get align(){return this._align}set align(t){this._align=t,this.update()}get breakWords(){return this._breakWords}set breakWords(t){this._breakWords=t,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(t){t!==null&&typeof t=="object"?this._dropShadow=this._createProxy({...Hi.defaultDropShadow,...t}):this._dropShadow=t?this._createProxy({...Hi.defaultDropShadow}):null,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(t){this._fontFamily=t,this.update()}get fontSize(){return this._fontSize}set fontSize(t){typeof t=="string"?this._fontSize=parseInt(t,10):this._fontSize=t,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle=t.toLowerCase(),this.update()}get fontVariant(){return this._fontVariant}set fontVariant(t){this._fontVariant=t,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight=t,this.update()}get leading(){return this._leading}set leading(t){this._leading=t,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(t){this._letterSpacing=t,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update()}get padding(){return this._padding}set padding(t){this._padding=t,this.update()}get filters(){return this._filters}set filters(t){this._filters=Object.freeze(t),this.update()}get trim(){return this._trim}set trim(t){this._trim=t,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(t){this._textBaseline=t,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(t){this._whiteSpace=t,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(t){this._wordWrap=t,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(t){this._wordWrapWidth=t,this.update()}get fill(){return this._originalFill}set fill(t){t!==this._originalFill&&(this._originalFill=t,this._isFillStyle(t)&&(this._originalFill=this._createProxy({...Si.defaultFillStyle,...t},()=>{this._fill=di({...this._originalFill},Si.defaultFillStyle)})),this._fill=di(t===0?"black":t,Si.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(t){t!==this._originalStroke&&(this._originalStroke=t,this._isFillStyle(t)&&(this._originalStroke=this._createProxy({...Si.defaultStrokeStyle,...t},()=>{this._stroke=zr({...this._originalStroke},Si.defaultStrokeStyle)})),this._stroke=zr(t,Si.defaultStrokeStyle),this.update())}update(){this._tick++,this.emit("update",this)}reset(){const t=Hi.defaultTextStyle;for(const e in t)this[e]=t[e]}get styleKey(){return`${this.uid}-${this._tick}`}clone(){return new Hi({align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0})}_getFinalPadding(){let t=0;if(this._filters)for(let e=0;e<this._filters.length;e++)t+=this._filters[e].padding;return Math.max(this._padding,t)}destroy(t=!1){var n,s,r,a;if(this.removeAllListeners(),typeof t=="boolean"?t:t==null?void 0:t.texture){const o=typeof t=="boolean"?t:t==null?void 0:t.textureSource;(n=this._fill)!=null&&n.texture&&this._fill.texture.destroy(o),(s=this._originalFill)!=null&&s.texture&&this._originalFill.texture.destroy(o),(r=this._stroke)!=null&&r.texture&&this._stroke.texture.destroy(o),(a=this._originalStroke)!=null&&a.texture&&this._originalStroke.texture.destroy(o)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(t,e){return new Proxy(t,{set:(n,s,r)=>(n[s]=r,e==null||e(s,r),this.update(),!0)})}_isFillStyle(t){return(t!=null?t:null)!==null&&!(me.isColorLike(t)||t instanceof In||t instanceof jr)}};cl.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5};cl.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let ed=cl;function Bg(i){var e,n,s,r,a;const t=i;if(typeof t.dropShadow=="boolean"&&t.dropShadow){const o=ed.defaultDropShadow;i.dropShadow={alpha:(e=t.dropShadowAlpha)!=null?e:o.alpha,angle:(n=t.dropShadowAngle)!=null?n:o.angle,blur:(s=t.dropShadowBlur)!=null?s:o.blur,color:(r=t.dropShadowColor)!=null?r:o.color,distance:(a=t.dropShadowDistance)!=null?a:o.distance}}if(t.strokeThickness!==void 0){le(Ge,"strokeThickness is now a part of stroke");const o=t.stroke;let l={};if(me.isColorLike(o))l.color=o;else if(o instanceof In||o instanceof jr)l.fill=o;else if(Object.hasOwnProperty.call(o,"color")||Object.hasOwnProperty.call(o,"fill"))l=o;else throw new Error("Invalid stroke value.");i.stroke={...l,width:t.strokeThickness}}if(Array.isArray(t.fillGradientStops)){if(le(Ge,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(t.fill)||t.fill.length===0)throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");t.fill.length!==t.fillGradientStops.length&&Re("The number of fill colors must match the number of fill gradient stops.");const o=new In({start:{x:0,y:0},end:{x:0,y:1},textureSpace:"local"}),l=t.fillGradientStops.slice(),c=t.fill.map(h=>me.shared.setValue(h).toNumber());l.forEach((h,u)=>{o.addColorStop(h,c[u])}),i.fill={fill:o}}}class kg{constructor(t){this._canvasPool=Object.create(null),this.canvasOptions=t||{},this.enableFullScreen=!1}_createCanvasAndContext(t,e){const n=ze.get().createCanvas();n.width=t,n.height=e;const s=n.getContext("2d");return{canvas:n,context:s}}getOptimalCanvasAndContext(t,e,n=1){t=Math.ceil(t*n-1e-6),e=Math.ceil(e*n-1e-6),t=$i(t),e=$i(e);const s=(t<<17)+(e<<1);this._canvasPool[s]||(this._canvasPool[s]=[]);let r=this._canvasPool[s].pop();return r||(r=this._createCanvasAndContext(t,e)),r}returnCanvasAndContext(t){const e=t.canvas,{width:n,height:s}=e,r=(n<<17)+(s<<1);t.context.resetTransform(),t.context.clearRect(0,0,n,s),this._canvasPool[r].push(t)}clear(){this._canvasPool={}}}const xo=new kg;Os.register(xo);const Ic=1e5;function Lc(i,t,e,n=0){var s;if(i.texture===Zt.WHITE&&!i.fill)return me.shared.setValue(i.color).setAlpha((s=i.alpha)!=null?s:1).toHexa();if(i.fill){if(i.fill instanceof jr){const r=i.fill,a=t.createPattern(r.texture.source.resource,"repeat"),o=r.transform.copyTo(Bt.shared);return o.scale(r.texture.frame.width,r.texture.frame.height),a.setTransform(o),a}else if(i.fill instanceof In){const r=i.fill,a=r.type==="linear",o=r.textureSpace==="local";let l=1,c=1;o&&e&&(l=e.width+n,c=e.height+n);let h,u=!1;if(a){const{start:d,end:f}=r;h=t.createLinearGradient(d.x*l,d.y*c,f.x*l,f.y*c),u=Math.abs(f.x-d.x)<Math.abs((f.y-d.y)*.1)}else{const{center:d,innerRadius:f,outerCenter:g,outerRadius:_}=r;h=t.createRadialGradient(d.x*l,d.y*c,f*l,g.x*l,g.y*c,_*l)}if(u&&o&&e){const d=e.lineHeight/c;for(let f=0;f<e.lines.length;f++){const g=(f*e.lineHeight+n/2)/c;r.colorStops.forEach(_=>{const p=g+_.offset*d;h.addColorStop(Math.floor(p*Ic)/Ic,me.shared.setValue(_.color).toHex())})}}else r.colorStops.forEach(d=>{h.addColorStop(d.offset,me.shared.setValue(d.color).toHex())});return h}}else{const r=t.createPattern(i.texture.source.resource,"repeat"),a=i.matrix.copyTo(Bt.shared);return a.scale(i.texture.frame.width,i.texture.frame.height),r.setTransform(a),r}return Re("FillStyle not recognised",i),"red"}class zg extends nu{constructor(t,e){const{text:n,resolution:s,style:r,anchor:a,width:o,height:l,roundPixels:c,...h}=t;super({...h}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=e,this.text=n!=null?n:"",this.style=r,this.resolution=s!=null?s:null,this.allowChildren=!1,this._anchor=new Me({_onUpdate:()=>{this.onViewUpdate()}}),a&&(this.anchor=a),this.roundPixels=c!=null?c:!1,o!==void 0&&(this.width=o),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(t){typeof t=="number"?this._anchor.set(t):this._anchor.copyFrom(t)}set text(t){t=t.toString(),this._text!==t&&(this._text=t,this.onViewUpdate())}get text(){return this._text}set resolution(t){this._autoResolution=t===null,this._resolution=t,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(t){var e;t||(t={}),(e=this._style)==null||e.off("update",this.onViewUpdate,this),t instanceof this._styleClass?this._style=t:this._style=new this._styleClass(t),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(t){this._setWidth(t,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(t){this._setHeight(t,this.bounds.height)}getSize(t){return t||(t={}),t.width=Math.abs(this.scale.x)*this.bounds.width,t.height=Math.abs(this.scale.y)*this.bounds.height,t}setSize(t,e){var n;typeof t=="object"?(e=(n=t.height)!=null?n:t.width,t=t.width):e!=null||(e=t),t!==void 0&&this._setWidth(t,this.bounds.width),e!==void 0&&this._setHeight(e,this.bounds.height)}containsPoint(t){const e=this.bounds.width,n=this.bounds.height,s=-e*this.anchor.x;let r=0;return t.x>=s&&t.x<=s+e&&(r=-n*this.anchor.y,t.y>=r&&t.y<=r+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(t=!1){super.destroy(t),this.owner=null,this._bounds=null,this._anchor=null,(typeof t=="boolean"?t:t!=null&&t.style)&&this._style.destroy(t),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function Gg(i,t){var n;let e=(n=i[0])!=null?n:{};return(typeof e=="string"||i[1])&&(le(Ge,`use new ${t}({ text: "hi!", style }) instead`),e={text:e,style:i[1]}),e}let Zn=null,Tn=null;function Hg(i,t){Zn||(Zn=ze.get().createCanvas(256,128),Tn=Zn.getContext("2d",{willReadFrequently:!0}),Tn.globalCompositeOperation="copy",Tn.globalAlpha=1),(Zn.width<i||Zn.height<t)&&(Zn.width=$i(i),Zn.height=$i(t))}function Dc(i,t,e){for(let n=0,s=4*e*t;n<t;++n,s+=4)if(i[s+3]!==0)return!1;return!0}function Uc(i,t,e,n,s){const r=4*t;for(let a=n,o=n*r+4*e;a<=s;++a,o+=r)if(i[o+3]!==0)return!1;return!0}function Vg(...i){var f,g,_;let t=i[0];t.canvas||(t={canvas:i[0],resolution:i[1]});const{canvas:e}=t,n=Math.min((f=t.resolution)!=null?f:1,1),s=(g=t.width)!=null?g:e.width,r=(_=t.height)!=null?_:e.height;let a=t.output;if(Hg(s,r),!Tn)throw new TypeError("Failed to get canvas 2D context");Tn.drawImage(e,0,0,s,r,0,0,s*n,r*n);const l=Tn.getImageData(0,0,s,r).data;let c=0,h=0,u=s-1,d=r-1;for(;h<r&&Dc(l,s,h);)++h;if(h===r)return ce.EMPTY;for(;Dc(l,s,d);)--d;for(;Uc(l,s,c,h,d);)++c;for(;Uc(l,s,u,h,d);)--u;return++u,++d,Tn.globalCompositeOperation="source-over",Tn.strokeRect(c,h,u-c,d-h),Tn.globalCompositeOperation="copy",a!=null||(a=new ce),a.set(c/n,h/n,(u-c)/n,(d-h)/n),a}const Nc=new ce;class Wg{getCanvasAndContext(t){const{text:e,style:n,resolution:s=1}=t,r=n._getFinalPadding(),a=Gi.measureText(e||" ",n),o=Math.ceil(Math.ceil(Math.max(1,a.width)+r*2)*s),l=Math.ceil(Math.ceil(Math.max(1,a.height)+r*2)*s),c=xo.getOptimalCanvasAndContext(o,l);this._renderTextToCanvas(e,n,r,s,c);const h=n.trim?Vg({canvas:c.canvas,width:o,height:l,resolution:1,output:Nc}):Nc.set(0,0,o,l);return{canvasAndContext:c,frame:h}}returnCanvasAndContext(t){xo.returnCanvasAndContext(t)}_renderTextToCanvas(t,e,n,s,r){var x,S,R,T,A;const{canvas:a,context:o}=r,l=Ou(e),c=Gi.measureText(t||" ",e),h=c.lines,u=c.lineHeight,d=c.lineWidths,f=c.maxLineWidth,g=c.fontProperties,_=a.height;if(o.resetTransform(),o.scale(s,s),o.textBaseline=e.textBaseline,(x=e._stroke)!=null&&x.width){const I=e._stroke;o.lineWidth=I.width,o.miterLimit=I.miterLimit,o.lineJoin=I.join,o.lineCap=I.cap}o.font=l;let p,m;const y=e.dropShadow?2:1;for(let I=0;I<y;++I){const b=e.dropShadow&&I===0,v=b?Math.ceil(Math.max(1,_)+n*2):0,w=v*s;if(b){o.fillStyle="black",o.strokeStyle="black";const O=e.dropShadow,Y=O.color,L=O.alpha;o.shadowColor=me.shared.setValue(Y).setAlpha(L).toRgbaString();const H=O.blur*s,W=O.distance*s;o.shadowBlur=H,o.shadowOffsetX=Math.cos(O.angle)*W,o.shadowOffsetY=Math.sin(O.angle)*W+w}else{if(o.fillStyle=e._fill?Lc(e._fill,o,c,n*2):null,(S=e._stroke)!=null&&S.width){const O=e._stroke.width*.5+n*2;o.strokeStyle=Lc(e._stroke,o,c,O)}o.shadowColor="black"}let B=(u-g.fontSize)/2;u-g.fontSize<0&&(B=0);const F=(T=(R=e._stroke)==null?void 0:R.width)!=null?T:0;for(let O=0;O<h.length;O++)p=F/2,m=F/2+O*u+g.ascent+B,e.align==="right"?p+=f-d[O]:e.align==="center"&&(p+=(f-d[O])/2),(A=e._stroke)!=null&&A.width&&this._drawLetterSpacing(h[O],e,r,p+n,m+n-v,!0),e._fill!==void 0&&this._drawLetterSpacing(h[O],e,r,p+n,m+n-v)}}_drawLetterSpacing(t,e,n,s,r,a=!1){const{context:o}=n,l=e.letterSpacing;let c=!1;if(Gi.experimentalLetterSpacingSupported&&(Gi.experimentalLetterSpacing?(o.letterSpacing=`${l}px`,o.textLetterSpacing=`${l}px`,c=!0):(o.letterSpacing="0px",o.textLetterSpacing="0px")),l===0||c){a?o.strokeText(t,s,r):o.fillText(t,s,r);return}let h=s;const u=Gi.graphemeSegmenter(t);let d=o.measureText(t).width,f=0;for(let g=0;g<u.length;++g){const _=u[g];a?o.strokeText(_,h,r):o.fillText(_,h,r);let p="";for(let m=g+1;m<u.length;++m)p+=u[m];f=o.measureText(p).width,h+=d-f+l,d=f}}}const Fc=new Wg;class Xg extends zg{constructor(...t){const e=Gg(t,"Text");super(e,ed),this.renderPipeId="text",e.textureStyle&&(this.textureStyle=e.textureStyle instanceof Or?e.textureStyle:new Or(e.textureStyle))}updateBounds(){const t=this._bounds,e=this._anchor;let n=0,s=0;if(this._style.trim){const{frame:r,canvasAndContext:a}=Fc.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Fc.returnCanvasAndContext(a),n=r.width,s=r.height}else{const r=Gi.measureText(this._text,this._style);n=r.width,s=r.height}t.minX=-e._x*n,t.maxX=t.minX+n,t.minY=-e._y*s,t.maxY=t.minY+s}}$e.add(Hd,Vd);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hl="168",Yg=0,Oc=1,qg=2,nd=1,$g=2,En=3,Wn=0,De=1,An=2,Hn=0,Xi=1,Bc=2,kc=3,zc=4,jg=5,hi=100,Kg=101,Zg=102,Jg=103,Qg=104,t_=200,e_=201,n_=202,i_=203,vo=204,yo=205,s_=206,r_=207,a_=208,o_=209,l_=210,c_=211,h_=212,u_=213,d_=214,f_=0,p_=1,m_=2,Gr=3,g_=4,__=5,x_=6,v_=7,id=0,y_=1,S_=2,Vn=0,M_=1,b_=2,E_=3,T_=4,A_=5,w_=6,C_=7,sd=300,Zi=301,Ji=302,So=303,Mo=304,Zr=306,bo=1e3,fi=1001,Eo=1002,Ye=1003,R_=1004,rr=1005,tn=1006,Ta=1007,pi=1008,Ln=1009,rd=1010,ad=1011,Fs=1012,ul=1013,gi=1014,wn=1015,Bs=1016,dl=1017,fl=1018,Qi=1020,od=35902,ld=1021,cd=1022,en=1023,hd=1024,ud=1025,Yi=1026,ts=1027,dd=1028,pl=1029,fd=1030,ml=1031,gl=1033,Pr=33776,Ir=33777,Lr=33778,Dr=33779,To=35840,Ao=35841,wo=35842,Co=35843,Ro=36196,Po=37492,Io=37496,Lo=37808,Do=37809,Uo=37810,No=37811,Fo=37812,Oo=37813,Bo=37814,ko=37815,zo=37816,Go=37817,Ho=37818,Vo=37819,Wo=37820,Xo=37821,Ur=36492,Yo=36494,qo=36495,pd=36283,$o=36284,jo=36285,Ko=36286,P_=3200,I_=3201,md=0,L_=1,zn="",hn="srgb",qn="srgb-linear",_l="display-p3",Jr="display-p3-linear",Hr="linear",te="srgb",Vr="rec709",Wr="p3",Mi=7680,Gc=519,D_=512,U_=513,N_=514,gd=515,F_=516,O_=517,B_=518,k_=519,Hc=35044,Vc="300 es",Cn=2e3,Xr=2001;class ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Aa=Math.PI/180,Zo=180/Math.PI;function ks(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Le(i,t,e){return Math.max(t,Math.min(e,i))}function z_(i,t){return(i%t+t)%t}function wa(i,t,e){return(1-e)*i+e*t}function fs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Gt{constructor(t=0,e=0){Gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,s,r,a,o,l,c){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],p=s[3],m=s[6],y=s[1],x=s[4],S=s[7],R=s[2],T=s[5],A=s[8];return r[0]=a*_+o*y+l*R,r[3]=a*p+o*x+l*T,r[6]=a*m+o*S+l*A,r[1]=c*_+h*y+u*R,r[4]=c*p+h*x+u*T,r[7]=c*m+h*S+u*A,r[2]=d*_+f*y+g*R,r[5]=d*p+f*x+g*T,r[8]=d*m+f*S+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ca.makeScale(t,e)),this}rotate(t){return this.premultiply(Ca.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ca.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ca=new Ut;function _d(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Yr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function G_(){const i=Yr("canvas");return i.style.display="block",i}const Wc={};function Cs(i){i in Wc||(Wc[i]=!0,console.warn(i))}function H_(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Xc=new Ut().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Yc=new Ut().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ps={[qn]:{transfer:Hr,primaries:Vr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[hn]:{transfer:te,primaries:Vr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Jr]:{transfer:Hr,primaries:Wr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Yc),fromReference:i=>i.applyMatrix3(Xc)},[_l]:{transfer:te,primaries:Wr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Yc),fromReference:i=>i.applyMatrix3(Xc).convertLinearToSRGB()}},V_=new Set([qn,Jr]),$t={enabled:!0,_workingColorSpace:qn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!V_.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=ps[t].toReference,s=ps[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return ps[i].primaries},getTransfer:function(i){return i===zn?Hr:ps[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(ps[t].luminanceCoefficients)}};function qi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ra(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let bi;class W_{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{bi===void 0&&(bi=Yr("canvas")),bi.width=t.width,bi.height=t.height;const n=bi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=bi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){const e=Yr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(qi(e[n]/255)*255):e[n]=qi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let X_=0;class xd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=ks(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Pa(s[a].image)):r.push(Pa(s[a]))}else r=Pa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Pa(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?W_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Y_=0;class Ue extends ns{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,n=fi,s=fi,r=tn,a=pi,o=en,l=Ln,c=Ue.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=ks(),this.name="",this.source=new xd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bo:t.x=t.x-Math.floor(t.x);break;case fi:t.x=t.x<0?0:1;break;case Eo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bo:t.y=t.y-Math.floor(t.y);break;case fi:t.y=t.y<0?0:1;break;case Eo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=sd;Ue.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,e=0,n=0,s=1){pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,S=(f+1)/2,R=(m+1)/2,T=(h+d)/4,A=(u+_)/4,I=(g+p)/4;return x>S&&x>R?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=A/n):S>R?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=T/s,r=I/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=I/r),this.set(n,s,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class q_ extends ns{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ue(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new xd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends q_{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class vd extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $_ extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let p=1-o;const m=l*d+c*f+h*g+u*_,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const R=Math.sqrt(x),T=Math.atan2(R,m*y);p=Math.sin(p*T)/R,o=Math.sin(o*T)/R}const S=o*y;if(l=l*p+d*S,c=c*p+f*S,h=h*p+g*S,u=u*p+_*S,p===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ia.copy(this).projectOnVector(t),this.sub(Ia)}reflect(t){return this.sub(Ia.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ia=new z,qc=new zs;class Gs{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ze.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ze.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ze.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ze):Ze.fromBufferAttribute(r,a),Ze.applyMatrix4(t.matrixWorld),this.expandByPoint(Ze);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)),ar.applyMatrix4(t.matrixWorld),this.union(ar)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ze),Ze.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),or.subVectors(this.max,ms),Ei.subVectors(t.a,ms),Ti.subVectors(t.b,ms),Ai.subVectors(t.c,ms),Un.subVectors(Ti,Ei),Nn.subVectors(Ai,Ti),Jn.subVectors(Ei,Ai);let e=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-Jn.z,Jn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,Jn.z,0,-Jn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-Jn.y,Jn.x,0];return!La(e,Ei,Ti,Ai,or)||(e=[1,0,0,0,1,0,0,0,1],!La(e,Ei,Ti,Ai,or))?!1:(lr.crossVectors(Un,Nn),e=[lr.x,lr.y,lr.z],La(e,Ei,Ti,Ai,or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ze).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ze).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const vn=[new z,new z,new z,new z,new z,new z,new z,new z],Ze=new z,ar=new Gs,Ei=new z,Ti=new z,Ai=new z,Un=new z,Nn=new z,Jn=new z,ms=new z,or=new z,lr=new z,Qn=new z;function La(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Qn.fromArray(i,r);const o=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),l=t.dot(Qn),c=e.dot(Qn),h=n.dot(Qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const j_=new Gs,gs=new z,Da=new z;class xl{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):j_.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(gs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Da.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(Da)),this.expandByPoint(gs.copy(t.center).sub(Da))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new z,Ua=new z,cr=new z,Fn=new z,Na=new z,hr=new z,Fa=new z;class K_{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ua.copy(t).add(e).multiplyScalar(.5),cr.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(Ua);const r=t.distanceTo(e)*.5,a=-this.direction.dot(cr),o=Fn.dot(this.direction),l=-Fn.dot(cr),c=Fn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ua).addScaledVector(cr,d),f}intersectSphere(t,e){yn.subVectors(t.center,this.origin);const n=yn.dot(this.direction),s=yn.dot(yn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,n,s,r){Na.subVectors(e,t),hr.subVectors(n,t),Fa.crossVectors(Na,hr);let a=this.direction.dot(Fa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,t);const l=o*this.direction.dot(hr.crossVectors(Fn,hr));if(l<0)return null;const c=o*this.direction.dot(Na.cross(Fn));if(c<0||l+c>a)return null;const h=-o*Fn.dot(Fa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,r,a,o,l,c,h,u,d,f,g,_,p){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,d,f,g,_,p)}set(t,e,n,s,r,a,o,l,c,h,u,d,f,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/wi.setFromMatrixColumn(t,0).length(),r=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d-_*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Z_,t,J_)}lookAt(t,e,n){const s=this.elements;return Oe.subVectors(t,e),Oe.lengthSq()===0&&(Oe.z=1),Oe.normalize(),On.crossVectors(n,Oe),On.lengthSq()===0&&(Math.abs(n.z)===1?Oe.x+=1e-4:Oe.z+=1e-4,Oe.normalize(),On.crossVectors(n,Oe)),On.normalize(),ur.crossVectors(Oe,On),s[0]=On.x,s[4]=ur.x,s[8]=Oe.x,s[1]=On.y,s[5]=ur.y,s[9]=Oe.y,s[2]=On.z,s[6]=ur.z,s[10]=Oe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],x=n[7],S=n[11],R=n[15],T=s[0],A=s[4],I=s[8],b=s[12],v=s[1],w=s[5],B=s[9],F=s[13],O=s[2],Y=s[6],L=s[10],H=s[14],W=s[3],J=s[7],rt=s[11],dt=s[15];return r[0]=a*T+o*v+l*O+c*W,r[4]=a*A+o*w+l*Y+c*J,r[8]=a*I+o*B+l*L+c*rt,r[12]=a*b+o*F+l*H+c*dt,r[1]=h*T+u*v+d*O+f*W,r[5]=h*A+u*w+d*Y+f*J,r[9]=h*I+u*B+d*L+f*rt,r[13]=h*b+u*F+d*H+f*dt,r[2]=g*T+_*v+p*O+m*W,r[6]=g*A+_*w+p*Y+m*J,r[10]=g*I+_*B+p*L+m*rt,r[14]=g*b+_*F+p*H+m*dt,r[3]=y*T+x*v+S*O+R*W,r[7]=y*A+x*w+S*Y+R*J,r[11]=y*I+x*B+S*L+R*rt,r[15]=y*b+x*F+S*H+R*dt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*f-n*l*f)+_*(+e*l*f-e*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+p*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+m*(-s*o*h-e*l*u+e*o*d+s*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],p=t[14],m=t[15],y=u*p*c-_*d*c+_*l*f-o*p*f-u*l*m+o*d*m,x=g*d*c-h*p*c-g*l*f+a*p*f+h*l*m-a*d*m,S=h*_*c-g*u*c+g*o*f-a*_*f-h*o*m+a*u*m,R=g*u*l-h*_*l-g*o*d+a*_*d+h*o*p-a*u*p,T=e*y+n*x+s*S+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=y*A,t[1]=(_*d*r-u*p*r-_*s*f+n*p*f+u*s*m-n*d*m)*A,t[2]=(o*p*r-_*l*r+_*s*c-n*p*c-o*s*m+n*l*m)*A,t[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*f-n*l*f)*A,t[4]=x*A,t[5]=(h*p*r-g*d*r+g*s*f-e*p*f-h*s*m+e*d*m)*A,t[6]=(g*l*r-a*p*r-g*s*c+e*p*c+a*s*m-e*l*m)*A,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*f+e*l*f)*A,t[8]=S*A,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*m-e*u*m)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*m+e*o*m)*A,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*A,t[12]=R*A,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*p+e*u*p)*A,t[14]=(g*o*s-a*_*s-g*n*l+e*_*l+a*n*p-e*o*p)*A,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*d+e*o*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,p=a*u,m=o*u,y=l*c,x=l*h,S=l*u,R=n.x,T=n.y,A=n.z;return s[0]=(1-(_+m))*R,s[1]=(f+S)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(f-S)*T,s[5]=(1-(d+m))*T,s[6]=(p+y)*T,s[7]=0,s[8]=(g+x)*A,s[9]=(p-y)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=wi.set(s[0],s[1],s[2]).length();const a=wi.set(s[4],s[5],s[6]).length(),o=wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Je.copy(this);const c=1/r,h=1/a,u=1/o;return Je.elements[0]*=c,Je.elements[1]*=c,Je.elements[2]*=c,Je.elements[4]*=h,Je.elements[5]*=h,Je.elements[6]*=h,Je.elements[8]*=u,Je.elements[9]*=u,Je.elements[10]*=u,e.setFromRotationMatrix(Je),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Cn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(o===Cn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Xr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Cn){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),d=(e+t)*c,f=(n+s)*h;let g,_;if(o===Cn)g=(a+r)*u,_=-2*u;else if(o===Xr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const wi=new z,Je=new he,Z_=new z(0,0,0),J_=new z(1,1,1),On=new z,ur=new z,Oe=new z,$c=new he,jc=new zs;class mn{constructor(t=0,e=0,n=0,s=mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Le(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Le(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return $c.makeRotationFromQuaternion(t),this.setFromRotationMatrix($c,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jc.setFromEuler(this),this.setFromQuaternion(jc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mn.DEFAULT_ORDER="XYZ";class yd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Q_=0;const Kc=new z,Ci=new zs,Sn=new he,dr=new z,_s=new z,tx=new z,ex=new zs,Zc=new z(1,0,0),Jc=new z(0,1,0),Qc=new z(0,0,1),th={type:"added"},nx={type:"removed"},Ri={type:"childadded",child:null},Oa={type:"childremoved",child:null};class Ae extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=ks(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ae.DEFAULT_UP.clone();const t=new z,e=new mn,n=new zs,s=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Ut}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=Ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis(Qc,t)}translateOnAxis(t,e){return Kc.copy(t).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis(Qc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Sn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?dr.copy(t):dr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sn.lookAt(_s,dr,this.up):Sn.lookAt(dr,_s,this.up),this.quaternion.setFromRotationMatrix(Sn),s&&(Sn.extractRotation(s.matrixWorld),Ci.setFromRotationMatrix(Sn),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(th),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(nx),Oa.child=t,this.dispatchEvent(Oa),Oa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(th),Ri.child=t,this.dispatchEvent(Ri),Ri.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,tx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,ex,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ae.DEFAULT_UP=new z(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qe=new z,Mn=new z,Ba=new z,bn=new z,Pi=new z,Ii=new z,eh=new z,ka=new z,za=new z,Ga=new z;class dn{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Qe.subVectors(t,e),s.cross(Qe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Qe.subVectors(s,e),Mn.subVectors(n,e),Ba.subVectors(t,e);const a=Qe.dot(Qe),o=Qe.dot(Mn),l=Qe.dot(Ba),c=Mn.dot(Mn),h=Mn.dot(Ba),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bn.x),l.addScaledVector(a,bn.y),l.addScaledVector(o,bn.z),l)}static isFrontFacing(t,e,n,s){return Qe.subVectors(n,e),Mn.subVectors(t,e),Qe.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),Qe.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return dn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Pi.subVectors(s,n),Ii.subVectors(r,n),ka.subVectors(t,n);const l=Pi.dot(ka),c=Ii.dot(ka);if(l<=0&&c<=0)return e.copy(n);za.subVectors(t,s);const h=Pi.dot(za),u=Ii.dot(za);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Pi,a);Ga.subVectors(t,r);const f=Pi.dot(Ga),g=Ii.dot(Ga);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ii,o);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return eh.subVectors(r,s),o=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(eh,o);const m=1/(p+_+d);return a=_*m,o=d*m,e.copy(n).addScaledVector(Pi,a).addScaledVector(Ii,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},fr={h:0,s:0,l:0};function Ha(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=z_(t,1),e=Le(e,0,1),n=Le(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ha(a,r,t+1/3),this.g=Ha(a,r,t),this.b=Ha(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=hn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){const n=Sd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}copyLinearToSRGB(t){return this.r=Ra(t.r),this.g=Ra(t.g),this.b=Ra(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return $t.fromWorkingColorSpace(Ee.copy(this),t),Math.round(Le(Ee.r*255,0,255))*65536+Math.round(Le(Ee.g*255,0,255))*256+Math.round(Le(Ee.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Ee.copy(this),e);const n=Ee.r,s=Ee.g,r=Ee.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Ee.copy(this),e),t.r=Ee.r,t.g=Ee.g,t.b=Ee.b,t}getStyle(t=hn){$t.fromWorkingColorSpace(Ee.copy(this),t);const e=Ee.r,n=Ee.g,s=Ee.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(fr);const n=wa(Bn.h,fr.h,e),s=wa(Bn.s,fr.s,e),r=wa(Bn.l,fr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ee=new Vt;Vt.NAMES=Sd;let ix=0;class Hs extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=ks(),this.name="",this.type="Material",this.blending=Xi,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vo,this.blendDst=yo,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xi&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==vo&&(n.blendSrc=this.blendSrc),this.blendDst!==yo&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Md extends Hs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=id,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fe=new z,pr=new Gt;class fn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Cs("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)pr.fromBufferAttribute(this,e),pr.applyMatrix3(t),this.setXY(e,pr.x,pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix3(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix4(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyNormalMatrix(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.transformDirection(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),s=Pe(s,this.array),r=Pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Hc&&(t.usage=this.usage),t}}class bd extends fn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ed extends fn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pn extends fn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let sx=0;const Ve=new he,Va=new Ae,Li=new z,Be=new Gs,xs=new Gs,xe=new z;class $n extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sx++}),this.uuid=ks(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_d(t)?Ed:bd)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ve.makeRotationFromQuaternion(t),this.applyMatrix4(Ve),this}rotateX(t){return Ve.makeRotationX(t),this.applyMatrix4(Ve),this}rotateY(t){return Ve.makeRotationY(t),this.applyMatrix4(Ve),this}rotateZ(t){return Ve.makeRotationZ(t),this.applyMatrix4(Ve),this}translate(t,e,n){return Ve.makeTranslation(t,e,n),this.applyMatrix4(Ve),this}scale(t,e,n){return Ve.makeScale(t,e,n),this.applyMatrix4(Ve),this}lookAt(t){return Va.lookAt(t),Va.updateMatrix(),this.applyMatrix4(Va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Li).negate(),this.translate(Li.x,Li.y,Li.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new pn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Be.setFromBufferAttribute(r),this.morphTargetsRelative?(xe.addVectors(this.boundingBox.min,Be.min),this.boundingBox.expandByPoint(xe),xe.addVectors(this.boundingBox.max,Be.max),this.boundingBox.expandByPoint(xe)):(this.boundingBox.expandByPoint(Be.min),this.boundingBox.expandByPoint(Be.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(Be.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];xs.setFromBufferAttribute(o),this.morphTargetsRelative?(xe.addVectors(Be.min,xs.min),Be.expandByPoint(xe),xe.addVectors(Be.max,xs.max),Be.expandByPoint(xe)):(Be.expandByPoint(xs.min),Be.expandByPoint(xs.max))}Be.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)xe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(xe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)xe.fromBufferAttribute(o,c),l&&(Li.fromBufferAttribute(t,c),xe.add(Li)),s=Math.max(s,n.distanceToSquared(xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new z,l[I]=new z;const c=new z,h=new z,u=new z,d=new Gt,f=new Gt,g=new Gt,_=new z,p=new z;function m(I,b,v){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const w=1/(f.x*g.y-g.x*f.y);isFinite(w)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(w),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(w),o[I].add(_),o[b].add(_),o[v].add(_),l[I].add(p),l[b].add(p),l[v].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let I=0,b=y.length;I<b;++I){const v=y[I],w=v.start,B=v.count;for(let F=w,O=w+B;F<O;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const x=new z,S=new z,R=new z,T=new z;function A(I){R.fromBufferAttribute(s,I),T.copy(R);const b=o[I];x.copy(b),x.sub(R.multiplyScalar(R.dot(b))).normalize(),S.crossVectors(T,b);const w=S.dot(l[I])<0?-1:1;a.setXYZW(I,x.x,x.y,x.z,w)}for(let I=0,b=y.length;I<b;++I){const v=y[I],w=v.start,B=v.count;for(let F=w,O=w+B;F<O;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new z,r=new z,a=new z,o=new z,l=new z,c=new z,h=new z,u=new z;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)xe.fromBufferAttribute(t,e),xe.normalize(),t.setXYZ(e,xe.x,xe.y,xe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new fn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new $n,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nh=new he,ti=new K_,mr=new xl,ih=new z,Di=new z,Ui=new z,Ni=new z,Wa=new z,gr=new z,_r=new Gt,xr=new Gt,vr=new Gt,sh=new z,rh=new z,ah=new z,yr=new z,Sr=new z;class nn extends Ae{constructor(t=new $n,e=new Md){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Wa.fromBufferAttribute(u,t),a?gr.addScaledVector(Wa,h):gr.addScaledVector(Wa.sub(e),h))}e.add(gr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),ti.copy(t.ray).recast(t.near),!(mr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(mr,ih)===null||ti.origin.distanceToSquared(ih)>(t.far-t.near)**2))&&(nh.copy(r).invert(),ti.copy(t.ray).applyMatrix4(nh),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ti)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let S=y,R=x;S<R;S+=3){const T=o.getX(S),A=o.getX(S+1),I=o.getX(S+2);s=Mr(this,m,t,n,c,h,u,T,A,I),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=o.getX(p),x=o.getX(p+1),S=o.getX(p+2);s=Mr(this,a,t,n,c,h,u,y,x,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let S=y,R=x;S<R;S+=3){const T=S,A=S+1,I=S+2;s=Mr(this,m,t,n,c,h,u,T,A,I),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=p,x=p+1,S=p+2;s=Mr(this,a,t,n,c,h,u,y,x,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function rx(i,t,e,n,s,r,a,o){let l;if(t.side===De?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Wn,o),l===null)return null;Sr.copy(o),Sr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:i}}function Mr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Di),i.getVertexPosition(l,Ui),i.getVertexPosition(c,Ni);const h=rx(i,t,e,n,Di,Ui,Ni,yr);if(h){s&&(_r.fromBufferAttribute(s,o),xr.fromBufferAttribute(s,l),vr.fromBufferAttribute(s,c),h.uv=dn.getInterpolation(yr,Di,Ui,Ni,_r,xr,vr,new Gt)),r&&(_r.fromBufferAttribute(r,o),xr.fromBufferAttribute(r,l),vr.fromBufferAttribute(r,c),h.uv1=dn.getInterpolation(yr,Di,Ui,Ni,_r,xr,vr,new Gt)),a&&(sh.fromBufferAttribute(a,o),rh.fromBufferAttribute(a,l),ah.fromBufferAttribute(a,c),h.normal=dn.getInterpolation(yr,Di,Ui,Ni,sh,rh,ah,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new z,materialIndex:0};dn.getNormal(Di,Ui,Ni,u.normal),h.face=u}return h}class is extends $n{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pn(c,3)),this.setAttribute("normal",new pn(h,3)),this.setAttribute("uv",new pn(u,2));function g(_,p,m,y,x,S,R,T,A,I,b){const v=S/A,w=R/I,B=S/2,F=R/2,O=T/2,Y=A+1,L=I+1;let H=0,W=0;const J=new z;for(let rt=0;rt<L;rt++){const dt=rt*w-F;for(let It=0;It<Y;It++){const kt=It*v-B;J[_]=kt*y,J[p]=dt*x,J[m]=O,c.push(J.x,J.y,J.z),J[_]=0,J[p]=0,J[m]=T>0?1:-1,h.push(J.x,J.y,J.z),u.push(It/A),u.push(1-rt/I),H+=1}}for(let rt=0;rt<I;rt++)for(let dt=0;dt<A;dt++){const It=d+dt+Y*rt,kt=d+dt+Y*(rt+1),X=d+(dt+1)+Y*(rt+1),Q=d+(dt+1)+Y*rt;l.push(It,kt,Q),l.push(kt,X,Q),W+=6}o.addGroup(f,W,b),f+=W,d+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new is(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function es(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function we(i){const t={};for(let e=0;e<i.length;e++){const n=es(i[e]);for(const s in n)t[s]=n[s]}return t}function ax(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Td(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const ox={clone:es,merge:we};var lx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends Hs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lx,this.fragmentShader=cx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=es(t.uniforms),this.uniformsGroups=ax(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ad extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Cn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new z,oh=new Gt,lh=new Gt;class We extends Ad{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Zo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Aa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zo*2*Math.atan(Math.tan(Aa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,oh,lh),e.subVectors(lh,oh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Aa*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fi=-90,Oi=1;class hx extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new We(Fi,Oi,t,e);s.layers=this.layers,this.add(s);const r=new We(Fi,Oi,t,e);r.layers=this.layers,this.add(r);const a=new We(Fi,Oi,t,e);a.layers=this.layers,this.add(a);const o=new We(Fi,Oi,t,e);o.layers=this.layers,this.add(o);const l=new We(Fi,Oi,t,e);l.layers=this.layers,this.add(l);const c=new We(Fi,Oi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wd extends Ue{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Zi,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ux extends _i{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new wd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new is(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:De,blending:Hn});r.uniforms.tEquirect.value=e;const a=new nn(s,r),o=e.minFilter;return e.minFilter===pi&&(e.minFilter=tn),new hx(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Xa=new z,dx=new z,fx=new Ut;class li{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Xa.subVectors(n,e).cross(dx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||fx.getNormalMatrix(t),s=this.coplanarPoint(Xa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new xl,br=new z;class vl{constructor(t=new li,e=new li,n=new li,s=new li,r=new li,a=new li){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],p=s[11],m=s[12],y=s[13],x=s[14],S=s[15];if(n[0].setComponents(l-r,d-c,p-f,S-m).normalize(),n[1].setComponents(l+r,d+c,p+f,S+m).normalize(),n[2].setComponents(l+a,d+h,p+g,S+y).normalize(),n[3].setComponents(l-a,d-h,p-g,S-y).normalize(),n[4].setComponents(l-o,d-u,p-_,S-x).normalize(),e===Cn)n[5].setComponents(l+o,d+u,p+_,S+x).normalize();else if(e===Xr)n[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(t){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(br.x=s.normal.x>0?t.max.x:t.min.x,br.y=s.normal.y>0?t.max.y:t.min.y,br.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(br)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Cd(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function px(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(i.bindBuffer(c,o),u.count===-1&&d.length===0&&i.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Qr extends $n{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const y=m*d-a;for(let x=0;x<c;x++){const S=x*u-r;g.push(S,-y,0),_.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){const x=y+c*m,S=y+c*(m+1),R=y+1+c*(m+1),T=y+1+c*m;f.push(x,S,T),f.push(S,R,T)}this.setIndex(f),this.setAttribute("position",new pn(g,3)),this.setAttribute("normal",new pn(_,3)),this.setAttribute("uv",new pn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qr(t.width,t.height,t.widthSegments,t.heightSegments)}}var mx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_x=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Mx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ex=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ax=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ux=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ox=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Bx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,kx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yx=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$x=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,t0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,n0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,i0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,r0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,a0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,o0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,l0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,u0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,d0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,f0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,p0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,m0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,g0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,v0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,S0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,M0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,E0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,T0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,A0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,C0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,P0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,I0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,D0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,U0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,O0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,B0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,k0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,V0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,W0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,q0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,K0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Z0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,J0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Q0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ev=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,nv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,av=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ov=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_v=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Av=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Iv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Dv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Nv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Fv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ov=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,kv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Vv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dt={alphahash_fragment:mx,alphahash_pars_fragment:gx,alphamap_fragment:_x,alphamap_pars_fragment:xx,alphatest_fragment:vx,alphatest_pars_fragment:yx,aomap_fragment:Sx,aomap_pars_fragment:Mx,batching_pars_vertex:bx,batching_vertex:Ex,begin_vertex:Tx,beginnormal_vertex:Ax,bsdfs:wx,iridescence_fragment:Cx,bumpmap_pars_fragment:Rx,clipping_planes_fragment:Px,clipping_planes_pars_fragment:Ix,clipping_planes_pars_vertex:Lx,clipping_planes_vertex:Dx,color_fragment:Ux,color_pars_fragment:Nx,color_pars_vertex:Fx,color_vertex:Ox,common:Bx,cube_uv_reflection_fragment:kx,defaultnormal_vertex:zx,displacementmap_pars_vertex:Gx,displacementmap_vertex:Hx,emissivemap_fragment:Vx,emissivemap_pars_fragment:Wx,colorspace_fragment:Xx,colorspace_pars_fragment:Yx,envmap_fragment:qx,envmap_common_pars_fragment:$x,envmap_pars_fragment:jx,envmap_pars_vertex:Kx,envmap_physical_pars_fragment:o0,envmap_vertex:Zx,fog_vertex:Jx,fog_pars_vertex:Qx,fog_fragment:t0,fog_pars_fragment:e0,gradientmap_pars_fragment:n0,lightmap_pars_fragment:i0,lights_lambert_fragment:s0,lights_lambert_pars_fragment:r0,lights_pars_begin:a0,lights_toon_fragment:l0,lights_toon_pars_fragment:c0,lights_phong_fragment:h0,lights_phong_pars_fragment:u0,lights_physical_fragment:d0,lights_physical_pars_fragment:f0,lights_fragment_begin:p0,lights_fragment_maps:m0,lights_fragment_end:g0,logdepthbuf_fragment:_0,logdepthbuf_pars_fragment:x0,logdepthbuf_pars_vertex:v0,logdepthbuf_vertex:y0,map_fragment:S0,map_pars_fragment:M0,map_particle_fragment:b0,map_particle_pars_fragment:E0,metalnessmap_fragment:T0,metalnessmap_pars_fragment:A0,morphinstance_vertex:w0,morphcolor_vertex:C0,morphnormal_vertex:R0,morphtarget_pars_vertex:P0,morphtarget_vertex:I0,normal_fragment_begin:L0,normal_fragment_maps:D0,normal_pars_fragment:U0,normal_pars_vertex:N0,normal_vertex:F0,normalmap_pars_fragment:O0,clearcoat_normal_fragment_begin:B0,clearcoat_normal_fragment_maps:k0,clearcoat_pars_fragment:z0,iridescence_pars_fragment:G0,opaque_fragment:H0,packing:V0,premultiplied_alpha_fragment:W0,project_vertex:X0,dithering_fragment:Y0,dithering_pars_fragment:q0,roughnessmap_fragment:$0,roughnessmap_pars_fragment:j0,shadowmap_pars_fragment:K0,shadowmap_pars_vertex:Z0,shadowmap_vertex:J0,shadowmask_pars_fragment:Q0,skinbase_vertex:tv,skinning_pars_vertex:ev,skinning_vertex:nv,skinnormal_vertex:iv,specularmap_fragment:sv,specularmap_pars_fragment:rv,tonemapping_fragment:av,tonemapping_pars_fragment:ov,transmission_fragment:lv,transmission_pars_fragment:cv,uv_pars_fragment:hv,uv_pars_vertex:uv,uv_vertex:dv,worldpos_vertex:fv,background_vert:pv,background_frag:mv,backgroundCube_vert:gv,backgroundCube_frag:_v,cube_vert:xv,cube_frag:vv,depth_vert:yv,depth_frag:Sv,distanceRGBA_vert:Mv,distanceRGBA_frag:bv,equirect_vert:Ev,equirect_frag:Tv,linedashed_vert:Av,linedashed_frag:wv,meshbasic_vert:Cv,meshbasic_frag:Rv,meshlambert_vert:Pv,meshlambert_frag:Iv,meshmatcap_vert:Lv,meshmatcap_frag:Dv,meshnormal_vert:Uv,meshnormal_frag:Nv,meshphong_vert:Fv,meshphong_frag:Ov,meshphysical_vert:Bv,meshphysical_frag:kv,meshtoon_vert:zv,meshtoon_frag:Gv,points_vert:Hv,points_frag:Vv,shadow_vert:Wv,shadow_frag:Xv,sprite_vert:Yv,sprite_frag:qv},st={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},un={basic:{uniforms:we([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:we([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:we([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:we([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:we([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:we([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:we([st.points,st.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:we([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:we([st.common,st.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:we([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:we([st.sprite,st.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:we([st.common,st.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:we([st.lights,st.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};un.physical={uniforms:we([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const Er={r:0,b:0,g:0},ni=new mn,$v=new he;function jv(i,t,e,n,s,r,a){const o=new Vt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1;const S=g(y);S===null?m(o,l):S&&S.isColor&&(m(S,1),x=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(y,x){const S=g(x);S&&(S.isCubeTexture||S.mapping===Zr)?(h===void 0&&(h=new nn(new is(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:es(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:De,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ni.copy(x.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($v.makeRotationFromEuler(ni)),h.material.toneMapped=$t.getTransfer(S.colorSpace)!==te,(u!==S||d!==S.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new nn(new Qr(2,2),new Xn({name:"BackgroundMaterial",uniforms:es(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=$t.getTransfer(S.colorSpace)!==te,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,x){y.getRGB(Er,Td(i)),n.buffers.color.setClear(Er.r,Er.g,Er.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(o,l)},render:_,addToRenderList:p}}function Kv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(v,w,B,F,O){let Y=!1;const L=u(F,B,w);r!==L&&(r=L,c(r.object)),Y=f(v,F,B,O),Y&&g(v,F,B,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,S(v,w,B,F),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,w,B){const F=B.wireframe===!0;let O=n[v.id];O===void 0&&(O={},n[v.id]=O);let Y=O[w.id];Y===void 0&&(Y={},O[w.id]=Y);let L=Y[F];return L===void 0&&(L=d(l()),Y[F]=L),L}function d(v){const w=[],B=[],F=[];for(let O=0;O<e;O++)w[O]=0,B[O]=0,F[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:B,attributeDivisors:F,object:v,attributes:{},index:null}}function f(v,w,B,F){const O=r.attributes,Y=w.attributes;let L=0;const H=B.getAttributes();for(const W in H)if(H[W].location>=0){const rt=O[W];let dt=Y[W];if(dt===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(dt=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(dt=v.instanceColor)),rt===void 0||rt.attribute!==dt||dt&&rt.data!==dt.data)return!0;L++}return r.attributesNum!==L||r.index!==F}function g(v,w,B,F){const O={},Y=w.attributes;let L=0;const H=B.getAttributes();for(const W in H)if(H[W].location>=0){let rt=Y[W];rt===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(rt=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(rt=v.instanceColor));const dt={};dt.attribute=rt,rt&&rt.data&&(dt.data=rt.data),O[W]=dt,L++}r.attributes=O,r.attributesNum=L,r.index=F}function _(){const v=r.newAttributes;for(let w=0,B=v.length;w<B;w++)v[w]=0}function p(v){m(v,0)}function m(v,w){const B=r.newAttributes,F=r.enabledAttributes,O=r.attributeDivisors;B[v]=1,F[v]===0&&(i.enableVertexAttribArray(v),F[v]=1),O[v]!==w&&(i.vertexAttribDivisor(v,w),O[v]=w)}function y(){const v=r.newAttributes,w=r.enabledAttributes;for(let B=0,F=w.length;B<F;B++)w[B]!==v[B]&&(i.disableVertexAttribArray(B),w[B]=0)}function x(v,w,B,F,O,Y,L){L===!0?i.vertexAttribIPointer(v,w,B,O,Y):i.vertexAttribPointer(v,w,B,F,O,Y)}function S(v,w,B,F){_();const O=F.attributes,Y=B.getAttributes(),L=w.defaultAttributeValues;for(const H in Y){const W=Y[H];if(W.location>=0){let J=O[H];if(J===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(J=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(J=v.instanceColor)),J!==void 0){const rt=J.normalized,dt=J.itemSize,It=t.get(J);if(It===void 0)continue;const kt=It.buffer,X=It.type,Q=It.bytesPerElement,ct=X===i.INT||X===i.UNSIGNED_INT||J.gpuType===ul;if(J.isInterleavedBufferAttribute){const lt=J.data,St=lt.stride,Mt=J.offset;if(lt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<W.locationSize;Pt++)m(W.location+Pt,lt.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Pt=0;Pt<W.locationSize;Pt++)p(W.location+Pt);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let Pt=0;Pt<W.locationSize;Pt++)x(W.location+Pt,dt/W.locationSize,X,rt,St*Q,(Mt+dt/W.locationSize*Pt)*Q,ct)}else{if(J.isInstancedBufferAttribute){for(let lt=0;lt<W.locationSize;lt++)m(W.location+lt,J.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let lt=0;lt<W.locationSize;lt++)p(W.location+lt);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let lt=0;lt<W.locationSize;lt++)x(W.location+lt,dt/W.locationSize,X,rt,dt*Q,dt/W.locationSize*lt*Q,ct)}}else if(L!==void 0){const rt=L[H];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(W.location,rt);break;case 3:i.vertexAttrib3fv(W.location,rt);break;case 4:i.vertexAttrib4fv(W.location,rt);break;default:i.vertexAttrib1fv(W.location,rt)}}}}y()}function R(){I();for(const v in n){const w=n[v];for(const B in w){const F=w[B];for(const O in F)h(F[O].object),delete F[O];delete w[B]}delete n[v]}}function T(v){if(n[v.id]===void 0)return;const w=n[v.id];for(const B in w){const F=w[B];for(const O in F)h(F[O].object),delete F[O];delete w[B]}delete n[v.id]}function A(v){for(const w in n){const B=n[w];if(B[v.id]===void 0)continue;const F=B[v.id];for(const O in F)h(F[O].object),delete F[O];delete B[v.id]}}function I(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function Zv(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)e.update(g,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Jv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==en&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===Bs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Ln&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==wn&&!A)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:m,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:S,maxSamples:R}}function Qv(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new li,o=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const y=r?0:n,x=y*4;let S=m.clippingState||null;l.value=S,S=h(g,d,x,f);for(let R=0;R!==x;++R)S[R]=e[R];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,S=f;x!==_;++x,S+=4)a.copy(u[x]).applyMatrix4(y,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function ty(i){let t=new WeakMap;function e(a,o){return o===So?a.mapping=Zi:o===Mo&&(a.mapping=Ji),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===So||o===Mo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ux(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Rd extends Ad{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Wi=4,ch=[.125,.215,.35,.446,.526,.582],ui=20,Ya=new Rd,hh=new Vt;let qa=null,$a=0,ja=0,Ka=!1;const ci=(1+Math.sqrt(5))/2,Bi=1/ci,uh=[new z(-ci,Bi,0),new z(ci,Bi,0),new z(-Bi,0,ci),new z(Bi,0,ci),new z(0,ci,-Bi),new z(0,ci,Bi),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class dh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){qa=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel(),Ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qa,$a,ja),this._renderer.xr.enabled=Ka,t.scissorTest=!1,Tr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zi||t.mapping===Ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qa=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),ja=this._renderer.getActiveMipmapLevel(),Ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:Bs,format:en,colorSpace:qn,depthBuffer:!1},s=fh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ey(r)),this._blurMaterial=ny(r,t,e)}return s}_compileMaterial(t){const e=new nn(this._lodPlanes[0],t);this._renderer.compile(e,Ya)}_sceneToCubeUV(t,e,n,s){const o=new We(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(hh),h.toneMapping=Vn,h.autoClear=!1;const f=new Md({name:"PMREM.Background",side:De,depthWrite:!1,depthTest:!1}),g=new nn(new is,f);let _=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,_=!0):(f.color.copy(hh),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):y===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));const x=this._cubeSize;Tr(s,y*x,m>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Zi||t.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ph());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new nn(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Tr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ya)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=uh[(s-r-1)%uh.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new nn(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ui-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):ui;p>ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ui}`);const m=[];let y=0;for(let A=0;A<ui;++A){const I=A/_,b=Math.exp(-I*I/2);m.push(b),A===0?y+=b:A<p&&(y+=2*b)}for(let A=0;A<m.length;A++)m[A]=m[A]/y;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const S=this._sizeLods[s],R=3*S*(s>x-Wi?s-x+Wi:0),T=4*(this._cubeSize-S);Tr(e,R,T,3*S,2*S),l.setRenderTarget(e),l.render(u,Ya)}}function ey(i){const t=[],e=[],n=[];let s=i;const r=i-Wi+1+ch.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Wi?l=ch[a-i+Wi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*f),x=new Float32Array(p*g*f),S=new Float32Array(m*g*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,I=T>2?0:-1,b=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];y.set(b,_*g*T),x.set(d,p*g*T);const v=[T,T,T,T,T,T];S.set(v,m*g*T)}const R=new $n;R.setAttribute("position",new fn(y,_)),R.setAttribute("uv",new fn(x,p)),R.setAttribute("faceIndex",new fn(S,m)),t.push(R),s>Wi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fh(i,t,e){const n=new _i(i,t,e);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Tr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function ny(i,t,e){const n=new Float32Array(ui),s=new z(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function ph(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function mh(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function yl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function iy(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===So||l===Mo,h=l===Zi||l===Ji;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new dh(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new dh(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function sy(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Cs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ry(i,t,e,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],i.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let x=0,S=y.length;x<S;x+=3){const R=y[x+0],T=y[x+1],A=y[x+2];d.push(R,T,T,A,A,R)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,S=y.length/3-1;x<S;x+=3){const R=x+0,T=x+1,A=x+2;d.push(R,T,T,A,A,R)}}else return;const p=new(_d(d)?Ed:bd)(d,1);p.version=_;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function ay(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];e.update(p,n,1)}function u(d,f,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/a,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let m=0;for(let y=0;y<g;y++)m+=f[y];for(let y=0;y<_.length;y++)e.update(m,n,_[y])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function oy(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ly(i,t,e){const n=new WeakMap,s=new pe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let S=o.attributes.position.count*x,R=1;S>t.maxTextureSize&&(R=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const T=new Float32Array(S*R*4*u),A=new vd(T,S,R,u);A.type=wn,A.needsUpdate=!0;const I=x*4;for(let v=0;v<u;v++){const w=p[v],B=m[v],F=y[v],O=S*R*4*v;for(let Y=0;Y<w.count;Y++){const L=Y*I;f===!0&&(s.fromBufferAttribute(w,Y),T[O+L+0]=s.x,T[O+L+1]=s.y,T[O+L+2]=s.z,T[O+L+3]=0),g===!0&&(s.fromBufferAttribute(B,Y),T[O+L+4]=s.x,T[O+L+5]=s.y,T[O+L+6]=s.z,T[O+L+7]=0),_===!0&&(s.fromBufferAttribute(F,Y),T[O+L+8]=s.x,T[O+L+9]=s.y,T[O+L+10]=s.z,T[O+L+11]=F.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new Gt(S,R)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function cy(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Pd extends Ue{constructor(t,e,n,s,r,a,o,l,c,h=Yi){if(h!==Yi&&h!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Yi&&(n=gi),n===void 0&&h===ts&&(n=Qi),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ye,this.minFilter=l!==void 0?l:Ye,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Id=new Ue,gh=new Pd(1,1),Ld=new vd,Dd=new $_,Ud=new wd,_h=[],xh=[],vh=new Float32Array(16),yh=new Float32Array(9),Sh=new Float32Array(4);function ss(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=_h[s];if(r===void 0&&(r=new Float32Array(s),_h[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function _e(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ta(i,t){let e=xh[t];e===void 0&&(e=new Int32Array(t),xh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function hy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function uy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),_e(e,t)}}function dy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),_e(e,t)}}function fy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),_e(e,t)}}function py(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;Sh.set(n),i.uniformMatrix2fv(this.addr,!1,Sh),_e(e,n)}}function my(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;yh.set(n),i.uniformMatrix3fv(this.addr,!1,yh),_e(e,n)}}function gy(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;vh.set(n),i.uniformMatrix4fv(this.addr,!1,vh),_e(e,n)}}function _y(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function xy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),_e(e,t)}}function vy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),_e(e,t)}}function yy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),_e(e,t)}}function Sy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function My(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),_e(e,t)}}function by(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),_e(e,t)}}function Ey(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),_e(e,t)}}function Ty(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(gh.compareFunction=gd,r=gh):r=Id,e.setTexture2D(t||r,s)}function Ay(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Dd,s)}function wy(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ud,s)}function Cy(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ld,s)}function Ry(i){switch(i){case 5126:return hy;case 35664:return uy;case 35665:return dy;case 35666:return fy;case 35674:return py;case 35675:return my;case 35676:return gy;case 5124:case 35670:return _y;case 35667:case 35671:return xy;case 35668:case 35672:return vy;case 35669:case 35673:return yy;case 5125:return Sy;case 36294:return My;case 36295:return by;case 36296:return Ey;case 35678:case 36198:case 36298:case 36306:case 35682:return Ty;case 35679:case 36299:case 36307:return Ay;case 35680:case 36300:case 36308:case 36293:return wy;case 36289:case 36303:case 36311:case 36292:return Cy}}function Py(i,t){i.uniform1fv(this.addr,t)}function Iy(i,t){const e=ss(t,this.size,2);i.uniform2fv(this.addr,e)}function Ly(i,t){const e=ss(t,this.size,3);i.uniform3fv(this.addr,e)}function Dy(i,t){const e=ss(t,this.size,4);i.uniform4fv(this.addr,e)}function Uy(i,t){const e=ss(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ny(i,t){const e=ss(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Fy(i,t){const e=ss(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Oy(i,t){i.uniform1iv(this.addr,t)}function By(i,t){i.uniform2iv(this.addr,t)}function ky(i,t){i.uniform3iv(this.addr,t)}function zy(i,t){i.uniform4iv(this.addr,t)}function Gy(i,t){i.uniform1uiv(this.addr,t)}function Hy(i,t){i.uniform2uiv(this.addr,t)}function Vy(i,t){i.uniform3uiv(this.addr,t)}function Wy(i,t){i.uniform4uiv(this.addr,t)}function Xy(i,t,e){const n=this.cache,s=t.length,r=ta(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Id,r[a])}function Yy(i,t,e){const n=this.cache,s=t.length,r=ta(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Dd,r[a])}function qy(i,t,e){const n=this.cache,s=t.length,r=ta(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ud,r[a])}function $y(i,t,e){const n=this.cache,s=t.length,r=ta(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Ld,r[a])}function jy(i){switch(i){case 5126:return Py;case 35664:return Iy;case 35665:return Ly;case 35666:return Dy;case 35674:return Uy;case 35675:return Ny;case 35676:return Fy;case 5124:case 35670:return Oy;case 35667:case 35671:return By;case 35668:case 35672:return ky;case 35669:case 35673:return zy;case 5125:return Gy;case 36294:return Hy;case 36295:return Vy;case 36296:return Wy;case 35678:case 36198:case 36298:case 36306:case 35682:return Xy;case 35679:case 36299:case 36307:return Yy;case 35680:case 36300:case 36308:case 36293:return qy;case 36289:case 36303:case 36311:case 36292:return $y}}class Ky{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ry(e.type)}}class Zy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jy(e.type)}}class Jy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Za=/(\w+)(\])?(\[|\.)?/g;function Mh(i,t){i.seq.push(t),i.map[t.id]=t}function Qy(i,t,e){const n=i.name,s=n.length;for(Za.lastIndex=0;;){const r=Za.exec(n),a=Za.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Mh(e,c===void 0?new Ky(o,i,t):new Zy(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Jy(o),Mh(e,u)),e=u}}}class Nr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Qy(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function bh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const tS=37297;let eS=0;function nS(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function iS(i){const t=$t.getPrimaries($t.workingColorSpace),e=$t.getPrimaries(i);let n;switch(t===e?n="":t===Wr&&e===Vr?n="LinearDisplayP3ToLinearSRGB":t===Vr&&e===Wr&&(n="LinearSRGBToLinearDisplayP3"),i){case qn:case Jr:return[n,"LinearTransferOETF"];case hn:case _l:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Eh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+nS(i.getShaderSource(t),a)}else return s}function sS(i,t){const e=iS(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function rS(i,t){let e;switch(t){case M_:e="Linear";break;case b_:e="Reinhard";break;case E_:e="Cineon";break;case T_:e="ACESFilmic";break;case w_:e="AgX";break;case C_:e="Neutral";break;case A_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ar=new z;function aS(){$t.getLuminanceCoefficients(Ar);const i=Ar.x.toFixed(4),t=Ar.y.toFixed(4),e=Ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function oS(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bs).join(`
`)}function lS(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cS(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function bs(i){return i!==""}function Th(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ah(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(i){return i.replace(hS,dS)}const uS=new Map;function dS(i,t){let e=Dt[t];if(e===void 0){const n=uS.get(t);if(n!==void 0)e=Dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Jo(e)}const fS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(i){return i.replace(fS,pS)}function pS(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ch(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mS(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===nd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===$g?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===En&&(t="SHADOWMAP_TYPE_VSM"),t}function gS(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Zi:case Ji:t="ENVMAP_TYPE_CUBE";break;case Zr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _S(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ji:t="ENVMAP_MODE_REFRACTION";break}return t}function xS(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case id:t="ENVMAP_BLENDING_MULTIPLY";break;case y_:t="ENVMAP_BLENDING_MIX";break;case S_:t="ENVMAP_BLENDING_ADD";break}return t}function vS(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function yS(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=mS(e),c=gS(e),h=_S(e),u=xS(e),d=vS(e),f=oS(e),g=lS(r),_=s.createProgram();let p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),m.length>0&&(m+=`
`)):(p=[Ch(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),m=[Ch(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?Dt.tonemapping_pars_fragment:"",e.toneMapping!==Vn?rS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,sS("linearToOutputTexel",e.outputColorSpace),aS(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(bs).join(`
`)),a=Jo(a),a=Th(a,e),a=Ah(a,e),o=Jo(o),o=Th(o,e),o=Ah(o,e),a=wh(a),o=wh(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Vc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=y+p+a,S=y+m+o,R=bh(s,s.VERTEX_SHADER,x),T=bh(s,s.FRAGMENT_SHADER,S);s.attachShader(_,R),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(w){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(_).trim(),F=s.getShaderInfoLog(R).trim(),O=s.getShaderInfoLog(T).trim();let Y=!0,L=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,T);else{const H=Eh(s,R,"vertex"),W=Eh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+B+`
`+H+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||O==="")&&(L=!1);L&&(w.diagnostics={runnable:Y,programLog:B,vertexShader:{log:F,prefix:p},fragmentShader:{log:O,prefix:m}})}s.deleteShader(R),s.deleteShader(T),I=new Nr(s,_),b=cS(s,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,tS)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=eS++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=T,this}let SS=0;class MS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new bS(t),e.set(t,n)),n}}class bS{constructor(t){this.id=SS++,this.code=t,this.usedTimes=0}}function ES(i,t,e,n,s,r,a){const o=new yd,l=new MS,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,v,w,B,F){const O=B.fog,Y=F.geometry,L=b.isMeshStandardMaterial?B.environment:null,H=(b.isMeshStandardMaterial?e:t).get(b.envMap||L),W=H&&H.mapping===Zr?H.image.height:null,J=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const rt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,dt=rt!==void 0?rt.length:0;let It=0;Y.morphAttributes.position!==void 0&&(It=1),Y.morphAttributes.normal!==void 0&&(It=2),Y.morphAttributes.color!==void 0&&(It=3);let kt,X,Q,ct;if(J){const Wt=un[J];kt=Wt.vertexShader,X=Wt.fragmentShader}else kt=b.vertexShader,X=b.fragmentShader,l.update(b),Q=l.getVertexShaderID(b),ct=l.getFragmentShaderID(b);const lt=i.getRenderTarget(),St=F.isInstancedMesh===!0,Mt=F.isBatchedMesh===!0,Pt=!!b.map,Qt=!!b.matcap,P=!!H,Kt=!!b.aoMap,Ft=!!b.lightMap,Ot=!!b.bumpMap,xt=!!b.normalMap,ee=!!b.displacementMap,Tt=!!b.emissiveMap,Ct=!!b.metalnessMap,C=!!b.roughnessMap,M=b.anisotropy>0,V=b.clearcoat>0,j=b.dispersion>0,Z=b.iridescence>0,K=b.sheen>0,yt=b.transmission>0,at=M&&!!b.anisotropyMap,ut=V&&!!b.clearcoatMap,Lt=V&&!!b.clearcoatNormalMap,tt=V&&!!b.clearcoatRoughnessMap,ht=Z&&!!b.iridescenceMap,zt=Z&&!!b.iridescenceThicknessMap,wt=K&&!!b.sheenColorMap,ft=K&&!!b.sheenRoughnessMap,Rt=!!b.specularMap,Nt=!!b.specularColorMap,ne=!!b.specularIntensityMap,D=yt&&!!b.transmissionMap,et=yt&&!!b.thicknessMap,q=!!b.gradientMap,$=!!b.alphaMap,it=b.alphaTest>0,bt=!!b.alphaHash,Ht=!!b.extensions;let ue=Vn;b.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(ue=i.toneMapping);const ye={shaderID:J,shaderType:b.type,shaderName:b.name,vertexShader:kt,fragmentShader:X,defines:b.defines,customVertexShaderID:Q,customFragmentShaderID:ct,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Mt,batchingColor:Mt&&F._colorsTexture!==null,instancing:St,instancingColor:St&&F.instanceColor!==null,instancingMorph:St&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:qn,alphaToCoverage:!!b.alphaToCoverage,map:Pt,matcap:Qt,envMap:P,envMapMode:P&&H.mapping,envMapCubeUVHeight:W,aoMap:Kt,lightMap:Ft,bumpMap:Ot,normalMap:xt,displacementMap:d&&ee,emissiveMap:Tt,normalMapObjectSpace:xt&&b.normalMapType===L_,normalMapTangentSpace:xt&&b.normalMapType===md,metalnessMap:Ct,roughnessMap:C,anisotropy:M,anisotropyMap:at,clearcoat:V,clearcoatMap:ut,clearcoatNormalMap:Lt,clearcoatRoughnessMap:tt,dispersion:j,iridescence:Z,iridescenceMap:ht,iridescenceThicknessMap:zt,sheen:K,sheenColorMap:wt,sheenRoughnessMap:ft,specularMap:Rt,specularColorMap:Nt,specularIntensityMap:ne,transmission:yt,transmissionMap:D,thicknessMap:et,gradientMap:q,opaque:b.transparent===!1&&b.blending===Xi&&b.alphaToCoverage===!1,alphaMap:$,alphaTest:it,alphaHash:bt,combine:b.combine,mapUv:Pt&&_(b.map.channel),aoMapUv:Kt&&_(b.aoMap.channel),lightMapUv:Ft&&_(b.lightMap.channel),bumpMapUv:Ot&&_(b.bumpMap.channel),normalMapUv:xt&&_(b.normalMap.channel),displacementMapUv:ee&&_(b.displacementMap.channel),emissiveMapUv:Tt&&_(b.emissiveMap.channel),metalnessMapUv:Ct&&_(b.metalnessMap.channel),roughnessMapUv:C&&_(b.roughnessMap.channel),anisotropyMapUv:at&&_(b.anisotropyMap.channel),clearcoatMapUv:ut&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ht&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:ft&&_(b.sheenRoughnessMap.channel),specularMapUv:Rt&&_(b.specularMap.channel),specularColorMapUv:Nt&&_(b.specularColorMap.channel),specularIntensityMapUv:ne&&_(b.specularIntensityMap.channel),transmissionMapUv:D&&_(b.transmissionMap.channel),thicknessMapUv:et&&_(b.thicknessMap.channel),alphaMapUv:$&&_(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(xt||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(Pt||$),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:It,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:Pt&&b.map.isVideoTexture===!0&&$t.getTransfer(b.map.colorSpace)===te,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===An,flipSided:b.side===De,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ht&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&b.extensions.multiDraw===!0||Mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ye.vertexUv1s=c.has(1),ye.vertexUv2s=c.has(2),ye.vertexUv3s=c.has(3),c.clear(),ye}function m(b){const v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(const w in b.defines)v.push(w),v.push(b.defines[w]);return b.isRawShaderMaterial===!1&&(y(v,b),x(v,b),v.push(i.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function y(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function x(b,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.skinning&&o.enable(4),v.morphTargets&&o.enable(5),v.morphNormals&&o.enable(6),v.morphColors&&o.enable(7),v.premultipliedAlpha&&o.enable(8),v.shadowMapEnabled&&o.enable(9),v.doubleSided&&o.enable(10),v.flipSided&&o.enable(11),v.useDepthPacking&&o.enable(12),v.dithering&&o.enable(13),v.transmission&&o.enable(14),v.sheen&&o.enable(15),v.opaque&&o.enable(16),v.pointsUvs&&o.enable(17),v.decodeVideoTexture&&o.enable(18),v.alphaToCoverage&&o.enable(19),b.push(o.mask)}function S(b){const v=g[b.type];let w;if(v){const B=un[v];w=ox.clone(B.uniforms)}else w=b.uniforms;return w}function R(b,v){let w;for(let B=0,F=h.length;B<F;B++){const O=h[B];if(O.cacheKey===v){w=O,++w.usedTimes;break}}return w===void 0&&(w=new yS(i,v,b,r),h.push(w)),w}function T(b){if(--b.usedTimes===0){const v=h.indexOf(b);h[v]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:S,acquireProgram:R,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:I}}function TS(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function AS(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Rh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ph(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,f,g,_,p){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function o(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):e.push(m)}function l(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||AS),n.length>1&&n.sort(d||Rh),s.length>1&&s.sort(d||Rh)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function wS(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ph,i.set(n,[a])):s>=r.length?(a=new Ph,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function CS(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new Vt};break;case"SpotLight":e={position:new z,direction:new z,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function RS(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let PS=0;function IS(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function LS(i){const t=new CS,e=RS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);const s=new z,r=new he,a=new he;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,y=0,x=0,S=0,R=0,T=0,A=0;c.sort(IS);for(let b=0,v=c.length;b<v;b++){const w=c[b],B=w.color,F=w.intensity,O=w.distance,Y=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=B.r*F,u+=B.g*F,d+=B.b*F;else if(w.isLightProbe){for(let L=0;L<9;L++)n.probe[L].addScaledVector(w.sh.coefficients[L],F);A++}else if(w.isDirectionalLight){const L=t.get(w);if(L.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const H=w.shadow,W=e.get(w);W.shadowIntensity=H.intensity,W.shadowBias=H.bias,W.shadowNormalBias=H.normalBias,W.shadowRadius=H.radius,W.shadowMapSize=H.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=w.shadow.matrix,y++}n.directional[f]=L,f++}else if(w.isSpotLight){const L=t.get(w);L.position.setFromMatrixPosition(w.matrixWorld),L.color.copy(B).multiplyScalar(F),L.distance=O,L.coneCos=Math.cos(w.angle),L.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),L.decay=w.decay,n.spot[_]=L;const H=w.shadow;if(w.map&&(n.spotLightMap[R]=w.map,R++,H.updateMatrices(w),w.castShadow&&T++),n.spotLightMatrix[_]=H.matrix,w.castShadow){const W=e.get(w);W.shadowIntensity=H.intensity,W.shadowBias=H.bias,W.shadowNormalBias=H.normalBias,W.shadowRadius=H.radius,W.shadowMapSize=H.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Y,S++}_++}else if(w.isRectAreaLight){const L=t.get(w);L.color.copy(B).multiplyScalar(F),L.halfWidth.set(w.width*.5,0,0),L.halfHeight.set(0,w.height*.5,0),n.rectArea[p]=L,p++}else if(w.isPointLight){const L=t.get(w);if(L.color.copy(w.color).multiplyScalar(w.intensity),L.distance=w.distance,L.decay=w.decay,w.castShadow){const H=w.shadow,W=e.get(w);W.shadowIntensity=H.intensity,W.shadowBias=H.bias,W.shadowNormalBias=H.normalBias,W.shadowRadius=H.radius,W.shadowMapSize=H.mapSize,W.shadowCameraNear=H.camera.near,W.shadowCameraFar=H.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=w.shadow.matrix,x++}n.point[g]=L,g++}else if(w.isHemisphereLight){const L=t.get(w);L.skyColor.copy(w.color).multiplyScalar(F),L.groundColor.copy(w.groundColor).multiplyScalar(F),n.hemi[m]=L,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==m||I.numDirectionalShadows!==y||I.numPointShadows!==x||I.numSpotShadows!==S||I.numSpotMaps!==R||I.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=S+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,I.directionalLength=f,I.pointLength=g,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=m,I.numDirectionalShadows=y,I.numPointShadows=x,I.numSpotShadows=S,I.numSpotMaps=R,I.numLightProbes=A,n.version=PS++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const x=c[m];if(x.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),u++}else if(x.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(x.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function Ih(i){const t=new LS(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function DS(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Ih(i),t.set(s,[o])):r>=a.length?(o=new Ih(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class US extends Hs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=P_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class NS extends Hs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const FS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,OS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function BS(i,t,e){let n=new vl;const s=new Gt,r=new Gt,a=new pe,o=new US({depthPacking:I_}),l=new NS,c={},h=e.maxTextureSize,u={[Wn]:De,[De]:Wn,[An]:An},d=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:FS,fragmentShader:OS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new $n;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new nn(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nd;let m=this.type;this.render=function(T,A,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const b=i.getRenderTarget(),v=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Hn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=m!==En&&this.type===En,O=m===En&&this.type!==En;for(let Y=0,L=T.length;Y<L;Y++){const H=T[Y],W=H.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const J=W.getFrameExtents();if(s.multiply(J),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,W.mapSize.y=r.y)),W.map===null||F===!0||O===!0){const dt=this.type!==En?{minFilter:Ye,magFilter:Ye}:{};W.map!==null&&W.map.dispose(),W.map=new _i(s.x,s.y,dt),W.map.texture.name=H.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const rt=W.getViewportCount();for(let dt=0;dt<rt;dt++){const It=W.getViewport(dt);a.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),B.viewport(a),W.updateMatrices(H,dt),n=W.getFrustum(),S(A,I,W.camera,H,this.type)}W.isPointLightShadow!==!0&&this.type===En&&y(W,I),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(b,v,w)};function y(T,A){const I=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new _i(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,I,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,I,f,_,null)}function x(T,A,I,b){let v=null;const w=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(w!==void 0)v=w;else if(v=I.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=v.uuid,F=A.uuid;let O=c[B];O===void 0&&(O={},c[B]=O);let Y=O[F];Y===void 0&&(Y=v.clone(),O[F]=Y,A.addEventListener("dispose",R)),v=Y}if(v.visible=A.visible,v.wireframe=A.wireframe,b===En?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const B=i.properties.get(v);B.light=I}return v}function S(T,A,I,b,v){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&v===En)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);const F=t.update(T),O=T.material;if(Array.isArray(O)){const Y=F.groups;for(let L=0,H=Y.length;L<H;L++){const W=Y[L],J=O[W.materialIndex];if(J&&J.visible){const rt=x(T,J,b,v);T.onBeforeShadow(i,T,A,I,F,rt,W),i.renderBufferDirect(I,null,F,rt,T,W),T.onAfterShadow(i,T,A,I,F,rt,W)}}}else if(O.visible){const Y=x(T,O,b,v);T.onBeforeShadow(i,T,A,I,F,Y,null),i.renderBufferDirect(I,null,F,Y,T,null),T.onAfterShadow(i,T,A,I,F,Y,null)}}const B=T.children;for(let F=0,O=B.length;F<O;F++)S(B[F],A,I,b,v)}function R(T){T.target.removeEventListener("dispose",R);for(const I in c){const b=c[I],v=T.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}function kS(i){function t(){let D=!1;const et=new pe;let q=null;const $=new pe(0,0,0,0);return{setMask:function(it){q!==it&&!D&&(i.colorMask(it,it,it,it),q=it)},setLocked:function(it){D=it},setClear:function(it,bt,Ht,ue,ye){ye===!0&&(it*=ue,bt*=ue,Ht*=ue),et.set(it,bt,Ht,ue),$.equals(et)===!1&&(i.clearColor(it,bt,Ht,ue),$.copy(et))},reset:function(){D=!1,q=null,$.set(-1,0,0,0)}}}function e(){let D=!1,et=null,q=null,$=null;return{setTest:function(it){it?ct(i.DEPTH_TEST):lt(i.DEPTH_TEST)},setMask:function(it){et!==it&&!D&&(i.depthMask(it),et=it)},setFunc:function(it){if(q!==it){switch(it){case f_:i.depthFunc(i.NEVER);break;case p_:i.depthFunc(i.ALWAYS);break;case m_:i.depthFunc(i.LESS);break;case Gr:i.depthFunc(i.LEQUAL);break;case g_:i.depthFunc(i.EQUAL);break;case __:i.depthFunc(i.GEQUAL);break;case x_:i.depthFunc(i.GREATER);break;case v_:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=it}},setLocked:function(it){D=it},setClear:function(it){$!==it&&(i.clearDepth(it),$=it)},reset:function(){D=!1,et=null,q=null,$=null}}}function n(){let D=!1,et=null,q=null,$=null,it=null,bt=null,Ht=null,ue=null,ye=null;return{setTest:function(Wt){D||(Wt?ct(i.STENCIL_TEST):lt(i.STENCIL_TEST))},setMask:function(Wt){et!==Wt&&!D&&(i.stencilMask(Wt),et=Wt)},setFunc:function(Wt,_n,on){(q!==Wt||$!==_n||it!==on)&&(i.stencilFunc(Wt,_n,on),q=Wt,$=_n,it=on)},setOp:function(Wt,_n,on){(bt!==Wt||Ht!==_n||ue!==on)&&(i.stencilOp(Wt,_n,on),bt=Wt,Ht=_n,ue=on)},setLocked:function(Wt){D=Wt},setClear:function(Wt){ye!==Wt&&(i.clearStencil(Wt),ye=Wt)},reset:function(){D=!1,et=null,q=null,$=null,it=null,bt=null,Ht=null,ue=null,ye=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,y=null,x=null,S=null,R=null,T=new Vt(0,0,0),A=0,I=!1,b=null,v=null,w=null,B=null,F=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,L=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(H)[1]),Y=L>=1):H.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),Y=L>=2);let W=null,J={};const rt=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),It=new pe().fromArray(rt),kt=new pe().fromArray(dt);function X(D,et,q,$){const it=new Uint8Array(4),bt=i.createTexture();i.bindTexture(D,bt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<q;Ht++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(et,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,it):i.texImage2D(et+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,it);return bt}const Q={};Q[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ct(i.DEPTH_TEST),r.setFunc(Gr),Ot(!1),xt(Oc),ct(i.CULL_FACE),Kt(Hn);function ct(D){c[D]!==!0&&(i.enable(D),c[D]=!0)}function lt(D){c[D]!==!1&&(i.disable(D),c[D]=!1)}function St(D,et){return h[D]!==et?(i.bindFramebuffer(D,et),h[D]=et,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=et),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=et),!0):!1}function Mt(D,et){let q=d,$=!1;if(D){q=u.get(et),q===void 0&&(q=[],u.set(et,q));const it=D.textures;if(q.length!==it.length||q[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,Ht=it.length;bt<Ht;bt++)q[bt]=i.COLOR_ATTACHMENT0+bt;q.length=it.length,$=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,$=!0);$&&i.drawBuffers(q)}function Pt(D){return f!==D?(i.useProgram(D),f=D,!0):!1}const Qt={[hi]:i.FUNC_ADD,[Kg]:i.FUNC_SUBTRACT,[Zg]:i.FUNC_REVERSE_SUBTRACT};Qt[Jg]=i.MIN,Qt[Qg]=i.MAX;const P={[t_]:i.ZERO,[e_]:i.ONE,[n_]:i.SRC_COLOR,[vo]:i.SRC_ALPHA,[l_]:i.SRC_ALPHA_SATURATE,[a_]:i.DST_COLOR,[s_]:i.DST_ALPHA,[i_]:i.ONE_MINUS_SRC_COLOR,[yo]:i.ONE_MINUS_SRC_ALPHA,[o_]:i.ONE_MINUS_DST_COLOR,[r_]:i.ONE_MINUS_DST_ALPHA,[c_]:i.CONSTANT_COLOR,[h_]:i.ONE_MINUS_CONSTANT_COLOR,[u_]:i.CONSTANT_ALPHA,[d_]:i.ONE_MINUS_CONSTANT_ALPHA};function Kt(D,et,q,$,it,bt,Ht,ue,ye,Wt){if(D===Hn){g===!0&&(lt(i.BLEND),g=!1);return}if(g===!1&&(ct(i.BLEND),g=!0),D!==jg){if(D!==_||Wt!==I){if((p!==hi||x!==hi)&&(i.blendEquation(i.FUNC_ADD),p=hi,x=hi),Wt)switch(D){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bc:i.blendFunc(i.ONE,i.ONE);break;case kc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case kc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}m=null,y=null,S=null,R=null,T.set(0,0,0),A=0,_=D,I=Wt}return}it=it||et,bt=bt||q,Ht=Ht||$,(et!==p||it!==x)&&(i.blendEquationSeparate(Qt[et],Qt[it]),p=et,x=it),(q!==m||$!==y||bt!==S||Ht!==R)&&(i.blendFuncSeparate(P[q],P[$],P[bt],P[Ht]),m=q,y=$,S=bt,R=Ht),(ue.equals(T)===!1||ye!==A)&&(i.blendColor(ue.r,ue.g,ue.b,ye),T.copy(ue),A=ye),_=D,I=!1}function Ft(D,et){D.side===An?lt(i.CULL_FACE):ct(i.CULL_FACE);let q=D.side===De;et&&(q=!q),Ot(q),D.blending===Xi&&D.transparent===!1?Kt(Hn):Kt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const $=D.stencilWrite;a.setTest($),$&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Tt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ct(i.SAMPLE_ALPHA_TO_COVERAGE):lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(D){b!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),b=D)}function xt(D){D!==Yg?(ct(i.CULL_FACE),D!==v&&(D===Oc?i.cullFace(i.BACK):D===qg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):lt(i.CULL_FACE),v=D}function ee(D){D!==w&&(Y&&i.lineWidth(D),w=D)}function Tt(D,et,q){D?(ct(i.POLYGON_OFFSET_FILL),(B!==et||F!==q)&&(i.polygonOffset(et,q),B=et,F=q)):lt(i.POLYGON_OFFSET_FILL)}function Ct(D){D?ct(i.SCISSOR_TEST):lt(i.SCISSOR_TEST)}function C(D){D===void 0&&(D=i.TEXTURE0+O-1),W!==D&&(i.activeTexture(D),W=D)}function M(D,et,q){q===void 0&&(W===null?q=i.TEXTURE0+O-1:q=W);let $=J[q];$===void 0&&($={type:void 0,texture:void 0},J[q]=$),($.type!==D||$.texture!==et)&&(W!==q&&(i.activeTexture(q),W=q),i.bindTexture(D,et||Q[D]),$.type=D,$.texture=et)}function V(){const D=J[W];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Lt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function zt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function wt(D){It.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),It.copy(D))}function ft(D){kt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),kt.copy(D))}function Rt(D,et){let q=l.get(et);q===void 0&&(q=new WeakMap,l.set(et,q));let $=q.get(D);$===void 0&&($=i.getUniformBlockIndex(et,D.name),q.set(D,$))}function Nt(D,et){const $=l.get(et).get(D);o.get(et)!==$&&(i.uniformBlockBinding(et,$,D.__bindingPointIndex),o.set(et,$))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},W=null,J={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,y=null,x=null,S=null,R=null,T=new Vt(0,0,0),A=0,I=!1,b=null,v=null,w=null,B=null,F=null,It.set(0,0,i.canvas.width,i.canvas.height),kt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:ct,disable:lt,bindFramebuffer:St,drawBuffers:Mt,useProgram:Pt,setBlending:Kt,setMaterial:Ft,setFlipSided:Ot,setCullFace:xt,setLineWidth:ee,setPolygonOffset:Tt,setScissorTest:Ct,activeTexture:C,bindTexture:M,unbindTexture:V,compressedTexImage2D:j,compressedTexImage3D:Z,texImage2D:ht,texImage3D:zt,updateUBOMapping:Rt,uniformBlockBinding:Nt,texStorage2D:Lt,texStorage3D:tt,texSubImage2D:K,texSubImage3D:yt,compressedTexSubImage2D:at,compressedTexSubImage3D:ut,scissor:wt,viewport:ft,reset:ne}}function Lh(i,t,e,n){const s=zS(n);switch(e){case ld:return i*t;case hd:return i*t;case ud:return i*t*2;case dd:return i*t/s.components*s.byteLength;case pl:return i*t/s.components*s.byteLength;case fd:return i*t*2/s.components*s.byteLength;case ml:return i*t*2/s.components*s.byteLength;case cd:return i*t*3/s.components*s.byteLength;case en:return i*t*4/s.components*s.byteLength;case gl:return i*t*4/s.components*s.byteLength;case Pr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ao:case Co:return Math.max(i,16)*Math.max(t,8)/4;case To:case wo:return Math.max(i,8)*Math.max(t,8)/2;case Ro:case Po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Uo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case No:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ko:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case zo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Go:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Xo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ur:case Yo:case qo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case pd:case $o:return Math.ceil(i/4)*Math.ceil(t/4)*8;case jo:case Ko:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function zS(i){switch(i){case Ln:case rd:return{byteLength:1,components:1};case Fs:case ad:case Bs:return{byteLength:2,components:1};case dl:case fl:return{byteLength:2,components:4};case gi:case ul:case wn:return{byteLength:4,components:1};case od:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function GS(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return f?new OffscreenCanvas(C,M):Yr("canvas")}function _(C,M,V){let j=1;const Z=Ct(C);if((Z.width>V||Z.height>V)&&(j=V/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap||typeof VideoFrame!="undefined"&&C instanceof VideoFrame){const K=Math.floor(j*Z.width),yt=Math.floor(j*Z.height);u===void 0&&(u=g(K,yt));const at=M?g(K,yt):u;return at.width=K,at.height=yt,at.getContext("2d").drawImage(C,0,0,K,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+K+"x"+yt+")."),at}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Ye&&C.minFilter!==tn}function m(C){i.generateMipmap(C)}function y(C,M,V,j,Z=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K=M;if(M===i.RED&&(V===i.FLOAT&&(K=i.R32F),V===i.HALF_FLOAT&&(K=i.R16F),V===i.UNSIGNED_BYTE&&(K=i.R8)),M===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.R8UI),V===i.UNSIGNED_SHORT&&(K=i.R16UI),V===i.UNSIGNED_INT&&(K=i.R32UI),V===i.BYTE&&(K=i.R8I),V===i.SHORT&&(K=i.R16I),V===i.INT&&(K=i.R32I)),M===i.RG&&(V===i.FLOAT&&(K=i.RG32F),V===i.HALF_FLOAT&&(K=i.RG16F),V===i.UNSIGNED_BYTE&&(K=i.RG8)),M===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RG8UI),V===i.UNSIGNED_SHORT&&(K=i.RG16UI),V===i.UNSIGNED_INT&&(K=i.RG32UI),V===i.BYTE&&(K=i.RG8I),V===i.SHORT&&(K=i.RG16I),V===i.INT&&(K=i.RG32I)),M===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),M===i.RGBA){const yt=Z?Hr:$t.getTransfer(j);V===i.FLOAT&&(K=i.RGBA32F),V===i.HALF_FLOAT&&(K=i.RGBA16F),V===i.UNSIGNED_BYTE&&(K=yt===te?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function x(C,M){let V;return C?M===null||M===gi||M===Qi?V=i.DEPTH24_STENCIL8:M===wn?V=i.DEPTH32F_STENCIL8:M===Fs&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===gi||M===Qi?V=i.DEPTH_COMPONENT24:M===wn?V=i.DEPTH_COMPONENT32F:M===Fs&&(V=i.DEPTH_COMPONENT16),V}function S(C,M){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ye&&C.minFilter!==tn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function R(C){const M=C.target;M.removeEventListener("dispose",R),A(M),M.isVideoTexture&&h.delete(M)}function T(C){const M=C.target;M.removeEventListener("dispose",T),b(M)}function A(C){const M=n.get(C);if(M.__webglInit===void 0)return;const V=C.source,j=d.get(V);if(j){const Z=j[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(C),Object.keys(j).length===0&&d.delete(V)}n.remove(C)}function I(C){const M=n.get(C);i.deleteTexture(M.__webglTexture);const V=C.source,j=d.get(V);delete j[M.__cacheKey],a.memory.textures--}function b(C){const M=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let Z=0;Z<M.__webglFramebuffer[j].length;Z++)i.deleteFramebuffer(M.__webglFramebuffer[j][Z]);else i.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)i.deleteFramebuffer(M.__webglFramebuffer[j]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const V=C.textures;for(let j=0,Z=V.length;j<Z;j++){const K=n.get(V[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(V[j])}n.remove(C)}let v=0;function w(){v=0}function B(){const C=v;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),v+=1,C}function F(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function O(C,M){const V=n.get(C);if(C.isVideoTexture&&ee(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{kt(V,C,M);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+M)}function Y(C,M){const V=n.get(C);if(C.version>0&&V.__version!==C.version){kt(V,C,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+M)}function L(C,M){const V=n.get(C);if(C.version>0&&V.__version!==C.version){kt(V,C,M);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+M)}function H(C,M){const V=n.get(C);if(C.version>0&&V.__version!==C.version){X(V,C,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+M)}const W={[bo]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[Eo]:i.MIRRORED_REPEAT},J={[Ye]:i.NEAREST,[R_]:i.NEAREST_MIPMAP_NEAREST,[rr]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[Ta]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},rt={[D_]:i.NEVER,[k_]:i.ALWAYS,[U_]:i.LESS,[gd]:i.LEQUAL,[N_]:i.EQUAL,[B_]:i.GEQUAL,[F_]:i.GREATER,[O_]:i.NOTEQUAL};function dt(C,M){if(M.type===wn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===tn||M.magFilter===Ta||M.magFilter===rr||M.magFilter===pi||M.minFilter===tn||M.minFilter===Ta||M.minFilter===rr||M.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,W[M.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,W[M.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,W[M.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,J[M.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,J[M.minFilter]),M.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,rt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ye||M.minFilter!==rr&&M.minFilter!==pi||M.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function It(C,M){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",R));const j=M.source;let Z=d.get(j);Z===void 0&&(Z={},d.set(j,Z));const K=F(M);if(K!==C.__cacheKey){Z[K]===void 0&&(Z[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Z[K].usedTimes++;const yt=Z[C.__cacheKey];yt!==void 0&&(Z[C.__cacheKey].usedTimes--,yt.usedTimes===0&&I(M)),C.__cacheKey=K,C.__webglTexture=Z[K].texture}return V}function kt(C,M,V){let j=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=i.TEXTURE_3D);const Z=It(C,M),K=M.source;e.bindTexture(j,C.__webglTexture,i.TEXTURE0+V);const yt=n.get(K);if(K.version!==yt.__version||Z===!0){e.activeTexture(i.TEXTURE0+V);const at=$t.getPrimaries($t.workingColorSpace),ut=M.colorSpace===zn?null:$t.getPrimaries(M.colorSpace),Lt=M.colorSpace===zn||at===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);let tt=_(M.image,!1,s.maxTextureSize);tt=Tt(M,tt);const ht=r.convert(M.format,M.colorSpace),zt=r.convert(M.type);let wt=y(M.internalFormat,ht,zt,M.colorSpace,M.isVideoTexture);dt(j,M);let ft;const Rt=M.mipmaps,Nt=M.isVideoTexture!==!0,ne=yt.__version===void 0||Z===!0,D=K.dataReady,et=S(M,tt);if(M.isDepthTexture)wt=x(M.format===ts,M.type),ne&&(Nt?e.texStorage2D(i.TEXTURE_2D,1,wt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,wt,tt.width,tt.height,0,ht,zt,null));else if(M.isDataTexture)if(Rt.length>0){Nt&&ne&&e.texStorage2D(i.TEXTURE_2D,et,wt,Rt[0].width,Rt[0].height);for(let q=0,$=Rt.length;q<$;q++)ft=Rt[q],Nt?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,ft.width,ft.height,ht,zt,ft.data):e.texImage2D(i.TEXTURE_2D,q,wt,ft.width,ft.height,0,ht,zt,ft.data);M.generateMipmaps=!1}else Nt?(ne&&e.texStorage2D(i.TEXTURE_2D,et,wt,tt.width,tt.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,ht,zt,tt.data)):e.texImage2D(i.TEXTURE_2D,0,wt,tt.width,tt.height,0,ht,zt,tt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Nt&&ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,et,wt,Rt[0].width,Rt[0].height,tt.depth);for(let q=0,$=Rt.length;q<$;q++)if(ft=Rt[q],M.format!==en)if(ht!==null)if(Nt){if(D)if(M.layerUpdates.size>0){const it=Lh(ft.width,ft.height,M.format,M.type);for(const bt of M.layerUpdates){const Ht=ft.data.subarray(bt*it/ft.data.BYTES_PER_ELEMENT,(bt+1)*it/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,bt,ft.width,ft.height,1,ht,Ht,0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ft.width,ft.height,tt.depth,ht,ft.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,wt,ft.width,ft.height,tt.depth,0,ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,ft.width,ft.height,tt.depth,ht,zt,ft.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,wt,ft.width,ft.height,tt.depth,0,ht,zt,ft.data)}else{Nt&&ne&&e.texStorage2D(i.TEXTURE_2D,et,wt,Rt[0].width,Rt[0].height);for(let q=0,$=Rt.length;q<$;q++)ft=Rt[q],M.format!==en?ht!==null?Nt?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,ft.width,ft.height,ht,ft.data):e.compressedTexImage2D(i.TEXTURE_2D,q,wt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,ft.width,ft.height,ht,zt,ft.data):e.texImage2D(i.TEXTURE_2D,q,wt,ft.width,ft.height,0,ht,zt,ft.data)}else if(M.isDataArrayTexture)if(Nt){if(ne&&e.texStorage3D(i.TEXTURE_2D_ARRAY,et,wt,tt.width,tt.height,tt.depth),D)if(M.layerUpdates.size>0){const q=Lh(tt.width,tt.height,M.format,M.type);for(const $ of M.layerUpdates){const it=tt.data.subarray($*q/tt.data.BYTES_PER_ELEMENT,($+1)*q/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,tt.width,tt.height,1,ht,zt,it)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ht,zt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,wt,tt.width,tt.height,tt.depth,0,ht,zt,tt.data);else if(M.isData3DTexture)Nt?(ne&&e.texStorage3D(i.TEXTURE_3D,et,wt,tt.width,tt.height,tt.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ht,zt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,wt,tt.width,tt.height,tt.depth,0,ht,zt,tt.data);else if(M.isFramebufferTexture){if(ne)if(Nt)e.texStorage2D(i.TEXTURE_2D,et,wt,tt.width,tt.height);else{let q=tt.width,$=tt.height;for(let it=0;it<et;it++)e.texImage2D(i.TEXTURE_2D,it,wt,q,$,0,ht,zt,null),q>>=1,$>>=1}}else if(Rt.length>0){if(Nt&&ne){const q=Ct(Rt[0]);e.texStorage2D(i.TEXTURE_2D,et,wt,q.width,q.height)}for(let q=0,$=Rt.length;q<$;q++)ft=Rt[q],Nt?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,ht,zt,ft):e.texImage2D(i.TEXTURE_2D,q,wt,ht,zt,ft);M.generateMipmaps=!1}else if(Nt){if(ne){const q=Ct(tt);e.texStorage2D(i.TEXTURE_2D,et,wt,q.width,q.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,zt,tt)}else e.texImage2D(i.TEXTURE_2D,0,wt,ht,zt,tt);p(M)&&m(j),yt.__version=K.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function X(C,M,V){if(M.image.length!==6)return;const j=It(C,M),Z=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);const K=n.get(Z);if(Z.version!==K.__version||j===!0){e.activeTexture(i.TEXTURE0+V);const yt=$t.getPrimaries($t.workingColorSpace),at=M.colorSpace===zn?null:$t.getPrimaries(M.colorSpace),ut=M.colorSpace===zn||yt===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const Lt=M.isCompressedTexture||M.image[0].isCompressedTexture,tt=M.image[0]&&M.image[0].isDataTexture,ht=[];for(let $=0;$<6;$++)!Lt&&!tt?ht[$]=_(M.image[$],!0,s.maxCubemapSize):ht[$]=tt?M.image[$].image:M.image[$],ht[$]=Tt(M,ht[$]);const zt=ht[0],wt=r.convert(M.format,M.colorSpace),ft=r.convert(M.type),Rt=y(M.internalFormat,wt,ft,M.colorSpace),Nt=M.isVideoTexture!==!0,ne=K.__version===void 0||j===!0,D=Z.dataReady;let et=S(M,zt);dt(i.TEXTURE_CUBE_MAP,M);let q;if(Lt){Nt&&ne&&e.texStorage2D(i.TEXTURE_CUBE_MAP,et,Rt,zt.width,zt.height);for(let $=0;$<6;$++){q=ht[$].mipmaps;for(let it=0;it<q.length;it++){const bt=q[it];M.format!==en?wt!==null?Nt?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,0,0,bt.width,bt.height,wt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,Rt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,0,0,bt.width,bt.height,wt,ft,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,Rt,bt.width,bt.height,0,wt,ft,bt.data)}}}else{if(q=M.mipmaps,Nt&&ne){q.length>0&&et++;const $=Ct(ht[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,et,Rt,$.width,$.height)}for(let $=0;$<6;$++)if(tt){Nt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ht[$].width,ht[$].height,wt,ft,ht[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Rt,ht[$].width,ht[$].height,0,wt,ft,ht[$].data);for(let it=0;it<q.length;it++){const Ht=q[it].image[$].image;Nt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,0,0,Ht.width,Ht.height,wt,ft,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,Rt,Ht.width,Ht.height,0,wt,ft,Ht.data)}}else{Nt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,wt,ft,ht[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Rt,wt,ft,ht[$]);for(let it=0;it<q.length;it++){const bt=q[it];Nt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,0,0,wt,ft,bt.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,Rt,wt,ft,bt.image[$])}}}p(M)&&m(i.TEXTURE_CUBE_MAP),K.__version=Z.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Q(C,M,V,j,Z,K){const yt=r.convert(V.format,V.colorSpace),at=r.convert(V.type),ut=y(V.internalFormat,yt,at,V.colorSpace);if(!n.get(M).__hasExternalTextures){const tt=Math.max(1,M.width>>K),ht=Math.max(1,M.height>>K);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,K,ut,tt,ht,M.depth,0,yt,at,null):e.texImage2D(Z,K,ut,tt,ht,0,yt,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),xt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Z,n.get(V).__webglTexture,0,Ot(M)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Z,n.get(V).__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(C,M,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),M.depthBuffer){const j=M.depthTexture,Z=j&&j.isDepthTexture?j.type:null,K=x(M.stencilBuffer,Z),yt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=Ot(M);xt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,K,M.width,M.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,K,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,K,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,C)}else{const j=M.textures;for(let Z=0;Z<j.length;Z++){const K=j[Z],yt=r.convert(K.format,K.colorSpace),at=r.convert(K.type),ut=y(K.internalFormat,yt,at,K.colorSpace),Lt=Ot(M);V&&xt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,ut,M.width,M.height):xt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Lt,ut,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ut,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function lt(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),O(M.depthTexture,0);const j=n.get(M.depthTexture).__webglTexture,Z=Ot(M);if(M.depthTexture.format===Yi)xt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(M.depthTexture.format===ts)xt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function St(C){const M=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){const Z=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",Z)};j.addEventListener("dispose",Z),M.__depthDisposeCallback=Z}M.__boundDepthTexture=j}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");lt(M.__webglFramebuffer,C)}else if(V){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=i.createRenderbuffer(),ct(M.__webglDepthbuffer[j],C,!1);else{const Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ct(M.__webglDepthbuffer,C,!1);else{const j=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Z)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Mt(C,M,V){const j=n.get(C);M!==void 0&&Q(j.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&St(C)}function Pt(C){const M=C.texture,V=n.get(C),j=n.get(M);C.addEventListener("dispose",T);const Z=C.textures,K=C.isWebGLCubeRenderTarget===!0,yt=Z.length>1;if(yt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=M.version,a.memory.textures++),K){V.__webglFramebuffer=[];for(let at=0;at<6;at++)if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer[at]=[];for(let ut=0;ut<M.mipmaps.length;ut++)V.__webglFramebuffer[at][ut]=i.createFramebuffer()}else V.__webglFramebuffer[at]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer=[];for(let at=0;at<M.mipmaps.length;at++)V.__webglFramebuffer[at]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(yt)for(let at=0,ut=Z.length;at<ut;at++){const Lt=n.get(Z[at]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&xt(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let at=0;at<Z.length;at++){const ut=Z[at];V.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[at]);const Lt=r.convert(ut.format,ut.colorSpace),tt=r.convert(ut.type),ht=y(ut.internalFormat,Lt,tt,ut.colorSpace,C.isXRRenderTarget===!0),zt=Ot(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,ht,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,V.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ct(V.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),dt(i.TEXTURE_CUBE_MAP,M);for(let at=0;at<6;at++)if(M.mipmaps&&M.mipmaps.length>0)for(let ut=0;ut<M.mipmaps.length;ut++)Q(V.__webglFramebuffer[at][ut],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ut);else Q(V.__webglFramebuffer[at],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);p(M)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let at=0,ut=Z.length;at<ut;at++){const Lt=Z[at],tt=n.get(Lt);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),dt(i.TEXTURE_2D,Lt),Q(V.__webglFramebuffer,C,Lt,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),p(Lt)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(at=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,j.__webglTexture),dt(at,M),M.mipmaps&&M.mipmaps.length>0)for(let ut=0;ut<M.mipmaps.length;ut++)Q(V.__webglFramebuffer[ut],C,M,i.COLOR_ATTACHMENT0,at,ut);else Q(V.__webglFramebuffer,C,M,i.COLOR_ATTACHMENT0,at,0);p(M)&&m(at),e.unbindTexture()}C.depthBuffer&&St(C)}function Qt(C){const M=C.textures;for(let V=0,j=M.length;V<j;V++){const Z=M[V];if(p(Z)){const K=C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,yt=n.get(Z).__webglTexture;e.bindTexture(K,yt),m(K),e.unbindTexture()}}}const P=[],Kt=[];function Ft(C){if(C.samples>0){if(xt(C)===!1){const M=C.textures,V=C.width,j=C.height;let Z=i.COLOR_BUFFER_BIT;const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(C),at=M.length>1;if(at)for(let ut=0;ut<M.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let ut=0;ut<M.length;ut++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[ut]);const Lt=n.get(M[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Lt,0)}i.blitFramebuffer(0,0,V,j,0,0,V,j,Z,i.NEAREST),l===!0&&(P.length=0,Kt.length=0,P.push(i.COLOR_ATTACHMENT0+ut),C.depthBuffer&&C.resolveDepthBuffer===!1&&(P.push(K),Kt.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Kt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,P))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let ut=0;ut<M.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,yt.__webglColorRenderbuffer[ut]);const Lt=n.get(M[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,Lt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const M=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Ot(C){return Math.min(s.maxSamples,C.samples)}function xt(C){const M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ee(C){const M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Tt(C,M){const V=C.colorSpace,j=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==qn&&V!==zn&&($t.getTransfer(V)===te?(j!==en||Z!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),M}function Ct(C){return typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame!="undefined"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=w,this.setTexture2D=O,this.setTexture2DArray=Y,this.setTexture3D=L,this.setTextureCube=H,this.rebindTextures=Mt,this.setupRenderTarget=Pt,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=xt}function HS(i,t){function e(n,s=zn){let r;const a=$t.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===dl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===od)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rd)return i.BYTE;if(n===ad)return i.SHORT;if(n===Fs)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===gi)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Bs)return i.HALF_FLOAT;if(n===ld)return i.ALPHA;if(n===cd)return i.RGB;if(n===en)return i.RGBA;if(n===hd)return i.LUMINANCE;if(n===ud)return i.LUMINANCE_ALPHA;if(n===Yi)return i.DEPTH_COMPONENT;if(n===ts)return i.DEPTH_STENCIL;if(n===dd)return i.RED;if(n===pl)return i.RED_INTEGER;if(n===fd)return i.RG;if(n===ml)return i.RG_INTEGER;if(n===gl)return i.RGBA_INTEGER;if(n===Pr||n===Ir||n===Lr||n===Dr)if(a===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===To||n===Ao||n===wo||n===Co)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===To)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ro||n===Po||n===Io)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ro||n===Po)return a===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Io)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Lo||n===Do||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===ko||n===zo||n===Go||n===Ho||n===Vo||n===Wo||n===Xo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Lo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Do)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Uo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===No)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ko)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Go)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ho)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xo)return a===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ur||n===Yo||n===qo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ur)return a===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pd||n===$o||n===jo||n===Ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ur)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$o)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class VS extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class wr extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const WS={type:"move"};class Ja{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(WS)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new wr;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const XS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,YS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ue,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Xn({vertexShader:XS,fragmentShader:YS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new nn(new Qr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $S extends ns{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new qS,p=e.getContextAttributes();let m=null,y=null;const x=[],S=[],R=new Gt;let T=null;const A=new We;A.layers.enable(1),A.viewport=new pe;const I=new We;I.layers.enable(2),I.viewport=new pe;const b=[A,I],v=new VS;v.layers.enable(1),v.layers.enable(2);let w=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=x[X];return Q===void 0&&(Q=new Ja,x[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=x[X];return Q===void 0&&(Q=new Ja,x[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=x[X];return Q===void 0&&(Q=new Ja,x[X]=Q),Q.getHandSpace()};function F(X){const Q=S.indexOf(X.inputSource);if(Q===-1)return;const ct=x[Q];ct!==void 0&&(ct.update(X.inputSource,X.frame,c||a),ct.dispatchEvent({type:X.type,data:X.inputSource}))}function O(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",Y);for(let X=0;X<x.length;X++){const Q=S[X];Q!==null&&(S[X]=null,x[X].disconnect(Q))}w=null,B=null,_.reset(),t.setRenderTarget(m),f=null,d=null,u=null,s=null,y=null,kt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",O),s.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){const Q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Q),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new _i(f.framebufferWidth,f.framebufferHeight,{format:en,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let Q=null,ct=null,lt=null;p.depth&&(lt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=p.stencil?ts:Yi,ct=p.stencil?Qi:gi);const St={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(St),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new _i(d.textureWidth,d.textureHeight,{format:en,type:Ln,depthTexture:new Pd(d.textureWidth,d.textureHeight,ct,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),kt.setContext(s),kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(X){for(let Q=0;Q<X.removed.length;Q++){const ct=X.removed[Q],lt=S.indexOf(ct);lt>=0&&(S[lt]=null,x[lt].disconnect(ct))}for(let Q=0;Q<X.added.length;Q++){const ct=X.added[Q];let lt=S.indexOf(ct);if(lt===-1){for(let Mt=0;Mt<x.length;Mt++)if(Mt>=S.length){S.push(ct),lt=Mt;break}else if(S[Mt]===null){S[Mt]=ct,lt=Mt;break}if(lt===-1)break}const St=x[lt];St&&St.connect(ct)}}const L=new z,H=new z;function W(X,Q,ct){L.setFromMatrixPosition(Q.matrixWorld),H.setFromMatrixPosition(ct.matrixWorld);const lt=L.distanceTo(H),St=Q.projectionMatrix.elements,Mt=ct.projectionMatrix.elements,Pt=St[14]/(St[10]-1),Qt=St[14]/(St[10]+1),P=(St[9]+1)/St[5],Kt=(St[9]-1)/St[5],Ft=(St[8]-1)/St[0],Ot=(Mt[8]+1)/Mt[0],xt=Pt*Ft,ee=Pt*Ot,Tt=lt/(-Ft+Ot),Ct=Tt*-Ft;if(Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ct),X.translateZ(Tt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),St[10]===-1)X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const C=Pt+Tt,M=Qt+Tt,V=xt-Ct,j=ee+(lt-Ct),Z=P*Qt/M*C,K=Kt*Qt/M*C;X.projectionMatrix.makePerspective(V,j,Z,K,C,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function J(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Q=X.near,ct=X.far;_.texture!==null&&(_.depthNear>0&&(Q=_.depthNear),_.depthFar>0&&(ct=_.depthFar)),v.near=I.near=A.near=Q,v.far=I.far=A.far=ct,(w!==v.near||B!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),w=v.near,B=v.far);const lt=X.parent,St=v.cameras;J(v,lt);for(let Mt=0;Mt<St.length;Mt++)J(St[Mt],lt);St.length===2?W(v,A,I):v.projectionMatrix.copy(A.projectionMatrix),rt(X,v,lt)};function rt(X,Q,ct){ct===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(ct.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Zo*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let dt=null;function It(X,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){const ct=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let lt=!1;ct.length!==v.cameras.length&&(v.cameras.length=0,lt=!0);for(let Mt=0;Mt<ct.length;Mt++){const Pt=ct[Mt];let Qt=null;if(f!==null)Qt=f.getViewport(Pt);else{const Kt=u.getViewSubImage(d,Pt);Qt=Kt.viewport,Mt===0&&(t.setRenderTargetTextures(y,Kt.colorTexture,d.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(y))}let P=b[Mt];P===void 0&&(P=new We,P.layers.enable(Mt),P.viewport=new pe,b[Mt]=P),P.matrix.fromArray(Pt.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(Pt.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Mt===0&&(v.matrix.copy(P.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),lt===!0&&v.cameras.push(P)}const St=s.enabledFeatures;if(St&&St.includes("depth-sensing")){const Mt=u.getDepthInformation(ct[0]);Mt&&Mt.isValid&&Mt.texture&&_.init(t,Mt,s.renderState)}}for(let ct=0;ct<x.length;ct++){const lt=S[ct],St=x[ct];lt!==null&&St!==void 0&&St.update(lt,Q,c||a)}dt&&dt(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const kt=new Cd;kt.setAnimationLoop(It),this.setAnimationLoop=function(X){dt=X},this.dispose=function(){}}}const ii=new mn,jS=new he;function KS(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Td(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,x,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,y,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===De&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===De&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),x=y.envMap,S=y.envMapRotation;x&&(p.envMap.value=x,ii.copy(S),ii.x*=-1,ii.y*=-1,ii.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),p.envMapRotation.value.setFromMatrix4(jS.makeRotationFromEuler(ii)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===De&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ZS(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const S=x.program;n.uniformBlockBinding(y,S)}function c(y,x){let S=s[y.id];S===void 0&&(g(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",p));const R=x.program;n.updateUBOMapping(y,R);const T=t.render.frame;r[y.id]!==T&&(d(y),r[y.id]=T)}function h(y){const x=u();y.__bindingPointIndex=x;const S=i.createBuffer(),R=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,S),S}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=s[y.id],S=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,A=S.length;T<A;T++){const I=Array.isArray(S[T])?S[T]:[S[T]];for(let b=0,v=I.length;b<v;b++){const w=I[b];if(f(w,T,b,R)===!0){const B=w.__offset,F=Array.isArray(w.value)?w.value:[w.value];let O=0;for(let Y=0;Y<F.length;Y++){const L=F[Y],H=_(L);typeof L=="number"||typeof L=="boolean"?(w.__data[0]=L,i.bufferSubData(i.UNIFORM_BUFFER,B+O,w.__data)):L.isMatrix3?(w.__data[0]=L.elements[0],w.__data[1]=L.elements[1],w.__data[2]=L.elements[2],w.__data[3]=0,w.__data[4]=L.elements[3],w.__data[5]=L.elements[4],w.__data[6]=L.elements[5],w.__data[7]=0,w.__data[8]=L.elements[6],w.__data[9]=L.elements[7],w.__data[10]=L.elements[8],w.__data[11]=0):(L.toArray(w.__data,O),O+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,x,S,R){const T=y.value,A=x+"_"+S;if(R[A]===void 0)return typeof T=="number"||typeof T=="boolean"?R[A]=T:R[A]=T.clone(),!0;{const I=R[A];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return R[A]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(y){const x=y.uniforms;let S=0;const R=16;for(let A=0,I=x.length;A<I;A++){const b=Array.isArray(x[A])?x[A]:[x[A]];for(let v=0,w=b.length;v<w;v++){const B=b[v],F=Array.isArray(B.value)?B.value:[B.value];for(let O=0,Y=F.length;O<Y;O++){const L=F[O],H=_(L),W=S%R,J=W%H.boundary,rt=W+J;S+=J,rt!==0&&R-rt<H.storage&&(S+=R-rt),B.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=H.storage}}}const T=S%R;return T>0&&(S+=R-T),y.__size=S,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function p(y){const x=y.target;x.removeEventListener("dispose",p);const S=a.indexOf(x.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}class JS{constructor(t={}){const{canvas:e=G_(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hn,this.toneMapping=Vn,this.toneMappingExposure=1;const x=this;let S=!1,R=0,T=0,A=null,I=-1,b=null;const v=new pe,w=new pe;let B=null;const F=new Vt(0);let O=0,Y=e.width,L=e.height,H=1,W=null,J=null;const rt=new pe(0,0,Y,L),dt=new pe(0,0,Y,L);let It=!1;const kt=new vl;let X=!1,Q=!1;const ct=new he,lt=new z,St=new pe,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Pt=!1;function Qt(){return A===null?H:1}let P=n;function Kt(E,U){return e.getContext(E,U)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hl}`),e.addEventListener("webglcontextlost",q,!1),e.addEventListener("webglcontextrestored",$,!1),e.addEventListener("webglcontextcreationerror",it,!1),P===null){const U="webgl2";if(P=Kt(U,E),P===null)throw Kt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ft,Ot,xt,ee,Tt,Ct,C,M,V,j,Z,K,yt,at,ut,Lt,tt,ht,zt,wt,ft,Rt,Nt,ne;function D(){Ft=new sy(P),Ft.init(),Rt=new HS(P,Ft),Ot=new Jv(P,Ft,t,Rt),xt=new kS(P),ee=new oy(P),Tt=new TS,Ct=new GS(P,Ft,xt,Tt,Ot,Rt,ee),C=new ty(x),M=new iy(x),V=new px(P),Nt=new Kv(P,V),j=new ry(P,V,ee,Nt),Z=new cy(P,j,V,ee),zt=new ly(P,Ot,Ct),Lt=new Qv(Tt),K=new ES(x,C,M,Ft,Ot,Nt,Lt),yt=new KS(x,Tt),at=new wS,ut=new DS(Ft),ht=new jv(x,C,M,xt,Z,d,l),tt=new BS(x,Z,Ot),ne=new ZS(P,ee,Ot,xt),wt=new Zv(P,Ft,ee),ft=new ay(P,Ft,ee),ee.programs=K.programs,x.capabilities=Ot,x.extensions=Ft,x.properties=Tt,x.renderLists=at,x.shadowMap=tt,x.state=xt,x.info=ee}D();const et=new $S(x,P);this.xr=et,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=Ft.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ft.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize(Y,L,!1))},this.getSize=function(E){return E.set(Y,L)},this.setSize=function(E,U,k=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,L=U,e.width=Math.floor(E*H),e.height=Math.floor(U*H),k===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(Y*H,L*H).floor()},this.setDrawingBufferSize=function(E,U,k){Y=E,L=U,H=k,e.width=Math.floor(E*k),e.height=Math.floor(U*k),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(v)},this.getViewport=function(E){return E.copy(rt)},this.setViewport=function(E,U,k,G){E.isVector4?rt.set(E.x,E.y,E.z,E.w):rt.set(E,U,k,G),xt.viewport(v.copy(rt).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(dt)},this.setScissor=function(E,U,k,G){E.isVector4?dt.set(E.x,E.y,E.z,E.w):dt.set(E,U,k,G),xt.scissor(w.copy(dt).multiplyScalar(H).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(E){xt.setScissorTest(It=E)},this.setOpaqueSort=function(E){W=E},this.setTransparentSort=function(E){J=E},this.getClearColor=function(E){return E.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor.apply(ht,arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha.apply(ht,arguments)},this.clear=function(E=!0,U=!0,k=!0){let G=0;if(E){let N=!1;if(A!==null){const nt=A.texture.format;N=nt===gl||nt===ml||nt===pl}if(N){const nt=A.texture.type,ot=nt===Ln||nt===gi||nt===Fs||nt===Qi||nt===dl||nt===fl,pt=ht.getClearColor(),mt=ht.getClearAlpha(),Et=pt.r,At=pt.g,_t=pt.b;ot?(f[0]=Et,f[1]=At,f[2]=_t,f[3]=mt,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=Et,g[1]=At,g[2]=_t,g[3]=mt,P.clearBufferiv(P.COLOR,0,g))}else G|=P.COLOR_BUFFER_BIT}U&&(G|=P.DEPTH_BUFFER_BIT),k&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",q,!1),e.removeEventListener("webglcontextrestored",$,!1),e.removeEventListener("webglcontextcreationerror",it,!1),at.dispose(),ut.dispose(),Tt.dispose(),C.dispose(),M.dispose(),Z.dispose(),Nt.dispose(),ne.dispose(),K.dispose(),et.dispose(),et.removeEventListener("sessionstart",on),et.removeEventListener("sessionend",Ml),jn.stop()};function q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const E=ee.autoReset,U=tt.enabled,k=tt.autoUpdate,G=tt.needsUpdate,N=tt.type;D(),ee.autoReset=E,tt.enabled=U,tt.autoUpdate=k,tt.needsUpdate=G,tt.type=N}function it(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function bt(E){const U=E.target;U.removeEventListener("dispose",bt),Ht(U)}function Ht(E){ue(E),Tt.remove(E)}function ue(E){const U=Tt.get(E).programs;U!==void 0&&(U.forEach(function(k){K.releaseProgram(k)}),E.isShaderMaterial&&K.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,k,G,N,nt){U===null&&(U=Mt);const ot=N.isMesh&&N.matrixWorld.determinant()<0,pt=Fd(E,U,k,G,N);xt.setMaterial(G,ot);let mt=k.index,Et=1;if(G.wireframe===!0){if(mt=j.getWireframeAttribute(k),mt===void 0)return;Et=2}const At=k.drawRange,_t=k.attributes.position;let Xt=At.start*Et,se=(At.start+At.count)*Et;nt!==null&&(Xt=Math.max(Xt,nt.start*Et),se=Math.min(se,(nt.start+nt.count)*Et)),mt!==null?(Xt=Math.max(Xt,0),se=Math.min(se,mt.count)):_t!=null&&(Xt=Math.max(Xt,0),se=Math.min(se,_t.count));const re=se-Xt;if(re<0||re===1/0)return;Nt.setup(N,G,pt,k,mt);let Ne,Yt=wt;if(mt!==null&&(Ne=V.get(mt),Yt=ft,Yt.setIndex(Ne)),N.isMesh)G.wireframe===!0?(xt.setLineWidth(G.wireframeLinewidth*Qt()),Yt.setMode(P.LINES)):Yt.setMode(P.TRIANGLES);else if(N.isLine){let vt=G.linewidth;vt===void 0&&(vt=1),xt.setLineWidth(vt*Qt()),N.isLineSegments?Yt.setMode(P.LINES):N.isLineLoop?Yt.setMode(P.LINE_LOOP):Yt.setMode(P.LINE_STRIP)}else N.isPoints?Yt.setMode(P.POINTS):N.isSprite&&Yt.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Yt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))Yt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const vt=N._multiDrawStarts,Se=N._multiDrawCounts,qt=N._multiDrawCount,je=mt?V.get(mt).bytesPerElement:1,xi=Tt.get(G).currentProgram.getUniforms();for(let Fe=0;Fe<qt;Fe++)xi.setValue(P,"_gl_DrawID",Fe),Yt.render(vt[Fe]/je,Se[Fe])}else if(N.isInstancedMesh)Yt.renderInstances(Xt,re,N.count);else if(k.isInstancedBufferGeometry){const vt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Se=Math.min(k.instanceCount,vt);Yt.renderInstances(Xt,re,Se)}else Yt.render(Xt,re)};function ye(E,U,k){E.transparent===!0&&E.side===An&&E.forceSinglePass===!1?(E.side=De,E.needsUpdate=!0,Ws(E,U,k),E.side=Wn,E.needsUpdate=!0,Ws(E,U,k),E.side=An):Ws(E,U,k)}this.compile=function(E,U,k=null){k===null&&(k=E),p=ut.get(k),p.init(U),y.push(p),k.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==k&&E.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const G=new Set;return E.traverse(function(N){const nt=N.material;if(nt)if(Array.isArray(nt))for(let ot=0;ot<nt.length;ot++){const pt=nt[ot];ye(pt,k,N),G.add(pt)}else ye(nt,k,N),G.add(nt)}),y.pop(),p=null,G},this.compileAsync=function(E,U,k=null){const G=this.compile(E,U,k);return new Promise(N=>{function nt(){if(G.forEach(function(ot){Tt.get(ot).currentProgram.isReady()&&G.delete(ot)}),G.size===0){N(E);return}setTimeout(nt,10)}Ft.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let Wt=null;function _n(E){Wt&&Wt(E)}function on(){jn.stop()}function Ml(){jn.start()}const jn=new Cd;jn.setAnimationLoop(_n),typeof self!="undefined"&&jn.setContext(self),this.setAnimationLoop=function(E){Wt=E,et.setAnimationLoop(E),E===null?jn.stop():jn.start()},et.addEventListener("sessionstart",on),et.addEventListener("sessionend",Ml),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(U),U=et.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,U,A),p=ut.get(E,y.length),p.init(U),y.push(p),ct.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),kt.setFromProjectionMatrix(ct),Q=this.localClippingEnabled,X=Lt.init(this.clippingPlanes,Q),_=at.get(E,m.length),_.init(),m.push(_),et.enabled===!0&&et.isPresenting===!0){const nt=x.xr.getDepthSensingMesh();nt!==null&&ea(nt,U,-1/0,x.sortObjects)}ea(E,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,J),Pt=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Pt&&ht.addToRenderList(_,E),this.info.render.frame++,X===!0&&Lt.beginShadows();const k=p.state.shadowsArray;tt.render(k,E,U),X===!0&&Lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=_.opaque,N=_.transmissive;if(p.setupLights(),U.isArrayCamera){const nt=U.cameras;if(N.length>0)for(let ot=0,pt=nt.length;ot<pt;ot++){const mt=nt[ot];El(G,N,E,mt)}Pt&&ht.render(E);for(let ot=0,pt=nt.length;ot<pt;ot++){const mt=nt[ot];bl(_,E,mt,mt.viewport)}}else N.length>0&&El(G,N,E,U),Pt&&ht.render(E),bl(_,E,U);A!==null&&(Ct.updateMultisampleRenderTarget(A),Ct.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(x,E,U),Nt.resetDefaultState(),I=-1,b=null,y.pop(),y.length>0?(p=y[y.length-1],X===!0&&Lt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function ea(E,U,k,G){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)k=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||kt.intersectsSprite(E)){G&&St.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ct);const ot=Z.update(E),pt=E.material;pt.visible&&_.push(E,ot,pt,k,St.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||kt.intersectsObject(E))){const ot=Z.update(E),pt=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),St.copy(E.boundingSphere.center)):(ot.boundingSphere===null&&ot.computeBoundingSphere(),St.copy(ot.boundingSphere.center)),St.applyMatrix4(E.matrixWorld).applyMatrix4(ct)),Array.isArray(pt)){const mt=ot.groups;for(let Et=0,At=mt.length;Et<At;Et++){const _t=mt[Et],Xt=pt[_t.materialIndex];Xt&&Xt.visible&&_.push(E,ot,Xt,k,St.z,_t)}}else pt.visible&&_.push(E,ot,pt,k,St.z,null)}}const nt=E.children;for(let ot=0,pt=nt.length;ot<pt;ot++)ea(nt[ot],U,k,G)}function bl(E,U,k,G){const N=E.opaque,nt=E.transmissive,ot=E.transparent;p.setupLightsView(k),X===!0&&Lt.setGlobalState(x.clippingPlanes,k),G&&xt.viewport(v.copy(G)),N.length>0&&Vs(N,U,k),nt.length>0&&Vs(nt,U,k),ot.length>0&&Vs(ot,U,k),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function El(E,U,k,G){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new _i(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?Bs:Ln,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const nt=p.state.transmissionRenderTarget[G.id],ot=G.viewport||v;nt.setSize(ot.z,ot.w);const pt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor(F),O=x.getClearAlpha(),O<1&&x.setClearColor(16777215,.5),x.clear(),Pt&&ht.render(k);const mt=x.toneMapping;x.toneMapping=Vn;const Et=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),X===!0&&Lt.setGlobalState(x.clippingPlanes,G),Vs(E,k,G),Ct.updateMultisampleRenderTarget(nt),Ct.updateRenderTargetMipmap(nt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let _t=0,Xt=U.length;_t<Xt;_t++){const se=U[_t],re=se.object,Ne=se.geometry,Yt=se.material,vt=se.group;if(Yt.side===An&&re.layers.test(G.layers)){const Se=Yt.side;Yt.side=De,Yt.needsUpdate=!0,Tl(re,k,G,Ne,Yt,vt),Yt.side=Se,Yt.needsUpdate=!0,At=!0}}At===!0&&(Ct.updateMultisampleRenderTarget(nt),Ct.updateRenderTargetMipmap(nt))}x.setRenderTarget(pt),x.setClearColor(F,O),Et!==void 0&&(G.viewport=Et),x.toneMapping=mt}function Vs(E,U,k){const G=U.isScene===!0?U.overrideMaterial:null;for(let N=0,nt=E.length;N<nt;N++){const ot=E[N],pt=ot.object,mt=ot.geometry,Et=G===null?ot.material:G,At=ot.group;pt.layers.test(k.layers)&&Tl(pt,U,k,mt,Et,At)}}function Tl(E,U,k,G,N,nt){E.onBeforeRender(x,U,k,G,N,nt),E.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(x,U,k,G,E,nt),N.transparent===!0&&N.side===An&&N.forceSinglePass===!1?(N.side=De,N.needsUpdate=!0,x.renderBufferDirect(k,U,G,N,E,nt),N.side=Wn,N.needsUpdate=!0,x.renderBufferDirect(k,U,G,N,E,nt),N.side=An):x.renderBufferDirect(k,U,G,N,E,nt),E.onAfterRender(x,U,k,G,N,nt)}function Ws(E,U,k){U.isScene!==!0&&(U=Mt);const G=Tt.get(E),N=p.state.lights,nt=p.state.shadowsArray,ot=N.state.version,pt=K.getParameters(E,N.state,nt,U,k),mt=K.getProgramCacheKey(pt);let Et=G.programs;G.environment=E.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(E.isMeshStandardMaterial?M:C).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Et===void 0&&(E.addEventListener("dispose",bt),Et=new Map,G.programs=Et);let At=Et.get(mt);if(At!==void 0){if(G.currentProgram===At&&G.lightsStateVersion===ot)return wl(E,pt),At}else pt.uniforms=K.getUniforms(E),E.onBeforeCompile(pt,x),At=K.acquireProgram(pt,mt),Et.set(mt,At),G.uniforms=pt.uniforms;const _t=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(_t.clippingPlanes=Lt.uniform),wl(E,pt),G.needsLights=Bd(E),G.lightsStateVersion=ot,G.needsLights&&(_t.ambientLightColor.value=N.state.ambient,_t.lightProbe.value=N.state.probe,_t.directionalLights.value=N.state.directional,_t.directionalLightShadows.value=N.state.directionalShadow,_t.spotLights.value=N.state.spot,_t.spotLightShadows.value=N.state.spotShadow,_t.rectAreaLights.value=N.state.rectArea,_t.ltc_1.value=N.state.rectAreaLTC1,_t.ltc_2.value=N.state.rectAreaLTC2,_t.pointLights.value=N.state.point,_t.pointLightShadows.value=N.state.pointShadow,_t.hemisphereLights.value=N.state.hemi,_t.directionalShadowMap.value=N.state.directionalShadowMap,_t.directionalShadowMatrix.value=N.state.directionalShadowMatrix,_t.spotShadowMap.value=N.state.spotShadowMap,_t.spotLightMatrix.value=N.state.spotLightMatrix,_t.spotLightMap.value=N.state.spotLightMap,_t.pointShadowMap.value=N.state.pointShadowMap,_t.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=At,G.uniformsList=null,At}function Al(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Nr.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function wl(E,U){const k=Tt.get(E);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function Fd(E,U,k,G,N){U.isScene!==!0&&(U=Mt),Ct.resetTextureUnits();const nt=U.fog,ot=G.isMeshStandardMaterial?U.environment:null,pt=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:qn,mt=(G.isMeshStandardMaterial?M:C).get(G.envMap||ot),Et=G.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,At=!!k.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),_t=!!k.morphAttributes.position,Xt=!!k.morphAttributes.normal,se=!!k.morphAttributes.color;let re=Vn;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(re=x.toneMapping);const Ne=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Yt=Ne!==void 0?Ne.length:0,vt=Tt.get(G),Se=p.state.lights;if(X===!0&&(Q===!0||E!==b)){const He=E===b&&G.id===I;Lt.setState(G,E,He)}let qt=!1;G.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==Se.state.version||vt.outputColorSpace!==pt||N.isBatchedMesh&&vt.batching===!1||!N.isBatchedMesh&&vt.batching===!0||N.isBatchedMesh&&vt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&vt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&vt.instancing===!1||!N.isInstancedMesh&&vt.instancing===!0||N.isSkinnedMesh&&vt.skinning===!1||!N.isSkinnedMesh&&vt.skinning===!0||N.isInstancedMesh&&vt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&vt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&vt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&vt.instancingMorph===!1&&N.morphTexture!==null||vt.envMap!==mt||G.fog===!0&&vt.fog!==nt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==Lt.numPlanes||vt.numIntersection!==Lt.numIntersection)||vt.vertexAlphas!==Et||vt.vertexTangents!==At||vt.morphTargets!==_t||vt.morphNormals!==Xt||vt.morphColors!==se||vt.toneMapping!==re||vt.morphTargetsCount!==Yt)&&(qt=!0):(qt=!0,vt.__version=G.version);let je=vt.currentProgram;qt===!0&&(je=Ws(G,U,N));let xi=!1,Fe=!1,na=!1;const de=je.getUniforms(),Dn=vt.uniforms;if(xt.useProgram(je.program)&&(xi=!0,Fe=!0,na=!0),G.id!==I&&(I=G.id,Fe=!0),xi||b!==E){de.setValue(P,"projectionMatrix",E.projectionMatrix),de.setValue(P,"viewMatrix",E.matrixWorldInverse);const He=de.map.cameraPosition;He!==void 0&&He.setValue(P,lt.setFromMatrixPosition(E.matrixWorld)),Ot.logarithmicDepthBuffer&&de.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&de.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,Fe=!0,na=!0)}if(N.isSkinnedMesh){de.setOptional(P,N,"bindMatrix"),de.setOptional(P,N,"bindMatrixInverse");const He=N.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),de.setValue(P,"boneTexture",He.boneTexture,Ct))}N.isBatchedMesh&&(de.setOptional(P,N,"batchingTexture"),de.setValue(P,"batchingTexture",N._matricesTexture,Ct),de.setOptional(P,N,"batchingIdTexture"),de.setValue(P,"batchingIdTexture",N._indirectTexture,Ct),de.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&de.setValue(P,"batchingColorTexture",N._colorsTexture,Ct));const ia=k.morphAttributes;if((ia.position!==void 0||ia.normal!==void 0||ia.color!==void 0)&&zt.update(N,k,je),(Fe||vt.receiveShadow!==N.receiveShadow)&&(vt.receiveShadow=N.receiveShadow,de.setValue(P,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Dn.envMap.value=mt,Dn.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(Dn.envMapIntensity.value=U.environmentIntensity),Fe&&(de.setValue(P,"toneMappingExposure",x.toneMappingExposure),vt.needsLights&&Od(Dn,na),nt&&G.fog===!0&&yt.refreshFogUniforms(Dn,nt),yt.refreshMaterialUniforms(Dn,G,H,L,p.state.transmissionRenderTarget[E.id]),Nr.upload(P,Al(vt),Dn,Ct)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Nr.upload(P,Al(vt),Dn,Ct),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&de.setValue(P,"center",N.center),de.setValue(P,"modelViewMatrix",N.modelViewMatrix),de.setValue(P,"normalMatrix",N.normalMatrix),de.setValue(P,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const He=G.uniformsGroups;for(let sa=0,kd=He.length;sa<kd;sa++){const Cl=He[sa];ne.update(Cl,je),ne.bind(Cl,je)}}return je}function Od(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Bd(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,U,k){Tt.get(E.texture).__webglTexture=U,Tt.get(E.depthTexture).__webglTexture=k;const G=Tt.get(E);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=k===void 0,G.__autoAllocateDepthBuffer||Ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){const k=Tt.get(E);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,k=0){A=E,R=U,T=k;let G=!0,N=null,nt=!1,ot=!1;if(E){const mt=Tt.get(E);if(mt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(mt.__webglFramebuffer===void 0)Ct.setupRenderTarget(E);else if(mt.__hasExternalTextures)Ct.rebindTextures(E,Tt.get(E.texture).__webglTexture,Tt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const _t=E.depthTexture;if(mt.__boundDepthTexture!==_t){if(_t!==null&&Tt.has(_t)&&(E.width!==_t.image.width||E.height!==_t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ct.setupDepthRenderbuffer(E)}}const Et=E.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(ot=!0);const At=Tt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(At[U])?N=At[U][k]:N=At[U],nt=!0):E.samples>0&&Ct.useMultisampledRTT(E)===!1?N=Tt.get(E).__webglMultisampledFramebuffer:Array.isArray(At)?N=At[k]:N=At,v.copy(E.viewport),w.copy(E.scissor),B=E.scissorTest}else v.copy(rt).multiplyScalar(H).floor(),w.copy(dt).multiplyScalar(H).floor(),B=It;if(xt.bindFramebuffer(P.FRAMEBUFFER,N)&&G&&xt.drawBuffers(E,N),xt.viewport(v),xt.scissor(w),xt.setScissorTest(B),nt){const mt=Tt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,mt.__webglTexture,k)}else if(ot){const mt=Tt.get(E.texture),Et=U||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,mt.__webglTexture,k||0,Et)}I=-1},this.readRenderTargetPixels=function(E,U,k,G,N,nt,ot){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=Tt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ot!==void 0&&(pt=pt[ot]),pt){xt.bindFramebuffer(P.FRAMEBUFFER,pt);try{const mt=E.texture,Et=mt.format,At=mt.type;if(!Ot.textureFormatReadable(Et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ot.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-G&&k>=0&&k<=E.height-N&&P.readPixels(U,k,G,N,Rt.convert(Et),Rt.convert(At),nt)}finally{const mt=A!==null?Tt.get(A).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(E,U,k,G,N,nt,ot){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=Tt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ot!==void 0&&(pt=pt[ot]),pt){xt.bindFramebuffer(P.FRAMEBUFFER,pt);try{const mt=E.texture,Et=mt.format,At=mt.type;if(!Ot.textureFormatReadable(Et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ot.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-G&&k>=0&&k<=E.height-N){const _t=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,_t),P.bufferData(P.PIXEL_PACK_BUFFER,nt.byteLength,P.STREAM_READ),P.readPixels(U,k,G,N,Rt.convert(Et),Rt.convert(At),0),P.flush();const Xt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);await H_(P,Xt,4);try{P.bindBuffer(P.PIXEL_PACK_BUFFER,_t),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,nt)}finally{P.deleteBuffer(_t),P.deleteSync(Xt)}return nt}}finally{const mt=A!==null?Tt.get(A).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,mt)}}},this.copyFramebufferToTexture=function(E,U=null,k=0){E.isTexture!==!0&&(Cs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);const G=Math.pow(2,-k),N=Math.floor(E.image.width*G),nt=Math.floor(E.image.height*G),ot=U!==null?U.x:0,pt=U!==null?U.y:0;Ct.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,k,0,0,ot,pt,N,nt),xt.unbindTexture()},this.copyTextureToTexture=function(E,U,k=null,G=null,N=0){E.isTexture!==!0&&(Cs("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,E=arguments[1],U=arguments[2],N=arguments[3]||0,k=null);let nt,ot,pt,mt,Et,At;k!==null?(nt=k.max.x-k.min.x,ot=k.max.y-k.min.y,pt=k.min.x,mt=k.min.y):(nt=E.image.width,ot=E.image.height,pt=0,mt=0),G!==null?(Et=G.x,At=G.y):(Et=0,At=0);const _t=Rt.convert(U.format),Xt=Rt.convert(U.type);Ct.setTexture2D(U,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);const se=P.getParameter(P.UNPACK_ROW_LENGTH),re=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ne=P.getParameter(P.UNPACK_SKIP_PIXELS),Yt=P.getParameter(P.UNPACK_SKIP_ROWS),vt=P.getParameter(P.UNPACK_SKIP_IMAGES),Se=E.isCompressedTexture?E.mipmaps[N]:E.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Se.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Se.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,mt),E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,N,Et,At,nt,ot,_t,Xt,Se.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,N,Et,At,Se.width,Se.height,_t,Se.data):P.texSubImage2D(P.TEXTURE_2D,N,Et,At,nt,ot,_t,Xt,Se),P.pixelStorei(P.UNPACK_ROW_LENGTH,se),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,re),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ne),P.pixelStorei(P.UNPACK_SKIP_ROWS,Yt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,vt),N===0&&U.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),xt.unbindTexture()},this.copyTextureToTexture3D=function(E,U,k=null,G=null,N=0){E.isTexture!==!0&&(Cs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,G=arguments[1]||null,E=arguments[2],U=arguments[3],N=arguments[4]||0);let nt,ot,pt,mt,Et,At,_t,Xt,se;const re=E.isCompressedTexture?E.mipmaps[N]:E.image;k!==null?(nt=k.max.x-k.min.x,ot=k.max.y-k.min.y,pt=k.max.z-k.min.z,mt=k.min.x,Et=k.min.y,At=k.min.z):(nt=re.width,ot=re.height,pt=re.depth,mt=0,Et=0,At=0),G!==null?(_t=G.x,Xt=G.y,se=G.z):(_t=0,Xt=0,se=0);const Ne=Rt.convert(U.format),Yt=Rt.convert(U.type);let vt;if(U.isData3DTexture)Ct.setTexture3D(U,0),vt=P.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)Ct.setTexture2DArray(U,0),vt=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);const Se=P.getParameter(P.UNPACK_ROW_LENGTH),qt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),je=P.getParameter(P.UNPACK_SKIP_PIXELS),xi=P.getParameter(P.UNPACK_SKIP_ROWS),Fe=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,re.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,re.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,mt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Et),P.pixelStorei(P.UNPACK_SKIP_IMAGES,At),E.isDataTexture||E.isData3DTexture?P.texSubImage3D(vt,N,_t,Xt,se,nt,ot,pt,Ne,Yt,re.data):U.isCompressedArrayTexture?P.compressedTexSubImage3D(vt,N,_t,Xt,se,nt,ot,pt,Ne,re.data):P.texSubImage3D(vt,N,_t,Xt,se,nt,ot,pt,Ne,Yt,re),P.pixelStorei(P.UNPACK_ROW_LENGTH,Se),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,qt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,je),P.pixelStorei(P.UNPACK_SKIP_ROWS,xi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Fe),N===0&&U.generateMipmaps&&P.generateMipmap(vt),xt.unbindTexture()},this.initRenderTarget=function(E){Tt.get(E).__webglFramebuffer===void 0&&Ct.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ct.setTextureCube(E,0):E.isData3DTexture?Ct.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ct.setTexture2DArray(E,0):Ct.setTexture2D(E,0),xt.unbindTexture()},this.resetState=function(){R=0,T=0,A=null,xt.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===_l?"display-p3":"srgb",e.unpackColorSpace=$t.workingColorSpace===Jr?"display-p3":"srgb"}}class QS extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Sl extends $n{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],p=n/2;let m=0;y(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new pn(u,3)),this.setAttribute("normal",new pn(d,3)),this.setAttribute("uv",new pn(f,2));function y(){const S=new z,R=new z;let T=0;const A=(e-t)/n;for(let I=0;I<=r;I++){const b=[],v=I/r,w=v*(e-t)+t;for(let B=0;B<=s;B++){const F=B/s,O=F*l+o,Y=Math.sin(O),L=Math.cos(O);R.x=w*Y,R.y=-v*n+p,R.z=w*L,u.push(R.x,R.y,R.z),S.set(Y,A,L).normalize(),d.push(S.x,S.y,S.z),f.push(F,1-v),b.push(g++)}_.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){const v=_[b][I],w=_[b+1][I],B=_[b+1][I+1],F=_[b][I+1];h.push(v,w,F),h.push(w,B,F),T+=6}c.addGroup(m,T,0),m+=T}function x(S){const R=g,T=new Gt,A=new z;let I=0;const b=S===!0?t:e,v=S===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,p*v,0),d.push(0,v,0),f.push(.5,.5),g++;const w=g;for(let B=0;B<=s;B++){const O=B/s*l+o,Y=Math.cos(O),L=Math.sin(O);A.x=b*L,A.y=p*v,A.z=b*Y,u.push(A.x,A.y,A.z),d.push(0,v,0),T.x=Y*.5+.5,T.y=L*.5*v+.5,f.push(T.x,T.y),g++}for(let B=0;B<s;B++){const F=R+B,O=w+B;S===!0?h.push(O,O+1,F):h.push(O+1,O,F),I+=3}c.addGroup(m,I,S===!0?1:2),m+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Dh extends Hs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=md,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nd extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Qa=new he,Uh=new z,Nh=new z;class tM{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vl,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Uh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Uh),Nh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nh),e.updateMatrixWorld(),Qa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class eM extends tM{constructor(){super(new Rd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nM extends Nd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new eM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class iM extends Nd{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hl}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hl);(async()=>{const i=document.body,t=new JS({antialias:!0,alpha:!0});t.setPixelRatio(devicePixelRatio),t.setSize(innerWidth,innerHeight),t.domElement.style.display="block",i.prepend(t.domElement);const e=new QS;e.background=new Vt("#050507");const n=new We(55,innerWidth/innerHeight,.1,100);n.position.set(3,3.5,4.5),n.lookAt(0,.6,0);const s=new is,r=new Dh({color:"#ff5666",roughness:.4,metalness:.1}),a=new nn(s,r);a.position.y=.5,e.add(a);const o=new nn(new Sl(5,5,.2,40),new Dh({color:"#111318",roughness:.9}));o.position.y=-.1,e.add(o);const l=new nM("#ffffff",2.2);l.position.set(4,6,3),e.add(l),e.add(new iM("#404040",.6));const c=new Fu;await c.init({backgroundAlpha:0,antialias:!0,resizeTo:window}),c.canvas.style.position="fixed",c.canvas.style.top="0",c.canvas.style.left="0",c.canvas.style.pointerEvents="none",i.append(c.canvas);const h=new Yn;c.stage.addChild(h);const u=new Xg({text:"HYPO PROTOTYPE",style:{fill:"#fff",fontSize:18,letterSpacing:2}});u.x=12,u.y=10,h.addChild(u);let d=performance.now();const f=m=>{const y=(m-d)/1e3;d=m,a.rotation.y+=y*.8,a.rotation.x=Math.sin(m*5e-4)*.4,t.render(e,n),requestAnimationFrame(f)};requestAnimationFrame(f),addEventListener("resize",()=>{t.setSize(innerWidth,innerHeight),n.aspect=innerWidth/innerHeight,n.updateProjectionMatrix()});let g=!1,_=0,p=0;addEventListener("pointerdown",m=>{g=!0,_=m.clientX,p=m.clientY}),addEventListener("pointerup",()=>{g=!1}),addEventListener("pointermove",m=>{if(!g)return;const y=m.clientX-_,x=m.clientY-p;_=m.clientX,p=m.clientY,a.rotation.y+=y*.01,a.rotation.x+=x*.01}),console.log("HYPO bootstrap complete")})();export{Lf as $,Lu as A,Ie as B,Yn as C,ze as D,jt as E,eu as F,$r as G,Vl as H,Rs as I,ip as J,dp as K,Os as L,Bt as M,oe as N,ce as O,Te as P,Pp as Q,lo as R,Qp as S,Zs as T,ro as U,Xl as V,fa as W,Yl as X,Uf as Y,Or as Z,me as _,gn as a,Zh as a0,Du as a1,le as a2,Ge as a3,Np as a4,cm as a5,nm as a6,Cm as a7,Pm as a8,Nm as a9,Om as aa,Bm as ab,Ou as ac,Gi as ad,Br as ae,Lc as af,ed as ag,Op as ah,zi as ai,nu as aj,Si as ak,qu as al,lc as am,ac as an,tf as ao,Fc as ap,Ku as aq,Us as b,Rr as c,el as d,$e as e,oc as f,Kp as g,Ru as h,cu as i,rn as j,Eu as k,xo as l,wm as m,Rm as n,Dm as o,Fm as p,nl as q,mf as r,Zt as s,yu as t,Qd as u,zm as v,Re as w,qe as x,$h as y,sn as z};
