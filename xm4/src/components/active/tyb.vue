<template>
    <div id="tyb">
      <div>
        <p>体验金参数</p>
        <div>
          <div>
            <coo v-for="k in a1" v-bind:bt="k" :key="k[0]"></coo>
            <div class="fu">
              <span>体验金发放开关：</span>
              <el-radio v-model="radio" label="1">注册送</el-radio>
              <el-radio v-model="radio" label="2">不发放</el-radio>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>体验标信息</p>
        <coo v-for="k in a2" v-bind:bt="k" :key="k[0]"></coo>
      </div>
      <div>
        <p>项目介绍</p>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </div>
      <button @click="cheyan">提交</button>
    </div>
</template>

<script>
  import coo from './cheshi/myinput'
    export default {
        name: "tyb",
        components:{
          coo
        },
      methods:{
          cheyan(){
            let that=this;
            let arr1=$('input');
            console.log(that.$data.radio);
            var params = new URLSearchParams();
            let a='1';
            var b;
            console.log(typeof a);
            if (that.$data.radio==1){
              b=true
            } else {
              b=false
            }
            var data={amount:arr1[0].value,effectiveDays:arr1[1].value,limitedDistribution:arr1[2].value,releaseSwitch:b,experienceLabel:arr1[5].value,rannualinterestRate:arr1[6].value,projectDuration:arr1[7].value,projectintroduction:$('textarea').val()};
            var data1=JSON.stringify(data);
            this.$axios({
              method:"post",
              headers: {"Content-type":"application/json;charset=utf-8"},
              url:'/eloan/expMark/insert',
              data:data1,
            }).then((res)=>{
              console.log(res)
            }).catch((res)=>{
              console.log(res)
            });
          },
          cheshi(){
            var params = new URLSearchParams();
            params.append('id', '1');       //你要传给后台的参数值 key/value
            this.$axios({
              method:"post",
              url:'/eloan/bid/findBid',
              data:params
            }).then((res)=>{
              console.log(res)
            }).catch((res)=>{
              console.log(res)
            });
          }
      },
      data(){
          return{
            a1:[
              ['体验金金额：','请输入100-999999之间的整数','元','je'],
              ['体验金有效天数：','请输入0-365之间的整数，0则永久有效','天'],
              ['每天发放量限制：','请输入0-999999的整数，0则不限制','人'],
            ],
            a2:[
              ['体验标标名：','请输入名称',''],
              ['年利率：','请输入1-24之间的数，保留两位小数','%'],
              ['项目期限：','请输入0-999之间的整数','天']
              ],
            radio:'1',
            textarea: ''
          }
      }
    }
</script>

<style scoped>
  #tyb{
    width: 80%;
    margin-left: 10%;
  }
  #tyb>div{
    margin-bottom: 100px;
  }
  p{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
.fu{
  width: 45%;
}
  .fu>span{
   margin-left: 20%;
  }
.el-textarea{
  width: 80%;
  margin-left: 10%;
}
</style>
