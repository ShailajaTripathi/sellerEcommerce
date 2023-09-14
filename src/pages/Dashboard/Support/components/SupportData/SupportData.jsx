import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

function SupportData() {
  return (
    <div className='admin-card'>
        <div className="head">
          <h2>Catalogs & Pricing</h2>
        </div>
        <div className="support-body-content">
          <Accordion className='site-accordion' defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Catalog is not live</Accordion.Header>
              <Accordion.Body>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>I want to change catalog description</Accordion.Header>
              <Accordion.Body>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>My order is picked up but still in ready to ship</Accordion.Header>
              <Accordion.Body>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
    </div>
  )
}

export default SupportData