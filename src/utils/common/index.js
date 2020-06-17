import * as Storage from './Storage'
import DateTimePicker from 'date-time-picker'
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
/*
  参数过滤
 */
const paramFormat = (data) => {
  return data.replace(/\//g, '~2F').replace(/\+/g, '~2B').replace(/=/g, '~3D')
}

export {
  Storage,
  DateTimePicker,
  dateOptions,
  timeOptions,
  dateConfig,
  paramFormat
}
