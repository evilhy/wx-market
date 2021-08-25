// file文件转换为base64
export function fileToBase64(file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      resolve(reader.result)
    }
  })
}

// base64转换为file
export function dataURLtoFile(dataurl, filename) {
  // 将base64转换为文件
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// blob流转换为base64
export function blobToDataURI(blob) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = function(e) {
      resolve(e.target.result)
    }
  })
}
// base64转换为blob流
export function dataURItoBlob(base64Data) {
  let byteString
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1])
  } else {
    byteString = unescape(base64Data.split(',')[1])
  }
  let mimeString = base64Data
    .split(',')[0]
    .split(':')[1]
    .split(';')[0] // mime类型 -- image/png

  // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  // var ia = new Uint8Array(arrayBuffer); // 创建视图
  let ia = new Uint8Array(byteString.length) // 创建视图
  for (let i = 0, len = byteString.length; i < len; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  let blob = new Blob([ia], {
    type: mimeString
  })
  return blob
}
