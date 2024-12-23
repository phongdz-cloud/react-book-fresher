import { Col, Row } from "antd";
import Category from "@/components/home/category/category";
import Product from "@/components/home/product/product";
const HomePage = () => {
  return (
    <>
      <Row style={{ height: "100vh", padding: "10px 20px" }} gutter={15}>
        <Col span={4} className="sm:block hidden">
          <Category />
        </Col>
        <Col xs={24} lg={20} xl={20}>
          <Product />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
