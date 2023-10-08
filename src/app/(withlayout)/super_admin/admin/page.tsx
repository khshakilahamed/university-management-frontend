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
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";
import { useAdminsQuery, useDeleteAdminMutation } from "@/redux/api/adminApi";
import { IDepartment } from "@/types";

const ManageAdmin = () => {
  const { role } = getUserInfo() as any;
  const [deleteAdmin] = useDeleteAdminMutation();

  const query: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // const [deleteDepartment] = useDeleteDepartmentMutation();

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

  const { data, isLoading } = useAdminsQuery({ ...query });

  const admins = data?.admins;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting...");
      await deleteAdmin(id);

      message.success("Admin deleted successfully");
    } catch (error: any) {
      console.error(error.message);
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Department",
      dataIndex: "managementDepartment",
      render: function (data: IDepartment) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Designation",
      dataIndex: "designation",
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
      title: "Action",
      // dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/admin/details/${data?.id}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/super_admin/admin/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
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
    // console.log("Page: ", page, "Pagesize: ", pageSize);
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

      <ActionBar title="Admin List">
        <Input
          type="text"
          size="large"
          placeholder="Search"
          style={{ width: "20%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Link href="/super_admin/admin/create">
            <Button type="primary">Create Admin</Button>
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
        dataSource={admins}
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

export default ManageAdmin;
