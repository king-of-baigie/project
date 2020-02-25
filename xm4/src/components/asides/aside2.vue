<!--欢迎来到君爸爸的借贷管理页面-->
<template>
  <div class="aside2nav">
    <ul class="aside">
      <router-link to="/banben/aside2/list1?name=新增借款"><li>新增借款</li></router-link>
      <router-link to="/banben/aside2/list2?name=新标维护"><li>新标维护</li></router-link>
      <router-link to="/banben/aside2/list3?name=借款审核"><li>借款审核</li></router-link>
      <router-link to="/banben/aside2/list4?name=标的上架"><li>标的上架</li></router-link>
      <router-link to="/banben/aside2/list5?name=招标管理"><li>招标管理</li></router-link>
      <router-link to="/banben/aside2/list6?name=满标复审"><li>满标复审</li></router-link>
      <router-link to="/banben/aside2/list7?name=借款标列表"><li>借款标列表</li></router-link>
      <router-link to="/banben/aside2/list8?name=投资记录"><li>投资记录</li></router-link>
      <router-link to="/banben/aside2/list9?name=类别管理"><li>类别管理</li></router-link>
      <router-link to="/banben/aside2/list10?name=还款管理"><li>还款管理</li></router-link>
      <router-link to="/banben/aside2/list11?name=还款记录"><li>还款记录</li></router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "aside2",
    }
</script>

<style scoped>
  .aside2nav{
    display: flex;
  }
  .aside{
    width: 18%;
    min-width: 120px;
    min-height: 1300px;
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
    border-bottom: 1px solid #cfd5db;
  }
  .aside a{
    color: black;
  }
  .router-link-active li{
    background-color: #cfd5db;
  }
</style>
