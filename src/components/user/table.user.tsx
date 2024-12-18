import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUsersAPI } from "@/services/api";
import dayjs from "dayjs";
import { dateRangeValidate } from "@/helper/date.helper";

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
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [users, setUsers] = useState<IUserTable[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [createAt, setCreateAt] = useState<string[]>([]);
  const actionRef = useRef<ActionType>();

  const fetchUserList = useCallback(async () => {
    let queryDate: string = "";
    const dataRange = dateRangeValidate(createAt);
    if (dataRange && dataRange.length > 0) {
      console.log("dataRange", dataRange);
      queryDate = `&createdAt>=${dataRange[0]}&createdAt<=${dataRange[1]}`;
    }
    const res = await getUsersAPI(
      current,
      pageSize,
      fullName,
      email,
      queryDate
    );

    if (res && res.data) {
      setCurrent(+res.data?.meta.current);
      setPageSize(+res.data?.meta.pageSize);
      setTotal(res.data?.meta.total);
      setUsers(res.data?.result);
    }
  }, [current, pageSize, fullName, email, createAt]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  return (
    <>
      <ProTable<IUserTable>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        dataSource={users}
        rowKey="_id"
        request={async (params, sort, filter) => {
          setFullName(params.fullName);
          setEmail(params.email);
          setCreateAt(params.createdAt);
          return {};
        }}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
          },
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
