"use client";

import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";

const ManageSemesterPage = () => {
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

  const { data, isLoading } = useAcademicSemestersQuery({ ...query });

  const academicSemesters = data?.semester;
  const meta = data?.meta;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: true,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      sorter: true,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      sorter: true,
    },
    {
      title: "Year",
      dataIndex: "year",
      sorter: true,
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
      title: "Action",
      // dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/${role}/academic/faculty/edit/${data?.id}`}>
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
            label: "admin",
            link: "/admin",
          },
        ]}
      />

      <ActionBar title="Academic Semester List">
        <Input
          type="text"
          size="large"
          placeholder="Search"
          style={{ width: "20%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Link href="/admin/academic/semester/create">
            <Button type="primary">Create Semester</Button>
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
        dataSource={academicSemesters}
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

export default ManageSemesterPage;
