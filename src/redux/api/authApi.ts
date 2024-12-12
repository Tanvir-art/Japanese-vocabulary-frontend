import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user", "lesson", "vocabulary"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
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
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    getUsers: builder.query({
      query: () => "/users/getAllUser",
      providesTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["user"],
    }),

    getLessons: builder.query({
      query: () => "/lessons/allLessons",
      providesTags: ["lesson"],
    }),
    addLesson: builder.mutation({
      query: (lesson) => ({
        url: "/lessons/addLesson",
        method: "POST",
        body: lesson,
      }),
      invalidatesTags: ["lesson"],
    }),
    updateLesson: builder.mutation({
      query: ({ id, ...lesson }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        body: lesson,
      }),
      invalidatesTags: ["lesson"],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lesson"],
    }),

    getVocabulariesByLesson: builder.query({
      query: (lessonId) => `/vocabulary/${lessonId}`,
      providesTags: ["vocabulary"],
    }),
    addVocabulary: builder.mutation({
      query: (vocabulary) => ({
        url: "/vocabulary/addVocabulary",
        method: "POST",
        body: vocabulary,
      }),
      invalidatesTags: ["vocabulary"],
    }),
    updateVocabulary: builder.mutation({
      query: ({ id, ...vocabulary }) => ({
        url: `/vocabulary/${id}`,
        method: "PUT",
        body: vocabulary,
      }),
      invalidatesTags: ["vocabulary"],
    }),
    deleteVocabulary: builder.mutation({
      query: (id) => ({
        url: `/vocabulary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vocabulary"],
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
