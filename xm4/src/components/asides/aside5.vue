<!--内容管理 -->
<template>
    <div class="aside5nav">
      <ul class="aside">
        <router-link to="/banben/aside5/articleM?name=轮播管理"> <li>轮播管理</li></router-link>
        <router-link to="/banben/aside5/wenzhangM?name=文章管理"> <li>文章管理</li></router-link>
        <router-link to="/banben/aside5/xieyi?name=协议配置"> <li>协议配置</li></router-link>
        <router-link to="/banben/aside5/yijian?name=意见反馈"> <li>意见反馈</li></router-link>
        <router-link to="/banben/aside5/add?name=版本管理"> <li>版本管理</li></router-link>
      </ul>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "aside5"
    }
</script>

<style scoped>
  .aside5nav {
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
