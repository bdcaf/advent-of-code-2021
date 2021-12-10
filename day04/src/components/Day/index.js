import {  defaultInput } from './default.js'
import Bingo from './Bingo.vue'

export default {
  name: 'Day04',
  components: {
    Bingo
  },
  data() {return {
    valid: false,
    answer: 0,
    answerB: 0,
    inputText:defaultInput,
    activePart:1,
    draws:[],
    fields:[],
    selected: NaN,
  } },
  mounted(){
      this.parse()
  },
  methods: {
    reset(){
      this.inputText = defaultInput
      this.parse()
    },
    parse(){
      this.fields = []
      let blocks = this.inputText.split('\n\n')
      this.draws = blocks.shift().trim().split(',').map((x)=>parseInt(x,10))

      let toArr = (x)=>x.split('\n')
        .map((y)=>y.trim()
          .split(/\s+/)
          .map((x)=>({
            value: parseInt(x,10),
            marked: false,
          }))
        )
      var pos=0
      this.fields = blocks.map(toArr)
        .map((x)=>({
          position: ++pos,
          hash:x.reduce((p,y)=>p.concat(y),[]).map(x=>x.value).reduce((p,v)=>(p<<6)+(p>>26)+v),
          field:x,
          won: false,
          score: 0,
        }))
      console.log(this.fields[0].hash)
    },
    run1(){
      clearInterval(this.interval)
      this.activePart=1
      this.answer=NaN
      this.answerB=NaN
      this.stop=false

      let dur = 200
      this.interval = setInterval( this.nextMove , dur);

    },
    bingoWon(val){
      if (isNaN(this.answer)) this.answer = val
      this.answerB = val
    },
    resetCalc(){
      this.part1done=false
      this.stop=false
      this.valid=false
      this.parsedRows = 0
      this.total = []

    },
    nextMove(){
      if ( this.draws.length == 0 || this.stop){
        this.valid = true
        this.part1done = true
        clearInterval(this.interval);
      }
      let curr = this.draws.shift()
      this.selected = curr

    },
  },
}

