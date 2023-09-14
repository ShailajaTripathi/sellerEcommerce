import React from 'react'
import { useTranslation } from 'react-i18next'
import {Container} from 'react-bootstrap'  

const Counter = () => {
    const {t} = useTranslation()
    const home = t('home',{returnObjects:true})

  return (
    <>
      <section className='counter'>
        <Container>
          <ul className='counter-list'>
              {home.counter.map ((counter,i)=> {
                  return <>  
                    <li key={i}>
              <h2>{counter.count} <span>+</span></h2>
              <p dangerouslySetInnerHTML={{__html : counter.countDescreption}}></p>
            </li>
                          </>
              })}
          </ul>
        </Container>
      </section>
    </>
  )
}

export default Counter