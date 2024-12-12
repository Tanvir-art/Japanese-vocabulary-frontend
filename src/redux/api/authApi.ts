import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    signup: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),

    getUsers: builder.query({
      query: () => "/admin/users",
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: { role },
      }),
    }),

    getLessons: builder.query({
      query: () => "/admin/lessons",
    }),
    addLesson: builder.mutation({
      query: (lesson) => ({
        url: "/admin/lessons",
        method: "POST",
        body: lesson,
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ id, ...lesson }) => ({
        url: `/admin/lessons/${id}`,
        method: "PUT",
        body: lesson,
      }),
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/admin/lessons/${id}`,
        method: "DELETE",
      }),
    }),

    getVocabulariesByLesson: builder.query({
      query: (lessonId) => `/admin/vocabularies?lessonId=${lessonId}`,
    }),
    addVocabulary: builder.mutation({
      query: (vocabulary) => ({
        url: "/admin/vocabularies",
        method: "POST",
        body: vocabulary,
      }),
    }),
    updateVocabulary: builder.mutation({
      query: ({ id, ...vocabulary }) => ({
        url: `/admin/vocabularies/${id}`,
        method: "PUT",
        body: vocabulary,
      }),
    }),
    deleteVocabulary: builder.mutation({
      query: (id) => ({
        url: `/admin/vocabularies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useGetLessonsQuery,
  useAddLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useGetVocabulariesByLessonQuery,
  useAddVocabularyMutation,
  useUpdateVocabularyMutation,
  useDeleteVocabularyMutation,
} = authApi;
