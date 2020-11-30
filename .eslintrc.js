// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    /* none===0 warn===1 error==2*/
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    /**
     * @description: 优化eslint规则--->
     */

    // 关闭全等
    eqeqeq: [0],

    // 是否允许声明未使用变量
    "no-unused-vars": [
      1,
      {
        // 允许声明未使用变量
        vars: "local", // 只检查使用本地声明的变量，但将允许全局变量未被使用
        // 参数不检查
        args: "none",
        ignoreRestSiblings: false
      }
    ],

    // 关闭语句强制分号结尾
    semi: [0],

    // 空行最多不能超过100行
    "no-multiple-empty-lines": [0, { max: 100 }],
    // 关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    // 关闭检测是否是驼峰写法
    camelcase: 0,
    // 关闭禁用不必要的转义
    "no-useless-escape": 0,
    // 关闭禁用抛出异常字面量
    "no-throw-literal": 0,
    // 关闭禁止重新声明变量
    "no-redeclare": 0,
    // 关闭对象字面量项尾不能有逗号
    // "comma-dangle": process.env.NODE_ENV === "production" ? [2, "never"] : [0],
    // 允许未使用变量的存在
    "no-unused-vars": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
