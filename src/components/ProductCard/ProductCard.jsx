import React, { useState } from "react";
import ProductImage from '../../assets/images/product-image.png'
import Button from "../Button/Button";
import ModalPopup from "../Modal/ModalPopup";
import { useTranslation } from "react-i18next";
import {ReactComponent as IconDownload} from '../../assets/images/icons/icon-download-white.svg'

const ProductCard = ({id}) => {
    const {t} = useTranslation()
    const common = t('common',{returnObjects:true})
    const [showAccept,setShowAccept] = useState(false)
    const [showCancel,setShowCancel] = useState(false)
  return (
    <>
        <div className="product-card">
            <div className="product-card-head">
                <p className='order-no'>{id === 1 || id === 5 || id === 6 ? "" : <input type="checkbox" /> }Order No:   752387482</p>
                <p>03 Jun, 05:09 PM</p>
            </div>
            <div className="product-card-body">
                <div className="product-card-image">
                <img src={ProductImage} alt="product-image" />
                <div className="details">
                    <h2>Basanti - Kapde Aur Koffee <span>QTY: 1</span></h2>
                    <p>SKU ID: 52861535</p>
                    <p>Size: L</p>
                    <p>Color: Red</p>
                    <p>Customer Expected Dispatch Date: <span className='red'>05 Jun 2022</span></p>
                   {id === 5 && <p className="status"><span>Status:</span> <br />Delivered</p>} 
                </div>
                </div>
            </div>
            {
                id===1 || id === 5 || id === 6   ?"" :<>
                { id === 3 || id ===4 ? "" : <>  <div className="product-card-footer">
                <Button commonClass='solid-red-btn green product-btn' text={'Accept Item'} onClick={()=> setShowAccept(true)}/>
                <Button commonClass='solid-black-btn product-btn' text={'Cancel Item'} onClick={()=> setShowCancel(true)}/>
            </div> </> }
               
            {
                id===2 ?"":  <> 
                {id === 4 ? "" : <> <div className="product-card-footer">
                <Button commonClass='solid-red-btn green product-btn' text={'Ready to Ship'}/>
            </div> </> }
                  
            {id === 3 ? "" :   <>  <div className="product-card-footer">
                <button className="solid-red-btn blue product-btn"><IconDownload/> Label</button>
                <p className="text-red">Label Not Downloaded</p>
                <p className="text-green">Label Not Downloaded</p>
            </div> </>}
            
                </>
            }
                </>
            }
            
        </div>
        <ModalPopup
            show={showAccept}
            handleClose={() => setShowAccept(true)}
            handleShow={() => setShowAccept(true)}
            cname="accept-item confirm-modal"
        >
           <h2>{common.AcceptOrder}</h2>
           <div className="modal-btn-group">
                <Button commonClass='solid-red-btn modal-btn' text={'Accept'}/>
                <Button commonClass='solid-black-btn modal-btn' text={'Close'} onClick={()=> setShowAccept(false)}/>
           </div>
        </ModalPopup>

        <ModalPopup
            show={showCancel}
            handleClose={() => setShowCancel(true)}
            handleShow={() => setShowCancel(true)}
            cname="cancel-item confirm-modal"
        >
           <h2>{common.CancelModal}</h2>
           <div className="modal-btn-group">
                <Button commonClass='solid-red-btn modal-btn' text={'Cancel'} />
                <Button commonClass='solid-black-btn modal-btn' text={'Close'} onClick={()=> setShowCancel(false)}/>
           </div>
        </ModalPopup>
    </>
  );
};

export default ProductCard;