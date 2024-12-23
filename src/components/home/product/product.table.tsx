import { Col, Flex, Image, Pagination, PaginationProps, Rate, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const ProductTable = () => {
  const dataMock = [1, 2, 3, 4, 5, 7, 7];
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  return (
    <>
      <Flex vertical={true}>
        <Row>
          {dataMock.map((data) => {
            return (
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={6}
                xl={6}
                style={{ marginBottom: "15px" }}
              >
                <div
                  style={{
                    width: "220px",
                  }}
                  className="flex flex-col justify-center items-center"
                >
                  <Image src="https://salt.tikicdn.com/cache/750x750/ts/product/4f/50/a4/c6b6cdf6e2f55d3df539df69268df74f.jpg.webp" />
                  <div className="px-5">
                    <Paragraph>
                      <p className="w-21 text-sm sm:w-50">
                        Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn
                        Và Sáng Suốt Hơn
                      </p>
                    </Paragraph>
                    <Paragraph>
                      <span>70.000 đ</span>
                    </Paragraph>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Rate
                        defaultValue={5}
                        disabled
                        className="text-sm sm:text-sm"
                      />
                      <span className="text-sm sm:text-xs">Đã bán 1k</span>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination total={500} itemRender={itemRender} />
          </Col>
        </Row>
      </Flex>
    </>
  );
};

export default ProductTable;
