import React from 'react'
import { Row, Col } from 'react-bootstrap'
import NewsBoardCard from '../../../components/NewsBoardCard/NewsBoardCard'
import DiwaliBiggestImage from '../../../assets/images/diwali-biggest-image.webp'
import MerryChristmasImage from '../../../assets/images/merry-christmas-image.webp'

const NewsBoard = () => {
  return (
    <div className='news-board-body'>
      <Row>
        <Col lg="12">
          <NewsBoardCard image={DiwaliBiggestImage} postedDate={'Posted: 20 October, 2022'} saleDate={'Diwali Sale: 22th-26th October'} head={'Festival offer Diwali Biggest Sale'}/>
        </Col>
        <Col lg="12">
          <NewsBoardCard image={MerryChristmasImage} postedDate={'Posted: 23 December, 2022'} saleDate={'Christmas Sale: 25th-31th December'} head={'Merry Christmas Sale and Discount'}/>
        </Col>
      </Row>
    </div>
  )
}

export default NewsBoard