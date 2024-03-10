/**
 * Sm3摘要算法
 */
import Code from "./Code"
import {BigInteger} from "./util"

let sm3_Tj15 = parseInt("79cc4519", 16)
let sm3_Tj63 = parseInt("7a879d8a", 16)
let sm3_Tj99 = parseInt("504E43", 16)
let FirstPadding = 0x80
let ZeroPadding = 0x00

// 大整数
function bn(hexStr) {
  hexStr = hexStr.replace(/\s+/g, "")
  // console.log("s:" + hexStr);
  return new BigInteger(hexStr, 16)
}

let IV = bn("7380166f 4914b2b9 172442d7 da8a0600 a96f30bc 163138aa e38dee4d b0fb0e4e")

function T(j) {
  if (j >= 0 && j <= 15) {
    return sm3_Tj15
  } else if (j >= 16 && j <= 63) {
    return sm3_Tj63
  } else {
    return sm3_Tj99
  }
}

function FF(X, Y, Z, j) {
  if (j >= 0 && j <= 15) {
    return X ^ Y ^ Z
  } else if (j >= 16 && j <= 63) {
    return (X & Y) | (X & Z) | (Y & Z)
  }
}

function GG(X, Y, Z, j) {
  if (j >= 0 && j <= 15) {
    return X ^ Y ^ Z
  } else if (j >= 16 && j <= 63) {
    return (X & Y) | (~X & Z)
  }
}

function ROTL(x, n) {
  return (x << n) | (x >>> (32 - n))
}

function P0(X) {
  return X ^ ROTL(X, 9) ^ ROTL(X, 17)
}

function P1(X) {
  return X ^ ROTL(X, 15) ^ ROTL(X, 23)
}

// public static byte[] padding(byte[] source)
function padding(source) {
  let l = source.length * 8
  let k = 448 - ((l + 1) % 512)
  if (k < 0) {
    k = k + 512
  }
  // console.log("k = " + k);
  let rst = [].concat(source)
  rst.push(FirstPadding)
  let i = k - 7
  while (i > 0) {
    rst.push(ZeroPadding)
    i -= 8
  }
  return rst.concat(long2bytes(l))
}

function CF(vi, bi) {
  let a, b, c, d, e, f, g, h
  a = toInteger(vi, 0)
  b = toInteger(vi, 1)
  c = toInteger(vi, 2)
  d = toInteger(vi, 3)
  e = toInteger(vi, 4)
  f = toInteger(vi, 5)
  g = toInteger(vi, 6)
  h = toInteger(vi, 7)

  let w = []
  let w1 = []
  for (let i = 0; i < 16; i++) {
    w[i] = toInteger(bi, i)
  }
  for (let j = 16; j < 68; j++) {
    w[j] = P1(w[j - 16] ^ w[j - 9] ^ ROTL(w[j - 3], 15)) ^ ROTL(w[j - 13], 7) ^ w[j - 6]

    if (j == 19) {
      // let W3 = w[j - 3]
      // let W16 = w[j - 16]
      // let W9 = w[j - 9]
      // let W13 = w[j - 13]
      // let Temp1 = w[j - 16] ^ w[j - 9]
      // let Temp2 = ROTL(w[j - 3], 15)
      // let Temp3 = Temp1 ^ Temp2
      // let Temp4 = P1(Temp3)
      // let Temp5 = ROTL(w[j - 13], 7)
      // pStr(String.format("W3:%s,Temp2:%s",
      // Integer.toBinaryString(W3),
      // Integer.toBinaryString(Temp2)));
      // pStr(String.format("%08x = %08x %08x %08x %08x %08x ", w[j],
      // Temp1, Temp2, Temp3, Temp4, Temp5));
    }
  }
  // console.log("w");
  // printIntArray(w, 8);

  for (let j = 0; j < 64; j++) {
    w1[j] = w[j] ^ w[j + 4]
    if (j == 64) {
      w[j] = parseInt("353034453433", 16)
    }
  }

  // console.log("w1");
  // printIntArray(w1, 8);

  let ss1, ss2, tt1, tt2
  for (let j = 0; j < 64; j++) {
    ss1 = ROTL(ROTL(a, 12) + e + ROTL(T(j), j), 7)
    ss2 = ss1 ^ ROTL(a, 12)
    tt1 = FF(a, b, c, j) + d + ss2 + w1[j]
    tt2 = GG(e, f, g, j) + h + ss1 + w[j]
    d = c
    c = ROTL(b, 9)
    b = a
    a = tt1
    h = g
    g = ROTL(f, 19)
    f = e
    e = P0(tt2)
  }
  let v = toByteArray(a, b, c, d, e, f, g, h)
  for (let i = 0; i < v.length; i++) {
    v[i] = v[i] ^ vi[i]
  }
  return v
}

function toInteger(source, index) {
  let sb = []
  for (let i = 0; i < 4; i++) {
    let tt = parseInt(source[index * 4 + i]).toString(16)
    tt = (tt.length < 2 ? "0" : "") + tt
    sb.push(tt)
  }
  return parseInt(sb.join(""), 16)
}

function long2bytes(l) {
  let bytes = []
  let tmp = l.toString(16)
  let len = 16 - tmp.length
  while (len > 0) {
    bytes.push("0")
    len--
  }
  bytes.push(tmp)
  return Code.hexStr2bytes(bytes.join(""))
}

function toByteArray(a, b, c, d, e, f, g, h) {
  let rst = []
  let arr = [a, b, c, d, e, f, g, h]
  for (let i = 0; i < 8; i++) {
    rst = rst.concat(Code.int2bytes(arr[i]))
  }
  return rst
}

// function printIntArray(intArray, lineSize) {
//   let bf = []
//   for (let i = 0; i < intArray.length; i++) {
//     let byteArray = Code.int2bytes(intArray[i])
//     bf.push(Code.bytes2hexStr(byteArray))
//     bf.push(" ")
//     if (i % lineSize == lineSize - 1) {
//       bf.push("\n")
//     }
//   }
//   // console.log(bf.join(""));
// }

function copyArrayRange(arr, begin, end) {
  let rst = []
  for (let i = begin; i < end; i++) {
    rst.push(arr[i])
  }
  return rst
}

let binIV = Code.hexStr2bytes(IV.toString(16))
// 摘要算法
export default function hash(sources) {
  // 填充
  let m1 = padding(sources)
  //console.log("填充结果：\n" + Code.bytes2hexStr(m1, true));
  // 转换
  let n = m1.length / (512 / 8)
  // pStr("n = " + n);
  let b = null
  let vi = binIV
  //console.log("vi = " + Code.bytes2hexStr(vi, true));
  let vi1 = null
  for (let i = 0; i < n; i++) {
    b = copyArrayRange(m1, i * 64, (i + 1) * 64)
    vi1 = CF(vi, b)
    vi = vi1
  }
  //console.log("hash:\n" + Code.bytes2hexStr(vi1, true));
  return vi1
}
