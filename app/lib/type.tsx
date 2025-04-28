import { AxiosRequestConfig } from "axios";

export type AxiousBaseQuery = {
baseURL: string;
}

export type BaseQuery = AxiosRequestConfig & {
  url: string;                       
  method: AxiosRequestConfig['method']; 
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers']; 
};