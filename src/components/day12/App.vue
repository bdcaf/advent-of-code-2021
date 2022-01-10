<template>
  <div class="app">
    <h3>Input</h3>
    <textarea v-model="input" 
              @input="parseInput"
              style="width:100%;"
      />
      <div class="buttons">
      <button @click="resetInput">reset</button>
      <button @click="resetLonger">longer Input</button>
      <button @click="resetEvenLonger">even longer Input</button>
      </div>
      <h3>Result</h3>
      <div class="answer">
        <p :style="[done1 ? {'color':'red'}:{}]">part 1: {{ answer1 }}</p>
        <p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>
      </div>
      <h3>Details</h3>
      <button @click="run1">run 1</button>
      <button @click="run2">run 2</button>
      <button @click="stop">stop</button>
        <div id="network" style="width: 50vw; height: 50vh; border: 1px solid lightgray;" />
          <div> <b>current path:</b> <template v-for="val in path">{{val.label}} - </template></div>
          <div> <b>found paths:</b>
            <ul v-if="listOfPaths.length < 100">
          <li v-for="(p0, pi) in listOfPaths" :key="pi"> <template v-for="val in p0">{{val}}-</template></li>
            </ul>
            <template v-else> {{answer1}}/{{answer2}} </template>
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
