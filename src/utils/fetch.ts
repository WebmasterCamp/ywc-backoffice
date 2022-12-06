import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

import { API_ENDPOINT } from '../config'
import { getToken, removeToken } from './token-helper'
import { Method } from 'axios'

interface ApiResponse<T> {
  status: 'success' | 'error'
  payload: T
}

// request data
export const fetch = async <T>(
  route: string,
  data: any = '',
  method: AxiosRequestConfig['method'] = 'GET'
) => {
  const authOptions: AxiosRequestConfig = {
    data: qs.stringify(data),
    method,
    url: `${API_ENDPOINT}/${route}`,
  }
  // do http request
  const { data: responseData } = await axios.request<ApiResponse<T>>(
    authOptions
  )
  if (responseData.status !== 'success')
    throw new Error(JSON.stringify(responseData))
  return responseData.payload
}

type ApiPath = `/${string}`

export async function apiGet<TRes>(path: ApiPath) {
  return await apiRequest<never, TRes>('get', path)
}

export async function apiPost<TBody, TRes = null>(path: ApiPath, body: TBody) {
  return await apiRequest<TBody, TRes>('post', path, body)
}

export async function apiPut<TBody, TRes = null>(path: ApiPath, body: TBody) {
  return await apiRequest<TBody, TRes>('put', path, body)
}

export async function apiRequest<TBody, TRes>(
  method: Method,
  path: ApiPath,
  body?: TBody,
  token: string | null = ''
): Promise<TRes> {
  const options: AxiosRequestConfig = {
    data: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token || getToken(),
    },
    method,
    url: `${API_ENDPOINT}${path}`,
  }
  const { data } = await axios.request<ApiResponse<TRes>>(options)
  if (data.status !== 'success') throw new Error(JSON.stringify(data))
  return data.payload
}

// request data from token in localStorage
export const legacy_fetchWithToken = async (
  route: string,
  data: any = {},
  method: AxiosRequestConfig['method'] = 'POST',
  token: string | null = ''
) => {
  const authOptions: AxiosRequestConfig = {
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': token || getToken(),
    },
    method,
    url: `${API_ENDPOINT}/${route}`,
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
