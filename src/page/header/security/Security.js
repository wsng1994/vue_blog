import Code from "./utils/Code"
import {sm2Encode} from "./utils/SM2"
import sm3Hash from "./utils/SM3"
import {decrypt as sm4Decrypt, encrypt as sm4Encrypt} from "./utils/SM4"

/**
 * SM3摘要算法盐值 ares-security-cert.properties 中配置
 */

const sm3Salt = "YTBASE"
export default class Security {
  /**
   * 三段式加密(国密)
   * SM3+SM4+SM2
   * @param data
   * @param key
   */
  static encrypt(data, key) {
    if (typeof data !== "string") {
      data = JSON.stringify(data)
    }
    let m1 = M1(Code.str2bytes(data))
    let m2 = M2()
    let m = M3(m1, m2)
    let r4 = sm4Encrypt(Code.bytes2hexStr(m), Code.str2bytes(key))
    let sm4 = Code.bytes2hexStr(r4)

    // console.log("sm4\n" + sm4)

    let sm2 = sm2Encode(key)
    //console.log('sm2\n' + sm2Encode);

    let r3 = sm3Hash(Code.str2bytes(data + key + sm3Salt))
    let sm3 = Code.bytes2hexStr(r3)
    //console.log('sm3\n' + sm3Encode);

    // console.log(sm3, sm4, sm2)
    // SM3+SM4+SM2
    let result = "#10" + [sm3, sm4, sm2].join(String.fromCharCode(29))
    console.log("sm3", sm3)
    console.log("sm4", sm4)
    console.log("sm2", sm2)
    //console.log(result);
    return result
  }

  /**
   * SM4解密
   * @param data
   * @param key
   * @returns
   */
  static decrypt(data, key) {
    let encryptData = data.substr(14)
    let confuseStartPos = parseInt(data.substring(3, 5), 16)
    let confuseLen = parseInt(data.substring(5, 7), 16)
    let confuseRule = parseInt(data.substring(7, 8), 16)
    let originalLen = parseInt(data.substring(8, 14), 16)
    let confuseStr = encryptData.substring(confuseStartPos, confuseStartPos + confuseLen)
    let confuseStrLen = confuseStr.length
    let confuseData = []
    confuseData.push(encryptData.substring(0, confuseStartPos))
    switch (confuseRule) {
      case 1:
        confuseData.push(confuseStr.charAt(confuseStrLen - 1))
        confuseData.push(confuseStr.substring(1, confuseStrLen - 1))
        confuseData.push(confuseStr.charAt(0))
        break
      case 2:
        for (let j = 2; j <= confuseStrLen; ++j) {
          if (j % 2 == 0) {
            confuseData.push(confuseStr.charAt(j - 1))
            confuseData.push(confuseStr.charAt(j - 2))
          }
        }
        if (confuseStrLen % 2 != 0 && confuseStrLen > 0) {
          confuseData.push(confuseStr.charAt(confuseStrLen - 1))
          break
        }
        break
    }
    if (confuseRule != 0) {
      confuseData.push(encryptData.substring(confuseStartPos + confuseLen))
      encryptData = confuseData.join("")
    }
    encryptData = encryptData.substring(0, originalLen)
    //console.log('encryptData\n' + encryptData);
    let result = sm4Decrypt(Code.hexStr2bytes(encryptData), Code.str2bytes(key), 0)
    // return result
    return byteToString(result)
  }

  static getEncryptKey() {
    return uuid(16)
  }
}

function uuid(len, radix) {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
  let uuid = [],
    i
  radix = radix || chars.length
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-"
    uuid[14] = "4"
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join("")
}

function M1(datas) {
  let length = datas.length
  let size = length % 16
  size = 16 - size
  let tmp = []
  tmp[0] = 29
  for (let i = 1; i < size; i++) {
    tmp[i] = (Math.round(Math.random() * 150) % 150) + 30
  }
  let out = []
  out = [].concat(datas)
  for (let i = 0; i < tmp.length; i++) {
    if (i < size) {
      out.push(tmp[i])
    }
  }
  return out
}

function M3(m1, m2) {
  let lenM1 = m1.length
  let lenM2 = m2.length
  let out = []
  let m3 = xor(m1, m2)
  for (let i = 0; i < m3.length; i++) {
    if (i < lenM1) {
      out.push(m3[i])
    }
  }
  for (let i = 0; i < m2.length; i++) {
    if (i < lenM2) {
      out.push(m2[i])
    }
  }
  return out
}

function xor(m1, m2) {
  let lenM1 = m1.length
  let m3 = []
  let s1 = lenM1 / 16
  for (let a = 0; a < s1; a++) {
    let index = a * 16
    for (let i = 0; i < 16; i++) {
      m3[index + i] = m1[index + i] ^ m2[i]
    }
  }
  return m3
}

function M2() {
  let tmp = []
  for (let i = 0; i < 16; i++) {
    tmp[i] = Math.round(Math.random() * 255) % 255
  }
  return tmp
}

function byteToString(arr) {
  var str = []
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] >= 0xf0 && arr[i] <= 0xf7) {
      // 四字节
      str.push(
        String.fromCodePoint(
          ((arr[i] & 0x07) << 18) + ((arr[i + 1] & 0x3f) << 12) + ((arr[i + 2] & 0x3f) << 6) + (arr[i + 3] & 0x3f)
        )
      )
      i += 3
    } else if (arr[i] >= 0xe0 && arr[i] <= 0xef) {
      // 三字节
      str.push(String.fromCodePoint(((arr[i] & 0x0f) << 12) + ((arr[i + 1] & 0x3f) << 6) + (arr[i + 2] & 0x3f)))
      i += 2
    } else if (arr[i] >= 0xc0 && arr[i] <= 0xdf) {
      // 双字节
      str.push(String.fromCodePoint(((arr[i] & 0x1f) << 6) + (arr[i + 1] & 0x3f)))
      i++
    } else {
      // 单字节
      str.push(String.fromCodePoint(arr[i]))
    }
  }

  return str.join("")
}
