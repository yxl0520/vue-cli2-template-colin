<template>
  <div class="demo-wrapper">
    <div @click="$router.go(-1)" class="goback">返回首页</div>
    <less-sass></less-sass>
    <icon-font-demo></icon-font-demo>
    <vuex-demo></vuex-demo>
    <!-- <h2>3. axios demo</h2>
    <div class="axios-get">{{axiosData}}</div>
    <div class="click-add">
      <button @click="axiosFetchOrigin">点击加载</button>
      <span>{{axiosData2}}</span>
    </div>
    <div class="click-add">
      <button @click="axiosFetchCustom">点击加载</button>
      <span>{{axiosData3}}</span>
    </div>
    <h2>5. Mock Demo</h2>
    <div class="icon-font">
      备注：演示Mock.js接口拦截数据--Colin
      <button @click="clickMock">点击加载</button>
      <span class="mock-data">数据来自Mock：{{mockData}}</span>
    </div>-->
    <div class="img-demo"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { config, http } from '@/api'

import LessSass from './sub/less-sass'
import IconFontDemo from './sub/icon-font-demo.vue'
import VuexDemo from './sub/vuex-demo.vue'



export default {
  name: 'demo',
  components: {
    LessSass,
    IconFontDemo,
    VuexDemo
  },

  mounted () {
    // this.axiosFetch()
    console.log('baseUrl', config)
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
      this.$axios
        .get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
        .then((res) => {
          // console.log('res-data', res.data)
          this.axiosData = res.data.data.title
        })
    },
    axiosFetchOrigin () {
      // 方法二：虽然直接引用Axios，但项目中，有通过拦截器添加加载菊花，故资源请求时，也是有加载提示动画的
      axios
        // .get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
        .get(config.baseUrl + 'goods')
        .then((res) => {
          console.log('res-data-Origin', res.data)
          this.axiosData2 = res.data.data.visit_count
        })
    },
    axiosFetchCustom () {
      // 方法三：使用$http，调用的是HTTP类内的封装方法
      // console.log('api-init', http)
      this.$http.getData('topic/5433d5e4e737cbe96dcef312').then((res) => {
        console.log('res-data-HTTP', res)
        this.axiosData3 = res.data.author_id
      })
    },
    clickMock () {
      // Mock模拟数据功能演示，如需启用mock.js，请取消main.js入口处的注释
      // this.$axios.get('http://text.com').then((res) => {
      //   console.log('res-data-Mock', res)
      //   this.mockData = res.data.data.reviewGrp.creator
      // })
      // this.$axios.get('http://text.com/mockapi/vp/PersonEntry').then((res) => {
      //   console.log('res-data-Mock', res)
      //   // this.mockData = res.data.data.reviewGrp.creator
      // })

      this.$http.getData('vp/PersonEntry').then((res) => {
        console.log('res-data-HTTP', res)
        this.axiosData3 = res.data.author_id
      })
      // this.$http.getData('supply/reviewDistribute/actionGetInfo/123').then((res) => {
      //   console.log('res-data-HTTP', res)
      //   // this.axiosData3 = res.data.author_id
      // })
    }
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
.demo-wrapper {

  .click-add {
    margin-top: 15px;
    font-weight: 700;
  }

}
</style>
<style lang="scss" scoped>

/* 多倍图demo */
.img-demo {
  width: 200px;
  height: 150px;
  // @include bg-image('../assets/imgs/Cartoon', '.jpg');
  @include bg-image('~@/assets/imgs/pic', '.jpg');
  background-size: 100% 100%;
}
</style>
