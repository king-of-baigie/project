<template>
  <div class="zym">
    <tableheader v-bind:headertext="headertext"></tableheader>
    <div class="inputs">
      <!--input搜索-->
      <!--v-model实时赋值input-->
      <el-input
        size="small"
        placeholder="搜索充值单号"
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
      <!--select下拉框1-->
      <el-select v-model="value1" placeholder="全部充值方式" @change="inputsearch" size="small">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1">
        </el-option>
      </el-select>
      <!--select下拉框2-->
      <el-select v-model="value2" placeholder="全部状态" @change="inputsearch" size="small">
        <el-option
          v-for="item in options2"
          :key="item.value2"
          :label="item.label2"
          :value="item.value2">
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
    <!--表格-->
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
      :page-size="tiaoshu"
      layout="total, sizes, prev, pager, next, jumper"
      :total="sumpages"
      class="pages">
    </el-pagination>
    <!--<button @click="dj">123</button>-->
    <!--<h1>{{this.$data.tbody[0].c}}</h1>-->
  </div>
</template>

<script>
  // 引入
  // 表格组件
  import biaoge from '../../components/biaoge/biaoge'
  // 页面头部
  import tableheader from '../../components/biaoge/tableheader'
  export default {
    name: "recharge",
    components:{
      biaoge:biaoge,
      tableheader:tableheader
    },
    // 注册
    data(){
      return{
        cx:'',
        // 表格数据
        tablearr:["充值单号","用户手机","真实姓名","用户来源","应用来源","充值金额","到账金额","手续费","充值方式","交易流水号","订单时间","到账时间","状态"],
        tbody:[{a:1,b:10085,c:"张三丰",d:"pc注册",e:"安卓2.0",f:"1000",g:"980",o:"20",p:"支付宝",q:"100909",l:"2019-12-29 10:00",m:"2019-12-30 10:00",n:"成功"},
          {a:2,b:10086,c:"裘千仞",d:"安装注册",e:"安卓3.0",f:"2000",g:"1960",o:"40",p:"微信",q:"201370",l:"2019-12-28 08:00",m:"2019-12-29 10:00",n:"充值处理中"},
          {a:3,b:1893792,c:"萧峰",d:"pc注册",e:"安卓2.0",f:"1000",g:"980",o:"20",p:"银行转账",q:"808772",l:"2019-12-28 00:00",m:"2019-12-28 10:00",n:"充值失败"}],
        // 页头文字
        headertext:"充值记录",
        // 时间搜索
        valuetime:[],
        valuetime1:"",
        valuetime2:"",
        // input搜索框参数
        input1:'',
        input2:'',
        // 下拉框参数1
        options1: [
          {
            value1:"",
            label1: '全部充值方式'
          }, {
          value1: '支付宝',
          label1: '支付宝'
        }, {
          value1: '微信',
          label1: '微信'
        }, {
          value1: '在线转账',
          label1: '在线转帐'
        }, {
          value1: '银行转帐',
          label1: '银行转账'
        },
        ],
        value1:'',
        // 下拉框参数2
        options2: [ {
          value2: '',
          label2: '全部状态'
        },
          {
          value2: '充值成功',
          label2: '充值成功'
        }, {
          value2: '充值失败',
          label2: '充值失败'
        }, {
          value2: '业务处理中',
          label2: '业务处理中'
        },
        ],
        value2:'',
        // 当前页
        currentPage4: 1,
        // 总条数
        sumpages:0,
        // 每页条数
        tiaoshu:10,
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
      inputsearch:function(){
          var startime=this.$data.valuetime1;
          var endtime=this.$data.valuetime2;
          var czdh=this.$data.input1;
          var phone=this.$data.input2;
          var ztai1=this.$data.value1;
          var ztai2=this.$data.value2;
          var dqy=this.$data.currentPage4;
          var limit=this.$data.tiaoshu;

          console.log("输入框1："+this.$data.input1);
          console.log("输入框2"+this.$data.input2);
          console.log("下拉框1:"+this.$data.value1);
          console.log("下拉框2:"+this.$data.value2);
          console.log("时间戳1：" + startime);
          console.log("时间戳2：" + endtime);
          console.log("当前页:"+this.$data.currentPage4);
          console.log("每页条数:"+this.$data.tiaoshu);
          // 发送请求
          var params = new URLSearchParams();
          params.append('rechargeid',czdh);       //你要传给后台的参数值 key/value
          params.append('tel',phone);
          params.append('paytype', ztai1);      //下拉框参数
          params.append('status', ztai2);
          params.append('startTime', startime);   //开始和结束时间
          params.append('endTime', endtime);
          params.append('limit',limit);    //每页多少条
          params.append('page', dqy);   //当前页数
          // 键值对形式必须变成对象格式
          var data={rechargeid:czdh,tel:phone,paytype:ztai1,status:ztai2,startTime:startime,endTime:endtime ,limit:limit,page:dqy};
          var paramsl=JSON.stringify(data);
          this.$axios({
            method:"post",
            // json字符串加上请求头
            headers:{"Content-type":"application/json;charset=utf-8"},
            // url:'http://172.16.14.7:8080/eloan/deposits1/record',
            url:'/eloan/deposits1/record',
            data:paramsl
          }).then((res)=>{
            console.log(res);
            // 定义一个空数组
            let arr=[];
            // 总条数赋值
            this.sumpages=res.data.count;
            this.cx=res.data.count;
            for (var i=0;i<res.data.data.length;i++){
              // 转换为标准时间
              var orderdate=new Date(res.data.data[i].orderdate);
              // 转换为日期格式
              // console.log(formatDate(d));
              var sucessdate=new Date(res.data.data[i].sucessdate);
              arr.push({
                a:res.data.data[i].rechargeid,
                b:res.data.data[i].sinUsers.tel,
                c:res.data.data[i].sinUsers.name,
                d:res.data.data[i].userorigin,
                e:res.data.data[i].apporigin,
                f:res.data.data[i].rechargemoney,
                g:res.data.data[i].account,
                h:res.data.data[i].servicecharge,
                i:res.data.data[i].paytype,
                j:res.data.data[i].num,
                k:this.formatDate(orderdate),
                l:this.formatDate(sucessdate),
                m:res.data.data[i].status,
              });
            }
            this.tbody=arr;
          }).catch((res)=>{
            console.log(res)
          });
      },
      // 日期清除函数

      // 分页函数
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
      // 日期选择器
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
      dcexcel() {
        console.log("导出");
        //要导出的json数据
        const jsonData =this.$data.tbody;
        //列标题
        let str=`"充值单号","用户手机","真实姓名","用户来源","应用来源","充值金额","到账金额","手续费","充值方式","交易流水号","订单时间","到账时间","状态"\n`;
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
        link.download =  "充值记录表.csv";
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
    width: 130px;
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
