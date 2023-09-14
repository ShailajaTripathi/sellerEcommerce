import React from 'react'
import ProductCard from '../../../../../components/ProductCard/ProductCard'
import FilterModal from '../../../../../components/FilterModal/FilterModal'
import {ReactComponent as IconDownload} from '../../../../../assets/images/icons/icon-download-white.svg'

const Shipped = () => {
  return (
    <>
      <div className="tab-left">
        <button className='download-invoice'><IconDownload/>Download Invoice Details Excel</button>
        <ProductCard id={5}/>
       
      </div>
      <div className="tab-right">
        <FilterModal/>
      </div>
    </>
  )
}

export default Shipped