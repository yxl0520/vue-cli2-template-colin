import LoadingComponent from './LoadingUI'

let $vm
let watcher
let lastloading

const plugin = {
  install (Vue, config) {
    // console.log('loading-config', config)
    const Loading = Vue.extend(LoadingComponent)

    if (!$vm) {
      $vm = new Loading({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const loading = {
      ajaxFeedbackType: {
        REQ_SUCC: 'REQ_SUCC',
        REQ_FAIL: 'REQ_FAIL',
        RES_SUCC: 'RES_SUCC',
        RES_FAIL: 'RES_FAIL',
        NONE: 'NONE'
      },
      getShow (options) {
        config = config || {}
        options = options || {}
        return typeof options.isShow === 'boolean' ? options.isShow : (typeof config.isShow === 'boolean' ? config.isShow : true)
      },
      hideDelay (options, hideDelay) {
        config = config || {}
        options = options || {}
        return typeof hideDelay === 'number' ? hideDelay : (typeof options.hideDelay === 'number' ? options.hideDelay : (typeof config.hideDelay === 'number' ? config.hideDelay : 0))
      },
      show (options) {
        // destroy watcher
        var self = this
        $vm.lastAjax = {
          feedbackType: self.ajaxFeedbackType.NONE,
          data: {}
        }
        var isShow = self.getShow(options)
        if (!isShow) {
          return
        }

        watcher && watcher()
        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          for (let i in options) {
            $vm[i] = options[i]
          }
        }

        if (typeof options === 'object' && options && (options.onShow || options.onHide)) {
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        lastloading = {
          lastShowTime: new Date().getTime(),
          hideDelay: self.hideDelay(options)
        }
        $vm.show = true
      },
      hide (options, data, ajaxFeedbackType) {
        var self = this
        lastloading = lastloading || {}
        var lastShowTime = lastloading.lastShowTime || 0
        if (lastShowTime > 0) {
          var hideDelay = self.hideDelay(options, lastloading.hideDelay)
          if (hideDelay > 0) {
            var curTime = new Date().getTime()
            var passTime = curTime - lastShowTime
            if (passTime > hideDelay) {
              self.hideNow(true, data, ajaxFeedbackType)
            } else {
              setTimeout(function () {
                self.hideNow(true, data, ajaxFeedbackType)
              }, hideDelay - passTime)
            }
          } else {
            self.hideNow(true, data, ajaxFeedbackType)
          }
        }
      },
      hideNow (isAjaxFeedback, data, ajaxFeedbackType) {
        lastloading = {}
        $vm.show = false
        if (isAjaxFeedback) {
          $vm.lastAjax = {
            feedbackType: ajaxFeedbackType,
            data: data
          }
        }
      }
    }
    Vue.prototype.$loading = loading
    Vue.$loading = loading
  }
}

export default plugin
export const install = plugin.install
