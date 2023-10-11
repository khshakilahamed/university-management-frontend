"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormYearPicker from "@/components/Forms/FormYearPicker";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { monthOptions } from "@/constants/global";
import { useAddAcademicDepartmentMutation } from "@/redux/api/academic/departmentApi";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { useAddAcademicSemesterMutation } from "@/redux/api/academic/semesterApi";
import { getUserInfo } from "@/services/auth.service";
import { IAcademicFaculty } from "@/types";
import { Button, Col, Row, message } from "antd";

const semesterOptions = [
  {
    label: "Autumn",
    value: "Autumn",
  },
  {
    label: "Summer",
    value: "Summer",
  },
  {
    label: "Fall",
    value: "Fall",
  },
];

const CreateAcademicSemester = () => {
  const { role } = getUserInfo() as any;
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
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
    if (data?.title == "Autumn") data["code"] = "01";
    else if (data?.title == "Summer") data["code"] = "02";
    else data["code"] = "03";

    data.year = parseInt(data.year);

    // console.log(data);
    try {
      message.loading("Creating...");
      const res = await addAcademicSemester(data);

      if (!!res) {
        message.success("Academic Semester created successfully");
      }
    } catch (error: any) {
      //   console.error(error.message);
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
            label: "academic-semester",
            link: `/${role}/academic/semester`,
          },
        ]}
      />
      <h1>Create Academic Semester</h1>

      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="title"
                options={semesterOptions}
                label="Title"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="startMonth"
                options={monthOptions}
                label="Start Month"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormSelectField
                size="large"
                name="endMonth"
                options={monthOptions}
                label="End Month"
                placeholder="Select"
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <FormYearPicker name="year" label="Year" picker="year" />
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

export default CreateAcademicSemester;
