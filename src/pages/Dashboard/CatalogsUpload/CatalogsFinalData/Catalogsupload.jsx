import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ReactComponent as IconPlusWhite } from "../../../../assets/images/icons/icon-plus-white.svg";
import CatalogsUploadData from "./CatalogsListing";
import { addcatalog } from "../../../../config/routingConsts";
import DropDown from "../../../../components/DropDown/DropDown";
import Pagination from "../../../../components/Pagination";
import { SELLER_GETMAINCATEGORY, SELLER_LISTPRODUCT } from "../../../../Redux-Toolkit/Actions/sagaActions";
import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../../../components/Modal/ModalPopup";
import RightSignIcon from "../../../../assets/images/icons/right-sign.svg";
import { removeIndexDBData, sellerViewCatalogDetailDataSuccess, showingPopup } from "../../../../Redux-Toolkit/Slices/catalogSlice";
import Button from "../../../../components/Button/Button";
import { Controller, useForm } from "react-hook-form";
import { deleteDB } from "idb";
import Loader from "../../../../components/Loader";

const Catalogsupload = () => {
  const { ListProductDD,activePopup,getMainCategoryData ,isloading} = useSelector((action) => action?.catalogSlice);
  const {control} = useForm({mode:"all"})
  //start pagination
  const {pathname} = useLocation()
  const [currentPage, setCurrentPage] = useState(1);
  const [DataLimit, setDataLimit] = useState(5);
  const [TotalPagies, setTotalPagies] = useState(1);
  const [SortKey, setSortKey] = useState("");
  const [selectDropDowValue, setSelectDropDownVAlue] = useState();
  const navigate = useNavigate()
  let totalCatalog = ListProductDD?.meta?.totalCount
  const [searchFilter,setSearchFilter] = useState()
  const [first, setfirst] = useState(undefined)
  const mili = async () =>{
    const dbName = 'myIndexedDB'
    try {
    const ABC = await deleteDB(dbName) // Delete the entire IndexedDB database
    setfirst(ABC)
    } catch (error) {
        console.error('Error deleting IndexedDB database:', error)
    }
  }

// useEffect(()=>{
  //     mili()
  // },[])

  const handleSearch = (e) =>{
    // console.log(e?.name,"3333");
    setSearchFilter(e?._id)
  }

  useEffect(() => {
    setTotalPagies(Math.ceil(ListProductDD?.meta?.totalCount / DataLimit));
  }, [ListProductDD?.meta?.totalCount, DataLimit]);

  const handleChange = (eventkey) => {
    setDataLimit(eventkey);
    setCurrentPage(1);
  };
  const handleChangePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage);
      // localStorage.setItem('currentpage', JSON.stringify(currentPage))
    },
    [currentPage]
  );
  // end pagination
   
    /////// active tab handle data list ////
    const [tabNameForTableList,setTabNameForTableList] = useState('')
    const handletabChangeData = (i,e) =>{
      setActive(i)
      setTabNameForTableList(e)
      // alert(e)
    }
    ////// end active tab handle data list ///

    const [Active, setActive] = useState(0)
      console.log(Active,"Active");
    const [Tabdata, setTabData] = useState([
        {
            Tab_Name: 'All',
            count:"totalCount",
        },
        {
            Tab_Name: 'QC in Process',
            count: 'pendingCount'
        },
        {
            Tab_Name: 'Live',
            count: 'activeCount'
        },
        {
            Tab_Name: 'QC Error',
            count: 'deletedCount'
        }
    ])

    ///// set active tab data //////
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
      setActiveTab(index);
    };
    //// End active data /////



    // List Api calling for table data //////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sellerViewCatalogDetailDataSuccess([]))
    dispatch({
      type: SELLER_LISTPRODUCT,
      payload: {
        limit: DataLimit,
        page: currentPage,
        // search: searchFilter,
        sortKey: SortKey,
        // sortKey:tabNameForTableList === "All" ? "" : tabNameForTableList,
        sortBy: -1,
        mainCategoryId:searchFilter,
        status : Active === 1 ? 7 
                 :Active === 2 ? 1 
                 :Active === 3 ? 3
                 : ''
      },
      callback :()=>{
        console.warn("for war");
        const dbName = 'myIndexedDB'
        deleteDB(dbName)
      }
    });
    dispatch({type:SELLER_GETMAINCATEGORY})
  }, [DataLimit, currentPage, SortKey,searchFilter,tabNameForTableList]);

///// end list api calling /////
   
    return (
        <>
      {isloading ? <Loader/> : <>
      <div className="catalogs-upload-body">
            {first !== undefined && <Loader/>}

                <div className="catalogs-upload-head">
                    <div className="left">
                        Total Uploads Done:{' '}
                        <span>{ListProductDD?.meta?.totalCount}</span>
                    </div>
                    <Link to={addcatalog} state="Catalogs Upload" className="solid-red-btn">
                        <IconPlusWhite /> Add Catalog
                    </Link>
                </div>
                <ul className="site-tab-list desktop" >
                    {Tabdata?.map((TabdataList, i) => {
                      console.log(TabdataList,"TabdataList?.count");
                        return (
                            <li key={i}>
                                <button
                                    className={
                                        Active === i
                                            ? 'tab-btn active'
                                            : 'tab-btn'
                                    }
                                    // onClick={() => setActive(i)}
                                    onClick={()=>handletabChangeData(i,TabdataList?.Tab_Name)}
                                >
                                    {TabdataList?.Tab_Name}{' '}
                                    {TabdataList?.count && (
                                        <span>{ListProductDD?.meta?.[TabdataList?.count] || '0'}</span>
                                    )}{' '}
                                </button>
                            </li>
                        )
                    })}
                    <li className="category-dropdown">

                    {/* new dropdown */}
                    <Controller
                        control={control}
                        name="name"
                        render={({
                          field: { register, onChange, onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                          formState,
                        }) => (
                          <Dropdown
                            id="dropdown-basic-button"
                            drop="down-centered"
                            onSelect={(e) => {
                              onChange(JSON.parse(e))
                              handleSearch(JSON.parse(e))
                            }}
                          >
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                              className="icontrol"
                            >
                            {value?.name ?? "Select"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {getMainCategoryData?.map((list, index) => (
                                  <Dropdown.Item
                                    key={index}
                                    eventKey={JSON.stringify(list)}
                                    className={value?.name === list?.name ? "active" : ""}
                                  >
                                    
                                    {list?.name}
                                  </Dropdown.Item> ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                    />
                    {/* end drop down */}

                        {/* <DropDown
                            DropDownCategory={DropDownData}
                            name="catalog"
                        /> */}
                    </li>
                </ul>

        <ul className="site-tab-list mobile">
          <li className="category-dropdown">
            {/* <DropDown DropDownCategory={DropDownData} name="catalog" /> */}
          </li>
          {Tabdata.map((TabdataList, i) => {
            return (
              <>
                <li key={i}>
                  <button
                    className={Active === i ? "tab-btn active" : "tab-btn"}
                    // onClick={() => handleTabClick(i)}
                    onClick={() => {
                      if (Active === i) {
                        setActive(null);
                      } else {
                        setActive(i);
                      }
                      // setActive(i)
                    }}
                  >
                    {TabdataList.Tab_Name}{" "}
                    {TabdataList.count && (
                      <span>
                        {ListProductDD?.meta?.[TabdataList?.count] || "0"}
                      </span>
                    )}{" "}
                  </button>
                </li>
                {Active === i && (
                  <li className="tab-body">
                     <CatalogsUploadData ListProductDD={ListProductDD} /> 
                  </li>
                )}
              </>
            );  
          })}
        </ul>

        {/* {Tabdata.map((TabdataList, i) => {
          return (
            <React.Fragment key={i}>
              {activeTab === i && (
                <div className="tab-content">
                  <CatalogsUploadData
                    ListProductDD={ListProductDD}
                    tabName={TabdataList?.Tab_Name} // Pass the tab name to your data component
                  />
                </div>
              )}
            </React.Fragment>
          );
        })} */}
      </div>
      <div className="pagination-wrap">
        <div className="showing-pages">
        <p className="m-0">
            Showing{' '}
            {(currentPage - 1) * DataLimit +
                1}{' '}
            to{' '}
            {Math.min(
                currentPage * DataLimit,
                totalCatalog
            )}{' '}
            of {totalCatalog} Catalogs{' '}
        </p>
          {/*  */}
          {/* <p className="m-0">
            Page 1
            to 
            {TotalPagies}
          </p> */}
        </div>
        <Pagination
          total={TotalPagies}
          current={currentPage}
          onChangePage={handleChangePage}
        />
        <div className="itemperpage-box">
          <p className="item-text m-0">Results per page</p>
          <Dropdown onSelect={handleChange}>
            <Dropdown.Toggle id="dropdown-basic">{DataLimit}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="5">5</Dropdown.Item>
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="15">15</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {activePopup === 1 &&
        <ModalPopup
        show={activePopup === 1}
        handleClose={() => dispatch(showingPopup(0))}
        //  handleShow={() => setShow(true)}
        cname="visit-hub-modal congratulations-modal"
        >
        <img src={RightSignIcon} alt="" />
        <div className="main-title">Congratulations!</div>
        <div className="gray-box">
          <div className="title">Catalog updated successfully</div>
          <p>
            Your catalog will go live after qulity checks are done. it usually
            takes around 48 hours.
          </p>
        </div>
        <div className="modal-btn-group">
          <Button
            type="button"
            commonClass="solid-black-btn modal-btn"
            text={"Go Home"}
            onClick={() => {
              dispatch(showingPopup(0))
              dispatch({
                type: SELLER_LISTPRODUCT,
                payload: {
                  limit: DataLimit,
                  page: currentPage,
                  search: searchFilter,
                  sortKey: SortKey,
                  sortBy: -1,
                }
              });
            }}

          />
          <Button
            type="button"
            commonClass="solid-red-btn modal-btn"
            text={"Upload More Catalog"}
            onClick={() => navigate("/addcatalog")}
          />
        </div>
        </ModalPopup>
      }
      </>}
    </>
  );
};

export default Catalogsupload;
