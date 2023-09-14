import React from 'react'
import ReturnRate from './components/ReturnRate/ReturnRate'
import Tabs from './components/Tabs/Tabs'


const ReturnOrder = () => {

  return (
    <>
      <div className='return-orders-body'>
        <ReturnRate/>
        <Tabs/>
      </div>
    </>
  )
}

export default ReturnOrder