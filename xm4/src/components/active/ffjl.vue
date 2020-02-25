<template>
    <div id="zfr">
      <mytabarow v-bind:passtitle="titlename"></mytabarow>
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="formName" class="demo-form-inline">
        <el-form-item label="推荐人手机" prop="phone">
          <el-input v-model="formInline.phone"><i  @click="submitForm('formInline')" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-form-item>
        <el-form-item label="被推荐人姓名" prop="name">
          <el-input v-model="formInline.name"><i @click="submitForm('formInline')" slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
        </el-form-item>
        <el-form-item label="奖励类型">
          <el-select v-model="formInline.region" @change="submitForm('formInline')">
            <el-option label="全部奖励" value=""></el-option>
            <el-option label="被推荐人实名" value="被推荐人实名"></el-option>
            <el-option label="推荐人实名" value="推荐人实名"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region1" @change="submitForm('formInline')">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="成功" value="成功"></el-option>
            <el-option label="失败" value="失败"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <ceo v-bind:tablearr="thead" v-bind:tbody="tbody"></ceo>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
</template>

<script>
  import tabrow from "../tabrow"; //引入王君的横向的组件
  import ceo from '../biaoge/biaoge'
    export default {
      name: "ffjl",
      components:{
        mytabarow:tabrow,
        ceo:ceo
      },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
        // console.log(this.$route.query.name)
        this.qingqiu()
      },
      data(){
          var validatePhone=(rule, value,callback) =>{
          const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
          if(value==''||value==undefined||value==null){
            callback();
          }else {
            if ((!reg.test(value)) && value != '') {
              callback(new Error('请输入正确的电话号码'));
            } else {
              callback();
            }
          }
        };
        return{
          titlename:'',
          thead:['邀请人手机','被邀请人手机','被邀请人姓名','奖励事件','奖励','基数','比例','获得奖励者','发放状态'],
          tbody:[{}],
          currentPage:1,
          limit:10,
          page:1,
          count:0,
          formInline: {
            phone:'',
            region: '',
            region1: '',
            name:''
          },
          formName:{
            phone:[
              {validator:validatePhone, trigger: 'change'}
              ],
          }
        }
      },
      methods:{
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
        qingqiu(){
          let that=this;
          var params = new URLSearchParams();
          params.append('limit',this.limit);       //你要传给后台的参数值 key/value
          params.append('page',this.page);     //你要传给后台的参数值 key/value
          params.append('invitingTel',this.formInline.phone);       //你要传给后台的参数值 key/value
          params.append('invitedName',this.formInline.name);       //你要传给后台的参数值 key/value
          params.append('rewardEvent',this.formInline.region);       //你要传给后台的参数值 key/value
          params.append('status',this.formInline.region1);       //你要传给后台的参数值 key/value
          this.$axios({
            url:'/eloan/activity/selectActivityRecordsByPage',
            method:'get',
            params:params,
          }).then((res)=>{
            console.log(res);
            let arr=[];
            for(let i=0;i<res.data.data.length;i++){
              arr.push({
                a:res.data.data[i].invitingTel,
                b:res.data.data[i].invitedTel,
                c:res.data.data[i].invitedName,
                d:res.data.data[i].rewardEvent,
                e:res.data.data[i].rewardPeople,
                f:res.data.data[i].baseNumber,
                g:res.data.data[i].ratio,
                h:res.data.data[i].rewardPeople,
                i:res.data.data[i].status
              })
            }
            this.tbody=arr;
            this.count=res.data.count
          })
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
             this.qingqiu()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
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
