<template>
  <div class="zym">
    <tableheader v-bind:headertext="headertext"></tableheader>
    <div class="inputs">
      <!--input搜索-->
      <el-input
        size="small"
        placeholder="搜索流水号"
        v-model="input1"
        class="oneinput">
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
      <!--select下拉框2-->
      <el-select v-model="value2" placeholder="出入帐" @change="inputsearch" size="small">
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
    <!--平台资金余额-->
    <div class="money">
    <span>平台账户余额：<span class="red">{{money}}</span>元</span>
      <el-button type="text" @click="czmoney">平台充值</el-button>
      <el-button type="text" @click="txmoney">平台提现</el-button>
  </div>
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
        name: "ptfund",
      components:{
        biaoge:biaoge,
        tableheader:tableheader
      },
      data(){
        return{
          cx:'',
          tablearr:["流水号","类型","出入帐","操作金额","手续费","状态","备注","操作时间"],
          tbody:[{lsh:"23128773",lx:"现金红包",crz:"入帐",czje:"900.00",sxf:"8.00",czqye:"1000.00",zt:"成功",czsj:"2017-01-01 12:23:33"},
            {lsh:"712361283",lx:"平台充值",crz:"入帐",czje:"900.00",sxf:"90.00",czqye:"1000.00",zt:"成功",czsj:"2017-01-01 12:23:33"},
            {lsh:"327196312",lx:"平台提现",crz:"出帐",czje:"100.00",sxf:"10.00",czqye:"1000.00",zt:"成功",czsj:"2017-01-01 12:23:33"}],
          headertext:"平台资金",
          // input搜索框参数
          input1:'',
          input2:'',
          tiaoshu:10,
          // 下拉框参数1
          options1: [
            {
              value1: '',
              label1: '全部类型'
            },
            {
            value1: '平台充值',
            label1: '平台充值'
          }, {
            value1: '平台提现',
            label1: '平台提现'
          },
            {
              value1: '借款管理费',
              label1: '借款管理费'
            },
            {
              value1: '利息管理费',
              label1: '利息管理费'
            },
            {
              value1: '还款垫付',
              label1: '还款垫付'
            },
            {
              value1: '现金红包',
              label1: '邀请奖励'
            },
            {
              value1: '体验金收益',
              label1: '体验金收益'
            },
            {
              value1: '其他活动奖励',
              label1: '其他活动奖励'
            }
          ],
          value1:'',
          // 下拉框参数2
          options2: [
            {
              value2: '',
              label2: '出入账'
            },{
            value2: '出账',
            label2: '出账'
          }, {
            value2: '入账',
            label2: '入账'
          }
          ],
          value2:'',
          // 分页
          currentPage4: 1,
          // 总条数
          sumpages:0,
          // 平台资金
          money:30,
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
      methods: {
          // dj:function(){
          //   this.inputsearch();
          // },
        //随机数生成
         RndNum:function(n){
          var rnd="";
          for(var i=0;i<n;i++)
            rnd	+=	Math.floor(Math.random()*10);
          return rnd;
        },
        // 转换时间为年月日时分秒格式
         getCurrentTime:function(){
          //创建对象
          var date = new Date();
          //获取年份
          var y = date.getFullYear();
          //获取月份  返回0-11
          var m =date.getMonth()+1;
          // 获取日
          var d = date.getDate();
          //获取星期几  返回0-6   (0=星期天)
          var w = date.getDay();
          //星期几
          var ww = ' 星期'+'日一二三四五六'.charAt(date.getDay()) ;
          //时
          var h = date.getHours();
          //分
          var minute = date.getMinutes();
          //秒
          var s = date.getSeconds();
          //毫秒
          var sss = date.getMilliseconds() ;

          if(m<10){
            m = "0"+m;
          }
          if(d<10){
            d = "0"+d;
          }
          if(h<10){
            h = "0"+h;
          }
          if(minute<10){
            minute = "0"+minute;
          }
          if(s<10){
            s = "0"+s;
          }
          if(sss<10){
            sss = "00"+sss;
          }else if(sss<100){
            sss = "0"+sss;
          }
          return y+"-"+m+"-"+d+" "+h+":"+minute+":"+s;
        },
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
          // 平台充值
        czmoney() {
          this.$prompt('请输入充值金额（整数）', '提示', {
            confirmButtonText: '确定',
            inputPattern: /^[0-9]*$/,
            inputErrorMessage: '请输入整数'
          }).then(({value}) => {
            if (value!=null){
              this.$message({
                type: 'success',
                message: '充值成功',
              });
              // this.$data.money=this.$data.money+Number(value);
              var lsh=this.RndNum(10);
              var type="平台充值";
              var crz="入账";
              var status="成功";
              var czmoney=value;
              var bz="平台充值";
              console.log("随机数："+lsh);

              var params = new URLSearchParams();
              params.append('serialId',lsh);       //你要传给后台的参数值 key/value
              params.append('transactionType',type);
              params.append('innout',crz);
              params.append('transactionAmount',czmoney);
              params.append('note',bz);
              params.append('status',status);
              var data={serialId:lsh,transactionType:type,innout:crz,transactionAmount:czmoney,note:bz,status:status};
              var paramsl=JSON.stringify(data);
              this.$axios({
                method:"post",
                // json字符串加上请求头
                headers: {"Content-type":"application/json;charset=utf-8"},
                // url:'http://172.16.14.7:8080/eloan/deposits2/record1',
                url:'/eloan/deposits2/record1',
                data:paramsl
              }).then((res)=>{
                console.log(res);
                location.reload();
              }).catch((res)=>{
                console.log(res)
              });
            }else {
              this.$message({
                type: 'info',
                message: '金额为空'
              });
            }
          })
        },
        // 平台提现
        txmoney() {
          this.$prompt('请输入提现金额（整数）', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[0-9]*$/,
            inputErrorMessage: '请输入整数'
          }).then(({value}) => {
            if (Number(value)>this.$data.money){
              this.$message({
                type: 'info',
                message: '提现金额过大！'
              });
            } else {
              this.$message({
                type: 'success',
                message: '提现成功'
              });
              // this.$data.money=this.$data.money-Number(value);
              var lsh=this.RndNum(10);
              var type="平台提现";
              var crz="出账";
              var czmoney=value;
              var status="成功";
              var bz="平台提现";
              console.log("随机数："+lsh);

              var params = new URLSearchParams();
              params.append('serialId',lsh);       //你要传给后台的参数值 key/value
              params.append('transactionType',type);
              params.append('innout',crz);
              params.append('transactionAmount',czmoney);
              params.append('status',status);
              params.append('note',bz);
              var data={serialId:lsh,transactionType:type,innout:crz,transactionAmount:czmoney,note:bz,status:status};
              var paramsl=JSON.stringify(data);
              this.$axios({
                method:"post",
                // json字符串加上请求头
                headers: {"Content-type":"application/json;charset=utf-8"},
                // url:'http://172.16.14.7:8080/eloan/deposits2/record1',
                url:'/eloan/deposits2/record1',
                data:paramsl
              }).then((res)=>{
                console.log(res);
                location.reload();
              }).catch((res)=>{
                console.log(res)
              });
            }
            if (value==null){
              this.$message({
                type: 'info',
                message: '提现金额为空！'
              });
            }
            console.log('提现'+value);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消提现'
            });
          });
        },
        // input框搜索,一个函数获取所有的input值
        inputsearch: function () {
          console.log("输入框1："+this.$data.input1);
          console.log("下拉框1："+this.$data.value1);
          console.log("下拉框2："+this.$data.value2);
          console.log("当前页"+this.$data.currentPage4);
          console.log("每页条数"+this.$data.tiaoshu);
          var lsh=this.$data.input1;
          var type=this.$data.value1;
          var crz=this.$data.value2;
          var dqy=this.$data.currentPage4;
          var limit=this.$data.tiaoshu;
          // 发送请求
          var params = new URLSearchParams();
          params.append('serialId',lsh);       //你要传给后台的参数值 key/value
          params.append('transactionType',type);
          params.append('innout',crz);
          params.append('limit',limit);    //每页多少条
          params.append('page', dqy);   //当前页数
          // 键值对形式必须变成对象格式
          var data={serialId:lsh,transactionType:type,innout:crz,limit:limit,page:dqy};
          var paramsl=JSON.stringify(data);
          console.log(paramsl);
          this.$axios({
            method:"post",
            // json字符串加上请求头
            headers: {"Content-type":"application/json;charset=utf-8"},
            // url:'http://172.16.14.7:8080/eloan/deposits2/record',
            url:'/eloan/deposits2/record',
            data:paramsl
          }).then((res)=>{
            console.log(res);
            let arr=[];
            this.sumpages=res.data.count;
            this.money=res.data.data[0].txSum.sum;
            this.cx=res.data.count;
            for (let i=0;i<res.data.data.length;i++){
              // 转换为标准时间
              var transactionTime=new Date(res.data.data[i].transactionTime);
              arr.push({
                a:res.data.data[i].serialId,
                b:res.data.data[i].transactionType,
                c:res.data.data[i].innout,
                d:res.data.data[i].transactionAmount,
                e:res.data.data[i].fee,
                f:res.data.data[i].status,
                g:res.data.data[i].note,
                h:this.formatDate(transactionTime),
              });
            }
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
          let str=`"流水号","类型","出入帐","操作金额","手续费","状态","备注","操作时间"\n`;
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
          link.download =  "平台资金表.csv";
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
  /*平台资金余额*/
  .red{
    color: red;
  }
  .money{
    position: relative;
    font-size: 13px;
    margin-left: 30px;
    width: 95%;
    line-height: 50px;
    height: 50px;
    border: solid 1px grey;
    margin-bottom: 20px;
  }
  .money>span:first-child{
    margin-left: 10px;
  }
  .money>button:nth-child(2){
    position: absolute;
    right: 160px;
    top: 10px;
  }
  .money>button:nth-child(3){
    position: absolute;
    right: 60px;
    top: 10px;
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
