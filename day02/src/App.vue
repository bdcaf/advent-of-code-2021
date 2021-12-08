<template>
  <div id="app">
    <h2>Day 2</h2>
    <label for="course">planned course:</label>
    <textarea id="course" v-model="inputText" rows="4" cols="14"/>
      <div class="control">

        <button v-on:click="parse">Click to run</button>
        <button v-on:click="reset">reset input</button>
        <button v-on:click="stop=true">stop</button>
        <input type="checkbox" v-model="doPart2" id="do-part-2" class="form-check-input">
        <label class="form-check-label" for="do-part-2">Plot part 2</label>
      </div>
        <ul :style="valid ? { 'font-weight': 'bold' } : { 'color': 'gray' }">
          <li> Answer Part 1: {{ answer }} </li>
          <li> Answer Part 2: {{ answerB }} </li>
        </ul>
      <div class="wrapper">
      <div class="day2-plot">
        <svg v-bind:viewBox="viewBox" height="100%" width="100%" preserveAspectRatio="none" >
          <polyline
            fill="none"
            stroke="#0074d9"
            stroke-width="3"
            vector-effect="non-scaling-stroke"
            v-bind:points="svgList"/>
          <polyline
            v-if="doPart2"
            fill="none"
            stroke="#700409"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
            v-bind:points="svgListB"/>
        </svg>
      </div>
      </div>
  </div>
</template>

<script>

const scaleX=100
const defaultInput = `
forward 5
down 5
forward 8
up 3
down 8
forward 2`.trim()
export default {
  name: 'App',
  components: {
  },
  data() {return {
    test: "my message",
    msg: 'Hello world!',
    numberList: [],
    svgList: "",
    svgListB: "",
    viewBox: "0 0 100 100",
    valid: false,
    answer: 0,
    answerB: 0,
    inputText:defaultInput,
    position:0,
    doPart2:false,
    stop:false,
  } },
  methods: {
    reset(){
      this.inputText = defaultInput
    },
    parse(){
      this.list = this.inputText.trim()
        .split('\n')
        .map((x)=>x.split(' '))
        .map((x)=>({
          direction:x[0], 
          distance:parseInt(x[1]),
        }))
        this.viewPort = {
          minX:0,
          maxX:0,
          minY:0,
          maxY:0,
        };

      this.resetCalc()
      let dur = Math.sqrt(1e5/this.list.length)
      this.interval = setInterval( this.nextMove , dur);

    },
    resetCalc(){
      this.stop=false
      this.position = [0,0]
      this.positionB = [0,0]
      this.svgList="0,0"
      this.svgListB="0,0"
      this.valid=false
      this.aim = 0
    },
    nextMove(){
      console.log(this.list)
      let value = this.list.shift()
      switch (value.direction){
        case 'up':
          this.position[1] -= value.distance
          this.aim -= value.distance
          break
        case 'down':
          this.position[1] += value.distance
          this.aim += value.distance
          break
        case 'forward':
          this.position[0] += value.distance
          this.ensureViewbox(this.position)

          this.positionB[0] += value.distance
          this.positionB[1] += value.distance * this.aim
          if (this.doPart2){
          this.ensureViewbox(this.positionB)
          this.svgListB += ` ${this.positionB[0]*scaleX},${this.positionB[1]}`
          }
          break
      }
      this.svgList += ` ${this.position[0]*scaleX},${this.position[1]}`


      this.answer = this.position[0] * this.position[1]
      this.answerB = this.positionB[0] * this.positionB[1]
      //this.positionList.push(this.position)
      if (this.list.length == 0 || this.stop){
        this.valid = true
        clearInterval(this.interval);
      }
    },
    ensureViewbox(point){
      this.viewPort.minX = Math.min(point[0]*scaleX, this.viewPort.minX)
      this.viewPort.maxX = Math.max(point[0]*scaleX, this.viewPort.maxX)
      this.viewPort.minY = Math.min(point[1], this.viewPort.minY)
      this.viewPort.maxY = Math.max(point[1], this.viewPort.maxY)
      this.viewBox = `${this.viewPort.minX} ${this.viewPort.minY} ${this.viewPort.maxX - this.viewPort.minX} ${this.viewPort.maxY - this.viewPort.minY}`
    }


  }
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
.wrapper{
  display: flex;
  flex-direction: row;
  border: 1px solid black;
}

.day2-plot{
  margin-left: auto;
  margin-right: auto;
  flex-grow:1;
  height: 400px;
}
</style>
