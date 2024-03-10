/**
 * 字符串与字节数组之间的转换工具类
 */

export default class Code {
  /**
   * 字符串转字节数组<br>
   * string to an array of bytes
   */
  static str2bytes(str) {
    let out = [],
      p = 0
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i)
      if (c < 128) {
        out[p++] = c
      } else if (c < 2048) {
        out[p++] = (c >> 6) | 192
        out[p++] = (c & 63) | 128
      } else if ((c & 0xfc00) == 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) == 0xdc00) {
        c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff)
        out[p++] = (c >> 18) | 240
        out[p++] = ((c >> 12) & 63) | 128
        out[p++] = ((c >> 6) & 63) | 128
        out[p++] = (c & 63) | 128
      } else {
        out[p++] = (c >> 12) | 224
        out[p++] = ((c >> 6) & 63) | 128
        out[p++] = (c & 63) | 128
      }
    }
    return out
  }

  /**
   * 输出多字节转Hex字符串<br>
   * bytes2hexStr([65,63]); ==> 输出Hex字符串<br>
   * bytes2hexStr([65,63],true);==> 输出美化的Hex字符串
   */
  static bytes2hexStr(bs, format) {
    let s = []
    for (let i = 0, j = bs.length; i < j;) {
      let tt = parseInt(bs[i]).toString(16)
      tt = (tt.length < 2 ? "0" : "") + tt
      s.push(tt)
      i++
      if (format && i > 1) {
        if (i % 4 == 0) {
          s.push(" ")
        }
        if (i % 32 == 0) {
          s.push("\n")
        }
      }
    }
    return s.join("").toUpperCase()
  }

  /**
   * HEX字符串转字节数组
   *
   * @param s
   * @returns bytes {Array}
   */
  static hexStr2bytes(s) {
    let length = s.length / 2
    let r = []

    try {
      for (let i = 0; i < length; i++) {
        r[i] = Code.hex2int(s.substr(i * 2, 2))
      }
    } catch (e) {
      console.error(e)
    }
    return r
  }

  /**
   * 字节数组转字符串，只能转ASCII字符
   */
  static bytes2str(array) {
    let r = ""
    for (let i = 0; i < array.length; i++) {
      r += String.fromCharCode(parseInt(array[i]))
    }
    return r
  }

  /**
   * 32位整数转成4个字节数组
   */
  static int2bytes(i) {
    let byteArray = []
    byteArray[0] = i >>> 24
    byteArray[1] = (i & 0xffffff) >>> 16
    byteArray[2] = (i & 0xffff) >>> 8
    byteArray[3] = i & 0xff
    return byteArray
  }

  /*
   * 数组合并
   */
  static concatArrays(bin, bin2, bin3) {
    let r = [].concat(bin, bin2)
    if (bin3) return r.concat(bin3)
    return r
  }

  /**
   * 截取数组内容
   */
  static copyArrayRange(arr, begin, end) {
    let rst = []
    for (let i = begin; i < end; i++) {
      rst.push(arr[i])
    }
    return rst
  }

  /**
   * 左填充补位
   */
  static ldap(src, len, def) {
    def = def ? def : "0"
    src = src ? src : ""
    let tmp = ""
    for (let i = 0; i < len - src.length; i++) {
      tmp += def
    }
    return tmp + src
  }

  static hex2int(i) {
    return parseInt(i, 16)
  }
}
