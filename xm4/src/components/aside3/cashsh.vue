<template>
  <div class="zym">
    <tableheader v-bind:headertext="headertext"></tableheader>
    <div class="inputs">
      <!--input搜索-->
      <el-input
        size="small"
        placeholder="搜索提现单号"
        v-model="input1"
        class="oneinput">
        <i @click="inputsearch" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-input
        size="small"
        placeholder="搜索用户手机"
        v-model="input2"
        >
        <i @click="inputsearch" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-input
        size="small"
        placeholder="搜索用户姓名"
        v-model="input3">
        <i @click="inputsearch" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-input
        size="small"
        placeholder="输入银行账户"
        v-model="input4">
      </el-input>
      <!--select下拉框1-->
      <el-select v-model="value1" @change="inputsearch" size="small">
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
    <!--        日期选项-->
    <div class="block">
      <el-date-picker
        v-model="valuetime"
        type="daterange"
        size="small"
        range-separator="至"
        @change="timechange"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <!--表格--><!--操作插槽-->
    <biaoge2 v-bind:tablearr2="tablearr2" v-bind:tbody2="tbody2" class="table">
      <template v-slot:cz1>
        <button @click="tzxq" class="button">审核</button>
      </template>
    </biaoge2>
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
    <!--<button @click="dj">123456</button>-->
  </div>
</template>

<script>
  // 引入
  // 表格组件
  import biaoge2 from '../../components/biaoge/bioage2'
  // 页面头部
  import tableheader from '../../components/biaoge/tableheader'
    export default {
        name: "cashsh",
      components:{
        biaoge2:biaoge2,
        tableheader:tableheader
      },
      data(){
        return{
          // 用于获取传递到审核详情页的参数
          userid:"",
          // 用于显示查询到的条数
          cx:'',
          // 表格数据
          tablearr2:["用户ID","提现单号","用户手机","真实姓名","用户类型","提现金额","提现手续费","预计到账金额","银行账户","银行名称","提交时间","状态"],
          tbody2:[{z:"2",a:"12200",b:"10086",c:"梅超风",d:"商户类型",e:"1000",f:"20",g:"980",h:"10293",i:"工商银行",j:"2017-3-21 10：00",k:"已到账"},
            {z:"3",a:"13009",b:"10000",c:"郭襄",d:"个人类型",e:"2000",f:"40",g:"1960",h:"21368",i:"邮政银行",j:"2017-3-22 10：00",k:"已到账"},
            {z:"4",a:"14008",b:"12309",c:"黄蓉",d:"商户类型",e:"1000",f:"20",g:"980",h:"10092",i:"农业银行",j:"2017-3-21 06：00",k:"已到账"}],
          headertext:"提现审核",
          // input搜索框参数
          input1:'',
          input2:'',
          input3:'',
          input4:'',
          // 时间搜索
          valuetime:[],
          valuetime1:"",
          valuetime2:"",
          // 下拉框参数1
          options1: [{
            value1: '',
            label1: '全部银行'
          },
            {
              value1: '中国农业银行',
              label1: '中国农业银行'
            },
            {
              value1: '中国工商银行',
              label1: '中国工商银行'
            },
            {
              value1: '中国建设银行',
              label1: '中国建设银行'
            },
          ],
          value1:'',
          // 分页
          currentPage4: 1,
          // 总条数
          sumpages:0,
          //每页多少条
          tiaoshu:10
        }
      },
      mounted(){
        this.inputsearch();
        var that=this;
        document.onkeydown = function(e) {
          if(e.code=='Enter'){
            that.inputsearch();
          }
        }
      },
      methods:{
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
          // dj:function(){
          //   this.inputsearch();
          // },
        // input框搜索,一个函数获取所有的input值
        inputsearch:function(){
          console.log("输入框1："+this.$data.input1);
          console.log("输入框2："+this.$data.input2);
          console.log("输入框3："+this.$data.input3);
          console.log("输入框4："+this.$data.input4);
          console.log("下拉框"+this.$data.value1);
          console.log("当前页"+this.$data.currentPage4);
          console.log("每页条数"+this.$data.tiaoshu);
          var txdh=this.$data.input1;
          var phone=this.$data.input2;
          var zhh=this.$data.input3;
          var yhzh=this.$data.input4;
          var bankname=this.$data.value1;
          var dqy=this.$data.currentPage4;
          var limit=this.$data.tiaoshu;
          var startime=this.$data.valuetime1;
          var endtime=this.$data.valuetime2;
          console.log("时间戳1：" + startime);
          console.log("时间戳2：" + endtime);
          // 发送请求
          var params = new URLSearchParams();
          params.append('id',txdh);       //你要传给后台的参数值 key/value
          params.append('tel',phone);
          params.append('userName',zhh);
          params.append('bankId', yhzh);
          params.append('bankName',bankname);
          params.append('startTime', startime);   //开始和结束时间
          params.append('endTime', endtime);
          params.append('limit',limit);    //每页多少条
          params.append('page', dqy);   //当前页数
          // 键值对形式必须变成对象格式
          var data={id:txdh,tel:phone,userName:zhh,bankId:yhzh,bankName:bankname,startTime:startime,endTime:endtime,limit:limit,page:dqy};
          var paramsl=JSON.stringify(data);
          this.$axios({
            method:"post",
            // json字符串加上请求头
            headers: {"Content-type":"application/json;charset=utf-8"},
            // url:'http://172.16.14.108:8080/eloan/withdrawal/pending',
            url:'/eloan/withdrawal/pending',
            data:paramsl
          }).then((res)=>{
            console.log(res);
            let arr=[];
            // 总条数
            this.sumpages=res.data.count;
            // 查询到的条数
            this.cx=res.data.count;
            for (let i=0;i<res.data.data.length;i++){
              arr.push({
                z:res.data.data[i].sinUsers.id,
                a:res.data.data[i].id,
                b:res.data.data[i].sinUsers.tel,
                c:res.data.data[i].sinUsers.name,
                d:res.data.data[i].sinUsers.userCategory.name,
                e:res.data.data[i].withdrawsMoney,
                f:res.data.data[i].servicecharge,
                g:res.data.data[i].account,
                h:res.data.data[i].bank_number.id,
                i:res.data.data[i].bank_number.bank.bankName,
                k:res.data.data[i].subDate,
                n:res.data.data[i].status
              });
            }
            this.tbody2=arr;
          }).catch((res)=>{
            console.log(res)
          });
        },
        // 日期函数
        timechange:function(value){
          if (value==""||value==null){
            this.$data.valuetime1=null;
            this.$data.valuetime2=null;
            this.inputsearch();
          }else {
            var time1 = this.formatDate(value[0]);
            var time2 = this.formatDate(value[1]);
            this.$data.valuetime1=time1;
            this.$data.valuetime2=time2;
            this.inputsearch();
          }
        },
        //导出到excel
        dcexcel() {
          console.log("导出");
          //要导出的json数据
          const jsonData =this.$data.tbody2;
          //列标题
          let str=`"用户ID","提现单号","用户手机","真实姓名","用户类型","提现金额","提现手续费","预计到账金额","银行账户","银行名称","提交时间","状态"\n`;
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
          link.download =  "提现审核表.csv";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
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
        // 跳转详情页
        tzxq(obj){
          // 用户id
          var userid=obj.target.parentNode.parentNode.firstChild.innerText;
          // 提现单号
          var txdh=obj.target.parentNode.parentNode.firstChild.nextSibling.innerText;
          console.log(userid,txdh);
          this.$router.push({path:'/shxqy',query: {txid:txdh,userid:userid}})
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
  /*审核按钮*/
  .button{
    cursor: pointer;
    border: none;
    font-size: 13px;
    color: cornflowerblue;
    background-color: white;
  }
  @media screen and (max-width: 1300px){
    .excel{
      margin-left: 30px;
      margin-top: 15px;
    }
  }
</style>
