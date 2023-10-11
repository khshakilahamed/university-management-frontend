"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import { useAddCourseMutation, useCoursesQuery } from "@/redux/api/courseApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateCoursePage = () => {
  const { role } = getUserInfo() as any;
  const [addCourse] = useAddCourseMutation();

  const { data, isLoading } = useCoursesQuery({ limit: 100, page: 1 });

  const courses = data?.courses;
  const coursesOptions = courses?.map((course: any) => {
    return {
      label: course.title,

      value: course.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.credits = parseInt(data.credits);

    const preRequisiteCoursesOptions = data?.preRequisiteCourses?.map(
      (course: string) => {
        return {
          courseId: course,
        };
      }
    );

    data.preRequisiteCourses = preRequisiteCoursesOptions;
    console.log(data);

    try {
      message.loading("Creating...");
      const res = await addCourse(data).unwrap();

      if (!!res?.id) {
        message.success("Course added successfully");
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
            label: `course`,
            link: `/${role}/course`,
          },
        ]}
      />

      <ActionBar title="Create Course"></ActionBar>

      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="code" label="Course Code" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="credits" label="Course Credits" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormMultiSelectField
                options={coursesOptions as SelectOptions[]}
                name="preRequisiteCourses"
                label="Pre Requisite Courses"
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

export default CreateCoursePage;
