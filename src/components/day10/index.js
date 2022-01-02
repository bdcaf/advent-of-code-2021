const defaultInput = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`.trim()

function toScore1(v){
  switch (v.symbol){
    case ')':
      return 3
    case ']':
      return 57 
    case '}':
      return 1197 
    case '>':
      return 25137
  }
}
function toScore2(v){
  switch (v){
    case ')':
      return 1
    case ']':
      return 2 
    case '}':
      return 3 
    case '>':
      return 4
  }
}
function parse(v, ind){
  switch ( v.input[ind].symbol){
    case '<':
      v.stack.unshift('>')
      break
    case '[':
      v.stack.unshift(']')
      break
    case '(':
      v.stack.unshift(')')
      break
    case '{':
      v.stack.unshift('}')
      break
    default:
      {
        let should = v.stack.shift()
        if (should != v.input[ind].symbol){
          v.input[ind].error = true
        }
      }
  }
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
    basin: [],
    done1: false,
    done2: false,
    answer1: NaN,
    answer2: NaN,
    active: 0,
    current: {},
    colors: [
      'red',
      'green',
      'blue',
      'orange',
      'cyan',
      'magenta',
      'blueviolet',
      'brown',
      'darkgreen',
      'deeppink',
      'indigo',
    ],
    lines:[],
    position: 0,
    missing:[],
  }},
  methods:{
    resetInput(){
      this.input = defaultInput
      this.parseInput()
    },
    parseInput(){
      // reset
      clearInterval(this.interval)

    this.lines=this.input
        .trim()
        .split(/\r?\n/)
        .map(x=>x.split('').map(y=>({symbol:y, active:false,  error:false})))
      this.missing=new Array(this.lines.length).map(()=>[])

    },
    run1(){
      clearInterval(this.interval)
      this.position=0
        this.done1=false
        this.done2=false
      this.parserList = this.lines.map((x)=>({stack:[], input:x}))
      this.missing = this.parserList.map(x=>x.stack)
      const dur = 300
      this.interval = setInterval( this.move1 , dur);
    },
    move1(){
      this.parserList.forEach(x=>parse(x,this.position))

      this.position++
      this.parserList = this.parserList.filter(x=>x.input.length > this.position)

      this.answer1 = this.lines.map(x=>x.filter(y=>y.error)[0])
        .filter(x=>x!=undefined)
        .map(toScore1)
        .reduce((p,v)=>p+v,0)
      const scores = this.lines.map((x,i) => ({err: x.reduce((p,v)=>p||v.error, false),
        rem: this.missing[i]
      })).filter(x=>!x.err)
        .map(x=>x.rem.map(toScore2).reduce((p,v)=>5*p+v,0))
        .sort((a,b)=>a-b)
      this.answer2=scores[ Math.floor(scores.length/2) ]

        if (this.parserList.length == 0){
        clearInterval(this.interval)
        this.done1=true
        this.done2=true
      }
    },
  }

}

