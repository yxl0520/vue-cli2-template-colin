<template>
  <div class="vuex-module-demo">
    <h1>3.Vuex Use Demo</h1>
    <div>
      <h2>(1) 来自根仓库的state内容：</h2>
      <span class="user">{{user}}</span>
      <h2>(2) 通过mapstate辅助函数获得子模块的内容：</h2>
      <span class="user">{{modulesUser}}</span>
      <h2>(3) 不通过mapstate辅助函数获取参数内容，如：</h2>
      <span class="user">{{$store.state.vuexModuleDemo.modulesUser2}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']), // 导入 vuex “根仓库”
    ...mapState('vuexModuleDemo', [
      // 导入 vuex “模块仓库”
      'modulesUser'
    ])
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 14px;
  margin: 12px 16px;
  text-align: left;
  color:#33523a;
}
.user {
  color: #b84940;
  font-size: 16PX;
}
</style>
