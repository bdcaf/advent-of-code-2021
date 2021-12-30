<template>
  <div class="app">
    <h3>Input</h3>
    <textarea v-model="input" 
              @input="parseInput"
              style="width:100%;"
      placeholder="add multiple lines"/>
      <div class="buttons">
      <button @click="resetInput">reset</button>
      </div>
      <h3>Result</h3>
      <div class="answer">
        <p :style="[done1 ? {'color':'red'}:{}]">part 1: {{ answer1 }}</p>
        <p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>
      </div>
      <h3>Details</h3>
      <button @click="run1">run grow</button>
      <div style="display:flex;flex-wrap: wrap;justify-content: center;">
        <table>
          <tr v-for="(row,ri) in basin" :key="ri">
            <td v-for="(cell,ci) in row" :key="ci"
                :style="[cell.is_min ? {'font-weight':'bold'}:{}, cell.group==undefined?{}:{'color':colors[cell.group%colors.length]}]"
              >{{ cell.value }}</td>
          </tr>
        </table>
        <div style="padding:2em">
          counts: 
          <ul style="display:flex;list-style:none;flex-wrap: wrap;"> 
            <li v-for="(c,i) in counts"
                :style=" {'color':colors[i%colors.length]}"
                style="padding:.3em"
                :key="i"
                >{{c}}</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script src='./index.js'/>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.lanternfish {
border-radius: 25px;
padding: 20px; 
margin: 6px;
background: PaleTurquoise;
}
</style>
