<template>
   <div>
     <tableheader v-bind:headertext="headertext"></tableheader>
     <h5>提现信息</h5>
     <!--左边-->
     <div class="flotleft">
       提现单号: <span class="txdh">{{this.body.id}}</span>
       <br>
       真实姓名: <span>{{this.body.sinUsers.name}}</span>
       <br>
       提现银行: <span>{{this.body.bank_number.bank.bankName}}</span>
       <br>
       提现金额: <span class="red txje">{{this.body.withdrawsMoney}} </span>元
       <br>
       预计到账金额: <span class="red">{{this.body.account}}</span> 元
     </div>
     <!--右边-->
     <div class="flotright">
       用户手机号码: <span>{{this.body.sinUsers.tel}}</span>
       <br>
       用户类型: <span>{{this.body.sinUsers.userCategory.name}}</span>
       <br>
       银行账户: <span>{{this.body.bank_number.id}}</span>
       <br>
       提现手续费: <span class="red">{{this.body.servicecharge}} </span>元
       <br>
       提交时间: <span>{{this.body.subDate}}</span>
     </div>
     <h5>用户资产</h5>
     <!--左边-->
     <!--用户资金-->
      <p class="balanId">{{this.body.sinUsers.id}}</p>
     <div class="flotleft">
       总金额: <span class="zje">{{this.body.txBalance.balanceTotal}}</span>
       <br>
       待收利息: <span>{{}}</span>
       </div>
       <!--右边-->
      <div class="flotright">
        冻结金额: <span>{{this.body.txBalance.balanceFrozen}}</span>
        <br>
        可提现金额: <span class="kyje">{{this.body.txBalance.balanceAvailable}}</span>
    </div>
    <h5>最近提现记录</h5>
     <!--表格-->
     <div class="tablerq">
       <table>
         <thead>
         <tr>
           <th>银行账号</th>
           <th>提现金额</th>
           <th>提现时间</th>
           <th>状态</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="tr in tbody">
           <td v-for="td in tr">{{td}}</td>
         </tr>
         </tbody>
       </table>
     </div>

     <!--审核-->
     <h5 class="sh">审核</h5>
     <div class="tg">是否通过:
       <input type="radio" name="radio" value="通过" checked="checked"/>通过
       <input type="radio" name="radio" value="不通过"/> 不通过
     </div>
     <!--备注-->
     <div class="bz">
        <span class="jz"><span class="red">*</span>备注:</span>
        <textarea style="width: 40%;height: 100px" id="dhtext"></textarea>
     </div>
     <!--提交和返回-->
     <div class="submit">
       <el-button type="primary" plain size="medium" @click="submitcg" :plain="true">提交</el-button>
       <el-button plain size="medium" @click="submitsb">返回</el-button>
     </div>

   </div>
</template>

<script>
  // 引入
  // 表格组件
  import biaoge from '../../components/biaoge/biaoge'
  // 页面头部
  import tableheader from '../../components/biaoge/tableheader'
    export default {
        name: "shxqy",
      components:{
        biaoge:biaoge,
        tableheader:tableheader
      },
      data(){
          return{
            headertext:"提现审核详情",
            tbody:[{}],
            body:[{}],
          }
      },
      mounted(){
      //   // 用户id
        var userid=this.$route.query.userid;
        // 提现单号
        var txid=this.$route.query.txid;
        // 发送请求
        console.log(userid);
        console.log(txid);
        var params = new URLSearchParams();
        params.append('id',txid);       //你要传给后台的参数值 key/value
        params.append('userId',userid);
        this.$axios({
          method:"get",
          // json字符串加上请求头
          // headers: {"Content-type":"application/json;charset=utf-8"},
          // url:'http://172.16.14.108:8080/eloan/withdrawal/audit',
          url:'/eloan/withdrawal/audit',
          params:params
        }).then((res)=>{
          console.log(res);
          this.body=res.data.data[0];
          let arr=[];
          for (let i=0;i<res.data.data[1].length;i++){
            arr.push({
              a:res.data.data[1][i].bank_number.id,
              b:res.data.data[1][i].withdrawsMoney,
              d:res.data.data[1][i].subDate,
              c:res.data.data[1][i].status,
            });
          }
          this.tbody=arr;
          console.log(this.body);
        }).catch((err)=>{
          console.log(err);
        })
      },
      methods:{
        // 提交成功的方法
        // 布尔值判断是否通过，传递给后台
          submitcg:function () {
            this.$message({
              message: '审核通过！',
              type: 'success'
            });
          // 单选框
         var bloon;
         if(jQuery('input[name="radio"]:checked').val()=="通过"){
            bloon=1;
         }else{
           bloon=0;
         }
            // 多行文本框内容
            var note=jQuery("#dhtext").val();        //备注
            var txdh=jQuery(".txdh")[0].innerText;    //提现单号
            var zje=jQuery(".zje")[0].innerText;        //总金额
            var kyzj=jQuery(".kyje")[0].innerText;      //可用金额
            var txje=jQuery(".txje")[0].innerText;      //提现金额
            var balanId=jQuery(".balanId")[0].innerText;    //用户资金ID
            var type="用户提现";
            var userId=this.$route.query.userid;
            // console.log(txdh,zje,kyzj,txje,balanId,bloon,note,type);
            // 发送请求
            var params = new URLSearchParams();
            params.append('withId',txdh);       //你要传给后台的参数值 key/value
            params.append('notes',note);
            params.append('balance_total ',zje);
            params.append('balance_available', kyzj);
            params.append('withdraws', txje);
            params.append('balanId', balanId);
            params.append('bool',bloon);
            params.append('type',type);
            params.append('userId',userId);
            // 键值对形式必须变成对象格式
            var data={withId:txdh,notes:note,balance_total:zje,balance_available:kyzj,withdraws:txje,balanId:balanId,bool:bloon,type:type,userId:userId};
            var paramsl=JSON.stringify(data);
            console.log(paramsl);
            this.$axios({
              method:"post",
              // json字符串加上请求头
              headers: {"Content-type":"application/json;charset=utf-8"},
              // url:'http://172.16.14.108:8080/eloan/withdrawal/update',
              url:'/eloan/withdrawal/update',
              data:paramsl
            }).then((res)=>{
              console.log(res);
              this.$router.go(-1);//返回上一层
              this.$message({
                type: 'success',
                message: '审核通过！'
              });
            }).catch((res)=>{
              console.log(res)
            });
          },
        // 返回页面的参数
        submitsb:function () {
          console.log("失败");
          this.$router.go(-1);//返回上一层
        }
      }
    }
</script>

<style scoped>
  .tablerq{
    margin-top: 20px;
    margin-left: 20%;
    width: 60%;
    height: 180px;
    overflow: auto;
  }
  .balanId{
    width: 150px;
    margin-left: 100px;
    opacity: 0;
  }
  .red{
    color: red;
  }
  h5{
    margin-top: 30px;
    margin-left: 50px;
    border-bottom: dashed 1px grey;
    padding-bottom: 20px;
  }
  div{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.77);
  }
  .flotleft{
    float: left;
    display: inline-block;
    width: 50%;
    line-height: 50px;
    text-align: center;
  }
  .flotright{
    float: right;
    width: 50%;
    line-height: 50px;
    text-align: center;
  }
  table{
    width: 100%;
    border-spacing:0;
  }
  th{
    line-height: 40px;
    background-color: #f2f2f2;
  }
  tr td{
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  /*表格奇偶选择器*/
  tr:nth-child(odd){
    background-color: #ffffff;
  }
  tr:nth-child(even){
    background-color: #fbfbfb;
  }
  /*单选框样式*/
  .tg{
    margin-top: 30px;
    padding-left: 50px;
  }
  /*备注*/
  .bz{
    margin-left: 50px;
    margin-top: 30px;
    position: relative;
    height: 102px;
  }
  .jz{
    position: absolute;
    top: 20px;
  }
  textarea{
    position: absolute;
    left: 50px;
  }
  /*提交按钮*/
  .submit{
    margin-top: 30px;
    margin-left: 40%;
  }
</style>
