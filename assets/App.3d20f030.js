import{o as l,e as a,w as h,v,f as s,i as c,t as p,n as m,j as w}from"./vendor.b13a57b9.js";/* empty css                                            */import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const r=100,d=`
forward 5
down 5
forward 8
up 3
down 8
forward 2`.trim(),f={name:"App",components:{},data(){return{test:"my message",msg:"Hello world!",numberList:[],svgList:"",svgListB:"",viewBox:"0 0 100 100",valid:!1,answer:0,answerB:0,inputText:d,position:0,doPart2:!1,stop:!1}},methods:{reset(){this.inputText=d},parse(){this.list=this.inputText.trim().split(`
`).map(i=>i.split(" ")).map(i=>({direction:i[0],distance:parseInt(i[1])})),this.viewPort={minX:0,maxX:0,minY:0,maxY:0},this.resetCalc();let t=Math.sqrt(1e5/this.list.length);this.interval=setInterval(this.nextMove,t)},resetCalc(){this.stop=!1,this.position=[0,0],this.positionB=[0,0],this.svgList="0,0",this.svgListB="0,0",this.valid=!1,this.aim=0},nextMove(){console.log(this.list);let t=this.list.shift();switch(t.direction){case"up":this.position[1]-=t.distance,this.aim-=t.distance;break;case"down":this.position[1]+=t.distance,this.aim+=t.distance;break;case"forward":this.position[0]+=t.distance,this.ensureViewbox(this.position),this.positionB[0]+=t.distance,this.positionB[1]+=t.distance*this.aim,this.doPart2&&(this.ensureViewbox(this.positionB),this.svgListB+=` ${this.positionB[0]*r},${this.positionB[1]}`);break}this.svgList+=` ${this.position[0]*r},${this.position[1]}`,this.answer=this.position[0]*this.position[1],this.answerB=this.positionB[0]*this.positionB[1],(this.list.length==0||this.stop)&&(this.valid=!0,clearInterval(this.interval))},ensureViewbox(t){this.viewPort.minX=Math.min(t[0]*r,this.viewPort.minX),this.viewPort.maxX=Math.max(t[0]*r,this.viewPort.maxX),this.viewPort.minY=Math.min(t[1],this.viewPort.minY),this.viewPort.maxY=Math.max(t[1],this.viewPort.maxY),this.viewBox=`${this.viewPort.minX} ${this.viewPort.minY} ${this.viewPort.maxX-this.viewPort.minX} ${this.viewPort.maxY-this.viewPort.minY}`}}},x={id:"app"},_=s("label",{for:"course"},"planned course:",-1),B={class:"control"},P=s("label",{class:"form-check-label",for:"do-part-2"},"Plot part 2",-1),g={class:"wrapper"},b={class:"day2-plot"},k=["viewBox"],y=["points"],X=["points"];function L(t,i,M,Y,e,n){return l(),a("div",x,[_,h(s("textarea",{id:"course","onUpdate:modelValue":i[0]||(i[0]=o=>e.inputText=o),rows:"4",cols:"14"},null,512),[[v,e.inputText]]),s("div",B,[s("button",{onClick:i[1]||(i[1]=(...o)=>n.parse&&n.parse(...o))},"Click to run"),s("button",{onClick:i[2]||(i[2]=(...o)=>n.reset&&n.reset(...o))},"reset input"),s("button",{onClick:i[3]||(i[3]=o=>e.stop=!0)},"stop"),h(s("input",{type:"checkbox","onUpdate:modelValue":i[4]||(i[4]=o=>e.doPart2=o),id:"do-part-2",class:"form-check-input"},null,512),[[c,e.doPart2]]),P]),s("ul",{style:m([e.valid?{"font-weight":"bold"}:{color:"gray"},{"list-style-type":"none"}])},[s("li",null," Answer Part 1: "+p(e.answer),1),s("li",null," Answer Part 2: "+p(e.answerB),1)],4),s("div",g,[s("div",b,[(l(),a("svg",{viewBox:e.viewBox,height:"100%",width:"100%",preserveAspectRatio:"none"},[s("polyline",{fill:"none",stroke:"#0074d9","stroke-width":"3","vector-effect":"non-scaling-stroke",points:e.svgList},null,8,y),e.doPart2?(l(),a("polyline",{key:0,fill:"none",stroke:"#700409","stroke-width":"2","vector-effect":"non-scaling-stroke",points:e.svgListB},null,8,X)):w("v-if",!0)],8,k))])])])}var T=u(f,[["render",L]]);export{T as default};