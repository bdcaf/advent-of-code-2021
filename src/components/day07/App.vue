<template>
  <div class="app">
    <h3>Input</h3>
    <textarea v-model="input" 
              @input="parseInput"
      placeholder="add multiple lines"/>
      <div class="buttons">
      <button @click="resetInput">reset</button>
      <button @click="parseInput">parse</button>
      <button @click="run1">run part 1</button>
      <button @click="run2">run part 2</button>
      </div>
      <div class="answer">
        <p :style="[done1 ? {'color':'red'}:{}]">part 1: {{ answer1 }}</p>
        <p :style="[done2 ? {'color':'red'}:{}]">part 2: {{ answer2 }}</p>
      </div>
      <div class="visualization">
        <div class="positions" v-if="positionList<30">
          <div 
            class="crab"
            v-for="(count,index) in positionList" :key="index">{{ count }} </div>
        </div>
        <Chart :data="chartPos" >
        <template #layers>
          <Bar :dataKeys="['x', 'y']" :barStyle="{ fill: '#90e0ef' }" />
          <Line :dataKeys="['x', 'd']"  hideDot="true" />
          <Line :dataKeys="['x', 'd2']" :lineStyle="{ stroke: '#e080ef' }"  hideDot="true"/>
        </template>
  </Chart>
      </div>
  </div>
</template>

<script src='./index.js' />

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.positions {
  display:flex;flex-wrap: wrap;
  justify-content: center;
}
.crab {
border-radius: 25px;
padding: 20px; 
margin: 6px;
background: PaleTurquoise;
}
</style>
