import { typeOf } from './assist'

$timeRange = Symbol('$timeRange')
$checkTimeType = Symbol('$checkTimeType')
export default class Time {
  [$timeRange] = ['string', 'number', 'date'];
  /**
   * 传入时间值，获得以year、month、date、hours、minutes、seconds为键的对象
   * @param {String|Number|Date} timeVal
   */
  getTimeObject (timeVal) {
    const timeType = this[$checkTimeType]
    let timeObject = {
      year: '',
      month: '',
      date: '',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
    if (timeType === 'string') {
      timeObject.year = timeVal.substring(0, 4)
      timeObject.month = timeVal.substring(4, 6)
      timeObject.date = timeVal.substring(6, 8)
      if (timeVal.length === 14) {
        timeObject.hours = timeVal.substring(8, 10)
        timeObject.minutes = timeVal.substring(10, 12)
        timeObject.seconds = timeVal.substring(12, 14)
      }
    } else {
      const timeDate = timeType === 'number' ? new Date(timeVal) : timeVal
      timeObject.year = timeDate.getFullYear()
      timeObject.month = timeDate.getMonth() + 1
      timeObject.date = timeDate.getDate()
      timeObject.hours = timeDate.getHours()
      timeObject.minutes = timeDate.getMinutes()
      timeObject.seconds = timeDate.getSeconds()
    }
    Object.keys(timeObject).forEach((key) => {
      timeObject[key] = timeObject[key].toString().padStart(2, '0')
    })
    return timeObject
  }
  /**
   * 传入时间值，返回指定格式的时间显示
   * @param {String|Number|Date} timeVal
   * @param {String} format
   */
  format (timeVal, format = 'Y-m-d H:i:s') {
    const timeObject = this.getTimeObject(timeVal)
    return format
      .replace('Y', timeObject.year)
      .replace('m', timeObject.month)
      .replace('d', timeObject.date)
      .replace('H', timeObject.hours)
      .replace('i', timeObject.minutes)
      .replace('s', timeObject.seconds)
  }
  fromNow (timeVal, format = 'Y-m-d') {
    const timeObject = this.getTimeObject(timeVal)
    const nowObject = this.getTimeObject(new Date())
    if (timeObject.year === nowObject.year) {
      
    } else {
      return this.format(timeVal, format)
    }
  }
  [$checkTimeType] (timeVal) {
    const timeType = typeOf(timeVal)
    if (this[$timeRange].includes(timeType)) return timeType
    throw new TypeError('传入的时间类型必须为String、Number或Date')
  }
}