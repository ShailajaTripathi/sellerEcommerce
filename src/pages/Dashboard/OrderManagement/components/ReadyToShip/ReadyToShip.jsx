import React from 'react'
import ProductCard from '../../../../../components/ProductCard/ProductCard'
import FilterModal from '../../../../../components/FilterModal/FilterModal'

const ReadyToShip = () => {
  return (
    <>
      <div className="tab-left">
        <label class="selectAll" for="selectAll"><input type="checkbox" id='selectAll'/>Select All Orders</label>
        <ProductCard id={4}/>
       
      </div>
      <div className="tab-right">
        <FilterModal/>
      </div>
    </>
  )
}

export default ReadyToShip