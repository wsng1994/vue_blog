import axios from 'axios'
// import { getStore, setStore } from './storage'
// import { router } from '../router/index'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
// 统一请求路径前缀
// const base = '/ccma-server/api'   // 服务器地址/
const base = 'http://121.5.183.117:8081/blog'   // 本地///
// 超时设定
axios.defaults.timeout = 15000

axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error('请求超时')
  return Promise.reject(err)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  const data = response.data

  // 根据返回的code值来做不同的处理(和后端约定)
  switch (data.code) {
    case 401:
      // 未登录 清除已登录状态
      Cookies.set('userInfo', '')
      setStore('accessToken', '')
      if (router.history.current.name !== 'login') {
        if (data.msg !== null) {
          Message.error(data.msg)
        } else {
          Message.error('未知错误，请重新登录')
        }
        router.push('/login')
      }
      break
    case 403:
      // 没有权限
      if (data.msg !== null) {
        Message.error(data.msg)
      } else {
        Message.error('未知错误')
      }
      break
    case 500:
      // 错误
      if (data.msg !== null) {
        Message.error(data.msg)
      } else {
        Message.error('未知错误')
      }
      break
    default:
      return data
  }

  return data
}, (err) => {
  // 返回状态码不为200时候的错误处理
  Message.error(err.toString())
  return Promise.resolve(err)
})

export const getRequest = (url, params) => {
  // const accessToken = getStore('accessToken')
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      'accessToken': '9999'
    }
  })
}

export const postRequest = (url, params) => {
  // const accessToken = getStore('accessToken')
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'accessToken': '9999'
    }
  })
}

export const putRequest = (url, params) => {
  // const accessToken = getStore('accessToken')
  console.log(params)
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/json',
      'accessToken': '9999'
    }
  })
}

export const deleteRequest = (url, params) => {
  // const accessToken = getStore('accessToken')
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params,
    headers: {
      'accessToken': '9999'
    }
  })
}

export const importRequest = (url, params) => {
  // const accessToken = getStore('accessToken')
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'accessToken': '9999'
    }
  })
}

export const uploadFileRequest = (url, params) => {
  // const accessToken = getStore('accessToken')
  return axios({
    method: 'post',
    url: `${base}${url}`,
    params: params,
    headers: {
      'accessToken': '9999'
    }
  })
}
