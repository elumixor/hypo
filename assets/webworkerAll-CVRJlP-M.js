import{E as p,U as He,T as te,M as w,k as R,c as he,F as T,s as S,a5 as j,R as q,w as L,z as fe,a2 as k,a3 as pe,b as G,B as v,D as $,x as O,ac as Ke,ad as Q,J as X,ae as A,q as J,t as Ne,G as je,_ as qe,Z as H,m as me,p as ge,a7 as xe,aa as _e,n as $e,o as Qe,a8 as Je,a9 as Ze,ab as et,af as tt,ag as rt,ah as st,ai as K,aj as it,ak as nt,l as ye,al as re,am as W,e as b,an as at}from"./index-BrUy3-_x.js";import{S as E,c as I,a as ot,b as ut,B as be}from"./colorToUniform-DmtBy-2V.js";class Te{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:s,clientHeight:n}=this._resizeTo;t=s,r=n}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Te.extension=p.Application;class ve{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,He.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?te.shared:new te,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}ve.extension=p.Application;class we{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}we.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"filter"};const se=new w;function lt(a,e){var r;e.clear();const t=e.matrix;for(let s=0;s<a.length;s++){const n=a[s];if(n.globalDisplayStatus<7)continue;const i=(r=n.renderGroup)!=null?r:n.parentRenderGroup;i!=null&&i.isCachedAsTexture?e.matrix=se.copyFrom(i.textureOffsetInverseTransform).append(n.worldTransform):i!=null&&i._parentCacheAsTextureRenderGroup?e.matrix=se.copyFrom(i._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(n.groupTransform):e.matrix=n.worldTransform,e.addBounds(n.bounds)}return e.matrix=t,e}const ct=new j({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class dt{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new fe,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0}}}class Ce{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new R({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new he({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,s=this._pushFilterData();s.skip=!1,s.filters=r,s.container=e.container,s.outputRenderSurface=t.renderTarget.renderSurface;const n=t.renderTarget.renderTarget.colorTexture.source,i=n.resolution,o=n.antialias;if(r.length===0){s.skip=!0;return}const u=s.bounds;if(this._calculateFilterArea(e,u),this._calculateFilterBounds(s,t.renderTarget.rootViewPort,o,i,1),s.skip)return;const l=this._getPreviousFilterData(),h=this._findFilterResolution(i);let d=0,c=0;l&&(d=l.bounds.minX,c=l.bounds.minY),this._calculateGlobalFrame(s,d,c,h,n.width,n.height),this._setupFilterTextures(s,u,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const s=e.source,n=s.resolution,i=s.antialias;if(t.length===0)return r.skip=!0,e;const o=r.bounds;if(o.addRect(e.frame),this._calculateFilterBounds(r,o.rectangle,i,n,0),r.skip)return e;const u=n;this._calculateGlobalFrame(r,0,0,u,s.width,s.height),r.outputRenderSurface=T.getOptimalTexture(o.width,o.height,r.resolution,r.antialias),r.backTexture=S.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const c=r.outputRenderSurface;return c.source.alphaMode="premultiplied-alpha",c}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&T.returnTexture(t.backTexture),T.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const s=e.colorTexture.source._resolution,n=T.getOptimalTexture(t.width,t.height,s,!1);let i=t.minX,o=t.minY;r&&(i-=r.minX,o-=r.minY),i=Math.floor(i*s),o=Math.floor(o*s);const u=Math.ceil(t.width*s),l=Math.ceil(t.height*s);return this.renderer.renderTarget.copyToTexture(e,n,{x:i,y:o},{width:u,height:l},{x:0,y:0}),n}applyFilter(e,t,r,s){const n=this.renderer,i=this._activeFilterData,u=i.outputRenderSurface===r,l=n.renderTarget.rootRenderTarget.colorTexture.source._resolution,h=this._findFilterResolution(l);let d=0,c=0;if(u){const f=this._findPreviousFilterOffset();d=f.x,c=f.y}this._updateFilterUniforms(t,r,i,d,c,h,u,s),this._setupBindGroupsAndRender(e,t,n)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,s=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),n=t.worldTransform.copyTo(w.shared),i=t.renderGroup||t.parentRenderGroup;return i&&i.cacheToLocalTransform&&n.prepend(i.cacheToLocalTransform),n.invert(),s.prepend(n),s.scale(1/t.texture.orig.width,1/t.texture.orig.height),s.translate(t.anchor.x,t.anchor.y),s}destroy(){}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const s=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(s,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:ct,shader:e,state:e._state,topology:"triangle-list"}),r.type===q.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,s){if(e.backTexture=S.EMPTY,e.inputTexture=T.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const n=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(n,t,s==null?void 0:s.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,s,n,i){const o=e.globalFrame;o.x=t*s,o.y=r*s,o.width=n*s,o.height=i*s}_updateFilterUniforms(e,t,r,s,n,i,o,u){const l=this._filterGlobalUniforms.uniforms,h=l.uOutputFrame,d=l.uInputSize,c=l.uInputPixel,f=l.uInputClamp,_=l.uGlobalFrame,m=l.uOutputTexture;o?(h[0]=r.bounds.minX-s,h[1]=r.bounds.minY-n):(h[0]=0,h[1]=0),h[2]=e.frame.width,h[3]=e.frame.height,d[0]=e.source.width,d[1]=e.source.height,d[2]=1/d[0],d[3]=1/d[1],c[0]=e.source.pixelWidth,c[1]=e.source.pixelHeight,c[2]=1/c[0],c[3]=1/c[1],f[0]=.5*c[2],f[1]=.5*c[3],f[2]=e.frame.width*d[2]-.5*c[2],f[3]=e.frame.height*d[3]-.5*c[3];const g=this.renderer.renderTarget.rootRenderTarget.colorTexture;_[0]=s*i,_[1]=n*i,_[2]=g.source.width*i,_[3]=g.source.height*i,t instanceof S&&(t.source.resource=null);const x=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!u),t instanceof S?(m[0]=t.frame.width,m[1]=t.frame.height):(m[0]=x.width,m[1]=x.height),m[2]=x.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const s=this._filterStack[r];if(!s.skip){e=s.bounds.minX,t=s.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?lt(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const s=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;s&&t.applyMatrix(s)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,s=e.bounds,n=e.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),n.length===1)n[0].apply(this,r,e.outputRenderSurface,t);else{let i=e.inputTexture;const o=T.getOptimalTexture(s.width,s.height,i.source._resolution,!1);let u=o,l=0;for(l=0;l<n.length-1;++l){n[l].apply(this,i,u,!0);const d=i;i=u,u=d}n[l].apply(this,i,e.outputRenderSurface,t),T.returnTexture(o)}}_calculateFilterBounds(e,t,r,s,n){var m,g;const i=this.renderer,o=e.bounds,u=e.filters;let l=1/0,h=0,d=!0,c=!1,f=!1,_=!0;for(let x=0;x<u.length;x++){const y=u[x];if(l=Math.min(l,y.resolution==="inherit"?s:y.resolution),h+=y.padding,y.antialias==="off"?d=!1:y.antialias==="inherit"&&d&&(d=r),y.clipToViewport||(_=!1),!!!(y.compatibleRenderers&i.type)){f=!1;break}if(y.blendRequired&&!((g=(m=i.backBuffer)==null?void 0:m.useBackBuffer)==null||g)){L("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=y.enabled||f,c||(c=y.blendRequired)}if(!f){e.skip=!0;return}if(_&&o.fitBounds(0,t.width/s,0,t.height/s),o.scale(l).ceil().scale(1/l).pad((h|0)*n),!o.isPositive){e.skip=!0;return}e.antialias=d,e.resolution=l,e.blendRequired=c}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new dt),this._filterStackIndex++,e}}Ce.extension={type:[p.WebGLSystem,p.WebGPUSystem],name:"filter"};const Pe=class Se extends j{constructor(...e){var h;let t=(h=e[0])!=null?h:{};t instanceof Float32Array&&(k(pe,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...Se.defaultOptions,...t};const r=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let s=t.uvs;s||(t.positions?s=new Float32Array(r.length):s=new Float32Array([0,0,1,0,1,1,0,1]));const n=t.indices||new Uint32Array([0,1,2,0,2,3]),i=t.shrinkBuffersToFit,o=new G({data:r,label:"attribute-mesh-positions",shrinkToFit:i,usage:v.VERTEX|v.COPY_DST}),u=new G({data:s,label:"attribute-mesh-uvs",shrinkToFit:i,usage:v.VERTEX|v.COPY_DST}),l=new G({data:n,label:"index-mesh-buffer",shrinkToFit:i,usage:v.INDEX|v.COPY_DST});super({attributes:{aPosition:{buffer:o,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:u,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};Pe.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let Z=Pe;const ie="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml";class Re{constructor(){this.svgRoot=document.createElementNS(ie,"svg"),this.foreignObject=document.createElementNS(ie,"foreignObject"),this.domElement=document.createElementNS(ne,"div"),this.styleElement=document.createElementNS(ne,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:s}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(s),this.image=$.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src="",this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}}let ae;function ht(a,e,t,r){r||(r=ae||(ae=new Re));const{domElement:s,styleElement:n,svgRoot:i}=r;s.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${a}</div>`,s.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(n.textContent=t),document.body.appendChild(i);const o=s.getBoundingClientRect();i.remove();const u=e.padding*2;return{width:o.width-u,height:o.height-u}}class ft{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{O.return(e)}),this.batches.length=0}}class Ue{constructor(e,t){this.state=E.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,s=this.renderer.graphicsContext.updateGpuContext(t);return!!(s.isBatchable||r!==s.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let s=0;s<r.length;s++){const n=r[s];n._batcher.updateElement(n)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const n=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const i=n.resources.localUniforms.uniforms;i.uTransformMatrix=e.groupTransform,i.uRound=t._roundPixels|e._roundPixels,I(e.groupColorAlpha,i.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,s=this._getGpuDataForRenderable(e).batches;for(let n=0;n<s.length;n++){const i=s[n];r.addToBatch(i,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new ft;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,s=this.renderer.graphicsContext.getGpuContext(r),n=this.renderer._roundPixels|e._roundPixels;t.batches=s.batches.map(i=>{const o=O.get(Ke);return i.copyTo(o),o.renderable=e,o.roundPixels=n,o})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}Ue.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"graphics"};const Be=class Fe extends Z{constructor(...e){var r;super({});let t=(r=e[0])!=null?r:{};typeof t=="number"&&(k(pe,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(e){var d,c,f,_;e={...Fe.defaultOptions,...e},this.verticesX=(d=this.verticesX)!=null?d:e.verticesX,this.verticesY=(c=this.verticesY)!=null?c:e.verticesY,this.width=(f=this.width)!=null?f:e.width,this.height=(_=this.height)!=null?_:e.height;const t=this.verticesX*this.verticesY,r=[],s=[],n=[],i=this.verticesX-1,o=this.verticesY-1,u=this.width/i,l=this.height/o;for(let m=0;m<t;m++){const g=m%this.verticesX,x=m/this.verticesX|0;r.push(g*u,x*l),s.push(g/i,x/o)}const h=i*o;for(let m=0;m<h;m++){const g=m%i,x=m/i|0,y=x*this.verticesX+g,C=x*this.verticesX+g+1,D=(x+1)*this.verticesX+g,P=(x+1)*this.verticesX+g+1;n.push(y,C,D,C,P,D)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(s),this.indexBuffer.data=new Uint32Array(n),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};Be.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let pt=Be;class ee{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let s=r;const n=this.texture.textureMatrix;return n.isSimple||(s=this._transformedUvs,(this._textureMatrixUpdateId!==n._updateID||this._uvUpdateId!==t._updateID)&&((!s||s.length<r.length)&&(s=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=n._updateID,this._uvUpdateId=t._updateID,n.multiplyUvs(r,s))),s}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class oe{destroy(){}}class Me{constructor(e,t){this.localUniforms=new R({uTransformMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new he({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,s=e.batched;if(t.batched=s,r!==s)return!0;if(s){const n=e._geometry;if(n.indices.length!==t.indexSize||n.positions.length!==t.vertexSize)return t.indexSize=n.indices.length,t.vertexSize=n.positions.length,!0;const i=this._getBatchableMesh(e);return i.texture.uid!==e._texture.uid&&(i._textureMatrixUpdateId=-1),!i._batcher.checkAndUpdateTexture(i,e._texture)}return!1}addRenderable(e,t){var n,i;const r=this.renderer.renderPipes.batch,s=this._getMeshData(e);if(e.didViewUpdate&&(s.indexSize=(n=e._geometry.indices)==null?void 0:n.length,s.vertexSize=(i=e._geometry.positions)==null?void 0:i.length),s.batched){const o=this._getBatchableMesh(e);o.setTexture(e._texture),o.geometry=e._geometry,r.addToBatch(o,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=Q(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),I(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new oe),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new oe),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new ee;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Me.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"mesh"};class mt{execute(e,t){const r=e.state,s=e.renderer,n=t.shader||e.defaultShader;n.resources.uTexture=t.texture._source,n.resources.uniforms=e.localUniforms;const i=s.gl,o=e.getBuffers(t);s.shader.bind(n),s.state.set(r),s.geometry.bind(o.geometry,n.glProgram);const l=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?i.UNSIGNED_SHORT:i.UNSIGNED_INT;i.drawElements(i.TRIANGLES,t.particleChildren.length*6,l,0)}}class gt{execute(e,t){const r=e.renderer,s=t.shader||e.defaultShader;s.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),s.groups[1]=r.texture.getTextureBindGroup(t.texture);const n=e.state,i=e.getBuffers(t);r.encoder.draw({geometry:i.geometry,shader:t.shader||e.defaultShader,state:n,size:t.particleChildren.length*6})}}function ue(a,e=null){const t=a*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,s=0;r<t;r+=6,s+=4)e[r+0]=s+0,e[r+1]=s+1,e[r+2]=s+2,e[r+3]=s+0,e[r+4]=s+2,e[r+5]=s+3;return e}function xt(a){return{dynamicUpdate:le(a,!0),staticUpdate:le(a,!1)}}function le(a,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const n in a){const i=a[n];if(e!==i.dynamic)continue;t.push(`offset = index + ${r}`),t.push(i.code);const o=X(i.format);r+=o.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const s=t.join(`
`);return new Function("ps","f32v","u32v",s)}class _t{constructor(e){var h;this._size=0,this._generateParticleUpdateCache={};const t=this._size=(h=e.size)!=null?h:1e3,r=e.properties;let s=0,n=0;for(const d in r){const c=r[d],f=X(c.format);c.dynamic?n+=f.stride:s+=f.stride}this._dynamicStride=n/4,this._staticStride=s/4,this.staticAttributeBuffer=new A(t*4*s),this.dynamicAttributeBuffer=new A(t*4*n),this.indexBuffer=ue(t);const i=new j;let o=0,u=0;this._staticBuffer=new G({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:v.VERTEX|v.COPY_DST}),this._dynamicBuffer=new G({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:v.VERTEX|v.COPY_DST});for(const d in r){const c=r[d],f=X(c.format);c.dynamic?(i.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:c.format}),o+=f.size):(i.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:u*4,format:c.format}),u+=f.size)}i.addIndex(this.indexBuffer);const l=this.getParticleUpdate(r);this._dynamicUpload=l.dynamicUpdate,this._staticUpload=l.staticUpdate,this.geometry=i}getParticleUpdate(e){const t=yt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return xt(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new A(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new A(this._size*this._dynamicStride*4*4),this.indexBuffer=ue(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const s=this.staticAttributeBuffer;this._staticUpload(e,s.float32View,s.uint32View),this._staticBuffer.setDataWithSize(s.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function yt(a){const e=[];for(const t in a){const r=a[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var bt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,Tt=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,ce=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class vt extends J{constructor(){const e=Ne.from({vertex:Tt,fragment:bt}),t=je.from({fragment:{source:ce,entryPoint:"mainFragment"},vertex:{source:ce,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:S.WHITE.source,uSampler:new H({}),uniforms:{uTranslationMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new qe(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class Ge{constructor(e,t){this.state=E.for2d(),this.localUniforms=new R({uTranslationMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new vt,this.state=E.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new _t({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,s=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const n=this.state;s.update(t,e._childrenDirty),e._childrenDirty=!1,n.blendMode=Q(e.blendMode,e.texture._source);const i=this.localUniforms.uniforms,o=i.uTranslationMatrix;e.worldTransform.copyTo(o),o.prepend(r.globalUniforms.globalUniformData.projectionMatrix),i.uResolution=r.globalUniforms.globalUniformData.resolution,i.uRound=r._roundPixels|e._roundPixels,I(e.groupColorAlpha,i.uColor,0),this.adaptor.execute(this,e)}destroy(){this.renderer=null,this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class De extends Ge{constructor(e){super(e,new mt)}}De.extension={type:[p.WebGLPipes],name:"particle"};class Ae extends Ge{constructor(e){super(e,new gt)}}Ae.extension={type:[p.WebGPUPipes],name:"particle"};const ze=class ke extends pt{constructor(e={}){e={...ke.defaultOptions,...e},super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){var t,r,s,n,i,o,u,l,h,d;this.width=(t=e.width)!=null?t:this.width,this.height=(r=e.height)!=null?r:this.height,this._originalWidth=(s=e.originalWidth)!=null?s:this._originalWidth,this._originalHeight=(n=e.originalHeight)!=null?n:this._originalHeight,this._leftWidth=(i=e.leftWidth)!=null?i:this._leftWidth,this._rightWidth=(o=e.rightWidth)!=null?o:this._rightWidth,this._topHeight=(u=e.topHeight)!=null?u:this._topHeight,this._bottomHeight=(l=e.bottomHeight)!=null?l:this._bottomHeight,this._anchorX=(h=e.anchor)==null?void 0:h.x,this._anchorY=(d=e.anchor)==null?void 0:d.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:t,height:r,_leftWidth:s,_rightWidth:n,_topHeight:i,_bottomHeight:o,_anchorX:u,_anchorY:l}=this,h=s+n,d=t>h?1:t/h,c=i+o,f=r>c?1:r/c,_=Math.min(d,f),m=u*t,g=l*r;e[0]=e[8]=e[16]=e[24]=-m,e[2]=e[10]=e[18]=e[26]=s*_-m,e[4]=e[12]=e[20]=e[28]=t-n*_-m,e[6]=e[14]=e[22]=e[30]=t-m,e[1]=e[3]=e[5]=e[7]=-g,e[9]=e[11]=e[13]=e[15]=i*_-g,e[17]=e[19]=e[21]=e[23]=r-o*_-g,e[25]=e[27]=e[29]=e[31]=r-g,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const t=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};ze.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};let wt=ze;class Ct extends ee{constructor(){super(),this.geometry=new wt}destroy(){this.geometry.destroy()}}class Oe{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new Ct,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}Oe.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"nineSliceSprite"};const Pt={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},St={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let U,B;class Rt extends J{constructor(){U!=null||(U=me({name:"tiling-sprite-shader",bits:[ot,Pt,ge]})),B!=null||(B=xe({name:"tiling-sprite-shader",bits:[ut,St,_e]}));const e=new R({uMapCoord:{value:new w,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new w,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:B,gpuProgram:U,resources:{localUniforms:new R({uTransformMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:S.EMPTY.source,uSampler:S.EMPTY.source.style}})}updateUniforms(e,t,r,s,n,i){const o=this.resources.tilingUniforms,u=i.width,l=i.height,h=i.textureMatrix,d=o.uniforms.uTextureTransform;d.set(r.a*u/e,r.b*u/t,r.c*l/e,r.d*l/t,r.tx/e,r.ty/t),d.invert(),o.uniforms.uMapCoord=h.mapCoord,o.uniforms.uClampFrame=h.uClampFrame,o.uniforms.uClampOffset=h.uClampOffset,o.uniforms.uTextureTransform=d,o.uniforms.uSizeAnchor[0]=e,o.uniforms.uSizeAnchor[1]=t,o.uniforms.uSizeAnchor[2]=s,o.uniforms.uSizeAnchor[3]=n,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class Ut extends Z{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Bt(a,e){const t=a.anchor.x,r=a.anchor.y;e[0]=-t*a.width,e[1]=-r*a.height,e[2]=(1-t)*a.width,e[3]=-r*a.height,e[4]=(1-t)*a.width,e[5]=(1-r)*a.height,e[6]=-t*a.width,e[7]=(1-r)*a.height}function Ft(a,e,t,r){let s=0;const n=a.length/e,i=r.a,o=r.b,u=r.c,l=r.d,h=r.tx,d=r.ty;for(t*=e;s<n;){const c=a[t],f=a[t+1];a[t]=i*c+u*f+h,a[t+1]=o*c+l*f+d,t+=e,s++}}function Mt(a,e){const t=a.texture,r=t.frame.width,s=t.frame.height;let n=0,i=0;a.applyAnchorToTexture&&(n=a.anchor.x,i=a.anchor.y),e[0]=e[6]=-n,e[2]=e[4]=1-n,e[1]=e[3]=-i,e[5]=e[7]=1-i;const o=w.shared;o.copyFrom(a._tileTransform.matrix),o.tx/=a.width,o.ty/=a.height,o.invert(),o.scale(a.width/r,a.height/s),Ft(e,2,0,o)}const z=new Ut;class Gt{constructor(){this.canBatch=!0,this.geometry=new Z({indices:z.indices.slice(),positions:z.positions.slice(),uvs:z.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class Ee{constructor(e){this._state=E.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const s=t.canBatch;if(s&&s===r){const{batchableMesh:n}=t;return!n._batcher.checkAndUpdateTexture(n,e.texture)}return r!==s}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const s=this._getTilingSpriteData(e),{geometry:n,canBatch:i}=s;if(i){s.batchableMesh||(s.batchableMesh=new ee);const o=s.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),o.geometry=n,o.renderable=e,o.transform=e.groupTransform,o.setTexture(e._texture)),o.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(o,t)}else r.break(t),s.shader||(s.shader=new Rt),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,I(e.groupColorAlpha,r.uColor,0),this._state.blendMode=Q(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:z,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:s}=t;e.didViewUpdate&&this._updateBatchableMesh(e),s._batcher.updateElement(s)}else if(e.didViewUpdate){const{shader:s}=t;s.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new Gt;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,s=e.texture.source.style;s.addressMode!=="repeat"&&(s.addressMode="repeat",s.update()),Mt(e,r.uvs),Bt(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let s=!0;return this._renderer.type===q.WEBGL&&(s=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(s||r.source.isPowerOfTwo),t.canBatch}}Ee.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"tilingSprite"};const Dt={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},At={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},zt={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},kt={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let F,M;class Ot extends J{constructor(e){const t=new R({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new w,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});F!=null||(F=me({name:"sdf-shader",bits:[$e,Qe(e),Dt,zt,ge]})),M!=null||(M=xe({name:"sdf-shader",bits:[Je,Ze(e),At,kt,_e]})),super({glProgram:M,gpuProgram:F,resources:{localUniforms:t,batchSamplers:et(e)}})}}class Et extends it{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class Ie{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);de(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);de(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,s=tt.getFont(e.text,e._style);r.clear(),s.distanceField.type!=="none"&&(r.customShader||(r.customShader=new Ot(this._renderer.limits.maxBatchableTextures)));const n=rt.graphemeSegmenter(e.text),i=e._style;let o=s.baseLineOffset;const u=st(n,i,s,!0),l=i.padding,h=u.scale;let d=u.width,c=u.height+u.offsetY;i._stroke&&(d+=i._stroke.width/h,c+=i._stroke.width/h),r.translate(-e._anchor._x*d-l,-e._anchor._y*c-l).scale(h,h);const f=s.applyFillAsTint?i._fill.color:16777215;let _=s.fontMetrics.fontSize,m=s.lineHeight;i.lineHeight&&(_=i.fontSize/h,m=i.lineHeight/h);let g=(m-_)/2;g-s.baseLineOffset<0&&(g=0);for(let x=0;x<u.lines.length;x++){const y=u.lines[x];for(let C=0;C<y.charPositions.length;C++){const D=y.chars[C],P=s.chars[D];if(P!=null&&P.texture){const V=P.texture;r.texture(V,f||"black",Math.round(y.charPositions[C]+P.xOffset),Math.round(o+P.yOffset+g),V.orig.width,V.orig.height)}}o+=m}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Et;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,s=K.get(`${r}-bitmap`),{a:n,b:i,c:o,d:u}=e.groupTransform,l=Math.sqrt(n*n+i*i),h=Math.sqrt(o*o+u*u),d=(Math.abs(l)+Math.abs(h))/2,c=s.baseRenderedFontSize/e._style.fontSize,f=d*s.distanceField.range*(1/c);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}Ie.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"bitmapText"};function de(a,e){e.groupTransform=a.groupTransform,e.groupColorAlpha=a.groupColorAlpha,e.groupColor=a.groupColor,e.groupBlendMode=a.groupBlendMode,e.globalDisplayStatus=a.globalDisplayStatus,e.groupTransform=a.groupTransform,e.localDisplayStatus=a.localDisplayStatus,e.groupAlpha=a.groupAlpha,e._roundPixels=a._roundPixels}class It extends be{constructor(e){super(),this.generatingTexture=!1,this.currentKey="--",this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{htmlText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexturePromise(this.texturePromise):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this.texturePromise=null,this._renderer=null}}function N(a,e){const{texture:t,bounds:r}=a,s=e._style._getFinalPadding();nt(r,e._anchor,t);const n=e._anchor._x*s*2,i=e._anchor._y*s*2;r.minX-=s-n,r.minY-=s-i,r.maxX-=s-n,r.maxY-=s-i}class Ve{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const s=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==s)&&this._updateGpuText(e).catch(n=>{console.error(n)}),e._didTextUpdate=!1,N(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let s=this._renderer.htmlText.getTexturePromise(e);r&&(s=s.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(r)})),t.texturePromise=s,t.currentKey=e.styleKey,t.texture=await s;const n=e.renderGroup||e.parentRenderGroup;n&&(n.structureDidChange=!0),t.generatingTexture=!1,N(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new It(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=S.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Ve.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"htmlText"};function Vt(){const{userAgent:a}=$.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(a)}const Wt=new fe;function We(a,e,t,r){const s=Wt;s.minX=0,s.minY=0,s.maxX=a.width/r|0,s.maxY=a.height/r|0;const n=T.getOptimalTexture(s.width,s.height,r,!1);return n.source.uploadMethodId="image",n.source.resource=a,n.source.alphaMode="premultiply-alpha-on-upload",n.frame.width=e/r,n.frame.height=t/r,n.source.emit("update",n.source),n.updateUvs(),n}function Yt(a,e){const t=e.fontFamily,r=[],s={},n=/font-family:([^;"\s]+)/g,i=a.match(n);function o(u){s[u]||(r.push(u),s[u]=!0)}if(Array.isArray(t))for(let u=0;u<t.length;u++)o(t[u]);else o(t);i&&i.forEach(u=>{const l=u.split(":")[1].trim();o(l)});for(const u in e.tagStyles){const l=e.tagStyles[u].fontFamily;o(l)}return r}async function Lt(a){const t=await(await $.get().fetch(a)).blob(),r=new FileReader;return await new Promise((n,i)=>{r.onloadend=()=>n(r.result),r.onerror=i,r.readAsDataURL(t)})}async function Xt(a,e){const t=await Lt(e);return`@font-face {
        font-family: "${a.fontFamily}";
        font-weight: ${a.fontWeight};
        font-style: ${a.fontStyle};
        src: url('${t}');
    }`}const Y=new Map;async function Ht(a){const e=a.filter(t=>K.has(`${t}-and-url`)).map(t=>{if(!Y.has(t)){const{entries:r}=K.get(`${t}-and-url`),s=[];r.forEach(n=>{const i=n.url,u=n.faces.map(l=>({weight:l.weight,style:l.style}));s.push(...u.map(l=>Xt({fontWeight:l.weight,fontStyle:l.style,fontFamily:t},i)))}),Y.set(t,Promise.all(s).then(n=>n.join(`
`)))}return Y.get(t)});return(await Promise.all(e)).join(`
`)}function Kt(a,e,t,r,s){const{domElement:n,styleElement:i,svgRoot:o}=s;n.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${a}</div>`,n.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),i.textContent=r;const{width:u,height:l}=s.image;return o.setAttribute("width",u.toString()),o.setAttribute("height",l.toString()),new XMLSerializer().serializeToString(o)}function Nt(a,e){const t=ye.getOptimalCanvasAndContext(a.width,a.height,e),{context:r}=t;return r.clearRect(0,0,a.width,a.height),r.drawImage(a,0,0),t}function jt(a,e,t){return new Promise(async r=>{t&&await new Promise(s=>setTimeout(s,100)),a.onload=()=>{r()},a.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,a.crossOrigin="anonymous"})}class Ye{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===q.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;const r=this._buildTexturePromise(e).then(s=>(this._activeTextures[t].texture=s,s));return this._activeTextures[t]={texture:null,promise:r,usageCount:1},r}getReferenceCount(e){var t,r;return(r=(t=this._activeTextures[e])==null?void 0:t.usageCount)!=null?r:null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t.texture):t.promise.then(r=>{t.texture=r,this._cleanUp(t.texture)}).catch(()=>{L("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:s,textureStyle:n}=e,i=O.get(Re),o=Yt(t,r),u=await Ht(o),l=ht(t,r,u,i),h=Math.ceil(Math.ceil(Math.max(1,l.width)+r.padding*2)*s),d=Math.ceil(Math.ceil(Math.max(1,l.height)+r.padding*2)*s),c=i.image,f=2;c.width=(h|0)+f,c.height=(d|0)+f;const _=Kt(t,r,s,u,i);await jt(c,_,Vt()&&o.length>0);const m=c;let g;this._createCanvas&&(g=Nt(c,s));const x=We(g?g.canvas:m,c.width-f,c.height-f,s);return n&&(x.source.style=n),this._createCanvas&&(this._renderer.texture.initSource(x.source),ye.returnCanvasAndContext(g)),O.return(i),x}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{L("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){T.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}}Ye.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"htmlText"};class qt extends be{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{canvasText:e}=this._renderer;e.getReferenceCount(this.currentKey)>0?e.decreaseReferenceCount(this.currentKey):this.texture&&e.returnTexture(this.texture),this._renderer.runners.resolutionChange.remove(this),this._renderer=null}}class Le{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r?!0:e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const s=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==s)&&this._updateGpuText(e),e._didTextUpdate=!1}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey,N(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new qt(this._renderer);return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Le.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"text"};class Xe{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,r,s){var c;typeof e=="string"&&(k("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof re||(e.style=new re(e.style)),e.textureStyle instanceof H||(e.textureStyle=new H(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:n,style:i,textureStyle:o}=e,u=(c=e.resolution)!=null?c:this._renderer.resolution,{frame:l,canvasAndContext:h}=W.getCanvasAndContext({text:n,style:i,resolution:u}),d=We(h.canvas,l.width,l.height,u);if(o&&(d.source.style=o),i.trim&&(l.pad(i.padding),d.frame.copyFrom(l),d.frame.scale(1/u),d.updateUvs()),i.filters){const f=this._applyFilters(d,i.filters);return this.returnTexture(d),W.returnCanvasAndContext(h),f}return this._renderer.texture.initSource(d._source),W.returnCanvasAndContext(h),d}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",T.returnTexture(e,!0)}renderTextToCanvas(){k("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const r=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:r,usageCount:1},r}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){var t,r;return(r=(t=this._activeTextures[e])==null?void 0:t.usageCount)!=null?r:0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,s=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),s}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}Xe.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"canvasText"};b.add(Te);b.add(ve);b.add(Ue);b.add(at);b.add(Me);b.add(De);b.add(Ae);b.add(Xe);b.add(Le);b.add(Ie);b.add(Ye);b.add(Ve);b.add(Ee);b.add(Oe);b.add(Ce);b.add(we);
