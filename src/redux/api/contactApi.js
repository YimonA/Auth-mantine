import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://contact-app.mmsdev.site/api/v1`,
  }),
  tagTypes: ["contact"],

  endpoints: (builder) => ({
    getContact: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ token, contact }) => ({
        url: `/contact`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: contact,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    getSingleContact:builder.query({
      query:({id,token})=>({
        url:`/contact/${id}`,
        headers: { authorization: `Bearer ${token}` },

      }),
      providesTags: ["contact"],

    })
  }),
});

export const { useGetContactQuery, useCreateContactMutation,useDeleteContactMutation,useGetSingleContactQuery } = contactApi;

//https://rizes-organization.gitbook.io/contactapi/?fbclid=IwAR3PLN0xNlhnchv6iOCrys8zD6zDqo-r5Y5WsieEPTJ9xg-XPCS6NGVe0Ic
