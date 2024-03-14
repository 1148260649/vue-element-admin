import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import settings from '@/settings'
import uuid from 'uuid/v4'
import { getToken, getEncryptedKey } from '@/utils/auth'
import { encrypted, signature } from '@/utils/crypte'

/**
 * 下载文件
 * @param blob 文件流
 * @param filename 文件名
 */
const createDownload = function(blob, filename) {
  console.log(filename)
  const url = window.URL.createObjectURL(new Blob([blob]))
  const $a = document.createElement('a')
  $a.style.display = 'none'
  $a.href = url
  $a.setAttribute('download', filename)
  $a.click()
}

/**
 * 判断读取的内容是否可以转换为文件格式
 */
const handleBlob = function(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsText(blob)
    fileReader.onload = function() {
      try {
        const result = JSON.parse(this.result)
        if (result.resCode) {
          resolve(result)
        } else {
          resolve()
        }
      } catch (e) {
        // download goes here
        resolve()
      }
    }
  })
}

/**
 * 创建ajax请求
 */
// create an axios instance
const service_springboot001 = axios.create({
  baseURL: process.env.VUE_APP_BASE_HOST + process.env.VUE_APP_BASE_API_JZ, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: settings.client.timeOut // request timeout
})

/**
 * request interceptor
 */
service_springboot001.interceptors.request.use(
  config => {
    // do something before request is sent

    // 增加 springboot001 的认证信息
    config.headers['Authorization'] = 'Basic YWRtaW46YWRtaW4='

    // 如果不是表单类型的数据那么重新设置数据格式
    if (!(config.data instanceof FormData)) {
      if (config.data) {
        config.data = {
          data: config.data.data,
          pageParam: config.data.pageParam,
          meta: _meta
        }
      }
    }

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }

    const _meta = {
      globalTraceNumber: uuid(),
      version: '1.0.0',
      requestTime: new Date()
    }

    if (process.env.NODE_ENV !== 'development' && config.method.toLowerCase() !== 'get' && config.data) {
      config.data = { data: config.data.data, meta: _meta }
      if (!settings.disableEncryptRequestData) {
        config.headers[settings.encryptKey] = true
        var _data = encrypted(config.data, getEncryptedKey())
        config.data = {
          data: _data,
          meta: _meta
        }
        config.headers[settings.signatureKey] = signature(_data + _meta.globalTraceNumber + _meta.requestTime)
      }
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

/**
 * response interceptor
 */
service_springboot001.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom resCode
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res instanceof Blob) {
      let filename = 'download'
      for (const key in response.headers) {
        // eslint-disable-next-line no-prototype-builtins
        if (response.headers.hasOwnProperty(key)) {
          const header = response.headers[key]
          if (header) {
            const header_arr = header.toLowerCase().split('filename=')
            if (header_arr.length > 1) {
              filename = header_arr[1]
              // filename = decodeURIComponent(filename)
              filename = decodeURI(filename)
              break
            }
          }
        }
      }
      /*
      查看了 network ,响应头确实有返回 content-disposition；
      但是打印以及通过.headers['content-disposition']就是获取不到；
      是因为cros跨域，浏览器只会返回默认头部的header,并不能完全获取后端自定义的所有数据；

      因此，需要后端在header中添加 Access-Control-Expose-Headers 信息；
      响应首部 Access-Control-Expose-Headers 就是控制“暴露”的开关，它列出了哪些首部可以作为响应的一部分暴露给外部
      response.setHeader("Access-Control-Expose-Headers", "Content-Disposition")
      这个时候就能在前端获取到响应的数据了
      */
      return handleBlob(response.data).then(result => {
        if (result) {
          return result
        }
        createDownload(res, filename)
      }).catch((result) => {
        return Promise.reject(result)
      })
    }
    // if the custom resCode is not 20000, it is judged as an error.
    console.log(res || 'Error')
    if (res.resCode !== '200') {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.resCode === '50008' || res.resCode === '50012' || res.resCode === '50014') {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res)
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log(error) // for debug
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service_springboot001
