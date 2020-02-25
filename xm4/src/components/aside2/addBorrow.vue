<!--编辑的新增借款界面==新增借款-->
<template>
  <div class="list1">
    <!--    引入横向的组件第一步-->
    <mytabarow :passtitle="titlename"></mytabarow>
    <div class="formcontainer">
      <!--      表单-->
      <div>
        <el-form
          ref="Borrowform"
          :model="Borrowform"
          :rules="rules"
          label-width="80px"
          class="myform"
          @submit.native.prevent
        >
          <div class="title" style="margin-top: 10px">基本信息</div>
          <div class="inputcontone">
            <!--            左边的盒子-->
            <div class="leftbox">
              <!--              左边第一个-->
              <el-form-item label="标名:" class="w410" :hide-required-asterisk="true" prop="name">
                <el-select v-model="Borrowform.name" placeholder="请选择标名" style="width: 310px">
                  <el-option
                    :label="item.name"
                    :value="item.name"
                    v-for="item in bmname"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!--              左边第二个-->
              <div class="jk">
                <el-form-item
                  label="借款方:"
                  style="width: 330px;"
                  :hide-required-asterisk="true"
                  prop="borrowUser"
                >
                  <el-input v-model="Borrowform.borrowUser" placeholder="请点击按钮选择借款账号" disabled></el-input>
                </el-form-item>
                <el-button type="primary" @click="choose()" class="xzbtn">选择</el-button>
              </div>
              <!--              dialogTableVisible = true-->
              <!--              左边第三个-->
              <el-form-item label="年利率:" class="w410" :hide-required-asterisk="true" prop="arp">
                <el-input v-model="Borrowform.arp" placeholder="请输入1-24之间的数"></el-input>
              </el-form-item>
              <!--              左边第四个-->
              <el-form-item
                label="期限类型"
                class="w410"
                :hide-required-asterisk="true"
                prop="timeType"
              >
                <el-radio-group v-model="Borrowform.timeType" class="timetype">
                  <el-radio label="天">天</el-radio>
                  <el-radio label="月">月</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              左边第五个-->
              <el-form-item
                label="借款起息方式"
                class="w410 labr"
                label-width="110px"
                :hide-required-asterisk="true"
                prop="nterestLoan"
              >
                <el-radio label="成立计息" v-model="Borrowform.nterestLoan"></el-radio>
              </el-form-item>
              <!--              左边第六个-->
              <el-form-item
                label="逾期罚息利率:"
                label-width="110px"
                style="width: 440px"
                :hide-required-asterisk="true"
                prop="interest"
              >
                <el-input v-model="Borrowform.interest" placeholder="请输入0-24之间的数"></el-input>
              </el-form-item>
              <!--              左边第七个-->
              <el-form-item label="资金用途:" prop="purpose" label-width="110px">
                <el-select v-model="Borrowform.purpose" placeholder="请选择资金用途" style="width: 330px;">
                  <el-option label="短期周转" value="0"></el-option>
                  <el-option label="生意周转" value="1"></el-option>
                  <el-option label="购物消费" value="2"></el-option>
                  <el-option label="长期周转" value="3"></el-option>
                  <el-option label="其他用途" value="4"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--            右边的盒子-->
            <div class="rightbox">
              <!--              右边第一个-->
              <el-form-item
                label="风险等级:"
                label-width="110px"
                :hide-required-asterisk="true"
                prop="riskGrade"
              >
                <el-select
                  v-model="Borrowform.riskGrade"
                  placeholder="请选择风险等级"
                  name="risk"
                  style="width: 311px;"
                >
                  <el-option label="极低" value="0"></el-option>
                  <el-option label="较低" value="1"></el-option>
                  <el-option label="中等" value="2"></el-option>
                  <el-option label="中高" value="3"></el-option>
                  <el-option label="高" value="4"></el-option>
                </el-select>
              </el-form-item>
              <!--              右边第二个-->
              <el-form-item
                label="借款总金额:"
                class="w410"
                label-width="100px"
                :hide-required-asterisk="true"
                prop="amount"
              >
                <el-input v-model="Borrowform.amount" placeholder="请输入500-50000000的整数"></el-input>
              </el-form-item>
              <!--              右边第三个-->
              <el-form-item
                label="还款方式:"
                :hide-required-asterisk="true"
                prop="repayType"
                label-width="100px"
              >
                <el-select
                  v-model="Borrowform.repayType"
                  placeholder="请选择还款方式"
                  style="width: 311px;"
                >
                  <el-option label="一次性还款" value="0"></el-option>
                  <el-option label="等额本息" value="1"></el-option>
                  <el-option label="按月付息到期还本" value="2"></el-option>
                  <el-option label="按天还款" value="3"></el-option>
                </el-select>
              </el-form-item>
              <!--              右边第四个-->
              <el-form-item
                label="借款期限:"
                class="w410"
                :hide-required-asterisk="true"
                prop="borrowTime"
                label-width="100px"
              >
                <el-input v-model="Borrowform.borrowTime" placeholder="请输入0-999之间的整数"></el-input>
              </el-form-item>
              <!--            右边第五个-->
              <el-form-item
                label="借款管理费月率:"
                label-width="130px"
                style="width: 440px;"
                :hide-required-asterisk="true"
                prop="minTerest"
              >
                <el-input v-model="Borrowform.minTerest" placeholder="请输入0-24之间的数,保留两位小数"></el-input>
              </el-form-item>
              <!--              右边第六个-->
              <el-form-item
                label="借款类型:"
                :hide-required-asterisk="true"
                prop="borrowType"
                label-width="100px"
              >
                <el-select
                  v-model="Borrowform.borrowType"
                  placeholder="请选择借款类型"
                  style="width: 310px;"
                >
                  <el-option label="新增" value="0"></el-option>
                  <el-option label="续贷" value="1"></el-option>
                  <el-option label="资产处理" value="2"></el-option>
                </el-select>
              </el-form-item>
              <!--              右边第七个-->
              <el-form-item label="还款来源:" class="w390" prop="repaySource">
                <el-input v-model="Borrowform.repaySource" placeholder="请输入借款人还款来源"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="title" style="margin-top: 10px;">担保信息</div>
          <div class="dbcontainer">
            <!--            担保信息左边-->
            <div class="dbleft">
              <!--              左边第一个-->
              <el-form-item label="是否担保" class="w410" prop="isGuarantee">
                <el-radio-group v-model="Borrowform.isGuarantee" class="dbmag">
                  <el-radio label="true">是</el-radio>
                  <el-radio label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              左边第二个-->
              <el-form-item label="抵押类型" class="w410" prop="guarantyType">
                <el-radio-group v-model="Borrowform.guarantyType">
                  <el-radio label="无">无</el-radio>
                  <el-radio label="房抵">房抵</el-radio>
                  <el-radio label="车抵">车抵</el-radio>
                  <el-radio label="民品抵">民品抵</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <!--            担保信息右边-->
            <div class="dbright">
              <!--              右边第一个-->
              <el-form-item label="担保机构:" prop="guarantor">
                <el-select
                  v-model="Borrowform.guarantor"
                  placeholder="请选择担保机构"
                  style="width: 310px"
                >
                  <el-option
                    :label="item.name"
                    :value="item.name"
                    v-for="item in guarantorgs"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!--              ====================================================================-->
              <!--              文件图片上传-->
              <div class="filecontainer" style="width: 440px ;">
                <div class="upfileimg">
                  <el-upload
                    action="#"
                    :on-preview="handlePreview"
                    :on-remove="handleRemovedb"
                    :multiple="true"
                    :http-request="httpRequestone"
                    list-type="picture"
                    :limit="3"
                    ref="upload"
                  >
                    <el-button size="small" type="primary">点击上传担保材料</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>

          <!--        借款资料-->
          <div class="title" style="margin-top: 10px;">借款资料</div>
          <div class="jkcountainer">
            <div>
              <el-upload
                action="#"
                :on-preview="handlePreview"
                :on-remove="handleRemovejk"
                :multiple="true"
                :http-request="httpRequest"
                list-type="picture"
                ref="jkupload"
              >
                <el-button size="small" type="primary">点击上传借款资料</el-button>
              </el-upload>
            </div>
          </div>
          <div class="btn">
            <el-form-item>
              <el-button type="primary" @click="submitForm('Borrowform')">提交审核</el-button>
              <el-button @click="savefile('Borrowform')">保存</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!--        模态框嵌套表格-->
    <el-dialog
      title="选择借款人"
      :visible.sync="dialogTableVisible"
      style="border: 1px solid rebeccapurple;"
    >
      <div class="btncount">
        <el-input
          placeholder="搜索借款人姓名"
          v-model="searchinput"
          clearable="true"
          style="width: 270px;"
          @change="searchUser"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchClick"></i>
        </el-input>
        <el-button>
          <router-link to="#">新增借款用户</router-link>
        </el-button>
      </div>

      <el-table :data="gridData" :stripe="true" :show-header="true">
        <el-table-column property="userName" label="真实姓名" align="center"></el-table-column>
        <el-table-column property="tel" label="手机号码" align="center"></el-table-column>
        <el-table-column property="status" label="用户状态" align="center"></el-table-column>
        <el-table-column property="userType" label="身份类型" align="center"></el-table-column>
        <el-table-column property="createDate" label="添加时间" align="center" width="200"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="chooseUser(scope.row)">选择借款人</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import tabrow from "../tabrow"; //引入横向的组件第二步引入这个文件
export default {
  name: "addBorrow",
  components: {
    mytabarow: tabrow //引入横向组件的第三步注册横向的组件
  },
  //---------------------------页面中所有的data数据-----------------------------------
  data() {
    return {
      mttupian: "", //
      titlename: "", //王君引入横向组件的第四步，作为父组件向子组件传递的参数
      // Api: "http://118.190.202.182:8080", //ip地址
      imageUrl: "", //担保材料上传图片
      //新增借款表单

      //----------------------------------------------表单中的数据
      Borrowform: {
        borrowUser: "", //这是表单中借款方的id----不是必须返回的字段
        name: "", //1.标名
        borrowUserType: "", //2.账户类型
        arp: "", //3.年利率
        timeType: "", //4.期限类型
        interest: "", //5.逾期罚息利率
        nterestLoan: "成立计息", //
        purpose: "", //6.用途
        riskGrade: "", //7.风险等级
        amount: "", //8.总金额
        repayType: "", //9.还款方式
        borrowTime: "", //10.借款期限
        minTerest: "", //11.借款管理费月率
        borrowType: "", //12.借款类型
        repaySource: "", //13.还款来源
        isGuarantee: "", //14.是否担保
        guarantyType: "", //15.抵押类型
        guarantor: "", //16.担保公司
        // guaranteesFiles: "", //17.担保的材料图片
        // borrowFiles: "", //18.上传的借款图片
        //=========
        borrows: [],
        guarantees: [],
        userName: "", //19.用户名
        tel: "" //20.用户电话
      },
      //加载页面的时候获取的担保公司的列表
      guarantorgs: "",
      bmname: "", //标名
      //王君模态框表格需要的数据
      searchinput: "", //在模态框中input框的数据
      gridData: [{}],
      //模态框表格需要的数据
      disabled: false,
      //上传图片需要的参数
      dialogImageUrl: "", //图片
      dialogVisible: false,
      dialogTableVisible: false, //模态框

      //=========规则
      rules: {
        name: [{ required: true, message: "请选择标名", trigger: "change" }],
        borrowUser: [
          { required: true, message: "请选择借款方", trigger: "blur" }
        ],
        arp: [
          { required: true, message: "请输入1-24的数字", trigger: "blur" },
          { min: 1, max: 2, message: "长度在 1 到 2 个字符", trigger: "blur" }
        ],
        timeType: [
          { required: true, message: "请选择期限", trigger: "change" }
        ],
        nterestLoan: [{ required: true, trigger: "change" }],
        interest: [
          { required: true, message: "请输入0-24的数字", trigger: "blur" },
          { min: 1, max: 2, message: "长度在 1 到 2 个字符", trigger: "blur" }
        ],
        purpose: [
          { required: false, message: "请选择资金用途", trigger: "change" }
        ],
        riskGrade: [
          { required: true, message: "请选择风险等级", trigger: "change" }
        ],
        amount: [
          {
            required: true,
            message: "请输入500-50000000的整数",
            trigger: "blur"
          },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        repayType: [
          { required: true, message: "请选择还款方式", trigger: "change" }
        ],
        borrowTime: [
          { required: true, message: "请输入0-999之间的整数", trigger: "blur" },
          { min: 1, max: 3, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        minTerest: [
          { required: true, message: "请输入0-24的数字", trigger: "blur" },
          { min: 1, max: 2, message: "长度在 1 到 2 个字符", trigger: "blur" }
        ],
        borrowType: [
          { required: true, message: "请选择借款类型", trigger: "change" }
        ],
        repaySource: [
          { required: false, message: "请输入还款来源", trigger: "change" }
        ],
        isGuarantee: [
          { required: false, message: "是否担保", trigger: "change" }
        ],
        guarantyType: [
          { required: false, message: "抵押类型", trigger: "change" }
        ],
        guarantor: [
          { required: false, message: "请选择担保机构", trigger: "change" }
        ]
      }
    };
  }, //-----------------------------data的闭合标签------------------------------------

  created() {
    this.$data.titlename = this.$route.query.name; //引入横向组件的第五步，当页面创建的时候就进行参数的传递
    // 在页面加载时获取担保公司的数据==============别删
    var serialNumber = this.$route.query.usernub;
    this.$axios({
      method: "get",
      headers: { "Content-type": "application/json;charset=utf-8" },
      url: "/eloan/institution/showProductsAndGuarantee"
    }).then(res => {
      console.log(res);
      this.guarantorgs = res.data.guarantee; //担保公司
      this.bmname = res.data.products; //标名
      this.$axios
        .get("/eloan/bidInfo/selectAuditBySerialNumber/" + serialNumber)
        .then(res => {
          //页面加载完成后请求的数据
          console.log(res.data);
          this.Borrowform = res.data;
          this.Borrowform.nterestLoan = "成立计息";
          this.Borrowform.borrowUser = res.data.userName;
          this.Borrowform.isGuarantee = res.data.guarantee;
        });
    });
  },
  methods: {
    //移除图片
    handleRemovedb(file, fileList) {
      console.log("移除了图片");
      console.log(file, fileList);
      this.Borrowform.guarantees.pop();
    },
    handleRemovejk(file, fileList) {
      console.log("移除了图片");
      console.log(file, fileList);
      this.Borrowform.borrows.pop();
    },
    //点击预览图片
    handlePreview(file) {
      console.log(file);
    },
    //==========================================王君的新增借款提交表单====================================================
    submitForm(formName) {
      delete this.Borrowform.borrowUser;
      //====================================
      var guaranteesId = {}; //创建一个对象
      guaranteesId.isGuarantee = this.Borrowform.isGuarantee; //14.是否担保
      guaranteesId.guarantyType = this.Borrowform.guarantyType; //15.抵押类型
      guaranteesId.guarantor = this.Borrowform.guarantor; //16.担保公司
      delete this.Borrowform.isGuarantee;
      delete this.Borrowform.guarantyType;
      delete this.Borrowform.guarantor;
      this.Borrowform.guaranteesId = guaranteesId;
      var myform = this.Borrowform;
      console.log(myform);
      //===========================
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确定提交审核？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$axios({
                method: "post",
                headers: { "Content-type": "application/json;charset=utf-8" },
                url: "/eloan/bidInfo/insertInfoBySubmit",
                data: myBorrowform
              }).then(res => {
                // console.log(res);
                if (res.data.code === 200) {
                  //code码两百表示成功
                  this.$message({
                    type: "success",
                    message: "提交审核成功!"
                  });
                  //提交审核成功之后将表单对象和上传文件清空
                  this.$refs.upload.clearFiles();
                  this.$refs.jkupload.clearFiles();
                  this.$refs[formName].resetFields();
                }
                //提交服务器失败提示报错的地方
                else {
                  this.$message.error(res.data.data.defaultMessage);
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        }
        //如果表单验证失败则提示信息
        else {
          this.$message({
            message: "请将表单填写完整！",
            type: "warning"
          });
          return false;
        }
      });
    },
    //==================================================================================================================
    // ===============================点击模态框需要获取的数据并渲染在模态框的表格中====================================
    choose() {
      this.$axios({
        method: "get",
        headers: { "Content-type": "application/json;charset=utf-8" },
        url: "/eloan/userInfo/selectAllUser"
      })
        .then(res => {
          console.log(res);
          this.gridData = res.data;
        })
        .then(res => {
          return (this.dialogTableVisible = true);
        });
    },
    //==================================================================================================================

    //=====================================模态框中搜索借款人的搜索按钮====================================================
    searchUser() {
      console.log(this.searchinput);
      //如果输入的框变化成为空
      if (this.searchinput == "") {
        this.$axios.get("/eloan/userInfo/selectAllUser").then(res => {
          console.log(res);
          this.gridData = res.data;
        });
      } else {
        this.$axios({
          method: "post",
          headers: { "Content-type": "application/json;charset=utf-8" },
          url: "/eloan/userInfo/selectAllUser", //这个地方接口不对
          data: this.searchinput
        }).then(res => {
          // console.log("搜索到联系人");
          // console.log(res);
          this.gridData = res.data;
        });
      }
    },
    //==============搜索框的点击事件
    searchClick() {
      if (this.searchinput == "") {
        this.$message({
          message: "借款人姓名不能为空",
          type: "warning"
        });
      }
    },
    //  ================================================================================================================

    // ==========================================选择借款人填充到借款方的输入框中==========================================
    chooseUser(row) {
      this.Borrowform.borrowUser = row.userName;
      this.Borrowform.userName = row.userName;
      this.Borrowform.tel = row.tel;
      this.Borrowform.borrowUserType = row.userType;
      return (this.dialogTableVisible = false);
    },
    //==================================================================================================================

    //担保材料上传图片
    //==================================================================================================================

    //==========================================================放大图片=================================================
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //==================================================================================================================

    //==================================================================================================================

    //=====================================================将图片转换成base64============================================
    httpRequest(options) {
      console.log("阻止默认的上传行为");
      var that = this;
      // 获取文件对象
      let file = options.file;
      //判断图片类型
      //
      if (
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/jpg"
      ) {
        var isJPG = true;
      } else {
        isJPG = false;
      }
      // 判断图片大小
      const isLt2M = file.size / 1024 / 1024 < 2;
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
        this.Borrowform.borrows.push(base64Str);
      };
    },
    //==================================================================================================================

    //=====================================================将图片转换成base64============================================
    httpRequestone(options) {
      console.log("阻止默认的上传行为");
      var that = this;
      // 获取文件对象
      let file = options.file;
      // 判断图片类型
      if (
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/jpg"
      ) {
        var isJPG = true;
      } else {
        isJPG = false;
      }
      // 判断图片大小
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        that.$message.error("上传产品图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        that.$message.error("上传产品图片大小不能超过 2MB!");
      }
      // // 创建一个HTML5的FileReader对象
      var reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
      }
      // //文件读取加载时
      reader.onload = e => {
        //图片的base64存在reader.result中
        // let base64Str = reader.result.split(',')[1];

        let base64Str = reader.result;
        this.Borrowform.guarantees.push(base64Str);
      };
    },
    //==================================================================================================================
    //-----------保存
    savefile(formName) {
      var guaranteesId = {}; //创建一个对象
      guaranteesId.isGuarantee = this.Borrowform.isGuarantee; //14.是否担保
      guaranteesId.guarantyType = this.Borrowform.guarantyType; //15.抵押类型
      guaranteesId.guarantor = this.Borrowform.guarantor; //16.担保公司
      delete this.Borrowform.isGuarantee;
      delete this.Borrowform.guarantyType;
      delete this.Borrowform.guarantor;
      this.Borrowform.guaranteesId = guaranteesId;
      var myform = this.Borrowform;
      console.log(myform);
      //===========================
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确定保存？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$axios({
                method: "post",
                headers: { "Content-type": "application/json;charset=utf-8" },
                url: "/eloan/bidInfo/insertInfoBySave",
                data: myform
              }).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message({
                    type: "success",
                    message: "保存成功!"
                  });
                  this.$refs.upload.clearFiles();
                  this.$refs.jkupload.clearFiles();
                  this.$refs[formName].resetFields();
                }
                //提交服务器失败
                else {
                  this.$message.error(res.data.data.defaultMessage);
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消保存"
              });
            });

          //=================验证失败
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
/*设置子页面的宽度 */
.list1 {
  width: 100%;
  height: 1600px;
}
.formcontainer {
  box-sizing: border-box;
  padding: 30px 50px;
}
.title {
  font-size: 30px;
}
.myform {
  padding: 0 50px;
}
.inputcontone {
  display: flex;
  width: 1000px;
  margin: 0 auto;
}
.leftbox {
  width: 500px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.rightbox {
  width: 500px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.w410 {
  width: 410px;
}
.timetype {
  margin-left: 40px;
}
.timetype label {
  margin-left: 10px;
}
.w390 {
  width: 390px;
}
.labr {
  margin-right: 20px;
}
.labr .el-radio-group {
  margin-left: 40px;
}
/*  担保信息*/
.dbcontainer {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;
}
.dbcontainer > div {
  width: 500px;
}
.dbleft,
.dbright {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.dbmag {
  margin-left: 50px;
}
/*  上传文件*/
.upfileimg {
  margin-left: 40px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: flex-start;
}
/* 上传文件的框的大小 */
.dbtitle {
  text-align: center;
  line-height: 148px;
}
/*上传借款资料*/
.jkcountainer {
  /* border: 1px solid red; */
  display: flex;
  justify-content: flex-start;
  width: 900px;
  margin: 20px auto 30px auto;
}
.jkcountainer > div {
  margin-right: 10px;
}
/*  提交按钮*/
.btn {
  width: 500px;
  margin: 0 auto;
  padding: 40px 0;
}
/*  借款旁边的按钮的样式*/
.jk {
  display: flex;
  justify-content: space-between;
}
.jk .el-button {
  width: 70px;
  height: 40px;
  margin-left: 10px;
  color: white;
}
/*  表格中嵌套的按钮*/
.btncount {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
a {
  color: black;
}
a:active {
  color: blue;
}
/*  模态框中表头的内容*/
/*=======================================*/
/*上传图片的样式*/
.avatar-uploader i {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader i:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

