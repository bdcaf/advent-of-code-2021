<template >
  <div id="app">
    <label for="code">input:</label>
    <textarea id="code" v-model="inputText" rows="4" cols="14"/>
      <div class="control">
        <button v-on:click="run1">run part1</button>
        <button v-on:click="run2">run part2</button>
        <button v-on:click="reset">reset</button>
        <button v-on:click="stop=true">stop</button>
      </div>

        <ul :style="valid ? { 'font-weight': 'bold' } : { 'color': 'gray' }">
          <li> Answer Part 1: {{ answer }} </li>
          <li> Answer Part 2: {{ answerB }} </li>
        </ul> 

        <div v-if="activePart==1" style="display:flex;justify-content: center;">
          <div>
            answer: Answer Part 1: {{ answer }} <br/>
            (gamma: {{gamma}}, epsilon: {{epsilon}})<br/>
            <canvas id="day3-result-canvas" v-bind:width="canvasw" v-bind:height="canvashr" style=" border: 1px solid red;"></canvas>
          </div>

          <div style="max-height: 400px; overflow:scroll;">
            input:<br/>
            <canvas id="day3-input-canvas" v-bind:width="canvasw" v-bind:height="canvash" style="border: 1px solid gray;"></canvas>
          </div>
        </div>

        <div v-else style="display:flex;justify-content: center; max-height: 400px; overflow: scroll;">
          <div style="padding:1em">
            <div v-bind:style="cands.oxy.length==1?{'color':'red'}:{'color':'gray'}">oxygen: {{ oxygenNumber }}
            </div>
            <canvas id="day3-result-oxygen" v-bind:width="canvasw" v-bind:height="canvash" style=" border: 1px solid blue;"></canvas>
          </div>
          <div style="padding:1em">
            <div v-bind:style="cands.co2.length==1?{'color':'red'}:{'color':'gray'}">
            co2: {{ co2Number }}
            </div>
            <canvas id="day3-result-co2" v-bind:width="canvasw" v-bind:height="canvash" style=" border: 1px solid red;"></canvas>
          </div>
        </div>
  </div>
</template>
  <script src='./index.js' />
<style scoped src="./Day.css"/>
