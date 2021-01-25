/*
 * @Description: 日历选择 https://www.npmjs.com/package/date-time-picker
 * @Author: Colin
 * @Date: 2021-01-25 22:36:35
 */

import DateTimePicker from 'date-time-picker';
/*
  时间选择配置
 */
const dateOptions = (del) => {
  if (del) {
    const { defs, min } = del
    return {
      lang: 'zh-CN',
      format: 'yyyy-MM-dd',
      default: defs,
      min
    }
  } else {
    return {
      lang: 'zh-CN',
      format: 'yyyy-MM-dd'
    }
  }
}
const timeOptions = {
  lang: 'EN',
  format: 'HH:mm',
  minuteStep: 5,
  min: '00:00',
  max: '23:59'
}
const dateConfig = {
  day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  shortDay: ['日', '一', '二', '三', '四', '五', '六'],
  MDW: 'M月d日D',
  YM: 'yyyy年M月',
  OK: '确定',
  CANCEL: '取消'
}

export {
  DateTimePicker,
  dateOptions,
  timeOptions,
  dateConfig
};
