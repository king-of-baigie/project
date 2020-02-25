<template>
  <div class="NAMe">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <p class="JIBen">基本信息</p>
      <div class="First">
        <el-form-item label="版本名称:" prop="name" class="yi titl banben">
          <el-input v-model="ruleForm.name" size="small" style="width: 350px" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="平台" required class="lei" >
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="Android"></el-radio>
            <el-radio label="IOS"></el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="Second">

        <el-form-item label="版本号:" prop="lai" class="yi titl">
          <el-input v-model="ruleForm.lai" size="small" style="width: 350px" placeholder="请输入大于旧版本的版本号"></el-input>
        </el-form-item>
        <el-form-item label="更新时间:"  class="yi BOX choose titl">

          <div class="block" style="display: inline-block">
            <el-date-picker
              v-model="value3"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00">
            </el-date-picker>
          </div>
        </el-form-item>
      </div>
      <div class="Second">
        <el-form-item label="状态:" prop="region"  class="yi ZT">
          <el-select v-model="ruleForm.region">
            <el-option label="有效" value="有效"></el-option>
            <el-option label="禁止" value="禁止"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="Second">
        <el-form-item label="更新描述:" required class="yi titl">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.textarea" style="width: 500px">
          </el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" class="tijiao" @click="submitForm('ruleForm');SUb()">提交</el-button>
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
          date1: '',
          textarea:'',
          resourcev:'',
          paixu:'',
          zt:'',
        },
        fileList: [],
        Borrowform:[],
        rules: {
          name: [
            { required: true, message: '请输入版本名称', trigger: 'blur' }
          ],
          Name: [
            { required: true, message: '请输入文章跳转链接', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          lai: [
            { required: true, message: '请输入版本号', trigger: 'change' }
          ],
          author:[
            { required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value3:'',
        b:0
      };

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },

      fixUp(options) {
        console.log("阻止默认的上传行为");
        console.log("阻止默认的上传行为");
        var that = this;
        // 获取文件对象
        let file = options.file;
        //判断图片类型
        //
        if (
          file.type == "image/jpeg" ||
          file.type == "image/png" ||
          file.type == "image/jpg"
        ) {
          var isJPG = true;
        } else {
          isJPG = false;
        }
        // 判断图片大小
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          that.$message.error("上传产品图片只能是 JPG/PNG/JPEG 格式!");
        }
        if (!isLt2M) {
          that.$message.error("上传产品图片大小不能超过 2MB!");
        }
        // 创建一个HTML5的FileReader对象
        var reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
        }
        // //文件读取加载时
        reader.onload = e => {
          // 图片的base64存在reader.result中
          // let base64Str = reader.result.split(',')[1];
          let base64Str = reader.result;
          // console.log('文件图片');
          // console.log(base64Str);
          // this.Borrowform.borrows.push(base64Str);
          this.Borrowform.push(base64Str);
          console.log(this.Borrowform);
        };
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      SUb:function(){
        var bbm=this.$data.ruleForm.name;
        var pt=this.$data.ruleForm.resource;
        var bbh=this.$data.ruleForm.lai;
        // var standardDate = new Date(this.$data.value3);
        // var standardDay = standardDate.getTime(standardDate);
        // var date1=standardDay;
        var d = new Date(this.$data.value3);
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        console.log(datetime.toString());
        var date1=datetime.toString();
        var ms=this.$data.ruleForm.textarea;
        var zt=this.$data.ruleForm.region;
        console.log("版本名："+bbm);
        console.log("平台："+pt);
        console.log("版本号："+bbh);
        console.log("时间："+date1);
        console.log("描述："+ms);
        console.log("状态"+zt);

        var params = new URLSearchParams();
        params.append('versionName', bbm);       //你要传给后台的参数值 key/value
        params.append('versionNumber', bbh);       //你要传给后台的参数值 key/value
        params.append('system', pt);       //你要传给后台的参数值 key/value
        params.append('updateTime', date1);       //你要传给后台的参数值 key/value
        params.append('status',zt);
        // params.append('header','');
        // var data={versionName:bbm,versionNumber:bbh,system:pt,updateTime:date1,status:ms};
        // var paramsl=JSON.stringify(data);
        this.$axios({
          method:"get",
          // headers: {"Content-type":"application/json;charset=utf-8"},
          url:'/eloan/activity/insertVersion',
          params:params

          // this.$axios.post('http://172.16.14.8:8080/eloan/activity/insertVersion',{
          //   versionName:bbm,
          //   versionNumber:bbh,
          //   system:pt,
          //   updateTime:date1,
          //   status:ms,

        }).then((res)=>{
          console.log(res);
          this.$message({
            message: '修改成功',
            type: 'success',
          });
        }).catch((res)=>{
          console.log(res);
          this.$message({
            message: '修改失败',
            type: 'fail',
          });
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      },


  }
</script>

<style scoped>
  .NAMe {
    display: flex;
    justify-content: flex-start;
  }
  .First {
    display: flex;
    justify-content: space-around;
  }
  .JIBen {
    padding: 30px 0 20px 80px;
  }
  .ZT {
    margin-left: 290px;
  }
  .JIBen,.xiangqing {
    font-size: 30px;
  }
  .xiangqing {
    padding: 0 0 20px 80px;
  }
  .xiangqing span:nth-child(1) {
    font-size: 15px;
    padding-left: 30px;
  }
  .xiangqing span:nth-child(2){
    font-size: 15px;
    padding-left: 20px;
    color: blue;
    cursor: pointer;
  }
  .titl {
    margin-left: 290px;
  }
  .banben {
    margin-left: 200px;
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
    margin-top: 20px;
  }
  .tijiao {
    margin-left: 360px;
  }
  .tijiao:hover,.fanhui:hover{
    box-shadow: 2px 2px 5px #767676;
  }
  .see {
    background-color: #336699;
    color: white;
    border: none;
    width: 110px;
    height: 38px;
  }

</style>
