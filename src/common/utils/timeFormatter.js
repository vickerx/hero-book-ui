export const formatDate = (date, fmt) => {
  if (date == null || !(date instanceof Date)) {
    return null;
  }
  let result = fmt;

  const mapper = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    result = result.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  Object.keys(mapper).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      result = result.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (mapper[k])
        : ((`00${mapper[k]}`).substr((`${mapper[k]}`).length)));
    }
  });

  return result;
};

export const formatUpdatedTime = (timeStamp) => {
  const today = new Date();
  const date = new Date(timeStamp);
  const todayMS = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const dateMS = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  switch (dateMS) {
    case todayMS:
      return '今天';
    case todayMS - 24 * 3600 * 1000:
      return '昨天';
    default:
      return formatDate(date, 'yyyy年MM月dd日');
  }
};
