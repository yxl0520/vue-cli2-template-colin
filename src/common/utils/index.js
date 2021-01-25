import * as Storage from './Storage'

/*
  参数过滤
 */
const paramFormat = (data) => {
  return data.replace(/\//g, '~2F').replace(/\+/g, '~2B').replace(/=/g, '~3D')
}

export {
  Storage,
  paramFormat
}
