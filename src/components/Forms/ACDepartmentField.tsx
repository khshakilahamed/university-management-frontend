import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACDepartmentFieldProps = {
  name: string;
  label: string;
  onChange: (value: any) => void;
};

const ACDepartmentField = ({
  name,
  label,
  onChange,
}: ACDepartmentFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });

  const academicDepartments = data?.academicDepartments;

  const academicDepartmentsOptions =
    academicDepartments &&
    academicDepartments.map((acDepartment: any) => {
      return {
        label: acDepartment?.title,
        value: acDepartment?.id,
      };
    });

  return (
    <FormSelectField
      size="large"
      name={name}
      options={academicDepartmentsOptions as SelectOptions[]}
      label={label}
      placeholder="Select"
      handleChange={(e) => onChange(e)}
    />
  );
};

export default ACDepartmentField;
