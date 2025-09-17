import{q as ze,G as ie,t as oe,u as We,k as le,M as v,v as ue,E as u,e as O,x as S,y as Ve,z as F,F as b,R as L,H as de,I as Ne,s as m,S as p,h as B,w as H,J as X,K as je,b as Q,B as k,i as U,L as $e,N as M,j as T,O as w,Q as qe,a as Ke,V as ce,W as he,X as fe,Y as pe,C as P,Z as Ye,_ as A,$ as Z,D as z,a0 as Je,P as Xe,c as Qe,T as ee,a1 as te,a2 as Ze,a3 as et,a4 as tt}from"./index-BrUy3-_x.js";import{S as me,B as ve,c as rt}from"./colorToUniform-DmtBy-2V.js";const ge=class I extends ze{constructor(e){e={...I.defaultOptions,...e},super(e),this.enabled=!0,this._state=me.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,t,r,s){e.applyFilter(this,t,r,s)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:t,gl:r,...s}=e;let a,i;return t&&(a=ie.from(t)),r&&(i=oe.from(r)),new I({gpuProgram:a,glProgram:i,...s})}};ge.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let st=ge;var at=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;

uniform float uAlpha;
uniform vec4 uMaskClamp;
uniform float uInverse;

out vec4 finalColor;

void main(void)
{
    float clip = step(3.5,
        step(uMaskClamp.x, vMaskCoord.x) +
        step(uMaskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, uMaskClamp.z) +
        step(vMaskCoord.y, uMaskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = uAlpha;
    vec4 original = texture(uTexture, vTextureCoord);
    vec4 masky = texture(uMaskTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    float a = alphaMul * masky.r * npmAlpha * clip;

    if (uInverse == 1.0) {
        a = 1.0 - a;
    }

    finalColor = original * a;
}
`,nt=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
uniform mat3 uFilterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
       
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`,re=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct MaskUniforms {
  uFilterMatrix:mat3x3<f32>,
  uMaskClamp:vec4<f32>,
  uAlpha:f32,
  uInverse:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.uMaskClamp;
    var uAlpha = filterUniforms.uAlpha;

    var clip = step(3.5,
      step(maskClamp.x, filterUv.x) +
      step(maskClamp.y, filterUv.y) +
      step(filterUv.x, maskClamp.z) +
      step(filterUv.y, maskClamp.w));

    var mask = textureSample(uMaskTexture, uSampler, filterUv);
    var source = textureSample(uTexture, uSampler, uv);
    var alphaMul = 1.0 - uAlpha * (1.0 - mask.a);

    var a: f32 = alphaMul * mask.r * uAlpha * clip;

    if (filterUniforms.uInverse == 1.0) {
        a = 1.0 - a;
    }

    return source * a;
}
`;class it extends st{constructor(e){const{sprite:t,...r}=e,s=new We(t.texture),a=new le({uFilterMatrix:{value:new v,type:"mat3x3<f32>"},uMaskClamp:{value:s.uClampFrame,type:"vec4<f32>"},uAlpha:{value:1,type:"f32"},uInverse:{value:e.inverse?1:0,type:"f32"}}),i=ie.from({vertex:{source:re,entryPoint:"mainVertex"},fragment:{source:re,entryPoint:"mainFragment"}}),l=oe.from({vertex:nt,fragment:at,name:"mask-filter"});super({...r,gpuProgram:i,glProgram:l,clipToViewport:!1,resources:{filterUniforms:a,uMaskTexture:t.texture.source}}),this.sprite=t,this._textureMatrix=s}set inverse(e){this.resources.filterUniforms.uniforms.uInverse=e?1:0}get inverse(){return this.resources.filterUniforms.uniforms.uInverse===1}apply(e,t,r,s){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.uFilterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.uMaskTexture=this.sprite.texture.source,e.applyFilter(this,t,r,s)}}const W=class xe{constructor(e,t){var r,s;this.state=me.for2d(),this._batchersByInstructionSet=Object.create(null),this._activeBatches=Object.create(null),this.renderer=e,this._adaptor=t,(s=(r=this._adaptor).init)==null||s.call(r,this)}static getBatcher(e){return new this._availableBatchers[e]}buildStart(e){let t=this._batchersByInstructionSet[e.uid];t||(t=this._batchersByInstructionSet[e.uid]=Object.create(null),t.default||(t.default=new ue({maxTextures:this.renderer.limits.maxBatchableTextures}))),this._activeBatches=t,this._activeBatch=this._activeBatches.default;for(const r in this._activeBatches)this._activeBatches[r].begin()}addToBatch(e,t){if(this._activeBatch.name!==e.batcherName){this._activeBatch.break(t);let r=this._activeBatches[e.batcherName];r||(r=this._activeBatches[e.batcherName]=xe.getBatcher(e.batcherName),r.begin()),this._activeBatch=r}this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){this._activeBatch.break(e);const t=this._activeBatches;for(const r in t){const s=t[r],a=s.geometry;a.indexBuffer.setDataWithSize(s.indexBuffer,s.indexSize,!0),a.buffers[0].setDataWithSize(s.attributeBuffer.float32View,s.attributeSize,!1)}}upload(e){const t=this._batchersByInstructionSet[e.uid];for(const r in t){const s=t[r],a=s.geometry;s.dirty&&(s.dirty=!1,a.buffers[0].update(s.attributeSize*4))}}execute(e){if(e.action==="startBatch"){const t=e.batcher,r=t.geometry,s=t.shader;this._adaptor.start(this,r,s)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor=null;for(const e in this._activeBatches)this._activeBatches[e].destroy();this._activeBatches=null}};W.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"batch"};W._availableBatchers=Object.create(null);let _e=W;O.handleByMap(u.Batcher,_e._availableBatchers);O.add(ue);const It={name:"texture-bit",vertex:{header:`

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `,main:`
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;


        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},Gt={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;


        `,main:`
            outColor = texture(uTexture, vUV);
        `}},ot=new F;class lt extends de{constructor(){super(),this.filters=[new it({sprite:new Ne(m.EMPTY),inverse:!1,resolution:"inherit",antialias:"inherit"})]}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}get inverse(){return this.filters[0].inverse}set inverse(e){this.filters[0].inverse=e}}class be{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,r){const s=this._renderer;if(s.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskBegin",mask:e,inverse:t._maskOptions.inverse,canBundle:!1,maskedContainer:t}),e.inverse=t._maskOptions.inverse,e.renderMaskToTexture){const a=e.mask;a.includeInBuild=!0,a.collectRenderables(r,s,null),a.includeInBuild=!1}s.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,inverse:t._maskOptions.inverse,canBundle:!1})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"alphaMask",action:"popMaskEnd",mask:e,inverse:t._maskOptions.inverse,canBundle:!1})}execute(e){const t=this._renderer,r=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const s=S.get(lt);if(s.inverse=e.inverse,r){e.mask.mask.measurable=!0;const a=Ve(e.mask.mask,!0,ot);e.mask.mask.measurable=!1,a.ceil();const i=t.renderTarget.renderTarget.colorTexture.source,l=b.getOptimalTexture(a.width,a.height,i._resolution,i.antialias);t.renderTarget.push(l,!0),t.globalUniforms.push({offset:a,worldColor:4294967295});const o=s.sprite;o.texture=l,o.worldTransform.tx=a.minX,o.worldTransform.ty=a.minY,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer,filterTexture:l})}else s.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:s,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const s=this._activeMaskStage[this._activeMaskStage.length-1];r&&(t.type===L.WEBGL&&t.renderTarget.finishRenderPass(),t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({renderPipeId:"filter",action:"pushFilter",container:s.maskedContainer,filterEffect:s.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const s=this._activeMaskStage.pop();r&&b.returnTexture(s.filterTexture),S.return(s.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}be.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"alphaMask"};class Te{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,r){this._renderer.renderPipes.batch.break(r);const a=this._colorStack;a[this._colorStackIndex]=a[this._colorStackIndex-1]&e.mask;const i=this._colorStack[this._colorStackIndex];i!==this._currentColor&&(this._currentColor=i,r.add({renderPipeId:"colorMask",colorMask:i,canBundle:!1})),this._colorStackIndex++}pop(e,t,r){this._renderer.renderPipes.batch.break(r);const a=this._colorStack;this._colorStackIndex--;const i=a[this._colorStackIndex-1];i!==this._currentColor&&(this._currentColor=i,r.add({renderPipeId:"colorMask",colorMask:i,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._renderer=null,this._colorStack=null}}Te.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"colorMask"};class ye{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,r){var h;var s;const a=e,i=this._renderer;i.renderPipes.batch.break(r),i.renderPipes.blendMode.setBlendMode(a.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"pushMaskBegin",mask:e,inverse:t._maskOptions.inverse,canBundle:!1});const l=a.mask;l.includeInBuild=!0,this._maskHash.has(a)||this._maskHash.set(a,{instructionsStart:0,instructionsLength:0});const o=this._maskHash.get(a);o.instructionsStart=r.instructionSize,l.collectRenderables(r,i,null),l.includeInBuild=!1,i.renderPipes.batch.break(r),r.add({renderPipeId:"stencilMask",action:"pushMaskEnd",mask:e,inverse:t._maskOptions.inverse,canBundle:!1});const d=r.instructionSize-o.instructionsStart-1;o.instructionsLength=d;const c=i.renderTarget.renderTarget.uid;(h=(s=this._maskStackHash)[c])!=null||(s[c]=0)}pop(e,t,r){const s=e,a=this._renderer;a.renderPipes.batch.break(r),a.renderPipes.blendMode.setBlendMode(s.mask,"none",r),r.add({renderPipeId:"stencilMask",action:"popMaskBegin",inverse:t._maskOptions.inverse,canBundle:!1});const i=this._maskHash.get(e);for(let l=0;l<i.instructionsLength;l++)r.instructions[r.instructionSize++]=r.instructions[i.instructionsStart++];r.add({renderPipeId:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var i;var t;const r=this._renderer,s=r.renderTarget.renderTarget.uid;let a=(i=(t=this._maskStackHash)[s])!=null?i:t[s]=0;e.action==="pushMaskBegin"?(r.renderTarget.ensureDepthStencil(),r.stencil.setStencilMode(p.RENDERING_MASK_ADD,a),a++,r.colorMask.setMask(0)):e.action==="pushMaskEnd"?(e.inverse?r.stencil.setStencilMode(p.INVERSE_MASK_ACTIVE,a):r.stencil.setStencilMode(p.MASK_ACTIVE,a),r.colorMask.setMask(15)):e.action==="popMaskBegin"?(r.colorMask.setMask(0),a!==0?r.stencil.setStencilMode(p.RENDERING_MASK_REMOVE,a):(r.renderTarget.clear(null,B.STENCIL),r.stencil.setStencilMode(p.DISABLED,a)),a--):e.action==="popMaskEnd"&&(e.inverse?r.stencil.setStencilMode(p.INVERSE_MASK_ACTIVE,a):r.stencil.setStencilMode(p.MASK_ACTIVE,a),r.colorMask.setMask(15)),this._maskStackHash[s]=a}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}ye.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"stencilMask"};function Et(n,e){var t,r,s;for(const a in n.attributes){const i=n.attributes[a],l=e[a];l?((t=i.format)!=null||(i.format=l.format),(r=i.offset)!=null||(i.offset=l.offset),(s=i.instance)!=null||(i.instance=l.instance)):H(`Attribute ${a} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}ut(n)}function ut(n){var a,i;const{buffers:e,attributes:t}=n,r={},s={};for(const l in e){const o=e[l];r[o.uid]=0,s[o.uid]=0}for(const l in t){const o=t[l];r[o.buffer.uid]+=X(o.format).stride}for(const l in t){const o=t[l];(a=o.stride)!=null||(o.stride=r[o.buffer.uid]),(i=o.start)!=null||(o.start=s[o.buffer.uid]),s[o.buffer.uid]+=X(o.format).stride}}const _=[];_[p.NONE]=void 0;_[p.DISABLED]={stencilWriteMask:0,stencilReadMask:0};_[p.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}};_[p.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}};_[p.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}};_[p.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"not-equal",passOp:"keep"},stencilBack:{compare:"not-equal",passOp:"keep"}};class Dt{constructor(e){this._syncFunctionHash=Object.create(null),this._adaptor=e,this._systemCheck()}_systemCheck(){if(!je())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(e){const t=this.getUniformGroupData(e);e.buffer||(e.buffer=new Q({data:new Float32Array(t.layout.size/4),usage:k.UNIFORM|k.COPY_DST}))}getUniformGroupData(e){return this._syncFunctionHash[e._signature]||this._initUniformGroup(e)}_initUniformGroup(e){const t=e._signature;let r=this._syncFunctionHash[t];if(!r){const s=Object.keys(e.uniformStructures).map(l=>e.uniformStructures[l]),a=this._adaptor.createUboElements(s),i=this._generateUboSync(a.uboElements);r=this._syncFunctionHash[t]={layout:a,syncFunction:i}}return this._syncFunctionHash[t]}_generateUboSync(e){return this._adaptor.generateUboSync(e)}syncUniformGroup(e,t,r){const s=this.getUniformGroupData(e);e.buffer||(e.buffer=new Q({data:new Float32Array(s.layout.size/4),usage:k.UNIFORM|k.COPY_DST}));let a=null;return t||(t=e.buffer.data,a=e.buffer.dataInt32),r||(r=0),s.syncFunction(e.uniforms,t,a,r),!0}updateUniformGroup(e){if(e.isStatic&&!e._dirtyId)return!1;e._dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}}const C=[{type:"mat3x3<f32>",test:n=>n.value.a!==void 0,ubo:`
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,uniform:`
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `},{type:"vec4<f32>",test:n=>n.type==="vec4<f32>"&&n.size===1&&n.value.width!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `},{type:"vec2<f32>",test:n=>n.type==="vec2<f32>"&&n.size===1&&n.value.x!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `},{type:"vec4<f32>",test:n=>n.type==="vec4<f32>"&&n.size===1&&n.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `},{type:"vec3<f32>",test:n=>n.type==="vec3<f32>"&&n.size===1&&n.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `}];function Ot(n,e,t,r){const s=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `];let a=0;for(let l=0;l<n.length;l++){const o=n[l],d=o.data.name;let c=!1,h=0;for(let f=0;f<C.length;f++)if(C[f].test(o.data)){h=o.offset/4,s.push(`name = "${d}";`,`offset += ${h-a};`,C[f][e]||C[f].ubo),c=!0;break}if(!c)if(o.data.size>1)h=o.offset/4,s.push(t(o,h-a));else{const f=r[o.data.type];h=o.offset/4,s.push(`
                    v = uv.${d};
                    offset += ${h-a};
                    ${f};
                `)}a=h}const i=s.join(`
`);return new Function("uv","data","dataInt32","offset",i)}function g(n,e){return`
        for (let i = 0; i < ${n*e}; i++) {
            data[offset + (((i / ${n})|0) * 4) + (i % ${n})] = v[i];
        }
    `}const dt={f32:`
        data[offset] = v;`,i32:`
        dataInt32[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"vec2<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,"vec3<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,"vec4<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];
        dataInt32[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":g(3,2),"mat4x2<f32>":g(4,2),"mat2x3<f32>":g(2,3),"mat4x3<f32>":g(4,3),"mat2x4<f32>":g(2,4),"mat3x4<f32>":g(3,4)},Ft={...dt,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};function ct(n,e,t,r,s,a){const i=a?1:-1;return n.identity(),n.a=1/r*2,n.d=i*(1/s*2),n.tx=-1-e*n.a,n.ty=-i-t*n.d,n}const x=new Map;$e.register(x);function ke(n,e){if(!x.has(n)){const t=new m({source:new U({resource:n,...e})}),r=()=>{x.get(n)===t&&x.delete(n)};t.once("destroy",r),t.source.once("destroy",r),x.set(n,t)}return x.get(n)}function ht(n){const e=n.colorTexture.source.resource;return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement&&document.body.contains(e)}const Ce=class Me{constructor(e={}){if(this.uid=M("renderTarget"),this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._size=new Float32Array(2),this._managedColorTextures=!1,e={...Me.defaultOptions,...e},this.stencil=e.stencil,this.depth=e.depth,this.isRoot=e.isRoot,typeof e.colorTextures=="number"){this._managedColorTextures=!0;for(let t=0;t<e.colorTextures;t++)this.colorTextures.push(new T({width:e.width,height:e.height,resolution:e.resolution,antialias:e.antialias}))}else{this.colorTextures=[...e.colorTextures.map(r=>r.source)];const t=this.colorTexture.source;this.resize(t.width,t.height,t._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),(e.depthStencilTexture||this.stencil)&&(e.depthStencilTexture instanceof m||e.depthStencilTexture instanceof T?this.depthStencilTexture=e.depthStencilTexture.source:this.ensureDepthStencilTexture())}get size(){const e=this._size;return e[0]=this.pixelWidth,e[1]=this.pixelHeight,e}get width(){return this.colorTexture.source.width}get height(){return this.colorTexture.source.height}get pixelWidth(){return this.colorTexture.source.pixelWidth}get pixelHeight(){return this.colorTexture.source.pixelHeight}get resolution(){return this.colorTexture.source._resolution}get colorTexture(){return this.colorTextures[0]}onSourceResize(e){this.resize(e.width,e.height,e._resolution,!0)}ensureDepthStencilTexture(){this.depthStencilTexture||(this.depthStencilTexture=new T({width:this.width,height:this.height,resolution:this.resolution,format:"depth24plus-stencil8",autoGenerateMipmaps:!1,antialias:!1,mipLevelCount:1}))}resize(e,t,r=this.resolution,s=!1){this.dirtyId++,this.colorTextures.forEach((a,i)=>{s&&i===0||a.source.resize(e,t,r)}),this.depthStencilTexture&&this.depthStencilTexture.source.resize(e,t,r)}destroy(){this.colorTexture.source.off("resize",this.onSourceResize,this),this._managedColorTextures&&this.colorTextures.forEach(e=>{e.destroy()}),this.depthStencilTexture&&(this.depthStencilTexture.destroy(),delete this.depthStencilTexture)}};Ce.defaultOptions={width:0,height:0,resolution:1,colorTextures:1,stencil:!1,depth:!1,antialias:!1,isRoot:!1};let G=Ce;class Lt{constructor(e){this.rootViewPort=new w,this.viewport=new w,this.onRenderTargetChange=new qe("onRenderTargetChange"),this.projectionMatrix=new v,this.defaultClearColor=[0,0,0,0],this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e,e.renderableGC.addManagedHash(this,"_gpuRenderTargetHash")}finishRenderPass(){this.adaptor.finishRenderPass(this.renderTarget)}renderStart({target:e,clear:t,clearColor:r,frame:s}){var a,i;this._renderTargetStack.length=0,this.push(e,t,r,s),this.rootViewPort.copyFrom(this.viewport),this.rootRenderTarget=this.renderTarget,this.renderingToScreen=ht(this.rootRenderTarget),(i=(a=this.adaptor).prerender)==null||i.call(a,this.rootRenderTarget)}postrender(){var e,t;(t=(e=this.adaptor).postrender)==null||t.call(e,this.rootRenderTarget)}bind(e,t=!0,r,s){const a=this.getRenderTarget(e),i=this.renderTarget!==a;this.renderTarget=a,this.renderSurface=e;const l=this.getGpuRenderTarget(a);(a.pixelWidth!==l.width||a.pixelHeight!==l.height)&&(this.adaptor.resizeGpuRenderTarget(a),l.width=a.pixelWidth,l.height=a.pixelHeight);const o=a.colorTexture,d=this.viewport,c=o.pixelWidth,h=o.pixelHeight;if(!s&&e instanceof m&&(s=e.frame),s){const f=o._resolution;d.x=s.x*f+.5|0,d.y=s.y*f+.5|0,d.width=s.width*f+.5|0,d.height=s.height*f+.5|0}else d.x=0,d.y=0,d.width=c,d.height=h;return ct(this.projectionMatrix,0,0,d.width/o.resolution,d.height/o.resolution,!a.isRoot),this.adaptor.startRenderPass(a,t,r,d),i&&this.onRenderTargetChange.emit(a),a}clear(e,t=B.ALL,r){t&&(e&&(e=this.getRenderTarget(e)),this.adaptor.clear(e||this.renderTarget,t,r,this.viewport))}contextChange(){this._gpuRenderTargetHash=Object.create(null)}push(e,t=B.ALL,r,s){const a=this.bind(e,t,r,s);return this._renderTargetStack.push({renderTarget:a,frame:s}),a}pop(){this._renderTargetStack.pop();const e=this._renderTargetStack[this._renderTargetStack.length-1];this.bind(e.renderTarget,!1,null,e.frame)}getRenderTarget(e){var t;return e.isTexture&&(e=e.source),(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}copyToTexture(e,t,r,s,a){r.x<0&&(s.width+=r.x,a.x-=r.x,r.x=0),r.y<0&&(s.height+=r.y,a.y-=r.y,r.y=0);const{pixelWidth:i,pixelHeight:l}=e;return s.width=Math.min(s.width,i-r.x),s.height=Math.min(s.height,l-r.y),this.adaptor.copyToTexture(e,t,r,s,a)}ensureDepthStencil(){this.renderTarget.stencil||(this.renderTarget.stencil=!0,this.adaptor.startRenderPass(this.renderTarget,!1,null,this.viewport))}destroy(){this._renderer=null,this._renderSurfaceToRenderTargetHash.forEach((e,t)=>{e!==t&&e.destroy()}),this._renderSurfaceToRenderTargetHash.clear(),this._gpuRenderTargetHash=Object.create(null)}_initRenderTarget(e){let t=null;return U.test(e)&&(e=ke(e).source),e instanceof G?t=e:e instanceof T&&(t=new G({colorTextures:[e]}),e.source instanceof U&&(t.isRoot=!0),e.once("destroy",()=>{t.destroy(),this._renderSurfaceToRenderTargetHash.delete(e);const r=this._gpuRenderTargetHash[t.uid];r&&(this._gpuRenderTargetHash[t.uid]=null,this.adaptor.destroyGpuRenderTarget(r))})),this._renderSurfaceToRenderTargetHash.set(e,t),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||(this._gpuRenderTargetHash[e.uid]=this.adaptor.initGpuRenderTarget(e))}resetState(){this.renderTarget=null,this.renderSurface=null}}class Ht extends Ke{constructor({buffer:e,offset:t,size:r}){super(),this.uid=M("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=M("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=e,this.offset=t|0,this.size=r,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=M("resource"),this.emit("change",this)}destroy(e=!1){this.destroyed=!0,e&&this.buffer.destroy(),this.emit("change",this),this.buffer=null}}class Se{constructor(e){this._renderer=e}updateRenderable(){}destroyRenderable(){}validateRenderable(){return!1}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&e.render(this._renderer)}destroy(){this._renderer=null}}Se.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"customRender"};function E(n,e){const t=n.instructionSet,r=t.instructions;for(let s=0;s<t.instructionSize;s++){const a=r[s];e[a.renderPipeId].execute(a)}}const ft=new v;class we{constructor(e){this._renderer=e}addRenderGroup(e,t){e.isCachedAsTexture?this._addRenderableCacheAsTexture(e,t):this._addRenderableDirect(e,t)}execute(e){e.isRenderable&&(e.isCachedAsTexture?this._executeCacheAsTexture(e):this._executeDirect(e))}destroy(){this._renderer=null}_addRenderableDirect(e,t){this._renderer.renderPipes.batch.break(t),e._batchableRenderGroup&&(S.return(e._batchableRenderGroup),e._batchableRenderGroup=null),t.add(e)}_addRenderableCacheAsTexture(e,t){var s;const r=(s=e._batchableRenderGroup)!=null?s:e._batchableRenderGroup=S.get(ve);r.renderable=e.root,r.transform=e.root.relativeGroupTransform,r.texture=e.texture,r.bounds=e._textureBounds,t.add(e),this._renderer.renderPipes.blendMode.pushBlendMode(e,e.root.groupBlendMode,t),this._renderer.renderPipes.batch.addToBatch(r,t),this._renderer.renderPipes.blendMode.popBlendMode(t)}_executeCacheAsTexture(e){if(e.textureNeedsUpdate){e.textureNeedsUpdate=!1;const t=ft.identity().translate(-e._textureBounds.x,-e._textureBounds.y);this._renderer.renderTarget.push(e.texture,!0,null,e.texture.frame),this._renderer.globalUniforms.push({worldTransformMatrix:t,worldColor:4294967295,offset:{x:0,y:0}}),E(e,this._renderer.renderPipes),this._renderer.renderTarget.finishRenderPass(),this._renderer.renderTarget.pop(),this._renderer.globalUniforms.pop()}e._batchableRenderGroup._batcher.updateElement(e._batchableRenderGroup),e._batchableRenderGroup._batcher.geometry.buffers[0].update()}_executeDirect(e){this._renderer.globalUniforms.push({worldTransformMatrix:e.inverseParentTextureTransform,worldColor:e.worldColorAlpha}),E(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop()}}we.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"renderGroup"};function D(n,e){e||(e=0);for(let t=e;t<n.length&&n[t];t++)n[t]=null}const pt=new P,se=he|fe|pe;function Pe(n,e=!1){mt(n);const t=n.childrenToUpdate,r=n.updateTick++;for(const s in t){const a=Number(s),i=t[s],l=i.list,o=i.index;for(let d=0;d<o;d++){const c=l[d];c.parentRenderGroup===n&&c.relativeRenderGroupDepth===a&&Re(c,r,0)}D(l,o),i.index=0}if(e)for(let s=0;s<n.renderGroupChildren.length;s++)Pe(n.renderGroupChildren[s],e)}function mt(n){const e=n.root;let t;if(n.renderGroupParent){const r=n.renderGroupParent;n.worldTransform.appendFrom(e.relativeGroupTransform,r.worldTransform),n.worldColor=ce(e.groupColor,r.worldColor),t=e.groupAlpha*r.worldAlpha}else n.worldTransform.copyFrom(e.localTransform),n.worldColor=e.localColor,t=e.localAlpha;t=t<0?0:t>1?1:t,n.worldAlpha=t,n.worldColorAlpha=n.worldColor+((t*255|0)<<24)}function Re(n,e,t){if(e===n.updateTick)return;n.updateTick=e,n.didChange=!1;const r=n.localTransform;n.updateLocalTransform();const s=n.parent;if(s&&!s.renderGroup?(t|=n._updateFlags,n.relativeGroupTransform.appendFrom(r,s.relativeGroupTransform),t&se&&ae(n,s,t)):(t=n._updateFlags,n.relativeGroupTransform.copyFrom(r),t&se&&ae(n,pt,t)),!n.renderGroup){const a=n.children,i=a.length;for(let d=0;d<i;d++)Re(a[d],e,t);const l=n.parentRenderGroup,o=n;o.renderPipeId&&!l.structureDidChange&&l.updateRenderable(o)}}function ae(n,e,t){if(t&fe){n.groupColor=ce(n.localColor,e.groupColor);let r=n.localAlpha*e.groupAlpha;r=r<0?0:r>1?1:r,n.groupAlpha=r,n.groupColorAlpha=n.groupColor+((r*255|0)<<24)}t&pe&&(n.groupBlendMode=n.localBlendMode==="inherit"?e.groupBlendMode:n.localBlendMode),t&he&&(n.globalDisplayStatus=n.localDisplayStatus&e.globalDisplayStatus),n._updateFlags=0}function vt(n,e){const{list:t,index:r}=n.childrenRenderablesToUpdate;let s=!1;for(let a=0;a<r;a++){const i=t[a];if(s=e[i.renderPipeId].validateRenderable(i),s)break}return n.structureDidChange=s,s}const gt=new v;class Be{constructor(e){this._renderer=e}render({container:e,transform:t}){const r=e.parent,s=e.renderGroup.renderGroupParent;e.parent=null,e.renderGroup.renderGroupParent=null;const a=this._renderer,i=gt;t&&(i.copyFrom(e.renderGroup.localTransform),e.renderGroup.localTransform.copyFrom(t));const l=a.renderPipes;this._updateCachedRenderGroups(e.renderGroup,null),this._updateRenderGroups(e.renderGroup),a.globalUniforms.start({worldTransformMatrix:t?e.renderGroup.localTransform:e.renderGroup.worldTransform,worldColor:e.renderGroup.worldColorAlpha}),E(e.renderGroup,l),l.uniformBatch&&l.uniformBatch.renderEnd(),t&&e.renderGroup.localTransform.copyFrom(i),e.parent=r,e.renderGroup.renderGroupParent=s}destroy(){this._renderer=null}_updateCachedRenderGroups(e,t){var r,s;if(e._parentCacheAsTextureRenderGroup=t,e.isCachedAsTexture){if(!e.textureNeedsUpdate)return;t=e}for(let a=e.renderGroupChildren.length-1;a>=0;a--)this._updateCachedRenderGroups(e.renderGroupChildren[a],t);if(e.invalidateMatrices(),e.isCachedAsTexture){if(e.textureNeedsUpdate){const a=e.root.getLocalBounds();a.ceil();const i=e.texture;e.texture&&b.returnTexture(e.texture,!0);const l=this._renderer,o=e.textureOptions.resolution||l.view.resolution,d=(r=e.textureOptions.antialias)!=null?r:l.view.antialias,c=(s=e.textureOptions.scaleMode)!=null?s:"linear",h=b.getOptimalTexture(a.width,a.height,o,d);h._source.style=new Ye({scaleMode:c}),e.texture=h,e._textureBounds||(e._textureBounds=new F),e._textureBounds.copyFrom(a),i!==e.texture&&e.renderGroupParent&&(e.renderGroupParent.structureDidChange=!0)}}else e.texture&&(b.returnTexture(e.texture,!0),e.texture=null)}_updateRenderGroups(e){const t=this._renderer,r=t.renderPipes;if(e.runOnRender(t),e.instructionSet.renderPipes=r,e.structureDidChange?D(e.childrenRenderablesToUpdate.list,0):vt(e,r),Pe(e),e.structureDidChange?(e.structureDidChange=!1,this._buildInstructions(e,t)):this._updateRenderables(e),e.childrenRenderablesToUpdate.index=0,t.renderPipes.batch.upload(e.instructionSet),!(e.isCachedAsTexture&&!e.textureNeedsUpdate))for(let s=0;s<e.renderGroupChildren.length;s++)this._updateRenderGroups(e.renderGroupChildren[s])}_updateRenderables(e){const{list:t,index:r}=e.childrenRenderablesToUpdate;for(let s=0;s<r;s++){const a=t[s];a.didViewUpdate&&e.updateRenderable(a)}D(t,r)}_buildInstructions(e,t){const r=e.root,s=e.instructionSet;s.reset();const a=t.renderPipes?t:t.batch.renderer,i=a.renderPipes;i.batch.buildStart(s),i.blendMode.buildStart(),i.colorMask.buildStart(),r.sortableChildren&&r.sortChildren(),r.collectRenderablesWithEffects(s,a,null),i.batch.buildEnd(s),i.blendMode.buildEnd(s)}}Be.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"renderGroup"};class Ue{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.bounds=e.visualBounds,t.texture=e._texture}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=new ve;return t.renderable=e,t.transform=e.groupTransform,t.texture=e._texture,t.bounds=e.visualBounds,t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Ue.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"sprite"};const V=class Ae{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new A(0),this.color=this._backgroundColor,this.alpha=1}init(e){e={...Ae.defaultOptions,...e},this.clearBeforeRender=e.clearBeforeRender,this.color=e.background||e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha,this._backgroundColor.setAlpha(e.backgroundAlpha)}get color(){return this._backgroundColor}set color(e){A.shared.setValue(e).alpha<1&&this._backgroundColor.alpha===1&&H("Cannot set a transparent background on an opaque canvas. To enable transparency, set backgroundAlpha < 1 when initializing your Application."),this._backgroundColor.setValue(e)}get alpha(){return this._backgroundColor.alpha}set alpha(e){this._backgroundColor.setAlpha(e)}get colorRgba(){return this._backgroundColor.toArray()}destroy(){}};V.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"background",priority:0};V.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};let xt=V;const y={};O.handle(u.BlendMode,n=>{if(!n.name)throw new Error("BlendMode extension must have a name property");y[n.name]=n.ref},n=>{delete y[n.name]});class Ie{constructor(e){this._blendModeStack=[],this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e,this._renderer.runners.prerender.add(this)}prerender(){this._activeBlendMode="normal",this._isAdvanced=!1}pushBlendMode(e,t,r){this._blendModeStack.push(t),this.setBlendMode(e,t,r)}popBlendMode(e){var r;this._blendModeStack.pop();const t=(r=this._blendModeStack[this._activeBlendMode.length-1])!=null?r:"normal";this.setBlendMode(null,t,e)}setBlendMode(e,t,r){var a;const s=e instanceof Z;if(this._activeBlendMode===t){this._isAdvanced&&e&&!s&&((a=this._renderableList)==null||a.push(e));return}this._isAdvanced&&this._endAdvancedBlendMode(r),this._activeBlendMode=t,e&&(this._isAdvanced=!!y[t],this._isAdvanced&&this._beginAdvancedBlendMode(e,r))}_beginAdvancedBlendMode(e,t){this._renderer.renderPipes.batch.break(t);const r=this._activeBlendMode;if(!y[r]){H(`Unable to assign BlendMode: '${r}'. You may want to include: import 'pixi.js/advanced-blend-modes'`);return}const s=this._ensureFilterEffect(r),a=e instanceof Z,i={renderPipeId:"filter",action:"pushFilter",filterEffect:s,renderables:a?null:[e],container:a?e.root:null,canBundle:!1};this._renderableList=i.renderables,t.add(i)}_ensureFilterEffect(e){let t=this._filterHash[e];return t||(t=this._filterHash[e]=new de,t.filters=[new y[e]]),t}_endAdvancedBlendMode(e){this._isAdvanced=!1,this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}Ie.extension={type:[u.WebGLPipes,u.WebGPUPipes,u.CanvasPipes],name:"blendMode"};const R={png:"image/png",jpg:"image/jpeg",webp:"image/webp"},N=class Ge{constructor(e){this._renderer=e}_normalizeOptions(e,t={}){return e instanceof P||e instanceof m?{target:e,...t}:{...t,...e}}async image(e){const t=z.get().createImage();return t.src=await this.base64(e),t}async base64(e){e=this._normalizeOptions(e,Ge.defaultImageOptions);const{format:t,quality:r}=e,s=this.canvas(e);if(s.toBlob!==void 0)return new Promise((a,i)=>{s.toBlob(l=>{if(!l){i(new Error("ICanvas.toBlob failed!"));return}const o=new FileReader;o.onload=()=>a(o.result),o.onerror=i,o.readAsDataURL(l)},R[t],r)});if(s.toDataURL!==void 0)return s.toDataURL(R[t],r);if(s.convertToBlob!==void 0){const a=await s.convertToBlob({type:R[t],quality:r});return new Promise((i,l)=>{const o=new FileReader;o.onload=()=>i(o.result),o.onerror=l,o.readAsDataURL(a)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(e){e=this._normalizeOptions(e);const t=e.target,r=this._renderer;if(t instanceof m)return r.texture.generateCanvas(t);const s=r.textureGenerator.generateTexture(e),a=r.texture.generateCanvas(s);return s.destroy(!0),a}pixels(e){e=this._normalizeOptions(e);const t=e.target,r=this._renderer,s=t instanceof m?t:r.textureGenerator.generateTexture(e),a=r.texture.getPixels(s);return t instanceof P&&s.destroy(!0),a}texture(e){return e=this._normalizeOptions(e),e.target instanceof m?e.target:this._renderer.textureGenerator.generateTexture(e)}download(e){var s;e=this._normalizeOptions(e);const t=this.canvas(e),r=document.createElement("a");r.download=(s=e.filename)!=null?s:"image.png",r.href=t.toDataURL("image/png"),document.body.appendChild(r),r.click(),document.body.removeChild(r)}log(e){var i;const t=(i=e.width)!=null?i:200;e=this._normalizeOptions(e);const r=this.canvas(e),s=r.toDataURL();console.log(`[Pixi Texture] ${r.width}px ${r.height}px`);const a=["font-size: 1px;",`padding: ${t}px 300px;`,`background: url(${s}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",a)}destroy(){this._renderer=null}};N.extension={type:[u.WebGLSystem,u.WebGPUSystem],name:"extract"};N.defaultImageOptions={format:"png",quality:1};let _t=N;class j extends m{static create(e){return new j({source:new T(e)})}resize(e,t,r){return this.source.resize(e,t,r),this}}const bt=new w,Tt=new F,yt=[0,0,0,0];class Ee{constructor(e){this._renderer=e}generateTexture(e){var d;e instanceof P&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const t=e.resolution||this._renderer.resolution,r=e.antialias||this._renderer.view.antialias,s=e.target;let a=e.clearColor;a?a=Array.isArray(a)&&a.length===4?a:A.shared.setValue(a).toArray():a=yt;const i=((d=e.frame)==null?void 0:d.copyTo(bt))||Je(s,Tt).rectangle;i.width=Math.max(i.width,1/t)|0,i.height=Math.max(i.height,1/t)|0;const l=j.create({...e.textureSourceOptions,width:i.width,height:i.height,resolution:t,antialias:r}),o=v.shared.translate(-i.x,-i.y);return this._renderer.render({container:s,transform:o,target:l,clearColor:a}),l.source.updateMipmaps(),l}destroy(){this._renderer=null}}Ee.extension={type:[u.WebGLSystem,u.WebGPUSystem],name:"textureGenerator"};class De{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({size:e,projectionMatrix:t,worldTransformMatrix:r,worldColor:s,offset:a}){const i=this._renderer.renderTarget.renderTarget,l=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{worldTransformMatrix:new v,worldColor:4294967295,offset:new Xe},o={projectionMatrix:t||this._renderer.renderTarget.projectionMatrix,resolution:e||i.size,worldTransformMatrix:r||l.worldTransformMatrix,worldColor:s||l.worldColor,offset:a||l.offset,bindGroup:null},d=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(d);const c=d.uniforms;c.uProjectionMatrix=o.projectionMatrix,c.uResolution=o.resolution,c.uWorldTransformMatrix.copyFrom(o.worldTransformMatrix),c.uWorldTransformMatrix.tx-=o.offset.x,c.uWorldTransformMatrix.ty-=o.offset.y,rt(o.worldColor,c.uWorldColorAlpha,0),d.update();let h;this._renderer.renderPipes.uniformBatch?h=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(d,!1):(h=this._bindGroupPool.pop()||new Qe,this._activeBindGroups.push(h),h.setResource(d,0)),o.bindGroup=h,this._currentGlobalUniformData=o}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1],this._renderer.type===L.WEBGL&&this._currentGlobalUniformData.bindGroup.resources[0].update()}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get globalUniformData(){return this._currentGlobalUniformData}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new le({uProjectionMatrix:{value:new v,type:"mat3x3<f32>"},uWorldTransformMatrix:{value:new v,type:"mat3x3<f32>"},uWorldColorAlpha:{value:new Float32Array(4),type:"vec4<f32>"},uResolution:{value:[0,0],type:"vec2<f32>"}},{isStatic:!0})}destroy(){this._renderer=null,this._globalUniformDataStack.length=0,this._uniformsPool.length=0,this._activeUniforms.length=0,this._bindGroupPool.length=0,this._activeBindGroups.length=0,this._currentGlobalUniformData=null}}De.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"globalUniforms"};let kt=1;class Oe{constructor(){this._tasks=[],this._offset=0}init(){ee.system.add(this._update,this)}repeat(e,t,r=!0){const s=kt++;let a=0;return r&&(this._offset+=1e3,a=this._offset),this._tasks.push({func:e,duration:t,start:performance.now(),offset:a,last:performance.now(),repeat:!0,id:s}),s}cancel(e){for(let t=0;t<this._tasks.length;t++)if(this._tasks[t].id===e){this._tasks.splice(t,1);return}}_update(){const e=performance.now();for(let t=0;t<this._tasks.length;t++){const r=this._tasks[t];if(e-r.offset-r.last>=r.duration){const s=e-r.start;r.func(s),r.last=e}}}destroy(){ee.system.remove(this._update,this),this._tasks.length=0}}Oe.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"scheduler",priority:0};let ne=!1;function Ct(n){if(!ne){if(z.get().getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${te} (${n}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${te} - ${n} - http://www.pixijs.com/`);ne=!0}}class ${constructor(e){this._renderer=e}init(e){if(e.hello){let t=this._renderer.name;this._renderer.type===L.WEBGL&&(t+=` ${this._renderer.context.webGLVersion}`),Ct(t)}}}$.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"hello",priority:-2};$.defaultOptions={hello:!1};function Mt(n){let e=!1;for(const r in n)if(n[r]==null){e=!0;break}if(!e)return n;const t=Object.create(null);for(const r in n){const s=n[r];s&&(t[r]=s)}return t}function St(n){let e=0;for(let t=0;t<n.length;t++)n[t]==null?e++:n[t-e]=n[t];return n.length-=e,n}let wt=0;const q=class Fe{constructor(e){this._managedRenderables=[],this._managedHashes=[],this._managedArrays=[],this._renderer=e}init(e){e={...Fe.defaultOptions,...e},this.maxUnusedTime=e.renderableGCMaxUnusedTime,this._frequency=e.renderableGCFrequency,this.enabled=e.renderableGCActive}get enabled(){return!!this._handler}set enabled(e){this.enabled!==e&&(e?(this._handler=this._renderer.scheduler.repeat(()=>this.run(),this._frequency,!1),this._hashHandler=this._renderer.scheduler.repeat(()=>{for(const t of this._managedHashes)t.context[t.hash]=Mt(t.context[t.hash])},this._frequency),this._arrayHandler=this._renderer.scheduler.repeat(()=>{for(const t of this._managedArrays)St(t.context[t.hash])},this._frequency)):(this._renderer.scheduler.cancel(this._handler),this._renderer.scheduler.cancel(this._hashHandler),this._renderer.scheduler.cancel(this._arrayHandler)))}addManagedHash(e,t){this._managedHashes.push({context:e,hash:t})}addManagedArray(e,t){this._managedArrays.push({context:e,hash:t})}prerender({container:e}){this._now=performance.now(),e.renderGroup.gcTick=wt++,this._updateInstructionGCTick(e.renderGroup,e.renderGroup.gcTick)}addRenderable(e){this.enabled&&(e._lastUsed===-1&&(this._managedRenderables.push(e),e.once("destroyed",this._removeRenderable,this)),e._lastUsed=this._now)}run(){var a,i,l,o;const e=this._now,t=this._managedRenderables,r=this._renderer.renderPipes;let s=0;for(let d=0;d<t.length;d++){const c=t[d];if(c===null){s++;continue}const h=(a=c.renderGroup)!=null?a:c.parentRenderGroup,f=(l=(i=h==null?void 0:h.instructionSet)==null?void 0:i.gcTick)!=null?l:-1;if(((o=h==null?void 0:h.gcTick)!=null?o:0)===f&&(c._lastUsed=e),e-c._lastUsed>this.maxUnusedTime){if(!c.destroyed){const J=r;h&&(h.structureDidChange=!0),J[c.renderPipeId].destroyRenderable(c)}c._lastUsed=-1,s++,c.off("destroyed",this._removeRenderable,this)}else t[d-s]=c}t.length-=s}destroy(){this.enabled=!1,this._renderer=null,this._managedRenderables.length=0,this._managedHashes.length=0,this._managedArrays.length=0}_removeRenderable(e){const t=this._managedRenderables.indexOf(e);t>=0&&(e.off("destroyed",this._removeRenderable,this),this._managedRenderables[t]=null)}_updateInstructionGCTick(e,t){e.instructionSet.gcTick=t;for(const r of e.renderGroupChildren)this._updateInstructionGCTick(r,t)}};q.extension={type:[u.WebGLSystem,u.WebGPUSystem],name:"renderableGC",priority:0};q.defaultOptions={renderableGCActive:!0,renderableGCMaxUnusedTime:6e4,renderableGCFrequency:3e4};let Pt=q;const K=class Le{constructor(e){this._renderer=e,this.count=0,this.checkCount=0}init(e){var t;e={...Le.defaultOptions,...e},this.checkCountMax=e.textureGCCheckCountMax,this.maxIdle=(t=e.textureGCAMaxIdle)!=null?t:e.textureGCMaxIdle,this.active=e.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const e=this._renderer.texture.managedTextures;for(let t=0;t<e.length;t++){const r=e[t];r.autoGarbageCollect&&r.resource&&r._touched>-1&&this.count-r._touched>this.maxIdle&&(r._touched=-1,r.unload())}}destroy(){this._renderer=null}};K.extension={type:[u.WebGLSystem,u.WebGPUSystem],name:"textureGC"};K.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:null,textureGCMaxIdle:60*60,textureGCCheckCountMax:600};let Rt=K;const Y=class He{get autoDensity(){return this.texture.source.autoDensity}set autoDensity(e){this.texture.source.autoDensity=e}get resolution(){return this.texture.source._resolution}set resolution(e){this.texture.source.resize(this.texture.source.width,this.texture.source.height,e)}init(e){e={...He.defaultOptions,...e},e.view&&(Ze(et,"ViewSystem.view has been renamed to ViewSystem.canvas"),e.canvas=e.view),this.screen=new w(0,0,e.width,e.height),this.canvas=e.canvas||z.get().createCanvas(),this.antialias=!!e.antialias,this.texture=ke(this.canvas,e),this.renderTarget=new G({colorTextures:[this.texture],depth:!!e.depth,isRoot:!0}),this.texture.source.transparent=e.backgroundAlpha<1,this.resolution=e.resolution}resize(e,t,r){this.texture.source.resize(e,t,r),this.screen.width=this.texture.frame.width,this.screen.height=this.texture.frame.height}destroy(e=!1){(typeof e=="boolean"?e:!!(e!=null&&e.removeView))&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas),this.texture.destroy()}};Y.extension={type:[u.WebGLSystem,u.WebGPUSystem,u.CanvasSystem],name:"view",priority:0};Y.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};let Bt=Y;const zt=[xt,De,$,Bt,Be,Rt,Ee,_t,tt,Pt,Oe],Wt=[Ie,_e,Ue,we,be,ye,Te,Se];export{Ht as B,_ as G,Lt as R,zt as S,Dt as U,Wt as a,dt as b,Ot as c,C as d,Et as e,Gt as f,It as t,Ft as u};
