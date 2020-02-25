<!--君爸爸的第三个子页面==借款审核-->
<template>
  <div class="list3">
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
          <el-option label="全部类型" value></el-option>
          <el-option label="车抵押" value="车抵押"></el-option>
          <el-option label="房抵押" value="房抵押"></el-option>
          <el-option label="民品抵押" value="民品抵押"></el-option>
        </el-select>
      </div>
      <!--     表格/-->
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
          <el-table-column property="auditTime" label="提交时间" align="center" width="100px"></el-table-column>
          <el-table-column property="status" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button type="primary" @click="audit(scope.row)" size="mini">审核</el-button>
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
  name: "list3",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://172.16.14.116:8080", //定义这个页面的请求的ip地址
      mysenddata: {
        input1: "",
        input2: "",
        selectype: ""
      },
      gridData: [{}], //表格的数据
      total: 0, //总共有多少条数据;
      currentPage: 1, //当前第几页
      pagesize: 10, //当前展示的条数
    };
  },

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
      .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
        params: {
          current: this.currentPage, //当前的页码
          size: this.pagesize //展示的条数
        }
      })
      .then(res => {
        console.log(res);
        this.gridData = res.data.records;
        this.total = res.data.total;
        // this.Severimg=res.data.records.
        for (var i = 0; i < this.gridData.length; i++) {
          this.gridData[i].arp=this.gridData[i].arp+"%";
          this.gridData[i].amount=this.gridData[i].amount+"元";
          this.gridData[i].borrowTime=this.gridData[i].borrowTime+this.gridData[i].timeType;
          if (this.gridData[i].status == 0) {
            this.gridData[i].status = "新标草稿";
          } else if (this.gridData[i].status == 1) {
            this.gridData[i].status = "新标待审核";
          } else {
            this.gridData[i].status = "初审不通过";
          }
        }
        this.currentPage = 1;
        this.pagesize = 10;
      });
  },
  methods: {
    /**
     * @name: handleSizeChang
     * @description: 当用户改变页面的展示条数时触发的函数
     * @param {Number} val 是此时页面切换的展示条数
     * @return:
     * @Author: Wang Jun
     */
    handleSizeChange(val) {
      //页面展示条数改变时
      // console.log("页面切换到"+val+"页");
      this.pagesize = val;
      //----------------------------------------发起请求----------------------------------------------------------------
      this.$axios
        .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
          params: {
            current: this.currentPage, //当前的页码
            size: this.pagesize, //显示的条数
            userName: this.mysenddata.input1, //第一个输入框的内容
            tel: this.mysenddata.input2, //第二个输入框的内容
            guarantyType: this.mysenddata.selectype //下拉框的内容
          }
        })
        .then(res => {
          console.log(res);
          this.gridData = res.data.records;
          this.total = res.data.total;
          for (var i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].status == 0) {
              this.gridData[i].status = "新标草稿";
            } else if (this.gridData[i].status == 1) {
              this.gridData[i].status = "新标待审核";
            } else {
              this.gridData[i].status = "初审不通过";
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
      //切换页码时
      this.currentPage = val;
      //----------------------------------------发起请求----------------------------------------------------------------
      this.$axios
        .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
          params: {
            current: this.currentPage, //当前的页码
            size: this.pagesize, //显示的条数
            userName: this.mysenddata.input1, //第一个输入框的内容
            tel: this.mysenddata.input2, //第二个输入框的内容
            guarantyType: this.mysenddata.selectype //下拉框的内容
          }
        })
        .then(res => {
          this.gridData = res.data.records;
          this.total = res.data.total;
          for (var i = 0; i < this.gridData.length; i++) {
            // console.log(this.gridData[i].status);
            if (this.gridData[i].status == 0) {
              this.gridData[i].status = "新标草稿";
            } else if (this.gridData[i].status == 1) {
              this.gridData[i].status = "新标待审核";
            } else {
              this.gridData[i].status = "初审不通过";
            }
          }
        });
    },

    /**
     * @name: myinputclick
     * @description: 当用户输入框的内容是空的时候，点击搜索按钮触发的事件
     * @param {Number} val 是触发对应输入框传递的的数值
     * @return:
     * @Author: Wang Jun
     */
    myinputclick(val) {
      if (val == 0) {
        if (this.mysenddata.input1 == "") {
          // 当借款方的内容为空的时候调用的方法
          this.$message({
            message: "借款方不能为空",
            type: "warning"
          });
        }
      } else {
        if (this.mysenddata.input2 == "") {
          // 当借款方的内容为空的时候调用的方法
          this.$message({
            message: "借款人手机不能为空",
            type: "warning"
          });
        }
      }
    },

    /**
     * @name: myinputval
     * @description: 当搜索框中的三个值变化时调用的函数
     * @param {Number} val 数值0是输入框一，1是输入框二，2是输入框三，3是下拉框
     * @return:
     * @Author: Wang Jun
     */
    myinputval(val) {
      //第一个值的变化
      if (val == 0) {
        if (this.mysenddata.input1 != "") {
          this.$axios
            .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
              params: {
                current: this.currentPage, //当前的页码
                size: this.pagesize, //显示的条数
                userName: this.mysenddata.input1, //第一个输入框的内容
                tel: this.mysenddata.input2, //第二个输入框的内容
                guarantyType: this.mysenddata.selectype //下拉框的内容
              }
            })
            .then(res => {
              this.gridData = res.data.records;
              this.total = res.data.total;
              for (var i = 0; i < this.gridData.length; i++) {
                // console.log(this.gridData[i].status);
                if (this.gridData[i].status == 0) {
                  this.gridData[i].status = "新标草稿";
                } else if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "新标待审核";
                } else {
                  this.gridData[i].status = "初审不通过";
                }
              }
            });
        } else {
          if (
            this.mysenddata.input1 == "" &&
            this.mysenddata.input2 == "" &&
            this.mysenddata.input3 == ""
          ) {
            this.mysenddata.selectype = "";
            // console.log("马上重新调用数据库的前十条数据");
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
                params: {
                  current: 1, //当前的页码
                  size: 10 //展示的条数
                }
              })
              .then(res => {
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else {
                    this.gridData[i].status = "初审不通过";
                  }
                }
              });
          } else {
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
                params: {
                  current: this.currentPage, //当前的页码
                  size: this.pagesize, //显示的条数
                  userName: this.mysenddata.input1, //第一个输入框的内容
                  tel: this.mysenddata.input2, //第二个输入框的内容
                  guarantyType: this.mysenddata.selectype //下拉框的内容
                }
              })
              .then(res => {
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else {
                    this.gridData[i].status = "初审不通过";
                  }
                }
              });
          }
        }
        //第一个输入框的值变化结束

        //第二个输入框的值变化
      } else if (val == 1) {
        if (this.mysenddata.input2 != "") {
          this.$axios
            .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
              params: {
                current: this.currentPage, //当前的页码
                size: this.pagesize, //显示的条数
                userName: this.mysenddata.input1, //第一个输入框的内容
                tel: this.mysenddata.input2, //第二个输入框的内容
                guarantyType: this.mysenddata.selectype //下拉框的内容
              }
            })
            .then(res => {
              this.gridData = res.data.records;
              this.total = res.data.total;
              for (var i = 0; i < this.gridData.length; i++) {
                // console.log(this.gridData[i].status);
                if (this.gridData[i].status == 0) {
                  this.gridData[i].status = "新标草稿";
                } else if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "新标待审核";
                } else {
                  this.gridData[i].status = "初审不通过";
                }
              }
            });
        } else {
          if (
            this.mysenddata.input1 == "" &&
            this.mysenddata.input2 == "" &&
            this.mysenddata.input3 == ""
          ) {
            this.mysenddata.selectype = "";
            // console.log("马上重新调用数据库的前十条数据");
            //当两个输入框的内容都为空时调用的方法
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
                params: {
                  current: 1, //当前的页码
                  size: 10 //展示的条数
                }
              })
              .then(res => {
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  // console.log(this.gridData[i].status);
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else {
                    this.gridData[i].status = "初审不通过";
                  }
                }
              });
          } else {
            // console.log(this.mysenddata.selectype);
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
                params: {
                  current: this.currentPage, //当前的页码
                  size: this.pagesize, //显示的条数
                  userName: this.mysenddata.input1, //第一个输入框的内容
                  tel: this.mysenddata.input2, //第二个输入框的内容
                  guarantyType: this.mysenddata.selectype //下拉框的内容
                }
              })
              .then(res => {
                this.gridData = res.data.records;
                this.total = res.data.total;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 0) {
                    this.gridData[i].status = "新标草稿";
                  } else if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "新标待审核";
                  } else {
                    this.gridData[i].status = "初审不通过";
                  }
                }
              });
          }
        }
      }
      //下拉框内容发生变化时
      else {
        // console.log(this.mysenddata.selectype);
        //----------------------------------------发起请求----------------------------------------------------------------
        this.$axios
          .get("/eloan/bidInfo/selectBidInfoByAuditColumns", {
            params: {
              current: this.currentPage, //当前的页码
              size: this.pagesize, //显示的条数
              userName: this.mysenddata.input1, //第一个输入框的内容
              tel: this.mysenddata.input2, //第二个输入框的内容
              guarantyType: this.mysenddata.selectype //下拉框的内容
            }
          })
          .then(res => {
            // console.log(res);
            this.total = res.data.total;
            this.gridData = res.data.records;
            for (var i = 0; i < this.gridData.length; i++) {
              console.log(this.gridData[i].status);
              if (this.gridData[i].status == 0) {
                this.gridData[i].status = "新标草稿";
              } else if (this.gridData[i].status == 1) {
                this.gridData[i].status = "新标待审核";
              } else {
                this.gridData[i].status = "初审不通过";
              }
            }
          });
      }
    },

    /**
     * @name: audit
     * @description: 跳转到审核页面
     * @param {object} row 是当前这一行的参数，路由跳转携带参数
     * @return:
     * @Author: Wang Jun
     */
    audit(row) {
      this.$router.push({
        name: "auditpage",
        path: "/aside2/auditpage",
        params: { name: "借款审核详情", usernub: row.serialNumber }
      });
    }
  }
};
</script>

<style scoped>
/*设置子页面的宽度 */
.list3 {
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
.mytable {
  margin-bottom: 50px;
}
</style>
