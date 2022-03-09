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
      <div v-if="show1">
        <div>Step: {{ step1 }} / {{part1N}}  </div>
        <div style="overflow-wrap:break-word">Polymer (Length: {{ polymer.length }}): <template v-for="(char) in polymer">{{ char }}</template></div>
      </div>
      <div v-if="show2">
        <div>Step: {{ step1 }}  / {{part2N}}  </div>
        <div style="overflow-wrap:break-word">Polymer (Length: {{ length2 }}): 
          most common: {{ extreme2[0][0] }} ({{ extreme2[0][1] }})
          , least common: {{ extreme2[1][0] }} ({{ extreme2[1][1] }})
        </div>
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
</style>
