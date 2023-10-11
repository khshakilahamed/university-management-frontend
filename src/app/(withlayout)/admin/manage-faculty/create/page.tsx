"use client";

import ACDepartmentField from "@/components/Forms/ACDepartmentField";
import ACFacultyField from "@/components/Forms/ACFacultyField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useAddFacultyWithFormDataMutation } from "@/redux/api/facultyApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateFaculty = () => {
  const { role } = getUserInfo() as any;
  const [addFacultyWithFormData] = useAddFacultyWithFormDataMutation();

  const adminOnSubmit = async (values: any) => {
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

      const res = await addFacultyWithFormData(formData);

      if (!!res) {
        message.success("Faculty created successfully");
      }
    } catch (error: any) {
      console.error(error.message);
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
            label: "manage-faculty",
            link: `/${role}/manage-faculty`,
          },
        ]}
      />
      <h1>Create Faculty</h1>

      <div>
        <Form submitHandler={adminOnSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Faculty Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.name.firstName"
                  size="large"
                  label="First Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.name.middleName"
                  size="large"
                  label="Middle Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.name.lastName"
                  size="large"
                  label="Last Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="faculty.gender"
                  options={genderOptions}
                  label="Gender"
                  placeholder="Select"
                />
              </Col>
              <Col
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <ACFacultyField
                  name="faculty.academicFaculty"
                  label="Academic Faculty"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <ACDepartmentField
                  name="faculty.academicDepartment"
                  label="Academic Department"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file" />
              </Col>
            </Row>
          </div>

          {/* basic info */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Basic Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="email"
                  name="faculty.email"
                  size="large"
                  label="Email address"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.contactNo"
                  size="large"
                  label="Contact No."
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.emergencyContactNo"
                  size="large"
                  label="Emergency Contact No."
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="faculty.dateOfBirth"
                  label="Date of birth"
                  size="large"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="faculty.bloodGroup"
                  options={bloodGroupOptions}
                  label="Blood group"
                  placeholder="Select"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="faculty.designation"
                  size="large"
                  label="Designation"
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="faculty.presentAddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="faculty.permanentAddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateFaculty;
