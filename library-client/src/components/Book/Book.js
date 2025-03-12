import React, { useState, useEffect } from "react";
import axios from "axios";
import SaveModal from "./SaveModal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [model, setModel] = useState();

  useEffect(() => {
    getAllBook();
  }, []);

  const getAllBook = () => {
    axios
      .get("https://localhost:44396/api/Books/List", {})
      .then((response) => {
        const allBooks = response.data;
        setBooks(allBooks);
      })
      .catch((error) => console.error("Error: ${error}"));
  };

  const onSave = (onsave) => {
    if (onsave) {
      getAllBook();
    }
  };

  const onClose = () => {
    setShow(false);
  };

  const deleteBook = (id) => {
     const url = `https://localhost:44396/api/Books/Delete/${id}`;
    axios
      .delete(url)
      .then((response) => {
        getAllBook();
      })
      .catch((error) => console.error("Error: ${error}"));
  };

  return (
    <div className="App container">
      <h1 className="d-flex justify-content-center m-3 bg-warning text-dark">
        کتاب
      </h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          console.log(show);
          let dataModel = {
            id: null,
            title: "",
            authorId: "",
            genreId: "",
            publisherId: "",
            publishDate: "",
          };
          setModel(dataModel);
          setShow(true);
        }}
      >
        افزودن
      </button>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">شناسه</th>
            <th scope="col">عنوان</th>
            <th scope="col">شناسه نویسنده</th>
            <th scope="col">شناسه ژانر</th>
            <th scope="col">شناسه ناشر</th>
            <th scope="col">تاریخ نشر</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.authorId}</td>
              <td>{item.genreId}</td>
              <td>{item.publisherId}</td>
              <td>{item.publishDate}</td>
              <td>
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    let dataModel = {
                      id: item.id,
                      title: item.title,
                      authorId: item.authorId,
                      genreId: item.genreId,
                      publisherId: item.publisherId,
                      publishDate: item.publishDate,
                    };
                    setModel(dataModel);
                    setShow(true);
                  }}
                >
                  ویرایش
                </div>
              </td>
              <td>
                <div
                  className="btn btn-danger"
                  onClick={() => {
                    Swal.fire({
                      text: "آیا از حذف '" + item.title + "' مطمئن هستید؟",
                      icon: "warning",
                      cancelButtonText: "لغو",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "بله, حذفش کن!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteBook(item.id);
                        Swal.fire({
                          text: "عملیات حذف با موفقیت انجام شد",
                          confirmButtonText: "تایید",
                        });
                      }
                    });
                  }}
                >
                  حذف
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5">
        <Link to="/" className="btn btn-dark">
          بازگشت
        </Link>
      </div>
      <div>
        {show && (
          <SaveModal onSave={onSave} onClose={onClose} dataModel={model} />
        )}
      </div>
    </div>
  );
};

export default Book;
