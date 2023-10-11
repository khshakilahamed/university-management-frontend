import { IAcademicDepartment, IMeta } from "@/types";
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const ACADEMIC_DEPARTMENT_URL = "/academic-departments";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    academicDepartments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ACADEMIC_DEPARTMENT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicDepartment[], meta: IMeta) => {
        return {
          academicDepartments: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicDepartment],
    }),
    // get single academic department by id
    academicDepartment: build.query({
      query: (id) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.academicDepartment],
    }),
    addAcademicDepartment: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
    // update academic department api
    updateAcademicDepartment: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
    // delete academic department api
    deleteAcademicDepartment: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
  }),
});

export const {
  useAddAcademicDepartmentMutation,
  useAcademicDepartmentsQuery,
  useAcademicDepartmentQuery,
  useDeleteAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
} = departmentApi;
