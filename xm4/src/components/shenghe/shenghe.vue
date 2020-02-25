<template>
  <form>
    <div class="tl">
      <!--开头-->
      <div class="ml3">
        <p>
        <span>
          审核
        </span>
        </p>
      </div>
      <!--单选框-->
      <div class="ib ml6 mt10">
        <div class="ib">
          是否通过 ：
        </div>
        <div class="ib">
          <label><input type="radio" name="shenghe" value="通过">通过</label>
          <label><input class="ml10" type="radio" name="shenghe" value="不通过">不通过</label>
        </div>
      </div>
      <!--内容框-->
      <div class="ml6">
        <div class="ib fz">
          <span class="cr">*</span>
          <span>备注  :</span>
        </div>
        <input class="ib input mt30" type="text">
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: "shenghe"
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .ib {
    display: inline-block;
  }

  .ml10 {
    margin-left: 10px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .mt30 {
    margin-top: 30px;
  }

  .ml3 {
    margin-left: 3%;
  }

  .ml6 {
    margin-left: 6%;
  }

  .tl {
    text-align: left;
  }

  .cr {
    color: red;
  }

  .input {
    width: 800px;
    height: 75px;
  }

  p {
    text-align: left;
  }
</style>
