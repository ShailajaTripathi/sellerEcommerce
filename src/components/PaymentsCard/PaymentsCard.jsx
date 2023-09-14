import React from 'react'
import Button from '../Button/Button'

const PaymentsCard = (props) => {
  return (
    <div className='admin-card payments-card'>
        <div class="head">
            <h2>{props.head}</h2>
            <p>{props.date}</p>
        </div>
        <div className="payments-body">
            <p>{props.description}</p>
            <div>
                <ul className='payments-list'>
                    <li>Amount <span>₹512.88</span></li>
                    <li>Other Support Service <br /> Charges <span>₹0</span></li>
                    <li>Ad Cost <span>₹0</span></li>
                    <li>Waivers And Compensation <span>₹143.76</span></li>
                    <li><span>Net Amount</span> <span>₹656.64</span></li>
                </ul>
                <Button className="solid-red-btn" text={'View Details'}/>
            </div>
        </div>
    </div>
  )
}

export default PaymentsCard