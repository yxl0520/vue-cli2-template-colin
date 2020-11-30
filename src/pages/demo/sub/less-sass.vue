<template>
  <div class="less-sass">
    <h1>1. 样式预编译：less-sass demo</h1>
    <div class="box less-demo">此背景是less全局变量控制</div>
    <div class="box sass-demo">此背景是sass全局变量控制</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.less-sass div {
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 0 auto;
  width: 80%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
h1 {
  text-align: left;
  font-size: 18px;
  margin: 8px 8px;
  font-weight: bold;
}
</style>

<style lang="less" scoped>

.less-demo {
  padding: 5px 0;
  color: #33523a;
  margin-bottom: 8px;
  background-color: @bg; // 来自less全局变量设置文件（@src/asset/style/common.less）
}

</style>
<style lang="scss" scoped>
// @import '@/assets/sass/mixin.scss';
$scss-bg: $bg; // 1.定义局部变量，$scss-bg；2.全局变量$bg，则是来自sass全局变量设置文件（@src/asset/style/global.scss）
.sass-demo {
  color: #bad2d9;
  padding: 5px 0;
  background-color: $scss-bg; // 使用局部变量
}
</style>
