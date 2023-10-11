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

const BuildingPage = () => {
  const { role } = getUserInfo() as any;

  const query: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteBuilding] = useDeleteBuildingMutation();

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

  const { data, isLoading } = useBuildingsQuery({ ...query });

  const buildings = data?.buildings;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");

    try {
      await deleteBuilding(id);

      message.success("Building deleted successfully");
    } catch (error: any) {
      console.error(error.message);
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
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
            <Link href={`/${role}/department/edit/${data?.id}`}>
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

      <ActionBar title="Building List">
        <Input
          type="text"
          size="large"
          placeholder="Search"
          style={{ width: "20%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <Link href={`/${role}/building/create`}>
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
        dataSource={buildings}
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

export default BuildingPage;
