<template>
  <div class="hello full">
    <img src="@/assets/logo.png">
    <h1>{{ msg }}</h1>
    <!-- 使用全局样式，通过@import引入app.css实现 -->
    <h2  class="btn-stroke-round" @click="goToDemo" :style="{'font-weight': 600, color: 'red', margin: '10px'}">前往演示页面</h2>

    <h2>vue全家桶</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <div class="custom-fonts">正使用DIN字体：1236547992</div>
    <div class="no-fonts">不使用DIN字体：1236547992</div>

    <div class="img-demo"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    goToDemo () {
      this.$router.push({
        name: 'demo'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* 使用din字体对比 */
.custom-fonts {
  margin: 8px;
  font-size: 16px;
  font-family: 'DIN';
}
.no-fonts {
  margin: 8px;
  font-size: 16px;
}
</style>
