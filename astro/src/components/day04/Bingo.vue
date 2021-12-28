<template>
  <div class="bingo-field">
    Table {{ position }} 
    <div :class="{ won }">score {{ score }}</div>
    <div v-if="won" :class="{ won }">answer {{ answer }}</div>
    <table>
      <tr v-for="(line, index) in field" v-bind:key="index">
        <td v-for="(entry,index) in line" 
            v-bind:key="index"
            v-bind:style="entry.marked ? {'color':'red'}:{}"> 
          {{ entry.value}} 
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Bingo',
  data: function(){return{
    won: false,
    answer: 0,
    score: 0,
       }},
  props: { 
    field: Array, 
    position: Number, 
    selected: Number,
  },
  emits:['bingo-win'],
  watch: {
    selected: function(newVal){
      if (this.won) return
      for (let j in this.field){
        for (let k in this.field[j]){
          if (this.field[j][k].value == newVal) {
            this.field[j][k].marked = true}
        } 
      }
      let test = this.field.map((x)=>x.map((y)=>y.marked))
      let rowTest = test.map((x)=>x.reduce((y,pre)=>y&&pre, true))
        .reduce((x,p)=>x||p, false)

      let cols = test[0].map((c,i)=>test.map(x=>x[i]))
      let colTest = cols.map((x)=>x.reduce((y,pre)=>y&&pre, true))
        .reduce((x,p)=>x||p, false)
      this.won = colTest || rowTest
      this.score = this.field.map((x)=>x.filter((y)=>!y.marked).map(x=>x.value).reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b,0)
      this.answer = this.score*newVal
      if (this.won) this.$emit('bingo-win', this.answer, this.position)
    },
  },
  }
</script>

<style scoped>
.bingo-field{
  padding: 1em;
}
td {
  padding: .1em;
}
.won {
  font-weight: bold;
}
</style>
