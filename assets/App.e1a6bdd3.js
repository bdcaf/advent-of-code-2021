import{s as L,l as I,m as N,q as w,u as h,o as d,e as l,w as M,v as g,f as i,n as v,t as m,F as C,g as $,j as k,x as u,y as B}from"./vendor.b13a57b9.js";/* empty css                                              */import{_ as j}from"./plugin-vue_export-helper.21dcd24c.js";const b="16,1,2,0,4,2,7,1,2,14".trim();var A={name:"App",components:{Chart:L,Grid:I,Bar:N,Line:w},mounted(){this.parseInput()},data(){return{input:b,doneEx1:!1,done1:!1,done2:!1,answerEx1:NaN,answer1:NaN,answer2:NaN,crabs:[],range:[NaN,NaN],positionList:[],chartPos:[]}},methods:{resetInput(){this.input=b},parseInput(){clearInterval(this.interval),this.crabs=this.input.trim().split(/,/).map(n=>parseInt(n,10)),this.range=[Math.min(...this.crabs),Math.max(...this.crabs)],this.positionList=Array(this.range[1]-this.range[0]+1).fill(0),this.crabs.forEach(n=>this.positionList[n-this.range[0]]++);const t=n=>this.positionList.map((s,o)=>s*Math.abs(n-o)).reduce((s,o)=>s+o,0),a=n=>this.positionList.map((s,o)=>{let e=Math.abs(n-o);return s*e*(e+1)/2}).reduce((s,o)=>s+o,0),r=this.positionList.map((n,s)=>t(s)),p=this.positionList.map((n,s)=>a(s)),c=1*Math.max(...this.positionList)/Math.max(...r),f=1*Math.max(...this.positionList)/Math.max(...p);this.chartPos=this.positionList.map((n,s)=>({x:s+1,y:n,d:r[s]*c,d2:p[s]*f})),this.answer1=Math.min(...r),this.answer2=Math.min(...p)}}};const D={class:"app"},E=i("h3",null,"Input",-1),S={class:"buttons"},V={class:"answer"},_={class:"visualization"},K={key:0,class:"positions"};function P(t,a,r,p,c,f){const n=h("Bar"),s=h("Line"),o=h("Chart");return d(),l("div",D,[E,M(i("textarea",{"onUpdate:modelValue":a[0]||(a[0]=e=>t.input=e),onInput:a[1]||(a[1]=(...e)=>t.parseInput&&t.parseInput(...e)),placeholder:"add multiple lines"},null,544),[[g,t.input]]),i("div",S,[i("button",{onClick:a[2]||(a[2]=(...e)=>t.resetInput&&t.resetInput(...e))},"reset"),i("button",{onClick:a[3]||(a[3]=(...e)=>t.parseInput&&t.parseInput(...e))},"parse"),i("button",{onClick:a[4]||(a[4]=(...e)=>t.run1&&t.run1(...e))},"run part 1"),i("button",{onClick:a[5]||(a[5]=(...e)=>t.run2&&t.run2(...e))},"run part 2")]),i("div",V,[i("p",{style:v([t.done1?{color:"red"}:{}])},"part 1: "+m(t.answer1),5),i("p",{style:v([t.done2?{color:"red"}:{}])},"part 2: "+m(t.answer2),5)]),i("div",_,[t.positionList<30?(d(),l("div",K,[(d(!0),l(C,null,$(t.positionList,(e,y)=>(d(),l("div",{class:"crab",key:y},m(e),1))),128))])):k("v-if",!0),u(o,{data:t.chartPos},{layers:B(()=>[u(n,{dataKeys:["x","y"],barStyle:{fill:"#90e0ef"}}),u(s,{dataKeys:["x","d"],hideDot:"true"}),u(s,{dataKeys:["x","d2"],lineStyle:{stroke:"#e080ef"},hideDot:"true"})]),_:1},8,["data"])])])}var x=j(A,[["render",P]]);export{x as default};