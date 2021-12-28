const defaultInput = `3,4,3,1,2
`.trim()

export default {
  name: 'App',
  components: {
  },
  mounted(){
    this.parseInput()
  },
  data(){return {
    input: defaultInput,
    fishes: [],
    fish_agg: [],
    doneEx1: false,
    done1: false,
    done2: false,
    answerEx1: NaN,
    answer1: NaN,
    answer2: NaN,
    canvasw: 3,
    canvash: 3,
  }},
  methods:{
    resetInput(){this.input = defaultInput},
    parseInput(){
      // reset
      this.tableLine=0
      clearInterval(this.interval)


      this.fishes = this.input.trim()
        .split(/,/)
        .map((x)=> parseInt(x,10))
      this.fish_agg = Array(9).fill(0)
      this.fishes.forEach(x=>this.fish_agg[x]++)
      //for (var f in this.fishes){
        //this.fish_agg[f]++
      //}

    },
    runEx(){
      this.parseInput()
      this.doneEx=false
      clearInterval(this.interval)
      let dur = 300
      this.target = 18
      this.curr = 0
      this.interval = setInterval( this.moveEx , dur);

    },
    run1(){
      this.parseInput()
      this.done1=false
      clearInterval(this.interval)
      let dur = 30
      this.target = 80
      this.curr = 0
      this.interval = setInterval( this.move1 , dur);
    },
    cycle1(){
      if (this.fishes.length<100){
      let born = []
      let aged = this.fishes.map(x=>{
        let x2 = x-1
        if (x2 < 0){
          born.push(8)
          return 6
        }
        return x2
      })
      this.fishes=aged.concat(born)
      }

      let fshift = this.fish_agg.shift()
      this.fish_agg.push(fshift)
      this.fish_agg[6]+=fshift
    },
    moveEx(){
      this.cycle1()
      this.answerEx1 = this.fish_agg.reduce((p,c)=>p+c,0)
      this.curr++
      if (this.curr >= this.target){
        clearInterval(this.interval)
        this.doneEx1 = true
      }},
    move1(){
      this.cycle1()
      this.answer1 = this.fish_agg.reduce((p,c)=>p+c,0)
      this.curr++
      if (this.curr >= this.target){
        clearInterval(this.interval)
        this.done1 = true
      }
    },
    run2(){
      this.parseInput()
      this.done2=false
      clearInterval(this.interval)
      let dur = 3
      this.target = 256
      this.curr = 0
      this.interval = setInterval( this.move2 , dur);
    },
    move2(){
      this.cycle1()
      this.answer2 = this.fish_agg.reduce((p,c)=>p+c,0)
      this.curr++
      if (this.curr >= this.target){
        clearInterval(this.interval)
        this.done2 = true
      }
    },
  }

}

