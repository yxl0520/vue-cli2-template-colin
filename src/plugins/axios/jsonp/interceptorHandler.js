export default class InterceptorHandler {
  constructor (axios) {
    var self = this
    this.axios = axios
    this.reqSuccHandlers = []
    this.reqFailHandlers = []
    this.resSuccHandlers = []
    this.resFailHandlers = []

    this.axios.interceptors.request.handlers.forEach(function (interceptor) {
      self.reqSuccHandlers.push(interceptor.fulfilled)
      self.reqFailHandlers.push(interceptor.rejected)
    })

    this.axios.interceptors.response.handlers.forEach(function (interceptor) {
      self.resSuccHandlers.push(interceptor.fulfilled)
      self.resFailHandlers.push(interceptor.rejected)
    })
  }

  requestSuccess (request) {
    this.reqSuccHandlers.forEach(function (handler) {
      handler(request)
    })
  }

  requestFail (request) {
    this.reqFailHandlers.forEach(function (handler) {
      handler(request)
    })
  }

  responseSuccess (response) {
    this.resSuccHandlers.forEach(function (handler) {
      handler(response)
    })
  }

  responseFail (response) {
    this.resFailHandlers.forEach(function (handler) {
      handler(response)
    })
  }
}
