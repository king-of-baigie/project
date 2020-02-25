<template>
  <div id="zfr">
    <mynav></mynav>
    <router-view></router-view>
    <!--123-->
  </div>
</template>

<script>
  import nav_row from "../components/nav_row";//引入君儿子的横向导航条
    export default {
        name: "banben",
      components:{
        // index:testindex,
        mynav:nav_row,//王君的横向导航条
        }
    }
</script>

<style scoped>

</style>
