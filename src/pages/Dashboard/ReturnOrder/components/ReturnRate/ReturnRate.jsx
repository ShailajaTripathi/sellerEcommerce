import React from 'react'
import { useTranslation } from 'react-i18next'
import {ReactComponent as IconCustomerReturn} from '../../../../../assets/images/icons/icon-customer-return.svg'
import {ReactComponent as IconCourierReturn} from '../../../../../assets/images/icons/icon-courier-return.svg'

const ReturnRate = () => {
  const {t} = useTranslation()
  const admin = t('admin',{returnObjects:true})

  const imageView = {
    "e1" : <IconCustomerReturn/>,
    "e2" : <IconCourierReturn/>,
  }
  return (
    <ul className='return-rate-list'>
      {admin.returnOrders.cardList.map((cardList,i)=> 
          <>
            <li key={i}>
              <span className='icon'>{imageView[cardList.image]}</span>
              <div className="details">
                <h3>{cardList.title}</h3>
                <h2>{cardList.percentage} 
                <span className=
                // Text Red Color
                'text-red'  
                // Text green Color
                // 'text-green'
                >{cardList.profit}</span></h2>
                <p>{cardList.description}</p>
              </div>
            </li> 
          </>
        )}
    </ul>
  )
}

export default ReturnRate