import Request from './request'
import InterceptorHandler from './interceptorHandler'

export default function (axios, url, config) {
  return new Promise((resolve, reject) => {
    var request = new Request(axios, url, config)
    var iHandler = new InterceptorHandler(axios)
    var callback = request.jsonpCallback
    var src = request.getUrl()
    var body = null
    var script
    var handler = ({type}) => {
      var status = 0

      if (type === 'load' && body !== null) {
        status = 200
      } else if (type === 'error') {
        status = 500
      } else if (type === 'abort') {
        status = 408
      }

      var ok = status >= 200 && status < 300

      if (status && window[callback]) {
        delete window[callback]
        document.body.removeChild(script)
      }

      if (ok) {
        // 响应成功
        resolve(request.respondWith(body, {status, ok}))
      } else {
        // 响应失败
        reject(request.respondWith(body, {status, ok}))
      }
    }

    request.abort = () => {
      handler({type: 'abort'})
    }

    if (request.timeout) {
      setTimeout(request.abort, request.timeout)
    }

    window[callback] = result => {
      body = JSON.stringify(result)
    }

    script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    script.async = true
    script.onload = handler
    script.onerror = handler

    try {
      document.body.appendChild(script)
      // 请求成功
      iHandler.requestSuccess(request)
    } catch (e) {
      // 请求失败
      iHandler.requestFail(request)
      console.log('request fail:')
      console.error(e)
    }
  })
}
