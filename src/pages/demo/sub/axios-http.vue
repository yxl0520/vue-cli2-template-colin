<template>
  <div class="axios-demo">
    <h1>5. axios资源请求：mockjs + http封装</h1>
    <div class="item demo1">
      <h2 class="sub-title">(1) 原生axios获取资源</h2>
      <p class="note">
        【1】原生axios需添加baseUrl；<br />
        【2】请将src\api\apiConfig.js的toggleBaseUrl设置为 2 ;<br />
        【3】并启动server\dev.server.js的Express服务器
      </p>
      <button @click="axiosOriginFetch">点击加载</button>
      <div class="data-wrapper">{{axiosData1}}</div>
    </div>
    <div class="item demo2">
      <h2 class="sub-title">(2) 基于axios封装：使用$http获取资源1</h2>
      <p class="note">
        【1】使用$http不需要额外添加baseUrl；<br />
        【2】从Express服务器获取数据；<br />
        【3】请将toggleBaseUrl设置为 2（模拟api地址为/seller）
      </p>
      <button @click="httpFetchFromExpress">点击加载</button>
      <div class="data-wrapper">{{axiosData2}}</div>
    </div>
    <div class="item demo3">
      <h2 class="sub-title">(3) 基于axios封装：使用$http获取资源2</h2>
      <p class="note">从mockjs获取数据, 请将toggleBaseUrl设置为 3（模拟api地址为/mockapi/demo/PersonEntry）</p>
      <button @click="httpFetchFromMock">点击加载</button>
      <div class="data-wrapper">{{axiosData3}}</div>
    </div>
    <div class="item demo4">
      <h2 class="sub-title">(4) mockjs--demo1：域名匹配拦截</h2>
      <p class="note">
        【1】演示Mock.js接口拦截数据--http://text.com；
        <br />【2】使用原生axios实例;
      </p>
      <button @click="httpMock01">点击加载</button>
      <div class="data-wrapper">{{mockData1}}</div>
    </div>
    <div class="item demo5">
      <h2 class="sub-title">(5) mockjs--demo2：获取接口失败情况演示</h2>
      <p class="note">
        【1】演示接口错误的情况
        <br />【2】从mockjs获取数据, 请将toggleBaseUrl设置为 3
      </p>
      <button @click="httpMock02">点击加载</button>
      <div class="data-wrapper">{{mockData2}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { config } from '@/api'

export default {
  data () {
    return {
      axiosData1: 'axios-origin-fetch',
      axiosData2: '$http from Express api（port 8900）',
      axiosData3: 'this.$http base on axios + mockjs',
      mockData1: 'Mock-Demo：域名匹配“http://text.com”',
      mockData2: '接口数据失败：error code status”'
    }
  },
  methods: {
    getRandomNum (Min, Max) {
      var Range = Max - Min
      var Rand = Math.random()
      return Min + Math.round(Rand * Range)
    },
    axiosOriginFetch () {
      // 方法1：虽然直接引用Axios，但项目中，有通过拦截器添加加载菊花，故资源请求时，是有加载提示动画的
      // axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312').then()
      axios.get(config.baseUrl + '/goods').then((res) => {
        let num = this.getRandomNum(0, 8)
        // console.log('使用axios从本地Express服务器中获取mock数据：', res.data)
        this.axiosData1 = res.data.data[num].name
      })
    },
    httpFetchFromExpress () {
      // 方法2：使用基于axios封装的http方法从Express服务器获取数据
      this.$http.getData('seller').then((res) => {
        console.log(
          '使用基于axios封装的http方法从Express服务器获取数据:',
          res.data
        )
        this.axiosData2 = res.data.infos[this.getRandomNum(0, 3)]
      })
    },
    httpFetchFromMock () {
      // 使用$http，调用的是HTTP类内的封装方法
      this.$http.getData('demo/PersonEntry').then((res) => {
        // console.log('res-data-HTTP', res)
        let num = this.getRandomNum(0, 2)
        this.axiosData3 = num + ':' + res.data.rows[num].personName
      })
    },
    httpMock01 () {
      // mockjs全域名（网址）拦截演示
      axios.get('http://text.com').then((res) => {
        console.log('res---', res.data)
        this.mockData1 = res.data.data.reviewPerson
      })
    },
    httpMock02 () {
      // mockjs 接口获取数据失败演示
      this.$http.getData('/supply/actionGetInfo/123/').then((res) => {
        console.log('res-error：', res)
        this.mockData2 = `status：${res.status}; msg:${res.msg}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.axios-demo {
  margin-bottom: 20px;
}
h2 {
  font-size: 14px;
  text-align: left;
  margin: 12px 16px;
  color: green;
}
.data-wrapper {
  width: 90%;
  min-height: 40px;
  margin: 8px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: left;
  font-size: 14px;
  padding: 8px 4px;
}
.note {
  text-align: left;
  margin: 8px 20px;
  padding-left: 8px;
  color: #b84940;
  line-height: 16px;
  border-left: 3px solid #b84940;
}
</style>
