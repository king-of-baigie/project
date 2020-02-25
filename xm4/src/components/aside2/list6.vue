<!--君爸爸的第六个子页面==满标复审-->
<template>
  <div class="list6">
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
          size="small"
          class="w430"
          @input="myinputval(1)"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" @click="myinputclick(1)"></i>
        </el-input>
        <el-select v-model="mysenddata.selectype" size="small" class="w430" @change="myinputval(2)">
          <el-option label="全部进度" value></el-option>
          <el-option label="满标待审" value="1"></el-option>
          <el-option label="未满标" value="0"></el-option>
        </el-select>
      </div>
      <!--     表格-->
      <div class="mytable">
        <el-table
          :data="gridData"
          :stripe="true"
          :show-header="true"
          :header-cell-style="{background:'#f2f2f2',color:'#000000'}"
        >
          <el-table-column property="serialNumber" label="编号" align="center" width="115px"></el-table-column>
          <el-table-column property="userName" label="借款方" align="center" width="100px"></el-table-column>
          <el-table-column property="tel" label="借款人手机" align="center"></el-table-column>
          <el-table-column property="name" label="标名" align="center" width="80px"></el-table-column>
          <el-table-column property="amount" label="借款金额" align="center"></el-table-column>
          <el-table-column property="arp" label="年化利率" align="center"></el-table-column>
          <el-table-column property="repayType" label="还款方式" align="center"></el-table-column>
          <el-table-column property="borrowTime" label="期限" align="center"></el-table-column>
          <el-table-column property="putAwayTime" label="募集时长" align="center" width="110px"></el-table-column>
          <el-table-column property="startTime" label="募集资金" align="center" width="90px"></el-table-column>
          <el-table-column property="schedule" label="投资进度" align="center"></el-table-column>
          <el-table-column property="startTime" label="开售时间" align="center" width="100px"></el-table-column>
          <el-table-column property="endTime" label="结束时间" align="center" width="100px"></el-table-column>
          <el-table-column property="status" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="review(scope.row)">复审</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <div>
<!--        模态框-->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible" style="width: 1000px;margin: 0 auto;">
          <el-form :model="reviewform" class="modelform">
            <el-form-item label="是否通过">
              <el-radio-group v-model="reviewform.isPass">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="reviewform.remark"></el-input>
            </el-form-item>
            <input type="hidden" :value="reviewform.hidden" />
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitreview()">提交审核</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
import tabrow from "../tabrow"; //引入横向的组件第二步引入这个文件
export default {
  name: "list6",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://118.190.202.182:8080", //定义这个页面的请求的ip地址
      dialogFormVisible: false,
      mysenddata: {
        //搜索框的总数据对象
        input1: "", //借款方搜索框的值
        input2: "", //借款人搜索框的值
        selectype: "" //下拉框的值
      },
      //提交复审
      reviewform:{
        isPass:'',//是否通过
        remark:'',//备注
        serialNumber:'',//隐藏的编号
      },
      gridData: [{}], //表格的数据
      total: 0, //总共有多少条数据;
      currentPage: 1, //当前第几页
      pagesize: 10 //当前展示的条数
    };
  }, //-----------------------------data的闭合标签------------------------------------

  /**
   * @name: created
   * @description: 生命周期钩子函数，页面创建时渲染页面
   * @return:
   * @Author: Wang Jun
   */
  created() {
    this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
    //----------------------------------------发起请求----------------------------------------------------------------
    this.$axios({
      method: "get",
      headers: { "Content-type": "application/json;charset=utf-8" },
      url: "/eloan/bidInfo/selectByFullScale",
      params: {
        current: 1, //当前是多少页，页面创建时默认第一页
        size: 10 //当前展示的页面条数，页面创建时默认展示前10条
      }
    }).then(res => {
      console.log(res);
      this.gridData = res.data.records;
      this.total = res.data.total;
      for (var i = 0; i < this.gridData.length; i++) {
        if (this.gridData[i].status == 1) {
          this.gridData[i].status = "满标待审";
        } else {
          this.gridData[i].status = "未满标";
        }
      }
      this.currentPage = 1;
      this.pagesize = 10;
    });
  }, //-----------------------------------------这个是created的闭合标签

  //-------------------------------------------用户自定义方法的开始
  methods: {
    //================================搜索栏的事件开始=============================================
    //========================myinputval用户改变输入框和下拉框调用的方法的开始==============================================
    /**
     * @name: myinputval
     * @description: 当搜索框中的三个值变化时调用的函数
     * @param {Number} val 数值0是输入框一，1是输入框二，2是输入框二，3是下拉框
     * @return:
     * @Author: Wang Jun
     */
    myinputval(val) {
      //如果val=0则是借款方输入框的内容改变
      if (val == 0) {
        //当借款方输入框不为空时
        if (this.mysenddata.input1 != "") {
          //----------------------------------------发起请求----------------------------------------------------------------
          this.$axios
            .get("/eloan/bidInfo/selectByFullScale", {
              params: {
                userName: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                status: this.mysenddata.selectype, //状态筛选
                current: this.currentPage, //当前的页码
                size: this.pagesize //当前每页显示的条数
              }
            })
            .then(res => {
              // console.log("当第一个用户输入框有值时");
              // console.log(res);
              this.gridData = res.data.records;
              this.total = res.data.total;
              for (var i = 0; i < this.gridData.length; i++) {
                if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "满标待审";
                } else {
                  this.gridData[i].status = "未满标";
                }
              }
            });
        }
        //当借款方输入框的值为空时
        else {
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            this.mysenddata.selectype = "";
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectByFullScale", {
                params: {
                  current: 1, //当前是多少页，页面创建时默认第一页
                  size: 10 //当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                console.log(
                  "当第一个用户输入框的值为空且两个输入框的值都为空时"
                );
                // console.log(res);
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "满标待审";
                  } else {
                    this.gridData[i].status = "未满标";
                  }
                }
                this.currentPage = 1;
                this.pagesize = 10;
              });
          }
          //当只有当前的为空时
          else {
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectByFullScale", {
                params: {
                  userName: this.mysenddata.input1, //借款方
                  tel: this.mysenddata.input2, //借款人手机
                  status: this.mysenddata.selectype, //状态筛选
                  current: this.currentPage, //当前的页码
                  size: this.pagesize //当前每页显示的条数
                }
              })
              .then(res => {
                // console.log("当用户的输入框的值为空且另一个输入框的值不为空时");
                // console.log(res);
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "满标待审";
                  } else {
                    this.gridData[i].status = "未满标";
                  }
                }
              });
          }
        }
      }
      //如果val=1则是借款人手机输入框的内容改变
      else if (val == 1) {
        //当借款人手机输入框不为空时
        if (this.mysenddata.input2 != "") {
          //----------------------------------------发起请求----------------------------------------------------------------
          this.$axios
            .get("/eloan/bidInfo/selectByFullScale", {
              params: {
                userName: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                status: this.mysenddata.selectype, //状态筛选
                current: this.currentPage, //当前的页码
                size: this.pagesize //当前每页显示的条数
              }
            })
            .then(res => {
              // console.log("当第二个借款人手机输入框有值时");
              // console.log(res);
              this.gridData = res.data.records;
              this.total = res.data.total;
              for (var i = 0; i < this.gridData.length; i++) {
                if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "满标待审";
                } else {
                  this.gridData[i].status = "未满标";
                }
              }
            });
        }
        //当借款人手机输入框为空时
        else {
          console.log("此时手机输入框的内容为空");
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            this.mysenddata.selectype = "";
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectByFullScale", {
                params: {
                  current: 1, //当前是多少页，页面创建时默认第一页
                  size: 10 //当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                // console.log(
                //   "当第二个借款人手机输入框为空且两个输入框的值都为空时"
                // );
                // console.log(res);
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "满标待审";
                  } else {
                    this.gridData[i].status = "未满标";
                  }
                }
                this.currentPage = 1;
                this.pagesize = 10;
              });
          }
          //当只有当前的为空时
          else {
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectByFullScale", {
                params: {
                  userName: this.mysenddata.input1, //借款方
                  tel: this.mysenddata.input2, //借款人手机
                  status: this.mysenddata.selectype, //状态筛选
                  current: this.currentPage, //当前的页码
                  size: this.pagesize //当前每页显示的条数
                }
              })
              .then(res => {
                // console.log(
                //   "当第二个借款人手机输入框为空且另一个输入框的值不为空时"
                // );
                // console.log(res);
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "满标待审";
                  } else {
                    this.gridData[i].status = "未满标";
                  }
                }
              });
          }
        }
      }
      //如果val不是0和1则是筛选下拉框的操作
      else {
        //直接向后台发送数据
        //----------------------------------------发起请求----------------------------------------------------------------
        this.$axios
          .get("/eloan/bidInfo/selectByFullScale", {
            params: {
              userName: this.mysenddata.input1, //借款方
              tel: this.mysenddata.input2, //借款人手机
              status: this.mysenddata.selectype, //状态筛选
              current: this.currentPage, //当前的页码
              size: this.pagesize //当前每页显示的条数
            }
          })
          .then(res => {
            console.log("当用户点击下拉框时");
            // console.log(res);
            this.gridData = res.data.records;
            this.total = res.data.total;
            for (var i = 0; i < this.gridData.length; i++) {
              if (this.gridData[i].status == 1) {
                this.gridData[i].status = "满标待审";
              } else {
                this.gridData[i].status = "未满标";
              }
            }
          });
      }
    },
    //========================myinputval用户改变输入框和下拉框调用的方法的结尾==============================================

    /**
     * @name: myinputclick
     * @description: 当用户输入框的内容是空的时候，点击搜索按钮触发的事件
     * @param {Number} val 是触发对应输入框传递的的数值
     * @return:
     * @Author: Wang Jun
     */
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

    /**
     * @name: handleSizeChang
     * @description: 当用户改变页面的展示条数时触发的函数
     * @param {Number} val 是此时页面切换的展示条数
     * @return:
     * @Author: Wang Jun
     */
    handleSizeChange(val) {
      //页面展示条数改变时
      this.pagesize = val;
      // var pagedata = { page: this.currentPage, limit: val };
      //----------------------------------------发起请求----------------------------------------------------------------
      this.$axios
        .get("/eloan/bidInfo/selectByFullScale", {
          params: {
            userName: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            status: this.mysenddata.selectype, //状态筛选
            current: this.currentPage, //当前的页码
            size: this.pagesize //当前每页显示的条数
          }
        })
        .then(res => {
          console.log("当切换页面展示条数时");
          // console.log(res);
          this.gridData = res.data.records;
          this.total = res.data.total;
          for (var i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].status == 1) {
              this.gridData[i].status = "满标待审";
            } else {
              this.gridData[i].status = "未满标";
            }
          }
        });
    },
    //=============================handleSizeChange改变页面展示条数方法的结束=============================================

    /**
     * @name: handleSizeChang
     * @description: 当用户改变页面的展示条数时触发的函数
     * @param {Number} val 是此时页面切换的展示条数
     * @return:
     * @Author: Wang Jun
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      //----------------------------------------发起请求----------------------------------------------------------------
      this.$axios
        .get("/eloan/bidInfo/selectByFullScale", {
          params: {
            userName: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            status: this.mysenddata.selectype, //状态筛选
            current: this.currentPage, //当前的页码
            size: this.pagesize //当前每页显示的条数
          }
        })
        .then(res => {
          console.log("当切换页码时");
          // console.log(res);
          this.gridData = res.data.records;
          this.total = res.data.total;
          for (var i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].status == 1) {
              this.gridData[i].status = "满标待审";
            } else {
              this.gridData[i].status = "未满标";
            }
          }
        });
    },
    /**
     * @name: review
     * @description: 点击复审弹出模态框
     * @param {row} row 获取当前行的条数
     * @return:
     * @Author: Wang Jun
     */
    review(row){
      console.log(row);
      this.dialogFormVisible=true;
      this.reviewform.hidden=row.serialNumber;
    },
    /**
     * @name: submitreview
     * @description: 提交审核
     * @return:
     * @Author: Wang Jun
     */
    submitreview(){
      // var serialNumber=this.reviewform.hidden;
      // delete this.reviewform.hidden;
      // var mydata=;
      this.$axios.post('/eloan/bidInfo/insertFullScaleRemark',{
          data:this.reviewform
      }).then(res=>{
        // console.log(res);
        if(res.data.code==200){
                  this.$message({
                    message: "提交审核成功",
                    type: "success"
                  });
                  return this.dialogFormVisible=false;
        }else {
                  this.$message({
                    message: "修改失败"+res.data.msg,
                    type: "warning"
                  });
        }
      })
    }
    //=============================handleCurrentChange切换页码方法的结束=============================================
  } //-------------------------------------这个是methods方法的闭合标签
};
</script>

<style scoped>
/*设置子页面的宽度 */
.list6 {
  width: 100%;
}
.tabcont {
  padding-top: 50px;
  width: 95%;
  margin: 0 auto;
}
/*  搜索框的样式排版*/
.headersearch {
  width: 800px;
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
  margin-bottom: 50px;
}
</style>
