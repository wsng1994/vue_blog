import Code from "./Code"
import {Barrett, BigInteger, SecureRandom} from "./util"
import sm3hash from "./SM3"

let RST_TYPE_C1C3C2 = "C1C3C2"
let RST_TYPE_C1C2C3 = "C1C2C3"
let BITS = 256
let HASH_BITS = 32
let Conf = {}
let RST_TYPE = (Conf.RST_TYPE = "C1C3C2") // "C1C3C2";"C3C2C1";"C2C1C3";
let strP = (Conf.p = "FFFFFFFE FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF 00000000 FFFFFFFF FFFFFFFF")
let strA = (Conf.a = "FFFFFFFE FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF 00000000 FFFFFFFF FFFFFFFC")
let strB = (Conf.b = "28E9FA9E 9D9F5E34 4D5A9E4B CF6509A7 F39789F5 15AB8F92 DDBCBD41 4D940E93")
let strN = (Conf.N = "FFFFFFFE FFFFFFFF FFFFFFFF FFFFFFFF 7203DF6B 21C6052B 53BBF409 39D54123")
let strGx = (Conf.Gx = "32C4AE2C 1F198119 5F990446 6A39C994 8FE30BBF F2660BE1 715A4589 334C74C7")
let strGy = (Conf.Gy = "BC3736A2 F4F6779C 59BDCEE3 6B692153 D0A9877C C62A4740 02DF32E5 2139F0A0")
//
// let strPx = (Conf.Px = "5632c3d42d19faff7c1380b8e53c40adee498efc8ba155546ec2345928b72cf2")
// let strPy = (Conf.Py = "d1fb93ed65c2c8eec931badc7302a730af06b9419a301841f5ee6b52be6f3007")
let strPx = (Conf.Px = "3ce10b0c846003541937a08f8c79d8edba407cc21c2c097ea0ed446308c0bc95")
let strPy = (Conf.Py = "c70197d0438eec089dbb9dcd4791a90dca743f1840da3264f9bb06b0cbe5d225")

// function init(source) {
//   for (let key in source) {
//     Conf[key] = source[key]
//   }
// }

function toBigInteger(obj) {
  return obj.toBigInteger()
}

let BI = BigInteger

class ECFieldElementFp {
  constructor(q, x) {
    this.x = x
    // TODO if(x.compareTo(q) >= 0) error
    this.q = q
  }

  equals(other) {
    if (other == this) return true
    return this.q.equals(other.q) && this.x.equals(other.x)
  }

  toBigInteger() {
    return this.x
  }

  negate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q))
  }

  add(b) {
    return new ECFieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q))
  }

  subtract(b) {
    return new ECFieldElementFp(this.q, this.x.subtract(b.toBigInteger()).mod(this.q))
  }

  multiply(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger()).mod(this.q))
  }

  square() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q))
  }

  divide(b) {
    return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q))
  }
}

function emptyArray() {
  return []
}

// 复杂的混淆处理
let codeInt2Bytes = Code.int2bytes
let codeStr2Bytes = Code.str2bytes
let codeBytes2HexStr = Code.bytes2hexStr
let codeHexStr2Bytes = Code.hexStr2bytes
let codeCopyArrayRange = Code.copyArrayRange

let mathFloor = Math.floor
let abcd = bn("343035333638363136453637343836313639353936393534364636453637")
// ----------------
// ECPointFp

let ZERO = BI.ZERO
let ldap = Code.ldap

class ECPointFp {
  constructor(curve, x, y, z) {
    this.curve = curve
    this.x = x
    this.y = y
    // Projective coordinates: either zinv == null or z * zinv == 1
    // z and zinv are just BigIntegers, not fieldElements
    if (z == null) {
      this.z = BI.ONE
    } else {
      this.z = z
    }
    this.zinv = null
  }

  getX() {
    if (this.zinv == null) {
      this.zinv = this.z.modInverse(this.curve.q)
    }
    let r = this.x.toBigInteger().multiply(this.zinv)
    this.curve.reduce(r)
    return this.curve.fromBigInteger(r)
  }

  getY() {
    if (this.zinv == null) {
      this.zinv = this.z.modInverse(this.curve.q)
    }
    let r = this.y.toBigInteger().multiply(this.zinv)
    this.curve.reduce(r)
    return this.curve.fromBigInteger(r)
  }

  equals(other) {
    if (other == this) return true
    if (this.isInfinity()) return other.isInfinity()
    if (other.isInfinity()) return this.isInfinity()
    let u, v
    // u = Y2 * Z1 - Y1 * Z2
    u = toBigInteger(other.y).multiply(this.z).subtract(toBigInteger(this.y).multiply(other.z)).mod(this.curve.q)
    if (!u.equals(ZERO)) return false
    // v = X2 * Z1 - X1 * Z2
    v = toBigInteger(other.x).multiply(this.z).subtract(toBigInteger(this.x).multiply(other.z)).mod(this.curve.q)
    return v.equals(ZERO)
  }

  isInfinity() {
    if (this.x == null && this.y == null) return true
    return this.z.equals(ZERO) && !this.y.toBigInteger().equals(ZERO)
  }

  negate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z)
  }

  add(b) {
    if (this.isInfinity()) return b
    if (b.isInfinity()) return this

    // u = Y2 * Z1 - Y1 * Z2
    let u = toBigInteger(b.y).multiply(this.z).subtract(toBigInteger(this.y).multiply(b.z)).mod(this.curve.q)
    // v = X2 * Z1 - X1 * Z2
    let v = toBigInteger(b.x).multiply(this.z).subtract(toBigInteger(this.x).multiply(b.z)).mod(this.curve.q)

    if (ZERO.equals(v)) {
      if (ZERO.equals(u)) {
        return this.twice() // this == b, so double
      }
      return this.curve.getInfinity() // this = -b, so infinity
    }

    let THREE = new BI("3")
    let x1 = toBigInteger(this.x)
    let y1 = toBigInteger(this.y)
    // let x2 = toBigInteger(b.x)
    // let y2 = toBigInteger(b.y)

    let v2 = v.square()
    let v3 = v2.multiply(v)
    let x1v2 = x1.multiply(v2)
    let zu2 = u.square().multiply(this.z)

    // x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
    let x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.q)
    // y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
    let y3 = x1v2
      .multiply(THREE)
      .multiply(u)
      .subtract(y1.multiply(v3))
      .subtract(zu2.multiply(u))
      .multiply(b.z)
      .add(u.multiply(v3))
      .mod(this.curve.q)
    // z3 = v^3 * z1 * z2
    let z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.q)

    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3)
  }

  twice() {
    if (this.isInfinity()) return this
    if (this.y.toBigInteger().signum() == 0) return this.curve.getInfinity()

    // TODO: optimized handling of constants
    let THREE = new BI("3")
    let x1 = this.x.toBigInteger()
    let y1 = this.y.toBigInteger()

    let y1z1 = y1.multiply(this.z)
    let y1sqz1 = y1z1.multiply(y1).mod(this.curve.q)
    let a = this.curve.a.toBigInteger()

    // w = 3 * x1^2 + a * z1^2
    let w = x1.square().multiply(THREE)
    if (!BI.ZERO.equals(a)) {
      w = w.add(this.z.square().multiply(a))
    }
    w = w.mod(this.curve.q)
    // this.curve.reduce(w);
    // x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
    let x3 = w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.q)
    // y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
    let y3 = w
      .multiply(THREE)
      .multiply(x1)
      .subtract(y1sqz1.shiftLeft(1))
      .shiftLeft(2)
      .multiply(y1sqz1)
      .subtract(w.square().multiply(w))
      .mod(this.curve.q)
    // z3 = 8 * (y1 * z1)^3
    let z3 = y1z1.square().multiply(y1z1).shiftLeft(3).mod(this.curve.q)

    return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3)
  }

  // Simple NAF (Non-Adjacent Form) multiplication algorithm
  // TODO: modularize the multiplication algorithm
  multiply(k) {
    if (this.isInfinity()) return this
    if (k.signum() == 0) return this.curve.getInfinity()

    let e = k
    let h = e.multiply(new BI("3"))
    let neg = this.negate()
    let R = this
    let i
    for (i = h.bitLength() - 2; i > 0; --i) {
      R = R.twice()

      let hBit = h.testBit(i)
      let eBit = e.testBit(i)

      if (hBit != eBit) {
        R = R.add(hBit ? this : neg)
      }
    }

    return R
  }

  // Compute this*j + x*k (simultaneous multiplication)
  multiplyTwo(j, x, k) {
    let i
    if (j.bitLength() > k.bitLength()) i = j.bitLength() - 1
    else i = k.bitLength() - 1

    let R = this.curve.getInfinity()
    let both = this.add(x)
    while (i >= 0) {
      R = R.twice()
      if (j.testBit(i)) {
        if (k.testBit(i)) {
          R = R.add(both)
        } else {
          R = R.add(this)
        }
      } else {
        if (k.testBit(i)) {
          R = R.add(x)
        }
      }
      --i
    }

    return R
  }
}

// 数组合并
function concatArrays(bin, bin2, bin3) {
  let r = [].concat(bin, bin2)
  if (bin3) return r.concat(bin3)
  return r
}

function randomKey() {
  let r = new BI(N.bitLength(), rng)
  return r.mod(N.subtract(ONE)).add(ONE)
}

// ----------------
// ECCurveFp
// 大整数
function bn(hexStr) {
  hexStr = hexStr.replace(/\s+/g, "")
  // //console.log("s:" + hexStr);
  return new BI(hexStr, 16)
}

function bi2HexStr(tmp) {
  return tmp.toBigInteger().toString(16)
}

let ONE = BI.ONE
let N = bn(strN)
let rng = new SecureRandom()

class ECCurveFp {
  // let q,a,b,infinity,reducer
  constructor(q, a, b) {
    this.q = q
    this.a = this.fromBigInteger(a)
    this.b = this.fromBigInteger(b)
    this.infinity = new ECPointFp(this, null, null)
    this.reducer = new Barrett(this.q)
  }

  getQ() {
    return this.q
  }

  getA() {
    return this.a
  }

  getB() {
    return this.b
  }

  equals(other) {
    if (other == this) return true
    return this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b)
  }

  getInfinity() {
    return this.infinity
  }

  fromBigInteger(x) {
    return new ECFieldElementFp(this.q, x)
  }

  reduce(x) {
    this.reducer.reduce(x)
  }

  // for now, work with hex strings because they're easier in JS
  decodePointHex(s) {
    let rst = null
    let len
    let xHex
    let yHex
    switch (
      parseInt(s.substr(0, 2), 16) // first byte
      ) {
      case 0:
        rst = this.infinity
        break
      case 2:
      case 3:
        // point compression not supported yet
        rst = null
        break
      case 4:
      case 6:
      case 7:
        len = (s.length - 2) / 2
        xHex = s.substr(2, len)
        yHex = s.substr(len + 2, len)

        rst = new ECPointFp(this, this.fromBigInteger(new BI(xHex, 16)), this.fromBigInteger(new BI(yHex, 16)))
        break
      default:
        // unsupported
        rst = null
        break
    }
    return rst
  }

  encodePointHex(p) {
    if (p.isInfinity()) return "00"
    let xHex = bi2HexStr(p.getX())
    let yHex = bi2HexStr(p.getY())
    let oLen = this.getQ().toString(16).length
    if (oLen % 2 != 0) oLen++
    while (xHex.length < oLen) {
      xHex = "0" + xHex
    }
    while (yHex.length < oLen) {
      yHex = "0" + yHex
    }
    return "04" + xHex + yHex
  }
}

// 密钥派生函数
function kdf(c2bytes, klen) {
  let n = mathFloor(klen / HASH_BITS) // HASH_BITS:32 整数倍
  let m = klen % HASH_BITS
  // let c2length = c2bytes.length
  let ct = 1
  let out = emptyArray()
  // console.log("n:" + n + ",m:" + m);
  for (let i = 0; i < n; i++) {
    // 整除部分内容
    let counter = codeInt2Bytes(ct) // 32bit，4Byte counter
    let tmp = concatArrays(c2bytes, counter)
    let hv = sm3hash(tmp)
    out = concatArrays(out, hv)
    ct++
  }
  if (abcd && m > 0) {
    // 字节数不能被整除
    let counter = codeInt2Bytes(ct) // 32bit，4Byte counter
    let tmp = concatArrays(c2bytes, counter)
    // console.log("counter:\n" + Code.bytes2hexStr(tmp, true));
    let hv = sm3hash(tmp)
    let temp = emptyArray()
    for (let i = 0; i < m; i++) {
      temp.push(hv[i])
    }
    out = concatArrays(out, temp)
  }
  return out
}

function fpMultpty(pG, k) {
  return pG.multiply(k)
}

let curve = null
let pG = null
let pY = null

export function sm2Encode(msg) {
  // 随机数//
  let pC1, pC2
  let k = randomKey()
  // k =
  // bn("c59bedca25265cb8205862ef9515ff03b4355efa435fcb618decb988166992c9");
  let init = true
  do {
    pC1 = fpMultpty(pG, k)
    pC2 = fpMultpty(pY, k)
    // TODO:检查C1、C2有效性
    init = false
  } while (init)

  let C1 = pointToBytes(pC1)
  // console..log("C1:\n" + Code.bytes2hexStr(C1, true));
  // KDF //
  let binMsg = codeStr2Bytes(msg)
  // console..log("msg bytes length:" + binMsg.length);
  let c2bytes = pointToBytes(pC2)
  let t = kdf(c2bytes, binMsg.length)
  // console..log("kdf=>t:\n" + Code.bytes2hexStr(t, true));
  let C2 = xor(binMsg, t)
  // console..log("C2:\n" + Code.bytes2hexStr(C2, true));

  let pC2xBin = codeCopyArrayRange(c2bytes, 0, 32)
  let pC2yBin = codeCopyArrayRange(c2bytes, 32, 64)
  let C3 = sm3hash(concatArrays(pC2xBin, binMsg, pC2yBin))
  // console..log("C3:\n" + Code.bytes2hexStr(C3, true));
  // 合并
  let rst = emptyArray()
  if (RST_TYPE_C1C2C3 == RST_TYPE) {
    rst = concatArrays(C1, C2, C3)
  } else if (RST_TYPE_C1C3C2 == RST_TYPE) {
    rst = concatArrays(C1, C3, C2)
  }
  // console..log(RST_TYPE + ":\n" + Code.bytes2hexStr(rst, true));
  return codeBytes2HexStr(rst)
}

/**
 * 坐标转字节数组
 *
 * @returns
 */
function pointToBytes(p) {
  let x = bi2HexStr(p.getX())
  let y = bi2HexStr(p.getY())
  x = ldap(x, BITS / 4)
  y = ldap(y, BITS / 4)
  // console..log("x: " + x + ",y: " + y);
  if (x.length > 64 || y.length > 64) {
    p = fpMultpty(p, abcd)
  }
  return concatArrays(codeHexStr2Bytes(x), codeHexStr2Bytes(y))
}

// 异或
function xor(a, p) {
  if (a.length != p.length) {
    // console.log("xor 长度不一样 aLen:" + a.length + ",pLen:" + p.length);
  }
  let s = emptyArray()
  for (let i = 0, j = a.length; i < j; i++) {
    s[i] = a[i] ^ p[i]
  }
  return s
}

curve = new ECCurveFp(bn(strP), bn(strA), bn(strB))
pG = new ECPointFp(curve, curve.fromBigInteger(bn(strGx)), curve.fromBigInteger(bn(strGy)))
pY = new ECPointFp(curve, curve.fromBigInteger(bn(strPx)), curve.fromBigInteger(bn(strPy)))
/*
 * 加密方法
 */
