<template>
    <table>
      <thead>
      <tr class="header">
        <th v-for="th in tablearr" :key="th.id" class="th">{{th}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tr in tbody">
        <td v-for="td in tr">
          {{td}}
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
        tablearr:{
          type:Array,
          required:true,
        },
        tbody:{
          type:Array,
          required:true,
        }
      },
        // 根据数组长度改变th的宽度
        mounted(){
          console.log("页头长度"+this.$props.tablearr.length);
          let width=(100/this.$props.tablearr.length);
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
