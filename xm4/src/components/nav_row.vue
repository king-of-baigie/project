<template>
  <div class="nav_row clearfix">
    <div class="header_title">P2P后台管理</div>
    <ul class="header_nav clearfix">
      <router-link to="/banben/aside1">
        <li>首页</li>
      </router-link>
      <router-link to="/banben/aside2">
        <li>借贷管理</li>
      </router-link>
      <router-link to="/banben/aside3">
        <li>资金管理</li>
      </router-link>
      <router-link to="/banben/aside4">
        <li>运营活动</li>
      </router-link>
      <router-link to="/banben/aside5">
        <li>内容管理</li>
      </router-link>
      <router-link to="/banben/aside6">
        <li>用户管理</li>
      </router-link>
<!--      <router-link to="/aside7">-->
<!--        <li>统计分析</li>-->
<!--      </router-link>-->
      <!--<router-link to="/aside8">-->
        <!--<li>系统管理</li>-->
      <!--</router-link>-->
    </ul>
    <ul class="username">
      <li class="father">
       {{name}}
        <ul class="header_sub">
          <li @click="logout">退出</li>
          <li @click="zhuye">返回首页</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
    export default {
        name: "nav_row",
      components:{
      },
      created(){
          this.name=sessionStorage.getItem("name")
      },
      data(){
          return{
            sunvalue:"",
            name:'用户名',
          }
      },
      methods:{
          zhuye(){
            this.$router.push('/banben')
          },
          logout(){
            // this.$emit('login','out');
            sessionStorage.clear();
            // this.$axios({
            //   method:"get",
            //   url:'http://172.16.14.116:8080/eloan/bid/logout',
            // }).then((res)=>{
            //   console.log(res.data);
            // }).catch((res)=>{
            //   console.log(res)
            // });
            this.$router.push('/login');

          }
      }
    }
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: white;
}

.router-link-active {
  background-color: #3d6d9e;
  border-radius: 5px;
}
/*===================================================================*/
.nav_row {
  display: flex;
  text-align: center;
  align-content: center;
  background-color: #5f87af;
  color: white;
}
.header_title {
  /*border: 1px solid black;*/
  font-size: 28px;
  width: 15%;
  padding: 10px;
  height: 60px;
  line-height: 60px;
}
.header_nav {
  color: black;
  width: 80%;
  height: 60px;
  padding: 10px 30px;
  line-height: 60px;
  margin-left: 30px;
}
.header_nav a {
  float: left;
  padding: 0 20px;
  margin-right: 1%;
}
.header_nav a:hover {
  border-radius: 5px;
  background-color: #3d6d9e;
}
.username {
  width: 5%;
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  padding: 10px;
  background-color: #5f87af;
  transition: all 0.6s linear;
}
.listuse {
  position: relative;
}
.username .listuse:hover {
  border-radius: 3px;
  background-color: #3d6d9e;
}
.username:hover .header_sub {
  display:block;
}
.father{
  position: relative;
}
.header_sub {
  position: absolute;
  z-index: 5;
  top: 50%;
  width: 100%;
  margin-top: 30px;
  background-color: #5f87af;
  transition: all 0.5s linear;
  display: none;
}
.header_sub li:hover {
  border-radius: 5px;
  background-color: #3d6d9e;
}
.header_sub li:hover a {
  color: black;
}
/*其他页面的样式*/
/*清除浮动*/
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}

.clearfix::after {
  clear: both;
}

.clearfix {
  /* 兼容IE6、7 */
  zoom: 1;
}
</style>
