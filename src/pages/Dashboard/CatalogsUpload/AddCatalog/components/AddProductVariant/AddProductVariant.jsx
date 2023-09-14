import React, { useEffect, useState } from "react";
import { ReactComponent as Plus } from "../../../../../../assets/images/icons/icon-plus-white.svg";
import supplychain from "../../../../../../assets/images/supplychain.svg";
import TableListing from "../../../../../../components/TableListing/TableListing";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CloseButton,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "react-bootstrap";
import DropDown from "../../../../../../components/DropDown";
import { useForm } from "react-hook-form";
import Exlmation from "../../../../../../assets/images/icons/exlmation.svg";
import DeleteIcon from "../../../../../../assets/images/icons/delete-icon.svg";
import DeleteRedIcon from "../../../../../../assets/images/icons/delete-red-icon.svg";
import DeleteRoundIcon from "../../../../../../assets/images/icons/delete-round-icon.svg";
import RightSignIcon from "../../../../../../assets/images/icons/right-sign.svg";
import EditIcon from "../../../../../../assets/images/icons/icon-edit-black.svg";
import BinIcon from "../../../../../../assets/images/icons/bin-icon.svg";
import imageGallary from "../../../../../../assets/images/image-gallary1.png";
import ModalPopup from "../../../../../../components/Modal/ModalPopup";
import Button from "../../../../../../components/Button/Button";
import AddVariant from "./InnerComponents/AddVariant/AddVariant";
import { useDispatch, useSelector } from "react-redux";
import { SELLER_COLOR, SELLER_SIZE, SELLER_VIEWPRODUCTVARIANT } from "../../../../../../Redux-Toolkit/Actions/sagaActions";
import ProductListing from "./InnerComponents/ProductListing/ProductListing";
import { useNavigate } from "react-router-dom";
import {useDropzone} from 'react-dropzone'


const AddProductVariant = ({setActive}) => {
  // const{catalogId}= useSelector((action)=> action.catalogSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addVariant, setAddVariant] = useState(
    JSON.parse(sessionStorage.getItem("AddVariant")) || false
  );

  useEffect(() => {
    if (addVariant){
      dispatch({type : SELLER_COLOR})
      dispatch({type : SELLER_SIZE})
    }
  }, [addVariant]);

  // useEffect(()=> {
  //   if(catalogId){
  //     dispatch({type: SELLER_VIEWPRODUCTVARIANT,payload : {
  //       catalogId : catalogId
  //     }})
  //   }
  // },[catalogId])
  
  return (
    <>
        <div className="add-product-variant add-catalog-steps">
          {!addVariant &&  <ProductListing setAddVariant={setAddVariant} setActive={setActive} key="Demo" />}
        </div>
      {addVariant && <AddVariant  setAddVariant={(e)=> {setAddVariant(e)}} />}
    </>
  );
};
export default AddProductVariant;
