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
      <button @click="run1">run parsing</button>
      <div style="display:flex;flex-wrap: wrap;justify-content: center;">
        <div style="padding:2em">
          codes: 
          <ul> 
            <li v-for="(c,i) in lines"
                :key="i"
                >
                <template v-for="(entry,ind) in c"> 
                  <template v-if="entry.error"><i :key="ind" style="color:red;">{{entry.symbol}}</i></template>
                  <template v-else-if="ind==position"><b :key="ind" style="color:cyan;">{{entry.symbol}}</b></template>
                  <template v-else>{{entry.symbol}}</template>
                </template>
                <i style="color:orange">
                <template v-for="(entry) in missing[i]"> 
                  {{entry }}
                </template>
                </i>
            </li>
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
