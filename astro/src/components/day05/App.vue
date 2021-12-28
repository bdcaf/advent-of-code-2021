<template>
  <div class="day05">
    <h3>Input</h3>
    <textarea v-model="input" 
              @input="parseInput"
      placeholder="add multiple lines"/>
      <div class="buttons">
      <button @click="resetInput">reset</button>
      <button @click="run1">run part 1</button>
      <button @click="run2">run part 2</button>
      </div>
      <div class="answer">
        <p :style="[done1 ? {'color':'red'}:{}]">part 1: {{ answer1 }}</p>
        <p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>
      </div>
    <div style="display:flex;flex-wrap: wrap;justify-content: center;">
      <table v-if="table.length < 30" style="max-height: 60vh; max-width:60vw;overflow:scroll" >
        <tr>
          <td>r/c</td>
          <td v-for="(cell, cind) in table[0]" :key="cind">{{ range[0] + cind }}</td>
        </tr>
        <tr v-for="(line, lind) in table" :key="lind">
          <td>{{ range[2]+lind }}</td>
          <td v-for="(cell, cind) in line" :key="cind" :style="[cell>1 ? {'color':'red'}:{}]">{{cell }}</td>
        </tr>
      </table>
      <div style="max-height: 60vh; max-width:60vw;overflow:scroll">
        <canvas id="day5-canvas" v-bind:width="canvasw" v-bind:height="canvash" style=" border: 1px solid red;"></canvas>
      </div>
      <ul style="max-height: 60vh; overflow:scroll">
        <li v-for="(item,index) in parsed" :key="index" :style="[index == tableLine ? {'color':'red'}:{}]">{{ item }}</li>
      </ul>

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
</style>
