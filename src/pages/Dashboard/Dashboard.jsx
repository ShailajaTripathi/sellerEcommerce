import React from 'react'
import {Row,Col} from 'react-bootstrap'  
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'

import {ReactComponent as IconTodayOrder} from '../../assets/images/icons/icon-today-order.svg'
import {ReactComponent as IconThisMonth} from '../../assets/images/icons/icon-this-month.svg'
import {ReactComponent as IconTotalOrder} from '../../assets/images/icons/icon-total-order.svg'
import {ReactComponent as IconOrderPending} from '../../assets/images/icons/icon-order-pending.svg'
import {ReactComponent as IconOrderProcessing} from '../../assets/images/icons/icon-order-processing.svg'
import {ReactComponent as IconOrderDelivered} from '../../assets/images/icons/icon-right-white.svg'
import ProductCard from '../../components/ProductCard/ProductCard'

const Dashboard = () => {
  const {t} = useTranslation()
  const admin = t('admin',{returnObjects:true})
  const common = t('common',{returnObjects:true})

  const imageView = {
    "e1" : <IconTodayOrder/>,
    "e2" : <IconThisMonth/>,
    "e3" : <IconTotalOrder/>,
  }
  const imageView2 = {
    "e1" : <IconThisMonth/>,
    "e2" : <IconOrderPending/>,
    "e3" : <IconOrderProcessing/>,
    "e4" : <IconOrderDelivered/>,
  }
  return (   
    <>
    <div className="dashboard-body">
      <Row>
        {admin.dashboard.cardList.map((cardList,index)=> 
             <Col lg="4" md="4" sm="6" className='dash-amount-col mb-24' key={index}>
                <div className="dash-amount-card">
                  <span>{imageView[cardList.image]}</span>
                  <div className="details">
                    <p>{cardList.title}</p>
                    <h2>{cardList.count}</h2>
                  </div>
                </div>
              </Col>
        )}
      </Row>
      <Row>
        {admin.dashboard.ordercardList.map((ordercardList,index)=> 
             <Col lg="3" md="6" sm="6" className='dash-ordar-col mb-24' key={index}>
                <Link className="dash-ordar-card">
                  <span>{imageView2[ordercardList.image]}</span>
                  <div className="details">
                    <p>{ordercardList.title}</p>
                    <h2>{ordercardList.count}</h2>
                  </div>
                </Link>
              </Col>
        )}
      </Row>
      <Row>
          <Col lg="6" md="6" className='news-board-col'>
            <div className="admin-card news-board">
              <div className="head">
                <h2>{admin.dashboard.NewsBoard}</h2>
                <Link>{common.ViewAll}</Link>
              </div>
              <ul className='news-board-list'>
                {admin.dashboard.NewsBoardList.map((NewsBoardList,index)=> 
                    <li key={index}>
                      <p className='top'>
                        <span className='date'>{NewsBoardList.posted}</span>
                        <span>{NewsBoardList.sale}</span>
                      </p>
                      <p>{NewsBoardList.descreption}</p>
                    </li>
                )}
              </ul>
            </div>
          </Col>
          <Col lg="6" md="6"  className='recent-pending-col'>
            <div className="admin-card recent-pending-order">
              <div className="head">
                <h2>{admin.dashboard.RecentPendingOrder}</h2>
                <Link>{common.ViewAll}</Link>
              </div>
              <div className='pending-order-list'>
                <ProductCard id={2}/>
                <ProductCard id={2}/>
                <ProductCard id={2}/>
              </div>
            </div>
          </Col>
      </Row>
    </div>
    {/* <Outlet/> */}
    </>
  )
}

export default Dashboard