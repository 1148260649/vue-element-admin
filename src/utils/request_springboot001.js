import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import settings from '@/settings'
import uuid from 'uuid/v4'
import { getToken, getEncryptedKey } from '@/utils/auth'
import { encrypted, signature } from '@/utils/crypte'

const createDownload = function(blob, name) {
  const url = window.URL.createObjectURL(new Blob([blob]))
  const $a = document.createElement('a')
  $a.style.display = 'none'
  $a.href = url
  $a.setAttribute('download', name)
  $a.click()
}

const handleBlob = function(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsText(blob)
    fileReader.onload = function() {
      try {
        const result = JSON.parse(this.result)
        if (result.flag && result.flag !== 0) {
          reject(result)
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

// create an axios instance
const service_springboot001 = axios.create({
  baseURL: process.env.VUE_APP_BASE_HOST + process.env.VUE_APP_BASE_API_JZ, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service_springboot001.interceptors.request.use(
  config => {
    // do something before request is sent

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

// response interceptor
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
    console.log(res)
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
              filename = decodeURI(filename)
              break
            }
          }
        }
      }
      return handleBlob(response.data).then(() => {
        createDownload(res, filename)
      }).catch((result) => {
        return Promise.reject(new Error(result.msg))
      })
    }
    // if the custom resCode is not 20000, it is judged as an error.
    if (res.resCode !== '200') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

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
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service_springboot001
