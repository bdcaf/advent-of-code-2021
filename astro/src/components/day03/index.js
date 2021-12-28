import { scale, defaultInput } from './default.js'

export default {
  name: 'App',
  components: {
  },
  data() {return {
    valid: false,
    answer: 0,
    answerB: 0,
    inputText:defaultInput,
    doPart2:false,
    stop:false,
    canvasw:6*scale,
    canvashr:scale*3,
    canvash:6*scale,
    gamma:NaN,
    epsilon:NaN,
    part1done:false,
    part2done:false,
    activePart:1,
    oxygenNumber:NaN,
    co2Number:NaN,
    cands:{oxy:[], co2:[], position:0},
  } },
  mounted(){
  },
  methods: {
    reset(){
      this.inputText = defaultInput
    },
    run1(){
      this.resetCalc()
      this.activePart=1

      this.inputdata = this.inputText.trim()
        .split('\n')
        .map((x)=>x.split(''))
        .map((x)=>x.map((y)=>(y==1)? 1 : 0))

      this.canvasw = ( this.inputdata[0].length)*scale 
      this.canvash = this.inputdata.length*scale 
      this.drawPoints('#day3-input-canvas', this.inputdata)
      let dur = Math.sqrt(1e6/this.inputdata.length)
      this.interval = setInterval( this.nextMove , dur);

    },
    resetCalc(){
      this.part1done=false
      this.stop=false
      this.valid=false
      this.parsedRows = 0
      this.total = []

    },
    nextMove(){
      if ( this.inputdata.length == 0 || this.stop){
        this.valid = true
        this.part1done = true
        clearInterval(this.interval);
      }

      let value = this.inputdata.shift()
      this.parsedRows++;
      if (this.parsedRows == 1){
        this.total = value
      } else {
        for (let i in value){
          this.total[i]+= value[i]
        }
      }
      this.gammaList = this.total.map((x)=> (2*x)>this.parsedRows  )
      this.epsilonList = this.gammaList.map((x)=> !x )

      this.gamma = parseInt(this.gammaList.map((x)=>x?'1':'0').join(''),2)
      this.epsilon = parseInt(this.epsilonList.map((x)=>x?'1':'0').join(''),2)
      this.answer = this.gamma*this.epsilon
      this.drawRes1()
      this.drawPoints('#day3-input-canvas', this.inputdata)
    },
    drawRes1(){
      let canvasR = document.querySelector('#day3-result-canvas')
      if (canvasR == null) return
      let contextR= canvasR.getContext('2d')

      contextR.clearRect(0, 0, canvasR.width, canvasR.height)
      for (let x in this.total){
        let color = 255 - Math.floor(255 *  (this.total[x]/this.parsedRows)**2)
        //let hex = color.toString(16)
        contextR.beginPath();
        contextR.fillStyle = 'rgb(255,'+color+','+color+')';
        //console.log(x, color, hex,`#ff${hex}${hex}ff`, contextR.fillStyle)
        contextR.fillRect(x*scale , 0 , scale, scale);
        contextR.fill();
      }
      for (let x in this.gammaList){
        if (this.gammaList[x]){
            contextR.beginPath();
            contextR.fillStyle = '#FF0000';
            //console.log(x, y, context.fillStyle)
            contextR.fillRect(x*scale , scale , scale, scale);
            contextR.fill();
        }
      }
      for (let x in this.epsilonList){
        if (this.epsilonList[x]){
            contextR.beginPath();
            contextR.fillStyle = '#FF0000';
            //console.log(x, y, context.fillStyle)
            contextR.fillRect(x*scale , 2*scale , scale, scale);
            contextR.fill();
        }
      }
    },
    drawPoints(selector, pointlist){
      let canvas = document.querySelector(selector)
      if (canvas == null) return

      let context = canvas.getContext('2d')

      context.clearRect(0, 0, canvas.width, canvas.height)
      for (let y in pointlist){
        for (let x in pointlist[y]){
          if (pointlist[y][x] > 0){
            context.beginPath();
            context.fillStyle = '#FF0000';
            context.fillRect(x*scale , y*scale , scale, scale);
            context.fill();
          }
        }
      }
    },
    run2(){
      this.activePart=2
      this.stop=false

      let inputdata = this.inputText.trim()
        .split('\n')
        .map((x)=>x.split(''))
        .map((x)=>x.map((y)=>(y==1)? 1 : 0))
      this.canvasw = (inputdata[0].length)*scale 
      this.canvash = inputdata.length*scale 

      this.cands = {
        oxy:inputdata.map((x)=>x),
        co2:inputdata.map((x)=>x),
        position:0,
      }

      let dur = 400
      this.interval = setInterval( this.nextMove2 , dur);
    },
    nextMove2(){
      if ( this.cands.position >= this.canvasw  || this.stop){
        this.valid = true
        this.part1done = true
        clearInterval(this.interval);
      }
      // oxygen
      if (this.cands.oxy.length>1){
        let common = this.cands.oxy
          .map((x)=>x[this.cands.position])
          .reduce((p,c)=>p+c,0) >= (this.cands.oxy.length/2) ? 1 : 0
        this.cands.oxy = this.cands.oxy
          .filter((x)=>x[this.cands.position]==common)
        this.oxygenNumber = parseInt(this.cands.oxy[0].join(''),2)
        this.drawPoints('#day3-result-oxygen', this.cands.oxy)
      }

      if (this.cands.co2.length>1){
        let common = this.cands.co2
          .map((x)=>x[this.cands.position])
          .reduce((p,c)=>p+c,0) >= (this.cands.co2.length/2) ? 1 : 0
        this.cands.co2 = this.cands.co2
          .filter((x)=>x[this.cands.position]!=common)
        this.co2Number = parseInt(this.cands.co2[0].join(''),2)
        this.drawPoints('#day3-result-co2', this.cands.co2)
      }


      this.cands.position++
      this.answerB = this.oxygenNumber * this.co2Number

    },
  },
}
