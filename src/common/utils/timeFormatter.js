export const getDate = (timeStamp) => {
  const date = new Date();
  date.setTime(timeStamp);
  return date;
};

export const formatDate = (timeStamp, fmt) => {
  let result = fmt;

  const date = getDate(timeStamp);

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
  const date = getDate(timeStamp).getDate();
  const today = getDate(Date.now()).getDate();
  switch (date) {
    case today:
      return '今天';
    case today - 1:
      return '昨天';
    default:
      return formatDate(timeStamp, 'yyyy年MM月dd日');
  }
};
