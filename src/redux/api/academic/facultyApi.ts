import { IAcademicFaculty, IAdmin, IDepartment, IMeta } from "@/types";
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const ACADEMIC_FACULTY_URL = "/academic-faculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    academicFaculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ACADEMIC_FACULTY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
        return {
          academicFaculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicFaculty],
    }),
    // get single academic faculty by id
    academicFaculty: build.query({
      query: (id) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.academicFaculty],
    }),
    addAcademicFaculty: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_FACULTY_URL}/create-faculty`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    // update academic faculty api
    updateAcademicFaculty: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_FACULTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    // delete academic faculty api
    deleteAcademicFaculty: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
  }),
});

export const {
  useAcademicFacultiesQuery,
  useAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
  useDeleteAcademicFacultyMutation,
} = facultyApi;
