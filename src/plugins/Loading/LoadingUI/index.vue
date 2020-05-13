<template>
  <div class="weui-loading_toast" v-show="show">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast" :style="{ position: position }">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">{{ text }}<slot></slot></p>
    </div>
  </div>
</template>

<i18n>
loading:
  en: loading
  zh-CN: 加载中
</i18n>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      // default: 'loading'
      default: '加载中'
    },
    position: String,
    hideDelay: {
      type: Number,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.show = this.value
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
@import './assets/styles/mask';
@import './assets/styles/toast';
@import './assets/styles/loading';
</style>
