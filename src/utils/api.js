import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import router from '../router'
import VueCookies from 'vue-cookies'

axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
//  axios.defaults.baseURL = 'http://www.batchina.top/'
axios.defaults.baseURL = 'http://bat.qdunzi.com/'
//axios.defaults.baseURL = '/api'
axios.interceptors.request.use((config) => {
  // this.$cookies.set('status', res.data.status)
  let token = sessionStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (error) => {
  console.log('错误的传参')/*  */
  return Promise.reject(error);
})
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
// 对响应数据做些事
  if ((res.data.code == 4500 && res.data.message == '该接口需要进行Auth认证，请核实认证信息后重试') || (res.data.code == 4700 && (res.data.message == '登录异常，请重新登录' || res.data.message == '您的账号已被冻结，请联系管理员')) ) {
    Toast('登录异常，请重新登录')
    sessionStorage.setItem('accessToken' ,'')
    router.push({name: 'Login'})
  }
  // if (VueCookies.get('status') != 1) {
  //   Toast('认证状态')
  //   router.push({name: 'Login'})
  // }
  // console.log()
  if (!res.data.success) {
    return Promise.resolve(res)
  } else {
    return res
  }
}, (error) => {
  Toast('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchGet
}
