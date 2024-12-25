import { Col, Divider, Flex, Image, Pagination, Rate, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const ProductTable = () => {
  const dataMock = [1, 2, 3, 4, 5, 7, 7];
  return (
    <>
      <Flex vertical={true}>
        <Row>
          {dataMock.map((_, index) => {
            return (
              <Col xs={12} sm={8} md={6} lg={6} xl={6} key={index}>
                <div className=" flex flex-col justify-center items-center sm:w-[220px] sm:border-1 sm:border-solid sm:border-gray-50 mb-2 sm:shadow-sm">
                  <Image
                    src="https://salt.tikicdn.com/cache/750x750/ts/product/4f/50/a4/c6b6cdf6e2f55d3df539df69268df74f.jpg.webp"
                    preview={false}
                  />
                  <div className="p-2 w-[160px] sm:w-[200px]">
                    <Paragraph>
                      <p className="w-21 text-sm sm:w-50">
                        Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn
                        Và Sáng Suốt Hơn
                      </p>
                    </Paragraph>
                    <Paragraph>
                      <span>70.000 đ</span>
                    </Paragraph>
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-1 sm:items-center  ">
                      <Rate defaultValue={5} disabled className="text-sm" />
                      <span className="text-sm sm:text-xs">Đã bán 1k</span>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Divider />
        <Row>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="flex items-center justify-center mt-2"
          >
            {/* <Pagination total={500} itemRender={itemRender} /> */}
            <Pagination size="default" total={500} />
          </Col>
        </Row>
      </Flex>
    </>
  );
};

export default ProductTable;
