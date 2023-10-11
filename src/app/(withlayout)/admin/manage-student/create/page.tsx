"use client";

import StepperForm from "@/components/StepperForm/StepperForm";
import GuardianInfo from "@/components/StudentForms/GuardianInfo";
import LocalGuardianInfo from "@/components/StudentForms/LocalGuardianInfo";
import StudentBasicInfo from "@/components/StudentForms/StudentBasicInfo";
import StudentInfo from "@/components/StudentForms/StudentInfo";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddStudentWithFormDataMutation } from "@/redux/api/studentApi";
import { message } from "antd";

const CreateStudentPage = () => {
  const [addStudentWithFormData] = useAddStudentWithFormDataMutation();

  const steps = [
    {
      title: "Student Information",
      content: <StudentInfo />,
    },
    {
      title: "Basic Information",
      content: <StudentBasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <GuardianInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianInfo />,
    },
  ];

  const handleStudentSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];

    delete obj["file"];

    const data = JSON.stringify(obj);

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    try {
      message.loading("Creating...");
      //   console.log(values);

      const res = await addStudentWithFormData(formData);

      if (!!res) {
        message.success("Student created successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "manage-student",
            link: "/admin/manage-student",
          },
        ]}
      />

      <ActionBar title="Create Student"></ActionBar>

      <StepperForm
        persistKey="student-create-form"
        submitHandler={(value) => handleStudentSubmit(value)}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
