"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import { useAddRoomMutation } from "@/redux/api/roomApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateRoomPage = () => {
  const { role } = getUserInfo() as any;
  const [addRoom] = useAddRoomMutation();

  const { data, isLoading } = useBuildingsQuery({
    limit: 100,
    page: 1,
  });
  const buildings = data?.buildings;
  const buildingOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating...");
      console.log(data);
      const res = await addRoom(data).unwrap();

      if (!!res?.id) {
        message.success("Room added successfully");
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
            label: `room`,
            link: `/${role}/room`,
          },
        ]}
      />

      <ActionBar title="Create Room"></ActionBar>

      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="roomNumber" label="Room No." />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="floor" label="Floor" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                size="large"
                name="buildingId"
                options={buildingOptions as SelectOptions[]}
                label="Building"
                placeholder="Select"
              />
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

export default CreateRoomPage;
