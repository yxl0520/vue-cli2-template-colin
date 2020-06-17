// 如果有需要，可以根据开发环境，如dev开发环境，打包测试环境、打包正式环境等，进行配置

const customConfig =
  process.env.NODE_ENV === 'production'
    ? process.env.PACK_ENV === 'stage'
      ? {
        baseUrl: 'http://aaa.bbb.ccc:8085' // 打包:测试环境（npm run stage）
      }
      : {
        baseUrl: 'https://ccc.com:8085' // 打包:正式环境（npm run build）
      }
    : {
      baseUrl: 'http://aaa.bbb.ccc:8085' // 开发：dev环境（npm run dev）
    };

export default customConfig;

export const testAccount = {
  // 开发用的测试账号
  user: 'xxx',
  pwd: 'xxx'
};
