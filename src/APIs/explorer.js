import axios from 'axios'
import common from './common'
const ajax = axios.create({
  ...common,
  baseURL: common.baseURL + '/user'
})

export const createDir = function (current_path, name) {
  return ajax.get('/createDIR.do', {
    params: {
      current_path,
      name
    }
  })
}
export const getFileList = function (current_path, dirName) {
  return ajax.get('/fileList.do', {
    params: {
      current_path,
      dirName
    }
  })
}
export const deleteDir = function (current_path, dName) {
  return ajax.get('/deleteDIR.do', {
    params: {
      current_path,
      dName
    }
  })
}
export const deleteFile = function (current_path, fname) {
  return ajax.get('/deleteFile.do', {
    params: {
      current_path,
      fname
    }
  })
}
export const upload = function (current_path, file) {
  const data = new FormData()
  data.append('current_path', current_path)
  data.append('file', file)
  return ajax.post('/upload.do', data)
}
