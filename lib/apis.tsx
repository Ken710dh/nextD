import axios, { AxiosError } from "axios"
import { BaseQuery } from "./type"

const axiosClient = axios.create({
  baseURL: "",
  timeout: 10000
})

//request interceptors
axiosClient.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem('token')
    if (token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }
)

//Response interceptor

axiosClient.interceptors.response.use(
  (response)=> response,
  (error)=>{
    if (error.response && error.response.status === 401){
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
}
)

export const axiosBaseQuery = (baseURL: string)=>{
return async ({url, method, data, params, headers}: BaseQuery) => {
  try{

    const response = await axiosClient({
      url: `${baseURL}${url}`,
      method,
      data,
      params,
      headers
    })
    return {data: response.data}
  }catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
}
}
