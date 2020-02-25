<template>
  <div id="zz">
    <mytabarow v-bind:passtitle="titlename"></mytabarow>
    <div id="hea">
      <el-input
      placeholder="搜索红包名称"
      v-model="input1">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="chaxun"></i>
      </el-input>
      <el-select v-model="leixing" placeholder="全部类型" @change="shiyan">
        <el-option label="全部类型" value=""></el-option>
        <el-option label="满减红包" value="满减红包"></el-option>
        <el-option label="现金红包" value="现金红包"></el-option>
      </el-select>
      <el-button type="primary" @click="open">添加红包</el-button>
    </div>
    <div><ceo v-bind:tablearr="table" v-bind:tbody="tbody"></ceo></div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="zong">
    </el-pagination>
    <!--<div>-->
      <!--<button type="button" @click="shiyan">123</button>-->
      <!--<button type="button" @click="tianjia">456</button>-->
    <!--</div>-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="红包名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="红包有效期" prop="time">
          <el-input v-model.number="ruleForm.time" placeholder="请输入整数，0为不限制"><template slot="append">天</template></el-input>
        </el-form-item>
        <el-form-item label="红包类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择红包类型" @change="change">
            <el-option label="满减红包" value="满减红包"></el-option>
            <el-option label="现金红包" value="现金红包"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满减金额" prop="jine" v-if="is1">
          <el-input v-model.number="ruleForm.jine" placeholder="请输入0以上的整数"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label="投资条件" prop="tiaojian" v-if="is1">
          <el-input v-model.number="ruleForm.tiaojian" placeholder="请输入可使用红包的最小投资金额，0为不限制"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item label="红包金额" prop="hb" v-if="is2">
          <el-input v-model="ruleForm.hb" placeholder="请输入0以上的整数"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import coo from './cheshi/myinput'
  import ceo from '../biaoge/biaoge';
  import tabrow from "../tabrow"; //引入王君的横向的组件
    export default {
        name: "hb",
      components:{
          coo:coo,
          ceo:ceo,
          mytabarow:tabrow
      },
      created(){
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
        this.shiyan()
      },
      data(){
        return{
          titlename:"",
          currentPage:1,
          dialogVisible: false,
          limit:'10',
          page:'1',
          zong:0,
          ruleForm: {
            name: '',
            region: '',
            time:'',
            jine:'',
            tiaojian:'',
            hb:''
          },
          input1:'',
          leixing:'',
          table:['编号','红包名称','红包类型','有效期','金额','条件','已领取个数','已使用个数','创建时间'],
          /*============================体验标请求，勿删！！！！================================*/
          tbody:[{}],
          rules: {
            hb:[{ required: true, message: '请输入红包金额',min:0},],
            time:[
              { required: true, message: '请输入红包有效期'},
              {
                type: 'number',//要检验的类型（number，email，date等）
                message: '请输入正确的数字',
                min:0
              }
            ],
            tiaojian:[ { required: true, message: '请输入激活条件'},
              {
                type: 'number',//要检验的类型（number，email，date等）
                message: '请输入正确的数字',
                min:0
              }
            ],
            name: [
              { required: true, message: '请输入红包名称', trigger: 'blur' },
            ],
            jine:[
              { required: true, message: '请输入满减金额'},
              {
                type: 'number',//要检验的类型（number，email，date等）
                message: '请输入正确的数字',
                min:0
              }
            ],
            region: [
              { required: true, message: '请选择红包类型', trigger: 'change' }
            ],
          },
          is1:true,
          is2:false,
        }
      },
      methods: {
        chaxun(){

        },
        open(){
          this.dialogVisible=true
        },
        handleClose(done) {
          this.dialogVisible=false
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit=val;
          this.shiyan()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page=val;
          this.shiyan()
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              this.tianjia()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        change(){
          console.log(this.ruleForm.region);
          if(this.ruleForm.region!='满减红包'){
            this.is1=false;
            this.is2=true;
          }else {
            this.is1=true;
            this.is2=false;
          }
        },
        addDomain() {
          this.ruleForm.domains.push({
            value: '',
            key: Date.now()
          });
        },
        shijian(time){
          var timestamp4 = new Date(time);//直接用 new Date(时间戳) 格式转化获得当前时间
          var shijian1=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
          return shijian1
        },
        shiyan() {
          var params = new URLSearchParams();
          params.append('limit', this.limit);       //你要传给后台的参数值 key/value
          params.append('page',this.page);       //你要传给后台的参数值 key/value
          params.append('red_envelopes_name', this.input1);       //你要传给后台的参数值 key/value
          params.append('red_envelope_type', this.leixing);       //你要传给后台的参数值 key/value
          this.$axios.post('/eloan/redpInfo/selectByPage',params)
            .then((res)=>{
            console.log(res);
            this.zong=res.data.count;
            let arr=[];
            for(let i=0;i<res.data.data.length;i++){
              let tiaojian;
              console.log(typeof res.data.data[i].condition);
              if (res.data.data[i].condition!=''){
                tiaojian='投资满'+res.data.data[i].condition+'元使用'
              }else{
                tiaojian='-'
              }
              arr.push({
                a:res.data.data[i].id,
                b:res.data.data[i].redpNews[0].redEnvelopesName,
                c:res.data.data[i].redpNews[0].redEnvelopeType,
                d:res.data.data[i].redpNews[0].termOfValidity,
                e:res.data.data[i].amountOfMoney,
                f:tiaojian,
                g:res.data.data[i].numberOfReceived,
                h:res.data.data[i].numberOfUsed,
                i:this.shijian(res.data.data[i].creationTime)
              })
            }
            this.tbody=arr
          })
        },
        tianjia(){
          this.$axios({
            method:"post",
            url:"/eloan/redpNew/login1",
            params:{
              amount_of_money:this.ruleForm.hb,
              condition:this.ruleForm.tiaojian,
            },
            data:{
              redEnvelopesName:this.ruleForm.name,
              fullReductionAmount:this.ruleForm.jine,
              termOfValidity:this.ruleForm.time,
              redEnvelopeType:this.ruleForm.region,
              investmentConditions:this.ruleForm.tiaojian
            }
          }).then((res)=>{
            console.log(res);
            if (res.data=true){
              this.$message({
                message: '添加成功',
                type: 'success',
              });
              this.dialogVisible=false;
              this.shiyan()
            }else {
              this.$message.error('添加失败');
            }
          })
        }
      },
    }
</script>

<style scoped>
.hb{
  background-color: white;
  width:60%;
  height:600px;
  position: fixed;
  margin-left:20%;
  top:20%;
  z-index: 1;
  padding:0 20px;
}
  .bg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.54);
    z-index: 0;
  }
  h1{
    margin-top: 20px;
    text-align: center;
    font-size: 30px!important;
    background-color: rgb(245, 247, 250);
  }
  .close>i {
    position: absolute;
    right: 20px;
    top: 5px;
    font-size: 30px !important;
    cursor: pointer;
  }
  .close{
    height: 80px;
    margin: 0!important;
    width: 100%!important;
  }
.close>i:hover{
  color: #ff7c88;
}
.el-select{
  width: 100% !important;
}
#hea>.el-input,#hea>.el-select {
  width: 130px!important;
}
  #zz{
    width: 100%!important;
  }
.el-pagination{
  text-align: center;
  margin-top: 20px;
}
</style>
