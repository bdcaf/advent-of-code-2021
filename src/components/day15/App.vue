<template>
  <div class="app">
    <h3>Input</h3>
    <textarea v-model="input" 
              @input="parseInput"
              style="width:100%;height:20vh"
      />
      <div class="buttons">
      <button @click="resetInput">reset</button>
      </div>
      <h3>Result</h3>
      <div class="answer">
        <p :style="[done1 ? {'color':'red'}:{}]">part 1: {{ answer1 }}</p>
        <p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>
        <!--<p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>-->
      </div>
      <h3>Details</h3>
      <button @click="run1">run part 1</button>
      <button @click="run2">run part 2</button>
      <button @click="stop">stop</button>
      <table>
        <tr v-for="(l,y) in cave.map" :key="y">
          <td v-for="(o,x) in l" :key="x" 
              :style="[o.visited ? {'background':'palegreen'}:{}, o.onPath?{'color':'red'}:{}, o.onPath?{'font-weight':'bold'}:{},
              ]"
              style="font-size:x-small"
              > {{ o.value }} </td>
        </tr>
      </table>

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
</style>
