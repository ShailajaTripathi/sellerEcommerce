import React from 'react'
import ProductCard from '../../../../../components/ProductCard/ProductCard'
import FilterModal from '../../../../../components/FilterModal/FilterModal'


const OnHold = () => {

  return (
    <>
      <div className="tab-left">
  
        <ProductCard id={1}/>
        <ProductCard id={1}/>
        <ProductCard id={1}/>
        <ProductCard id={1}/>
     
      </div>
      <div className="tab-right">
        <FilterModal/>
      </div>
    </>
  )
}

export default OnHold