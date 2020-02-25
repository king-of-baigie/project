<template>
  <div class="app">
    <div class="container">
      <span>{{passtitle}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabrow",
  props: ["passtitle"]
};
</script>

<style scoped>
.container {
  position: relative;
  height: 60px;
  text-align: center;
  background-color: #f2f2f2;
  /*width: 1000px;*/
}
.container span {
  position: absolute;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  left: 50px;
  top: 10px;
  background-color: white;
}
</style>
