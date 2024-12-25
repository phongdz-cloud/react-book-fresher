import { getCategoryBookAPI } from "@/services/api";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Flex, Input, Rate, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";

const Category = () => {
  const rates: number[] = [5, 4, 3, 2, 1];
  const [category, setCategory] = useState<string[]>([]);

  // fetch category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryBookAPI();

        if (response && response.data) {
          setCategory(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="p-5 border-2 border-solid border-gray-100">
      <Row>
        <Col span={24}>
          <Row justify={"space-between"}>
            <Col>
              <Paragraph>
                <div className="flex gap-2">
                  <FilterOutlined />
                  <span>Bộ lọc tìm kiếm</span>
                </div>
              </Paragraph>
            </Col>
            <Col>
              <RedoOutlined rotate={250} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row style={{ margin: "15px 0px" }}>
            <Col span={24}>
              <Paragraph>
                <p>Danh mục sản phẩm</p>
              </Paragraph>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              {category.map((cate, index) => {
                return (
                  <Col span={24} key={index} style={{ marginBottom: "10px" }}>
                    <Checkbox value={cate}>
                      <span>{cate}</span>
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Col>
        <Col span={24}>
          <Divider></Divider>
        </Col>
        <Col span={24}>
          <Row>
            <Col>
              <Paragraph>Khoảng giá</Paragraph>
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
          <Row>
            <Col span={24}>
              <Paragraph>Đánh giá</Paragraph>
            </Col>
            {rates.map((rateNumber, index) => {
              return (
                <Col span={24} key={index}>
                  <Flex gap="middle">
                    <Rate
                      defaultValue={rateNumber}
                      disabled
                      className="text-sm"
                    />
                    <span>trở lên</span>
                  </Flex>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Category;
