/* empty css                                                            */import{_ as w}from"./plugin-vue_export-helper.21dcd24c.js";import{o,e as l,h as v,t as u,f as a,z as b,j as B,F as h,g as c,n as N,u as y,w as I,v as $,A as T,p as _,k as C}from"./vendor.b13a57b9.js";const g=`
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`.trim(),j={name:"Bingo",data:function(){return{won:!1,answer:0,score:0}},props:{field:Array,position:Number,selected:Number},emits:["bingo-win"],mounted(){this.won=!1},watch:{selected:function(e){if(this.won)return;for(let s in this.field)for(let t in this.field[s])this.field[s][t].value==e&&(this.field[s][t].marked=!0);let i=this.field.map(s=>s.map(t=>t.marked)),p=i.map(s=>s.reduce((t,r)=>t&&r,!0)).reduce((s,t)=>s||t,!1),n=i[0].map((s,t)=>i.map(r=>r[t])).map(s=>s.reduce((t,r)=>t&&r,!0)).reduce((s,t)=>s||t,!1);this.won=n||p,this.score=this.field.map(s=>s.filter(t=>!t.marked).map(t=>t.value).reduce((t,r)=>t+r,0)).reduce((s,t)=>s+t,0),this.answer=this.score*e,this.won&&this.$emit("bingo-win",this.answer,this.position)}}},A={class:"bingo-field"};function D(e,i,p,d,n,s){return o(),l("div",A,[v(" Table "+u(p.position)+" ",1),a("div",{class:b({won:e.won})},"score "+u(e.score),3),e.won?(o(),l("div",{key:0,class:b({won:e.won})},"answer "+u(e.answer),3)):B("v-if",!0),a("table",null,[(o(!0),l(h,null,c(p.field,(t,r)=>(o(),l("tr",{key:r},[(o(!0),l(h,null,c(t,(f,k)=>(o(),l("td",{key:k,style:N(f.marked?{color:"red"}:{})},u(f.value),5))),128))]))),128))])])}var S=w(j,[["render",D],["__scopeId","data-v-73064774"]]),P={name:"Day04",components:{Bingo:S},data(){return{valid:!1,answer:0,answerB:0,board:NaN,boardB:NaN,inputText:g,activePart:1,draws:[],fields:[],selected:NaN}},mounted(){this.parse()},methods:{reset(){this.inputText=g,this.parse()},parse(){this.valid=!1,this.answer=NaN,this.answerB=!1,this.board=NaN,this.boardB=NaN,this.fields=[];let e=this.inputText.split(`

`);this.draws=e.shift().trim().split(",").map(d=>parseInt(d,10));let i=d=>d.split(`
`).map(n=>n.trim().split(/\s+/).map(s=>({value:parseInt(s,10),marked:!1})));var p=0;this.fields=e.map(i).map(d=>({position:++p,hash:d.reduce((n,s)=>n.concat(s),[]).map(n=>n.value).reduce((n,s)=>(n<<6)+(n>>26)+s),field:d,won:!1,score:0}))},run1(){clearInterval(this.interval),this.activePart=1,this.answer=NaN,this.answerB=NaN,this.stop=!1;let e=200;this.interval=setInterval(this.nextMove,e)},bingoWon(e,i){isNaN(this.answer)&&(this.answer=e,this.board=i),this.answerB=e,this.boardB=i},nextMove(){(this.draws.length==0||this.stop)&&(this.valid=!0,this.part1done=!0,clearInterval(this.interval));let e=this.draws.shift();this.selected=e}}};const m=e=>(_("data-v-30549080"),e=e(),C(),e),W={id:"day04"},z=m(()=>a("label",{for:"code"},"input",-1)),M=m(()=>a("br",null,null,-1)),V={class:"control"},F=m(()=>a("b",null,"numbers:",-1)),E={style:{display:"flex","flex-wrap":"wrap","justify-content":"center"}};function L(e,i,p,d,n,s){const t=y("Bingo");return o(),l("div",W,[z,M,I(a("textarea",{id:"code","onUpdate:modelValue":i[0]||(i[0]=r=>e.inputText=r),onInput:i[1]||(i[1]=(...r)=>e.parse&&e.parse(...r)),rows:"10",cols:"14"},null,544),[[$,e.inputText]]),a("div",V,[a("button",{onClick:i[2]||(i[2]=(...r)=>e.parse&&e.parse(...r))},"parse"),a("button",{onClick:i[3]||(i[3]=(...r)=>e.run1&&e.run1(...r))},"run "),a("button",{onClick:i[4]||(i[4]=(...r)=>e.reset&&e.reset(...r))},"reset"),a("button",{onClick:i[5]||(i[5]=r=>e.stop=!0)},"stop")]),a("ul",{style:N(e.valid?{"font-weight":"bold"}:{color:"gray"})},[a("li",null," Answer Part 1: "+u(e.answer)+" (board "+u(e.board)+")",1),a("li",null," Answer Part 2: "+u(e.answerB)+" (board "+u(e.boardB)+")",1)],4),a("div",null,[F,(o(!0),l(h,null,c(e.draws,r=>(o(),l(h,null,[v(u(r)+",",1)],64))),256))]),a("div",E,[(o(!0),l(h,null,c(e.fields,(r,f)=>(o(),T(t,{key:r.hash,position:f,field:r.field,selected:e.selected,onBingoWin:e.bingoWon},null,8,["position","field","selected","onBingoWin"]))),128))])])}var H=w(P,[["render",L],["__scopeId","data-v-30549080"]]);export{H as default};
