<template>
    <div id="zfr">
      <mytabarow v-bind:passtitle="titlename"></mytabarow>
      <coo v-bind:type="type"></coo>
    </div>
</template>

<script>
  import ceo from '../biaoge/bioage2'
  import tabrow from "../tabrow"; //引入王君的横向的组件
  import coo from "./active2rd";

    export default {
        name: "xrhd",
        components:{
        ceo:ceo,
        coo:coo,
        mytabarow:tabrow
      },
      created() {
        this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递

      },
      data(){
          return{
            type:'新人活动',
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
            titlename:'',
            name1:'',
            id:'',
            tbody:[{a:1,b:2,c:3,d:'全部赠送',e:5,f:'开启',g:7},{a:2,b:2,c:3,d:'随机赠送一个',e:5,f:'关闭',g:7}],
            thead:['策略ID','触发事件','奖励红包','奖励方式','已送份数','状态','更新时间'],
          }
      },
      methods:{
        cheshi(){},
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
          console.log(this.multipleSelection)
        },
        handleClose(done) {
          this.dialogVisible = false
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        shiyan(e){
          this.dialogVisible = true;
          this.id=$(e.path[3]).children()[0].innerText;
          this.name1=$(e.path[3]).children()[1].innerText;
          this.ruleForm.resource=$(e.path[3]).children()[5].innerText;
          this.ruleForm.resource1=$(e.path[3]).children()[3].innerText;
          console.log(this)
        },
        tableToExcel(){
          //要导出的json数据
          const jsonData = [
            {
              name:'路人甲',
              phone:'123456789',
              email:'000@123456.com'
            },
            {
              name:'炮灰乙',
              phone:'123456789',
              email:'000@123456.com'
            },
            {
              name:'土匪丙',
              phone:'123456789',
              email:'000@123456.com'
            },
            {
              name:'流氓丁',
              phone:'123456789',
              email:'000@123456.com'
            },
          ];
          //列标题，逗号隔开，每一个逗号就是隔开一个单元格
          let str = `姓名,电话,邮箱\n`;
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
          link.download =  "json数据表.csv";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
</script>

<style scoped>
  #zfr{
    width: 100%;
  }
  #zz{
    width: 100%;
    height: 100%;
    background-color: green;
    position:fixed;
    z-index: 99;
  }
</style>
