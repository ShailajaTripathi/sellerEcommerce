import React from 'react'
import ProductCard from '../../../../../components/ProductCard/ProductCard'
import FilterModal from '../../../../../components/FilterModal/FilterModal'

const Cancelled = () => {
  return (
    <>
      <div className="tab-left">
        <ProductCard id={6}/>
       
      </div>
      <div className="tab-right">
        <FilterModal/>
      </div>
    </>
  )
}

export default Cancelled