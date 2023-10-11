"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddAcademicFacultyMutation } from "@/redux/api/academic/facultyApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateAcademicFaculty = () => {
  const { role } = getUserInfo() as any;
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");
      console.log(data);
      const res = await addAcademicFaculty(data);

      if (!!res) {
        message.success("Academic Faculty created successfully");
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
            label: "academic-faculty",
            link: `/${role}/academic/faculty`,
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
            <FormInput type="text" name="title" size="large" label="Title" />
          </Col>
        </Row>

        <Button htmlType="submit" type="primary">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateAcademicFaculty;
