<template>
    <div class="XY">
      <tabrow v-bind:passtitle="titlename"></tabrow>
      <button @click="dialogFormVisible = true" class="add">+添加协议</button>
      <el-dialog title="添加协议" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="协议名称:" class="xieyi" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 350px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="协议类型:"  class="xieyi" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择协议类型">
              <el-option label="用户注册协议" value="用户注册协议"></el-option>
              <el-option label="借款通用协议" value="借款通用协议"></el-option>
              <el-option label="银行卡绑定协议" value="银行卡绑定协议"></el-option>
              <el-option label="担保标借款协议" value="担保标借款协议"></el-option>
              <el-option label="抵押标借款协议" value="抵押标借款协议"></el-option>
              <el-option label="信用标借款协议" value="信用标借款协议"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:"  class="xieyi" :label-width="formLabelWidth">
            <el-select v-model="form.region2" placeholder="请选择协议状态">
              <el-option label="启用" value="启用"></el-option>
              <el-option label="停用" value="停用"></el-option>
            </el-select>
            <span class="Sp">禁用则前台不展示</span>
          </el-form-item>
          <el-form-item label="文章正文:" class="titl xieyi">
            <el-input
              type="textarea"
              :rows="2"
              style="width: 350px"
              placeholder="请输入内容"
              v-model="ruleForm.textarea">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false;Ture()">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>


      <tabl v-bind:tablearr2="tablearr2" v-bind:tbody2="tbody2" class="biao">
        <template v-slot:cz1>
          <el-button type="text" @click="dialogFormVisiblele = true;See($event)">预览</el-button>
          <el-dialog title="协议详情" :visible.sync="dialogFormVisiblele">
            <el-form :model="form">
              <el-form-item label="协议名称:" class="XYi"  :label-width="formLabelWidthth">
                <el-input v-model="form.xieyi" class="FO" :disabled="true" style="width: 350px" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="协议类型:" class="XYi"  :label-width="formLabelWidthth">
                <el-select v-model="form.leiX" class="FO" disabled  placeholder="请选择协议类型">
                  <el-option label="用户注册协议" value="用户注册协议"></el-option>
                  <el-option label="借款通用协议" value="借款通用协议"></el-option>
                  <el-option label="银行卡绑定协议" value="银行卡绑定协议"></el-option>
                  <el-option label="担保标借款协议" value="担保标借款协议"></el-option>
                  <el-option label="抵押标借款协议" value="抵押标借款协议"></el-option>
                  <el-option label="信用标借款协议" value="信用标借款协议"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态:" class="XYi"  :label-width="formLabelWidthth">
                <el-select v-model="form.leiX1" class="FO" placeholder="请选择活动区域">
                  <el-option label="启用" value="启用"></el-option>
                  <el-option label="停用" value="停用"></el-option>
                </el-select>
                <span class="Sp">禁用则前台不展示</span>
              </el-form-item>
              <el-form-item label="文章正文:" class="XYi">
                <el-input
                  type="textarea"
                  :rows="2"
                  class="FO"
                  style="width: 350px"
                  placeholder="请输入内容"
                  v-model="ruleForm.shuR">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisiblele = false">确 定</el-button>
              <el-button @click="dialogFormVisiblele = false">取 消</el-button>
            </div>
          </el-dialog>
        </template>|
        <template v-slot:cz2>
          <el-button type="text" @click="dialogFormVisiblele = true;See($event)">启用</el-button>
          <el-dialog title="协议详情" :visible.sync="dialogFormVisiblele">
            <el-form :model="form">
              <el-form-item label="协议名称:" class="XYi" :label-width="formLabelWidthth">
                <el-input v-model="form.xieyi" class="FO" :disabled="true" style="width: 350px" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="协议类型:" class="XYi"  :label-width="formLabelWidthth">
                <el-select v-model="form.leiX" disabled class="FO XYLX" placeholder="请选择活动区域">
                  <el-option label="用户注册协议" value="zhuce"></el-option>
                  <el-option label="借款通用协议" value="jiekuan"></el-option>
                  <el-option label="银行卡绑定协议" value="yinhk"></el-option>
                  <el-option label="担保标借款协议" value="danbb"></el-option>
                  <el-option label="抵押标借款协议" value="diyab"></el-option>
                  <el-option label="信用标借款协议" value="xinyongb"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态:" class="XYi"  :label-width="formLabelWidthth">
                <el-select v-model="form.leiX1" class="FO" placeholder="请选择活动区域">
                  <el-option label="启用" value="启用"></el-option>
                  <el-option label="停用" value="停用"></el-option>
                </el-select>
                <span class="Sp">禁用则前台不展示</span>
              </el-form-item>
              <el-form-item label="文章正文:" class="XYi zhengwen">
                <el-input
                  type="textarea"
                  :rows="2"
                  class="FO ZW"
                  style="width: 350px"
                  placeholder="请输入内容"
                  v-model="ruleForm.shuR">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisiblele = false;Gai()">确 定</el-button>
              <el-button @click="dialogFormVisiblele = false">取 消</el-button>
            </div>
          </el-dialog>
        </template>
      </tabl>
<!--      <button @click="Fuck">123456</button>-->
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
        name: "xieyi",
      components:{
        tabl:tabl,
          tabrow:tabrow
      },
      data(){
          return{
            titlename:'',
            currentPage4: 1,
            sumpages:0,
            tiao:10,
            tablearr2:["协议类型","协议名称","是否启用"],
            tbody2:[
              {a:"用户注册协议",b:"1",c:"停用"}
              ],
            dialogFormVisible: false,
            dialogFormVisiblele:false,
            form: {
              name: '',
              name1:'',
              region: '',
              region2:'',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: '',
              xieyi:'',
              leiX:'',
              leiX1:'',
            },
            ruleForm:{
              textarea:'',
              shuR:''
            },
            formLabelWidth: '120px',
            formLabelWidthth:'120px'
          }
      },
      methods:{
          // 添加协议
        Ture:function () {
          var bm=this.$data.form.name;
          var lei=this.$data.form.region;
          var zt=this.$data.form.region2;
          var zw=this.$data.ruleForm.textarea;
          console.log("协议名："+bm);
          console.log("协议类名："+lei);
          console.log("协议状态："+zt);
          console.log("文章正文:"+zw);

          var params = new URLSearchParams();
          params.append('protocolName', bm);       //你要传给后台的参数值 key/value
          params.append('protocolType', lei);       //你要传给后台的参数值 key/value
          params.append('status', zt);       //你要传给后台的参数值 key/value
          params.append('content', zw);       //你要传给后台的参数值 key/value
          this.$axios.post('/eloan/activity/insertProcotol',{
            protocolName:bm,
            protocolType:lei,
            status:zt,
            content:zw,
          }).then((res)=>{
            console.log(res);
            this.$message({
              message: '添加成功',
              type: 'success',
            });
            this.Fuck();
          })
        },
        See:function (event) {
          console.log(event.currentTarget.parentNode.parentNode.firstElementChild.innerHTML);
          var a=event.currentTarget.parentNode.parentNode.firstElementChild.innerHTML;
          var b=event.currentTarget.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
          var c=event.currentTarget.parentNode.previousElementSibling.innerHTML;
          // console.log(a);
          // console.log(parseInt(b));
          // console.log(c);
          this.$data.form.xieyi=parseInt(b);
          this.$data.form.leiX=a;
          this.$data.form.leiX1=c;


          var Page=this.$data.tiao;
          var Limit=this.$data.currentPage4;
          // console.log("页面："+Page);
          // console.log("条数："+Limit);
          var params = new URLSearchParams();
          params.append('page', Limit);       //你要传给后台的参数值 key/value
          params.append('limit', Page);       //你要传给后台的参数值 key/value
          // params.append('activityTitle', '春节活动');       //你要传给后台的参数值 key/value
          // params.append('activityStatus', '发送成功');       //你要传给后台的参数值 key/value
          this.$axios({
            method:"get",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/activity/selectProtocolsBypage',
            params:params
          }).then((res)=>{
            console.log(res);

            for (var i=0;i<=res.data.data.length;i++) {
              // console.log(res.data.data[i].content);
              this.$data.ruleForm.shuR=res.data.data[i].content;
            }
          }).catch((res)=>{
            console.log(res)
          });


          // this.$data.ruleForm.shuR=res.$data.data.content;
        },
        // 修改
        Gai:function() {
          var zt=this.$data.form.leiX1;
          var id=this.$data.form.xieyi;
          console.log(id);
          console.log("状态："+zt);
          var params = new URLSearchParams();
          params.append('status', zt);       //你要传给后台的参数值 key/value
          params.append('protocolName', id);       //你要传给后台的参数值 key/value
          this.$axios.post('/eloan/activity/updateProcotol',{
            status:zt,
            protocolName:id
          }).then((res)=>{
            console.log(res);
            this.$message({
              message: '修改成功',
              type: 'success',
            });
            this.Fuck();
          })
        },
        // 获取数据
        Fuck:function() {
          var Page=this.$data.tiao;
          var Limit=this.$data.currentPage4;
          console.log("页面："+Page);
          console.log("条数："+Limit);
          var params = new URLSearchParams();
          params.append('page', Limit);       //你要传给后台的参数值 key/value
          params.append('limit', Page);       //你要传给后台的参数值 key/value
          // params.append('activityTitle', '春节活动');       //你要传给后台的参数值 key/value
          // params.append('activityStatus', '发送成功');       //你要传给后台的参数值 key/value
          this.$axios({
            method:"get",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/activity/selectProtocolsBypage',
            params:params
          }).then((res)=>{
            console.log(res);

            let arr=[];
            this.sumpages=res.data.count;
            if (res.data.data.length>0) {
              for (let i=0;i<=res.data.data.length;i++) {
                // console.log(res.data.contentArticles[i].updatetime);
                // var uptime=new Date(res.data.data[i].protocolType);
                // console.log(uptime);
                arr.push({
                  a: res.data.data[i].protocolType,
                  b: res.data.data[i].protocolName,
                  c: res.data.data[i].status
                });
                // console.log(arr);
                this.tbody2 = arr;
              }
            } else {
              this.tbody2=[]
            }

          }).catch((res)=>{
            console.log(res)
          });

        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.tiao=val;
          this.Fuck();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage4=val;
          this.Fuck();
        },
      },
      created() {
        this.$data.titlename = this.$route.query.name;
        this.Fuck();

      },
    }
</script>

<style scoped>
  .XY {
    width: 100%;
  }
  .XYLX {
    margin-right: 130px;
  }
  .zhengwen {
    margin-left: 50px;
  }
  .block {
    text-align: center;
    margin-top: 40px;
  }
  .add {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    color: black;
    width: 120px;
    height: 30px;
    background:none;
    border: 1px solid #aeaeae;
    margin-top: 40px;
    margin-left: 90px;
    margin-bottom: 40px;
  }
  .add:hover{
    box-shadow: 2px 2px 5px #929292;
    cursor: pointer;
  }

  /*.XYi {*/
    /*margin-left: 150px;*/
  /*}*/
  .FO {
    margin-left: -150px;
  }
  .biao {
    width: 90%;
    margin: 0 auto;
  }
  .xieyi {
    margin-left: 150px;
  }
  .titl {
    margin-left: 198px;
    resize: none;
  }
  .Sp {
    color: #999999;
    padding-left: 10px;
  }
</style>
