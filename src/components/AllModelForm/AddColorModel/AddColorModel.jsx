import React from "react";
import { useForm } from "react-hook-form";
import ModalPopup from "../../Modal/ModalPopup";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../Button/Button";
import { ADD_PRODUCT_COLOR_DATA } from "../../../Redux-Toolkit/Actions/sagaActions";
import { useDispatch } from "react-redux";

const AddColorModel = ({ colorModalShow, setColorModalShow }) => {
  const validationSchema = yup.object({
    addColor: yup
      .string()
      .required("Please Enter Color Name")
      .max(10, "Input Color Must be 0 to 10 Characters Long."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch({
      type: ADD_PRODUCT_COLOR_DATA,
      payload: { color: data?.addColor },
    });
    setColorModalShow(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalPopup
        show={colorModalShow}
        handleClose={() => setColorModalShow(true)}
        handleShow={() => setColorModalShow(true)}
        cname="accept-item confirm-modal delete-modal"
      >
        <form>
          <h2>Add Product Color</h2>
          <div className="form-group">
            <label>Add Color</label>
            <input
              type="text"
              name="subcategory"
              autoFocus={false}
              autoComplete="off"
              {...register("addColor")}
              // onChange={(e)=>setModalInputValue(e.target.value)}
              // onChange={(e) => {
              //   setModalInputValue(e.target.value);
              // }}
            />
            <span style={{ color: "red" }}>{errors?.addColor?.message}</span>
          </div>
          <div className="modal-btn-group">
            <Button
              type="button"
              commonClass="border-red-btn modal-btn"
              text={"No"}
              onClick={() => {
                setColorModalShow(false);
              }}
            />
            <Button
              type="submit"
              commonClass="solid-red-btn modal-btn"
              text={"Yes"}
            />
          </div>
        </form>
      </ModalPopup>
    </form>
  );
};

export default AddColorModel;
