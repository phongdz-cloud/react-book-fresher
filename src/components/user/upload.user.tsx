import { InboxOutlined } from "@ant-design/icons";
import { App, Modal, Table, UploadProps } from "antd";
import Title from "antd/es/typography/Title";
import Dragger from "antd/es/upload/Dragger";
import ExcelJS from "exceljs";
import { useState } from "react";
type IPropType = {
  isModalUploadOpen: boolean;
  setIsModalUploadOpen: (v: boolean) => void;
};
type FieldType = {
  fullName?: string;
  email?: string;
  phone?: string;
};
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

  const [dataSource, setDataSource] = useState<FieldType[]>([]);

  const { message } = App.useApp();

  const handleOk = () => {
    setIsModalUploadOpen(false);
  };

  const handleCancel = () => {
    setIsModalUploadOpen(false);
    setDataSource([]);
  };

  const propsUpload: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".csv,.xls,.xlsx",
    customRequest: ({ file, onSuccess }) => {
      const reader = new FileReader();
      const workbook = new ExcelJS.Workbook();
      reader.onload = async (e) => {
        const fileBuffer = e.target?.result;
        await workbook.xlsx.load(fileBuffer as ArrayBuffer);
        setDataSource([]);
        workbook.eachSheet((worksheet) => {
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [_, fullName, email, phone] = Array.isArray(row.values)
                ? row.values
                : [];
              setDataSource((prev) => [
                ...prev,
                {
                  fullName: fullName?.toString() || "",
                  email: email?.toString() || "",
                  phone: phone?.toString() || "",
                },
              ]);
            }
          });
        });
        if (onSuccess) {
          onSuccess("ok");
        }
      };
      reader.readAsArrayBuffer(file as Blob);
    },
    onChange(info) {
      const { status } = info.file;
      console.log("info", info);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
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
        okButtonProps={{ disabled: dataSource.length === 0 }}
        okText={"Import data"}
        onCancel={handleCancel}
        width={"50vw"}
        destroyOnClose={isModalUploadOpen}
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
          />
        </>
      </Modal>
    </>
  );
};

export default UploadFileUser;
