import React from 'react'
import ProductCard from '../../../../../components/ProductCard/ProductCard'
import FilterModal from '../../../../../components/FilterModal/FilterModal'

const ToBeDispatch = () => {
  return (
    <>
      <div className="tab-left">
        <label class="selectAll" for="selectAll"><input type="checkbox" id='selectAll'/>Select All Orders</label>
        <ProductCard id={3}/>

      </div>
      <div className="tab-right">
        <FilterModal/>
      </div>
    </>
  )
}

export default ToBeDispatch