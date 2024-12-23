import { Tabs, TabsProps } from "antd";
import ProductTable from "./product.table";

const Product = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Phổ Biến",
      children: <ProductTable />,
    },
    {
      key: "2",
      label: "Hàng Mới",
      children: <ProductTable />,
    },
    {
      key: "3",
      label: "Giá Thấp Tới Cao",
      children: <ProductTable />,
    },
    {
      key: "4",
      label: "Giá Cao Tới Thấp",
      children: <ProductTable />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default Product;
