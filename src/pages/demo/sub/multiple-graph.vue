<template>
  <div>
    <h1>3. 根据<span style="color: green">设备像素比</span>自动切换多倍图</h1>
    <h2 style="font-size: 14px; margin-bottom: 8px">window.devicePixelRatio</h2>
    <div class="img-demo"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
/* 多倍图demo */
.img-demo {
  width: 200px;
  height: 150px;
  margin: 0 auto;
  // @include bg-image('../assets/imgs/Cartoon', '.jpg');
  @include bg-image('~@/assets/images/pic', '.jpg');
  background-size: 100% 100%;
}
</style>
