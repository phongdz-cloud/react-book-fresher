import { deleteBookLocalStorage } from "@/services/book.service";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, Form, FormProps, Image, InputNumber, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useMemo } from "react";
import { useCurrentApp } from "../context/app.context";

interface FieldType {
  quantity?: number;
  total?: number;
  _id: string;
}
const OrderDetail = () => {
  const [form] = useForm();
  const { carts, setCarts } = useCurrentApp();

  const total = useMemo(() => {
    return carts?.reduce((acc, cart) => {
      return acc + cart.detail.price * cart.quantity;
    }, 0);
  }, [carts]);

  const baseUrl = useMemo(() => {
    return import.meta.env.VITE_BACKEND_URL + "/images/book/";
  }, []);

  const handleDeleteBook = (id: string) => {
    const newCarts = deleteBookLocalStorage(id);

    if (newCarts) {
      setCarts(newCarts);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    console.log("values", values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFieldChange = (changedFields: any) => {
    if (changedFields) {
      const _id = changedFields[0].name[1];
      const quantity = changedFields[0].value;
      const index = carts.findIndex((cart) => cart._id === _id);

      if (index !== -1) {
        const cart = carts[index];
        cart.quantity = quantity;
        setCarts([...carts]);
        localStorage.setItem("carts", JSON.stringify(carts));
      }
    }
  };

  return (
    <>
      <div className="w-full bg-gray-200">
        <div className="p-10">
          <Form
            name="basic"
            onFinish={onFinish}
            form={form}
            onFieldsChange={onFieldChange}
          >
            <Row gutter={12}>
              <Col span={18}>
                <Row gutter={[12, 12]}>
                  {carts?.map((cart) => {
                    return (
                      <Col span={24} key={cart._id}>
                        <div className="p-5 bg-white flex justify-between items-center border-solid rounded-lg border-white">
                          <Col>
                            <div>
                              <Image
                                width={80}
                                src={baseUrl + cart.detail.thumbnail}
                                preview={false}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <p className="text-[13px] capitalize break-words min-w-[200px] max-w-[200px]">
                                {cart.detail.mainText}
                              </p>
                            </div>
                          </Col>
                          <Col>
                            <div className="flex items-center justify-center space-x-2 ">
                              <div className="flex justify-center items-center space-x-2 min-w-[140px]">
                                <span className="text-[14px]">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(cart.detail.price)}
                                </span>
                                <Form.Item
                                  name={["quantity", cart?._id]}
                                  noStyle={true}
                                  initialValue={cart.quantity}
                                >
                                  <InputNumber min={1} max={1000} />
                                </Form.Item>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="flex items-center space-x-2 ">
                              <span className="text-[14px]">Tổng: </span>
                              <span className="text-[14px]">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(cart.detail.price * cart.quantity)}
                              </span>
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <DeleteOutlined
                                className="text-pink-500 cursor-pointer"
                                onClick={() => handleDeleteBook(cart._id)}
                              />
                            </div>
                          </Col>

                          {/* <div>
                            <Image
                              width={80}
                              src={baseUrl + cart.detail.thumbnail}
                              preview={false}
                            />
                          </div>
                          <div>
                            <p className="text-[13px] capitalize break-words min-w-[200px] max-w-[200px]">
                              {cart.detail.mainText}
                            </p>
                          </div>
                          <div className="flex items-center justify-center space-x-2 ">
                            <div className="flex justify-center items-center space-x-2 min-w-[140px]">
                              <span className="text-[14px]">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(cart.detail.price)}
                              </span>
                              <Form.Item
                                name={["quantity", cart?._id]}
                                noStyle={true}
                                initialValue={cart.quantity}
                              >
                                <InputNumber min={1} max={1000} />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 justify-between">
                            <span className="text-[14px]">Tổng: </span>
                            <span className="text-[14px]">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(cart.detail.price * cart.quantity)}
                            </span>
                          </div>
                          <div>
                            <DeleteOutlined
                              className="text-pink-500 cursor-pointer"
                              onClick={() => handleDeleteBook(cart._id)}
                            />
                          </div> */}
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col span={6}>
                <div className="bg-white border-solid rounded-lg border-gray-100 p-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tạm tính</span>
                    <span className="text-sm">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}
                    </span>
                  </div>
                  <div>
                    <Divider />
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng tiền</span>
                    <span className="text-lg text-orange-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(total)}
                    </span>
                  </div>
                  <div>
                    <Divider />
                  </div>
                  <div>
                    <button
                      className={
                        carts?.length > 0
                          ? "w-full px-3 h-[40px] bg-orange-600 text-white rounded-sm border-none cursor-pointer hover:bg-orange-500"
                          : "w-full px-3 h-[40px] bg-gray-600 text-white rounded-sm border-none "
                      }
                    >
                      Mua Hàng ({carts?.length})
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
