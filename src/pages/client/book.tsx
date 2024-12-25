import BookDetail from "@/components/book/detail.book";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import "../../styles/book.scss";
const BookPage = () => {
  const params = useParams();

  console.log(params.id);
  return (
    <div className=" bg-gray-100 h-[100vh] px-5 pt-10">
      <Card className="bg-white">
        <BookDetail />
      </Card>
    </div>
  );
};

export default BookPage;
