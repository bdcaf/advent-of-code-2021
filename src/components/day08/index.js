const defaultInput = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`.trim()

function toValue1 (x){
  switch (x.length){
    case 2:
      return 1
    case 3:
      return 7
    case 4:
      return 4
    case 7:
      return 8
  }
  return undefined
}
function overlap(x,y){
  const xl = x.split('')
  const yl = y.split('')
  return xl.filter(z=>yl.includes(z)).length
}
function strsort(x){
  return x.split('').sort().join('')
}
function toValue2 (x){
  const input = x.input.map(z=>strsort(z.string))
  const v1 = input.filter(x=>x.length==2)[0]
  const v7 = input.filter(x=>x.length==3)[0]
  const v4 = input.filter(x=>x.length==4)[0]
  const v8 = input.filter(x=>x.length==7)[0]

  let undecided = input.filter(z=> ![v1,v7,v4,v8].includes(z))

  const v6 = undecided
    .filter(z=>overlap(z,v8)==6)
    .filter(z=>overlap(z,v1)==1)[0]
  undecided = undecided.filter(z=>z!=v6)

  const v3 = undecided
    .filter(z=>overlap(z,v8)==5)
    .filter(z=>overlap(z,v1)==2)[0]
  undecided = undecided.filter(z=>z!=v3)

  const v9 = undecided
    .filter(z=>overlap(z,v8)==6)
    .filter(z=>overlap(z,v4)==4)[0]
  undecided = undecided.filter(z=>z!=v9)

  const v0 = undecided
    .filter(z=>overlap(z,v8)==6)[0]
  undecided = undecided.filter(z=>z!=v0)

  const v5 = undecided
    .filter(z=>overlap(z,v4)==3)[0]
  undecided = undecided.filter(z=>z!=v5)

  const v2 = undecided[0]

  const trans = {}
  trans[v1] = 1
  trans[v2] = 2
  trans[v3] = 3
  trans[v4] = 4
  trans[v5] = 5
  trans[v6] = 6
  trans[v7] = 7
  trans[v8] = 8
  trans[v9] = 9
  trans[v0] = 0

  x.input.forEach((y)=>{y.value2 = trans[strsort(y.string)]})
  x.output.forEach((y)=>{y.value2 = trans[strsort(y.string)]})
  x.outVal = x.output.map(y=>y.value2)
    .reduce((p,v)=>10*p+v,0)

  return x
}

function to7(xl){
  const before = Math.floor((7 - xl.length)/2)
  const after = 7 - before - xl.length
  return (Array(before).fill('-')).concat(xl).concat(Array(after).fill('-'))
}

export default {
  name: 'App',
  components: {
  },
  mounted(){
    this.parseInput()
  },
  data(){return {
    input: defaultInput,
    digits: [],
    doneEx1: false,
    done1: false,
    done2: false,
    answerEx1: NaN,
    answer1: NaN,
    answer2: NaN,
    active: 0,
    current: {},
    raw: "loading 123",
  }},
  methods:{
    resetInput(){this.input = defaultInput},
    parseInput(){
      // reset
      clearInterval(this.interval)

      const toOut = (x)=>{
        const tmp = x.split(/ *\| */)
          .map(x=>x.split(/ /).map(y=>({string:y, value:toValue1(y)})))
        return {
          input: tmp[0],
          output: tmp[1],
        }
      }

      this.digits = this.input.trim()
        .split(/\r?\n/)
        .map(toOut)
        .map(toValue2)

      const answer1 = this.digits
        .map(x=>x.output.filter(y=>y.value!=undefined).length)
        .reduce((p,v)=>p+v,0)

      this.answer1 = answer1
      this.done1 = true

      this.answer2 = this.digits.map(x=>x.outVal)
        .reduce((p,v)=>p+v,0)
      this.done2 = true
      this.placeSet()
    },
    run1(){
      clearInterval(this.interval)
      this.active=0
      const dur = 600
      this.interval = setInterval( this.move1 , dur);
    },
    move1(){
      if (this.active >= this.digits.length){
        clearInterval(this.interval)
      }
      if (this.current.solved){
        this.active++
        if (this.active >= this.digits.length){
          clearInterval(this.interval)
        }
        this.placeSet()
      } else {
        this.solveStep()
        this.currSegment()
      }
      
    },
    nextSet(){
      this.placeSet()
    },
    placeSet(){
      const found = Array(10).fill('-')
      this.current = {
        digits: this.digits[this.active].input.map(x=>strsort(x.string)),
        numberFound: found,
        segments: Array(7).fill("abcdefg".split('')),
        solved: false
      }
      this.currSegment()
    },
    cleanCurr(v,keep){
        const list = v.split('')
        for(let k=0; k< this.current.segments.length; k++){
          if (keep.includes(k)){
            this.current.segments[k]= this.current.segments[k].filter(y=>list.includes(y))
          } else {
            this.current.segments[k]= this.current.segments[k].filter(y=>!list.includes(y))
          }
        }
    },
    solveStep(){
      if (this.current.numberFound[8]=='-'){
        const v= this.current.digits
          .filter(x=>x.length==7)[0]
        this.current.numberFound[8] = v
      } else if (this.current.numberFound[1]=='-'){
        const v= this.current.digits
          .filter(x=>x.length==2)[0]
        this.current.numberFound[1] = v
        this.cleanCurr(v,[2,5])
      } else if (this.current.numberFound[7]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==3)[0]
        console.log(7,v)
        this.current.numberFound[7] = v
        this.cleanCurr(v,[2,5,0])
      } else if (this.current.numberFound[4]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==4)[0]
        this.current.numberFound[4] = v
        this.cleanCurr(v,[2,5,3,1])
      } else if (this.current.numberFound[6]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==6)
          .filter(x=>overlap(x,this.current.numberFound[1])==1)[0]
        this.current.numberFound[6] = v
        this.cleanCurr(v,[0,1,3,4,5,6])
      } else if (this.current.numberFound[3]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==5)
          .filter(x=>overlap(x,this.current.numberFound[1])==2)[0]
        this.current.numberFound[3] = v
        this.cleanCurr(v,[0,2,3,5,6])
      } else if (this.current.numberFound[9]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==6)
          .filter(x=>overlap(x,this.current.numberFound[3])==5)[0]
        this.current.numberFound[9] = v
      } else if (this.current.numberFound[0]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==6)[0]
        this.current.numberFound[0] = v
      } else if (this.current.numberFound[5]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==5)
          .filter(x=>overlap(x,this.current.numberFound[4])==3)[0]
        this.current.numberFound[5] = v
      } else if (this.current.numberFound[2]=='-') {
        const v = this.current.digits
          .filter(x=>x.length==5)[0]
        this.current.numberFound[2] = v
      } else {
        this.current.solved = true
      }
      this.current.digits=this.current.digits
        .filter(x=>!this.current.numberFound.includes(x))
    },
    currSegment(){
      if (this.current.segments == undefined){
        return "loading"
      }
      const sl = this.current.segments
        .map(to7)
      const res=Array(17).fill('-')
      res[0] = sl[0].join('')
      for (let i=0; i<7;i++){
        res[1+i] = sl[1][i] + '       ' + sl[2][i]
      }
      res[8] = ' ' + sl[3].join('') + ' '
      for (let i=0; i<7;i++){
        res[9+i] = sl[4][i] + '       ' + sl[5][i]
      }
      res[16] = ' ' + sl[6].join('') + ' '
      this.raw = res.join('\n')
    }
  }

}

