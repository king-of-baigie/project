<template>
    <div id="ui">
      <tabrow v-bind:passtitle="titlename"></tabrow>
      <router-link to="/form1?name=新增轮播" class="add">+添加轮播广告</router-link>
      <el-input
        placeholder="搜索轮播标题"
        v-model="input23" class="Search" style="width: 160px;height: 30px">
        <i slot="prefix" @click="PleaseSearch" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-select v-model="value1" placeholder="全部位置" class="XZ" size="middle" @change="PleaseSearch">
        <el-option
        v-for="item in options1"
        :key="item.value1"
        :label="item.label1"
        :value="item.value1"
        >
        </el-option>
      </el-select>


      <el-select v-model="value2" placeholder="全部状态" class="XZ" size="middle" @change="PleaseSearch">
        <el-option
          v-for="item in options2"
          :key="item.value2"
          :label="item.label2"
          :value="item.value2"
        >
        </el-option>
      </el-select>
<!--      表格-->
      <tabl v-bind:tablearr2="tablearr2" v-bind:tbody2="tbody2" class="biao">
        <template v-slot:cz1>
          <el-button type="text" @click="dialogFormVisible = true;xie($event)">编辑</el-button>
          <el-dialog title="编辑轮播" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="标题"  prop="name" class="biaoti">
                <el-input size="small" v-model="ruleForm.title" class="please" style="width: 350px"></el-input>
              </el-form-item>

              <!--轮播位置-->
              <el-form-item label="轮播位置" prop="Name" style="margin-left: 225px" class="yi">
                <!--          <el-input v-model="ruleForm.Name" size="small" placeholder="请输入文章跳转链接" style="width: 350px"></el-input>-->
                <el-select v-model="value1" style="width: 350px;margin-left: -200px" placeholder="全部位置" class="XZ" size="middle">
                  <el-option
                    v-for="item in options1"
                    :key="item.value1"
                    :label="item.label1"
                    :value="item.value1"
                  >
                  </el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="轮播图" style="margin-left: 238px" prop="tu" class="yi">

                <el-upload style="width: 250px"
                           class="upload-demo"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :file-list="fileList"
                           :http-request="fixUp"
                           list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
<!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>-->
                </el-upload>
              </el-form-item>


              <el-form-item label="上架时间" required class="BOX choose">
                <div class="block Time1">
                  <el-date-picker
                    v-model="value3"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                  </el-date-picker>
                </div>
                <div class="HX">--</div>
                <div class="block Time2" style="display: inline-block">
                  <el-date-picker
                    v-model="value4"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                  </el-date-picker>
                </div>
              </el-form-item>
<!--              排序-->
              <el-form-item label="排序" prop="paixu" class="yi titl pai biaoti">
                <el-input v-model="ruleForm.paixu" :disabled="true" size="small" class="please" placeholder="请输入正整数，数字越大越靠前" style="width: 350px"></el-input>
              </el-form-item>
<!--              状态-->
              <el-form-item label="状态" prop="region"  class="yi biaoti">
                <el-select v-model="ruleForm.region" class="Please">
                  <el-option label="上架" value="上架"></el-option>
                  <el-option label="下架" value="下架"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
<!--            提交-->
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" class="Sure" @click="dialogFormVisible = false;SUB()">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>
        </template>
        <template v-slot:cz2>
          <span class="shanchu" v-model="ruleForm.shan" @click="Delete">删除</span>
        </template>
      </tabl>
<!--      <button @click="cao()">123</button>-->
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
      <router-view></router-view>
    </div>
</template>
<script>
  import tabl from "../biaoge/bioage2"
  import tabrow from ".././tabrow"
    export default {
        name: "articleM",
      methods: {
          // 将表单数据添加到弹出框中
        xie:function (event) {
          var e=event.currentTarget.parentNode.parentNode.firstElementChild.innerHTML;
          var a=event.currentTarget.parentNode.parentNode.firstElementChild.nextElementSibling.innerHTML;
          var b=event.currentTarget.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
          var f=event.currentTarget.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
          var c=event.currentTarget.parentNode.previousElementSibling.innerHTML;
          var d=event.currentTarget.parentNode.previousElementSibling.previousElementSibling.innerHTML;
          var g=event.currentTarget.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
          // console.log(b);
          this.$data.ruleForm.title=e;
          this.$data.value1=a;
          this.$data.ruleForm.paixu=parseInt(d);
          this.$data.ruleForm.region=c;
          this.$data.value3=b;
          this.$data.value4=f;

        },
        // 分页
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.tiao=val;
          this.cao();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage4=val;
          this.cao();
        },
        // 搜索
        PleaseSearch:function () {
          var page=this.$data.currentPage4;
          var limit=this.$data.tiao;
          console.log(page);
          console.log(limit);
          var params = new URLSearchParams();
          params.append('page', page);
          params.append('limit', limit);
          this.cao();
        },
        formatDate:function (now) {
           var year=now.getFullYear();  //取得4位数的年份
           var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
           var date=now.getDate();      //返回日期月份中的天数（1到31）
           var hour=now.getHours();     //返回日期中的小时数（0到23）
           var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
           var second=now.getSeconds(); //返回日期中的秒数（0到59）
           return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
         },
        // 查询数据
        cao(){
          var Input=this.$data.input23;
          var position=this.$data.value1;
          var zt=this.$data.value2;
          var page=this.$data.currentPage4;
          var limit=this.$data.tiao;

          console.log("页数："+page);
          console.log("条数："+limit);
          console.log("输入框："+Input);
          console.log("位置："+position);
          console.log("状态："+zt);
          var params = new URLSearchParams();
          params.append('slideshowLocation', position);       //你要传给后台的参数值 key/value
          params.append('title', Input);       //你要传给后台的参数值 key/value
          params.append('page', page);
          params.append('limit', limit);
          params.append('status', zt);
          // params.append('slideshowid', '排序');       //你要传给后台的参数值 key/value
          // params.append('slideshowlocation', position);       //你要传给后台的参数值 key/value

          var data={title:Input,slideshowLocation:position,page :limit,limit :page,status:zt};
          // var paramsl=JSON.stringify(data);
          console.log(data);
          this.$axios({
            method:"get",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/slides/selectFilter',
            params:data
          }).then((res)=>{
            console.log(res);



            let arr=[];
            this.sumpages=res.data.count;
            // if (res.data.contentSlides.length>0){
              for (let i=0;i<res.data.contentSlides.length;i++){
                var sttime=new Date(res.data.contentSlides[i].starttime);
                var edtime=new Date(res.data.contentSlides[i].endtime);
                console.log(res.data.contentSlides[i].slideshowlocation);
                arr.push({
                  // a:res.data.contentSlides[i].slideshowurl,
                  b:res.data.contentSlides[i].title,
                  c:res.data.contentSlides[i].slideshowlocation,
                  d:this.formatDate(sttime),
                  e:this.formatDate(edtime),
                  f:res.data.contentSlides[i].slideshowid,
                  g:res.data.contentSlides[i].status
                });
                console.log(arr);
              }
              this.tbody2=arr;

            // console.log(res.data.contentSlides[0].title)
          }).catch((res)=>{
            console.log(res)
          });

        },
        // 删除
        Delete:function (obj) {
          // 获取当前按钮的父元素
          console.log(obj.target.parentNode.parentNode);
          console.log(obj.target);
          var father=obj.target.parentNode.parentNode;
          // 获取到当前点击按钮的父元素的上上一个兄弟元素
          console.log(obj.target.parentNode.previousElementSibling.previousElementSibling);
          var brother=parseInt(obj.target.parentNode.previousElementSibling.previousElementSibling.innerHTML);
          console.log(brother);
          father.remove();

          var data={slideshowid:brother};


          console.log(data);
          this.$axios({
            method:"delete",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/slides/deleteById',
            params:data
          }).then((res)=>{
            // console.log("1111111111111");
            console.log(res);
            this.$message({
              message: '删除成功',
              type: 'success',
            });
          //   function formatDate(now) {
          //     var year=now.getFullYear();  //取得4位数的年份
          //     var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
          //     var date=now.getDate();      //返回日期月份中的天数（1到31）
          //     var hour=now.getHours();     //返回日期中的小时数（0到23）
          //     var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
          //     var second=now.getSeconds(); //返回日期中的秒数（0到59）
          //     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
          //   }
          //   var t=res.data.contentSlides[0].starttime; //定义一个时间戳变量
          //   var k=res.data.contentSlides[0].endtime;
          //   var d=new Date(t);   //创建一个指定的日期对象
          //   var l=new Date(k);
          //   // console.log(d);
          //   console.log(formatDate(d));
          //
          //   let arr=[];
          //   this.sumpages=res.data.count;
          //     for (let i=0;i<res.data.contentSlides.length;i++){
          //       console.log(res.data.contentSlides[i].slideshowlocation);
          //       arr.push({
          //         a:res.data.contentSlides[i].slideshowurl,
          //         b:res.data.contentSlides[i].title,
          //         c:res.data.contentSlides[i].slideshowlocation,
          //         d:formatDate(d),
          //         e:formatDate(l),
          //         f:res.data.contentSlides[i].slideshowid,
          //         g:res.data.contentSlides[i].status
          //       });
          //       console.log(arr);
          //     }
          //     this.tbody2=arr;
          }).catch((res)=>{
            console.log(res);
            this.$message({
              message: '删除失败',
              type: 'fail',
            });
          });
          // var a=obj.target.parentNode.parentNode;
          this.cao();
        },
        // 提交表单
        SUB:function () {
          var Input=this.$data.ruleForm.title;
          var src=this.$data.ruleForm.src;
          var standardDate = new Date(this.$data.value3);
          var standardDate2 = new Date(this.$data.value4);
          var standardDay = standardDate.getTime(standardDate);
          var standardDay2 = standardDate.getTime(standardDate2);
          var start=standardDay;
          var end=standardDay2;
          var weiz=this.$data.value1;
          var paixu=this.$data.ruleForm.paixu;
          var ZT=this.$data.ruleForm.region;
          console.log("标题："+Input);
          console.log("图片："+src);
          console.log("轮播位置："+weiz);
          console.log("开始时间："+start);
          console.log("结束时间："+end);
          console.log("排序："+paixu);
          console.log("状态："+ ZT);

          var params = new URLSearchParams();
          params.append('title', Input);       //你要传给后台的参数值 key/value
          // params.append('slideshowurl', src);       //你要传给后台的参数值 key/value
          params.append("slideshowlocation",weiz);
          params.append('starttime', start);       //你要传给后台的参数值 key/value
          params.append('endtime', end);       //你要传给后台的参数值 key/value
          params.append('slideshowid',paixu);
          params.append('status',ZT);

          var data={title:Input,starttime:start,endtime:end,slideshowid:paixu,status:ZT,slideshowlocation:weiz};
          var paramsl=JSON.stringify(data);
          console.log(paramsl);
          this.$axios({
            method:"put",
            headers: {"Content-type":"application/json;charset=utf-8"},
            url:'/eloan/slides/modifySlides',
            data:paramsl
          }).then((res)=>{
            console.log(res);
            this.$message({
              message: '修改成功',
              type: 'success',
            });
          }).catch((res)=>{
            console.log(res);
            this.$message({
              message: '修改失败',
              type: 'fail',
            });
          });
        },
        fixUp(options) {
          console.log("阻止默认的上传行为");
          console.log("阻止默认的上传行为");
          var that = this;
          // 获取文件对象
          let file = options.file;
          //判断图片类型
          //
          if (
            file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/jpg" ||
            file.type == 'image/gif'
          ) {
            var isJPG = true;
          } else {
            isJPG = false;
          }
          // 判断图片大小
          const isLt2M = file.size / 1024 / 1024 < 10;
          if (!isJPG) {
            that.$message.error("上传产品图片只能是 JPG/PNG/JPEG 格式!");
          }
          if (!isLt2M) {
            that.$message.error("上传产品图片大小不能超过 2MB!");
          }
          // 创建一个HTML5的FileReader对象
          var reader = new FileReader();
          if (file) {
            reader.readAsDataURL(file);
          }
          // //文件读取加载时
          reader.onload = e => {
            // 图片的base64存在reader.result中
            // let base64Str = reader.result.split(',')[1];
            let base64Str = reader.result;
            // console.log('文件图片');
            // console.log(base64Str);
            // this.Borrowform.borrows.push(base64Str);
            this.Borrowform.push(base64Str);
            console.log(this.Borrowform);
          };
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
      },
        data(){
          return {
            currentPage4: 1,
            titlename:'',
            input23:'',
            starttime:'',
            sumpages:0,
            tiao:10,
            dialogFormVisible: false,
            value3:'',
            value4:'',
            src:'',
            fileList:[],
            Borrowform:[],
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
              shuR:'',
              shan:'',
              title:''
            },
            formLabelWidth: '120px',
            tablearr2:["标题","轮播位置","开始时间","结束时间","排序","状态"],
            tbody2:[
              {
                // lb:"随便",
                bt:"狂欢双12",
                wz:"商城轮播",
                ks:"2015-2-25 10:00:00",
                js:"2015-2-28 10:00:00",
                px:"1",
                zt:"上架"
              }
              ],
            options1:[
              {
                value1:'',
                label1:"全部位置"
              },
              {
                value1:'移动端首页轮播',
                label1:"移动端首页轮播"
              },
              {
                value1:'商城轮播',
                label1:"商城轮播"
              }
            ],
            options2:[
              {
                value2:'',
                label2:"全部状态"
              },
              {
                value2:'上架',
                label2:"上架"
              },
              {
                value2:'下架',
                label2:"下架"
              }
            ],
            value1: '',
            value2:''
        };
      },
      components:{
          tabl:tabl,
          tabrow:tabrow
      },
      created() {
        this.$data.titlename = this.$route.query.name;
        // console.log(this.$route.query.name);
        this.cao()
      },
    }

</script>

<style scoped>

  #ui {
    width: 100%;
  }
  .biaoti {
    margin-left: 250px;
  }

  .please {
    margin-left: -200px;
  }
  .Please {
    margin-left: -330px;
  }
  .Sure {
    margin-left: -500px;
  }
  .shanchu {
    color: #409eff;
    cursor: pointer;
    padding-left: 5px;
  }
  .add {
    display: inline-block;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    color: black;
    padding: 0 15px;
    background:none;
    border: 1px solid #767676;
    margin-top: 40px;
    margin-left: 80px;
    margin-bottom: 40px;
  }
  .add:hover{
    box-shadow: 2px 2px 5px #656565;
    cursor: pointer;
  }
  .biao {
    width: 95%;
    margin: 0 auto;
  }
  .Search {
    margin-left: 50%;
    outline: none;
  }
  .XZ {
    width: 160px;
    height: 38px;
    outline: none;
    margin-left: 10px;
  }
  .block {
    text-align: center;
    margin-top: 40px;
  }
  .choose {
    /*border: 1px solid red;*/
    height: 40px;
    margin-left: 210px;
    position: relative;
  }
  .Time1 {
    /*border: 1px solid red;*/
    position: absolute;
    left: 115px;
    top: -40px;
  }
  .Time2 {
    position: absolute;
    left: 380px;
    top: -40px;
  }
  .HX {
    height: 40px;
    line-height: 40px;
    display: inline-block;
    position: absolute;
    left: 350px;
    top: 0;
  }
  .ADD {
    margin-right: 400px;
  }



</style>
