<template>
  <el-form :model="ruleForm" :inline="true" :rules="rules" label-width="200px" ref="ruleForm" class="demo-form-inline">
    <mytabarow v-bind:passtitle="titlename"></mytabarow>
    <div><h1>体验金参数</h1></div>
    <el-form-item label="体验金金额" prop="money">
      <el-input v-model.number="ruleForm.money"><template slot="append">元</template></el-input>
    </el-form-item>
    <el-form-item label="体验金有效天数" prop="day">
      <el-input v-model.number="ruleForm.day"><template slot="append">天</template></el-input>
    </el-form-item>
    <div></div>
    <el-form-item label="每天发放量限制" prop="rule">
      <el-input v-model.number="ruleForm.rule"><template slot="append">人</template></el-input>
    </el-form-item>
    <el-form-item label="体验金发放开关" prop="isopen">
      <el-radio-group v-model="ruleForm.isopen">
        <el-radio label="注册送"></el-radio>
        <el-radio label="不发放"></el-radio>
      </el-radio-group>
    </el-form-item>
    <div><h1>体验标信息</h1></div>
    <el-form-item label="体验标标名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="年利率" prop="lilv">
      <el-input v-model.number="ruleForm.lilv"><template slot="append">%</template></el-input>
    </el-form-item>
    <div></div>
    <el-form-item label="项目期限" prop="date">
      <el-input v-model.number="ruleForm.date"><template slot="append">天</template></el-input>
    </el-form-item>
    <div><h1>项目介绍</h1></div>
    <el-form-item label="项目信息" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"
                :autosize="{ minRows:4, maxRows: 8}"
                maxlength="100"
                show-word-limit></el-input>
    </el-form-item>
    <div id="anniu">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
  import tabrow from "../tabrow"; //引入王君的横向的组件
    export default {
        name: "tyj1",
      components:{mytabarow: tabrow}, //引入横向组件的第三步注册横向的组件,
      data() {
        var checkMaxVal=(rule, value,callback)=> {
          if (value < 100|| value > 9999) {
            callback(new Error('请输入100到9999之间的数字'));
          } else {
            callback();
          }
        };
        var checkMaxVal1=(rule, value,callback)=> {
          if (value <= -1|| value > 365) {
            callback(new Error('请输入0到365之间的整数，0则为永久有效'));
          } else {
            callback();
          }
        };
        var checkMaxVal2=(rule, value,callback)=> {
          if (value <= -1|| value > 99999) {
            callback(new Error('请输入0到99999之间的整数，0为不限制'));
          } else {
            callback();
          }
        };
        var checkMaxVal3=(rule, value,callback)=> {
          if (value <= 0|| value > 100) {
            callback(new Error('请输入0到100之间的整数'));
          } else {
            callback();
          }
        };
        var checkMaxVal4=(rule, value,callback)=> {
          if (value <= 0|| value > 999) {
            callback(new Error('请输入0到999之间的整数'));
          } else {
            callback();
          }
        };
        return {
          titlename:"",
          ruleForm: {
            money:'',
            day:'',
            rule:'',
            isopen:'',
            name:'',
            lilv:'',
            date:'',
            desc:''
          },
          rules: {
            money:[
              { required: true, message: '请输入100到9999之间的数字', trigger: 'blur' },
              {validator:checkMaxVal},
              {
                type: 'number',//要检验的类型（number，email，date等）
                message: '请输入100到9999之间的数字',
              }
            ],
            day:[{ required: true, message: '请输入0到365之间的整数，0则为永久有效', trigger: 'blur',type:'number' }, {
          type: 'number',//要检验的类型（number，email，date等）
            message: '请输入0到365之间的整数，0则为永久有效',
        }, {validator:checkMaxVal1}],
            rule:[{ required: true, message: '请输入0到99999之间的整数，0为不限制', trigger: 'blur' },
              {
                type: 'number',//要检验的类型（number，email，date等）
                message: '请输入0到99999之间的整数，0为不限制',
              }, {validator:checkMaxVal2}
            ],
            isopen:[{ required: true, message: '请选择', trigger: 'blur' },],
            name:[{ required: true, message: '请输入体验标标名', trigger: 'blur'},],
            lilv:[{ required: true, message: '请输入0到100之间的整数', trigger: 'blur' },
              {
              type: 'number',//要检验的类型（number，email，date等）
              message: '请输入0到100之间的整数',
            },{validator:checkMaxVal3}
            ],
            date:[{ required: true, message: '请输入0到999之间的整数', trigger: 'blur' }, {
              type: 'number',//要检验的类型（number，email，date等）
              message: '请输入0到999之间的整数',
            },{validator:checkMaxVal4}],
            desc:[]
          }
        };
      },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
      },
      mounted(){
        // console.log($("div[class*=el-form-item__content]")) ;
        $("div[class*=el-form-item__content]").css("width","50%");
        $("div[class*=el-textarea]").parent().parent().css("width","80%")
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              console.log(this.ruleForm);
              this.$axios.post('/eloan/expMark/insert',{
                amount:this.ruleForm.money,
                effectiveDays:this.ruleForm.day,
                limitedDistribution:this.ruleForm.rule,
                releaseSwitch:this.ruleForm.isopen,
                experienceLabel:this.ruleForm.name,
                rannualinterestRate:this.ruleForm.lilv,
                projectDuration:this.ruleForm.date,
                projectintroduction:this.ruleForm.desc
              }).then((res)=>{
                console.log(res);
                if (res.data.msg!='0'){
                  this.$message({
                    message: '添加成功',
                    type: 'success',
                  });
                  this.resetForm(formName)
                }else {
                  this.$message.error('添加失败');
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  h1{
    padding-left:5%;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .el-form--inline{
    width: 100%!important;
  }
  .el-form-item{
    width: 45%;
  }
  .el-input{
    width:150%;
  }
  .el-form-item__content{
    width: 50%!important;
  }
  #anniu{
    text-align: center;
  }
</style>
