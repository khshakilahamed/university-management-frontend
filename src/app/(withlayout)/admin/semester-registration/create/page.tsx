"use client";

import ACSemesterField from "@/components/Forms/ACSemesterField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddSemesterRegistrationsMutation } from "@/redux/api/semesterRegistrationApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateSemesterRegistrationPage = () => {
  const { role } = getUserInfo() as any;
  const [addSemesterRegistration] = useAddSemesterRegistrationsMutation();

  const onSubmit = async (data: any) => {
    data.minCredit = parseInt(data?.minCredit);
    data.maxCredit = parseInt(data?.maxCredit);

    try {
      message.loading("Creating...");
      console.log(data);
      const res = await addSemesterRegistration(data).unwrap();

      if (!!res?.id) {
        message.success("Semester registration created successfully");
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
            label: `semester-registration`,
            link: `/${role}/semester-registration`,
          },
        ]}
      />

      <ActionBar title="Create Semester Registration"></ActionBar>

      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker
                name="startDate"
                label="Start Date"
                size="large"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormDatePicker name="endDate" label="End Date" size="large" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <ACSemesterField
                name="academicSemesterId"
                label="Academic Semester"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="minCredit" label="Min Credit" type="number" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="maxCredit" label="Max Credit" type="number" />
            </div>
          </Col>
        </Row>

        <Button htmlType="submit" type="primary">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateSemesterRegistrationPage;
