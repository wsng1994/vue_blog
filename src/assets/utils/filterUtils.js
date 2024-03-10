export function formatTime(date) {
  var a = date.substring(0, 4) + ' 年 ';
  var b = date.substring(4, 6) + ' 月 ';
  var c = date.substring(6, 8) + ' 日 ';
  return a + b + c;
}

export function formatDate(date) {
  var date = new Date(date);
  var y = 1900 + date.getYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);

}


