import BookDetail from "@/components/book/detail.book";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import "../../styles/book.scss";
import { useCallback, useEffect, useState } from "react";
import { getBookAPI } from "@/services/api";
const BookPage = () => {
  const params = useParams();
  const idBook: string | undefined = params.id;

  const [book, setBook] = useState<IBookTable>();

  const fetchBookById = useCallback(async () => {
    const res = await getBookAPI(idBook || "");

    if (res && res.data) {
      setBook(res.data);
    }
    console.log(res.data);
  }, [idBook]);

  useEffect(() => {
    fetchBookById();
  }, [fetchBookById]);

  return (
    <div className=" bg-gray-100 h-[100vh] px-5 pt-10">
      <Card className="bg-white">
        <BookDetail book={book} />
      </Card>
    </div>
  );
};

export default BookPage;
