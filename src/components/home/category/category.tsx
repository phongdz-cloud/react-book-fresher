import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Flex, Input, Rate, Row } from "antd";

const Category = () => {
  return (
    <Row>
      <Col span={24}>
        <Row justify={"space-between"}>
          <Col>
            <FilterOutlined /> <span>Bộ lọc tìm kiếm</span>
          </Col>
          <Col>
            <RedoOutlined rotate={250} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row style={{ margin: "15px 0px" }}>
          <Col span={24}>
            <p>Danh mục sản phẩm</p>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Checkbox.Group style={{ width: "100%" }}>
          <Row gutter={10}>
            <Col span={24}>
              <Checkbox value="A">A</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="B">B</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="C">C</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="D">D</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="E">E</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Col>
      <Col span={24}>
        <Divider></Divider>
      </Col>
      <Col span={24}>
        <Row>
          <Col>
            <p>Khoảng giá</p>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col span={8}>
            <Input />
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>-</span>
          </Col>
          <Col span={8}>
            <Input />
          </Col>
        </Row>
        <Row style={{ marginTop: "40px" }}>
          <Col span={24}>
            <Button type="primary" style={{ width: "100%" }}>
              Áp dụng
            </Button>
            <Divider />
          </Col>
        </Row>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <p>Đánh giá</p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Rate defaultValue={5} disabled />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Flex gap="middle">
                <Rate defaultValue={4} disabled />
                <span>trở lên</span>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Flex gap="middle">
                <Rate defaultValue={3} disabled />
                <span>trở lên</span>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Flex gap="middle">
                <Rate defaultValue={2} disabled />
                <span>trở lên</span>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Flex gap="middle">
                <Rate defaultValue={1} disabled />
                <span>trở lên</span>
              </Flex>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  );
};

export default Category;
