<!--标的上架详情页面-->
<template>
  <div class="mark">
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
                  <span>{{markinfo.name}}</span>
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
                  <span>{{markinfo.riskGrade}}</span>
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
                  <span>{{markinfo.userName}}</span>
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
                  <span>{{markinfo.amount}}元</span>
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
                  <span>{{markinfo.arp}}%</span>
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
                  <span>{{markinfo.repayType}}</span>
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
                  <span>{{markinfo.borrowTime}}{{markinfo.timeType}}</span>
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
                  <span>{{markinfo.minTerest}}%</span>
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
                  <span>{{markinfo.interest}}%</span>
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
                  <span>{{markinfo.interest}}%</span>
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
                  <span>{{markinfo.borrowType}}</span>
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
                  <span>{{markinfo.purpose}}</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:54px">
                  <span>还款来源：</span>
                  <!--                  还款来源:repaySource-->
                  <span>{{markinfo.repaySource}}</span>
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
                  <span>{{markinfo.guarantee==true ?'是':'否'}}</span>
                </el-col>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-col :span="8" style="text-indent:56px;">
                  <span>担保机构:</span>
                  <!--                  担保机构:guarantor-->
                  <span>{{markinfo.guarantor}}</span>
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
                  <span>{{markinfo.guarantyType}}</span>
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
        <div class="title">标的信息</div>
        <div class="aduitcont">
          <!--          用来存放用户编号的隐藏input框-->
          <input type="hidden" :model="markForm.serialNumber" />
          <el-form ref="aduitform" :model="markForm" label-width="80px">
            <div class="bdcount">
              <div class="leftform">
                <!--                  左边第一个-->
                <el-form-item label="标名">
                  <el-input v-model="bmname" placeholder="请输入名称" style="width:330px" disabled></el-input>
                </el-form-item>
                <!--                左边第二个-->
                <el-form-item label="标的类型:">
                  <el-select v-model="markForm.signType" placeholder="请选择" style="width: 330px;">
                    <el-option label="车贷宝" value="0"></el-option>
                    <el-option label="房贷宝" value="1"></el-option>
                    <el-option label="新手标" value="2"></el-option>
                    <el-option label="供应链阵容" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <!--                左边第三个-->
                <el-form-item label="递增金额:">
                  <el-select
                    v-model="markForm.increaseAmount"
                    placeholder="请选择"
                    style="width: 330px;"
                  >
                    <el-option label="100元" value="0"></el-option>
                    <el-option label="200元" value="1"></el-option>
                    <el-option label="500元" value="2"></el-option>
                    <el-option label="1000元" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <!--                左边第四个-->
                <el-form-item label="投资计息方式：" class="w410" label-width="120px">
                  <el-radio-group v-model="markForm.computeType">
                    <el-radio label="0">成交日</el-radio>
                    <el-radio label="1">T+1</el-radio>
                    <el-radio label="2">T+2</el-radio>
                    <el-radio label="3">成立计息</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!--                左边第五个-->
                <el-form-item label="设置精选：" class="w410" label-width="100px">
                  <el-radio-group v-model="markForm.isChange">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!--                左边第六个-->
                <div class="mjcount">
                  <div style="width: 190px;">
                    <el-form-item label="募集时间:">
                      <!--                      RaiseTime募集时间-->
                      <el-select v-model="RaiseTime" placeholder="设置时间:">
                        <el-option label="满标为止" value="满标为止"></el-option>
                        <el-option label="请标为止" value="请标为止"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-input v-model="TimeNub" placeholder="请输入整数" style="width: 110px;"></el-input>
                  </div>
                  <div>
                    <el-select v-model="changeTime" placeholder="选择时间" style="width:110px;">
                      <el-option label="小时" value="小时"></el-option>
                      <el-option label="天" value="天"></el-option>
                    </el-select>
                  </div>
                </div>
                <!--                左边第七个-->
                <div>
                  <span>开售时间：</span>
                  <el-date-picker
                    v-model="markForm.putAwayTime"
                    type="date"
                    style="width: 325px"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="开售时间"
                  ></el-date-picker>
                </div>
              </div>
              <div class="rightform">
                <!--            右边第一个-->
                <el-form-item label="标签:" label-width="100px">
                  <el-select v-model="markForm.label" placeholder="下拉选择标签" style="width: 330px;">
                    <el-option label="高收益" value="0"></el-option>
                    <el-option label="低风险" value="1"></el-option>
                    <el-option label="官方标" value="2"></el-option>
                    <el-option label="红包可用" value="3"></el-option>
                    <el-option label="新用户仅限一次" value="4"></el-option>
                    <el-option label="限时抢投" value="5"></el-option>
                  </el-select>
                </el-form-item>
                <!--                右边第二个-->
                <el-form-item label="最低起投金额:" label-width="100px">
                  <el-input
                    v-model="markForm.minMoney"
                    placeholder="请输入0-999999的整数"
                    style="width:330px"
                  ></el-input>
                </el-form-item>
                <!--                右边第三个-->
                <el-form-item label="最大可投金额:" label-width="100px">
                  <el-input
                    v-model="markForm.maxMoney"
                    placeholder="请输入≥最小可投且≤借款总额的正整数"
                    style="width:330px"
                  ></el-input>
                </el-form-item>
                <!--                右边第四个-->
                <el-form-item label="上架渠道:">
                  <el-radio-group v-model="markForm.putAwayType">
                    <el-radio label="0">PC</el-radio>
                    <el-radio label="1">APP</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!--                右边第五个-->
                <el-form-item label="新手专享：" class="w410" label-width="100px">
                  <el-radio-group v-model="markForm.noviceType">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!--                右边第六个-->
                <div>
                  <span>上架时间：</span>
                  <el-date-picker
                    v-model="markForm.startTime"
                    type="date"
                    style="width: 340px"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="开始日期"
                  ></el-date-picker>
                </div>
              </div>
            </div>
            <div>
              <div>
                <el-form-item label="项目介绍">
                  <el-input type="textarea" v-model="markForm.projectiItroduction"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="风控措施">
                  <el-input type="textarea" v-model="markForm.controllType"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="btns">
              <el-form-item>
                <el-button type="primary" @click="submitMarkForm">提交</el-button>
                <el-button @click="markonReturn">返回</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabrow from "../tabrow";
export default {
  name: "markon",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //王君引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://118.190.202.182:8080",
      markinfo: "",
      bmname: "", //标名
      RaiseTime: "", //募集的方式
      TimeNub: "", //输入的时间
      changeTime: "", //选择时间类型
      markForm: {
        //提交的表单的信息
        serialNumber: "", //1.编号
        signType: "", //2.标的类型
        increaseAmount: "", //3.递增金额
        computeType: "", //4.计息方式
        setTime: "", //5.募集时间 由TimeNub和changeTime组合
        startTime: "", //6.上架时间 Date类型
        label: "", //7.标签
        minMoney: "", //8.最小金额
        maxMoney: "", //9.最大金额 必须小于上面的借款额,大于最小金额
        putAwayType: "", //10.上架渠道
        noviceType: "", //11.新手专享
        projectiItroduction: "", //12.项目介绍
        controllType: "", //13.风控措施
        isChange: "", //14.设置精选
        putAwayTime: "" //15.开售时间
      },
      Severimg:[],//图片返回的集合
      imgUrl:'http://172.16.14.116:8080/eloan/static/file/',//图片服务器
    };
  }, //-----------------------------data的闭合标签------------------------------------
  created() {
    this.titlename = "上架维护";
    // console.log(this.$route.params.usernub);
    var userNub = this.$route.params.usernub;
    //----------------------------------------------------------------------
    this.$axios
      .get("/eloan/bidInfo/selectAuditBySerialNumber/" + userNub)
      .then(res => {
        // console.log("接收到数据了");
        console.log(res);
        this.markinfo = res.data;
        this.Severimg=res.data.collateralUrl;
        this.bmname = this.markinfo.name;
        this.markForm.serialNumber = this.$route.params.usernub;
        //判断风险等级
        if (this.markinfo.riskGrade==0){
          this.markinfo.riskGrade='极低'
        }else if(this.markinfo.riskGrade==1){
          this.markinfo.riskGrade='较低'
        }else if(this.markinfo.riskGrade==2){
          this.markinfo.riskGrade='中等'
        }else if(this.markinfo.riskGrade==3){
          this.markinfo.riskGrade='中高'
        }else {
          this.markinfo.riskGrade='高'
        }

        //判断还款方式
        if(this.markinfo.repayType==0){
          this.markinfo.repayType='一次性还款'
        }else if(this.markinfo.repayType==1){
          this.markinfo.repayType='等额本息'
        }else if(this.markinfo.repayType==2){
          this.markinfo.repayType='按月付息到期还本'
        }else {
          this.markinfo.repayType='按天还款'
        }
        //判断资金用途
        if(this.markinfo.purpose==0){
          this.markinfo.purpose='短期周转';
        }else if(this.markinfo.purpose==1){
          this.markinfo.purpose='生意周转';
        }else if(this.markinfo.purpose==2){
          this.markinfo.purpose='购物消费';
        }else if(this.markinfo.purpose==3){
          this.markinfo.purpose='长期周转';
        }else {
          this.markinfo.purpose='其他用途';
        }
        //借款类型判断
        if(this.markinfo.borrowType==0){
          this.markinfo.borrowType='新增';
        }else if(this.markinfo.borrowType==1){
          this.markinfo.borrowType='续贷';
        }else {
          this.markinfo.borrowType='资产处理';
        }

      });
  },

  methods: {
    submitMarkForm() {
      console.log("提交表单");
      this.markForm.setTime = this.TimeNub + this.changeTime; //募集时间
      console.log(this.markForm);
      this.$axios({
        method: "post",
        headers: { "Content-type": "application/json;charset=utf-8" },
        url: "/eloan/binDetails/insertDetails",
        data: this.markForm
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.$router.push({
            name: "list4",
            path: "aside2/list4",
            query: {
              name: "标的上架"
            }
          });
        }else {
          this.$message.error('提交失败');
        }
      });
      ///=============================
    },
    markonReturn() {
      this.$router.push({
        name: "list4",
        path: "aside2/list4",
        query: {
          name: "标的上架"
        }
      });
    }
  }
};
</script>

<style scoped>
.mark {
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
  width: 1200px;
  margin: 0 auto;
}
.bdcount {
  display: flex;
  justify-content: flex-start;
}
.leftform {
  width: 600px;
  margin-right: 20px;
}
.rightform {
  width: 600px;
}
.mjcount {
  display: flex;
  justify-content: flex-start;
}
.btns {
  padding: 50px;
}
</style>
