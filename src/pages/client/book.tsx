import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "../../styles/book.scss";
const BookPage = () => {
  const params = useParams();

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  console.log(params.id);
  return (
    <div>
      <Row>
        {/* Image */}
        <Col span={8}>
          <ImageGallery items={images} />
        </Col>
        <Col span={16}></Col>
      </Row>
    </div>
  );
};

export default BookPage;
