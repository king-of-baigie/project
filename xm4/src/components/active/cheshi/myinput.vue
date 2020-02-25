<template>
    <div id="cheshi">
      <div class="shiyan"><input type="text" :placeholder=bt[1]><span>{{bt[2]}}</span></div>
      <span>{{bt[0]}}</span>
    </div>
</template>
<script>
    export default {
        name: "myinput",
      data(){
          return{
          }
      },
      props:{
        bt:{
          type:Array,
          required:true,
        }
      }
    }
</script>

<style scoped>
  .shiyan{
    display: inline-block;
    border: 1px #bebebe solid;
    width: 50%;
    padding:5px 10px;
    float: right;
  }
  .shiyan input{
    border: 0;
    outline: 0;
    width: 90%;
    font-size: 16px;
  }
  #cheshi{
    display: inline-block;
    width: 45%;
  }
  #cheshi>span{
    float: right;
  }
</style>
