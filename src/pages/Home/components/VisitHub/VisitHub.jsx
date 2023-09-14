import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { ReactComponent as PlayIcon } from '../../../../assets/images/icons/icon-play.svg'
import url from "../../../../assets/Video/myvideo.mp4"

import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import ModalPopup from '../../../../components/Modal/ModalPopup'
const VisitHub = () => {
  const { t } = useTranslation()
  const home = t('home', { returnObjects: true })
  const [show,setShow] = useState(false)
  const imageView = {
    "v1": <PlayIcon />
  }
  return (
    <>
      <section className='visit-hub'>
        <Container>
          <div className="visit-hub-inner">
            <h2 dangerouslySetInnerHTML={{ __html: home.VisitHub.title }}></h2>
            <NavLink to="javascript:void(0)" className='solid-red-btn' onClick={()=> setShow(true)}>{imageView[home.VisitHub.image]}{home.VisitHub.VisitLearningHub}</NavLink>
          </div>
        </Container>
      </section>
      <ModalPopup
        show={show}
        handleClose={() => setShow(false)}
        handleShow={() => setShow(true)}
        cname="visit-hub-modal"
      >
       <video  width="100%" controls>
          <source
            src={url}
            type="video/mp4"
          />
        </video>
      </ModalPopup>
    </>
  )
}

export default VisitHub