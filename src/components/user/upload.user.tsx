import { InboxOutlined } from "@ant-design/icons";
import { App, Modal, Table, Typography, UploadProps } from "antd";
import Title from "antd/es/typography/Title";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";

type IPropType = {
  isModalUploadOpen: boolean;
  setIsModalUploadOpen: (v: boolean) => void;
};
const dataSource = [
  //   {
  //     key: "1",
  //     fullName: "Mike",
  //     email: "phong@gmail.com",
  //     phone: "0375489103",
  //   },
];

const columns = [
  {
    title: "Tên hiển thị",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
];
const UploadFileUser = (props: IPropType) => {
  const { isModalUploadOpen, setIsModalUploadOpen } = props;

  const [isImportData, setIsImportData] = useState(true);

  const { message } = App.useApp();

  const handleOk = () => {
    setIsModalUploadOpen(false);
  };

  const handleCancel = () => {
    setIsModalUploadOpen(false);
  };

  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".csv,.xls,.xlsx",
    customRequest: ({ file, onSuccess }) => {
      console.log("file", file);
      onSuccess("ok");
    },
    onChange(info) {
      const { status } = info.file;
      console.log("info", info);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setIsImportData(false);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Modal
        title={<Title level={5}>Import data user</Title>}
        open={isModalUploadOpen}
        onOk={handleOk}
        okButtonProps={{ disabled: isImportData }}
        okText={"Import data"}
        onCancel={handleCancel}
        width={"50vw"}
      >
        <>
          <Dragger {...propsUpload}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Only accept .csv, .xls, .xlsx
            </p>
          </Dragger>
          <Table
            title={() => "Dữ liệu upload:"}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </>
      </Modal>
    </>
  );
};

export default UploadFileUser;
