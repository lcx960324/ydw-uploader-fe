import axios from 'axios'
import common from './common'
const ajax = axios.create({
  ...common,
  baseURL: common.baseURL + '/user'
})

// export const register = function () {}
export const login = function (username, password) {
  return ajax.get('/login.do', {
    params: {
      username,
      password
    }
  })
}
export const getUserName = function () {
  return ajax.get('/getUsername.do')
}
export const confirmPassword = function (password) {
  return ajax.get('/confirmPassword.do', {
    params: {
      password
    }
  })
}
export const changePassword = function (newPassword) {
  return ajax.get('/changePassword.do', {
    params: {
      newPassword
    }
  })
}
