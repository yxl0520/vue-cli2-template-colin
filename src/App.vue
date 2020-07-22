<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 导入基本样式（暂不启用）
// import '@/assets/css/base.css'
// import '@/assets/css/app.css'
import '@/assets/css/index.css'
// 导入自定义字体
import '@/assets/fonts/custom-fonts.css'

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* icon-font的通用css代码（引入一次就行） */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
