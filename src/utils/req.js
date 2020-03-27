import axios from 'axios'

import { rootStore } from 'Models/root.store'
import cryptoHelper from './crypto-helper'

const { host } = require('Config')

const callGET = (url, data) => {
  const reqContent = {
    method: 'get',
    url,
    // 添加在请求URL后面的参数
    params: data,
    data: {},
    withCredentials: false,
  }

  return axios(reqContent)
}

const callApiWithoutAuth = (url, method, data, options = {}) => {
  const opts = { ...options }
  const reqContent = {
    method,
    baseURL: host || '',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
    // 添加在请求URL后面的参数
    params: method === 'get' ? data : {},
    // 适用于 PUT POST PATCH
    data: method !== 'get' ? data : {},
    withCredentials: false,
    ...opts,
  }

  return axios(reqContent)
}

const callApi = (url, method, data, options = {}) => {
  const opts = { ...options }
  const reqContent = {
    method,
    baseURL: host || '',
    url,
    headers: {
      'Content-Type': 'application/json',
      Authentication: rootStore.token,
    },
    // 添加在请求URL后面的参数
    params: method === 'get' ? data : {},
    // 适用于 PUT POST PATCH
    data: method !== 'get' ? data : {},
    withCredentials: false,
    ...opts,
  }

  return axios(reqContent)
}

const callGraphql = (url, data, options = {}) => {
  const opts = { ...options }
  const reqContent = {
    method: 'post',
    baseURL: host || '',
    url,
    headers: {
      'Content-Type': 'application/graphql',
      Authentication: rootStore.token,
    },
    data, // 适用于 PUT POST PATCH
    withCredentials: false,
    ...opts,
  }

  return axios(reqContent)
}

async function post(url, params, token) {
  try {
    const result = await axios({
      method: 'POST',
      url,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        Authentication: rootStore.token,
      },
      data: params,
    })
    return result.data
  } catch (err) {
    if (err.response && err.response.status && err.response.status === 403) {
      //   window.location.href = '/login'
    }
    throw err
  }
}

async function upload(file, { onUploadProgress }) {
  let saved

  const querySign = async () => {
    if (saved === undefined || saved.expire * 1000 <= +new Date()) {
      const result = await post('/1.0/app/picture/getPolicy', {})

      saved = result.data
    }

    return saved
  }

  const sign = await querySign()
  const { uid, name = '' } = file
  // eslint-disable-next-line no-bitwise
  const uuid = `${uid}${Date.now()}${(Math.random() * 1000000) << 0}`
  const sufix = name.split('.')[1] || 'png'
  const filename = `${cryptoHelper.md5Encoder(uuid)}.${sufix}`
  const form = new window.FormData()

  form.set('name', filename)
  form.set('key', `${sign.dir}${filename}`)
  form.set('policy', sign.policy)
  form.set('OSSAccessKeyId', sign.accessid)
  form.set('success_action_status', '200')
  form.set('callback', sign.callback)
  form.set('signature', sign.signature)
  form.set('file', file)

  return axios({
    method: 'POST',
    host: sign.host,
    url: sign.host,
    headers: {
      Accept: '*/*',
    },
    data: form,
    onUploadProgress,
  })
}

export default {
  callGET,
  callApi,
  callApiWithoutAuth,
  callGraphql,
  upload,
  get: (url, data = {}) => callApi(url, 'get', data),
  put: (url, data = {}) => callApi(url, 'put', data),
  post: (url, data = {}) => callApi(url, 'post', data),
  delete: (url, data = {}) => callApi(url, 'delete', data),
}
