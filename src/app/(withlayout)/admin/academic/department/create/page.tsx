"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddAcademicDepartmentMutation } from "@/redux/api/academic/departmentApi";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { getUserInfo } from "@/services/auth.service";
import { IAcademicFaculty } from "@/types";
import { Button, Col, Row, message } from "antd";

const CreateAcademicDepartment = () => {
  const { role } = getUserInfo() as any;
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });

  //@ts-ignore
  const academicFaculties: IAcademicFaculty[] = data?.academicFaculties;

  //   console.log(academicFaculties);

  const academicFacultyOptions =
    academicFaculties &&
    academicFaculties?.map((faculty) => {
      return {
        label: faculty?.title,
        value: faculty?.id,
      };
    });

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");
      //   console.log(data);
      const res = await addAcademicDepartment(data);

      if (!!res) {
        message.success("Academic Department created successfully");
      }
    } catch (error: any) {
      console.error(error.message);
      message.error(error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "academic-department",
            link: `/${role}/academic/department`,
          },
        ]}
      />
      <h1>Create Academic Faculty</h1>

      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col
            span={8}
            style={{
              margin: "10px 0",
            }}
          >
            <FormInput
              type="text"
              name="title"
              size="large"
              label="Academic Department Title"
            />
          </Col>
        </Row>

        <Row>
          <Col
            span={8}
            style={{
              margin: "10px 0",
            }}
          >
            <FormSelectField
              size="large"
              name="academicFacultyId"
              options={academicFacultyOptions as SelectOptions[]}
              label="Academic Faculty"
              placeholder="Select"
            />
          </Col>
        </Row>

        <Button htmlType="submit" type="primary">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateAcademicDepartment;
