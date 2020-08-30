import md5 from 'crypto-js/md5'

const getMarvelApiAuthParams = ({ publicKey, privateKey }) => {
  const ts = new Date().getTime()
  const hash = md5(ts + privateKey + publicKey)
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`
}

export default getMarvelApiAuthParams
