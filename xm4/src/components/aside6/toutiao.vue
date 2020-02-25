<template>
  <!--头条-->
  <div class="title">
    <!--头条文字-->
    <div class="titlewz">
      <span>
        {{spantext}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "toutiao",
    props: {
      spantext: {}
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .title {
    background-color: #ededed;
    height: 40px;
    width: 100%;
    line-height: 35px;
    overflow: hidden;
  }

  .titlewz {
    text-align: center;
    background: white;
    width: 115px;
    height: 35px;
    margin-top: 7px;
    margin-left: 30px;
    border-radius: 5px;
    font-size: 16px;
    color: #333333;
  }

  .titlewz:hover {
    background-color: #3e88b9;
    cursor: pointer;
  }
</style>
