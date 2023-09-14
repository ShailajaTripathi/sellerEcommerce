import React from 'react'
import Button from '../../../components/Button'
import PaymentsCard from '../../../components/PaymentsCard/PaymentsCard'
import { Row, Col } from 'react-bootstrap'

const Payments = () => {
  return (
   <div className='payments-body'>
      <Button className="solid-black-btn" text={'Download GST Reports'}/>
      <div className="payments-card-list">
        <Row>
          <Col lg="4" md="4" className='mb-24 payment-col'>
            <PaymentsCard head={'Next Payment'} date={'20Apr'} description={'Estimated value of next payment. This may change due to returns that come in before the next payout.'}/>
          </Col>
          <Col lg="4" md="4" className='mb-24 payment-col'>
            <PaymentsCard head={'Last Payment'} date={'19Apr'} description={'Amount transferred to your account on the last payment date.'}/>
          </Col>
          <Col lg="4" md="4" className='mb-24 payment-col'>
            <PaymentsCard head={'Total Outstanding Payments'} description={'Estimated value of the payments that are due to you.This may change due to returns that come in before the payment settlement dates.  '}/>
          </Col>
        </Row>
      </div>
   </div>
  )
}

export default Payments