<template>
    <div class="YJ">
      <tabrow v-bind:passtitle="titlename"></tabrow>
      <el-input
        placeholder="请输入内容"
        v-model="input23" class="Search" style="width: 160px;height: 30px">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="PleaseSearch"></i>
      </el-input>

      <el-select v-model="value1" placeholder="全部" class="XZ" size="middle" @change="PleaseSearch">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1">
        </el-option>
      </el-select>

      <tabl  v-bind:tablearr2="tablearr2" v-bind:tbody2="tbody2" class="biao">
        <template v-slot:cz1>
           <button class="XX shanchu" @click="deal">处理</button>
        </template>
      </tabl>
<!--      <button @click="shift">123456</button>-->

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
        name: "yijian",
      data(){
        return {
          titlename:'',
          input23:'',
          currentPage4: 1,
          sumpages:0,
          tiao:10,
          tablearr2:["意见建议","反馈者手机","手机型号","来源","提交时间","回复","状态"],
          tbody2:[
            {yj:"开门速度太慢了",sj:"13599094054",XH:"华为xx",ly:"官方Android",tj:"2015-02-10 10:00:00",hf:"电话沟通",zt:"已处理"}
            ],
          options1:[
            {
              value1:'',
              label1:'全部'
            },
            {
              value1:'已执行',
              label1:'已执行'
            },
            {
              value1:'未执行',
              label1:'未执行'
            }
          ],
          value1:""
        }
      },
      components:{
        tabl:tabl,
          tabrow:tabrow
      },
      methods:{
        PleaseSearch:function () {
          // console.log("111111");
          this.shift();
        },
        shift:function () {
          var position=this.$data.value1;
          var Input=this.$data.input23;
          var Pg=this.$data.currentPage4;
          var limit=this.$data.tiao;
          console.log("页数:"+Pg);
          console.log("总条数："+limit);
          console.log("输入框："+Input);
          console.log("下拉框1："+position);
          var params = new URLSearchParams();
          params.append('sugges',"速度");       //你要传给后台的参数值 key/value
          params.append('state', position);       //你要传给后台的参数值 key/value
          params.append('page', Pg);
          params.append('limit', limit);
          // params.append('status', 'false');
          // params.append('slideshowid', '排序');       //你要传给后台的参数值 key/value
          // params.append('slideshowlocation', '轮播位置');       //你要传给后台的参数值 key/value
          // var data={sugges:Input,state:position,page:"1",limit:"1"};
          // var paramsl=JSON.stringify(data);
          this.$axios({
            method:"get",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/opinionController/selectByPage2',
            params:params
          }).then((res)=>{
            console.log(res);
            let arr=[];
            this.sumpages=res.data.count;
            if (res.data.data.length>0){
              for (let i=0;i<res.data.data.length;i++){
                // 时间戳转为日期格式
                function formatDate(now) {
                  var year=now.getFullYear();  //取得4位数的年份
                  var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                  var date=now.getDate();      //返回日期月份中的天数（1到31）
                  var hour=now.getHours();     //返回日期中的小时数（0到23）
                  var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                  var second=now.getSeconds(); //返回日期中的秒数（0到59）
                  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                }
                var g=res.data.data[i].addingTime; //定义一个时间戳变量
                var d=new Date(g);   //创建一个指定的日期对象
                // console.log(d);
                console.log(formatDate(d));
                console.log(res.data.data[i].sugges);
                arr.push({
                  a:res.data.data[i].sugges,
                  b:res.data.data[i].feedbackMobilePhone,
                  c:res.data.data[i].mobilePhoneModel,
                  d:res.data.data[i].source,
                  e:formatDate(d),
                  f:res.data.data[i].reply,
                  g:res.data.data[i].state
                });
                console.log(arr);
                this.tbody2=arr;
              }
            }
          else{
            this.tbody2=[]
            }
            console.log(res.data.data[0].mobilePhoneModel)
          }).catch((res)=>{
            console.log(res)
          });
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.tiao=val;
          this.shift();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage4=val;
          this.shift();
        },
        deal:function (obj) {
          // 带参跳转页面
          console.log(obj.target.parentNode.parentNode.firstElementChild.innerHTML);
          let sug=obj.target.parentNode.parentNode.firstElementChild.innerHTML;
          let phone=obj.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
          let lai=obj.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
          let bao=obj.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
          console.log(bao);
          this.$router.push({path:'/form3',query:{sug:sug,phone:phone,lai:lai,bao:bao}})
        }

      },
      created() {
        this.$data.titlename = this.$route.query.name;
        // console.log(this.$route.query.name);
        this.shift();
      },
    }
</script>

<style scoped>
  .Search {
    margin: 40px 10px 40px 80px;
    outline: none;
  }
  .XZ {
    width: 160px;
    height: 38px;
    outline: none;
  }
  .block {
    text-align: center;
    margin-top: 40px;
  }
  .biao {
    width: 95%;
    margin: 0 auto;
  }
  .XX {
    border: none;
    background: 0;
    outline: none;
  }
  .YJ {
    width: 100%;
  }
  .shanchu {
    color: #409eff;
    cursor: pointer;
  }

</style>
