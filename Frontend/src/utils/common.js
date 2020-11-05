import moment from 'moment'
import sha256 from 'crypto-js/sha256'

export function formatCurrency (n, f) {
  if (n === undefined || n === null || isNaN(n) || n === '') return 0
  if (f > 0 && n > 0) return n.toFixed(f).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function convertDatetime (timeStamp, format) {
  return moment.unix(timeStamp).format(format !== undefined ? format : 'YYYY-MM-DD HH:mm:ss')
}

export function convertRouterLink (str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  str = str.toLowerCase().split(' ').join('-')
  return str
}

export function convertDate (timeStamp) {
  return moment.unix(timeStamp).format('YYYY-MM-DD')
}

export function convertTimeStamp (date) {
  return moment(date, 'YYYY/MM/DD').format('X')
}

export function getUrlParameter (key, url) {
  const newKey = key.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp(`[\\?&]${newKey}=([^&#]*)`)
  const results = regex.exec(url)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function getExtension (fileName) {
  return fileName.split('.').pop()
}

export function hash256 (message) {
  return sha256(message).toString()
}

export function normalString (text, type) {
  switch (type) {
    case 'email':
      return text.replace(/[!~#$%&()|+\\=?;,*\\^<>\\{\\}\\[\]\\\\/]/gi, '')
    case 'name':
      return text.replace(/[!~@#$%&()_|+\\=?;,*.\\^<>\\{\\}\\[\]\\\\/]/gi, '')
    case 'postalCode':
      return text.replace(/[^A-Za-z0-9\-| ]/gi, '')
    case 'phone':
      return text.replace(/[^0-9 ]/gi, '')
    default: return text.trim()
  }
}

export function searchNodes (key, nodes) {
  return nodes.filter(child => child.name.toUpperCase().includes(key) ||
  child.symbol.includes(key))
}

export function searchMyNodes (key, nodes) {
  return nodes.filter(child => child.name.toUpperCase().includes(key) ||
  child.alias.includes(key))
}

export const roundDown = (n, dec) => {
  const reg = /^([0-9]*.)?$/
  if (reg.test(n)) return n
  if (!(n.toString()).includes('e')) {
    const roundNumber = Number(`${Math.floor(`${n}e${dec}`)}e-${dec}`)
    return roundNumber
  }
  const arr = (n.toString()).split('e')
  let sig = ''
  if (+arr[1] + dec > 0) {
    sig = '+'
  }
  const roundNumber = Number(`${Math.floor(`${+arr[0]}e${sig}${(+arr[1] + dec)}`)}e-${dec}`)
  return roundNumber
}

export function downloadFile (data, filename, mime) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const blob = new window.Blob([data], { type: mime || 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE doesn't allow using a blob object directly as link href.
    // Workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename)
    return
  }
  // Other browsers
  // Create a link pointing to the ObjectURL containing the blob
  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobURL)
  }, 100)
}

export function truncateString (str, num) {
  let newString = ''
  if (num < str.length) {
    newString = str.slice(0, num)
    return `${newString}...`
  }
  return str
}
