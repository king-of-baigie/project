<template>
  <div class="zwk">
    <el-form method="get" @submit.prevent="mmqr" ref="export">
      <!--头条-->
      <tout spantext="新增企业用户"/>
      <!--基本信息-->
      <div class="w80 tl ml3 mt30">
        <!--标题-->
        <el-form-item>
          <span>基本信息</span>
        </el-form-item>
        <!--信息框-->
        <div class="ml6">
          <el-form-item class="w40 lb">
            <span class="xing">*</span>
            <span>手机号码：</span>
            <el-input class="inputtxt" v-model="input1" required="required" placeholder="请输入手机号码" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
          <el-form-item class="w40 lb">
            <span class="xing">*</span>
            <span>用户类型：</span>
            <el-radio  v-model="radio" label="1">企业用户</el-radio>
            <el-radio  v-model="radio" label="2">个人用户</el-radio>
          </el-form-item>
        </div>
        <!--企业用户表单-->
        <div id="qy" class="ml6" v-if="radio=='1'">
          <el-form-item class="w40 mt30 lb">
            <span class="xing">*</span>
            <span>企业名称：</span>
            <el-input class="inputtxt" v-model="input2" required="required" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item class="w40 mt30 lb">
            <span class="xing">*</span>
            <span>税务登记证号：</span>
            <el-input class="inputtxt" v-model="input3" required="required" oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入营业执照上的税务登记证号"></el-input>
          </el-form-item>
          <el-form-item class="w40 mt30 lb">
            <span class="xing">*</span>
            <span>法人姓名：</span>
            <el-input class="inputtxt" v-model="input4" required="required" placeholder="请输入法人代表姓名"></el-input>
          </el-form-item>
          <el-form-item class="w40 mt30 lb">
            <span class="xing">&emsp;&emsp;&emsp;&emsp;&emsp;*</span>
            <span>邮箱：</span>
            <el-input class="inputtxt" v-model="input5" required="required" @blur="email"  type="email" placeholder="请输入常用邮箱"></el-input>
          </el-form-item>
        </div>
        <!--个人用户表单-->
        <div id="gr" class="ml6" v-if="radio=='2'">
          <el-form-item class="w40 mt30 lb">
            <span class="xing">*</span>
            <span>真实姓名：</span>
            <el-input class="inputtxt" v-model="input6" required="required" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item class="w40 mt30 lb">
            <span class="xing">*</span>
            <span>身份证号：</span>
            <el-input class="inputtxt" v-model="input7" required="required" placeholder="请输入真实的身份证号码"></el-input>
          </el-form-item>
          <el-form-item class="w40 mt30 lb">
            <span class="xing">*</span>
            <span>用户类型：</span>
            <el-radio v-model="radio2" label="男">男</el-radio>
            <el-radio v-model="radio2" label="女">女</el-radio>
          </el-form-item>
          <el-form-item class="w40 mt30 lb">
            <span class="xing">&emsp;&emsp;&ensp;*</span>
            <span>邮箱：</span>
            <el-input class="inputtxt" v-model="input8" type="email" @blur="email" required="required" placeholder="请输入常用邮箱"></el-input>
          </el-form-item>
        </div>
      </div>
      <!--密码管理-->
      <div class="w80 mt80 tl ml3">
        <!--标题-->
        <el-form-item>
          <span>密码管理</span>
        </el-form-item>
        <!--信息框-->
        <div class="ml6">
          <el-form-item class="w40 lb">
            <span class="xing">*</span>
            <span>登陆密码：</span>
            <el-input id="password" class="inputtxt" maxlength="8" minlength="6" name="password" show-password required="required" v-model="password" placeholder="请设置6-8位数字和字母组成的密码">
            </el-input>
          </el-form-item>
          <el-form-item class="w40 lb">
            <span class="xing">*</span>
            <span>确认登陆密码</span>
            <el-input id="rewrite" class="inputtxt"  maxlength="8" show-password minlength="6"  @blur="t" name="rewrite" required="required" v-model="repPassword" placeholder="请再次输入登陆密码">
            </el-input>
          </el-form-item>
          <p v-if="ok==='ok'" id="tis">前后密码不一致</p>
        </div>
      </div>
      <!--提交按钮-->
      <el-form-item>
        <el-button class="button mt30 ml30" id="tt"  :disabled="yuanqu" type="primary" plain  @click="tt">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import tout from './toutiao';
  export default {
    name: "addMember",
    components: {
      tout: tout,
    },
    data() {
      return {
        password: "",
        repPassword: "",
        yuanqu: "",
        ok: "",
        radio: "1",
        radio2: "",
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
      }
    },

    methods: {
      email: function (e) {
        console.log(e);
        if (this.$data.radio == 1) {
          var email = this.input5;
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if (reg.test(email)) {

          } else {
            alert("邮箱格式不正确");
          }
        } else if (this.$data.radio == 2) {
          var email = this.input8;
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if (reg.test(email)) {

          } else {
            alert("邮箱格式不正确");
          }
        }

      },
      t: function () {
        console.log("1");
        if (this.password != this.repPassword) {
          this.ok = 'ok';
          this.yuanqu = true;
        }
        if (this.password == this.repPassword) {
          this.ok = 'l';
          this.yuanqu = false;
        }
      },
      tt: function () {
        // var tel=this.$data.input1; //电话
        // var firmName=this.$data.input2; //企业名称
        // var firmId=this.$data.input3;  //税务登记证号
        // var legalName=this.$data.input4; //法人姓名
        // var userCategoryId=this.$data.radio; //企业类型
        // var email=this.$data.input5; //邮箱（企业）
        // var password=this.$data.password; //密码
        // var name=this.$data.input6; //真实姓名
        // var idCard=this.$data.input7; //身份证号码
        // var sex=this.$data.radio2; //性别
        // var email2=this.$data.input8; //邮箱（个人）
        // var params=new URLSearchParams(); //企业表数据
        // var mm=new URLSearchParams();  //个人表数据
        // params.append('tel',tel);
        // params.append('firmName',firmName);
        // params.append('userCategoryId',userCategoryId);
        // params.append('firmId',firmId);
        // params.append('legalName',legalName);
        // params.append('email',email);
        // params.append('password',password);
        // mm.append('tel',tel);
        // mm.append('userCategoryId',userCategoryId);
        // mm.append('name',name);
        // mm.append('idCard',idCard);
        // mm.append('sex',sex);
        // mm.append('email2',email2);
        // console.log(params);
        //企业表传数据
        if (this.$data.radio==1) {
          var tel=this.$data.input1; //电话
          var firmName=this.$data.input2; //企业名称
          var firmId=this.$data.input3;  //税务登记证号
          var legalName=this.$data.input4; //法人姓名
          // var userCategoryId=this.$data.radio; //企业类型
          var email=this.$data.input5; //邮箱（企业）
          var password=this.$data.password; //密码
          var params=new URLSearchParams(); //企业表数据
          var userCategory={};
          userCategory.id=this.$data.radio;
          params.append('tel',tel);
          params.append('firmName',firmName);
          params.append('userCategoryId',userCategory);
          params.append('firmId',firmId);
          params.append('legalName',legalName);
          params.append('email',email);
          params.append('password',password);
          var data={tel:tel,firmName:firmName,userCategoryId:{'id':this.$data.radio},firmId:firmId,legalName:legalName,email:email,password:password};
          var params=JSON.stringify(data);
          console.log(params);
          this.$axios({
            method:"post",
            // headers:{"Content-type":"application/json"},
            url:'/eloan/userInfo/insertByIncUser',
            data:params
          }).then((res)=>{
            console.log(res);
            if (res.data.data==true) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              location.reload()
            }
            else if(res.data.data==false){
              this.$message({
                message: '提交失败',
                type: 'warning'
              });
            }
          }).catch((res)=>{
            console.log(res);
          })
        }
        //个人表传数据
        else if (this.$data.radio==2){
          var tel=this.$data.input1; //电话
          // var userCategoryId=this.$data.radio; //企业类型
          var password=this.$data.password; //密码
          var name=this.$data.input6; //真实姓名
          var idCard=this.$data.input7; //身份证号码
          var sex=this.$data.radio2; //性别
          var email=this.$data.input8; //邮箱（个人）
          var params=new URLSearchParams(); //企业表数据
          var userCategory={};
          userCategory.id=this.$data.radio;
          console.log("新创建的对象");
          console.log(userCategory);
          params.append('tel',tel);
          params.append('password',password);
          params.append('userCategoryId',userCategory);
          params.append('name',name);
          params.append('idCard',idCard);
          params.append('sex',sex);
          params.append('email',email);
          var data={tel:tel,sex:sex,name:name,userCategoryId:{'id':this.$data.radio},idCard:idCard,email:email,password:password};
          // var data1= {
          //   tel:"13388088326",
          //   sex:"男",
          //   name:"王君",
          //   userCategoryId:{'id':"2"},
          //   idCard:"510503199903081111",
          //   email:"1422130230@qq.com",
          //   password:"wang0308"};
          var params=JSON.stringify(data);
          console.log(params);
          this.$axios({
            method:"post",
            headers:{"Content-type":"application/json"},
            url:'/eloan/userInfo/insertBySinUser',
            data:params
          }).then((res)=>{
            console.log(res);
            if (res.data.data==true) {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              location.reload()
            }
            else if(res.data.data==false){
              this.$message({
                message: '提交失败',
                type: 'warning'
              });
            }
          }).catch((res)=>{
            console.log(res);
          })
          // this.$axios.post('/eloan/userInfo/insertBySinUser',{
          //   tel:tel,
          //   name:name,
          //   idCard:idCard,
          //   userCategoryId:userCategoryId,
          //   sex:sex,
          //   email:email,
          //   password:password,
          // }).then((res)=>{
          //   console.log(res)
          // })
        }
      },
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  #tis{
    font-size: 10px;
    color: red;
    margin-left: 50%;
  }
.zwk{
  width: 100%;
}
  .tl {
    text-align: left;
  }

  .xing {
    color: red;
    font-size: 12px;
  }

  .lb {
    display: inline-block;
  }

  .inputtxt {
    width: 350px;
    height: 35px;
  }

  .ml3 {
    margin-left: 3%;
  }
.ml30{
  margin-left: 30%;
}
  .ml6 {
    margin-left: 6%;
  }

  .w80 {
    width: 80%;
  }

  .button {
    width: 160px;
    height: 45px;
  }

  .w40 {
    width: 40%;
  }

  .mt30 {
    margin-top: 30px;
  }

  .mt80 {
    margin-top: 80px;
  }
</style>
