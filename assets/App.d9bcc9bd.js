import{o as n,e as a,w as y,v as b,f as o,n as f,t as p,j as v,F as d,g as u}from"./vendor.b13a57b9.js";/* empty css                                             */import{_ as g}from"./plugin-vue_export-helper.21dcd24c.js";const m=`
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`.trim();var k={name:"App",components:{},mounted(){this.parseInput()},data(){return{input:m,basin:[],done1:!1,done2:!1,answer1:NaN,answer2:NaN,paper:[],folds:[],coords:[],activeFold:NaN,doShow:!0}},methods:{resetInput(){this.input=m,this.parseInput()},parseInput(){clearInterval(this.interval);const t=this.input.trim().split(/\r?\n\r?\n/);this.coords=t[0].split(/\r?\n/).map(e=>e.split(/,/).map(r=>parseInt(r,10))),this.folds=t[1].split(/\r?\n/).map(e=>e.match(/^fold along ([xy])=(\d+)/)).map(e=>(e[2]=parseInt(e[2],10),e)),this.done1=!1,this.done2=!1,this.visPaper()},visPaper(){const t=this.coords.map(r=>r[0]).reduce((r,i)=>Math.max(r,i),0)+1,e=this.coords.map(r=>r[1]).reduce((r,i)=>Math.max(r,i),0)+1;if(t>100||e>100){this.doShow=!1;return}this.doShow=!0,this.paper=new Array(e).fill().map(()=>new Array(t).fill(!1)),this.coords.forEach(r=>{this.paper[r[1]][r[0]]=!0})},run1(){this.parseInput(),clearInterval(this.interval),this.done1=!1,this.done2=!1,this.activeFold=0;const t=this.calcScore();this.answer1=t,this.answer2=t;const e=300;this.interval=setInterval(this.move1,e)},stop(){clearInterval(this.interval)},move1(){this.fold(),this.visPaper();const t=this.calcScore();if(this.activeFold==0&&(this.answer1=t,this.done1=!0),this.answer2=t,this.activeFold++,this.activeFold>=this.folds.length){clearInterval(this.interval),this.done1=!0;return}},calcScore(){return this.coords.length},fold(){const t=this.folds[this.activeFold],e=t[2],r=t[1]=="y"?1:0,i=this.coords.filter(s=>s[r]<e),h=2*e,c=this.coords.filter(s=>s[r]>e).map(s=>(s[r]=h-s[r],s)).filter(s=>!i.some(l=>l[0]==s[0]&&l[1]==s[1]));this.coords=i.concat(c)}}};const F={class:"app"},N=o("h3",null,"Input",-1),S={class:"buttons"},A=o("h3",null,"Result",-1),j={class:"answer"},C=o("h3",null,"Details",-1),$={key:0};function B(t,e,r,i,h,c){return n(),a("div",F,[N,y(o("textarea",{"onUpdate:modelValue":e[0]||(e[0]=s=>t.input=s),onInput:e[1]||(e[1]=(...s)=>t.parseInput&&t.parseInput(...s)),style:{width:"100%",height:"20vh"}},null,544),[[b,t.input]]),o("div",S,[o("button",{onClick:e[2]||(e[2]=(...s)=>t.resetInput&&t.resetInput(...s))},"reset")]),A,o("div",j,[o("p",{style:f([t.done1?{color:"red"}:{}])},"part 1: "+p(t.answer1),5),v(`<p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>`)]),C,o("button",{onClick:e[3]||(e[3]=(...s)=>t.run1&&t.run1(...s))},"run"),o("button",{onClick:e[4]||(e[4]=(...s)=>t.stop&&t.stop(...s))},"stop"),o("ul",null,[(n(!0),a(d,null,u(t.folds,(s,l)=>(n(),a("li",{key:l,style:f([l==t.activeFold?{color:"red"}:{}])},p(s[0]),5))),128))]),o("div",null,"# visible points: "+p(t.answer2),1),t.doShow?(n(),a("table",$,[(n(!0),a(d,null,u(t.paper,(s,l)=>(n(),a("tr",{key:l},[(n(!0),a(d,null,u(s,(w,I)=>(n(),a("td",{key:I,style:{width:"1em"}},p(w?"#":"."),1))),128))]))),128))])):v("v-if",!0)])}var V=g(k,[["render",B]]);export{V as default};
