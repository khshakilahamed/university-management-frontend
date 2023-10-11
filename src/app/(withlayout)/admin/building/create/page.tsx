"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddBuildingMutation } from "@/redux/api/buildingApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateBuildingPage = () => {
  const { role } = getUserInfo() as any;
  const [addBuilding] = useAddBuildingMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating...");

    try {
      console.log(data);
      const res = await addBuilding(data).unwrap();

      if (!!res?.id) {
        message.success("Building added successfully");
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
            label: `building`,
            link: `/${role}/building`,
          },
        ]}
      />

      <ActionBar title="Create Building"></ActionBar>

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

export default CreateBuildingPage;
