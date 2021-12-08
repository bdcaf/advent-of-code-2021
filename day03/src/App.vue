<template>
  <div id="app">
    <h2>Day 2</h2>
    <label for="code">planned course:</label>
    <textarea id="code" v-model="inputText" rows="4" cols="14"/>
      <div class="control">
        <button v-on:click="run1">run part1</button>
        <button v-on:click="run2">run part2</button>
        <button v-on:click="reset">reset</button>
        <button v-on:click="stop=true">stop</button>
        <input type="checkbox" v-model="doPart2" id="do-part-2" class="form-check-input">
        <label class="form-check-label" for="do-part-2">Plot part 2</label>
      </div>

        <ul :style="valid ? { 'font-weight': 'bold' } : { 'color': 'gray' }">
          <li> Answer Part 1: {{ answer }} </li>
          <li> Answer Part 2: {{ answerB }} </li>
        </ul> 

        <div v-if="activePart==1" style="display:flex;justify-content: center;">
          <div>
            answer: Answer Part 1: {{ answer }} <br/>
            (gamma: {{gamma}}, epsilon: {{epsilon}})<br/>
            <canvas id="day3-result-canvas" v-bind:width="canvasw" v-bind:height="canvashr" style=" border: 1px solid red;"></canvas>
          </div>

          <div style="max-height: 400px; overflow:scroll;">
            input:<br/>
            <canvas id="day3-input-canvas" v-bind:width="canvasw" v-bind:height="canvash" style="border: 1px solid gray;"></canvas>
          </div>
        </div>

        <div v-else style="display:flex;justify-content: center;">
          <div style="padding:1em">
            oxygen: {{ oxygenNumber }}<br/>
            <canvas id="day3-result-oxygen" v-bind:width="canvasw" v-bind:height="canvash" style=" border: 1px solid red;"></canvas>
          </div>
          <div style="padding:1em">
            co2: {{ co2Number }}<br/>
            <canvas id="day3-result-co2" v-bind:width="canvasw" v-bind:height="canvash" style=" border: 1px solid red;"></canvas>
          </div>
        </div>
  </div>
</template>

<script>

const scale = 10;
const defaultInput = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`.trim()

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
      if ( this.inputdata.length == 0 || this.stop){
        this.valid = true
        this.part1done = true
        clearInterval(this.interval);
      }

    },
    drawRes1(){
      let canvasR = document.querySelector('#day3-result-canvas')
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

      let dur = 1e3
      this.interval = setInterval( this.nextMove2 , dur);
    },
    nextMove2(){
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

      if ( this.cands.position >= this.canvasw  || this.stop){
        this.valid = true
        this.part1done = true
        clearInterval(this.interval);
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.plot1{
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 100px;
}
</style>
