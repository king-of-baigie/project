<template>
    <div class="WZ">
      <tabrow v-bind:passtitle="titlename"></tabrow>
      <router-link to="/form2" class="add">+添加新闻</router-link>

      <el-input
        placeholder="搜索文章标题"
        v-model="input23" class="Search" style="width: 160px;height: 30px">
        <i slot="prefix" @click="PleaseSearch" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-select v-model="value1" placeholder="全部" class="XZ" size="middle" @change="PleaseSearch">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1">
        </el-option>
      </el-select>

      <el-select v-model="value2" placeholder="全部" class="XZ" size="middle" @change="PleaseSearch">
        <el-option
          v-for="item in options2"
          :key="item.value2"
          :label="item.label2"
          :value="item.value2">
        </el-option>
      </el-select>

      <tabl  v-bind:tablearr2="tablearr2" v-bind:tbody2="tbody2" class="biao">
        <template v-slot:cz1>
          <el-button type="text" class="bian" @click="dialogFormVisible = true;xie($event)">编辑</el-button>
          <el-dialog title="编辑新闻" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="标题" style="margin-left: 120px" :label-width="formLabelWidth">
                <el-input v-model="form.name" style="width: 350px;margin-left: -120px" autocomplete="off"></el-input>
              </el-form-item>
<!--              类别-->
              <el-form-item label="文章类别" prop="region"  style="margin-left: 172px" class="leibie" >
                <el-select v-model="form.fenlei" class="lei" placeholder="请选择" style="width: 350px">
                  <el-option label="新闻公告" value="新闻公告"></el-option>
                  <el-option label="行业动态" value="行业动态"></el-option>
                  <el-option label="帮助中心" value="帮助中心"></el-option>
                  <el-option label="活动中心" value="活动中心"></el-option>
                  <el-option label="关于我们" value="关于我们"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序" prop="paixu" class="pai">
                <el-input v-model="ruleForm.paixu" :disabled="true" size="small" class="please" placeholder="请输入正整数，数字越大越靠前" style="width: 350px"></el-input>
              </el-form-item>
<!--              时间-->
              <el-form-item label="上架时间"  class="yi BOX choose">
                <div class="block Time1" style="display: inline-block">
                  <el-date-picker
                    v-model="value3"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                  </el-date-picker>
                </div>

              </el-form-item>

              <el-form-item label="状态" style="margin-left: 120px" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择文章状态" style="width:350px;margin-left: -120px">
                  <el-option label="上架" value="上架"></el-option>
                  <el-option label="下架" value="下架"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false;Make()">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>
        </template>
        <template v-slot:cz2>
          <span class="shanchu" @click="Delet">删除</span>
        </template>
      </tabl>
<!--      <button @click="wenzhang">123456</button>-->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tiao"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sumpages">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import tabl from "../biaoge/bioage2"
  import tabrow from ".././tabrow"
    export default {
        name: "wenzhangM",
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.tiao=val;
          this.wenzhang();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage4=val;
          this.wenzhang();
        },
        formatDate:function (now) {
          var year=now.getFullYear();  //取得4位数的年份
          var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
          var date=now.getDate();      //返回日期月份中的天数（1到31）
          var hour=now.getHours();     //返回日期中的小时数（0到23）
          var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
          var second=now.getSeconds(); //返回日期中的秒数（0到59）
          return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        },
        PleaseSearch:function () {
          this.wenzhang();
        },
        // 删除按钮
        Delet:function(obj){
          console.log(obj.target.parentNode.parentNode);
          var father=obj.target.parentNode.parentNode;
          // 获取到当前点击按钮的父元素的上上一个兄弟元素
          console.log(obj.target.parentNode.previousElementSibling.previousElementSibling);
          var brother=parseInt(obj.target.parentNode.previousElementSibling.previousElementSibling.innerHTML);
          father.remove();
          var data={articleid :brother};

          console.log(data);
          this.$axios({
            method:"delete",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/article/deleteArticle',
            params:data
          }).then((res)=>{
            // console.log("111111111");
            console.log(res);
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            function formatDate(now) {
              var year=now.getFullYear();  //取得4位数的年份
              var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
              var date=now.getDate();      //返回日期月份中的天数（1到31）
              var hour=now.getHours();     //返回日期中的小时数（0到23）
              var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
              var second=now.getSeconds(); //返回日期中的秒数（0到59）
              return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
            }
            var t=res.data.contentArticles[0].updatetime; //定义一个时间戳变量
            // var k=res.data.contentSlides[0].endtime;
            var d=new Date(t);   //创建一个指定的日期对象
            // var l=new Date(k);
            // console.log(d);
            console.log(formatDate(d));
            let arr=[];
            this.sumpages=res.data.count;
            if (res.data.contentArticles.length>0) {
              for (let i=0;i<=res.data.contentArticles.length;i++) {
                // console.log(res.data.contentArticles[i].title);
                arr.push({
                  a: res.data.contentArticles[i].title,
                  b: res.data.contentArticles[i].articletype,
                  c: formatDate(d),
                  d: res.data.contentArticles[i].articleid,
                  e: res.data.contentArticles[i].status
                });
                console.log(arr);
                this.tbody2 = arr;
              }
            } else {
              this.tbody2=[]
            }

          }).catch((res)=>{
            console.log(res);
            this.$message({
              message: '删除失败',
              type: 'fail',
            });
          });
        },
        // 将数据添加到修改表单
        xie:function (event) {
          var e=event.currentTarget.parentNode.parentNode.firstElementChild.innerHTML;
          var a=event.currentTarget.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
          var b=event.currentTarget.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
          var c=event.currentTarget.parentNode.previousElementSibling.innerHTML;
          var d=event.currentTarget.parentNode.previousElementSibling.previousElementSibling.innerHTML;
          this.$data.form.name=e;
          this.$data.form.fenlei=a;
          this.$data.value3=b;
          this.$data.form.region=c;
          this.$data.ruleForm.paixu=parseInt(d);
          // console.log(c);
          // console.log(a);
          // console.log(b);
          // console.log(d);
          // console.log(e);
        },
        // 获取后台数据
        wenzhang:function () {
          var Input=this.$data.input23;
          var value1=this.$data.value1;
          var value2=this.$data.value2;
          var page=this.$data.currentPage4;
          var limit=this.$data.tiao;

          console.log("搜索框："+Input);
          console.log("下拉框："+value1);
          console.log("下拉框："+value2);
          console.log("页数："+page);
          console.log("条数："+limit);
          var params = new URLSearchParams();
          params.append('page', page);       //你要传给后台的参数值 key/value
          params.append('limit', limit);       //你要传给后台的参数值 key/value
          // params.append('activityTitle', '春节活动');       //你要传给后台的参数值 key/value
          // params.append('activityStatus', '发送成功');       //你要传给后台的参数值 key/value
          params.append('articletype ',value1);
          params.append('title  ',Input);
          params.append('status ',value2);

          var data={page:limit,limit:page,articletype:value1,title:Input,status:value2};


            this.$axios({
            method:"get",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/article/findByArticles',
            params:data
          }).then((res)=>{
            console.log(res);

            let arr=[];
            this.sumpages=res.data.count;
            if (res.data.contentArticles.length>0) {
              for (let i=0;i<=res.data.contentArticles.length;i++) {
                // console.log(res.data.contentArticles[i].updatetime);
                var uptime=new Date(res.data.contentArticles[i].updatetime);
                console.log(uptime);
                arr.push({
                  a: res.data.contentArticles[i].title,
                  b: res.data.contentArticles[i].articletype,
                  c: this.formatDate(uptime),
                  d: res.data.contentArticles[i].articleid,
                  e: res.data.contentArticles[i].status
                });
                console.log(arr);
                this.tbody2 = arr;
              }
            } else {
              this.tbody2=[]
            }

          }).catch((res)=>{
            console.log(res)
          });
        },
        // 确认提交按钮
        Make:function () {
          var title=this.$data.form.name;
          var fenlei=this.$data.form.fenlei;
          var standardDate = new Date(this.$data.value3);
          var standardDay = standardDate.getTime(standardDate);
          var time=standardDay;
          var zhuangtai=this.$data.form.region;
          var paixu=this.$data.ruleForm.paixu;
          console.log(this.$data.ruleForm.paixu);
          console.log("标题"+title);
          console.log("分类"+fenlei);
          console.log("时间"+time);
          console.log("状态"+zhuangtai);
          console.log("排序"+paixu);
          var params = new URLSearchParams();
          params.append('articleid', paixu);       //你要传给后台的参数值 key/value
          params.append('status', zhuangtai);       //你要传给后台的参数值 key/value
          params.append('title', title);       //你要传给后台的参数值 key/value
          params.append('articletype', fenlei);       //你要传给后台的参数值 key/value
          params.append('updatetime', time);

          var data={articleid:paixu,status:zhuangtai,title:title,articleType:fenlei,updatetime:time};
          var paramsl=JSON.stringify(data);
          console.log(paramsl);
          this.$axios({
            method:"put",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/article/modifyArticle',
            data:paramsl
          }).then((res)=>{
            console.log(res);
            this.$message({
              message: '修改成功',
              type: 'success',
            });
          }).catch((res)=>{
            console.log(res);
            this.$message({
              message: '修改失败',
              type: 'fail',
            });
          });

        }
      },
      data() {
        return {
          currentPage4: 1,
          titlename:"",
          input23:'',
          value1:'',
          value2:'',
          value3:'',
          sumpages:0,
          tiao:10,
          tablearr2:["标题","分类","发布时间","排序","状态"],
          tbody2:[
            {BT:"注册指南",fl:"新手攻略",fb:"2015-02-10  10:00:00",px:"0",zt:"下架"}
            ],
          options1:[
            {
              value1:'',
              label1:'全部分类'
            },
            {
              value1:'关于我们',
              label1:'关于我们'
            },
            {
              value1:'帮助中心',
              label1:'帮助中心'
            },
            {
              value1:'公告',
              label1:'公告'
            },
          ],
          options2:[
            {
              value2:'',
              label2:'全部状态'
            },
            {
              value2:'上架',
              label2:'上架'
            },
            {
              value2:'下架',
              label2:'下架'
            },
          ],
          dialogFormVisible: false,
          form: {
            name: '',
            fenlei:'',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          ruleForm:{
            date1:'',
            date2:''
          },
          formLabelWidth: '120px'
        };
      },
      components:{
        tabl:tabl,
          tabrow:tabrow
      },
      created() {
        this.$data.titlename = this.$route.query.name;
        // console.log(this.$route.query.name);
        this.wenzhang();
      },
    }
</script>

<style scoped>

  .biao {
    width: 95%;
    margin: 0 auto;
  }
  .shanchu {
    color: #409eff;
    cursor: pointer;
    padding-left: 5px;
  }
  .BOX{
    padding-left: 172px;
  }
  .add {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    color: black;
    width: 120px;
    height: 30px;
    background:none;
    border: 1px solid #767676;
    margin-top: 40px;
    margin-left: 110px;
    margin-bottom: 40px;
  }
  .add:hover{
    box-shadow: 2px 2px 5px #656565;
    cursor: pointer;
  }
  .Search {
    margin-left: 48%;
    outline: none;
  }
  .XZ {
    width: 160px;
    height: 38px;
    outline: none;
    margin-left: 10px;
  }
  .WZ {
    width: 100%;
  }
  .yi {
    /*border: 1px solid red;*/
    height: 40px;
    position: relative;
  }
  .block {
    text-align: center;
    margin-top: 40px;
  }
  .Time1 {
    position: absolute;
    left: 172px;
    top: -40px;
  }
  .pai {
    margin-left: 200px;
  }
  .please {
    margin-left: -120px;
  }
  .leibie {
    margin-left: 50px;
  }
  .lei {
    margin-left: -120px;
  }
</style>
