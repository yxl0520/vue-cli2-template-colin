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
    <h2>3. axios demo</h2>
    <div class="axios-get">
      {{axiosData}}
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
  },
  mounted () {
    this.axiosFetch()
  },
  data () {
    return {
      axiosData: 'axios-init'
    }
  },
  methods: {
    axiosFetch () {
      // 将Axios挂载到vue.prototype原型链上，可以通过this.$http使用Axios
      this.$http.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
        .then(res => {
          console.log('res-data', res.data)
          this.axiosData = res.data.data.title
        })
    }
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
