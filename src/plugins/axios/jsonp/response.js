/**
 * HTTP Response.
 */
import { when, isBlob, isString, isPlainObject } from './util'
import InterceptorHandler from './interceptorHandler'

export default class Response {
  constructor (axios, body, {url, status, ok}) {
    this.axios = axios
    this.url = url
    this.ok = ok || false
    this.status = status || 0
    this.body = body

    if (isString(body)) {
      this.bodyText = body
      this.body = JSON.parse(body)
    } else if (isBlob(body)) {
      this.bodyBlob = body
      if (isBlobText(body)) {
        this.bodyText = blobText(body)
      }
    } else if (isPlainObject(body)) {
      this.bodyText = JSON.stringify(body)
    }

    var iHandler = new InterceptorHandler(axios)

    if (this.ok) {
      // 响应成功
      iHandler.responseSuccess(this)
    } else {
      // 响应失败
      iHandler.responseFail(this)
    }
  }

  blob () {
    return when(this.bodyBlob)
  }

  text () {
    return when(this.bodyText)
  }

  json () {
    return when(this.text(), text => JSON.parse(text))
  }
}

function blobText (body) {
  return new Promise((resolve) => {
    /* eslint-disable no-undef */
    var reader = new FileReader()
    reader.readAsText(body)
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}

function isBlobText (body) {
  return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1
}
