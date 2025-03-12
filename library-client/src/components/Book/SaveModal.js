import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const SaveModal = ({ onSave, onClose, dataModel }) => {
  const [showHide, setShowHide] = useState(true);

  const idRef = useRef("");
  const titleRef = useRef("");
  const authorIdRef = useRef("");
  const genreIdRef = useRef("");
  const publisherIdRef = useRef("");
  const publishDateRef = useRef("");

  useEffect(() => {
    if (dataModel) {
      idRef.current.value = dataModel.id;
      titleRef.current.value = dataModel.title;
      authorIdRef.current.value = dataModel.authorId;
      genreIdRef.current.value = dataModel.genreId;
      publisherIdRef.current.value = dataModel.publisherId;
      publishDateRef.current.value = dataModel.publishDate;
    }
  }, [dataModel]);

  const handleModalShowHide = () => {
    setShowHide(!showHide);
  };

  const saveBook = (model) => {
    if (model.title == "") {
      alert("لطفا عنوان را وارد کنید");
    } else if (model.authorId == "") {
      alert("لطفا شناسه نویسنده را وارد کنید");
    } else if (model.genreId == "") {
      alert("لطفا شناسه ژانر را وارد کنید");
    } else if (model.publisherId == "") {
      alert("لطفا شناسه ناشر را وارد کنید");
    } else if (model.publishDate == "") { 
      alert("لطفا تاریخ نشر را وارد کنید");
    } else {
       axios
      .post("https://localhost:44396/api/Books/Save", model)
      .then((response) => {
        onSave(true);
        Swal.fire({
          text: "عملیات افزودن/ویرایش با موفقیت انجام شد",
          confirmButtonText: "تایید",
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error: ${error}");
      });
    }
  };

  return (
    <div>
      <Modal show={true}>
        <Modal.Header onClick={() => handleModalShowHide()}>
          <Modal.Title>افزودن / ویرایش</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row" dir="rtl">
            شناسه
            <input
              type="text"
              name="id"
              defaultValue={dataModel.id ? dataModel.id : null}
              ref={idRef}
            />
            عنوان
            <input type="text" name="title" ref={titleRef} />
            شناسه نویسنده
            <input type="text" name="authorId" ref={authorIdRef} />
            شناسه ژانر
            <input type="text" name="genreId" ref={genreIdRef} />
            شناسه ناشر
            <input type="text" name="publisherId" ref={publisherIdRef} />
            تاریخ نشر
            <input type="text" name="publishDate" ref={publishDateRef} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              saveBook({
                id: idRef.current.value ? idRef.current.value : null,
                title: titleRef.current.value,
                authorId: authorIdRef.current.value,
                genreId: genreIdRef.current.value,
                publisherId: publisherIdRef.current.value,
                publishDate: publishDateRef.current.value,
              });
            }}
          >
            ذخیره
          </Button>
          <Button variant="danger" onClick={() => onClose()}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SaveModal;
