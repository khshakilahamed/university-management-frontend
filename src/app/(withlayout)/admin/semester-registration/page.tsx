"use client";

import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import {
  useBuildingsQuery,
  useDeleteBuildingMutation,
} from "@/redux/api/buildingApi";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import { useDeleteRoomMutation, useRoomsQuery } from "@/redux/api/roomApi";
import {
  useDeleteSemesterRegistrationsMutation,
  useSemesterRegistrationsQuery,
} from "@/redux/api/semesterRegistrationApi";

const SemesterRegistration = () => {
  const { role } = getUserInfo() as any;

  const query: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteSemesterRegistration] = useDeleteSemesterRegistrationsMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debounceTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debounceTerm) {
    query["searchTerm"] = debounceTerm;
  }

  const { data, isLoading } = useSemesterRegistrationsQuery({ ...query });

  const semesterRegistrations = data?.semesterRegistrations;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");

    try {
      await deleteSemesterRegistration(id);

      message.success("Semester Registration deleted successfully");
    } catch (error: any) {
      console.error(error.message);
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "academic Semester",
      dataIndex: "academicSemester",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
      sorter: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
      // sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            {/* <Button onClick={() => console.log(data)} type="primary">
              <EyeOutlined />
            </Button> */}
            <Link href={`/${role}/course/edit/${data?.id}`}>
              <Button
                style={{ margin: "0px 5px" }}
                // onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page: ", page, "Pagesize: ", pageSize);
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />

      <ActionBar title="Semester Registration List">
        <Input
          type="text"
          size="large"
          placeholder="Search"
          style={{ width: "20%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Link href={`/${role}/semester-registration/create`}>
            <Button type="primary">Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={semesterRegistrations}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default SemesterRegistration;
