import React, { useRef, useState, useEffect } from "react";
import { Button, Modal, ModalHeader } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const SaveModal = ({ onSave, onClose, dataModel }) => {
  const [showHide, setShowHide] = useState(true);

  const idRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const dateOfBirthRef = useRef("");
  const dateOfDeathRef = useRef("");

  useEffect(() => {
    if (dataModel) {
      idRef.current.value = dataModel.id;
      firstNameRef.current.value = dataModel.firstName;
      lastNameRef.current.value = dataModel.lastName;
      dateOfBirthRef.current.value = dataModel.dateOfBirth;
      dateOfDeathRef.current.value = dataModel.dateOfDeath;
    }
  }, [dataModel]);

  const handleModalShowHide = () => {
    setShowHide(!showHide);
  };

  const saveAuthor = (model) => {
    if (model.firstName == "") {
      alert("لطفا نام را وارد کنید");
    } else if (model.lastName == "") {
      alert("لطفا نام خانوادگی را وارد کنید");
    } else if (model.dateOfBirth == null) {
      alert("لطفا تاریخ تولد را وارد کنید");
    } else if (model.dateOfBirth > model.dateOfDeath) {
      alert("تاریخ فوت نباید از تاریخ تولد کمتر یاشد");
    } else {
       axios
        .post("https://localhost:44396/api/Authors/Save", model)
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
            <input type="text" name="firstName" ref={firstNameRef} />
            نام خانوادگی
            <input type="text" name="lastName" ref={lastNameRef} />
            تاریخ تولد
            <input type="text" name="dateOfBirth" ref={dateOfBirthRef} />
            تاریخ فوت
            <input type="text" name="dateOfDeath" ref={dateOfDeathRef} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              saveAuthor({
                id: idRef.current.value ? idRef.current.value : null,
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                dateOfBirth: dateOfBirthRef.current.value
                  ? dateOfBirthRef.current.value
                  : null,
                dateOfDeath: dateOfDeathRef.current.value
                  ? dateOfDeathRef.current.value
                  : null,
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