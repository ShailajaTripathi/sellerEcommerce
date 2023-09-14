import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconBackArrow } from "../../../../assets/images/icons/icon-back-red.svg";
import SelectCategory from "../AddCatalog/components/SelectCategory";
import AddProductBasicDetails from "../AddCatalog/components/AddProductBasicDetails";
import AddProductVariant from "../AddCatalog/components/AddProductVariant";
import ModalPopup from "../../../../components/Modal/ModalPopup";
import { useDispatch } from "react-redux";
import { deleteDB } from 'idb';
import {
  SELLER_COUNTRY,
  SELLER_GETMAINCATEGORY,
  SELLER_MATERIAL,
  SELLER_TIME,
  SELLER_TYPE,
} from "../../../../Redux-Toolkit/Actions/sagaActions";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader";

function AddCatalog({ activeTab }) {
  const dispatch = useDispatch();
  const { isloading } = useSelector((action) => action?.catalogSlice)

  const [Active, setActive] = useState(
    JSON.parse(sessionStorage.getItem("CatalogInnerTab")) || 0
  );

  useEffect(() => {
    if (Active === 0) {
      dispatch({ type: SELLER_GETMAINCATEGORY });
    }
    if (Active === 1) {
      dispatch({ type: SELLER_COUNTRY });
      dispatch({ type: SELLER_TYPE });
      dispatch({ type: SELLER_MATERIAL });
      dispatch({type: SELLER_TIME})
    }
    sessionStorage.setItem("CatalogInnerTab", JSON.stringify(Active));
    return () => {
      sessionStorage.removeItem("CatalogInnerTab");
      // sessionStorage.removeItem("selectCG")
    };
  }, [Active]);
  useEffect(() => {
    return async() => {
      sessionStorage.removeItem("selectCG");
      sessionStorage.removeItem("ProductBD");
      sessionStorage.removeItem("AddVariant");
      sessionStorage.removeItem("addVariantDataList");
      const dbName = 'myIndexedDB';
      try {
        await deleteDB(dbName); // Delete the entire IndexedDB database
      } catch (error) {
        console.error('Error deleting IndexedDB database:', error);
      }
    };
  }, []);
  const [Tabdata, setTabData] = useState([
    {
      Tab_Name: "Select Category",
      count: 1,
      id: 0,
      innerData: (
        <li className="tab-body">
          <SelectCategory id="Select Category" setActive={setActive} />
        </li>
      ),
    },
    {
      Tab_Name: "Add Product Basic Details",
      count: 2,
      id: 1,
      innerData: (
        <li className="tab-body">
          <AddProductBasicDetails
            id="Add Product Basic Details"
            setActive={setActive}
          />
        </li>
      ),
    },
    {
      Tab_Name: "Add Product Variant",
      count: 3,
      id: 2,
      innerData: (
        <li className="tab-body">
          <AddProductVariant id="Add Product Variant" setActive={setActive} />
        </li>
      ),
    },
  ]);
  return (
    <>
    {isloading ? <Loader/> : <>
      <div className="order-management-body add-catalog add-catalog-steps">
        <ul className="site-tab-list desktop">
          <li className="back-btn">
            <Link to={-1} className="tab-btn">
              <IconBackArrow /> Back
            </Link>
          </li>
          {/* {Tabdata.map ((TabdataList,i)=> {
        return ( 
            <li key={TabdataList?.id}><button  className={ Active === TabdataList.id  ? 'tab-btn active' : "tab-btn"} > {TabdataList.count && <span >{TabdataList.count}</span> } {TabdataList.Tab_Name} </button></li>
        )
      })} */}
          {Tabdata.map((TabdataList) => {
            return (
              <li key={TabdataList?.id}>
                <button
                  className={
                    Active === TabdataList?.id
                      ? "tab-btn active"
                      : Active - 1 === TabdataList?.id ||
                        Active - 2 === TabdataList?.id
                      ? "tab-btn iscomplete"
                      : "tab-btn "
                  }
                >
                  {Active === TabdataList.count ? (
                    <span></span>
                  ) : (
                    <span>{TabdataList?.count}</span>
                  )}{" "}
                  {TabdataList.Tab_Name}{" "}
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="site-tab-list mobile">
  
          {Tabdata.map((TabdataList, i) => {
            return (
              <React.Fragment key={i}>
                <li key={TabdataList?.id}>
                  <button
                    className={
                      Active === TabdataList?.id
                        ? "tab-btn active"
                        : Active - 1 === TabdataList?.id ||
                          Active - 2 === TabdataList?.id
                        ? "tab-btn iscomplete"
                        : "tab-btn "
                    }
                    onClick={() => {
                      if (Active === TabdataList?.id) {
                        setActive(TabdataList?.id);
                      }
                    }}
                  >
                    {TabdataList.count && <span>{TabdataList.count}</span>}{" "}
                    {TabdataList.Tab_Name}{" "}
                  </button>
                </li>
                {Active === TabdataList?.id && TabdataList?.innerData}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>}
    </>
  );
}

export default AddCatalog;
