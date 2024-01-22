import React, { useState, useEffect } from "react";
import axios from "axios";
import SaveModal from "./SaveModal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Publisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [show, setShow] = useState(false);
  const [model, setModel] = useState();

  useEffect(() => {
    getAllPublisher();
  }, []);

  const getAllPublisher = () => {
    axios
      .get("https://localhost:44396/api/Publishers/List", {})
      .then((response) => {
        const allPublishers = response.data;
        setPublishers(allPublishers);
      })
      .catch((error) => console.error("Error: ${error}"));
  };

  const onSave = (onsave) => {
    if (onsave) {
      getAllPublisher();
    }
  };

  const onClose = () => {
    setShow(false);
  };

  const deletePublisher = (id) => {
    const url = `https://localhost:44396/api/Publishers/Delete/${id}`;
    axios
      .delete(url)
      .then((response) => {
        getAllPublisher();
      })
      .catch((error) => console.error("Error: ${error}"));
  };

  return (
    <div className="App container">
      <h1 className="d-flex justify-content-center m-3 bg-warning text-dark">
        ناشر
      </h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          let dataModel = {
            id: null,
            name: "",
            phone: "",
            address: "",
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
            <th scope="col">تلفن</th>
            <th scope="col">آدرس</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    let dataModel = {
                      id: item.id,
                      name: item.name,
                      phone: item.phone,
                      address: item.address,
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
                      text: "آیا از حذف '" + item.name + "' مطمئن هستید؟",
                      icon: "warning",
                      cancelButtonText: "لغو",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "بله, حذفش کن!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deletePublisher(item.id);
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

export default Publisher;
