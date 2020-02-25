<!--君爸爸的第五个子页面==招标管理-->
<template>
  <div class="list5">
    <!--    引入横向的组件第一步-->
    <mytabarow :passtitle="titlename"></mytabarow>
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
      </div>
      <!--表格-->
      <div class="mytable">
        <el-table
          :data="gridData"
          :stripe="true"
          :show-header="true"
          :header-cell-style="{background:'#f2f2f2',color:'#000000'}"
        >
          <el-table-column property="serial_number" label="编号" align="center"></el-table-column>
          <el-table-column property="firm_name" label="借款方" align="center"></el-table-column>
          <el-table-column property="tel" label="借款人手机" align="center"></el-table-column>
          <el-table-column property="name" label="标名" align="center"></el-table-column>
          <el-table-column property="amount" label="借款金额" align="center"></el-table-column>
          <el-table-column property="arp" label="年化利率" align="center"></el-table-column>
          <el-table-column property="repay_type" label="还款方式" align="center"></el-table-column>
          <el-table-column property="time_type" label="期限" align="center"></el-table-column>
          <el-table-column property="put_away_time" label="上架时间" align="center" width="100px"></el-table-column>
          <el-table-column property="start_time" label="开售时间" align="center" width="100px"></el-table-column>
          <el-table-column property="schedule" label="已投金额" align="center"></el-table-column>
          <el-table-column property="amounts" label="投资进度" align="center"></el-table-column>
          <el-table-column property="status" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
<!--              <el-button type="primary" size="mini">修改</el-button>-->
              <el-button type="danger" @click="shelves(scope.row)" size="mini">下架</el-button>
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
import tabrow from "../tabrow"; //引入横向的组件第二步引入这个文件
export default {
  name: "list2",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      titlename: "", //引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://172.16.14.17:8080", //ip地址
      mysenddata: {
        //搜索框的总数据对象
        input1: "", //借款方搜索框的值
        input2: "" //借款人手机搜索框的值
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
      .get("/eloan/bidInfo/findBid", {
        params: {
          page: 1, //当前是多少页，页面创建时默认第一页
          limit: 10 //当前展示的页面条数，页面创建时默认展示前10条
        }
      })
      .then(res => {
        console.log(res);
        this.total = res.data.count; //将数据的总条数赋值
        this.gridData = res.data.data; //将查到的数据赋值
        for (var i = 0; i < this.gridData.length; i++) {
          //将数据中的状态码替换
          if (this.gridData[i].status == 1) {
            this.gridData[i].status = "募集中";
          } else {
            this.gridData[i].status = "招标中";
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
     * @param {Number} val 数值0是输入框一，1是输入框二
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
            .get("/eloan/bidInfo/findBidBy", {
              params: {
                name: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                page: this.currentPage, //当前的页码
                limit: this.pagesize //当前每页显示的条数
              }
            })
            .then(res => {
              // console.log(res);
              this.total = res.data.count;
              this.gridData = res.data.data;
              for (var i = 0; i < this.gridData.length; i++) {
                if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "募集中";
                } else {
                  this.gridData[i].status = "招标中";
                }
              }
            });
        }
        //当借款方输入框的值为空时
        else {
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bid/findBid", {
                params: {
                  page: 1, //当前是多少页，页面创建时默认第一页
                  limit: 10 //当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                this.total = res.data.count;
                this.gridData = res.data.data;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "募集中";
                  } else {
                    this.gridData[i].status = "招标中";
                  }
                }
              });
            this.currentPage = 1;
            this.pagesize = 10;
          }
          //当只有当前的值为空时
          else {
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bid/findBid", {
                params: {
                  name: this.mysenddata.input1, //借款方
                  tel: this.mysenddata.input2, //借款人手机
                  page: this.currentPage, //当前的页码
                  limit: this.pagesize //当前每页显示的条数
                }
              })
              .then(res => {
                // console.log("当用户的输入框的值为空且另一个输入框的值不为空时");
                // console.log(res);
                this.total = res.data.count;
                this.gridData = res.data.data;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "募集中";
                  } else {
                    this.gridData[i].status = "招标中";
                  }
                }
              });
          }
        }
      }
      //如果val=1则是借款人手机输入框的内容改变
      else {
        //当借款人手机输入框不为空时
        if (this.mysenddata.input2 != "") {
          //----------------------------------------发起请求----------------------------------------------------------------
          this.$axios
            .get("/eloan/bid/findBidBy", {
              params: {
                name: this.mysenddata.input1, //借款方
                tel: this.mysenddata.input2, //借款人手机
                page: this.currentPage, //当前的页码
                limit: this.pagesize //当前每页显示的条数
              }
            })
            .then(res => {
              // console.log("当借款人手机输入框不为空时");
              this.gridData = res.data.data;
              this.total = this.gridData.count;
              for (var i = 0; i < this.gridData.length; i++) {
                if (this.gridData[i].status == 1) {
                  this.gridData[i].status = "募集中";
                } else {
                  this.gridData[i].status = "招标中";
                }
              }
            });
        }
        //当借款人手机输入框为空时
        else {
          //首先判断两个输入框的内容是否为空
          //当两个输入框的值都为空时
          if (this.mysenddata.input1 == "" && this.mysenddata.input2 == "") {
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bid/findBid", {
                params: {
                  page: 1, //当前是多少页，页面创建时默认第一页
                  limit: 10 //当前展示的页面条数，页面创建时默认展示前10条
                }
              })
              .then(res => {
                // console.log(res);
                this.total = res.data.count;
                this.gridData = res.data.data;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "募集中";
                  } else {
                    this.gridData[i].status = "招标中";
                  }
                }
              });
            this.currentPage = 1;
            this.pagesize = 10;
          }
          //当只有当前的为空时
          else {
            //----------------------------------------发起请求----------------------------------------------------------------
            this.$axios
              .get("/eloan/bid/findBidBy", {
                params: {
                  name: this.mysenddata.input1, //借款方
                  tel: this.mysenddata.input2, //借款人手机
                  page: this.currentPage, //当前的页码
                  limit: this.pagesize //当前每页显示的条数
                }
              })
              .then(res => {
                // console.log("当只有当前的为空时");
                this.gridData = res.data.data;
                this.total = this.gridData.count;
                for (var i = 0; i < this.gridData.length; i++) {
                  if (this.gridData[i].status == 1) {
                    this.gridData[i].status = "募集中";
                  } else {
                    this.gridData[i].status = "招标中";
                  }
                }
              });
          }
        }
      }
    },

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
        .get("/eloan/bid/findBid", {
          params: {
            name: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            page: this.currentPage, //当前的页码
            limit: this.pagesize //当前每页显示的条数
          }
        })
        .then(res => {
          // console.log("当切换页面展示条数时");
          // console.log(res);
          this.total = res.data.count;
          this.gridData = res.data.data;
          for (var i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].status == 1) {
              this.gridData[i].status = "募集中";
            } else {
              this.gridData[i].status = "招标中";
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
      this.$axios
        .get("/eloan/bid/findBid", {
          params: {
            name: this.mysenddata.input1, //借款方
            tel: this.mysenddata.input2, //借款人手机
            page: this.currentPage, //当前的页码
            limit: this.pagesize //当前每页显示的条数
          }
        })
        .then(res => {
          // console.log("当切换页码时");
          // console.log(res);
          this.total = res.data.count;
          this.gridData = res.data.data;
          for (var i = 0; i < this.gridData.length; i++) {
            if (this.gridData[i].status == 1) {
              this.gridData[i].status = "募集中";
            } else {
              this.gridData[i].status = "招标中";
            }
          }
        });
    },

    /**
     * @name: shelves
     * @description: 下架时调用的函数
     * @param {object} row 是这一行的对象
     * @return:
     * @Author: Wang Jun
     */
    shelves(row) {
      //----------------------------------------发起请求----------------------------------------------------------------
      this.$axios({
        method: "put",
        headers: { "Content-type": "application/json;charset=utf-8" },
        url: "/eloan/bid/updateBid",
        params: {
          number: row.serial_number
        }
      }).then(res => {
        this.$message({
          message: "下架成功",
          type: "success"
        });
      });
      //下架
    }
  } //-------------------------------------这个是methods方法的闭合标签
};
</script>

<style scoped>
/*设置子页面的宽度 */
.list5 {
  width: 100%;
}
.tabcont {
  padding-top: 50px;
  width: 95%;
  margin: 0 auto;
}
/*  搜索框的样式排版*/
.headersearch {
  width: 540px;
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
