<template>
  <svg class="icon" aria-hidden="true" :style="iconStyle">
    <use :xlink:href="`#${type}`"></use>
  </svg>
</template>

<script>
/* 导入iconfont.js */
import '@/assets/iconfont/iconfont'

export default {
  name: 'icon-font',
  props: {
    type: String,
    iconStyle: String || Object
  }
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
