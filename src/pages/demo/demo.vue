<template>
  <div class="demo-wrapper">
    <div @click="$router.go(-1)" class="goback">返回首页</div>
    <!-- CSS预处理语言-less、sass使用 -->
    <less-sass></less-sass>
    <!-- icon-font字体图标使用（离线） -->
    <icon-font-demo></icon-font-demo>
    <!-- 多倍图切换 -->
    <multiple-graph></multiple-graph>
    <!-- vuex模块化使用 -->
    <vuex-demo></vuex-demo>
    <!-- 接口api资源请求及其封装方法的使用 -->
    <axios-http></axios-http>
  </div>
</template>

<script>
import LessSass from './sub/less-sass'
import IconFontDemo from './sub/icon-font-demo.vue'
import VuexDemo from './sub/vuex-demo.vue'
import MultipleGraph from './sub/multiple-graph'
import AxiosHttp from './sub/axios-http'

export default {
  name: 'demo',
  components: {
    LessSass,
    IconFontDemo,
    MultipleGraph,
    VuexDemo,
    AxiosHttp
  }
}
</script>

<style lang="less" scoped>
.goback {
  position: absolute;
  top: 8px;
  left: 8px;
  font-weight: normal;
  font-size: 14px;
}
</style>
