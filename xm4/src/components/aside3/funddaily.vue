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
      <!--select下拉框1-->
      <el-select v-model="value1" placeholder="全部类型" @change="inputsearch" size="small">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1">
        </el-option>
      </el-select>
      <!--导出按钮-->
      <el-button plain @click="dcexcel" size="small" class="excel">导出到Excel</el-button>
    </div>
    <!--表格-->
    <biaoge v-bind:tablearr="tablearr" v-bind:tbody="tbody" class="table"></biaoge>
    <!--分页-->
    <div class="cx">
      <span>已查询到{{this.$data.cx}}条</span>
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
  </div>
</template>

<script>
  // 引入
  // 表格组件
  import biaoge from '../biaoge/biaoge'
  // 页面头部
  import tableheader from '../biaoge/tableheader'
    export default {
        name: "funddaily",
        components:{
           biaoge:biaoge,
           tableheader:tableheader
         },
        data(){
        return{
          cx:'',
          tablearr:["姓名","用户手机","类型","操作金额","备注","操作时间"],
          tbody:[{xm:"张三丰",tel:"176826919",lx:"回收本金",kzje:"100.00",bz:"[新手标] 还款，收回本金100.00元",czsj:"2017-01-01 12:23:33"},
            {xm:"步惊云",tel:"168736829",lx:"回收利息",kzje:"1200.00",bz:"[新手标] 还款，收回利息100.00元",czsj:"2019-11-01 12:12:32"},
            {xm:"张无忌",tel:"198757273",lx:"利息管理费",kzje:"100.00",bz:"[新手标] 还款，收回本金100.00元",czsj:"2017-01-01 12:23:33"}],
          headertext:"资金日志",
          // input搜索框参数
          input1:'',
          input2:'',
          // 下拉框参数1
          options1: [
            {
              value1: '',
              label1: '全部类型'
            },
            {
            value1: '用户充值',
            label1: '用户充值'
          }, {
            value1: '用户提现',
            label1: '用户提现'
          },
          ],
          value1:'',
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
        inputsearch:function(){
          console.log("输入框1："+this.$data.input1);
          console.log("输入框2："+this.$data.input2);
          console.log("下拉框"+this.$data.value1);
          console.log("当前页"+this.$data.currentPage4);
          console.log("每页条数"+this.$data.tiaoshu);
          var phone=this.$data.input1;
          var name=this.$data.input2;
          var type=this.$data.value1;
          var dqy=this.$data.currentPage4;
          var limit=this.$data.tiaoshu;
          // 发送请求
          var params = new URLSearchParams();
          params.append('tel',phone);
          params.append('userName',name);
          params.append('type',type);
          params.append('limit',limit);    //每页多少条
          params.append('page', dqy);   //当前页数
          // 键值对形式必须变成对象格式
          var data={tel:phone,userName:name,type:type,limit:limit,page:dqy};
          var paramsl=JSON.stringify(data);
          this.$axios({
            method:"post",
            // json字符串加上请求头
            headers: {"Content-type":"application/json;charset=utf-8"},
            // url:'http://172.16.14.108:8080/eloan/withdrawal/selectCC',
            url:'/eloan/withdrawal/selectCC',
            data:paramsl
          }).then((res)=>{
            console.log(res);
            let arr=[];
            this.sumpages=res.data.count;
            this.cx=res.data.count;
            for (let i=0;i<res.data.data.length;i++){
              arr.push({
                c:res.data.data[i].sinUsers.name,
                d:res.data.data[i].sinUsers.tel,
                e:res.data.data[i].type,
                f:res.data.data[i].money,
                g:res.data.data[i].notes,
                h:res.data.data[i].time,
              });
            }
            // for (let i=0;i<res.data.data[1].pageBean.length;i++){
            //   arr.push({
            //     c:res.data.data[1].pageBean[i].sinUsers.name,
            //     d:res.data.data[1].pageBean[i].sinUsers.tel,
            //     e:res.data.data[1].pageBean[i].type,
            //     f:res.data.data[1].pageBean[i].withdrawsMoney,
            //     g:res.data.data[1].pageBean[i].notes,
            //     h:res.data.data[1].pageBean[i].auditorDate,
            //   });
            // }
            this.tbody=arr;
          }).catch((res)=>{
            console.log(res)
          });
        },
        timechange:function(value){
          var time1 = Date.parse(value[0]);
          var time2 = Date.parse(value[1]);
          this.$data.valuetime1=time1;
          this.$data.valuetime2=time2;
          this.inputsearch();
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
          let str=`"姓名","用户手机","类型","操作金额","备注","操作时间"\n`;
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
          link.download =  "资金日志表.csv";
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
  .block{
    width: 360px;
    margin-left: 30px;
    margin-bottom: 20px;
  }
  .block>div{
    width: 100%;
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
    margin-top: 50px;
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
