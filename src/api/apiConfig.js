// 如果有需要，可以根据开发环境，如dev开发环境，打包测试环境、打包正式环境等，进行配置

/**
 * @description: 切换开发环境所使用的数据来源，包括：开端提供、本地express服务器、mockjs三种数据来源
 */
function toggleBaseUrl (type = 1) {
  switch (type) {
    case 1:
      return 'http://localhost:8987/api'; // 后端提供的测试用接口
    case 2:
      return 'http://localhost:8900/api'; // 使用express，本地自备服务
    case 3:
      return 'http://text.com/mockapi'; // 定义被mockjs捕获接口的baseUrl，例如以“mockapi”为开头，为正则表达式提供匹配基准，详见'@/mock/index.js'
    case 4:
      return '/mockapi'; // 当使用'webpack-dev-server'解决跨域时，需要对应的修改baseUrl为该类型，配合'config/index.js'的'proxyTable: {}'配置
    default:
      break;
  }
}

const httpConfig =
  process.env.NODE_ENV === 'production'
    ? process.env.PACK_ENV === 'stage'
      ? {
        baseUrl: 'http://aaa.bbb.ccc:8085' // 打包:测试环境（npm run stage）
      }
      : {
        baseUrl: 'https://ccc.com:8085' // 打包:正式环境（npm run build）
      }
    : {
      baseUrl: toggleBaseUrl(4) // 开发：dev环境（npm run dev）【请输入num进行baseUrl切换】
      // method: 'GET',
      // code: '',
      // token: '',
      // tokenKey: ''
    };

export default httpConfig;

export const TestAccount = {
  // 开发用的测试账号
  user: 'xxx',
  pwd: 'xxx'
};
