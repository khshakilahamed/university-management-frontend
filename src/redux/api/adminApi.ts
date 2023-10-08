import { IAdmin, IDepartment, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admins";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdminWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    admins: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAdmin[], meta: IMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    admin: build.query({
      query: (id: string) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id: string) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAdminsQuery,
  useAddAdminWithFormDataMutation,
  useAdminQuery,
  useDeleteAdminMutation,
} = adminApi;
