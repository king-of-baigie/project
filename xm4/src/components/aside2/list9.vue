<!--君爸爸的第九个子页面==类别管理-->
<template>
  <div class="list9">
    <mytabarow v-bind:passtitle="titlename"></mytabarow>
    <div class="listcont">
      <div class="addtype">
        <!--        dialogFormVisible = true-->
        <el-button type="primary" @click="modifidform(name,0)">+添加分类</el-button>
      </div>
      <!--      表格-->
      <div>
        <el-table
          :data="gridData"
          :stripe="true"
          :show-header="true"
          :header-cell-style="{background:'#f2f2f2',color:'#000000'}"
        >
          <el-table-column property="cname" label="分类名称" align="center"></el-table-column>
          <el-table-column property="rank" label="排序" align="center"></el-table-column>
          <el-table-column property="status" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="modifidform(scope.row,1)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--      添加分类的模态框-->
    <!--    :label-position="right"-->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" style="width: 1000px;margin: 0 auto;">
      <el-form :model="addform" class="modelform">
        <el-form-item label="分类名称:" label-width="80px">
          <el-input v-model="addform.cname" style="width: 260px;" @change="typename()"></el-input>
        </el-form-item>
        <el-form-item label="排序:" label-width="80px">
          <el-input v-model="addform.rank" style="width: 260px;" placeholder="数值越大越靠前"></el-input>
        </el-form-item>
        <el-form-item label="状态:" label-width="80px">
          <el-select v-model="addform.status" placeholder="请选择状态" style="width: 260px;">
            <el-option label="启用" value="true">启用</el-option>
            <el-option label="禁用" value="false">禁用</el-option>
          </el-select>
        </el-form-item>
        <input type="hidden" :value="addform.hidden" />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('addform')">保存</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tabrow from "../tabrow";
export default {
  name: "list9",
  components: {
    mytabarow: tabrow
  },
  data() {
    return {
      titlename: "", //王君引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://118.190.202.182:8080", //ip地址
      gridData: [{}],
      dialogFormVisible: false,
      addform: {
        cname: "",
        rank: "",
        status: "",
        hidden: ""
      },
      formLabelWidth: "120px",
    };
  },
  //vue钩子函数
  created() {
    this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
    this.$axios.get("/eloan/binRands/selectByDes").then(res => {
      console.log(res);
      this.gridData = res.data;
      for (var i = 0; i < this.gridData.length; i++) {
        if (this.gridData[i].status == true) {
          this.gridData[i].status = "有效";
        } else {
          this.gridData[i].status = "禁用";
        }
      }
    });
  },
  methods: {
    //=======================================================修改表单的方法和添加表单的方法开始===============================
    /**
     * @name: modifidform
     * @description: 点击填加分类和修改时是打开的同一个模态框,携带参数是为了方便判断是修改还是增加
     * @param {object} row 是当前这一行的内容 val 是携带的参数用来判断是添加还是修改
     * @param {object} val 是判断当前行
     * @return:
     * @Author: Wang Jun
     */
    modifidform(row, val) {
      console.log('查看携带的参数');
      console.log(val);
      if (val == 0) {
        //添加分类
        this.addform.hidden = 0;
        return (this.dialogFormVisible = true);
      } else {
        //修改分类
        // console.log('查看行');
        // console.log(row);
        this.addform.hidden = row.id;
        this.addform.cname = row.cname;
        this.addform.rank = row.rank;
        this.addform.status = row.status;
        return (this.dialogFormVisible = true);
      }
    },
    //=======================================================修改表单的方法和添加表单的方法结束=================================

    //模态框中的方法
    //======================================================输入分类的名称看是否存在方法开始=====================================
    /**
     * @name: typename
     * @description: 给名字加入的失焦事件,发起请求判断是否已存在的名字
     * @return:
     * @Author: Wang Jun
     */
    typename() {
      var name = this.addform.typename;
      this.$axios
        .get("/eloan/binRands/selectByName/?name=" + name)
        .then(res => {
          var status = res.data;
          if (status == false) {
            this.$message({
              message: "分类名称已存在",
              type: "warning"
            });
            this.addform.typename = ""; //如果名字已经存在则将此输入框的内容设置为空
          } else {
            this.$message({
              message: "可用的分类名称",
              type: "success"
            });
          }
        });
    },
    //======================================================输入分类的名称看是否存在方法结束====================================

    //========================================================提交表单的方法开始=============================================
    submitForm(formName) {
      // console.log(this.addform);
      //对提交表单进行判定
      // 当addform.hidden==0时是添加分类操作
      if (this.addform.hidden == 0) {
        console.log("添加分类操作");
        console.log(this.addform);
        this.$axios({
          method: "post",
          headers: { "Content-type": "application/json;charset=utf-8" },
          url: "/eloan/binRands/insertByBidRank",
          data: this.addform
        }).then(res => {
          console.log(res);
          if (res.data == 1) {
            this.$message({
              message: "添加分类成功",
              type: "success"
            });
            this.$axios.get("/eloan/binRands/selectByDes").then(res => {
              // console.log(res);
              this.gridData = res.data;
              for (var i = 0; i < this.gridData.length; i++) {
                if (this.gridData[i].status == true) {
                  this.gridData[i].status = "有效";
                } else {
                  this.gridData[i].status = "禁用";
                }
              }
            });
            return (this.dialogFormVisible = false);
          } else {
            this.$message({
              message: "添加分类失败请重新添加",
              type: "warning"
            });
            this.addform.cname = "";
            this.addform.rank = "";
            this.addform.status = "";
          }
        });
      }
      //不是0时的修改的操作
      else {
        console.log("修改操作");
        console.log(this.addform);
        var id = this.addform.hidden;
        this.$axios
          .put("/eloan/binRands/updateByBidRank/" + id, this.addform)
          .then(res => {
            console.log('修改');
            console.log(res);
            //如果状态码是200
            if (res.data.code==200){
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
              this.$axios.get("/eloan/binRands/selectByDes").then(res=>{
                    this.gridData = res.data;
                    for (var i = 0; i < this.gridData.length; i++) {
                      if (this.gridData[i].status == true) {
                        this.gridData[i].status = "有效";
                      } else {
                        this.gridData[i].status = "禁用";
                      }
                    }
              });
              this.addform.cname = "";
              this.addform.rank = "";
              this.addform.status = "";
                return (this.dialogFormVisible = false);
            }
            //如果状态码不是200
            else {
              this.$message.error(res.data.msg);
            }
          });
      }
    }
    //========================================================提交表单的方法结束=============================================
  }
};
</script>

<style scoped>
.list9 {
  width: 100%;
}
/*  设置表格的样式*/
.listcont {
  width: 1200px;
  margin: 0 auto;
  padding-top: 60px;
}

/*  添加分类*/
.addtype {
  margin-bottom: 20px;
}
/*  模态框的大小*/

/*  表单的大小*/
.modelform {
  width: 400px;
  margin: 0 auto;
}
</style>
