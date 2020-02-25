<template>
    <div id="hea">
      <mytabarow v-bind:passtitle="titlename"></mytabarow>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
        <el-form-item label="投资人姓名" prop="name">
          <el-input v-model="ruleForm.name"><i @click="submitForm('ruleForm')" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-form-item>
        <el-form-item label="投资人手机" prop="phone">
          <el-input v-model.number="ruleForm.phone"><i @click="submitForm('ruleForm')" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="ruleForm.region" @change="submitForm('ruleForm')">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="未使用" value="未使用"></el-option>
            <el-option label="已使用" value="已使用"></el-option>
            <el-option label="已过期" value="已过期"></el-option>
          </el-select>
        </el-form-item>
        <div><ceo v-bind:tablearr="tablearr" v-bind:tbody="tbody"></ceo></div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="yeshu">
          </el-pagination>
      </el-form>
    </div>
</template>

<script>
  import ceo from '../biaoge/biaoge';
  import tabrow from "../tabrow"; //引入王君的横向的组件
    export default {
        name: "tyj",
        components:{
          ceo:ceo,
          mytabarow: tabrow, //引入横向组件的第三步注册横向的组件
      },
        data(){
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
          return{
            currentPage4:1,
            tiaoshu:'10',
            yema:'1',
            titlename:'',
            tablearr:['姓名','投资人手机','领取时间','到期时间','使用时间','投资标名','体验金金额','年化收益率','收益(元)','状态'],
            tbody:[{}],
            yeshu:0,
            ruleForm: {
              name: '',
              phone:'',
              region:'',
            },
            rules: {
              phone:[{required: false},
                {validator:validatePhoneTwo}],
              name: [
                { required: false},
                { min: 1, max: 10, message: '长度在 1 到 10 个字符' }
              ],
            }
          }
        },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递;
      },
      mounted(){
        this.submitForm('ruleForm')
      },
      methods:{
          tupian(){
            this.$axios.get('/eloan/slides/test').then((res)=>{
              console.log(res)
            })
          },
        shijian(time){
          var timestamp4 = new Date(time);//直接用 new Date(时间戳) 格式转化获得当前时间
          // console.log(timestamp4);
          // console.log(timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)); //再利用拼接
          var shijian1=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
          return shijian1
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              let params = new URLSearchParams();
              params.append('tel',this.ruleForm.phone);       //你要传给后台的参数值 key/value
              params.append('firmName',this.ruleForm.name);      //你要传给后台的参数值 key/value
              params.append('state',this.ruleForm.region);       //你要传给后台的参数值 key/value
              params.append('limit', this.yema);       //你要传给后台的参数值 key/value
              params.append('pag', this.tiaoshu);       //你要传给后台的参数值 key/value
              this.$axios({
                method:"get",
                url:'/eloan/expGold/findByLike',
                params:params
              }).then((res)=>{
                console.log(res);
                let arr=[];
                this.yeshu=res.data.count;
                if (res.data.expGolds.length==0){
                  this.tbody=[{}]
                } else {
                  for (let i = 0; i < res.data.expGolds.length; i++) {
                    arr.push({
                      a: res.data.expGolds[i].firmName,
                      b: res.data.expGolds[i].tel,
                      c: this.shijian(res.data.expGolds[i].timeToCollect),
                      d: this.shijian(res.data.expGolds[i].dueTime),
                      e: this.shijian(res.data.expGolds[i].useTime),
                      f: res.data.expGolds[i].experienceLabel,
                      g: res.data.expGolds[i].amount,
                      h: res.data.expGolds[i].rannualinterestRate + '%',
                      i: res.data.expGolds[i].profit,
                      j: res.data.expGolds[i].state,
                    });
                    this.tbody = arr;
                  }
                }
              }).catch((res)=>{
                console.log(res)
              });
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
          this.submitForm('ruleForm')
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.yema=val;
          this.submitForm('ruleForm')
        }
      }
    }
</script>

<style scoped>
  #hea>.el-input,#hea>.el-select {
    width: 130px!important;
  }
  #hea{
    width: 100%;
  }
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
