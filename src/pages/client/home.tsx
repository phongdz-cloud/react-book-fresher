import { Col, Row } from "antd";
import Category from "@/components/home/category/category";
import Product from "@/components/home/product/product";
const HomePage = () => {
  return (
    <>
      <Row
        style={{ height: "100vh", padding: "10px 20px" }}
        gutter={15}
        wrap={true}
      >
        <Col xl={5} className="sm:block hidden">
          <Category />
        </Col>
        <Col xs={24} style={{ flex: 1 }}>
          <Product />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
