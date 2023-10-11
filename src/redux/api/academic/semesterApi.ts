import { IAcademicSemester, IMeta } from "@/types";
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const ACADEMIC_SEMESTER_URL = "/academic-semesters";

export const semesterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    academicSemesters: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ACADEMIC_SEMESTER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicSemester[], meta: IMeta) => {
        return {
          semester: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicSemester],
    }),
    // get single academic semester by id
    academicSemester: build.query({
      query: (id) => ({
        url: `${ACADEMIC_SEMESTER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.academicSemester],
    }),
    addAcademicSemester: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_SEMESTER_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.academicSemester],
    }),
    // update academic semester api
    updateAcademicSemester: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_SEMESTER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicSemester],
    }),
    // delete academic semester api
    deleteAcademicSemester: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_SEMESTER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicSemester],
    }),
  }),
});

export const {
  useAcademicSemesterQuery,
  useAcademicSemestersQuery,
  useAddAcademicSemesterMutation,
  useDeleteAcademicSemesterMutation,
  useUpdateAcademicSemesterMutation,
} = semesterApi;
