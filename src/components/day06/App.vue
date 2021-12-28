<template>
  <div class="app">
    <h3>Input</h3>
    <textarea v-model="input" 
              @input="parseInput"
      placeholder="add multiple lines"/>
      <div class="buttons">
      <button @click="resetInput">reset</button>
      <button @click="parseInput">parse</button>
      <button @click="runEx">run Example</button>
      <button @click="run1">run part 1</button>
      <button @click="run2">run part 2</button>
      </div>
      <div class="answer">
        <p :style="[doneEx1 ? {'color':'red'}:{}]">exapmle 1: {{ answerEx1 }}</p>
        <p :style="[done1 ? {'color':'red'}:{}]">part 1: {{ answer1 }}</p>
        <p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>
      </div>
      <h4>Overview count fishes</h4>
      <ul>
        <li v-for="(count,index) in fish_agg" :key="index">{{ index }} : {{ count }}</li>
      </ul>
      <div v-if="fishes.length<100" style="display:flex;flex-wrap: wrap;justify-content: center;">
        <div class="lanternfish" v-for="(fish,index) in fishes.slice(0,100)" :key="index"
                                 :style="[fish == 0 ? {'background':'OrangeRed'}:{}]"
                                 >
                                 {{ fish }}
        </div>
      </div>
      <div v-else>Won't display more than 100 lanternfish</div>
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
