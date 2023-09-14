import React from 'react'
import {Container} from 'react-bootstrap' 
import { ReactComponent as CallIcon}  from '../../../../assets/images/icons/icon-call.svg'
import { ReactComponent as MailIcon}  from '../../../../assets/images/icons/icon-mail.svg'
import { useTranslation } from 'react-i18next'
import SupplierSupportImage from '../../../../assets/images/supplier-support-image.webp'
import { Link } from 'react-router-dom'

const Support = () => {
    const {t} = useTranslation()
    const home = t('home',{returnObjects:true})
    const imageView = {
        "m2" : SupplierSupportImage,
        "contact1" : <CallIcon/>,
        "email1" : <MailIcon/>
    }
  return (
    <section className='supplier-support'>
      <Container>
        <div className="support-inner">
          <div className="support-left">
            <img src={imageView[home.Support.mainmage]} alt="support-image" />
          </div>
          <div className="support-right">
            <h2 dangerouslySetInnerHTML={{__html : home.Support.title}}></h2>
            <p>{home.Support.descreption}</p>
            <ul className='contact-card-list'>

                <li>
                  <div className="card">
                    <span className='circle'>{imageView[home.Support.contactDetail.image]}</span>
                    <div className="details">
                      <span>{home.Support.contactDetail.title} </span>
                      <Link to="tel:+ 91 99999 99999">{home.Support.contactDetail.conNumber}</Link>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <span className='circle'>{imageView[home.Support.emailDetails.image]}</span>
                    <div className="details">
                      <span> {home.Support.emailDetails.title} </span>
                      <Link to="mailto:pernias.popup@gmail.com"> {home.Support.emailDetails.email} </Link>
                    </div>
                  </div>
                </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Support