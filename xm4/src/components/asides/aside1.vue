<!--首页-->
<template>
    <div class="aside1nav">
      <index></index>
    </div>
</template>
<script>
  import tabrow from "../tabrow";
  import index from '../../components/index'
    export default {
        name: "aside1",
      components:{
        mytabarow:tabrow,
        index:index
      },
      methods:{
      }
    }
</script>

<style scoped>
.aside1nav{
  display: flex;
}
.aside{
  width: 18%;
  min-height: 1000px;
  border-bottom: 1px solid #d7d7d7;
  background-color: #e4e4e4;
}
.aside li:hover{
  background-color: #cfd5db;
}
.aside a li{
  height: 70px;
  line-height: 70px;
  text-align: center;
  border-bottom: 1px solid #d7d7d7;
}
.aside a{
  color: black;
}
</style>
