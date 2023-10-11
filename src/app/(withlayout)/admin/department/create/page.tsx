"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddDepartmentMutation } from "@/redux/api/departmentApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateDepartment = () => {
  const { role } = getUserInfo() as any;
  const [addDepartment] = useAddDepartmentMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating...");

    try {
      console.log(data);
      await addDepartment(data);

      message.success("Department added successfully");
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
            label: "department",
            link: `/${role}/department`,
          },
        ]}
      />
      <h1>Create Department</h1>

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

export default CreateDepartment;
