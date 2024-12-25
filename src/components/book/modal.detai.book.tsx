import { Col, Image, Modal, Row } from "antd";
import ReactImageGallery from "react-image-gallery";

interface IPropType {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  images: {
    original: string;
    thumbnail: string;
  }[];
  //   setImages?: (value: any) => void;
}
const ModalDetailBook = (props: IPropType) => {
  const { isModalOpen, setIsModalOpen, images } = props;

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const slider = [
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <>
      <Modal
        width={"60vw"}
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        closable={false}
      >
        <Row gutter={12}>
          <Col span={16}>
            <ReactImageGallery
              items={images}
              showFullscreenButton={false}
              showPlayButton={false}
              showNav={false}
              showThumbnails={false}
            />
          </Col>
          <Col span={8}>
            <Row gutter={[12, 12]}>
              {slider.map((item, index) => {
                return (
                  <Col span={12} key={index}>
                    <div
                      className=" cursor-pointer"
                      key={index}
                      onClick={() => {
                        //   setImages([item]);
                      }}
                    >
                      <Image width={120} src={item.thumbnail} preview={false} />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalDetailBook;
