const defaultInput = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
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
    parsed: [],
    range: [NaN,NaN,NaN,NaN],
    tableLine: 0,
    table: [[]],
    done1: false,
    done2: false,
    answer1: NaN,
    answer2: NaN,
    canvasw: 3,
    canvash: 3,
  }},
  methods:{
    resetInput(){this.input = defaultInput},
    parseInput(){
      // reset
      this.done1=false
      this.tableLine=0
      clearInterval(this.interval)

      // parse
      let map2pair = (str) => str
        .split(/,/)
        .map((x)=>parseInt(x,10))
      let toLine = (str) => str.split(/ +-> +/)
        .map(map2pair)

      this.parsed = this.input.trim()
        .split(/\r?\n/)
        .map(toLine)
        .map((x)=> ({
          start: x[0], 
          end: x[1], 
          done:false
        }))

      let helper = this.parsed.map(x => [
      Math.min(x.start[0], x.end[0]), 
      Math.max(x.start[0], x.end[0]), 
      Math.min(x.start[1], x.end[1]), 
      Math.max(x.start[1], x.end[1]), 
    ])
      this.range = [
        Math.min(...(helper.map(x=>x[0]))), 
        Math.max(...(helper.map(x=>x[1]))), 
        Math.min(...(helper.map(x=>x[2]))), 
        Math.max(...(helper.map(x=>x[3]))), 
    ]

      //this.table = Array(this.range[3]-this.range[2]).from(()=>Array(this.range[1]-this.range[0]).fill(0))
      //this.table = Array(this.range[3]-this.range[2]).from(0)

    },
    incXY(x,y){
      try {
      this.table[y - this.range[2]][x-this.range[0]]++
      } catch (e) {
        clearInterval(this.interval)
        console.log(this.tableLine, x,x-this.range[0], y, y - this.range[2],this.range)
        console.log(this.tableLine, this.table.length)
      }
    },
    run1(){
      this.done1=false
      this.tableLine=0
      clearInterval(this.interval)
      this.table = []
      for (var i=0; i<=this.range[3]-this.range[2];i++){
        this.table[i]=Array(this.range[1]-this.range[0]+1).fill(0)
      }
      this.canvasw=this.range[1]-this.range[0]+1
      this.canvash=this.range[3]-this.range[2]+1
      let canvas = document.querySelector('#day5-canvas')
      if (canvas!=null){
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
      }
      let dur = 30
      this.interval = setInterval( this.move1 , dur);
    },
    move1(){
      let line = this.parsed[this.tableLine]
      if (line.start[0] == line.end[0] || line.start[1] == line.end[1]){
        console.log(this.table)
        line.done=true
        var i;
        if (line.start[0] == line.end[0]){
          let start = Math.min(line.start[1], line.end[1])
          let end = Math.max(line.start[1], line.end[1])
          for ( i=start; i<=end; i++)
            this.incXY(line.start[0], i)
        } else if (line.start[1] == line.end[1]){
          let start = Math.min(line.start[0], line.end[0])
          let end = Math.max(line.start[0], line.end[0])
          for ( i=start; i<=end; i++)
            this.incXY(i,line.start[1])
        }

        let canvas = document.querySelector('#day5-canvas')
        if (canvas!=null){
          let context = canvas.getContext('2d')
          context.globalAlpha = 0.3;
          context.beginPath();
          context.lineWidth = 1;
          context.strokeStyle = 'rgb(255,0,0)';
          context.moveTo(line.start[0]-this.range[0], line.start[1] - this.range[2]);
          context.lineTo(line.end[0]-this.range[0], line.end[1] - this.range[2]);
          context.stroke();
          context.globalAlpha = 1;
        }
      }

      this.answer1 = this.table.map( x=>x.filter(y=>y>1).length)
        .reduce((p,c)=>p+c, 0)


      this.tableLine++
      if (this.tableLine >= this.parsed.length){
        clearInterval(this.interval)
        this.done1=true
      }
    },
    run2(){
      this.done2=false
      this.tableLine=0
      clearInterval(this.interval)
      this.table = []
      for (var i=0; i<=this.range[3]-this.range[2];i++){
        this.table[i]=Array(this.range[1]-this.range[0]+1).fill(0)
      }
      this.canvasw=this.range[1]-this.range[0]+1
      this.canvash=this.range[3]-this.range[2]+1
      let canvas = document.querySelector('day5-canvas')
      if (canvas!=null){
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
      }
      let dur = 30
      this.interval = setInterval( this.move2 , dur);
    },
    move2(){
      let line = this.parsed[this.tableLine]
        let dir = [
          Math.sign(line.end[0]-line.start[0]),
          Math.sign(line.end[1]-line.start[1]),
        ]
        let steps = Math.max(
          Math.abs(line.end[0] - line.start[0]),
          Math.abs(line.end[1] - line.start[1]),
        ) + 1
        var pos = [...line.start]
      for (var i = 0; i<steps; i++){
        this.incXY(pos[0], pos[1])
        pos[0]+=dir[0]
        pos[1]+=dir[1]
      }

      this.answer2 = this.table.map( x=>x.filter(y=>y>1).length)
        .reduce((p,c)=>p+c, 0)

      let canvas = document.querySelector('#day5-canvas')
      if (canvas!=null){
        let context = canvas.getContext('2d')
        context.globalAlpha = 0.3;
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = 'rgb(255,0,0)';
        context.moveTo(line.start[0]-this.range[0], line.start[1] - this.range[2]);
        context.lineTo(line.end[0]-this.range[0], line.end[1] - this.range[2]);
        context.stroke();
        context.globalAlpha = 1;
      }

      this.tableLine++
      if (this.tableLine >= this.parsed.length){
        clearInterval(this.interval)
        this.done2=true
      }
    },
  }

}

