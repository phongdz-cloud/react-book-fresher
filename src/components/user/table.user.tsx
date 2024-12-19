import { dateRangeValidate } from "@/helper/date.helper";
import { getUsersAPI } from "@/services/api";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import dayjs from "dayjs";
import { useRef, useState } from "react";

const columns: ProColumns<IUserTable>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "Id",
    dataIndex: "_id",
    render: (index, record) => {
      return <a href="#">{record._id}</a>;
    },
    search: false,
  },
  { title: "Full Name", dataIndex: "fullName" },
  { title: "Email", dataIndex: "email", copyable: true },
  {
    title: "Created At",
    dataIndex: "createdAt",
    valueType: "dateRange",
    render(dom, entity, index, action, schema) {
      return <span>{dayjs(entity?.createdAt).format("YYYY-MM-DD")}</span>;
    },
  },
  {
    title: "Action",
    search: false,
    render(dom, entity, index, action, schema) {
      return (
        <div style={{ display: "flex", gap: "15px" }}>
          <EditOutlined
            color="#f57800"
            style={{ cursor: "pointer", color: "orange" }}
          />
          <DeleteOutlined style={{ cursor: "pointer", color: "#ff4d4f" }} />
        </div>
      );
    },
  },
];

const TableUser = () => {
  const actionRef = useRef<ActionType>();
  const [pageSize, setPageSize] = useState<number>(5);
  return (
    <>
      <ProTable<IUserTable>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowKey="_id"
        request={async (params, sort, filter) => {
          console.log("params", params);
          const { current, fullName, email, createdAt } = params; // destructuring params
          let query = "";

          if (pageSize !== params.pageSize) {
            setPageSize(params.pageSize || 5);
          }

          if (fullName) {
            query += `&fullName=/${fullName}/i`;
          }

          if (email) {
            query += `&email=/${email}/i`;
          }

          if (createdAt) {
            const dateRange = dateRangeValidate(createdAt);
            if (dateRange) {
              query += `&createdAt>=${dateRange[0]}&createdAt<=${dateRange[1]}`;
            }
          }
          const res = await getUsersAPI(current || 1, pageSize || 5, query);
          return {
            data: res.data?.result,
            success: true,
            total: res.data?.meta.total,
            pageSize: res.data?.meta.pageSize,
            page: res.data?.meta.current,
          };
        }}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} rows`,
        }}
        dateFormatter="string"
        headerTitle="Table user"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            Add new
          </Button>,
        ]}
      />
    </>
  );
};

export default TableUser;
