<template >
<div id="day04">
  <h2>Day 2</h2>
  <label for="code">input</label><br/>
  <textarea id="code" v-model="inputText" 
    @input="parse" rows="10" cols="14"/>
    <div class="control">
      <button v-on:click="parse">parse</button>
      <button v-on:click="run1">run </button>
      <button v-on:click="reset">reset</button>
      <button v-on:click="stop=true">stop</button>
    </div>

    <ul :style="valid ? { 'font-weight': 'bold' } : { 'color': 'gray' }">
      <li> Answer Part 1: {{ answer }} </li>
      <li> Answer Part 2: {{ answerB }} </li>
    </ul> 

    <div >
      <b>numbers:</b>
      <template v-for="(number) in draws">{{number}},</template>
    </div>
    <div style="display:flex;flex-wrap: wrap;justify-content: center;">
      <Bingo 
        v-for="(field, index) in fields" 
        v-bind:key="field.hash"
        v-bind:position="index"
        v-bind:field="field.field"
        v-bind:selected="selected"
        @bingo-win="bingoWon"
        />
    </div>
</div>
</template >
<script src='./index.js'>
<style scoped src="./Day.css"/>
