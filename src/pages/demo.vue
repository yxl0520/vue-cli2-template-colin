<template>
  <div class="demo-wrapper">
    <h2 class="title">1.less add demo</h2>
    <div class="icon-font">
      <!-- 备注：演示Mock.js接口拦截数据--Colin -->
      <p class="less-demo">此背景是less全局变量控制</p>
      <p class="sass-demo">此背景是sass全局变量控制</p>
    </div>
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
    <div class="click-add">
      <button @click="axiosFetchOrigin">点击加载</button>
      <span>{{axiosData2}}</span>
    </div>
    <div class="click-add">
      <button @click="axiosFetchCustom">点击加载</button>
      <span>{{axiosData3}}</span>
    </div>
    <h2>4. iconFont component Use Demo</h2>
    <div class="icon-font">
      <!-- 备注：演示用的icon-font库，引用自“员工自助”项目--Colin -->
      这是“iconfont”：
      <icon-font type="icon_drop_down" iconStyle="color: #f0f; font-size: 30px" />
    </div>
    <h2>5. Mock Demo</h2>
    <div class="icon-font">
      <!-- 备注：演示Mock.js接口拦截数据--Colin -->
      <button @click="clickMock">点击加载</button>
      <span class="mock-data">数据来自Mock：{{mockData}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IconFont from '@/components/common/IconFont'
import axios from 'axios'
// import {http} from '@/api'
export default {
  name: 'demo',
  components: {
    IconFont
  },
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
      axiosData: 'axios-$http',
      axiosData2: 'axios-origin',
      axiosData3: 'axios-HTTP',
      mockData: 'Mock-Demo'
    }
  },
  methods: {
    axiosFetch () {
      // 方法一：将Axios挂载到vue.prototype原型链上，可以通过this.$axios使用Axios
      this.$axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
        .then(res => {
          // console.log('res-data', res.data)
          this.axiosData = res.data.data.title
        })
    },
    axiosFetchOrigin () {
      // 方法二：虽然直接引用Axios，但项目中，有通过拦截器添加加载菊花，故资源请求时，也是有加载提示动画的
      axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
        .then(res => {
          console.log('res-data-Origin', res.data)
          this.axiosData2 = res.data.data.visit_count
        })
    },
    axiosFetchCustom () {
      // 方法三：使用$http，调用的是HTTP类内的封装方法
      // console.log('api-init', http)
      this.$http.getData('topic/5433d5e4e737cbe96dcef312').then(res => {
        console.log('res-data-HTTP', res)
        this.axiosData3 = res.data.author_id
      })
    },
    clickMock () {
      // Mock模拟数据功能演示，如需启用mock.js，请取消main.js入口处的注释
      this.$axios.get('http://text.com').then(res => {
        console.log('res-data-Mock', res)
        this.mockData = res.data.data.reviewGrp.creator
      })
    }
  }
}
</script>

<style lang="less" scoped>
.demo-wrapper {
  h2 {
    font-size: 18px;
  }
  .title {
    color: red;
  }
  .vuex-demo {
    .user {
      color: blue
    }
  }
  .click-add {
    margin-top: 15px;
    font-weight: 700;
  }
  .less-demo {
    padding: 5px 0;
    color: red;
    background-color: @bg; // 来自less全局变量设置文件（@src/asset/style/common.less）
  }
}
</style>
<style lang="scss" scoped>
$scss-bg: $bg; // 1.定义局部变量，$scss-bg；2.全局变量$bg，则是来自sass全局变量设置文件（@src/asset/style/global.scss）

.demo-wrapper {
  .sass-demo{
    color: #00f;
    padding: 5px 0;
    background-color: $scss-bg; // 使用局部变量
  }
}
</style>
