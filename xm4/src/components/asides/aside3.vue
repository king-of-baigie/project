/banben<!--资金管理-->
<template>
    <div class="app">
      <ul class="aside">
        <router-link to="/banben/aside3/recharge?name=充值记录"> <li>充值记录</li></router-link>
        <router-link to="/banben/aside3/cashrecords?name=提现记录"> <li>提现记录</li></router-link>
        <router-link to="/banben/aside3/cashsh?name=提现审核"> <li>提现审核</li></router-link>
        <router-link to="/banben/aside3/userfund?name=用户资金"> <li>用户资金</li></router-link>
        <router-link to="/banben/aside3/funddaily?name=资金日志"> <li>资金日志</li></router-link>
        <router-link to="/banben/aside3/ptfund?name=平台资金"> <li>平台资金</li></router-link>
      </ul>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "aside3"
    }
</script>

<style scoped>
  .app{
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
