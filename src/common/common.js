let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
  len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
}
export default {
  wl_changeTime(time) {
    let result = "";
    time = time.replace(/-/g, '/');
    let dateTimeStamp = new Date(time);

    let now = new Date();

    let YY = dateTimeStamp.getFullYear();
    let MM = dateTimeStamp.getMonth() + 1;
    let DD = dateTimeStamp.getDate();
    let HH = dateTimeStamp.getHours();
    let mm = dateTimeStamp.getMinutes();

    if (MM.toString().length === 1)
      MM = '0' + MM;
    if (DD.toString().length === 1)
      DD = '0' + DD;
    if (HH.toString().length === 1)
      HH = '0' + HH;
    if (mm.toString().length === 1)
      mm = '0' + mm;

    result = MM + '月' + DD + '日' + ' ' + HH + ":" + mm;

    if (now.getFullYear() !== YY) {
      result = YY + '年' + result;
    }

    return result;
  },
  formatDate(date, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
      switch ($0.charAt(0)) {
        case 'y':
          return padding(date.getFullYear(), $0.length);
        case 'M':
          return padding(date.getMonth() + 1, $0.length);
        case 'd':
          return padding(date.getDate(), $0.length);
        case 'w':
          return date.getDay() + 1;
        case 'h':
          return padding(date.getHours(), $0.length);
        case 'm':
          return padding(date.getMinutes(), $0.length);
        case 's':
          return padding(date.getSeconds(), $0.length);
      }
    });
  },
  parseDate(dateString, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    var matchs1 = pattern.match(SIGN_REGEXP);
    var matchs2 = dateString.match(/(\d)+/g);
    if (matchs1.length === matchs2.length) {
      var _date = new Date(1970, 0, 1);
      for (var i = 0; i < matchs1.length; i++) {
        var _int = parseInt(matchs2[i]);
        var sign = matchs1[i];
        switch (sign.charAt(0)) {
          case 'y':
            _date.setFullYear(_int);
            break;
          case 'M':
            _date.setMonth(_int - 1);
            break;
          case 'd':
            _date.setDate(_int);
            break;
          case 'h':
            _date.setHours(_int);
            break;
          case 'm':
            _date.setMinutes(_int);
            break;
          case 's':
            _date.setSeconds(_int);
            break;
        }
      }
      return _date;
    }
    return null;
  },
  getUserSession: function (key) {
    return sessionStorage.getItem(key);
  },
  setUserSession: function (key, value) {
    return sessionStorage.setItem(key, value);
  },
  delUserSession: function (key) {
    return sessionStorage.removeItem(key)
  },
}