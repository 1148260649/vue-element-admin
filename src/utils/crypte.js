import { sm2, sm3 } from 'sm-crypto'

export function encrypted(data, publicKey) {
  // publicKey = publicKey || '23BDFAAC3CBAA84EF7FCADE98ADB0A434336BFE081EABB6C7B42E459F1DF7EE74A94F263F15332B0B5C78C0E65AD86A47FF429B50FAA27C9EA04E50F49B580FF'
  if (!publicKey) return data.data
  const mData = sm2.doEncrypt(JSON.stringify(data), publicKey, 0)
  return '04' + mData
}

export function decrypted(encryptData, privateKey) {
  return sm2.doDecrypt(encryptData, privateKey)
}

export function signature(message) {
  return sm3(message)
}
