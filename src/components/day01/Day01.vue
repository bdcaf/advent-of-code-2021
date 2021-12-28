<template>
  <div id="app">
    <label for="scandata">sonar data:</label>
    <textarea id="scandata" v-model="inputText" rows="4" cols="7"/>
      <div class="control">
        <button v-on:click="parse">run</button>
        <button v-on:click="reset">reset</button>
      </div>
        <ul :style="valid ? { 'font-weight': 'bold' } : { 'color': 'gray' }" style="list-style-type:none">
          <li> Answer Part 1: {{ answer }} </li>
          <li> Answer Part 2: {{ answerB }} </li>
        </ul>
      <div class="wrapper">
      <div class="day1-plot">
        <svg v-bind:viewBox="viewBox" class="chart" width="100%" height="100%">
          <polyline
            fill="none"
            stroke="#0074d9"
            stroke-width="3"
            vector-effect="non-scaling-stroke"
            v-bind:points="svgList"/>
          <polyline
            fill="none"
            stroke="#700409"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
            v-bind:points="svgListB"/>
        </svg>
      </div>
      <div class="day1-1-table">
      <ul >
        <li v-for="(entry) in numberList" 
            :value="entry.value" 
            :key="entry.index">
          {{ entry.value }} 
          <template v-if="entry.gt">(increased)</template>
          <template v-else>(decreased)</template>
        </li>
      </ul>
      </div>
      </div>
  </div>
</template>

<script>
const defaultInput = '199\n200\n208\n210\n200\n207\n240\n269\n260\n263'
const xScale = 10
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
  } },
  methods: {
    reset(){
      this.inputText = defaultInput
    },
    parse(){
      this.list = this.inputText.split('\n')
          .map((x)=>parseInt(x, 10))
          .filter((x)=>!isNaN(x));
      var viewPort = {
        minX:0-6,
        maxX:xScale*this.list.length+6,
        minY:Math.min(...this.list)-6,
        maxY:Math.max(...this.list)+6,
      };
      console.log(viewPort)
      this.viewBox = `${viewPort.minX} ${viewPort.minY} ${viewPort.maxX - viewPort.minX} ${viewPort.maxY - viewPort.minY}`
      this.svgList =""
      this.numberList = []

      this.resetCalc()
      let dur = Math.sqrt(15000/this.list.length)
      this.interval = setInterval( this.nextScan , dur);

    },
    resetCalc(){
      this.answer=0
      this.answerB=0
      this.position=0
      this.prev=NaN
      this.prevB=NaN
      this.svgList =""
      this.svgListB =""
      this.numberList = []
      this.valid=false
    },
    nextScan(){
      var value = this.list[this.position]
      var gt = value>this.prev
      if (gt) this.answer++
      this.prev = value

      var valueB = (this.position==0 || this.position== this.list.length-1)? NaN : (this.list[this.position-1] + this.list[this.position] + this.list[this.position+1])/3
      var gtB = valueB>this.prevB
      if (gtB) this.answerB++
      this.prevB = valueB

      this.svgList += ` ${xScale*this.position},${value}`
      if (!isNaN(valueB)) this.svgListB += ` ${xScale*this.position},${valueB}`
      this.numberList.push({value:value, index:this.position, gt:gt})
      this.position++
      if (this.position >= this.list.length){
        this.valid = true
        clearInterval(this.interval);
      }
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
}

.day1-plot{
  margin-left: auto;
  margin-right: auto;
  flex-grow:1;
  height: 50vh;
  border: 1px solid black;
}
.day1-1-table{
  width: 26em;
  max-height: 50vh;
  text-align: left;
  overflow: scroll;
  flex-grow:0;
}
</style>
