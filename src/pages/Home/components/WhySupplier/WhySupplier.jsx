import React from 'react'
import { useTranslation } from 'react-i18next'
import {Container} from 'react-bootstrap' 

import { ReactComponent as PenaltyCharges} from '../../../../assets/images/icons/icon-penalty-charges.svg'
import { ReactComponent as CommissionFee}  from '../../../../assets/images/icons/icon-commission-fee.svg'
import { ReactComponent as DoindBusiness}  from '../../../../assets/images/icons/icon-ease-doind-business.svg'
import { ReactComponent as GrowthSupplier}  from '../../../../assets/images/icons/icon-growth-supplier.svg'
const WhySupplier = () => {
    const {t} = useTranslation()
    const home = t('home',{returnObjects:true})
    const imageView = {
        "c1" : <PenaltyCharges/>,
        "c2" : <CommissionFee/>,
        "c3" : <DoindBusiness/>,
        "c4" : <GrowthSupplier/>,
    }
  return (
    <>
    <section className='why-suppliers'>
      <Container>
        <h2>{home.WhySuppliers.title}</h2>
        <p>{home.WhySuppliers.description}</p>
        <ul className='why-suppliers-list'>
            {home.WhySuppliers.cardList.map ((cardList,i)=> {
                return <>
                 <li>
                    <div className="suppliers-card" key={i}>
                      {imageView[cardList.image]}
                      <div className="content">
                        <h3>{cardList.title}</h3>
                        <p>{cardList.descreption}</p>
                        <ul className='common-list'>
                        {cardList.descreptionList &&  
                            cardList.descreptionList.map ((ert,i) => 
                                <>
                                  <li key={i}>{ert}</li>
                                </>
                            )}
                        </ul>
                      </div>
                    </div>
                  </li>
                </>
            })}
        
        </ul>
      </Container>
  </section>
    </>
  )
}

export default WhySupplier