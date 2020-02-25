<template>
  <div id="app">
    <!--    君爸爸的横向导航条组件mynav-->
    <!--<mynav @login="login" v-if="type"></mynav>-->
    <!--&lt;!&ndash;    君爸爸的router-view视口都别动哈,动了导航出不来&ndash;&gt;-->
    <!--<router-view v-if="type"></router-view>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import cashsh from './components/aside3/cashsh'
  import cashrecords from './components/aside3/cashrecords'
  import bioage2 from './components/biaoge/bioage2'
  import recharge from "./components/aside3/recharge";
  // import recharge from './components/aside3/recharge'
  import $ from 'jquery'
  import shenghe from './components/shenghe/shenghe'
  import nav_row from "./components/nav_row";//引入君儿子的横向导航条
  import jieda from './components/aside6/Borrower'
  import loding from './components/loding';
  import tyb from './components/active/tyb';
  import hb from './components/active/hb'
  // import testindex from "./components/testindex";//这个引入的名字和index后面的名字相同，index的名字就是文中的标签的名字
export default {
  name: 'App',
  components:{
    // index:testindex,
    mynav:nav_row,//王君的横向导航条
    recharge:recharge,
    bioage2:bioage2,
    cashrecords:cashrecords,
    cashsh:cashsh,
    loding:loding,
    tyb:tyb,
    hb:hb
  },
  methods:{
    login(res){
      if (res=='ok'){
          this.loging=false;
          this.type=true
      }else if (res='out'){
        this.loging=true;
        this.type=false

      }
    }
  },
  // 注册
  data(){
      return{
        loging:true,
        type:false,
      // loging:false,
      // type:true
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
  }
  body{
    min-width: 1200px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
