import {
  SystemConfig
} from '../config'

// 截取字符串，多余的部分用...代替
export let setString = (str, len) => {
  let StrLen = 0
  let s = ''
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      StrLen += 2
    } else {
      StrLen++
    }
    s += str.charAt(i)
    if (StrLen >= len) {
      return s + '...'
    }
  }
  return s
}

// 格式化设置
export let OptionFormat = (GetOptions) => {
  let options = '{'
  for (let n = 0; n < GetOptions.length; n++) {
    options = options + '\'' + GetOptions[n].option_name + '\':\'' + GetOptions[n].option_value + '\''
    if (n < GetOptions.length - 1) {
      options = options + ','
    }
  }
  return JSON.parse(options + '}')
}

// 替换SQL字符串中的前缀
export let SqlFormat = (str) => {
  if (SystemConfig.mysql_prefix !== 'api_') {
    str = str.replace(/api_/g, SystemConfig.mysql_prefix)
  }
  return str
}

// 数组去重
export let HovercUnique = (arr) => {
  let n = {}
  let r = []
  for (var i = 0; i < arr.length; i++) {
    if (!n[arr[i]]) {
      n[arr[i]] = true
      r.push(arr[i])
    }
  }
  return r
}

// 获取json长度
export let getJsonLength = (jsonData) => {
  var arr = []
  for (var item in jsonData) {
    arr.push(jsonData[item])
  }
  return arr.length
}

/**
 * 时间格式化
 * @param  {[type]} time   [description]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
export const formatTimeString = (time, formatParam) => {
  var format = formatParam || 'yyyy-MM-dd'
  var t = new Date(time)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

/**
 * 判断是不是json格式的数组
 * @param  {[type]} string   [description]
 */
export const isJSON_Arr = (str) => {
  if (typeof str == 'string') {
      try {
          var obj=JSON.parse(str);
          return Array.isArray(obj);
      } catch(e) {
          return false;
      }
  }else{
    return false
  }
}
