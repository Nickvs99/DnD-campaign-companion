"use strict";(self["webpackChunkdnd_campaign_companion"]=self["webpackChunkdnd_campaign_companion"]||[]).push([[472],{6162:function(e,o,t){t.r(o),t.d(o,{default:function(){return p}});var a=t(3396);const s={ref:"docWrapper",class:"google-doc"};function n(e,o,t,n,r,i){const d=(0,a.up)("LoadIcon"),c=(0,a.up)("CenterToScreen");return(0,a.wg)(),(0,a.iD)("div",s,[r.showLoadIcon&&t.centerLoadIcon?((0,a.wg)(),(0,a.j4)(c,{key:0},{default:(0,a.w5)((()=>[(0,a.Wm)(d,{message:this.loadMessage},null,8,["message"])])),_:1})):r.showLoadIcon&&!t.centerLoadIcon?((0,a.wg)(),(0,a.j4)(d,{key:1,message:this.loadMessage},null,8,["message"])):(0,a.kq)("",!0)],512)}var r=t(4474),i=t(7378),d=t(8245),c={name:"GoogleDocView",components:{CenterToScreen:r["default"],LoadIcon:i["default"]},props:{src:{type:String,required:!0},centerLoadIcon:{type:Boolean,default:!0}},data(){return{isDestroyed:!1,showLoadIcon:!0,loadMessage:"",maxArtificialLoadTime:(0,d.randomUniform)(2500,4e3)}},mounted(){this.loadGoogleDoc()},unmounted(){this.xhr.abort(),this.isDestroyed=!0},methods:{async loadGoogleDoc(){this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.src,!0),this.xhr.onload=async()=>{let o=Math.max(this.maxArtificialLoadTime-(Date.now()-e),0);if(await(0,d.sleep)(o),this.isDestroyed)return;let t=this.$refs.docWrapper,a=this.parseResponse(this.xhr.responseText);t.appendChild(a),this.showLoadIcon=!1};let e=Date.now();this.xhr.send(),this.loadMessage="Fetching document",await(0,d.sleep)((0,d.randomUniform)(1500,2500)),this.loadMessage="Parsing data"},parseResponse(e){let o=new DOMParser;const t=o.parseFromString(e,"text/html");let a=t.getElementsByTagName("a");for(let s of a)if(""!=s.hash){let e=t.getElementById(s.hash.slice(1));s.onclick=o=>{o.preventDefault(),o.stopPropagation(),e.scrollIntoView({behavior:"smooth"})}}return t.documentElement}}},l=t(89);const h=(0,l.Z)(c,[["render",n],["__scopeId","data-v-40a7aa71"]]);var p=h}}]);
//# sourceMappingURL=views-GoogleDocView.f343a63a.js.map