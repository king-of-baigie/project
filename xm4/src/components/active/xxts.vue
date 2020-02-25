<template>
    <div id="zfr">
      <mytabarow v-bind:passtitle="titlename"></mytabarow>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="formInline.name" placeholder="搜索标题"><i @click="qingqiu" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" @change="qingqiu">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="发送成功" value="发送成功"></el-option>
            <el-option label="发送失败" value="发送失败"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="centerDialogVisible=true">新增推送</el-button>
      </el-form>
      <ceo v-bind:tbody="tbody" v-bind:tablearr="thead"></ceo>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="消息标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="推送方式" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择推送方式">
              <el-option label="APP推送" value="APP推送"></el-option>
              <el-option label="APP消息" value="APP消息"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推送内容" prop="textarea2">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="ruleForm.textarea2"
              maxlength="50"
              show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="推送对象" prop="region1">
            <el-select v-model="ruleForm.region1" placeholder="请选择推送对象" @change="cheshi">
              <el-option label="全部用户" value="全部用户"></el-option>
              <el-option label="指定用户" value="指定用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户文件" v-if="type">
            <el-upload
                      ref="upload"
                      action="/"
                      :show-file-list="false"
                      :on-change="importExcel"
                      :auto-upload="false">
                      <el-button
                        slot="trigger"
                        icon="el-icon-upload"
                        size="small"
                        type="primary">
                        上传文件
                      </el-button>
              </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--<button type="button" @click="axios">123</button>-->
    </div>
</template>

<script>
  import ceo from '../biaoge/biaoge'
  import tabrow from "../tabrow";
  export default {
        name: "xxts",
        components:{
        ceo:ceo,
        mytabarow:tabrow
      },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
        // console.log(this.$route.query.name)
        this.qingqiu();
      },
      data(){
          return{
            titlename:'',
            centerDialogVisible: false,
            currentPage:1,
            limit:10,
            page:1,
            tel:'',
            count:0,
            type:false,
            thead:['编号','推送标题','类型','推送内容','推送对象','状态','已发送条数','添加时间'],
            tbody:[{}],
            formInline: {
              name: '',
              region: ''
            },
            ruleForm: {
              name: '',
              region: '',
              region1:'',
              textarea2:'',
            },
            rules: {
              name: [
                { required: true, message: '请输入推送标题', trigger: 'blur' }
              ],
              region: [
                { required: true, message: '请选择推送类型', trigger: 'change' }
              ],
              region1: [
                { required: true, message: '请选择推送用户', trigger: 'change' }
              ],
              textarea2:[{
                required: true, message: '请填写推送内容', trigger: 'change'
              }],

            }
          }
      },
      methods: {
          shijian(time){
          var timestamp4 = new Date(time);//直接用 new Date(时间戳) 格式转化获得当前时间
          var shijian1=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
          return shijian1
        },
          qingqiu(){
            var params = new URLSearchParams();
            params.append('limit',this.limit);       //你要传给后台的参数值 key/value
            params.append('page',this.page);     //你要传给后台的参数值 key/value
            params.append('activityTitle',this.formInline.name);       //你要传给后台的参数值 key/value
            params.append('activityStatus',this.formInline.region);
            this.$axios({
              url:'/eloan/activity/selectActivitySentsByPage',
              method:'get',
              params:params,
            }).then((res)=>{
              console.log(res);
              let arr=[];
              for(let i=0;i<res.data.data.length;i++){
                arr.push({
                  a:res.data.data[i].id,
                  b:res.data.data[i].activityTitle,
                  c:res.data.data[i].type,
                  d:res.data.data[i].content,
                  e:res.data.data[i].sentObject,
                  f:res.data.data[i].status,
                  g:res.data.data[i].sendNumber,
                  h:this.shijian(res.data.data[i].updateTime)
                })
              }
              this.tbody=arr;
              this.count=res.data.count
            })
          },
          axios(){
            console.log(this);
            this.$axios.post('/eloan/activity/insertActivitySent',{
              activityTitle:this.ruleForm.name,
              type:this.ruleForm.region,
              content:this.ruleForm.textarea2,
              sentObject:this.ruleForm.region1,
              tels:this.tel,
            }).then((res)=>{
              console.log(res);
              if (res.data.msg=='新增成功'){
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              }
            })
          },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit=val;
          this.qingqiu()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page=val;
          this.qingqiu()
        },
        cheshi(){
          if (this.ruleForm.region1=='全部用户') {
            this.type=false
          }else{
            this.type=true
          }
        },
        importExcel(file) {
          // let file = file.files[0] // 使用传统的input方法需要加上这一步
          const types = file.name.split('.')[1];
          const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types);
          if (!fileType) {
            this.$message('格式错误！请重新选择');
            return
          }
          this.file2Xce(file).then(tabJson => {
            if (tabJson && tabJson.length > 0) {
              this.xlsxJson = tabJson;
              console.log('数据', this.xlsxJson);
              let arr=[];
              for (let i=0;i<this.xlsxJson[0].sheet.length;i++){
                arr.push(this.xlsxJson[0].sheet[i].phone)
              }
              this.tel=arr.join(',');
              console.log(this)
            }
          })
        },
        file2Xce(file) {
          console.log(this.$XLSX);
          let that=this;
          return new Promise(function(resolve, reject) {
            const reader = new FileReader();
            reader.onload = function(e) {
              const data = e.target.result;
              this.wb = that.$XLSX.read(data, {
                type: 'binary'
              });
              const result = [];
              this.wb.SheetNames.forEach((sheetName) => {
                result.push({
                  sheetName: sheetName,
                  sheet: that.$XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
                })
              });
              resolve(result)
            };
            reader.readAsBinaryString(file.raw)
            // reader.readAsBinaryString(file) // 传统input方法
          })
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              this.centerDialogVisible = false;
              this.axios()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>

<style scoped>
#zfr{
  width: 100%;
}
.el-pagination{
  text-align: center;
  margin-top: 30px;
}
</style>
