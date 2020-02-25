<template>
    <div class="TJLB">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name" class="yi titl">
          <el-input v-model="ruleForm.name" size="small" style="width: 350px"></el-input>
        </el-form-item>
<!--        上传图片-->
        <el-form-item label="轮播图" v-model="ruleForm.photo" prop="tu" class="yi">
          <el-upload style="width: 250px"
                     class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :file-list="fileList"
                     :http-request="fixUp"
                     list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>


  <!--轮播位置-->
        <el-form-item label="轮播位置" prop="Name" class="yi">
<!--          <el-input v-model="ruleForm.Name" size="small" placeholder="请输入文章跳转链接" style="width: 350px"></el-input>-->
          <el-select v-model="value1" placeholder="全部位置" class="XZ" size="middle">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1"
            >
            </el-option>
          </el-select>
        </el-form-item>




        <p class="Up">上架操作</p>

        <el-form-item label="上架时间" required  class="yi BOX choose">

<!--          开始时间-->
          <div class="block" style="display: inline-block">
            <el-date-picker
              v-model="value3"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00">
            </el-date-picker>
          </div>
          <div style="display: inline-block">--</div>
<!--          结束时间-->
          <div class="block" style="display: inline-block">
            <el-date-picker
              v-model="value4"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="状态" prop="region"  class="yi">
          <el-select v-model="ruleForm.region">
            <el-option label="上架" value="上架"></el-option>
            <el-option label="下架" value="下架"></el-option>
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
        name: "form1",
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false,
          disabled: false,
          value1:'',
          value3:'',
          value4:'',
          fileList:[],
          ruleForm: {
            name: '',
            Name:'',
            region: '',
            date1: '',
            headertext:'添加轮播',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            photo:'',
          },
          rules: {
            name: [
              { required: true, message: '请输入轮播标题', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            paixu: [
              { required: true, message: '请输入序号', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择状态', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ]
          },
          options1:[
            {
              value1:'',
              label1:"全部位置"
            },
            {
              value1:'移动端首页轮播',
              label1:"移动端首页轮播"
            },
            {
              value1:'商城轮播',
              label1:"商城轮播"
            }
          ],
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
          Borrowform:[]
        };
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
        fixUp(options) {
          console.log("阻止默认的上传行为");
          // console.log("阻止默认的上传行为");
          var that = this;
          // 获取文件对象
          let file = options.file;
          //判断图片类型
          //
          if (
            file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/jpg" ||
            file.type == 'image/gif'
          ) {
            var isJPG = true;
          } else {
            isJPG = false;
          }
          // 判断图片大小
          const isLt2M = file.size / 1024 / 1024 < 10;
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
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        // 提交
        Present:function () {
          var title=this.$data.ruleForm.name;
          var weiz=this.$data.value1;
          var src=this.Borrowform;
          // console.log(src[0]);
          // var photo=this.$data.ruleForm.photo;
          // var Name=this.$data.ruleForm.Name;
          // 把中国标准时间转换为时间戳
          // 开始时间
          var standardDate = new Date(this.$data.value3);
          // 结束时间
          var standardDate2 = new Date(this.$data.value4);
          // console.log(standardDate);//Wed Jan 30 2019 15:48:29 GMT+0800 (中国标准时间)
          // console.log(standardDate2);
          // 开始时间
          var standardDay = standardDate.getTime(standardDate);
          // 结束时间
          var standardDay2 = standardDate.getTime(standardDate2);
          var date1=standardDay;
          var date2=standardDay2;
          // 获取排序值
          // var paixu=this.$data.ruleForm.paixu;
          var select=this.$data.ruleForm.region;

          console.log("标题"+title);
          console.log("位置"+weiz);
          // console.log("图片"+src);
          // console.log("链接"+Name);
          console.log("时间1"+date1);
          console.log("时间2"+date2);
          // console.log("排序"+paixu);
          console.log("下拉框"+select);

          var params = new URLSearchParams();
          // params.append('page', '1');       //你要传给后台的参数值 key/value
          // params.append('limit', '10');       //你要传给后台的参数值 key/value
          // params.append('slideshowId','');
          params.append('title', title);       //你要传给后台的参数值 key/value
          params.append('slideshowurl', src);       //你要传给后台的参数值 key/value
          params.append('starttime', date1);
          params.append('endtime', date2);
          params.append('slideshowlocation', weiz);
          params.append('status', select);

          var data={title:title,starttime:date1,endtime:date2,status:select,slideshowlocation:weiz};

          var paramsl=JSON.stringify(data);
          console.log(src[0]);
          this.$axios.post('/eloan/slides/insertSlides',{
              title:title,
              slideshowurl:src[0],
              starttime:date1,
              endtime:date2,
              slideshowlocation:weiz,
              status:select
          }).then((res)=>{
              console.log(res);
            this.$message({
              message: '提交成功',
              type: 'success',
            });
            location.reload();
            }).catch((res)=>{
              console.log(res);
            this.$message({
              message: '提交失败',
              type: 'fail',
            });
            });
          // this.$axios({
          //   method:"post",
          //   headers: {"Content-type":"application/json;charset=utf-8"},
          //   url:'http://172.16.14.40:8080/eloan/slides/insertSlides',
          //   data:paramsl
          // }).then((res)=>{
          //   console.log(res);
          // }).catch((res)=>{
          //   console.log(res)
          // });
        },

      },
      components:{
          // tabrow:tabrow
        // tableheader:tableheader
      },
      created() {
        this.$data.titlename = this.$route.query.name;
        // console.log(this.$route.query.name);
      },


    }
</script>

<style scoped>
  .titl {
    margin-top: 60px;
  }
  .yi {
    margin-left: 360px;
    margin-bottom: 40px;
  }
  .Up {
    margin-left: 120px;
    font-size: 30px;
  }
  .riqi {
    display: inline-block;
  }
  .BOX {
    /*border: 1px solid red;*/
    position: relative;
  }

  .tijiao,.fanhui {
    width: 120px;
    margin-left: 80px;
  }
  .tijiao {
    margin-top: 50px;
    margin-left: 360px;
  }
  .tijiao:hover,.fanhui:hover{
    box-shadow: 2px 2px 5px #767676;
  }
  .TJLB {
    width: 100%;
  }
</style>
