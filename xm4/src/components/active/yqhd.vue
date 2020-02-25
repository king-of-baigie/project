<template>
  <div id="zfr">
    <mytabarow v-bind:passtitle="titlename"></mytabarow>
    <ceo v-bind:tablearr2="thead" v-bind:tbody2="tbody">
      <template v-slot:cz1>
        <el-button type="text" @click="xiugai">修改</el-button>
      </template>
    </ceo>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="事件名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item :label="people+'赠送红包'" prop="people">
          <el-button type="primary" plain @click="open">选择红包</el-button>
        </el-form-item>
        <el-form-item label="赠送方式" prop="type">
          <el-radio v-model="radio" label="固定红包"></el-radio>
          <el-radio v-model="radio" label="随机红包"></el-radio>
        </el-form-item>
        <el-form-item label="状态" prop="sta">
          <el-radio v-model="sta" label="开启"></el-radio>
          <el-radio v-model="sta" label="关闭"></el-radio>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="change">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="close">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="红包名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="红包类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="有效期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="cond"
          label="条件"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import tabrow from "../tabrow"; //引入王君的横向的组件
  import ceo from '../biaoge/bioage2'
    export default {
        name: "yqhd",
      components:{
        mytabarow:tabrow,
        ceo:ceo
      },
      data(){
          return{
            titlename:'',
            dialogVisible: false,
            dialogVisible1:false,
            currentPage:1,
            count:0,
            limit:10,
            page:1,
            tbody:[
              {a:1,b:2,c:'推荐人',d:4,e:'固定红包',f:6,g:'开启',h:8},
              {a:1,b:2,c:'被推荐人',d:4,e:'随机红包',f:6,g:'关闭',h:8},
            ],
            thead:['策略ID','触发事件','奖励对象','奖励','奖励方式','已送份数','状态','更新时间'],
            people:'',
            radio:"",
            radio1:"",
            sta:'',
            id:'',
            hbname:'',
            ruleForm: {
              name: '',
            },
            rules: {
              name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
            },
            tableData: [
              {name:'满减',type:'满减',time:'30',money:'￥100',cond:'投资'},
              {name:'满减',type:'满减',time:'20',money:'￥200',cond:'冲！'}],
            multipleSelection: []
          }
      },
      methods:{
        hongbao(){
          this.$axios.get('/eloan/redpNew/login2',{
          }).then((res)=>{
            console.log(res);
            let arr=[];
            for(let i=0;i<res.data.length;i++){
              arr.push({
                name:res.data[0].redEnvelopesName,
                type:res.data[0].redEnvelopeType,
                time:res.data[0].termOfValidity,
                money:'￥'+res.data[0].fullReductionAmount,
                cond:'投资满'+res.data[0].investmentConditions+'元使用'
              })
            }
            this.tableData=arr;
          })
        },
        update(e){
          let file = e.target.files[0];
          let param = new FormData(); //创建form对象
          param.append('guaranteesFiles',file);//通过append向form对象添加数据
          param.append('name','123');//通过append向form对象添加数据
          console.log(param.get('guaranteesFiles')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头
          this.$axios.post('/eloan/test',param,config)
            .then(response=>{
              console.log(response.data);
            }).catch((res)=>{
              console.log(res)
          })
        },
        shijian(time){
          var timestamp4 = new Date(time);//直接用 new Date(时间戳) 格式转化获得当前时间
          var shijian1=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
          return shijian1
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.limit=val;
          this.qingqiu()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page=val;
          this.qingqiu()
        },
        qingqiu(){
          var params = new URLSearchParams();
          params.append('limit',this.limit);       //你要传给后台的参数值 key/value
          params.append('page',this.page);       //你要传给后台的参数值 key/value
          params.append('activitytype', '邀请活动');       //你要传给后台的参数值 key/value
          this.$axios({
            method:"get",
            url:'/eloan/activity/selectActivityInvitessByPage',
            params:params
          }).then((res)=>{
            console.log(res);
            let arr=[];
            for(let i=0;i<res.data.data.length;i++){
              arr.push({
                a:res.data.data[i].id,
                b:res.data.data[i].triggerEvent,
                c:res.data.data[i].rewardObject,
                d:res.data.data[i].reward,
                e:res.data.data[i].rewardMethod,
                f:res.data.data[i].deliveredNumber,
                g:res.data.data[i].state,
                h:this.shijian(res.data.data[0].updateTime),
              })
            }
            // console.log(arr);
            this.tbody=arr;
            this.count=res.data.count
          }).catch((res)=>{
            console.log(res)
          });
        },
        xiugai(e){
           console.log(e.path);
           this.ruleForm.name=$(e.path[3]).children()[1].innerText;
           this.people=$(e.path[3]).children()[2].innerText;
           this.radio=$(e.path[3]).children()[4].innerText;
           this.sta=$(e.path[3]).children()[6].innerText;
           this.id=$(e.path[3]).children()[0].innerText;
           this.dialogVisible = true;
        },
        change(){
          this.dialogVisible = false;
          this.$axios.post('/eloan/activity/updateActivityInfo',{
            id:this.id,
            triggerEvent:this.ruleForm.name,
            rewardObject:this.people,
            reward:this.hbname,
            state:this.sta
          }).then((res)=>{
            console.log(res);
            if(res.data.msg=='修改成功'){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.qingqiu()
            }else {
              this.$message.error('修改失败');
            }
          }).catch((res)=>{
            console.log(res)
          });
        },
        handleClose(done) {
          this.dialogVisible = false
        },
        open(){
         this.dialogVisible1=true
        },
        close(){
          this.dialogVisible1=false
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection);
          console.log(this.multipleSelection[0].name);
          let arr=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            arr.push(this.multipleSelection[0].name)
          }
          this.hbname=arr.join(',')
        }
      },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
        this.qingqiu();
        this.hongbao()
        // console.log(this.$route.query.name)
      },

    }
</script>

<style scoped>
#zfr{
  width: 100%;
}
.el-pagination{
  text-align: center;
  margin-top: 20px;
}
</style>
