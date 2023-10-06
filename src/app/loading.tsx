import { Alert, Row, Space, Spin } from "antd";

const Loading = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Space>
        {/* <Space> */}
        <Spin tip="Loading" size="large"></Spin>
        {/* </Space> */}
      </Space>
    </Row>
  );
};

export default Loading;
