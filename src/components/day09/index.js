const defaultInput = `
2199943210
3987894921
9856789892
8767896789
9899965678
`.trim()

function safeArr(arr, r, c){
  if (arr[r] != undefined && arr[r][c] != undefined) 
    return arr[r][c]
}
function surround(arr,r,c){
  return [
    safeArr(arr,r-1,c),
    safeArr(arr,r+1,c),
    safeArr(arr,r,c-1),
    safeArr(arr,r,c+1),
  ].filter(x=>x != undefined)
}
function findMin(arr){
  const minimaPos = []
  let group = 0
  for (let ri=0; ri< arr.length;ri++){
    for (let ci=0; ci< arr[ri].length; ci++){
      const curr = arr[ri][ci]
      const surr = surround(arr,ri,ci)
      curr.is_min = surr.map(x=>x.value).reduce((p,v) => p && (v>curr.value), true)
      if(curr.is_min) {
        curr.group = group++
        minimaPos.push({row: ri, col:ci, group: curr.group})
      }
    }
    }
  return minimaPos 
}

function growBasin(arr,cand0){
  const fixed = new Set()
  let cand = [cand0]
  while (cand.length > 0 ) {
    let newCand = cand
      .map(e=>[
        {row: e.row+1, col:e.col},
        {row: e.row-1, col:e.col},
        {row: e.row, col:e.col+1},
        {row: e.row, col:e.col-1},
      ])
      .reduce((p,v)=>p.concat(v),[])
      .filter(function(v){
        if (v.row < 0 || v.col < 0) return false
        if (v.row >= arr.length || v.col >= arr[0].length) return false
        if (fixed.has(v.row + 'x' + v.col)) return false
        const q=safeArr(arr,v.row,v.col)
        return  q.value!=9
      })
    cand.forEach(x=>fixed.add(x.row + 'x' + x.col))
    cand = newCand
  }

  return fixed
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
  }},
  methods:{
    resetInput(){
      this.input = defaultInput
      this.parseInput()
    },
    parseInput(){
      // reset
      clearInterval(this.interval)

      this.basin = this.input
        .split(/\r?\n/)
        .map(x=>x.split('').map(y=>({
          value:parseInt(y,10),
          is_min: false
        })))
      
      this.minima = findMin(this.basin)

      this.answer1 = this.basin
        .reduce((p,v)=>p.concat(v),[])
        .filter(y=>y.is_min)
        .map(y=>y.value+1)
        .reduce((p,v)=>p+v)
      this.done1=true

      const basins = this.minima
        .map(x=>growBasin(this.basin,x))
      this.answer2 = basins.map(x=>x.size)
        .sort((a,b)=>b-a)
        .slice(0,3)
        .reduce((p,v)=>p*v,1)
      this.done2=true

    },
    run1(){
      clearInterval(this.interval)
      this.basin.forEach(v=>v.forEach(w=>w.group=undefined))
      const dur = 600
      this.interval = setInterval( this.move1 , dur);
      this.active = this.minima
    },
    move1(){
      const basin = this.basin
      let newCand = this.active
        .map(e=>[
          {row: e.row+1, col:e.col, group: e.group},
          {row: e.row-1, col:e.col, group: e.group},
          {row: e.row, col:e.col+1, group: e.group},
          {row: e.row, col:e.col-1, group: e.group},
        ])
        .reduce((p,v)=>p.concat(v),[])
        .filter(function(v){
          if (v.row < 0 || v.col < 0) return false
          if (v.row >= basin.length || v.col >= basin[0].length) return false
          if (basin[v.row][v.col].group==v.group) return false
          return basin[v.row][v.col].value!=9
        })
      this.active.forEach(v=>{this.basin[v.row][v.col].group =  v.group})
      this.active = newCand

      if (this.active.length == 0){
        clearInterval(this.interval)
      }
    },
  }

}

