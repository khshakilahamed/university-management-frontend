import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import { IAcademicFaculty } from "@/types";

type ACFacultyFieldProps = { name: string; label: string };

const ACFacultyField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });

  const academicFaculties = data?.academicFaculties;

  const academicFacultiesOptions =
    academicFaculties &&
    academicFaculties.map((acFaculty: any) => {
      return {
        label: acFaculty?.title,
        value: acFaculty?.id,
      };
    });

  return (
    <FormSelectField
      size="large"
      name={name}
      options={academicFacultiesOptions as SelectOptions[]}
      label={label}
      placeholder="Select"
    />
  );
};

export default ACFacultyField;
