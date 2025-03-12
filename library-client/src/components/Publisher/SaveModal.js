import React, { useRef, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const SaveModal = ({ onSave, onClose, dataModel }) => {
  const [showHide, setShowHide] = useState(true);

  const idRef = useRef("");
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const addressRef = useRef("");

  useEffect(() => {
    if (dataModel) {
      idRef.current.value = dataModel.id;
      nameRef.current.value = dataModel.name;
      phoneRef.current.value = dataModel.phone;
      addressRef.current.value = dataModel.address;
    }
  }, [dataModel]);

  const handleModalShowHide = () => {
    setShowHide(!showHide);
  };

  const savePublisher = (model) => {
    if (model.name == "") {
      alert("لطفا نام را وارد کنید");
    } else if (model.phone == "") {
      alert("لطفا تلفن را وارد کنید");
    } else {
       axios
        .post("https://localhost:44396/api/Publishers/Save", model)
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
            نام
            <input type="text" name="name" ref={nameRef} />
            تلفن
            <input type="text" name="phone" ref={phoneRef} />
            آدرس
            <input type="text" name="address" ref={addressRef} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              savePublisher({
                id: idRef.current.value ? idRef.current.value : null,
                name: nameRef.current.value,
                phone: phoneRef.current.value,
                address: addressRef.current.value,
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
