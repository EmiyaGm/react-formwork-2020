import Crypto from 'crypto'

export default class CryptoHelper {
  static md5Encoder(string) {
    const md5 = Crypto.createHash('md5')
    return md5.update(string, 'utf-8').digest('hex')
  }
}
