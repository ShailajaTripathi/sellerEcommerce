import React from 'react'
import {Container} from 'react-bootstrap' 

import { ReactComponent as FreeCatalog} from '../../../../assets/images/icons/icon-free-catalog.svg'
import { ReactComponent as DedicatedCatalog}  from '../../../../assets/images/icons/icon-dedicated-catalog.svg'
import { ReactComponent as ReturnShipping}  from '../../../../assets/images/icons/icon-free-return-shipping.svg'
import { ReactComponent as NoOrder}  from '../../../../assets/images/icons/icon-no-order.svg'
import { useTranslation } from 'react-i18next'
const ExclusiveSupplier = () => {
  const {t} = useTranslation()
  const home = t('home',{returnObjects:true})
  const imageView = {
      "e1" : <FreeCatalog/>,
      "e2" : <DedicatedCatalog/>,
      "e3" : <ReturnShipping/>,
      "e4" : <NoOrder/>,
  }
  return (
    <section className='exclusive-supplier'>
      <Container>
        <h2>{home.ExclusiveSupplier.title}</h2>
        <ul className='exclusive-supplier-list'>
          {home.ExclusiveSupplier.cardList.map((cardList,i)=> 
          <>
            <li key={i}>
            <div className="head">
              <span>{imageView[cardList.image]}</span>
              <h3>{cardList.title}</h3>
            </div>
            <p>{cardList.descreption}</p>
          </li>
          </>
          )}
        </ul>
    </Container>
  </section>
  )
}

export default ExclusiveSupplier