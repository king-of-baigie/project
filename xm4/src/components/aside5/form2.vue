<template>
  <div class="NAMe">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <p class="JIBen">基本信息</p>
      <div class="First">
        <el-form-item label="标题:" prop="name" class="yi titl">
          <el-input v-model="ruleForm.name" size="small" style="width: 350px" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章类别:" prop="region"   class="yi lei" >
          <el-select v-model="ruleForm.region" placeholder="请选择" style="width: 350px">
            <el-option label="新闻公告" value="新闻公告"></el-option>
            <el-option label="行业动态" value="行业动态"></el-option>
            <el-option label="帮助中心" value="帮助中心"></el-option>
            <el-option label="活动中心" value="活动中心"></el-option>
            <el-option label="关于我们" value="关于我们"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="Second">
<!--        <el-form-item label="来源" prop="name" class="yi title">-->
        <el-form-item label="来源:" class="yi titl">
          <el-input v-model="ruleForm.lai" size="small" style="width: 350px" placeholder="请输入文章来源"></el-input>
        </el-form-item>
        <el-form-item label="作者:" class="yi leib">
          <el-input v-model="ruleForm.author" size="small" style="width: 350px" placeholder="请输入作者"></el-input>
        </el-form-item>
      </div>
      <div class="Second">
        <el-form-item label="更新时间:"  class="yi BOX choose titl">
          <el-col :span="11">
            <el-form-item prop="date1" class="choose">
              <el-date-picker type="date" class="riqi" placeholder="请选择日期" v-model="ruleForm.date1" style="width: 250px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </div>
      <p class="xiangqing">文章详情</p>
<!--上传图片-->
      <el-form-item label="活动封面:"  class="yi BOX choose titl">
        <el-upload style="width: 250px"
                   class="upload-demo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :file-list="fileList"
                   :http-request="fixUp"
                   list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>


      <el-form-item label="跳转链接:" class="yi titl">
        <el-input v-model="ruleForm.lianjie" size="small" placeholder="请输入文章跳转链接" style="width: 350px"></el-input>
      </el-form-item>
<!--      一句话介绍-->
      <el-form-item label="一句话介绍:" class="yi titl">
        <el-input v-model="ruleForm.intro" size="small" placeholder="请输入一句话介绍" style="width: 350px"></el-input>
      </el-form-item>
<!--        文章正文-->
      <el-form-item label="文章正文:" class="yi titl">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ruleForm.textarea">
        </el-input>
      </el-form-item>
<!--      上架操作-->
      <p class="xiangqing">上架操作</p>
      <div class="Second">
        <!--      状态-->
        <el-form-item label="状态" required  class="yi titl">
          <el-select v-model="ruleForm.zt" style="width: 350px">
            <el-option label="上架" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="排序" prop="paixu" class="yi titl pai">-->
<!--          <el-input v-model="ruleForm.paixu" size="small" placeholder="请输入正整数，数字越大越靠前" style="width: 350px"></el-input>-->
<!--        </el-form-item>-->

<!--        单选按钮-->
        <el-form-item label="是否置顶" required class="w410 lei" >
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>

      </div>


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
          fileList:[],
          Borrowform:[],
          ruleForm: {
            name: '',
            lai:'',
            author:'',
            region: '',
            lianjie:'',
            intro:'',
            date1: '',
            textarea:'',
            resourcev:'',
            paixu:'',
            zt:'',
            // dialogVisible:'',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false

          },
          rules: {
            name: [
              { required: true, message: '请输入文章标题', trigger: 'blur' },
              // { min: 3,  message: '长度在需大于 3 个字符', trigger: 'blur' }
            ],
            Name: [
              { required: true, message: '请输入文章跳转链接', trigger: 'blur' }
            ],
            paixu: [
              { required: true, message: '请输入序号', trigger: 'blur' }
            ],
            tu: [
              { required: true, message: '请上传图片', trigger: 'blur' }
            ],
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
        // 提交表单
        Present:function () {
          var title=this.$data.ruleForm.name;
          var region=this.$data.ruleForm.region;
          var lai=this.$data.ruleForm.lai;
          var author=this.$data.ruleForm.author;
          // 把中国标准时间转换为时间戳
          // 开始时间
          var standardDate = new Date(this.$data.ruleForm.date1);
          // console.log(standardDate);//Wed Jan 30 2019 15:48:29 GMT+0800 (中国标准时间)
          // 开始时间
          var standardDay = standardDate.getTime(standardDate);
          var date1=standardDay;


          // var d = new Date(this.$data.ruleForm.date1);
          // var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
          // var date1=datetime;
          // console.log(date1);
          var lianjie=this.$data.ruleForm.lianjie;
          var intro=this.$data.ruleForm.intro;
          var textarea=this.$data.ruleForm.textarea;
          var paixu=this.$data.ruleForm.paixu;
          var resource=this.$data.ruleForm.resource;
          var zt=this.$data.ruleForm.zt;
          var src=this.Borrowform;
          // var textarea=this.$data.ruleForm.textarea;

          console.log("标题"+title);
          console.log("类别"+region);
          console.log("来源"+lai);
          console.log("作者"+author);
          console.log("时间"+date1);
          console.log("链接"+lianjie);
          console.log("介绍"+intro);
          console.log("正文"+textarea);
          console.log("排序"+paixu);
          console.log("置顶"+resource);
          console.log("状态"+zt);
          console.log(src);

          var params = new URLSearchParams();
          params.append('activitiesurl', src[0]);       //你要传给后台的参数值 key/value
          params.append('articlebody', textarea);       //你要传给后台的参数值 key/value
          params.append('articletype', region);       //你要传给后台的参数值 key/value
          params.append('introduction', intro);       //你要传给后台的参数值 key/value
          // params.append('page', '1');       //你要传给后台的参数值 key/value
          // params.append('limit', '10');       //你要传给后台的参数值 key/value
          params.append('link', lianjie);
          params.append('source', lai);
          params.append('status', zt);
          params.append('title', title);
          params.append('top', resource);
          params.append('updatetime', date1);
          params.append('writer', author);
          params.append('articleid', paixu);

          var data={articlebody:textarea,activitiesurl:src,articletype:region,introduction:intro,link:lianjie,source:lai,status:zt,title:title,top:resource,updatetime:date1,writer:author,articleid:paixu};
          var paramsl=JSON.stringify(data);

          this.$axios.post('/eloan/article/insertArticle',{
              activitiesurl: src[0],
              articlebody: textarea,
              articletype: region,
              introduction: intro,
              // page: '1',
              // limit: '10',
              link: lianjie,
              source: lai,
              status: zt,
              title: title,
              top: resource,
              updatetime: date1,
              writer: author,
              articleid: paixu
          }).then((res)=>{
            console.log(res);
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            location.reload();
          }).catch((res)=>{
            console.log(res)
          });

          // this.$axios({
          //   method:"post",
          //   headers: {"Content-type":"application/json;charset=utf-8"},
          //   url:'http://172.16.14.40:8080/eloan/article/insertArticle',
          //   data:paramsl
          // this.$axios(
          //   {"Content-type":"application/json;charset=utf-8"},
          //   'http://172.16.14.40:8080/eloan/article/insertArticle',{
          //
          //     articlebody:textarea,
          //     articletype:region,
          //     introduction:intro,
          //     link:lianjie,
          //     source:lai,
          //     status:zt,
          //     title:title,
          //     top:resource,
          //     updatetime:date1,
          //     writer:author,
          //     articleid:paixu
          // }).then((res)=>{
          //   console.log(res);
          // }).catch((res)=>{
          //   console.log(res)
          // });

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
        handlePictureCardPreview(file) {
          this.$data.dialogImageUrl = file.url;
          this.$data.dialogVisible = true;
        },
        handleDownload(file) {
          console.log(file);
        }
      }
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
  .leib {
    margin-left: 100px;
    height: 36px;
  }
  .JIBen {
    padding: 30px 0 20px 80px;
  }
  .JIBen,.xiangqing {
    font-size: 30px;
  }
  .xiangqing {
    padding: 0 0 20px 80px;
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
