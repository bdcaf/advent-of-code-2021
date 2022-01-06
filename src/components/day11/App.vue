<template>
  <div class="app">
    <h3>Input</h3>
    <textarea v-model="input" 
              @input="parseInput"
              style="width:100%;"
      />
      <div class="buttons">
      <button @click="resetInput">reset</button>
      </div>
      <h3>Result</h3>
      <div class="answer">
        <p :style="[done1 ? {'color':'red'}:{}]">part 1: {{ answer1 }}</p>
        <p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>
      </div>
      <h3>Details</h3>
      <button @click="run1">run octopi</button>
      <button @click="stop">stop</button>
      <p>round: {{counter}}</p>
      <p>current flashes: {{currFlash}}</p>
      <p>total flashes: {{totalFlash}}</p>
      <div style="display:flex;flex-wrap: wrap;justify-content: center;">
        <table>
          <tr v-for="(row, ri) in octopi" :key="ri">
            <td v-for="(cell,ci) in row" :key="ci" :style="[cell==0 ? {'color':'red'}:{}]">{{ cell }}</td>
          </tr>
        </table>
      </div>
  </div>
</template>

<script src='./index.js'/>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smokothing: grayscale;
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
