<template>
  <div class="demo-wrapper">
    <h2 class="title">1.less add demo</h2>
    <h2>2.Vuex Use Demo</h2>
    <div class="vuex-demo">
      这是来自根仓库的state内容：<span class="user">{{user}}</span>
      <hr>
      这是通过mapstate辅助函数获得子模块的内容：<span class="user">{{modulesUser}}</span>
      <hr>
      这里，不通过mapstate辅助函数获取参数内容，如：<span class="user">{{$store.state.vuexModuleDemo.modulesUser2}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'demo',
  computed: {
    ...mapState(['user']), // 导入 vuex “根仓库”
    ...mapState('vuexModuleDemo', [ // 导入 vuex “模块仓库”
      'modulesUser'
    ])
  }
}
</script>

<style lang="less" scoped>
.demo-wrapper {
  .title {
    color: red;
  }
  .vuex-demo {
    .user {
      color: blue
    }
  }
}
</style>
