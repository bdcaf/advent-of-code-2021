const defaultInput = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
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
    basin: [],
    done1: false,
    done2: false,
    answer1: NaN,
    answer2: NaN,
    counter: 0,
    octopi:[],
    currFlash:0,
    totalFlash:0,
  }},
  methods:{
    resetInput(){
      this.input = defaultInput
      this.parseInput()
    },
    parseInput(){
      // reset
      clearInterval(this.interval)

    this.octopi=this.input
        .trim()
        .split(/\r?\n/)
        .map(x=>x.split('').map(y=>parseInt(y)))
      this.counter=0
      this.totalFlash=0
      this.done1=false
      this.done2=false
    },
    run1(){
      clearInterval(this.interval)
      this.counter=0
      this.totalFlash=0
      this.done1=false
      this.done2=false
      this.answer1=NaN
      this.answer2=NaN
      this.parserList = this.octopi.map((x)=>({stack:[], input:x}))
      this.missing = this.parserList.map(x=>x.stack)
      const dur = 100
      this.interval = setInterval( this.move1 , dur);
    },
    stop(){
        clearInterval(this.interval)
    },
    move1(){
      if (this.counter >= 1000 ){
        clearInterval(this.interval)
        return
      }

      this.counter++

      this.octopi = this.octopi.map(x=>x.map(y=>y+1))
      this.currFlash = 0
      this.checkFlash()

      this.totalFlash+=this.currFlash

      if (isNaN(this.answer2)){
        const sync = this.octopi.map(y=>y.reduce((p,y)=>p && y==0, true)).reduce((p,v)=>p&&v, true)
        if (sync){
          console.log(this.counter)
          this.answer2=this.counter
          this.done2=true
        clearInterval(this.interval)
        }
      }
      if (this.counter<=100){
        this.answer1 = this.totalFlash
        if (this.counter == 100){
          this.done1=true
        }
      }


    },
    checkFlash(){
      // map does not work - assume a race condition
      while (this.needsFlash()){
        for (let iy=0; iy<this.octopi.length; iy++){
          for (let ix=0; ix<this.octopi[iy].length; ix++){
            if (this.octopi[iy][ix]>9){
              this.octopi[iy][ix]=0;
              this.incNeighbor(iy,ix)
              this.currFlash++
            }
          }
        }
      }
    },
    needsFlash(){
      return this.octopi.map(x=>x.filter(y=>y>9).length > 0).reduce((p,v)=>p || v,false)
    },
    incNeighbor(iy,ix){
      for (let i=-1; i<=1; i++){
        const yp = iy+i
        if (yp<0 || yp>=this.octopi.length) continue
        for (let j=-1; j<=1; j++){
          if (i==0 && j==0) continue
          const xp = ix+j
          if (xp<0 || xp>=this.octopi[yp].length) continue
          if (this.octopi[yp][xp]>0) { 
            this.octopi[yp][xp]++
          }
        }
      }
    }

  }

}

