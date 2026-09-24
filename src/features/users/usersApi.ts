import { baseApi } from '../../app/baseApi'
import type { User } from './types'

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
    }),
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi
