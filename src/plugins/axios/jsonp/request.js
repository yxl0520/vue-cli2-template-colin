import Url from './url'
import { assign, toUpper } from './util'
import Response from './response'

export default class Request {
  constructor (axios, url, config) {
    assign(this, config, {
      axios: axios,
      url: url,
      jsonp: config.jsonp || 'callback',
      jsonpCallback: config.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2),
      loading: config.loading || {},
      method: toUpper(config.method || 'GET'),
      timeout: 30000,
      params: config.params || {}
    })

    this.params[this.jsonp] = this.jsonpCallback
  }

  getUrl () {
    return Url(this)
  }

  respondWith (body, options) {
    return new Response(this.axios, body, assign(options || {}, {url: this.getUrl()}))
  }
}
