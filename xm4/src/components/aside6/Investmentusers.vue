<template>
  <div class="zwk">
    <tout spantext="投资用户管理"></tout>
    <div class="tl">
      <el-input  class="inputwh" @blur="ss" @keydown.enter.native="ss" placeholder="搜索名称" v-model="input1">
        <i @click="ss" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input class="inputwh" @blur="ss" @keydown.enter.native="ss" placeholder="搜索手机/用户名"  v-model="input2">
        <i @click="ss" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-select  v-model="value" @change="ss"   placeholder="全部状态">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table :data="tbody2"  style="width: 100%">
      <el-table-column property="a" align="center" label="用户编号"></el-table-column>
      <el-table-column property="b" align="center" label="姓名"></el-table-column>
      <el-table-column property="c" align="center" label="手机/用户名"></el-table-column>
      <!--<el-table-column property="d" align="center" label="实名状态"></el-table-column>-->
      <el-table-column property="e" align="center" label="身份证号码"></el-table-column>
      <el-table-column property="f" align="center" label="性别"></el-table-column>
      <el-table-column property="g" align="center" label="银行卡"></el-table-column>
      <el-table-column property="h" align="center" label="推荐人"></el-table-column>
      <el-table-column property="i" align="center" label="锁定状态"></el-table-column>
      <el-table-column property="j" align="center" label="注册时间"></el-table-column>
      <!--<el-table-column property="k" align="center" label="最近登录"></el-table-column>-->
      <!--<el-table-column property="l" align="center" label="用户来源"></el-table-column>-->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button  type="primary" size="small" @click="changeUser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!---->
    <el-dialog destroy-on-close id="change" title="修改资料" :visible.sync="dialogForm">
      <el-form :model="form" ref="form">
        <h2>基本信息</h2>
        <el-form-item label="姓名：" prop="b">
          <el-input v-model="form.b" ></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="c">
          <el-input v-model="form.c"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="e">
          <el-input v-model="form.e"></el-input>
        </el-form-item>
        <h2>银行卡信息</h2>
        <el-form-item label="银行名称：">
          <el-input v-model="yhmc"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="g">
          <el-input v-model="form.g"></el-input>
        </el-form-item>
        <el-form-item label="支行名称：">
          <el-input v-model="zhmc"></el-input>
        </el-form-item>
        <h2>操作</h2>
        <el-form-item>
         <el-select v-model="form.i" size="small" placeholder="请选择">
           <el-option
             v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
           </el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="bz"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tijiao">确定</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!---->
    <div class="block tc">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="zys">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import biaog from "../biaoge/bioage2";
  import tout from './toutiao';
    export default {
        name: "Investmentusers",
      components:{
          bg:biaog,
        tout: tout,
      },
      methods:{
          ss:function(){
            var name=this.$data.input1;
            var tel=this.$data.input2;
            var status=this.$data.value;
            var page=this.$data.currentPage;
            var limit=this.$data.limit;
            var params = new URLSearchParams();
            console.log(this.$data.value);
            params.append('page', page);       //你要传给后台的参数值 key/value
            params.append('limit',limit);
            params.append('name',name);
            params.append('status',status);
            params.append('tel',tel);
            // params.append();
             params={name:name,tel:tel,status:status,page:page,limit:limit};
            // var params=JSON.stringify(data);
            console.log(params);
            this.$axios({
              method:"get",
              // headers:{"Content-type":"application/json;charset=utf-8"},
              url:'/eloan/sinUser/selectByKeys',
              params:params
            }).then((res)=>{
              console.log(res);
              let arr=[];
              this.zys=res.data.count;
              for (let i=0;i<res.data.data.length;i++) {
                arr.push({
                  a:res.data.data[i].id,
                  b:res.data.data[i].name,
                  c:res.data.data[i].tel,
                  d:res.data.data[i].rstatus,
                  e:res.data.data[i].idCard,
                  f:res.data.data[i].sex,
                  i:res.data.data[i].status,
                  j:res.data.data[i].createDate,
                });
                this.tbody2=arr;
              }
            }).catch((res)=>{
              console.log(res)
            })
          },
          handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit=val;
          this.ss();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage=val;
          this.ss()
        },
        changeUser(data){
          this.dialogForm=true;
         for (const key in this.form) {
           this.form[key]=data[key];
         }
        },
        close(){
          this.dialogForm=false;
          this.zhmc="";
          this.yhmc="";
          this.bz="";
        },
        tijiao(){
          this.dialogForm=false;
          this.zhmc="";
          this.yhmc="";
          this.bz="";
        }
      },
      mounted(){
          this.ss()
      },
     data(){
       return {
         options:[
           {
             value: "正常",
             label: "正常"
           },
           {
             value: "锁定",
             label: "锁定"
           }
         ],
         options2: [
           {
             value: "正常",
             label: "正常"
           },
           {
             value: "锁定",
             label: "锁定"
           }
         ],
         value:"",
         value2:"",
         input1:"",
         input2:"",
         currentPage:1,
         limit:5,
         bz:"",
         zhmc:"",
         yhmc:"",
         zys:0,
         dialogForm:false,
         form:{
           a:"",
           b:"",
           c:"",
           d:"",
           e:"",
           f:"",
           g:"",
           h:"",
           i:"",
           j:"",
           k:"",
           l:"",
         },
         tbody2:[{a:"xxx",b:"dddd",c:"ccc",d:"ddd",e:"eee",f:"fff",g:"ggg",h:"hhh",i:"iiiii",j:"jjjj",k:"kkkk",l:"llll"},
           {a:"xxx",b:"dddd",c:"ccc",d:"ddd",e:"eee",f:"fff",g:"ggg",h:"hhh",i:"iiiii",j:"jjjj",k:"kkkk",l:"llll"}],
       // tbody2:[{}],
       };

     }
    }
</script>
<style scoped>
  .zwk{
    width: 100%;
  }
  .tl {
    text-align: left;
  }
.tc{
  text-align: center!important;
}
  .inputwh {
    width: 150px;
    margin: 30px 20px 30px 1%;
  }
</style>
