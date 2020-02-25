<template>
    <div id="app">
      <mytabarow v-bind:passtitle="titlename"></mytabarow>
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="投资人手机" prop="phone">
          <el-input v-model="ruleForm.phone"><i  @click="submitForm('ruleForm')" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-form-item>
        <el-form-item label="投资人姓名" prop="name">
          <el-input v-model="ruleForm.name"><i @click="submitForm('ruleForm')" slot="suffix" class="eel-input__icon el-icon-search"></i></el-input>
        </el-form-item>
        <!--<el-form-item label="红包名称" prop="hbname">-->
          <!--<el-input v-model="ruleForm.hbname"><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="来源" prop="region">
          <el-select v-model="ruleForm.region" placeholder="来源"  @change="submitForm('ruleForm')">
            <el-option label="全部渠道" value=""></el-option>
            <el-option label="渠道1" value="渠道1"></el-option>
            <el-option label="渠道2" value="渠道2"></el-option>
            <el-option label="渠道3" value="渠道3"></el-option>
          </el-select>
        </el-form-item>
        <!--<div></div>-->
        <el-form-item label="获取方式" prop="region1" >
          <el-select v-model="ruleForm.region1" placeholder="来源" @change="submitForm('ruleForm')">
            <el-option label="全部获取方式" value=""></el-option>
            <el-option label="活动获取" value="活动获取"></el-option>
            <el-option label="注册获取" value="注册获取"></el-option>
            <el-option label="开户获取" value="开户获取"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="region2">
          <el-select v-model="ruleForm.region2" placeholder="状态" @change="submitForm('ruleForm')">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="未使用" value="未使用"></el-option>
            <el-option label="已使用" value="已使用"></el-option>
            <el-option label="已失效" value="已失效"></el-option>
          </el-select>
        </el-form-item>
        <ceo v-bind:tablearr="thead" v-bind:tbody="tbody"></ceo>
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--</el-form-item>-->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="conpage">
          </el-pagination>
        </div>
      </el-form>
    </div>
</template>

<script>
  import ceo from '../biaoge/biaoge'
  import tabrow from "../tabrow"; //引入王君的横向的组件
    export default {
      name: "hbjl",
      components:{
          ceo:ceo,
          mytabarow: tabrow, //引入横向组件的第三步注册横向的组件
      },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
        this.shiyan()
        },
      data() {
        var  validatePhoneTwo=(rule, value, callback) => {
          const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
          if (value == '' || value == undefined || value == null) {
            callback();
          } else {
            if ((!reg.test(value)) && value != '') {
              callback(new Error('请输入正确的电话号码或者固话号码'));
            } else {
              callback();
            }
          }
        };
        return {
          thead:['姓名','投资人手机','用户来源','获取方式','获取时间','到期时间','使用时间','投资标名','年化收益率','投资金额','奖励金额','状态'],
          tbody:[{}],
          currentPage4: 1,
          yema:'1',
          tiaoshu:'10',
          titlename:'',
          conpage:0,
          ruleForm: {
            name: '',
            region:'',
            region1 :'',
            region2:'',
            hbname:'',
            phone:''
          },
          rules: {
            name: [
            ],
            phone:[{validator:validatePhoneTwo,}]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
             this.shiyan()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.tiaoshu=val;
          this.shiyan()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.yema=val;
          this.shiyan()
        },
        shijian(time){
          var timestamp4 = new Date(time);//直接用 new Date(时间戳) 格式转化获得当前时间
          // console.log(timestamp4);
          // console.log(timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)); //再利用拼接
          var shijian1=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
          return shijian1
        },
        shiyan(){
          console.log(this);
          var params = new URLSearchParams();
          params.append('tel',this.ruleForm.phone);       //你要传给后台的参数值 key/value
          params.append('name',this.ruleForm.name);      //你要传给后台的参数值 key/value
          params.append('red_envelopes_name','');       //你要传给后台的参数值 key/value
          params.append('limit', this.tiaoshu);       //你要传给后台的参数值 key/value
          params.append('page', this.yema);       //你要传给后台的参数值 key/value
          params.append('user_source',this.ruleForm.region);       //你要传给后台的参数值 key/value
          params.append('acquisition_mode',this.ruleForm.region1);       //你要传给后台的参数值 key/value
          params.append('state',this.ruleForm.region2);       //你要传给后台的参数值 key/value
          this.$axios({
            method:"post",
            url:'/eloan/redpRecordsController/selectByPages',
            data:params
          }).then((res)=>{
            console.log(res);
          //   console.log(this.shijian(1576739788000));
            let arr=[];
            // this.yeshu=res.data.count;
            for (let i=0;i<res.data.data.length;i++){
              arr.push({
                b:res.data.data[0].sinUsers[0].name,
                c:res.data.data[0].sinUsers[0].tel,
                d:res.data.data[0].userSource,
                e:res.data.data[0].acquisitionMode,
                f:this.shijian(res.data.data[0].acquisitionTime),
                g:this.shijian(res.data.data[0].dueTime),
                h:this.shijian(res.data.data[0].useTime),
                i:res.data.data[0].investmentName,
                j:res.data.data[0].annualizedRateOfReturn,
                k:'￥'+res.data.data[0].investmentAmount,
                l:'￥'+res.data.data[0].rewardAmount,
                m:res.data.data[0].state
              });
            }
            this.tbody=arr;
            this.conpage=res.data.count
            // console.log(this.tbody)
          }).catch((res)=>{
            console.log(res)
          });
        }
      }
    }
</script>

<style scoped>
  #app{
    width: 100%;
  }
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
