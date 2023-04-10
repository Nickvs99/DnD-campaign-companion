"use strict";(self["webpackChunkdnd_campaign_companion"]=self["webpackChunkdnd_campaign_companion"]||[]).push([[751,68,492,358,685],{4469:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var s=a(3396);const n={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48"},r=(0,s._)("path",{d:"M24 34q.7 0 1.175-.475.475-.475.475-1.175 0-.7-.475-1.175Q24.7 30.7 24 30.7q-.7 0-1.175.475-.475.475-.475 1.175 0 .7.475 1.175Q23.3 34 24 34Zm-1.35-7.65h3V13.7h-3ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"},null,-1),l=[r];function i(e,t){return(0,s.wg)(),(0,s.iD)("svg",n,l)}var c=a(89);const o={},u=(0,c.Z)(o,[["render",i]]);var d=u},4583:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var s=a(3396);const n={xmlns:"http://www.w3.org/2000/svg",height:"48",width:"48"},r=(0,s._)("path",{d:"M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"},null,-1),l=[r];function i(e,t){return(0,s.wg)(),(0,s.iD)("svg",n,l)}var c=a(89);const o={},u=(0,c.Z)(o,[["render",i]]);var d=u},461:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var s=a(3396),n=a(7139);function r(e,t,a,r,l,i){const c=(0,s.up)("CenterToScreen");return(0,s.wg)(),(0,s.j4)(c,{class:"container"},{default:(0,s.w5)((()=>[(0,s.WI)(e.$slots,"default"),(0,s._)("h1",null,(0,n.zw)(a.header),1)])),_:3})}var l=a(4474),i={name:"IconWithHeader",components:{CenterToScreen:l["default"]},props:{header:{type:String}}},c=a(89);const o=(0,c.Z)(i,[["render",r],["__scopeId","data-v-60558258"]]);var u=o},3029:function(e,t,a){a.r(t),a.d(t,{default:function(){return v}});var s=a(3396),n=a(7139);const r={class:"stat-block"},l={class:"stat-block-name"},i={class:"stat-block-value"};function c(e,t,a,c,o,u){return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("div",l,(0,n.zw)(u.abbreviation),1),(0,s._)("div",i,(0,n.zw)(a.value),1)])}var o={name:"StatBlock",props:{name:{required:!0,type:String},value:{required:!0,type:Number}},computed:{abbreviation(){return this.name.slice(0,3).toUpperCase().split("").join(" ")}}},u=a(89);const d=(0,u.Z)(o,[["render",c],["__scopeId","data-v-c575eb54"]]);var v=d},440:function(e,t,a){a.r(t),a.d(t,{default:function(){return q}});var s=a(3396),n=a(7139);const r={class:"character-page-container"},l={key:0},i={ref:"imgContent",class:"img-content"},c={class:"image-content-title"},o={class:"image-content-text"},u=["href"],d={key:0,class:"stat-container"},v={key:1};function h(e,t,a,h,m,p){const f=(0,s.up)("DotSeperator"),g=(0,s.up)("OpenExternal"),w=(0,s.up)("StatBlock"),k=(0,s.up)("ErrorIcon"),b=(0,s.up)("IconWithHeader");return(0,s.wg)(),(0,s.iD)("div",r,[m.valid?((0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("div",i,[(0,s._)("div",c,(0,n.zw)(m.name),1),(0,s._)("div",o,[(0,s.Uk)("Level "+(0,n.zw)(m.level),1),(0,s.Wm)(f),(0,s.Uk)((0,n.zw)(m.race),1)]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(m.classes,(e=>((0,s.wg)(),(0,s.iD)("div",{class:"image-content-text",key:e.name},[(0,s.Uk)((0,n.zw)(e.name)+" ",1),1!=m.classes.length?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s.Uk)("("+(0,n.zw)(e.level)+") ",1)],64)):(0,s.kq)("",!0),e.subclass?((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[(0,s.Uk)("- "+(0,n.zw)(e.subclass),1)],64)):(0,s.kq)("",!0)])))),128)),(0,s._)("a",{href:m.characterPageUrl,target:"_blank"},[(0,s.Wm)(g,{class:"open-external-svg"})],8,u)],512),null!=m.stats[0].value?((0,s.wg)(),(0,s.iD)("div",d,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(m.stats,(e=>((0,s.wg)(),(0,s.j4)(w,{key:e.name,name:e.name,value:e.value},null,8,["name","value"])))),128))])):(0,s.kq)("",!0),m.description?((0,s.wg)(),(0,s.iD)("div",v,(0,n.zw)(m.description),1)):(0,s.kq)("",!0)])):((0,s.wg)(),(0,s.j4)(b,{key:1,header:"Error: 32"},{default:(0,s.w5)((()=>[(0,s.Wm)(k)])),_:1}))])}a(7658);var m=a(4469),p=a(4583),f=a(8808),g=a(461),w=a(3029),k={name:"CharacterView",components:{DotSeperator:f["default"],ErrorIcon:m["default"],IconWithHeader:g["default"],OpenExternal:p["default"],StatBlock:w["default"]},props:{data:{required:!0,type:Object}},data(){return{characterPageUrl:"",classes:null,description:null,imgSrc:"",level:null,name:null,race:null,stats:[{name:"Strength",value:null},{name:"Dexterity",value:null},{name:"Constitution",value:null},{name:"Intelligence",value:null},{name:"Wisdom",value:null},{name:"Charisma",value:null}],subclass:null,valid:!0}},mounted(){this.parseJsonResponse(this.data)},methods:{parseJsonResponse(e){this.valid=this.isValid(e),this.valid&&(this.setCharacterPageUrl(e),this.setClass(e),this.setDescription(e),this.setImgSrc(e),this.setLevel(e),this.setName(e),this.setRace(e),this.setStats(e),this.$refs.imgContent.style.backgroundImage="url("+this.imgSrc+")")},setCharacterPageUrl(e){this.characterPageUrl=e.data.readonlyUrl},setClass(e){let t=[],a=e.data.classes;for(let s of a)t.push({level:s.level,name:s.definition.name,subclass:null!=s.subclassDefinition?s.subclassDefinition.name:null});this.classes=t},setDescription(e){this.description=e.data.notes.otherNotes},setImgSrc(e){e.data.decorations.avatarUrl?this.imgSrc=e.data.decorations.avatarUrl:this.imgSrc=a(8862)},setLevel(e){let t=0;for(let a of e.data.classes)t+=a.level;this.level=t},setName(e){this.name=e.data.name},setRace(e){this.race=e.data.race.fullName},setStats(e){let t=e.data.stats,a=e.data.bonusStats;for(let l=0;l<t.length;l++)this.stats[l].value=t[l].value+a[l].value;let s=e.data.modifiers.race,n=e.data.modifiers.class,r=s.concat(n);for(let l of r){const e=["strength-score","dexterity-score","constitution-score","intelligence-score","wisdom-score","charisma-score"];if("bonus"!==l.type||!e.includes(l.subType))continue;let t=l.subType.split("-")[0],a=this.stats.findIndex((e=>e.name.toLowerCase()===t));this.stats[a].value+=l.value}},isValid(e){let t=e.data.overrideStats;for(let a of t)if(a.value)return!1;return!0}}},b=a(89);const _=(0,b.Z)(k,[["render",h],["__scopeId","data-v-2f5cc2c0"]]);var q=_}}]);
//# sourceMappingURL=views-CharacterView.90266973.js.map