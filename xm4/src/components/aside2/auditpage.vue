<template>
  <div class="auditpage">
    <!--    引入横向的组件第一步-->
    <mytabarow :passtitle="titlename"></mytabarow>
    <div class="infocontainer">
      <div class="basicinfo">
        <div class="title">基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8" style="text-indent: 80px;">
                  <span class="sp">
                    <b class="colred">*</b>标名：
                  </span>
                  <!--                  标名:name-->
                  <span>{{auditinfo.name}}</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:48px;">
                  <span>
                    <b class="colred">*</b>风险等级：
                  </span>
                  <!--                  风险等级:riskGrade-->
                  <span>{{auditinfo.riskGrade}}</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="11" :push="8" style="text-indent:64px;">
                  <span>
                    <b class="colred">*</b>借款方：
                  </span>
                  <!--                  借款方:userName-->
                  <span>{{auditinfo.userName}}</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:32px">
                  <span>
                    <b class="colred">*</b>借款总金额：
                  </span>
                  <!--                  借款总金额:amount-->
                  <span>{{auditinfo.amount}}元</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8" style="text-indent:64px">
                  <span>
                    <b class="colred">*</b>年利率：
                  </span>
                  <!--                  年利率:arp-->
                  <span>{{auditinfo.arp}}%</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:48px">
                  <span>
                    <b class="colred">*</b>还款方式：
                  </span>
                  <!--                  还款方式:repayType-->
                  <span>{{auditinfo.repayType}}</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8" style="text-indent:48px">
                  <span>
                    <b class="colred">*</b>借款期限：
                  </span>
                  <!--                  借款期限:borrowTime-->
                  <span>{{auditinfo.borrowTime}}{{auditinfo.timeType}}</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:16px">
                  <span>
                    <b class="colred">*</b>借款起息方式：
                  </span>
                  <!--                  借款起息方式:nterestLoan-->
                  <span>成立计息</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8">
                  <span>
                    <b class="colred">*</b>借款管理费月率：
                  </span>
                  <!--                  借款管理费月率:minTerest-->
                  <span>{{auditinfo.minTerest}}%</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8">
                  <span>
                    <b class="colred">*</b>利息管理费月率：
                  </span>
                  <!--                  利息管理费月率:minTerest-->
                  <span>{{auditinfo.interest}}%</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8" style="text-indent:16px">
                  <span>
                    <b class="colred">*</b>逾期罚息利率：
                  </span>
                  <!--                  逾期罚息利率:interest-->
                  <span>{{auditinfo.interest}}%</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:48px">
                  <span>
                    <b class="colred">*</b>借款类型：
                  </span>
                  <!--                  借款类型:borrowType-->
                  <span>{{auditinfo.borrowType}}</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8" style="text-indent:54px">
                  <span>资金用途：</span>
                  <!--                  资金用途:-->
                  <span>{{auditinfo.purpose}}</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:54px">
                  <span>还款来源：</span>
                  <!--                  还款来源:repaySource-->
                  <span>{{auditinfo.repaySource}}</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="guaranteeinfo">
        <div class="title">担保信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8" style="text-indent: 56px;">
                  <span class="sp">是否担保:</span>
                  <!--                  是否担保:guarantee-->
                  <span>{{auditinfo.guarantee==true ?'是':'否'}}</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:56px;">
                  <span>担保机构:</span>
                  <!--                  担保机构:guarantor-->
                  <span>{{auditinfo.guarantor}}</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-col :span="8" :push="8" style="text-indent: 56px;">
                  <span class="sp">是否抵押:</span>
                  <!--                  是否抵押:guarantyType-->
                  <span>{{auditinfo.guarantyType}}</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="borrowdata">
        <div class="title">借款资料</div>
        <div>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-col :span="2" :push="4" style="text-indent: 56px;">
                  <span>借款资料:</span>
                </el-col>
                <el-col :span="8" :push="4">
                  <div v-for="(item,index) in Severimg" :key="index">
                    <img :src="imgUrl+item.collateralUrl" alt=""/>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="audit">
        <div class="title">审核</div>
        <div class="aduitcont">
          <el-form ref="aduitform" :model="aduitform" label-width="80px">
            <div>
              <el-form-item label="是否通过">
                <el-radio-group v-model="aduitform.isPass">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="aduitform.remark"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <el-button type="primary" @click="auditSubmit">提交</el-button>
            <el-button @click="auditReturn">返回</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabrow from "../tabrow";
export default {
  name: "auditpage",
  titlename: "", //王君引入横向组件的第四步，作为父组件向子组件传递的参数
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://172.16.14.116:8080", //定义这个页面的请求的ip地址
      auditinfo: "",
      aduitform: {
        isPass: "",
        remark: ""
      },
      Severimg:[],//图片返回的集合
      imgUrl:'http://118.190.202.182:8080/eloan/static/file/',//图片服务器
    };
  }, //-----------------------------data的闭合标签------------------------------------

  //--------------------------------------------vue对象创建时的钩子函数created-----------------------
  created() {
    console.log(this.$route.params);
    //-----------------------------------------将存在路由parmas中的数据取出--------------------------
    this.titlename = this.$route.params.name;
    var serialNumber = this.$route.params.usernub;
    //----------------------------------------------------------------------------------------------
    this.$axios
      .get("/eloan/bidInfo/selectAuditBySerialNumber/" + serialNumber)
      .then(res => {
        console.log("查询到数据返回数据");
        console.log(res);
        this.auditinfo = res.data;
        //判断风险等级
          if (this.auditinfo.riskGrade==0){
            this.auditinfo.riskGrade='极低'
          }else if(this.auditinfo.riskGrade==1){
            this.auditinfo.riskGrade='较低'
          }else if(this.auditinfo.riskGrade==2){
            this.auditinfo.riskGrade='中等'
          }else if(this.auditinfo.riskGrade==3){
            this.auditinfo.riskGrade='中高'
          }else {
            this.auditinfo.riskGrade='高'
          }

          //判断还款方式
          if(this.auditinfo.repayType==0){
            this.auditinfo.repayType='一次性还款'
          }else if(this.auditinfo.repayType==1){
            this.auditinfo.repayType='等额本息'
          }else if(this.auditinfo.repayType==2){
            this.auditinfo.repayType='按月付息到期还本'
          }else {
            this.auditinfo.repayType='按天还款'
          }
          //判断资金用途
        if(this.auditinfo.purpose==0){
          this.auditinfo.purpose='短期周转';
        }else if(this.auditinfo.purpose==1){
          this.auditinfo.purpose='生意周转';
        }else if(this.auditinfo.purpose==2){
          this.auditinfo.purpose='购物消费';
        }else if(this.auditinfo.purpose==3){
          this.auditinfo.purpose='长期周转';
        }else {
          this.auditinfo.purpose='其他用途';
        }
        //借款类型判断
        if(this.auditinfo.borrowType==0){
          this.auditinfo.borrowType='新增';
        }else if(this.auditinfo.borrowType==1){
          this.auditinfo.borrowType='续贷';
        }else {
          this.auditinfo.borrowType='资产处理';
        }

        this.Severimg=res.data.collateralUrl;
      });
  }, //-----------------------------------------这个是created的闭合标签---------------------

  //-------------------------------------------用户自定义方法的开始------------------------------------
  methods: {
    //审核提交按钮
    /**
     * @name: auditSubmit
     * @description: 提交审核按钮触发的函数,将编号拼接在函数后面,提交成功后同时切换路由
     * @return:
     * @Author: Wang Jun
     */
    auditSubmit() {
      console.log('tup');
      console.log(this.Severimg);
      var senddata = this.aduitform;
      console.log("打印表单内容");
      console.log(senddata);
      var userNub = this.$route.params.usernub;
      this.$axios
        .post("/eloan/bidInfo/insertSigns/" + userNub, {
          data: senddata
        })
        .then(res => {
          console.log(res);
          // console.log(res.data);
          if (res.data.code == 200) {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$router.push({
              name: "list3",
              path: "/aside2/list3",
              query: { name: "借款审核" }
            });
          }
        });
    },

    //返回按钮
    /**
     * @name: auditReturn
     * @description: 返回按钮切换路由
     * @return:
     * @Author: Wang Jun
     */
    auditReturn() {
      this.$router.push({
        name: "list3",
        path: "aside2/list3",
        query: { name: "借款审核" }
      });
    }
  }
};
</script>

<style scoped>
/*设置子页面的宽度 */
.auditpage {
  width: 100%;
}
.colred {
  color: red;
}
.infocontainer {
  padding-top: 50px;
}
.title {
  font-size: 26px;
  padding: 30px 0 50px 100px;
}
.el-row {
  margin-bottom: 20px;
  line-height: 36px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /*background-color: #f9fafc;*/
}

/*借款资料*/
.borrowdata {
  height: 600px;
}
.aduitcont {
  width: 1000px;
  margin: 0 auto;
}
/*按钮*/
.btns {
  width: 50%;
  margin: 50px auto 0 auto;
}
</style>
