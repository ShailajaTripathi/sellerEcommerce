import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Button from '../Button'

function NewsBoardCard(props) {
  return (
    <Row>
      <Col xxl="8" xl='6' lg="12" className='mb-24 board-content-col'>
        <div className='admin-card news-board-card'>
            <div class="head">
                <p>{props.postedDate}</p>
                <p>{props.saleDate}</p>
            </div>
            <div className="news-board-body">
                <h2>{props.head}</h2>
                <p>Dear Supplier.</p>
                <p>We are excited to announce that we are launching one more sale which will run from 22-26th October. We welcome all our suppliers to participate in this sale and give a boost to their business.</p>
                <p>Guidelines for participation:</p>
                <ul>
                    <li>Discounts to be capped at 10%</li>
                    <li>Catalogs must be activated at least 60 days before</li>
                    <li>Last Discount on the catalog should be at lest 60 days before</li>
                </ul>
                <p>For more info, please contact our supplier support team.</p>
                <p>Regards</p>
                <Button className="solid-red-btn form-btn" text={'Apply'}/>
            </div>
        </div>
      </Col>
      <Col xxl="4" xl="6" lg="12" className='mb-24 board-image-col'>
        <div className="news-board-image">
            <img src={props.image} alt={props.alt} />
        </div>
      </Col>
    </Row>
  )
}

export default NewsBoardCard