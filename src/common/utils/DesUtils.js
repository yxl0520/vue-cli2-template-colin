import CryptoJS from 'crypto-js'

export default {
  // DES-CBC模式加密
  encrypt: function (message, key) {
    let keyWordArray = CryptoJS.enc.Utf8.parse(this.generateKey(key))
    let encrypted = CryptoJS.DES.encrypt(message, keyWordArray, {
      iv: keyWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    // console.log('DES-CBC模式加密', message, key, encrypted.toString())
    return encrypted.toString()
  },
  // DES-CBC模式解密
  decrypt: function (ciphertext, key) {
    let keyWordArray = CryptoJS.enc.Utf8.parse(this.generateKey(key))
    let decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyWordArray, {
      iv: keyWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    // console.log('DES-CBC模式解密', ciphertext, key, decrypted.toString(CryptoJS.enc.Utf8))
    return decrypted.toString(CryptoJS.enc.Utf8)
  },
  // 生成密钥，保留前8位，小于8位补0
  generateKey: function (keyStr) {
    let keyBytes = this.stringToBytes(keyStr)
    let result = []
    for (let i = 0; i < keyBytes.length; i++) {
      if (i >= 8) {
        break;
      }
      result.push(keyBytes[i])
    }
    let len = result.length
    if (len < 8) {
      for (let i = len; i < 8; i++) {
        result.push(0)
      }
    }

    let str = result.reduce((pre, cur) => pre + String.fromCharCode(cur), '')
    // console.log('generateKey', str)
    return str
  },
  // 字符串转字节数组
  stringToBytes: function (str) {
    let ch;
    let st;
    let re = [];
    for (let i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i); // get char
      st = []; // set up "stack"
      do {
        st.push(ch & 0xFF); // push byte to stack
        ch = ch >> 8; // shift value down by 1 byte
      } while (ch);
      // add stack contents to result
      // done because chars have "wrong" endianness
      re = re.concat(st.reverse());
    }
    // return an array of bytes
    return re;
  }
}
