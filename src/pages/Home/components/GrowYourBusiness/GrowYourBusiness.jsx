import React from 'react'
import {Container} from 'react-bootstrap' 
import { ReactComponent as LowestShipping}  from '../../../../assets/images/icons/icon-lowest-shipping-costs.svg'
import { ReactComponent as AdsGrowMore}  from '../../../../assets/images/icons/icon-ads-grow-more.svg'
import { ReactComponent as DayDispatch}  from '../../../../assets/images/icons/icon-next-day-dispatch.svg'
import { ReactComponent as BusinessInsights}  from '../../../../assets/images/icons/icon-business-insights.svg'
import BusinessBanner from '../../../../assets/images/business-banner.webp'
import { useTranslation } from 'react-i18next'
const GrowYourBusiness = () => {
    const {t} = useTranslation()
    const home = t('home',{returnObjects:true})
    const imageView = {
        "g1" : <LowestShipping/>,
        "g2" : <AdsGrowMore/>,
        "g3" : <DayDispatch/>,
        "g4" : <BusinessInsights/>,
        "m1" : BusinessBanner
    }
  return (
    <>
      <section className='grow-your-business'>
        <div className="business-left">
          <Container>
            <div className="business-content">
              <h2> {home.GrowBusiness.title}</h2>
              <ul className='business-card-list'>
                    {home?.GrowBusiness?.cardList?.map((cardList,i)=> 
                    <>
                         <li key={i}>
                  <div className="business-card">
                      <span>{imageView[cardList.image]}</span>
                      <h3>{cardList.title}</h3>
                      <p>{cardList.description}</p>
                  </div>
                </li>
                    </>
                    )}
              </ul>
            </div>
          </Container>
        </div>
        <div className="business-right">
            <img src={imageView[home.GrowBusiness.mainimage]} alt="business-banner" />
        </div>
      </section>  
    </>
  )
}

export default GrowYourBusiness