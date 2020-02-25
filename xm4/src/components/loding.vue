<template>
  <div id="a1">
    <div id="loding">
      <div>P2P管理后台</div>
      <el-input
        placeholder="请输入账号"
        v-model="input1"
        @input="a2"
      >
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="input2"
        type="password"
        maxlength=8
        @input="a3"
      >
      </el-input>
      <div style="text-align: center" @click="yanzhengma">
        <img src="" alt="" id="img"><br>
        <span style="color:white">看不清？换一张</span>
      </div>
      <el-input
        placeholder="请输入验证码"
        v-model="input3"
      ></el-input>
      <el-button type="primary" round @click="a1">登录</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'loding',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        width:'',
        height:'',
        color: 'red',
        input1: '',
        input2: '',
        input3:'',
        key:'',
        shuju:[1,2,3,4,5,6],
        shu:['a','s','d','f','g']
      }
    },
    // mounted(){
    //   this.drawLine();
    // },
    created(){
      $('html').css({
        'background': 'url("./static/sy_bg.jpg")',
        'background-size':'cover'
      });
      this.yanzhengma()
    },
    destroyed(){
      $('html').css({
        'background': '',
        'background-size':'cover'
      })
    },
    methods: {
      yanzhengma(){
        this.$axios.get('/eloan/bid/captcha').then((res)=>{
          console.log(res);
          var keys=[];//定义一个数组用来接受key
          var values=[];//定义一个数组用来接受value
          for(var key in res.data){
            keys.push(key);
            values.push(res.data[key]);//取得value
          }
          this.key=keys[0];
          $("#img")[0].src=values[0]
        })
      },
      a1(){
        let aa=this.input1;
        let ab=this.input2;
        // var params = new URLSearchParams();
        // params.append('name', aa);       //你要传给后台的参数值 key/value
        // params.append('password',ab);
        // params.append('vcode',this.input3);
        // params.append('vcodeKey',this.key);
        let data={name: aa,password:ab,vcode:this.input3,vcodeKey:this.key};
        let data1=JSON.stringify(data);
        this.$axios({
          method:"post",
          url:'/eloan/bid/login',
          data:data1
        }).then((res)=>{
          console.log(res);
          if(res.data.code=='200'&&res.data.data.token){
            sessionStorage.setItem('token',res.data.data.token);
            sessionStorage.setItem('name',res.data.data.data.nickName);
            this.$router.push('/banben');
          }else if (res.data.code=='201'){
            this.$message({
              message:res.data.msg,
              type: 'warning'
            });
          }else if(res.data.code=='202'){
            this.$message({
              message: '验证码错误',
              type: 'warning'
            });
          }
        }).catch((res)=>{
          console.log(res)
        });
        // localStorage.clear();
        // localStorage.setItem('token','123');
        // this.$router.push('/banben');
      },
      a2(value){
        // console.log(value);
        let zz=/^[A-Za-z0-9]+$/;
        if (value!=''){
          console.log(zz.test(value));
          if (!zz.test(value)) {
            this.$alert('请输入正确的账号密码', '警告', {
              confirmButtonText: '确定'
            });
          }else {
            this.input1=value;
          }
        }
      },
      a3(value){
        // console.log(value);
        let zz=/^[A-Za-z0-9]+$/;
        if (value!=''){
          console.log(zz.test(value));
          if (!zz.test(value)) {
            this.$alert('请输入正确的账号密码', '警告', {
              confirmButtonText: '确定'
            });
          }else {
            this.input2=value;
          }
        }
      }
    }
  }
</script>

<style scoped>
  #a1{
    position: relative;
    margin-top:10%;
  }
  #loding{
    background-color: rgba(255,255,255,.3);
    width: 300px;
    height: 400px;
    border-radius:10px;
    position: absolute;
    margin-left: -150px;
    left: 50%;
  }
  #loding>:nth-child(1){
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    color: rgb(148, 255, 192);
    padding-top: 20px;
  }
  .el-input{
    width: 80%;
    margin-left: 10%;
    margin-top: 20px;
  }
  .el-button{
    width: 50%;
    margin-left: 25%;
    margin-top: 40px;
  }
</style>
