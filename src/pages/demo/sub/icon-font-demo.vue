<template>
  <div class="icon-font-demo">
    <!-- 备注：演示用的icon-font库，引用自“员工自助”项目--Colin -->
    <h1>2. icon-font demo</h1>

    <h2>(1) 使用font-class + i方式引用</h2>
    <div class="icon-1">
      <i class="iconfont icon_back"></i>
      <i class="iconfont iconarrowDown"></i>
    </div>

    <h2>(2) 使用symbol + svg方式引用</h2>
    <div class="icon-2">
      <icon-font type="icon_drop_down" iconStyle="color: #385e73; font-size: 30px" />
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/common/IconFont'
export default {
  components: {
    IconFont
  }
}
</script>

<style lang="less" scoped>
.icon-font-demo {
 h2 {
   font-size: 14px;
   margin: 12px 16px;
   text-align: left;
   color:#33523a;
 }
}
.icon-1,
.icon-2 {
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 0 auto;
  width: 80%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
</style>
