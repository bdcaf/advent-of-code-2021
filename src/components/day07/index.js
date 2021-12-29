import { Chart, Grid, Bar, Line } from 'vue3-charts'
const defaultInput = `16,1,2,0,4,2,7,1,2,14`.trim()

export default {
  name: 'App',
  components: {
    Chart,
    Grid,
    Bar,
    Line
  },
  mounted(){
    this.parseInput()
  },
  data(){return {
    input: defaultInput,
    doneEx1: false,
    done1: false,
    done2: false,
    answerEx1: NaN,
    answer1: NaN,
    answer2: NaN,
    crabs: [],
    range: [NaN, NaN],
    positionList: [],
    chartPos: [],
  }},
  methods:{
    resetInput(){this.input = defaultInput},
    parseInput(){
      // reset
      clearInterval(this.interval)

      this.crabs = this.input.trim()
        .split(/,/)
        .map((x)=> parseInt(x,10))


      this.range = [Math.min(...this.crabs), Math.max(...this.crabs)]
      this.positionList = Array(this.range[1]-this.range[0]+1).fill(0)
      this.crabs.forEach(x=>this.positionList[x-this.range[0]]++)

      const distfun = (x) => this.positionList.map((v,k)=>v*Math.abs(x-k)).reduce((p,v)=>p+v, 0)
      const distfun2 = (x) => this.positionList.map((v,k)=>{
        let d0 = Math.abs(x-k)
        return v*d0*(d0+1)/2
      }).reduce((p,v)=>p+v, 0)
      const distances = this.positionList.map((v,k)=>distfun(k))
      const distances2 = this.positionList.map((v,k)=>distfun2(k))
      const fac = 1.0 * Math.max(...this.positionList) / Math.max(...distances)
      const fac2 = 1.0 * Math.max(...this.positionList) / Math.max(...distances2)

      this.chartPos = this.positionList.map((v,k)=>({x:k+1, y:v, 
        d:distances[k]*fac,
        d2:distances2[k]*fac2,
      }))

      //let min = distances[0]
      //let minP = 0
      //distances.forEach((v,k)=>{
        //if (v<min){
          //min = v
          //minP=k
        //}
      //})
      this.answer1 = Math.min(...distances)
      this.answer2 = Math.min(...distances2)

    },
  }

}

