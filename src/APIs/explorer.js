import axios from 'axios'
import common from './common'
const ajax = axios.create({
  ...common,
  baseURL: common.baseURL + '/user'
})

export const createDir = function (currentPath, name) {
  return ajax.get('/createDIR.do', {
    params: {
      current_path: currentPath,
      name
    }
  })
}
export const getFileList = function (currentPath) {
  let path = ''
  let dirName
  if (currentPath === '/') {
    path = '/'
  } else {
    const arr = currentPath.split('/')
    dirName = arr.pop()
    if (arr.length === 1) path = '/'
    else path = arr.join('/')
  }
  return ajax.get('/fileList.do', {
    params: {
      current_path: path,
      dirName
    }
  })
}
export const deleteFile = function (currentPath, fname) {
  return ajax.get('/deleteFile.do', {
    params: {
      current_path: currentPath,
      fname
    }
  })
}
export const upload = function (currentPath, file) {
  const data = new FormData()
  data.append('current_path', currentPath)
  data.append('file', file)
  return ajax.post('/upload.do', data)
}
