import BookDetail from "@/components/book/detail.book";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import "../../styles/book.scss";
import { useCallback, useEffect, useState } from "react";
import { getBookAPI } from "@/services/api";
import BookLoader from "@/components/book/loader.book";
const BookPage = () => {
  const params = useParams();
  const idBook: string | undefined = params.id;

  const [book, setBook] = useState<IBookTable>();
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const fetchBookById = useCallback(async () => {
    setIsLoader(true);
    const res = await getBookAPI(idBook || "");

    if (res && res.data) {
      setBook(res.data);
    }
    setIsLoader(false);
  }, [idBook]);

  useEffect(() => {
    fetchBookById();
  }, [fetchBookById]);

  return (
    <div className=" bg-gray-100 h-[100vh] px-5 pt-10">
      <Card className="bg-white">
        {isLoader ? <BookLoader /> : <BookDetail book={book} />}
      </Card>
    </div>
  );
};

export default BookPage;
