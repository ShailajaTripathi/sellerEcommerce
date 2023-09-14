import React, { useState } from 'react'
import BankDetails from '../../../../SignUp/Components/BankDetails'
import Button from '../../../../../components/Button/Button'
import { useSelector } from 'react-redux';
import Loader from '../../../../../components/Loader/Loader';

function BankAccountInfo() {
  const {data,isloading} = useSelector((action) => action.settingsSlice)  
  console.log("data?.bankDetails",data?.bankDetails)
  let [changeText, setChangeText] = useState(true);
  const handleChange = () => {
    setChangeText(!changeText);
  };

  return (
    <>

    {changeText ?<>
      <div class="admin-card">
        <div class="head">
          <h2>Bank Details</h2>
        </div>
        {isloading && <Loader /> } 
        <div class="support-body-content">
        
            <ul class="gst-detail-list" >
            <li><span>Bank Holder Name</span> <span>Bhavesh  Sharma</span></li>
            <li><span>Bank Account Number</span> <span>{data?.bankDetails?.accountNo}</span></li>
            <li><span>Bank Type</span> <span>Saving Aaccount</span></li>
            <li><span>IFSC Code</span> <span>{data?.bankDetails?.ifscCode}</span></li>
            <li><span>Branch Name</span> <span>Ahmedabad</span></li>
          </ul>
          
          <Button commonClass='border-red-btn' text={'Change Bank Details'} onClick={() => handleChange()}/>
        </div>
      </div>
      </>
      :
      <>
      <BankDetails setChangeText={setChangeText}/>
      </>
      }
    </>
  )
}

export default BankAccountInfo