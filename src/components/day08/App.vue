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
      <div style="display:flex;flex-wrap: wrap;justify-content: center;">
        <div style="max-width: 20em;">
          active: {{ active }}
      <button @click="run1">run </button>
          <pre style="width: 10em;">
 {{ raw }}
          </pre>
        </div>
        <div style="width: 10em;">
          <h5>found</h5>
          <ul>
            <li v-for="(n, k) in current.numberFound" :key="k">{{ k }} {{ n }}</li>
          </ul>
        </div>
        <div style="width:10em">
          <h5>remaining</h5>
          <ul>
            <li v-for="(n, k) in current.digits" :key="k">"{{ n }}"</li>
          </ul>
        </div>
      </div>
      <h5>inputs</h5>
        <ul>
          <li v-for="(dig, index) in digits" :key=index>
            <div class="data">
              input: <template v-for="(d0) in dig.input">"{{d0.string}}"<template v-if="d0.value2!=undefined">({{d0.value2}})</template>, </template>
            </div>
            <div class="data">
              output: <template v-for="(d0) in dig.output">"{{d0.string}}"<template v-if="d0.value2!=undefined">({{d0.value2}})</template>, </template>
            </div>
            value: {{ dig.outVal}}
          </li>
        </ul>
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
