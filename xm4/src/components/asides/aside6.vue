<!--用户管理-->
<template>
  <div class="aside6nav">
  <ul class="aside">
    <router-link to="/banben/aside6/Investmentusers"> <li>用户管理</li></router-link>
    <router-link to="/banben/aside6/addMember"> <li>新增用户</li></router-link>
    <router-link to="/banben/aside6/Investmentusers"> <li>投资用户管理</li></router-link>
    <router-link to="/banben/aside6/Borrower"> <li>借款用户管理</li></router-link>
  </ul>
    <router-view></router-view>
</div>
</template>

<script>
    export default {
        name: "aside6"
    }
</script>

<style scoped>
  .aside6nav{
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
    border-bottom: 1px solid #d7d7d7;
  }
  .aside a{
    color: black;
  }
  .router-link-active li{
    background-color: #cfd5db;
  }
</style>
