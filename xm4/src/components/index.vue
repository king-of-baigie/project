<template>
    <div id="zfr">
      <div>
        <div class="inline" v-for="(des,i) in xinxi">
          <p>{{des.a}}</p>
          <h1>{{des.b}}</h1>
          <span>昨日新增：</span><span>{{des.c}}</span>
        </div>
      </div>
      <div class="daiban">
        <p class="myp">待办事项</p>
        <div>
          <div class="shixiang" v-for="(des,i) in xinxi1">
            <p>{{des.a}}</p>
            <h3>{{des.b}}</h3>
          </div>
        </div>
      </div>
      <div>
        <div class="tubiao">
          <p class="myp">投资金额统计</p>
          <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        </div>
        <div class="tubiao">
          <p class="myp">近7天出入账统计</p>
          <div id="myChart1" :style="{width: '100%', height: '300px'}"></div>
        </div>
      </div>
      <!--<button @click="qingqiu">123</button>-->
    </div>
</template>

<script>
    export default {
        name: "index",
        created(){
          this.qingqiu()
        },
        mounted(){
          this.drawLine('../assets/logo.png');

        },
        methods:{
          qingqiu(){
            this.$axios.get('/eloan/index/overview').then((res)=>{
              console.log(res);
              this.xinxi=[
                {a:'注册用户(人)',b:res.data.allUserCount,c:res.data.beforeUserCount+'人'},
                {a:'投资总额(元)',b:res.data.allInvestmentTotal,c:res.data.beforeInvestmentTotal+'元'},
                {a:'借款总额(元)',b:res.data.allBidsTotal,c:res.data.beforeBidsTotal+'元'},
                {a:'用户累计收益(元)',b:res.data.allEarningsTotal,c:res.data.beforeEarningsTotal+'元'},

              ];
              this.xinxi1=[
                {a:'新标待审',b:res.data.newBidsCount},
                {a:'新标待上架',b:res.data.newBidsWaitingCount},
                {a:'满标复审',b:res.data.newBidsWaitingCount},
                {a:'今日待还款',b:res.data.bidsWaiting4Payments},
                {a:'提现待审',b:res.data.withdrawsWaiting4Auth},
                {a:'提现待处理',b:res.data.withdrawsWaiting4Action},
              ]
            })
          },
          shiyan(){
            var objFile = document.getElementById("fileId");
            if(objFile.value == "") {
              alert("不能为空空");
              return false;
            }
            console.log(objFile.files[0].size); // 文件字节数
            var files = $('#fileId').prop('files');//获取到文件列表
            if(files.length == 0){
              alert('请选择文件');
            }else{
              var reader = new FileReader();//新建一个FileReader
              reader.readAsText(files[0], "UTF-8");//读取文件
              reader.onload = function(evt){ //读取完文件之后会回来这里
                var fileString = evt.target.result; // 读取文件内容
                console.log(fileString)
              }
            }
          },
          drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
            // 绘制图表
            myChart.setOption({
              title: {
                subtext: '单位（万元）'
              },
              xAxis: {
                type: 'category',
                data: ["02","06","10","14","18","22",'26','30']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [900,1200,2000,2100,4000,4200,4500,3900],
                type: 'line'
              }]
            });
            myChart1.setOption({
              title: {
                text: '',
                subtext: '单位（元）'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['进账', '出账']
              },
              toolbox: {
                show: true,
                feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  data: ['2019/12/29', '2019/12/30', '2019/12/31', '2020/1/1', '2020/1/2', '2020/1/3', '2020/1/4']
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '进账',
                  type: 'bar',
                  data: [1000,1200,1100,1500,1900,1000,600],
                  markPoint: {
                    data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                    ]
                  },
                  markLine: {
                    data: [
                      {type: 'average', name: '平均值'}
                    ]
                  }
                },
                {
                  name: '出账',
                  type: 'bar',
                  data: [1000,900,1000,1600,1600,1100,1000],
                  markPoint: {
                    data: [
                      {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                      {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                    ]
                  },
                  markLine: {
                    data: [
                      {type: 'average', name: '平均值'}
                    ]
                  }
                }
              ]
            });
          }
        },
        data(){
          return{
            shuju:{},
            xinxi:[
              {a:'注册用户(人)',b:1,c:1+'人'},
              {a:'投资总额(元)',b:1,c:1+'元'},
              {a:'借款总额(元)',b:1,c:1+'元'},
              {a:'用户累计收益(元)',b:1,c:1+'元'},
            ],
            xinxi1:[
              {a:'新标待审',b:1},
              {a:'新标待上架',b:1},
              {a:'满标复审',b:1},
              {a:'今日待还款',b:1},
              {a:'提现待审',b:1},
              {a:'提现待处理',b:1},
            ]
          }
        }
    }
</script>

<style scoped>
  #zfr{
    width: 100%;
  }
.inline{
  display: inline-block;
  width:18%;
  background-color: rgb(245, 245, 245);
  padding:1%;
  margin-left:3%;
  margin-top: 20px;
}
  .inline h1{
    margin: 20px 0;
    color: rgb(204, 102, 64);
    font-weight: normal;
    font-size: 38px;
  }
  .inline span{
    color: rgb(153, 153, 153);
  }
  .daiban{
    margin-left: 3%;
    width: 93%;
    overflow: hidden;
    margin-top: 20px;
    border: 1px rgb(220, 220, 220) solid;
  }
  .myp{
    background-color: rgb(249, 249, 249);
    border-bottom: 1px solid rgb(220, 220, 220);
    padding: 10px 20px;
  }
  .shixiang{
    display: inline-block;
    width: 12%;
    padding: 2%;
  }
  .shixiang>p{
    margin-bottom: 20px;
  }
  .shixiang>h3{
    color: rgb(204, 102, 64);
    font-size: 23px;
    padding-left:10px;
  }
  .tubiao{
    width:45%;
    display: inline-block;
    margin-left:3%;
    margin-top: 30px;
    border: 1px solid rgb(220, 220, 220);
  }
</style>
