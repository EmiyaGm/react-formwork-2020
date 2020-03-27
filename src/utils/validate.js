export function idCodeValid(code) {
  // 身份证号合法性验证
  // 支持15位和18位身份证号
  // 支持地址编码、出生日期、校验位验证
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }
  let row = {
    pass: true,
    msg: '验证成功',
  }

  if (!city[code.substr(0, 2)]) {
    row = {
      pass: false,
      msg: '身份证号地址编码错误',
    }
  } else if (
    !code ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)
  ) {
    row = {
      pass: false,
      msg: '身份证号格式错误',
    }
  }

  if (city[code.substr(0, 2)]) {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }

      if (`${parity[sum % 11]}` !== code[17].toUpperCase()) {
        row = {
          pass: false,
          msg: '身份证号校验位错误',
        }
      }
    }
  }

  return row
}

export function passWordValid(mobile) {
  let row = {
    pass: true,
    msg: '验证成功',
  }

  if (!mobile || !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(mobile)) {
    row = {
      pass: false,
      msg: '密码格式错误',
    }
  }

  return row
}

export function mobileValid(mobile) {
  let row = {
    pass: true,
    msg: '验证成功',
  }

  if (!mobile || !/^[1][3,4,5,6,7,8][0-9]{9}$/.test(mobile)) {
    row = {
      pass: false,
      msg: '手机号码格式错误',
    }
  }

  return row
}

export function telephoneNumberValid(telephoneNumber) {
  let row = {
    pass: true,
    msg: '验证成功',
  }

  const regexpOfPhoneNumber = /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/

  if (!telephoneNumber || !regexpOfPhoneNumber.test(telephoneNumber)) {
    row = {
      pass: false,
      msg: '固定号码格式错误',
    }
  }

  return row
}
