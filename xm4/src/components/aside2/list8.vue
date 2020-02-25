<!--君爸爸的第八个子页面==投资记录-->
<template>
  <div class="list8">
    <!--    引入横向的组件第一步-->
    <mytabarow v-bind:passtitle="titlename"></mytabarow>
    <div class="tabcont">
      <div class="headersearch">
        <el-input
          placeholder="搜索借款方"
          v-model="mysenddata.input1"
          size="small"
          class="w430"
          @input="myinputval(0)"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" @click="myinputclick(0)"></i>
        </el-input>
        <el-input
          placeholder="搜索借款人手机"
          v-model="mysenddata.input2"
          class="w430"
          size="small"
          @input="myinputval(1)"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" @click="myinputclick(1)"></i>
        </el-input>
        <el-select
          v-model="mysenddata.selectype"
          placeholder="状态筛选"
          class="w430"
          size="small"
          @change="myinputval(2)"
        >
          <el-option label="全部状态" value="1"></el-option>
          <el-option label="待回款" value="2"></el-option>
          <el-option label="已结算" value="3"></el-option>
          <el-option label="撤标" value="4"></el-option>
          <el-option label="流标" value="4"></el-option>
          <el-option label="投资中" value="4"></el-option>
          <el-option label="投资失败" value="4"></el-option>
        </el-select>
        <!--        日期选项-->
        <!--        :change="cksj"-->
        <div class="block">
          <el-date-picker
            v-model="mysenddata.times"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="selecttime"
            size="small"
            value-format="yyyy-MM-dd hh:mm:ss"
            @change="myinputval(3)"
          ></el-date-picker>
        </div>
        <!--        右边导出-->
        <div class="dc">
          <el-button size="small" @click="tableToExcel()">导出</el-button>
        </div>
      </div>
      <!--      表格-->
      <el-table
        :data="gridData"
        :stripe="true"
        :show-header="true"
        :header-cell-style="{background:'#f2f2f2',color:'#000000'}"
      >
        <el-table-column property="serialNumber" label="编号" align="center" width="115px"></el-table-column>
        <el-table-column property="username" label="投资人" align="center" width="100px"></el-table-column>
        <el-table-column property="tel" label="投资人手机" align="center"></el-table-column>
        <el-table-column property="name" label="标名" align="center" width="80px"></el-table-column>
        <el-table-column property="amount" label="投资金额" align="center"></el-table-column>
        <el-table-column property="interest" label="利息" align="center"></el-table-column>
        <el-table-column property="interestFee" label="利息管理费" align="center"></el-table-column>
        <el-table-column property="income" label="收益方式" align="center"></el-table-column>
        <el-table-column property="received" label="已收金额" align="center"></el-table-column>
        <el-table-column property="totalAmount" label="待收总额" align="center"></el-table-column>
        <el-table-column property="channel" label="投资渠道" align="center"></el-table-column>
        <el-table-column property="investTime" label="投资时间" align="center" width="100px"></el-table-column>
        <el-table-column property="investStatuas" label="投资状态" align="center"></el-table-column>
      </el-table>
      <!--      分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import tabrow from "../tabrow"; //引入横向的组件第二步引入这个文件
export default {
  name: "list8",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://172.16.14.96:8080", //ip地址
      mysenddata: {
        //搜索框的总数据对象
        input1: "", //借款方搜索框的值
        input2: "", //借款人手机搜索框的值
        selectype: "", //下拉框的值
        times: [new Date(2019, 11, 1, 0, 0), new Date(2020, 11, 1, 10, 10)]
      },
      gridData: [{}], //表格的数据
      total: 0, //总共有多少条数据;
      currentPage: 1, //当前第几页
      pagesize: 10 //当前展示的条数
    };
  }, //-----------------------------data的闭合标签------------------------------------

  //--------------------------------------------vue对象创建时的钩子函数created
  created() {
    this.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
    //----------------------------------------------------------------------
    this.$axios({
      method:'post',
      headers: {"Content-type":"application/json;charset=utf-8"},
      url:'/eloan/bidInvest/selectInvestRecord',
      data:{
        page: 1, //当前是多少页，页面创建时默认第一页
        limit: 10 //当前展示的页面条数，页面创建时默认展示前10条
      }
    }).then(res=>{
      console.log(res);
      this.gridData=res.data.data;
      this.total=res.data.count;
      for (var i=0;i<this.gridData.length;i++){
        if (this.gridData[i].investStatuas==1){
          this.gridData[i].investStatuas='投资中'
        }else if(this.gridData[i].investStatuas==2){
          this.gridData[i].investStatuas='投资失败'
        }else if(this.gridData[i].investStatuas==3){
          this.gridData[i].investStatuas='待回款'
        }else {
          this.gridData[i].investStatuas='已结算'
        }
      }
    })
  }, //-----------------------------------------这个是created的闭合标签

  //-------------------------------------------用户自定义方法的开始
  methods: {
    //================================搜索栏的事件开始=============================================

    //========================myinputval用户改变输入框和下拉框调用的方法的开始==============================================
    myinputval(val) {
      //如果val=0则是借款方输入框的内容改变
      if (val == 0) {
        //当借款方输入框不为空时
        if (this.mysenddata.input1 != "") {
          // var startTime=this.mysenddata.times[0];
          // var endTime=this.mysenddata.times[1];
          // console.log('开始时间'+startTime);
          // console.log('结束时间'+endTime);
          this.$axios({
            method: 'post',
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/bidInvest/selectInvestRecord',
             data:{
                loanName: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                status: this.mysenddata.selectype, //状态筛选
                page: this.currentPage, //当前是多少页，页面创建时默认第一页
                limit: this.pagesize,//当前展示的页面条数，页面创建时默认展示前10条
                // start:"2000-01-04 12:00:00",//开始时间
                // end:"2000-02-15 12:00:00",//结束时间
                  }
          }).then(res=>{
            console.log('当第一个内容变化时');
            this.gridData=res.data.data;
            this.total=res.data.count;
            for (var i=0;i<this.gridData.length;i++){
              if (this.gridData[i].investStatuas==1){
                this.gridData[i].investStatuas='投资中'
              }else if(this.gridData[i].investStatuas==2){
                this.gridData[i].investStatuas='投资失败'
              }else if(this.gridData[i].investStatuas==3){
                this.gridData[i].investStatuas='待回款'
              }else {
                this.gridData[i].investStatuas='已结算'
              }
            }
          })
        }
        //当借款方输入框的值为空时
        else {
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            this.$axios({
              method:'post',
              headers: {"Content-type":"application/json;charset=utf-8"},
              url:'/eloan/bidInvest/selectInvestRecord',
              data:{
                page: 1, //当前是多少页，页面创建时默认第一页
                limit: 10 //当前展示的页面条数，页面创建时默认展示前10条
              }
            }).then(res=>{
              console.log(res);
              this.gridData=res.data.data;
              this.total=res.data.count;
              for (var i=0;i<this.gridData.length;i++){
                if (this.gridData[i].investStatuas==1){
                  this.gridData[i].investStatuas='投资中'
                }else if(this.gridData[i].investStatuas==2){
                  this.gridData[i].investStatuas='投资失败'
                }else if(this.gridData[i].investStatuas==3){
                  this.gridData[i].investStatuas='待回款'
                }else {
                  this.gridData[i].investStatuas='已结算'
                }
              }
            })
          }
          //当只有当前的为空时
          else {
            this.$axios({
              method: 'post',
              headers: {"Content-type":"application/json;charset=utf-8"},
              url:'/eloan/bidInvest/selectInvestRecord',
              data:{
                loanName: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                status: this.mysenddata.selectype, //状态筛选
                page: this.currentPage, //当前是多少页，页面创建时默认第一页
                limit: this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
                // start:"2000-01-04 12:00:00",//开始时间
                // end:"2000-02-15 12:00:00",//结束时间
              }
            }).then(res=>{
              console.log('当第一个内容变化时');
              this.gridData=res.data.data;
              this.total=res.data.count;
              for (var i=0;i<this.gridData.length;i++){
                if (this.gridData[i].investStatuas==1){
                  this.gridData[i].investStatuas='投资中'
                }else if(this.gridData[i].investStatuas==2){
                  this.gridData[i].investStatuas='投资失败'
                }else if(this.gridData[i].investStatuas==3){
                  this.gridData[i].investStatuas='待回款'
                }else {
                  this.gridData[i].investStatuas='已结算'
                }
              }
            })
          }
        }
      }
      //如果val=1则是借款人手机输入框的内容改变
      else if (val == 1) {
        //当借款人手机输入框不为空时
        if (this.mysenddata.input2 != "") {
          this.$axios({
            method: 'post',
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/bidInvest/selectInvestRecord',
            data:{
              loanName: this.mysenddata.input1, //借款方
              tel: this.mysenddata.input2, //借款人手机
              status: this.mysenddata.selectype, //状态筛选
              page: this.currentPage, //当前是多少页，页面创建时默认第一页
              limit: this.pagesize,//当前展示的页面条数，页面创建时默认展示前10条
              // start:"2000-01-04 12:00:00",//开始时间
              // end:"2000-02-15 12:00:00",//结束时间
            }
          }).then(res=>{
            console.log('当第二个内容变化时');
            this.gridData=res.data.data;
            this.total=res.data.count;
            for (var i=0;i<this.gridData.length;i++){
              if (this.gridData[i].investStatuas==1){
                this.gridData[i].investStatuas='投资中'
              }else if(this.gridData[i].investStatuas==2){
                this.gridData[i].investStatuas='投资失败'
              }else if(this.gridData[i].investStatuas==3){
                this.gridData[i].investStatuas='待回款'
              }else {
                this.gridData[i].investStatuas='已结算'
              }
            }
          })
        }
        //当借款人手机输入框为空时
        else {
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            this.$axios({
              method:'post',
              headers: {"Content-type":"application/json;charset=utf-8"},
              url:'/eloan/bidInvest/selectInvestRecord',
              data:{
                page: 1, //当前是多少页，页面创建时默认第一页
                limit: 10 //当前展示的页面条数，页面创建时默认展示前10条
              }
            }).then(res=>{
              console.log(res);
              this.gridData=res.data.data;
              this.total=res.data.count;
              for (var i=0;i<this.gridData.length;i++){
                if (this.gridData[i].investStatuas==1){
                  this.gridData[i].investStatuas='投资中'
                }else if(this.gridData[i].investStatuas==2){
                  this.gridData[i].investStatuas='投资失败'
                }else if(this.gridData[i].investStatuas==3){
                  this.gridData[i].investStatuas='待回款'
                }else {
                  this.gridData[i].investStatuas='已结算'
                }
              }
            })
          }
          //当只有当前的为空时
          else {
            this.$axios({
              method: 'post',
              headers: {"Content-type":"application/json;charset=utf-8"},
              url:'/eloan/bidInvest/selectInvestRecord',
              data:{
                loanName: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                status: this.mysenddata.selectype, //状态筛选
                page: this.currentPage, //当前是多少页，页面创建时默认第一页
                limit: this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
                // start:"2000-01-04 12:00:00",//开始时间
                // end:"2000-02-15 12:00:00",//结束时间
              }
            }).then(res=>{
              console.log('当第二个内容变化时');
              this.gridData=res.data.data;
              this.total=res.data.count;
              for (var i=0;i<this.gridData.length;i++){
                if (this.gridData[i].investStatuas==1){
                  this.gridData[i].investStatuas='投资中'
                }else if(this.gridData[i].investStatuas==2){
                  this.gridData[i].investStatuas='投资失败'
                }else if(this.gridData[i].investStatuas==3){
                  this.gridData[i].investStatuas='待回款'
                }else {
                  this.gridData[i].investStatuas='已结算'
                }
              }
            })
          }
        }
      }
      //如果val的值为2时
      else if (val == 2) {
        //当下拉框的值发生变化时
        this.$axios({
          method: 'post',
          headers: {"Content-type":"application/json;charset=utf-8"},
          url:'/eloan/bidInvest/selectInvestRecord',
          data:{
            loanName: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            status: this.mysenddata.selectype, //状态筛选
            page: this.currentPage, //当前是多少页，页面创建时默认第一页
            limit: this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
            // start:"2000-01-04 12:00:00",//开始时间
            // end:"2000-02-15 12:00:00",//结束时间
          }
        }).then(res=>{
          console.log('当第三个内容变化时');
          this.gridData=res.data.data;
          this.total=res.data.count;
          for (var i=0;i<this.gridData.length;i++){
            if (this.gridData[i].investStatuas==1){
              this.gridData[i].investStatuas='投资中'
            }else if(this.gridData[i].investStatuas==2){
              this.gridData[i].investStatuas='投资失败'
            }else if(this.gridData[i].investStatuas==3){
              this.gridData[i].investStatuas='待回款'
            }else {
              this.gridData[i].investStatuas='已结算'
            }
          }
        })
      }
      //当用户改变时间器时
      else {
        // 当时间器发生变化
        let startTime=this.mysenddata.times[0];
        let endTime=this.mysenddata.times[1];
        // console.log('开始时间'+startTime);
        // console.log('结束时间'+endTime);
        this.$axios({
          method: 'post',
          headers: {"Content-type":"application/json;charset=utf-8"},
          url:'/eloan/bidInvest/selectInvestRecord',
          data:{
            loanName: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            status: this.mysenddata.selectype, //状态筛选
            page: this.currentPage, //当前是多少页，页面创建时默认第一页
            limit: this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
            start:startTime,//开始时间
            end:endTime,//结束时间
          }
        }).then(res=>{
          console.log('当时间器变化时');
          this.gridData=res.data.data;
          this.total=res.data.count;
          for (var i=0;i<this.gridData.length;i++){
            if (this.gridData[i].investStatuas==1){
              this.gridData[i].investStatuas='投资中'
            }else if(this.gridData[i].investStatuas==2){
              this.gridData[i].investStatuas='投资失败'
            }else if(this.gridData[i].investStatuas==3){
              this.gridData[i].investStatuas='待回款'
            }else {
              this.gridData[i].investStatuas='已结算'
            }
          }
        })
      }
    },
    //========================myinputval用户改变输入框和下拉框调用的方法的结尾==============================================

    //========================myinputclick用户点击输入框上的搜索按钮时调用的方法开始========================================
    myinputclick(val) {
      console.log(val);
      //当借款方用户的搜索按钮被点击时
      if (val == 0) {
        //如果此时的借款方输入框的值为空时
        if (this.mysenddata.input1 == "") {
          this.$message({
            message: "借款方不能为空",
            type: "warning"
          });
        }
      }
      //当借款人手机的搜索被点击时
      else {
        //如果此时的借款人手机输入框的值为空时
        if (this.mysenddata.input2 == "") {
          this.$message({
            message: "借款人手机不能为空",
            type: "warning"
          });
        }
      }
    },
    //========================myinputclick用户点击输入框上的搜索按钮时调用的方法结束========================================
    //================================搜索栏的事件结束=============================================

    //=============================页尾的事件开始========================================================================
    //=============================handleSizeChange改变页面展示条数方法的开始=============================================
    handleSizeChange(val) {
      //页面展示条数改变时
      this.pagesize = val;
      // var pagedata = { page: this.currentPage, limit: val };
      this.$axios({
        method:'post',
        headers: {"Content-type":"application/json;charset=utf-8"},
        url:'/eloan/bidInvest/selectInvestRecord',
        data:{
          loanName: this.mysenddata.input1, //借款方
          tel: this.mysenddata.input2, //借款人手机
          status: this.mysenddata.selectype, //状态筛选
          page: this.currentPage, //当前是多少页，页面创建时默认第一页
          limit: this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
        }
      }).then(res=>{
        console.log(res);
        this.gridData=res.data.data;
        this.total=res.data.count;
        for (var i=0;i<this.gridData.length;i++){
          if (this.gridData[i].investStatuas==1){
            this.gridData[i].investStatuas='投资中'
          }else if(this.gridData[i].investStatuas==2){
            this.gridData[i].investStatuas='投资失败'
          }else if(this.gridData[i].investStatuas==3){
            this.gridData[i].investStatuas='待回款'
          }else {
            this.gridData[i].investStatuas='已结算'
          }
        }
      })
    },
    //=============================handleSizeChange改变页面展示条数方法的结束=============================================

    //=============================handleCurrentChange切换页码方法的开始=============================================
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios({
        method:'post',
        headers: {"Content-type":"application/json;charset=utf-8"},
        url:'/eloan/bidInvest/selectInvestRecord',
        data:{
          loanName: this.mysenddata.input1, //借款方
          tel: this.mysenddata.input2, //借款人手机
          status: this.mysenddata.selectype, //状态筛选
          page: this.currentPage, //当前是多少页，页面创建时默认第一页
          limit: this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
        }
      }).then(res=>{
        console.log(res);
        this.gridData=res.data.data;
        this.total=res.data.count;
        for (var i=0;i<this.gridData.length;i++){
          if (this.gridData[i].investStatuas==1){
            this.gridData[i].investStatuas='投资中'
          }else if(this.gridData[i].investStatuas==2){
            this.gridData[i].investStatuas='投资失败'
          }else if(this.gridData[i].investStatuas==3){
            this.gridData[i].investStatuas='待回款'
          }else {
            this.gridData[i].investStatuas='已结算'
          }
        }
      })
    },
    //=============================handleCurrentChange切换页码方法的结束=============================================
    //=============================页尾的事件结束========================================================================

    //=====================================将显示的数据转换成excel表导出的方法开始=========================================
    tableToExcel() {
      //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `编号,借款方,借款人手机,标名,借款金额,期限,还款方式,期数,应还款时间,实际还款时间,预还金额,实还金额,本金,利息,逾期罚息,状态,还款方式,还款人\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < this.gridData.length; i++) {
        //this.gridData是从后端获得的数据
        for (let item in this.gridData[i]) {
          str += `${this.gridData[i][item] + "\t"},`;
        }
        str += "\n";
      }
      //encodeURIComponent解决中文乱码
      let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download = this.titlename + "表.xls"; //表格名为后缀的xlsx打不开,csv和xls能打开=======this.titlename只是将获取到的数据传递给命名的规则
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    //=====================================将显示的数据转换成excel表导出的方法结束=========================================
  } //-------------------------------------这个是methods方法的闭合标签
};
</script>

<style scoped>
/*设置子页面的宽度 */
.list8 {
  width: 100%;
}
.tabcont {
  padding: 40px 50px;
}
/*  搜索框的样式排版*/
.headersearch {
  width: 1000px;
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
}
.w430 {
  width: 400px;
  margin-right: 10px;
}
  .dc{
    margin-left: 20px;
  }
</style>
