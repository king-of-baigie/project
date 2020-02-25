<template>
  <div class="NAMe">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--      <p class="JIBen">基本信息</p>-->
      <div class="First">
        <el-form-item label="意见建议:" class="yijian">
          <p>{{this.$route.query.sug}}</p>
<!--          <p>{{res.data.data.}}</p>-->
        </el-form-item>
      </div>
      <div class="Second">

        <el-form-item label="联系电话:"   class="yi BOX choose titl">
          <p>{{this.$route.query.phone}}</p>
        </el-form-item>
      </div>
      <div class="Second">
        <el-form-item label="手机型号:"   class="yi BOX choose titl">
          <p>{{this.$route.query.lai}}</p>
        </el-form-item>
      </div>


      <el-form-item label="用户来源:"  class="yi BOX choose titl">
        <p>{{this.$route.query.bao}}</p>
      </el-form-item>



      <!--      上架操作-->
      <p class="xiangqing">处理</p>
      <div class="Second">

        <el-form-item label="回复:" class="yi titl">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            resize="none"
            style="width: 350px"
            v-model="ruleForm.textarea">
          </el-input>
        </el-form-item>
      </div>


      <!--      状态-->
      <el-form-item label="状态" required  class="yi titl">
        <el-select v-model="ruleForm.zt" style="width: 350px">
          <el-option label="未执行" value="待执行"></el-option>
          <el-option label="已执行" value="已执行"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="tijiao" @click="submitForm('ruleForm');Present()">提交</el-button>
        <el-button class="fanhui" @click="resetForm('ruleForm')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "form2",
    data() {
      return {
        ruleForm: {
          name: '',
          lai:'',
          author:'',
          region: '',
          intro:'',
          date1: '',
          textarea:'',
          zt:'',

        },
        rules: {
          region: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          zhiding: [
            { type: 'date', required: true, message: '请选择是否', trigger: 'change' }
          ]
        },
      };
    },
    created (){
      console.log(this.$route.query);
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      Present:function () {
        var huifu=this.$data.ruleForm.textarea;
        var zt=this.$data.ruleForm.zt;
        console.log("回复："+huifu);
        console.log("状态："+zt);
        var params = new URLSearchParams();
        params.append('id','1');       //你要传给后台的参数值 key/value
        params.append('state', zt);       //你要传给后台的参数值 key/value
        params.append('source', "gai");
        params.append("reply",huifu);
        // params.append('limit', '1');
        // params.append('status', 'false');
        // params.append('slideshowid', '排序');       //你要传给后台的参数值 key/value
        // params.append('slideshowlocation', '轮播位置');       //你要传给后台的参数值 key/value
        this.$axios({
          method:"post",
          url:'/eloan/opinionController/update',
          data:params
        }).then((res)=>{
          console.log(res);
          // console.log(res.data.contentSlides[0].title)
          // console.log(res.data.data[0].mobilePhoneModel)
        }).catch((res)=>{
          console.log(res)
        });
      }
    }
  }
</script>

<style scoped>
  .NAMe {
    display: flex;
    justify-content: flex-start;
  }
  .yijian {
    margin-left: 40px;
    margin-top: 100px;
  }
  .First {
    display: flex;
    justify-content: space-around;
  }
.xiangqing {
    font-size: 30px;
    padding: 0 0 20px 160px;
  }


  .titl {
    margin-left: 360px;
  }
  .lei {
    margin-left: 100px;
  }
  .Second {
    display: flex;
    height: 80px;
  }
  .tijiao,.fanhui {
    width: 120px;
    margin-left: 160px;
  }
  .tijiao {
    margin-left: 360px;
    margin-top: 50px;
  }
  .tijiao:hover,.fanhui:hover{
    box-shadow: 2px 2px 5px #767676;
  }
</style>
