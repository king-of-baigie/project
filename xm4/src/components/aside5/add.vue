<template>
    <div class="BB">
      <tabrow v-bind:passtitle="titlename"></tabrow>
      <el-select v-model="value1"  class="XZ" size="middle" @change="PleaseSearch">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label"
          :value="item.value1">
        </el-option>
      </el-select>
      <router-link to="/form4" class="add">+添加版本</router-link>

      <tabl  v-bind:tablearr2="tablearr2" v-bind:tbody2="tbody2" class="biao">
        <template v-slot:cz1>
          <span class="shanchu" @click="deal">作废</span>
        </template>
      </tabl>
<!--      <button @click="Get">123456</button>-->

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
        name: "add",
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.tiao=val;
          this.Get();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage4=val;
          this.Get();
        },
        PleaseSearch:function () {
          this.Get();
        },
        // 获取数据
        Get:function () {
          var choose = this.$data.value1;
          var tiao=this.$data.tiao;
          var page=this.$data.currentPage4;
          console.log("下拉列表：" + choose);
          var params = new URLSearchParams();
          // params.append('sugges', "速度");       //你要传给后台的参数值 key/value
          // params.append('state', position);       //你要传给后台的参数值 key/value
          params.append('page', page);
          params.append('limit', tiao);
          params.append('status',choose);
          // var data={page:tiao,limit:page,status:choose};
          // var paramsl=JSON.stringify(data);
          this.$axios({
            method: "get",
            headers: {"Content-type": "application/json;charset=utf-8"},
            url: '/eloan/activity/selectVersionByPage',
            params: params
          }).then((res) => {
            console.log(res);
            let arr = [];
            this.sumpages = res.data.count;
            for (let i = 0; i < res.data.data.length; i++) {
              // 时间戳转为日期格式
              function formatDate(now) {
                var year = now.getFullYear();  //取得4位数的年份
                var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
                var date = now.getDate();      //返回日期月份中的天数（1到31）
                var hour = now.getHours();     //返回日期中的小时数（0到23）
                var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
                var second = now.getSeconds(); //返回日期中的秒数（0到59）
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
              }

              var g = res.data.data[i].updateTime; //定义一个时间戳变量
              var d = new Date(g);   //创建一个指定的日期对象
              // console.log(d);
              console.log(formatDate(d));

              console.log(res.data.data[i].versionName);
              arr.push({
                a: res.data.data[i].versionName,
                b: res.data.data[i].versionNumber,
                c: res.data.data[i].system,
                d: formatDate(d),
                e: res.data.data[i].status,
              });
              // console.log(arr);
              this.tbody2 = arr;
            }
            console.log(res.data.data[0].versionName)
          }).catch((res) => {
            console.log(res)
          });
        },
        // 作废
        deal:function (obj) {
          console.log(obj.target.parentNode);
          var bbh=obj.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;

          console.log(bbh.replace('/n','').replace('\n','').replace('\n','').replace(/ /g,''));
          var Nbb=bbh.replace('/n','').replace('\n','').replace('\n','').replace(/ /g,'');

          var params = new URLSearchParams();
          params.append('versionNumber', Nbb);       //你要传给后台的参数值 key/value
          // params.append('limit', '10');       //你要传给后台的参数值 key/value
          // params.append('activityTitle', '春节活动');       //你要传给后台的参数值 key/value
          // params.append('activityStatus', '发送成功');       //你要传给后台的参数值 key/value
          this.$axios({
            method:"post",
            url:'/eloan/activity/cancelVersion',
            data:params
          }).then((res)=>{
            console.log(res);
            this.$message({
              message: '修改成功',
              type: 'success',
            });
            // this.Get();
          }).catch((res)=>{
            console.log(res)
          });
          this.Get();
        }

      },
      data() {
        return {
          currentPage4: 1,
          titlename:'',
          value1:'',
          sumpages:0,
          tiao:10,
          tablearr2:["版本名称","版本号","系统","添加时间","状态"],
          tbody2:[
            {bb:"国庆版",bbh:"1.0.0",XT:"Android",tj:"2015-02-10 10:00:00",ZT:"有效"}
            ],
          options1:[
            {
              value1:'',
              label:"全部"
            },
            {
              value1:'有效',
              label:'有效'
            },
            {
              value1:'禁止',
              label:'禁止'
            }
          ]

        };
      },
      created() {
        this.$data.titlename = this.$route.query.name;
        // console.log(this.$route.query.name);
        this.Get();
      },
      components:{
        tabl:tabl,
        tabrow:tabrow
      }
    }
</script>

<style scoped>
  .biao {
    width: 95%;
    margin: 0 auto;
  }
  .BB {
    width: 100%;
  }
  .XZ {
    width: 160px;
    height: 30px;
    float: left;
    margin: 40px 0 40px 80px;
  }
  .add {
    display: inline-block;
    text-align: center;
    line-height: 40px;
    text-decoration: none;
    color: black;
    width: 120px;
    height: 40px;
    background:none;
    border: 1px solid #767676;
    float: right;
    margin-top: 40px;
    margin-right: 80px;
    margin-bottom: 20px;
  }
  .add:hover{
    box-shadow: 2px 2px 5px #656565;
    cursor: pointer;
  }
  .shanchu {
    color: #409eff;
    cursor: pointer;
  }
  table {
    clear: both;
    border-collapse: collapse;
    margin: 0 auto;
  }
  table tr td {
    border: 1px solid #939393;
  }
  table thead th tr td{
    background-color: #3399cc;
    font-weight: normal;
    color: white;
    padding: 5px 100px;
  }
  .block {
    /*float: right;*/
    clear: both;
    text-align: center;
    margin-top: 40px;
  }
</style>
