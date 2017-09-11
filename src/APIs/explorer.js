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
export const getFileList = function (currentPath, dirName) {
  return ajax.get('/fileList.do', {
    params: {
      current_path: currentPath,
      dirName
    }
  })
}
export const deleteDir = function (currentPath, dName) {
  return ajax.get('/deleteDIR.do', {
    params: {
      currentPath,
      dName
    }
  })
}
export const deleteFile = function (currentPath, fname) {
  return ajax.get('/deleteFile.do', {
    params: {
      currentPath,
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
