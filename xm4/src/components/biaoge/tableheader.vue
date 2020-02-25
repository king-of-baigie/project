<template>
  <div class="header">
    <div class="header-in">{{headertext}}</div>
  </div>
</template>

<script>
    export default {
        name: "tableheader",
        props:{
        headertext:{
          tbody:{
            type:String,
            required:true,
           }
          }
        }



    }
</script>

<style scoped>
  /*页头*/
  .header{
    background-color: #f2f2f2;
  }
  /*充值记录*/
  .header-in{
    height: 40px;
    width: 100px;
    line-height: 40px;
    text-align: center;
    border: white solid 1px;
    background-color: white;
    margin-left: 5%;
    font-weight: lighter;
    border-radius: 5px;
  }
</style>
