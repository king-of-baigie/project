<!--运营活动-->
<template>
<div class="aside4nav">
  <ul class="aside">
    <router-link to="/banben/aside4/tyj1?name=体验金配置"><li>体验金配置</li></router-link>
    <router-link to="/banben/aside4/tyj?name=体验金记录"><li>体验金记录</li></router-link>
    <router-link to="/banben/aside4/hb?name=红包管理"><li>红包管理</li></router-link>
    <router-link to="/banben/aside4/hbjl?name=红包记录"><li>红包记录</li></router-link>
    <router-link to="/banben/aside4/xrhd?name=新人活动策略"><li>新人活动策略</li></router-link>
    <router-link to="/banben/aside4/qdhd?name=签到活动策略"><li>签到活动策略</li></router-link>
    <router-link to="/banben/aside4/yqhd?name=邀请活动策略"><li>邀请活动策略</li></router-link>
    <router-link to="/banben/aside4/ffjl?name=邀请奖励记录"><li>邀请奖励记录</li></router-link>
    <router-link to="/banben/aside4/xxts?name=消息推送"><li>消息推送</li></router-link>
  </ul>
  <router-view></router-view>
</div>
</template>

<script>
    export default {
        name: "aside4"
    }
</script>

<style scoped>
  .aside4nav{
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
    height: 60px;
    line-height: 60px;
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
