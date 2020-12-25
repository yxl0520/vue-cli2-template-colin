# vue-cli 2.0 template

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 功能配置



## 关于Axios

（1）文件`src\plugins\axios\index.js`

- 通过拦截器，添加了接口加载菊花的显示效果
- 通过`Vue.prototype.$http = axios`，将axios原型添加到了Vue的原型链上，实现了axios的全局调用，不用每次都`import axios from ‘axios’`
- 说明：修改加载动画的提示文字，可以在下面文件中进行配置：

`src\plugins\index.js`

```js
/**
 * @description: 修改接口加载菊花的提示文本
 * @param {Object} {text: '加载中'}
 */
Vue.$loading.show({text: '请稍等'})
```

（2）文件`src\plugin\http\http.js`

- 重新封装了 axios，并导出一个class 请求类
- 在这个文件中，实现返回状态的判断，如错误代码拦截判断等

> 综上：我们在组件中，使用axios请求接口的方法有以下几种方法

1. 通过`this.$axios`

```js
// 方法一：this.$axios 与 axios 原生方法一样

// 将Axios挂载到vue.prototype原型链上，可以通过this.$axios使用Axios
this.$axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
  .then(res => {
    // console.log('res-data', res.data)
    this.axiosData = res.data.data.title
  })

// 同
// 方法二
import axios from 'axios'
axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312').then(res => {console.log(res)})
```

2. 通过`this.$http`【基于axios进行封装】

```js
// 方法三：使用$http，调用的是HTTP类内的封装方法，如getData()
this.$http.getData('topic/5433d5e4e737cbe96dcef312').then( res => { 
  console.log('res-data-HTTP', res)
  this.axiosData3 = res.data.author_id
})
```

