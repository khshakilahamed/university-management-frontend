import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";

const LocalGuardianInfo = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Local Guardian Information
      </p>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="text"
            name="student.localGuardian.name"
            size="large"
            label="Local Guardian Name"
          />
        </Col>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="text"
            name="student.localGuardian.occupation"
            size="large"
            label="Local Guardian Occupation"
          />
        </Col>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="text"
            name="student.localGuardian.contactNo"
            size="large"
            label="Local Guardian Contact No."
          />
        </Col>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="text"
            name="student.localGuardian.address"
            size="large"
            label="Local Guardian Address"
          />
        </Col>
      </Row>
    </div>
  );
};

export default LocalGuardianInfo;
