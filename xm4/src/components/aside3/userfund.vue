<template>
  <div class="zym">
    <tableheader v-bind:headertext="headertext"></tableheader>
    <div class="inputs">
      <!--input搜索-->
      <el-input
        size="small"
        placeholder="搜索用户手机号"
        v-model="input1"
        class="oneinput">
        <i @click="inputsearch" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input
        size="small"
        placeholder="搜索姓名"
        v-model="input2">
        <i @click="inputsearch" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <!--&lt;!&ndash;select下拉框1&ndash;&gt;-->
      <!--<el-select v-model="value1" placeholder="全部用户" @change="inputsearch" size="small">-->
        <!--<el-option-->
          <!--v-for="item in options1"-->
          <!--:key="item.value1"-->
          <!--:label="item.label1"-->
          <!--:value="item.value1">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--导出按钮-->
      <el-button plain @click="dcexcel" size="small" class="excel">导出到Excel</el-button>
    </div>
    <biaoge v-bind:tablearr="tablearr" v-bind:tbody="tbody" class="table"></biaoge>
    <!--分页-->
    <div class="cx">
      <span>已查询到 {{this.$data.cx}} 条</span>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30]"
      :page-size=tiaoshu
      layout="total, sizes, prev, pager, next, jumper"
      :total="sumpages"
      class="pages">
    </el-pagination>
    <!--<button @click="dj">123</button>-->
  </div>

</template>

<script>
  // 引入
  // 表格组件
  import biaoge from '../biaoge/biaoge'
  // 页面头部
  import tableheader from '../biaoge/tableheader'
    export default {
        name: "userfund",
      components:{
        biaoge:biaoge,
        tableheader:tableheader
      },
      data(){
          return{
            cx:"",
            tablearr:["用户ID","姓名","用户手机","总资产","可用余额","冻结余额"],
            tbody:[{a:"1",b:"张三",c:"1008622",d:"1000",e:"1000",f:"0"},
              {a:"2",b:"李四",c:"1000878",d:"100",e:"100",f:"0"},
              {a:"3",b:"王五",c:"1672988",d:"1000",e:"500",f:"500"}],
            headertext:"用户资金",
            // input搜索框参数
            input1:'',
            input2:'',
            // // 下拉框参数1
            // options1: [ {
            //   value1: '',
            //   label1: '全部用户'
            // },
            //   {
            //   value1: '投资用户',
            //   label1: '投资用户'
            // }, {
            //   value1: '借款用户',
            //   label1: '借款用户'
            // }
            // ],
            // value1:'',
            // 分页
            currentPage4: 1,
            // 总条数
            sumpages:0,
            // 每页多少条
            tiaoshu:10
          }
      },
      mounted(){
        var that=this;
          this.inputsearch();
        document.onkeydown = function(e) {
          if(e.code=='Enter'){
            that.inputsearch();
          }
        }
      },
      methods:{
          // dj:function(){
          //   this.inputsearch();
          // },
        // 转换时间戳为日期格式
        formatDate:function(now) {
          var year=now.getFullYear();  //取得4位数的年份
          var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
          var date=now.getDate();      //返回日期月份中的天数（1到31）
          var hour=now.getHours();     //返回日期中的小时数（0到23）
          var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
          var second=now.getSeconds(); //返回日期中的秒数（0到59）
          return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        },
        inputsearch:function(){
          console.log("输入框1："+this.$data.input1);
          console.log("输入框2："+this.$data.input2);
          // console.log("下拉框"+this.$data.value1);
          console.log("当前页"+this.$data.currentPage4);
          console.log("每页条数"+this.$data.tiaoshu);
          var phone=this.$data.input1;
          var name=this.$data.input2;
          // var statu=this.$data.value1;    //下拉框不需要
          var dqy=this.$data.currentPage4;
          var limit=this.$data.tiaoshu;
          // 发送请求
          var params = new URLSearchParams();
          params.append('name',name);       //你要传给后台的参数值 key/value
          params.append('tel',phone);
          params.append('limit',limit);    //每页多少条
          params.append('page', dqy);   //当前页数
          // 键值对形式必须变成对象格式
          // var data={name:name,tel:phone,limit:limit,page:dqy};
          // var paramsl=JSON.stringify(data);
          this.$axios({
            method:"get",
            // json字符串加上请求头
            // headers: {"Content-type":"application/json;charset=utf-8"},
            // url:'http://172.16.14.106:8080/eloan/balance/selectByKeys',
            url:'/eloan/balance/selectByKeys',
            params:params
          }).then((res)=>{
            console.log(res);
            let arr=[];
            this.sumpages=res.data.count;
            this.cx=res.data.count;
            for (let i=0;i<res.data.data.length;i++){
              arr.push({
                a:res.data.data[i].sinUser.id,
                b:res.data.data[i].sinUser.name,
                c:res.data.data[i].sinUser.tel,
                d:res.data.data[i].balanceTotal,
                e:res.data.data[i].balanceAvailable,
                g:res.data.data[i].balanceFrozen,
              });
              this.tbody=arr;
            }
          }).catch((res)=>{
            console.log(res)
          });
          },
        // 跳转页码
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.tiaoshu=val;
          this.inputsearch();
          // console.log("xxx"+this.$data.tiaoshu);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage4=val;
          this.inputsearch();
          // console.log("xxx"+this.$data.sumpages);
        },
        //导出到excel
        dcexcel() {
          console.log("导出");
          //要导出的json数据
          const jsonData =this.$data.tbody;
          //列标题
          let str=`"用户ID","姓名","用户手机","总资产","可用余额","冻结余额"\n`;
          //增加\t为了不让表格显示科学计数法或者其他格式
          for(let i = 0 ; i < jsonData.length ; i++ ){
            for(let item in jsonData[i]){
              str+=`${jsonData[i][item] + '\t'},`;
            }
            str+='\n';
          }
          //encodeURIComponent解决中文乱码
          let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
          //通过创建a标签实现
          let link = document.createElement("a");
          link.href = uri;
          //对下载的文件命名
          link.download =  "用户资金日志表.csv";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
</script>

<style scoped>
  .cx{
    margin-top: 15px;
    text-align: right;
    color: darkgrey;
    font-size: 13px;
  }
  .cx>span{
    margin-right: 20px;
  }
  i{
    color: cornflowerblue;
  }
  .zym{
    width: 100%;
  }
  /*input框*/
  .inputs{
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .inputs div{
    display: inline-block;
    width: 160px;
    margin-right: 30px;
  }
  /*第一个input*/
  .oneinput{
    margin-left: 30px;
  }
  /*分页*/
  .pages{
    margin-top: 30px;
   text-align: center;
  }
  /*导出按钮*/
  .excel{
    color: #bbbec5;
  }
  .excel:hover{
    border: #DCDFE6 solid 1px;
    color: black;
  }
</style>
