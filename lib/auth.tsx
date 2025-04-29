import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './apis';
const apiAuthenEndpoint = "";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(apiAuthenEndpoint),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: `/signup`,
        data: body,
      })
    }),
    login: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: `/login`,
        data: body
      })
    }),
    logout: builder.query({
      query: (body) => ({
        method: 'post',
        url: `/logout/`,
        data: body
      })
    }),
    resetPasswordSendmail: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: `/password/reset`,
        data: body
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: '/password/reset/done',
        data: body,
      })
    }),
  })
})

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutQuery, 
  useResetPasswordSendmailMutation, 
  useResetPasswordConfirmMutation
} = authApi