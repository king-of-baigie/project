<template>
    <div id="zfr">
      <mytabarow v-bind:passtitle="titlename"></mytabarow>
      <coo v-bind:type="type"></coo>
    </div>
</template>

<script>
  import tabrow from "../tabrow"; //引入王君的横向的组件
  import coo from "./active2rd"; //引入王君的横向的组件
    export default {
        name: "qdhd",
        components:{
          mytabarow:tabrow,
          coo:coo,
        },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
      },
      data(){
          return{
            titlename:'',
            type:'签到活动',
          }
      }
    }
</script>

<style scoped>
#zfr{
  width: 100%;
}
</style>
