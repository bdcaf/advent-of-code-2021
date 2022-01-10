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
        <!--<p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>-->
      </div>
      <h3>Details</h3>
      <button @click="run1">run</button>
      <button @click="stop">stop</button>
      <ul>
        <li v-for="(fold, vi) in folds" :key="vi"
            :style="[vi == activeFold ? {'color':'red'}:{}]">{{fold[0]}}</li>
      </ul>
      <div># visible points: {{answer2}}</div>
      <table v-if="doShow">
        <tr v-for="(tr,ir) in paper" :key="ir">
          <td v-for="(td,id) in tr" :key="id"
              style="width:1em"
              >{{td?'#':'.'}}</td>
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
