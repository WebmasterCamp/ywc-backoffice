import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

import { API_ENDPOINT } from '../config'
import { getToken, removeToken } from './token-helper'

// request data
export const fetch = async (
  route: string,
  data: any = '',
  method: AxiosRequestConfig['method'] = 'GET'
) => {
  const authOptions: AxiosRequestConfig = {
    data: qs.stringify(data),
    method,
    url: `${API_ENDPOINT}/${route}`
  }
  // do http request
  return axios(authOptions).then((res: AxiosResponse) => res.data)
}

// request data from token in localStorage
export const fetchWithToken = async (
  route: string,
  data: any = {},
  method: AxiosRequestConfig['method'] = 'POST',
  token: string | null = ''
) => {
  const authOptions: AxiosRequestConfig = {
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token || getToken()
    },
    method,
    url: `${API_ENDPOINT}/${route}`
  }
  // do http request
  try {
    const response = await axios(authOptions).then(
      (res: AxiosResponse) => res.data
    )
    // check error, if error = true and message = invalid access token
    // remove token from localStorage
    if (response.error && response.message === 'Authentication Error') {
      removeToken()
    }
    // return response data
    return response
  } catch (e) {
    return e
  }
}
