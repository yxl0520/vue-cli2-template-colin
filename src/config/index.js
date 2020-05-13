// 如果有需要，可以根据开发环境，如测试环境、正式环境等，进行配置
// const customConfig = process.env.NODE_ENV === 'production' ? 'aaa' : 'bbb'

const customConfig = {
  baseUrl: 'https://cnodejs.org/api/v1', // 测试环境
  tokenKey: 'accessToken',
  code: 'cndvp-api'
}

export default customConfig
