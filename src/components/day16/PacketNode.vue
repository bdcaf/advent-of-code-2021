<template>
<div class="box">
  <div class="sign">
    <ul>
      <li> version: {{node.version}} </li>
      <li> id: {{node.id}} </li>
      <li> type: {{node.type}} </li>
      <li v-if="node.type=='operator'">operation: {{node.operation}}</li>
    </ul>
  </div>
  <div v-if="Array.isArray(node.res)">
    <PacketNode v-for="(n,i) in node.res" 
                :key="i"
                :node="n"
    />
  </div>
  <div v-else class="value">
    value: {{ node.res }}
  </div>
</div>
</template>

<script>
export default {
  name: 'PacketNode',
  props: {
    node: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.box {
  padding: 1em;
  margin: .3em;
  border-style: solid;
  display: inline-block;
}
.sign { 
  display: inline-block;
  font-size: x-small;
}
.value { 
  display: inline-block;
  font-style: italic;
  font-size: larger;
  padding: 1em;
}

</style>
