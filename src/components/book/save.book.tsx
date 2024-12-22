import { getCategoryBookAPI } from "@/services/api";
import { PlusOutlined } from "@ant-design/icons";
import {
  App,
  Col,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { BaseOptionType } from "antd/es/select";
import { RcFile } from "antd/lib/upload";
import { useEffect, useState } from "react";

type IPropType = {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
};
type FieldType = {
  thumbnail?: UploadFile[];
  slider?: UploadFile[];
  mainText?: string;
  author?: string;
  price?: number;
  quantity?: number;
  category?: string;
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const SaveBook = (props: IPropType) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileThumbnail, setFileThumbnail] = useState<UploadFile[]>([]);

  const [previewSliderOpen, setPreviewSliderOpen] = useState(false);
  const [previewSliderImage, setPreviewSliderImage] = useState("");
  const [fileSlider, setFileSlider] = useState<UploadFile[]>([]);
  const [options, setOptions] = useState<BaseOptionType[]>([]);

  // fetch category
  useEffect(() => {
    const fetchCategoryBook = async () => {
      const res = await getCategoryBookAPI();
      if (res.data) {
        const data = res.data.map((item) => ({
          label: item,
          value: item,
        }));

        setOptions(data);
      }
    };

    fetchCategoryBook();
  }, []);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    resetDataModal();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("values", values);

    const { thumbnail, slider } = values;

    const filterDataThumb = thumbnail?.[0].error ? [] : thumbnail;

    const filterDataSlider = slider?.filter((item) => !item.error);

    console.log({
      ...values,
      thumbnail: filterDataThumb,
      slider: filterDataSlider,
    });

    resetDataModal();
  };

  const resetDataModal = () => {
    form.resetFields();
    setIsModalOpen(false);
    setFileThumbnail([]);
    setPreviewImage("");
    setPreviewOpen(false);
    setFileSlider([]);
    setPreviewSliderImage("");
    setPreviewSliderOpen(false);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    const { fileList } = info;
    if (info.file.status === "done") {
      setFileThumbnail(
        fileList.filter((file: UploadFile) => file.status === "done")
      );
    } else {
      info.fileList = [];
    }
  };

  const updatePropThumbnail: UploadProps = {
    name: "thumbnail",
    listType: "picture-card",
    fileList: fileThumbnail,
    onPreview: handlePreview,
    onChange: handleChange,
    multiple: false,
    maxCount: 1,
    beforeUpload: () => {
      return true;
    },
    customRequest: ({ file, onSuccess, onError }) => {
      // Kiểm tra file trước khi gọi onSuccess
      const isValid = beforeUpload(file as RcFile); // Kiểm tra file hợp lệ
      if (isValid) {
        // Chỉ khi file hợp lệ mới trả về thành công
        if (onSuccess) {
          onSuccess("ok"); // Thông báo thành công
        }
      } else {
        // Nếu file không hợp lệ, gọi onError
        if (onError) {
          onError(new Error("File not valid"));
        }
      }
    },
  };

  const handlePreviewSlider = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewSliderImage(file.url || (file.preview as string));
    setPreviewSliderOpen(true);
  };

  const handleChangeSlider: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileSlider(newFileList);
  };

  const updatePropSlider: UploadProps = {
    listType: "picture-card",
    fileList: fileSlider,
    onPreview: handlePreviewSlider,
    onChange: handleChangeSlider,
    multiple: true,
    beforeUpload: () => {
      return true;
    },
    customRequest: ({ file, onSuccess, onError }) => {
      // Kiểm tra file trước khi gọi onSuccess
      const isValid = beforeUpload(file as RcFile); // Kiểm tra file hợp lệ
      if (isValid) {
        // Chỉ khi file hợp lệ mới trả về thành công
        if (onSuccess) {
          onSuccess("ok"); // Thông báo thành công
        }
      } else {
        // Nếu file không hợp lệ, gọi onError
        if (onError) {
          onError(new Error("File not valid"));
        }
      }
    },
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const normFile = (e: { fileList: UploadFile[]; file: UploadFile }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Modal
        title="Thêm mới book"
        open={isModalOpen}
        onOk={handleOk}
        okText="Tạo mới"
        onCancel={handleCancel}
        cancelText="Hủy"
        width={"60vw"}
        maskClosable={false}
      >
        <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Tên sách"
                name="mainText"
                rules={[
                  { required: true, message: "Tên sách không được để trống" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Tác giả"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Tên tác giả không được để trống ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Giá tiền"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Giá tiền không được để trống",
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter="đ"
                      formatter={(value) => {
                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldType>
                    label="Thể loại"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Thể loại không được để trống",
                      },
                    ]}
                  >
                    <Select options={options} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={6}>
              <Form.Item<FieldType>
                label="Số lượng"
                name="quantity"
                rules={[
                  { required: true, message: "Số lượng không được để trống" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Ảnh thumbnail"
                name="thumbnail"
                rules={[
                  {
                    required: true,
                    message: "Ảnh Thumbnail không được để trống ",
                  },
                ]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload {...updatePropThumbnail}>{uploadButton}</Upload>
              </Form.Item>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Ảnh slider"
                name="slider"
                rules={[
                  {
                    required: true,
                    message: "Ảnh Slider không được để trống ",
                  },
                ]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload {...updatePropSlider}>{uploadButton}</Upload>
              </Form.Item>
              {previewSliderImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewSliderOpen,
                    onVisibleChange: (visible) => setPreviewSliderOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewSliderImage(""),
                  }}
                  src={previewSliderImage}
                />
              )}
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default SaveBook;
