import axios from 'axios'
import common from './common.js'
const ajax = axios.create({
  ...common,
  baseURL: common.baseURL + '/user/'
})

// export const register = function () {}
export const login = function (username, password) {}
export const getUserName = function () {}
export const confirmPassword = function (password) {}
export const changePassword = function (newPassword) {}
