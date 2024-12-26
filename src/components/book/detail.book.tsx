import { ShoppingCartOutlined } from "@ant-design/icons";
import { Col, Rate, Row } from "antd";
import { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import ModalDetailBook from "./modal.detai.book";
const BookDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refGallery = useRef<ImageGallery>(null);
  const [images, setImages] = useState([
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/1000/600/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ]);

  return (
    <>
      <Row gutter={20}>
        {/* Image */}
        <Col xs={0} xl={8}>
          <div className="cursor-pointer">
            <ImageGallery
              ref={refGallery}
              items={images}
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
          </div>
        </Col>
        <Col xs={24} xl={0}>
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            showThumbnails={false}
          />
        </Col>
        <Col xl={16}>
          <div className="flex flex-col space-y-5 mt-10 sm:mt-0">
            <div className="flex space-x-1">
              <p className="text-sm font-normal">Tác giả: </p>
              <span className="text-sm text-blue-400">Jo Hemmings</span>
            </div>

            <p className="text-[24px] text-[#676666] font-[150] capitalize">
              How Psychology Works - hiểu hết về tâm lý học
            </p>

            <div className="flex items-center space-x-3 font-[100]">
              <Rate defaultValue={5} disabled className="text-sm" />
              <span className="text-[15px]">Đã bán 6969</span>
            </div>

            <div className="bg-gray-100 h-20 flex items-center ">
              <p className="ml-5 text-[30px] text-orange-600 font-semibold">
                696.966.666 đ
              </p>
            </div>

            <div className="flex space-x-10">
              <p className="text-[#676666] font-normal text-[13px]">
                Vận chuyển
              </p>
              <p className="text-[13px]">Miễn phí vận chuyển</p>
            </div>

            <div className="flex item-center  space-x-5 w-full">
              <p className="flex items-center justify-center text-[#676666] font-normal ">
                Số lượng
              </p>
              <div className="flex">
                <span className="flex justify-center items-center text-lg  border-solid rounded-sm border-gray-200 w-[30px] cursor-pointer hover:bg-gray-100">
                  -
                </span>
                <span className="flex justify-center items-center border-solid  border-gray-200 w-[40px]">
                  1
                </span>
                <span className="flex justify-center items-center border-solid rounded-sm border-gray-200 w-[30px] cursor-pointer hover:bg-gray-100">
                  +
                </span>
              </div>
            </div>

            <div className="flex space-x-5">
              <div className="px-3 cursor-pointer hover:bg-orange-100 flex justify-center items-center space-x-2 h-[40px] bg-[#ff57221a;] border-[#ee4d2d] border-solid rounded-sm">
                <ShoppingCartOutlined className=" text-orange-600" />
                <span className="text-[13px] text-[#ee4d2d]">
                  Thêm vào giỏ hàng
                </span>
              </div>
              <div>
                <button className="px-3 h-[40px] bg-orange-600 text-white rounded-sm border-none cursor-pointer hover:bg-orange-500">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <ModalDetailBook
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        images={images}
        currentIndex={refGallery.current?.getCurrentIndex() || 0}
      />
    </>
  );
};

export default BookDetail;
