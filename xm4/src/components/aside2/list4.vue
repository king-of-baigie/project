<!--君爸爸的第四个子页面==标的上架-->
<template>
  <div class="list4">
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
        <el-select
          v-model="mysenddata.selectype"
          placeholder="类型筛选"
          size="small"
          class="w430"
          @input="myinputval(2)"
        >
          <el-option label="全部类型" value></el-option>
          <el-option label="车抵押" value="车抵押"></el-option>
          <el-option label="房抵押" value="房抵押"></el-option>
          <el-option label="民品抵押" value="民品抵押"></el-option>
        </el-select>
      </div>
      <!--      表格-->
      <div class="mytable">
        <el-table
          :data="gridData"
          :stripe="true"
          :show-header="true"
          :header-cell-style="{background:'#f2f2f2',color:'#000000'}"
        >
          <el-table-column property="serialNumber" label="编号" align="center"></el-table-column>
          <el-table-column property="userName" label="借款方" align="center"></el-table-column>
          <el-table-column property="tel" label="借款人手机" align="center"></el-table-column>
          <el-table-column property="name" label="标名" align="center"></el-table-column>
          <el-table-column property="guarantor" label="担保机构" align="center"></el-table-column>
          <el-table-column property="guarantyType" label="类型" align="center"></el-table-column>
          <el-table-column property="amount" label="借款金额" align="center"></el-table-column>
          <el-table-column property="arp" label="年化利率" align="center"></el-table-column>
          <el-table-column property="repayType" label="还款方式" align="center"></el-table-column>
          <el-table-column property="borrowTime" label="期限" align="center"></el-table-column>
          <el-table-column property="auditTime" label="审核时间" align="center" width="100px"></el-table-column>
          <el-table-column property="status" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button type="primary" @click="mainTenance(scope.row)" size="mini">上架</el-button>
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
import tabrow from "../tabrow"; //引入王君的横向的组件
export default {
  name: "list4",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://118.190.202.182:8080",
      mysenddata: {
        input1: "", //借款方搜索框的值
        input2: "", //借款人搜索框的值
        selectype: "" //下拉框的值
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
    this.$axios
      .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
        params: {
          current: 1, //当前是多少页，页面创建时默认第一页
          size: 10 //当前展示的页面条数，页面创建时默认展示前10条
        }
      })
      .then(res => {
        //页面创建时请求的数据
        console.log(res);
        this.gridData = res.data.records;
        this.total = res.data.total;
        for (var i = 0; i < this.gridData.length; i++) {
          this.gridData[i].arp=this.gridData[i].arp+"%";
          this.gridData[i].amount=this.gridData[i].amount+"元";
          this.gridData[i].borrowTime=this.gridData[i].borrowTime+this.gridData[i].timeType;
          if (this.gridData[i].status == 0) {
            this.gridData[i].status = "新标草稿";
          } else if (this.gridData[i].status == 1) {
            this.gridData[i].status = "新标待审核";
          } else if (this.gridData[i].status == 2) {
            this.gridData[i].status = "初审不通过";
          } else {
            this.gridData[i].status = "待上架";
          }
        }
        this.currentPage = 1;
        this.pagesize = 10;
      });
  }, //-----------------------------------------这个是created的闭合标签

  //-------------------------------------------用户自定义方法的开始
  methods: {
    //================================搜索栏的事件开始=============================================
    /**
     * @name: myinputval
     * @description: 当搜索框中的三个值变化时调用的函数
     * @param {Number} val 数值0是输入框一，1是输入框二，2是下拉框
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
            .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
              params: {
                userName: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                guarantyType: this.mysenddata.selectype, //状态筛选
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
                if (this.gridData[i].status == 0) {
                  this.gridData[i].status = "新标草稿";
                } else if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "新标待审核";
                } else if (this.gridData[i].status == 2) {
                  this.gridData[i].status = "初审不通过";
                } else {
                  this.gridData[i].status = "待上架";
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
              .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
                params: {
                  current: 1, //当前是多少页，页面创建时默认第一页
                  size: 10 //当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                // console.log("当第一个用户输入框的值为空且两个输入框的值都为空时");
                // console.log(res);
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else if (this.gridData[i].status == 2) {
                    this.gridData[i].status = "初审不通过";
                  } else {
                    this.gridData[i].status = "待上架";
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
              .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
                params: {
                  userName: this.mysenddata.input1, //借款方
                  tel: this.mysenddata.input2, //借款人手机
                  guarantyType: this.mysenddata.selectype, //状态筛选
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
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else if (this.gridData[i].status == 2) {
                    this.gridData[i].status = "初审不通过";
                  } else {
                    this.gridData[i].status = "待上架";
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
            .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
              params: {
                userName: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                guarantyType: this.mysenddata.selectype, //状态筛选
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
                if (this.gridData[i].status == 0) {
                  this.gridData[i].status = "新标草稿";
                } else if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "新标待审核";
                } else if (this.gridData[i].status == 2) {
                  this.gridData[i].status = "初审不通过";
                } else {
                  this.gridData[i].status = "待上架";
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
              .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
                params: {
                  current: 1, //当前是多少页，页面创建时默认第一页
                  size: 10 //当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                // console.log("当第二个借款人手机输入框为空且两个输入框的值都为空时");
                // console.log(res);
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else if (this.gridData[i].status == 2) {
                    this.gridData[i].status = "初审不通过";
                  } else {
                    this.gridData[i].status = "待上架";
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
              .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
                params: {
                  userName: this.mysenddata.input1, //借款方
                  tel: this.mysenddata.input2, //借款人手机
                  guarantyType: this.mysenddata.selectype, //状态筛选
                  current: this.currentPage, //当前的页码
                  size: this.pagesize //当前每页显示的条数
                }
              })
              .then(res => {
                // console.log("当第二个借款人手机输入框为空且另一个输入框的值不为空时");
                // console.log(res);
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else if (this.gridData[i].status == 2) {
                    this.gridData[i].status = "初审不通过";
                  } else {
                    this.gridData[i].status = "待上架";
                  }
                }
              });
          }
        }
      }
      //如果val不是0和1则是筛选下拉框的操作
      else {
        // console.log('下拉框的操作');
        // console.log(this.mysenddata.selectype);
        //直接向后台发送数据
        //----------------------------------------发起请求----------------------------------------------------------------
        this.$axios
          .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
            params: {
              userName: this.mysenddata.input1, //借款方
              tel: this.mysenddata.input2, //借款人手机
              guarantyType: this.mysenddata.selectype, //状态筛选
              current: this.currentPage, //当前的页码
              size: this.pagesize //当前每页显示的条数
            }
          })
          .then(res => {
            console.log("当用户点击下拉框时");
            console.log(res);
            this.gridData = res.data.records;
            this.total = res.data.total;
            for (var i = 0; i < this.gridData.length; i++) {
              if (this.gridData[i].status == 0) {
                this.gridData[i].status = "新标草稿";
              } else if (this.gridData[i].status == 1) {
                this.gridData[i].status = "新标待审核";
              } else if (this.gridData[i].status == 2) {
                this.gridData[i].status = "初审不通过";
              } else {
                this.gridData[i].status = "待上架";
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
      // console.log(val);
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
      //----------------------------------------发起请求----------------------------------------------------------------
      this.$axios
        .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
          params: {
            userName: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            guarantyType: this.mysenddata.selectype, //状态筛选
            current: this.currentPage, //当前的页码
            size: this.pagesize //当前每页显示的条数
          }
        })
        .then(res => {
          // console.log("当切换页面展示条数时");
          // console.log(res);
          this.gridData = res.data.records;
          this.total = res.data.total;
          for (var i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].status == 0) {
              this.gridData[i].status = "新标草稿";
            } else if (this.gridData[i].status == 1) {
              this.gridData[i].status = "新标待审核";
            } else if (this.gridData[i].status == 2) {
              this.gridData[i].status = "初审不通过";
            } else {
              this.gridData[i].status = "待上架";
            }
          }
        });
    },

    /**
     * @name: handleCurrentChange
     * @description: 输入页面切换或者点击指定页数时触发的函数
     * @param {Number} val 是当前的页码
     * @return:
     * @Author: Wang Jun
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      //----------------------------------------发起请求----------------------------------------------------------------
      this.$axios
        .get("/eloan/bidInfo/selectBidInfoByPutawayColumns", {
          params: {
            userName: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            guarantyType: this.mysenddata.selectype, //状态筛选
            current: this.currentPage, //当前的页码
            size: this.pagesize //当前每页显示的条数
          }
        })
        .then(res => {
          // console.log("当切换页码时");
          // console.log(res);
          this.gridData = res.data.records;
          this.total = res.data.total;
          for (var i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].status == 0) {
              this.gridData[i].status = "新标草稿";
            } else if (this.gridData[i].status == 1) {
              this.gridData[i].status = "新标待审核";
            } else if (this.gridData[i].status == 2) {
              this.gridData[i].status = "初审不通过";
            } else {
              this.gridData[i].status = "待上架";
            }
          }
        });
    },

    /**
     * @name: mainTenance
     * @description: 标的上架，路由跳转时携带参数
     * @param {object} row 是一整行的内容
     * @return:
     * @Author: Wang Jun
     */
    mainTenance(row) {
      console.log(row);
      this.$router.push({
        name: "markon",
        path: "/aside2/markon",
        params: { usernub: row.serialNumber }
      });
    }
  } //-------------------------------------这个是methods方法的闭合标签
};
</script>

<style scoped>
/*设置子页面的宽度 */
.list4 {
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
