<template>
    <div>
      <el-dialog title="红包选择" :visible.sync="dialogTableVisible">
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
        <div style="margin-top: 20px;text-align: center">
          <el-button @click="dialogTableVisible=false">确定</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="策略配置"
        :visible.sync="dialogVisible"
        width="50%"
        center
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="name1" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="选择红包">
            <el-button type="primary" @click="dialogTableVisible= true">选择红包</el-button>
          </el-form-item>
          <el-form-item label="状态" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="开启"></el-radio>
              <el-radio label="关闭"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="赠送方法" prop="resource1">
            <el-radio-group v-model="ruleForm.resource1">
              <el-radio label="固定红包"></el-radio>
              <el-radio label="随机红包"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!--<el-form-item>-->
          <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          <!--</el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="xiugai">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <ceo v-bind:tablearr2="thead" v-bind:tbody2="tbody">
        <template v-slot:cz1>
          <el-button type="text" @click="shiyan">修改</el-button>
        </template>
      </ceo>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
</template>

<script>
  import ceo from '../biaoge/bioage2'
    export default {
      name: "active2rd",
      components:{
          ceo:ceo
      },
      props:['type'],
      data(){
        return{
          tbody:[{}],
          tableData: [
            {name:'满减',type:'满减',time:'30',money:'￥100',cond:'投资'},
            {name:'满减',type:'满减',time:'20',money:'￥200',cond:'冲！'}],
          multipleSelection: [],
          dialogTableVisible: false,
          ruleForm: {
            name: '',
            resource: '',
            resource1: '',
          },
          rules:{},
          dialogVisible: false,
          currentPage:1,
          page:'1',
          limit:'10',
          titlename:'',
          name1:'',
          id:'',
          hbname:'',
          count:0,
          // tbody:[{a:1,b:2,c:3,d:'全部赠送',e:5,f:'开启',g:7},{a:2,b:2,c:3,d:'随机赠送一个',e:5,f:'关闭',g:7}],
          thead:['策略ID','触发事件','奖励红包','奖励方式','已送份数','状态','更新时间'],
        }
      },
      created(){
        this.qingqiu();
        this.hongbao()
      },
      methods: {
        shijian(time){
          var timestamp4 = new Date(time);//直接用 new Date(时间戳) 格式转化获得当前时间
          var shijian1=timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
          return shijian1
        },
        hongbao(){
          this.$axios.get('/eloan/redpNew/login2',{
          }).then((res)=>{
            console.log(res);
            // tableData: [
            //   {name:'满减',type:'满减',time:'30',money:'￥100',cond:'投资'},
            //   {name:'满减',type:'满减',time:'20',money:'￥200',cond:'冲！'}],
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
        cheshi() {
          this.dialogVisible = false;
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
          console.log(this.multipleSelection[0].name);
          let arr=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            arr.push(this.multipleSelection[0].name)
          }
          this.hbname=arr.join(',')
        },
        handleClose(done) {
          this.dialogVisible = false;
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
          params.append('activitytype', this.type);       //你要传给后台的参数值 key/value
          this.$axios({
            method:"get",
            url:'/eloan/activity/selectActivityInfoByPage',
            params:params
          }).then((res)=>{
            // console.log(res);
            let arr=[];
            for(let i=0;i<res.data.data.length;i++){
              arr.push({
                a:res.data.data[i].id,
                b:res.data.data[i].triggerEvent,
                d:res.data.data[i].bonusBonus,
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
        xiugai(){
          this.dialogVisible = false;
          this.$axios.post('/eloan/activity/updateActivityInfo',{
            id:this.id,
            state:this.ruleForm.resource,
            bonusBonus:this.hbname,
            rewardMethod:this.ruleForm.resource1
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
          })
        },
        shiyan(e) {
          if (this.$props.type!='邀请活动') {
            this.dialogVisible = true;
            this.id = $(e.path[3]).children()[0].innerText;
            this.name1 = $(e.path[3]).children()[1].innerText;
            this.ruleForm.resource = $(e.path[3]).children()[5].innerText;
            this.ruleForm.resource1 = $(e.path[3]).children()[3].innerText;
            console.log(this)
          }else{
            console.log("hellow word")
          }
        },
      }
    }
</script>

<style scoped>
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
