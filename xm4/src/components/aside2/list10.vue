<!--君爸爸的第十个子页面==还款管理-->
<template>
  <div class="list10">
    <!--    引入横向的组件第一步-->
    <mytabarow v-bind:passtitle="titlename"></mytabarow>
    <div class="tabcont">
      <div class="headersearch">
        <div>
          <el-input placeholder="搜索借款方" v-model="mysenddata.input1" size="small" class="w430" @input="myinputval(0)">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="myinputclick(0)"></i>
          </el-input>
          <el-input placeholder="搜索借款人手机" v-model="mysenddata.input2" size="small" class="w430" @input="myinputval(1)">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="myinputclick(1)"></i>
          </el-input>
          <el-select v-model="mysenddata.selectype" placeholder="状态筛选" size="small" class="w430" @change="myinputval(2)">
            <el-option label="全部状态" value="全部状态"></el-option>
            <el-option label="还款中" value="还款中"></el-option>
            <el-option label="催缴中" value="催缴中"></el-option>
          </el-select>
        </div>

        <!--        右边导出-->
        <div>
          <el-button size="small" @click="tableToExcel()">导出</el-button>
        </div>
      </div>
      <!--      表格-->
      <div class="mytable">
        <el-table
          :data="gridData"
          :stripe="true"
          :show-header="true"
          :header-cell-style="{background:'#f2f2f2',color:'#000000'}"
        >
          <el-table-column property="serial_number" label="编号" align="center" width="115px"></el-table-column>
          <el-table-column property="username" label="借款方" align="center" width="90px"></el-table-column>
          <el-table-column property="tel" label="借款人手机" align="center" width="120px"></el-table-column>
          <el-table-column property="name" label="标名" align="center" width="80px"></el-table-column>
          <el-table-column property="amount" label="借款金额" align="center"></el-table-column>
          <el-table-column property="borrowTime" label="期限" align="center" width="80px"></el-table-column>
          <el-table-column property="repaySource" label="还款方式" align="center"></el-table-column>
          <el-table-column property="periods" label="期数" align="center"></el-table-column>
          <el-table-column property=" " label="应还款时间" align="center" width="100px"></el-table-column>
          <el-table-column property="paymentTime" label="实际还款时间" align="center" width="120px"></el-table-column>
          <el-table-column property="pmoney" label="预还金额" align="center"></el-table-column>
          <el-table-column property="paymentAmount" label="实还金额" align="center"></el-table-column>
          <el-table-column property="principal" label="本金" align="center"></el-table-column>
          <el-table-column property="interest" label="利息" align="center"></el-table-column>
          <el-table-column property="fine" label="逾期罚息" align="center" width="100px"></el-table-column>
          <el-table-column property="status" label="状态" align="center"></el-table-column>
          <el-table-column property="payName" label="是否逾期" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-link type="primary" @click="changeren(scope.row)" size="mini">操作还款</el-link>
              <el-link type="primary" @click="changeren(scope.row)" size="mini">平台垫付</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--      分页-->
      <div class="block">
        <!--        <span class="demonstration">完整功能</span>-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size=pagesize
          layout="total, sizes, prev, pager, next, jumper"
          :total=total
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import tabrow from "../tabrow"; //引入横向的组件第二步引入这个文件
export default {
  name: "list10",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api:'http://172.16.14.106:8080',//定义这个页面的请求的ip地址
      mysenddata:{//搜索框的总数据对象
        input1: "",//借款方搜索框的值
        input2: "",//借款人手机搜索框的值
        selectype:"",//下拉框的值
      },
      gridData: [{}],//表格的数据
      total:0,//总共有多少条数据;
      currentPage: 1,//当前第几页
      pagesize:10,//当前展示的条数
    };
  },//-----------------------------data的闭合标签------------------------------------

  //--------------------------------------------vue对象创建时的钩子函数created
  created() {
    this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
    //----------------------------------------------------------------------
    this.$axios.get('/eloan/payments/selectByKeys',{
      params:{
        name:"",
        tel:"",
        page:1,//当前是多少页，页面创建时默认第一页
        limit:10,//当前展示的页面条数，页面创建时默认展示前10条
      }
    }).then(res=>{
      console.log(res);
      this.total=res.data.count;
      this.gridData=res.data.data;
      for (var i=0;i<this.gridData.length;i++){
        if (this.gridData[i].status==1){
          this.gridData[i].status='还款中';
        }
        var date=new Date(this.gridData[i].paymentTime);
        this.gridData[i].paymentTime=formatDate(date);
      }

      //===================================
      function formatDate(date) {
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
      }

    });
    this.currentPage = 1;
    this.pagesize = 10;
  },//-----------------------------------------这个是created的闭合标签

  //-------------------------------------------用户自定义方法的开始
  methods:{
    //================================搜索栏的事件开始=============================================
    //========================myinputval用户改变输入框和下拉框调用的方法的开始==============================================
    myinputval(val) {
      //如果val=0则是借款方输入框的内容改变
      if (val == 0) {
        //当借款方输入框不为空时
        if (this.mysenddata.input1 != "") {
          this.$axios
            .get('/eloan/payments/selectByKeys', {
              params: {
                name:this.mysenddata.input1,
                tel:this.mysenddata.input2,
                page:this.currentPage,//当前是多少页，页面创建时默认第一页
                limit:this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
              }
            })
            .then(res => {
              console.log(res);
              this.total=res.data.count;
              this.gridData=res.data.data;
              for (var i=0;i<this.gridData.length;i++){
                if (this.gridData[i].status==1){
                  this.gridData[i].status='还款中';
                }
                var date=new Date(this.gridData[i].paymentTime);
                this.gridData[i].paymentTime=formatDate(date);
              }

              //===================================
              function formatDate(date) {
                var year=date.getFullYear();
                var month=date.getMonth()+1;
                var day=date.getDate();
                var hour=date.getHours();
                var minute=date.getMinutes();
                var second=date.getSeconds();
                return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
              }
            });
        }
        //当借款方输入框的值为空时
        else {
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            this.$axios
              .get('/eloan/payments/selectByKeys', {
                params:{
                  name:"",
                  tel:"",
                  page:1,//当前是多少页，页面创建时默认第一页
                  limit:10,//当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                console.log("当第一个用户输入框的值为空且两个输入框的值都为空时");
                console.log(res);
                this.total=res.data.count;
                this.gridData=res.data.data;
                for (var i=0;i<this.gridData.length;i++){
                  if (this.gridData[i].status==1){
                    this.gridData[i].status='还款中';
                  }
                  var date=new Date(this.gridData[i].paymentTime);
                  this.gridData[i].paymentTime=formatDate(date);
                }

                //===================================
                function formatDate(date) {
                  var year=date.getFullYear();
                  var month=date.getMonth()+1;
                  var day=date.getDate();
                  var hour=date.getHours();
                  var minute=date.getMinutes();
                  var second=date.getSeconds();
                  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                }
              });
            this.currentPage = 1;
            this.pagesize = 10;
          }
          //当只有当前的值为空时
          else {
            this.$axios
              .get('/eloan/payments/selectByKeys', {
                params: {
                  name:this.mysenddata.input1,
                  tel:this.mysenddata.input2,
                  page:this.currentPage,//当前是多少页，页面创建时默认第一页
                  limit:this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                console.log("当用户的输入框的值为空且另一个输入框的值不为空时");
                console.log(res);
                this.total=res.data.count;
                this.gridData=res.data.data;
                for (var i=0;i<this.gridData.length;i++){
                  if (this.gridData[i].status==1){
                    this.gridData[i].status='还款中';
                  }
                  var date=new Date(this.gridData[i].paymentTime);
                  this.gridData[i].paymentTime=formatDate(date);
                }

                //===================================
                function formatDate(date) {
                  var year=date.getFullYear();
                  var month=date.getMonth()+1;
                  var day=date.getDate();
                  var hour=date.getHours();
                  var minute=date.getMinutes();
                  var second=date.getSeconds();
                  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                }
              });
          }
        }
      }
      //如果val=1则是借款人手机输入框的内容改变
      else if (val == 1) {
        //当借款人手机输入框不为空时
        if (this.mysenddata.input2 != "") {
          this.$axios
            .get('/eloan/payments/selectByKeys', {
              params: {
                name:this.mysenddata.input1,
                tel:this.mysenddata.input2,
                page:this.currentPage,//当前是多少页，页面创建时默认第一页
                limit:this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
              }
            })
            .then(res => {
              console.log("当第二个借款人手机输入框有值时");
              console.log(res);
              this.total=res.data.count;
              this.gridData=res.data.data;
              for (var i=0;i<this.gridData.length;i++){
                if (this.gridData[i].status==1){
                  this.gridData[i].status='还款中';
                }
                var date=new Date(this.gridData[i].paymentTime);
                this.gridData[i].paymentTime=formatDate(date);
              }

              //===================================
              function formatDate(date) {
                var year=date.getFullYear();
                var month=date.getMonth()+1;
                var day=date.getDate();
                var hour=date.getHours();
                var minute=date.getMinutes();
                var second=date.getSeconds();
                return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
              }
            });
        }
        //当借款人手机输入框为空时
        else {
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            this.$axios
              .get('/eloan/payments/selectByKeys', {
                params:{
                  name:"",
                  tel:"",
                  page:1,//当前是多少页，页面创建时默认第一页
                  limit:10,//当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                console.log("当第二个借款人手机输入框为空且两个输入框的值都为空时");
                console.log(res);
                this.total=res.data.count;
                this.gridData=res.data.data;
                for (var i=0;i<this.gridData.length;i++){
                  if (this.gridData[i].status==1){
                    this.gridData[i].status='还款中';
                  }
                  var date=new Date(this.gridData[i].paymentTime);
                  this.gridData[i].paymentTime=formatDate(date);
                }

                //===================================
                function formatDate(date) {
                  var year=date.getFullYear();
                  var month=date.getMonth()+1;
                  var day=date.getDate();
                  var hour=date.getHours();
                  var minute=date.getMinutes();
                  var second=date.getSeconds();
                  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                }
              });
            this.currentPage = 1;
            this.pagesize = 10;
          }
          //当只有当前的为空时
          else {
            this.$axios
              .get('/eloan/payments/selectByKeys', {
                params: {
                  name:this.mysenddata.input1,
                  tel:this.mysenddata.input2,
                  page:this.currentPage,//当前是多少页，页面创建时默认第一页
                  limit:this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                console.log("当第二个借款人手机输入框为空且另一个输入框的值不为空时");
                console.log(res);
                this.total=res.data.count;
                this.gridData=res.data.data;
                for (var i=0;i<this.gridData.length;i++){
                  if (this.gridData[i].status==1){
                    this.gridData[i].status='还款中';
                  }
                  var date=new Date(this.gridData[i].paymentTime);
                  this.gridData[i].paymentTime=formatDate(date);
                }

                //===================================
                function formatDate(date) {
                  var year=date.getFullYear();
                  var month=date.getMonth()+1;
                  var day=date.getDate();
                  var hour=date.getHours();
                  var minute=date.getMinutes();
                  var second=date.getSeconds();
                  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
                }
              });
          }
        }
      }
      //如果val不是0和1则是筛选下拉框的操作
      else {
        //直接向后台发送数据
        this.$axios
          .get('/eloan/payments/selectByKeys', {
            params: {
              name:this.mysenddata.input1,
              tel:this.mysenddata.input2,
              page:this.currentPage,//当前是多少页，页面创建时默认第一页
              limit:this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
            }
          })
          .then(res => {
            console.log("当用户点击下拉框时");
            console.log(res);
            this.total=res.data.count;
            this.gridData=res.data.data;
            for (var i=0;i<this.gridData.length;i++){
              if (this.gridData[i].status==1){
                this.gridData[i].status='还款中';
              }
              var date=new Date(this.gridData[i].paymentTime);
              this.gridData[i].paymentTime=formatDate(date);
            }

            //===================================
            function formatDate(date) {
              var year=date.getFullYear();
              var month=date.getMonth()+1;
              var day=date.getDate();
              var hour=date.getHours();
              var minute=date.getMinutes();
              var second=date.getSeconds();
              return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
            }
          });
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
      this.$axios
        .get('/eloan/payments/selectByKeys', {
          params: {
            name:this.mysenddata.input1,
            tel:this.mysenddata.input2,
            page:this.currentPage,//当前是多少页，页面创建时默认第一页
            limit:this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
          }
        })
        .then(res => {
          console.log("当切换页面展示条数时");
          console.log(res);
          this.total=res.data.count;
          this.gridData=res.data.data;
          for (var i=0;i<this.gridData.length;i++){
            if (this.gridData[i].status==1){
              this.gridData[i].status='还款中';
            }
            var date=new Date(this.gridData[i].paymentTime);
            this.gridData[i].paymentTime=formatDate(date);
          }

          //===================================
          function formatDate(date) {
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hour=date.getHours();
            var minute=date.getMinutes();
            var second=date.getSeconds();
            return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
          }
        });
    },
    //=============================handleSizeChange改变页面展示条数方法的结束=============================================

    //=============================handleCurrentChange切换页码方法的开始=============================================
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .get('/eloan/payments/selectByKeys', {
          params: {
            name:this.mysenddata.input1,
            tel:this.mysenddata.input2,
            page:this.currentPage,//当前是多少页，页面创建时默认第一页
            limit:this.pagesize ,//当前展示的页面条数，页面创建时默认展示前10条
          }
        })
        .then(res => {
          console.log("当切换页码时");
          console.log(res);
          this.total=res.data.count;
          this.gridData=res.data.data;
          for (var i=0;i<this.gridData.length;i++){
            if (this.gridData[i].status==1){
              this.gridData[i].status='还款中';
            }
            var date=new Date(this.gridData[i].paymentTime);
            this.gridData[i].paymentTime=formatDate(date);
          }

          //===================================
          function formatDate(date) {
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hour=date.getHours();
            var minute=date.getMinutes();
            var second=date.getSeconds();
            return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
          }
        });
    },
    //=============================handleCurrentChange切换页码方法的结束=============================================
    //=============================页尾的事件结束========================================================================
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
    },
    //=====================================将显示的数据转换成excel表导出的方法结束=========================================
  }//-------------------------------------这个是methods方法的闭合标签
};
</script>

<style scoped>
/*这是list10的宽度*/
.list10 {
  width: 100%;
}
/*最大的容器的样式*/
.tabcont {
  width: 95%;
  margin: 0 auto;
  padding-top: 50px;
}
/*  搜索框的样式排版*/
.headersearch {
  width: 90%;
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
}
.w430 {
  width: 260px;
  margin-right: 10px;
}
/*表格的样式*/
.mytable {
  width: 1500px;
  margin-bottom: 50px;
}
</style>
