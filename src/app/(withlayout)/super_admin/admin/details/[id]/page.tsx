"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAdminQuery } from "@/redux/api/adminApi";
import { Row } from "antd";
import Image from "next/image";

const AdminDetails = ({ params }: { params: any }) => {
  const { id } = params;

  const { data } = useAdminQuery(id);
  console.log(data);

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "admin",
            link: "/super_admin/admin",
          },
        ]}
      />

      <ActionBar title="Admin Details"></ActionBar>
      <Row justify={"center"}>
        <div>
          <Image
            src={data?.profileImage}
            width={100}
            height={100}
            style={{ width: "200px", height: "200px" }}
            alt="admin profile"
          />
        </div>
        <div
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            fontSize: "18px",
            lineHeight: "22px",

            fontWeight: "700",
          }}
        >
          <p>ID: {data?.id}</p>
          <p>
            Name: {data?.name?.firstName} {data?.name?.middleName}{" "}
            {data?.name?.lastName}
          </p>
          <p>Email: {data?.email}</p>
          <p>Management Department: {data?.managementDepartment?.title}</p>
          <p>Designation: {data?.designation}</p>
          <p>Gender: {data?.gender}</p>
          <p>Date of Birth: {data?.dateOfBirth}</p>
          <p>Blood Group: {data?.bloodGroup}</p>
          <p>Contact Number: {data?.contactNo}</p>
          <p>Emergency Contact Number: {data?.emergencyContactNo}</p>
          <p>Permanent Address: {data?.permanentAddress}</p>
          <p>Present Address: {data?.presentAddress}</p>
        </div>
      </Row>
    </div>
  );
};

export default AdminDetails;
