import React, { useState, useEffect } from "react";
import axios from "axios";
import SaveModal from "./SaveModal";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [show, setShow] = useState(false);
  const [model, setModel] = useState();

  useEffect(() => {
    getAllAuthor();
  }, []);

  const getAllAuthor = () => {
    axios
      .get("https://localhost:44396/api/Authors/List", {})
        .then((response) => {
        const allAuthors = response.data;
        setAuthors(allAuthors);
      })
      .catch((error) => console.error("Error: ${error}"));
  };

  const onSave = (onsave) => {
    if (onsave) {
      getAllAuthor();
    }
  };

  const onClose = () => {
    setShow(false);
  };

  const deleteAuthor = (id) => {
    const url = `https://localhost:44396/api/Authors/Delete/${id}`;
    axios
      .delete(url)
      .then((response) => {
        getAllAuthor();
      })
      .catch((error) => console.error("Error: ${error}"));
  };

  return (
    <div className="App container" >
      <h1 className="d-flex justify-content-center m-3 bg-warning text-dark">
        نویسنده
      </h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          let dataModel = {
            id: null,
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            dateOfDeath: "",
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
            <th scope="col">نام</th>
            <th scope="col">نام خانوادگی</th>
            <th scope="col">تاریخ تولد</th>
            <th scope="col">تاریخ فوت</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {authors.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.dateOfDeath}</td>
              <td>
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    let dataModel = {
                      id: item.id,
                      firstName: item.firstName,
                      lastName: item.lastName,
                      dateOfBirth: item.dateOfBirth,
                      dateOfDeath: item.dateOfDeath,
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
                      text:
                        "آیا از حذف '" +
                        item.firstName +
                        " " +
                        item.lastName +
                        "' مطمئن هستید؟",
                      icon: "warning",
                      cancelButtonText: "لغو",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "بله, حذفش کن!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteAuthor(item.id);
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

export default Author;