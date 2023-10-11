"use client";

import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import UMTable from "@/components/ui/UMTable";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks";
import { useStudentsQuery } from "@/redux/api/studentApi";

const ManageStudentsPage = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debounceSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debounceSearchTerm) {
    query["searchTerm"] = debounceSearchTerm;
  }

  const { data, isLoading } = useStudentsQuery({ ...query });

  const students = data?.students;
  const meta = data?.meta;

  // console.log(students);

  const columns = [
    {
      title: "Id",
      dataIndex: "studentId",
      sorter: true,
    },
    {
      title: "Name",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;

        return <>{fullName}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Contact no.",
      dataIndex: "contactNo",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: true,
    },
    {
      title: "Action",
      // dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/${role}/faculty/edit/${data?.id}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              style={{
                margin: "0px 5px",
              }}
              // onClick={() => deleteHandler(data?.id)}
              type="primary"
            >
              <EyeOutlined />
            </Button>
            <Button
              // onClick={() => deleteHandler(data?.id)}
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
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
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

      <ActionBar title="Student List">
        <Input
          type="text"
          size="large"
          placeholder="Search"
          style={{ width: "20%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Link href="/admin/manage-student/create">
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
        dataSource={students}
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

export default ManageStudentsPage;
