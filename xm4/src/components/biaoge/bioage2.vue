<template>
  <table>
    <thead>
    <tr class="header">
      <th v-for="th in tablearr2" :key="th.id" class="th">{{th}}</th>
      <th class="th">操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="tr in tbody2">
      <td v-for="td in tr">
        {{td}}
      </td>
      <td>
        <slot name="cz1"></slot>
        <slot name="cz2"></slot>
        <slot name="cz3"></slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "biaoge",
    data(){
      return{

      }
    },
    // 父页面传递回来的参数
    props:{
      tablearr2:{
        type:Array,
        required:true,
      },
      tbody2:{
        type:Array,
        required:true,
      }
    },
    // 根据数组长度改变th的宽度
    mounted(){
      console.log("页头长度"+this.$props.tablearr2.length);
      let width=(100/(this.$props.tablearr2.length+1));
      jQuery(".th").css("width",width+"%");
    }
  }
</script>

<style scoped>
  table{
    width: 100%;
    border-spacing: 0;
  }
  table th{
    height: 40px;
    background-color: #f1f1f1;
    font-size: 14px;
    font-weight: lighter;
    color: black;
  }
  tr {
    line-height: 30px;
  }
  tr td{
    text-align: center;
    font-size: 12px;
  }
  tr:nth-child(odd){
    background-color: #ffffff;
  }
  tr:nth-child(even){
    background-color: #fbfbfb;
  }
  p{
    display: inline-block;
  }
</style>
