import { getBooksAPI } from "@/services/api";
import {
  Col,
  Divider,
  Flex,
  Image,
  Pagination,
  PaginationProps,
  Rate,
  Row,
  Spin,
  Tabs,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

interface IProps {
  queryCategory: string[];
  price: number[];
}
const ProductTable = (props: IProps) => {
  const [books, setBooks] = useState<IBookTable[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [querySort, setQuerySort] = useState<string>("&sort=-sold");
  const { queryCategory, price } = props;

  const fetchDataBook = useCallback(async () => {
    setLoading(true);

    let queryData = "";
    if (queryCategory && queryCategory.length > 0) {
      queryData = `&category=${queryCategory.join(",")}`;
    }

    if (price && price.length > 0) {
      queryData += `&price>=${price[0]}&price<=${price[1]}`;
    }

    const res = await getBooksAPI(current, pageSize, queryData, querySort);
    if (res && res.data) {
      setBooks(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
    setLoading(false);
  }, [current, pageSize, price, queryCategory, querySort]);

  useEffect(() => {
    fetchDataBook();
  }, [fetchDataBook]);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const onChangeTab = (key: string) => {
    setQuerySort(key);
  };

  const items = useMemo(() => {
    return [
      {
        key: "&sort=-sold",
        label: "Phổ Biến",
        children: <></>,
      },
      {
        key: "&sort=-updateAt",
        label: "Hàng Mới",
        children: <></>,
      },
      {
        key: "&sort=price",
        label: "Giá Thấp Tới Cao",
        children: <></>,
      },
      {
        key: "&sort=-price",
        label: "Giá Cao Tới Thấp",
        children: <></>,
      },
    ];
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />

      <Spin spinning={loading} size="small" tip="loading...">
        <Flex vertical={true} gap={"10"}>
          <Row>
            {books.map((book) => {
              return (
                <Col xs={12} sm={8} md={6} lg={6} xl={6} key={book._id}>
                  <div className="h-[95%] flex flex-col justify-center items-center sm:w-[220px] sm:border-1 sm:border-solid sm:border-gray-50 mt-5 sm:shadow-sm">
                    <Image
                      src={
                        import.meta.env.VITE_BACKEND_URL +
                        "/images/book/" +
                        book.thumbnail
                      }
                      preview={false}
                    />
                    <div className="p-2 w-[160px] sm:w-[200px] flex flex-col gap-2">
                      <p className="text-sm sm:w-50 h-[70px]">
                        {book.mainText}
                      </p>
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(book?.price || 0)}
                      </span>
                      <div className="flex flex-col gap-1 sm:flex-row sm:gap-1 sm:items-center  ">
                        <Rate defaultValue={5} disabled className="text-sm" />
                        <span className="text-sm sm:text-xs">{`Đã bán ${book.sold}`}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col span={24}>
              <Divider />
            </Col>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="flex items-center justify-center mt-0"
            >
              <Pagination
                total={total}
                current={current}
                pageSize={pageSize}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Flex>
      </Spin>
    </>
  );
};

export default ProductTable;