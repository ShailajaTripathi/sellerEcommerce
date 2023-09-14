import React, { useState } from 'react'
import GstDetails from '../../../../SignUp/Components/GstDetails'
import Button from '../../../../../components/Button/Button'

function GSTSettings() {

  let [changeText, setChangeText] = useState(true);
  const handleChange = () => {
    setChangeText(!changeText);
  };

  return (
    <>
     {changeText ?<>
      <div class="admin-card">
        <div class="head">
          <h2>GST Details</h2>
        </div>
        <div class="support-body-content">
          <ul class="gst-detail-list">
            <li><span>State</span> <span>Kerala</span></li>
            <li><span>Registration Type</span> <span>Regular</span></li>
            <li><span>Assessee of other territory?</span> <span>no</span></li>
            <li><span>GSTIN/UIN</span> <span>32AAEFo1405F1ZY</span></li>
            <li><span>Application From</span> <span>1-April-2021</span></li>
            <li><span>Periodicity of GSTR1</span> <span>Monthly</span></li>
            <li><span>E-Way Bill Application?</span> <span>Yes</span></li>
            <li><span>E-Way Bill Application Form</span> <span>1-April-2021</span></li>
            <li><span>E-Way Bill Threshold</span> <span>50,000</span></li>
          </ul>
          <Button commonClass='solid-red-btn' text={'Change'} onClick={() => handleChange()}/>
        </div>
      </div>
      </>
      :
      <>
      <GstDetails />
      </>
      }
    </>
  )
}

export default GSTSettings