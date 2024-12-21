import { deleteUsersAPI } from "@/services/api";
import { DeleteOutlined } from "@ant-design/icons";
import { ActionType } from "@ant-design/pro-components";
import { App, Button, Popconfirm, PopconfirmProps } from "antd";
import { MutableRefObject } from "react";

type IPropType = {
  _id: string;
  actionRef: MutableRefObject<ActionType | undefined>;
};
const DeleteUser = (props: IPropType) => {
  const { _id, actionRef } = props;
  const { notification, message } = App.useApp();

  const confirm: PopconfirmProps["onConfirm"] = async () => {
    const res = await deleteUsersAPI(_id);
    if (res.data) {
      message.success("Xoá user thành công");
      actionRef.current?.reload();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <Popconfirm
      title="Xác nhận xoá user"
      description="Bạn có chắc chắn muốn xoá user này không ?"
      onConfirm={confirm}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <DeleteOutlined style={{ cursor: "pointer", color: "#ff4d4f" }} />
    </Popconfirm>
  );
};

export default DeleteUser;
