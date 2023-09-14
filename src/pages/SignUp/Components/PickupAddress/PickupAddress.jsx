import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../../components/Button'
import { Row, Col, Dropdown } from 'react-bootstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { bankdetails } from '../../../../config/routingConsts'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { sellerProtectedData } from '../../../../Redux-Toolkit/Slices/authSlice'
import TimePicker from 'rc-time-picker'
import { SELLER_CITY, SELLER_PICKUPADDRESS, SELLER_STATE } from '../../../../Redux-Toolkit/Actions/sagaActions'
import OutsideClickListener from '../../../../components/OutsideClickListener'
import moment from 'moment'

const PickupAddress = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { t } = useTranslation()
  const { state } = useLocation()
  const homePage = t('home', { returnObjects: true })
  const navigate = useNavigate()
  const validationSchema = yup.object({
    buildingName: yup.string().required('Please Enter Building Name'),
    areaName: yup.string().required('Please Enter Area Name'),
    pincode: yup.string().required('Please Enter Pincode'),
    city: yup.string().required('Please Enter City '),
    state: yup.string().required('Please Enter State'),
    agree: yup.boolean().oneOf([true], 'Please Check Agree'),
    days: yup.mixed().test("test", "Please select Days", (value) => {
      if (value.length === 0) {
        return false
      } else {
        return true
      }
    }),
    totime: yup.string().required("Please Enter Pickup to Time"),
    fromtime: yup.string().required("Please Enter Pickup from Time")
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' })

  //Get the State Details using through API calling
  useEffect(() => {
    dispatch({
      type: SELLER_STATE, payload: {
        search: "",
        countryId: "64899170dc7f78ae40c645cb"
      }
    })
  }, [state === "pickupaddress"])

  // When Click any State on DropDown then get state id and API Calling
  const [stateId, setStateId] = useState(null)
  const [cityID, setCityID] = useState(null)
  useEffect(() => {
    if (stateId != null) {
      dispatch({ type: SELLER_CITY, payload: { "stateId": stateId, "search": "", } })
    }
  }, [stateId])
  const Days = [{ id: "1", title: "Monday" }, { id: "2", title: "Tuesday" }, { id: "3", title: "Wednesday" }, { id: "4", title: "Thursday" }, { id: "5", title: "Friday" }, { id: "6", title: "Saturday" }, { id: "7", title: "Sunday" }]
  const { data, cityData } = useSelector((action) => action.cityStateSlice)
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch({
      type: SELLER_PICKUPADDRESS, payload: {
        buildingName: data?.buildingName,
        streetName: data?.areaName,
        pincode: data?.pincode,
        cityId: cityID,
        stateId: stateId,
        countryId: "64899170dc7f78ae40c645cb",
        operationalDays : data?.days,
        fromTime : data?.fromtime,
        toTime : data.totime
      }
    })
  }
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    // This effect will update the form controller's value whenever selectedItems change.
    setValue('days', selectedItems);
  }, [selectedItems]);

  const dropdownRef = useRef(null);

  // Call this function when clicking outside the dropdown to set toggle to true
  const handleOutsideClick = () => {
    setToggle(false);
  };

  // Add an outside click listener to handle dropdown closing
  OutsideClickListener(dropdownRef, handleOutsideClick);

  
  return (
    <section className='card-view sign-up-steps'>
      <div className="head">
        <h2>{homePage.PickupAddress.title}</h2>
      </div>
      <div className="body-content pickup-address-content">
        <form onSubmit={handleSubmit(onSubmit)} action="" className='steps-form'>
          <div className="info-label">{homePage.PickupAddress.innerTitle}</div>
          <p className='registered-check'><input type="checkbox" id="products-check" /><label htmlFor="products-check">{homePage.PickupAddress.checkboxTitle}</label></p>
          <Row>
            <Col lg="12">
              <div className="form-group">
                <label htmlFor="">{homePage.PickupAddress.buildingNameTitle}</label>
                <input type="text" {...register("buildingName")} />
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.buildingName?.message}
                </span>
                {/* value={'Deja Blue'}  */}
              </div>
            </Col>
            <Col lg="12">
              <div className="form-group">
                <label htmlFor="">{homePage.PickupAddress.areaNameTitle}</label>
                <input type="text"  {...register("areaName")} />
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.areaName?.message}
                </span>
                {/* value={'Akshya Nagar 1st Block 1st Cross'} */}
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="form-group">
                <label htmlFor="">{homePage.PickupAddress.pincodeTitle}</label>
                <input type="text"  {...register("pincode")} />
                {/* value={'560016'} */}
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.pincode?.message}
                </span>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="form-group">
                <label htmlFor="">{homePage.PickupAddress.stateTitle}</label>
                <Controller
                  control={control}
                  name="state"
                  render={({
                    field: {
                      register,
                      onChange,
                      onBlur,
                      value,
                      name,
                      ref
                    },
                    fieldState: {
                      invalid,
                      isTouched,
                      isDirty,
                      error
                    },
                    formState
                  }) => (
                    <Dropdown
                      id="dropdown-basic-button"
                      drop="down-centered"
                      onSelect={(e) => {
                        onChange(e)
                        setValue("city", null)
                      }}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="icontrol"
                      >
                        {value ?? 'Select'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {data?.map((list, index) => {
                          return <Dropdown.Item key={index} eventKey={list.name} onClick={() => setStateId(list._id)} >
                            {list.name}
                          </Dropdown.Item>
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                />
                {/* value={'Bangalore'} */}
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.state?.message}
                </span>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="form-group">
                <label htmlFor="">{homePage.PickupAddress.cityTitle}</label>
                <Controller
                  control={control}
                  name="city"
                  render={({
                    field: {
                      register,
                      onChange,
                      onBlur,
                      value,
                      name,
                      ref
                    },
                    fieldState: {
                      invalid,
                      isTouched,
                      isDirty,
                      error
                    },
                    formState
                  }) => (
                    <Dropdown
                      id="dropdown-basic-button"
                      drop="down-centered"
                      onSelect={(e) => onChange(e)}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="icontrol"
                      >
                        {value ?? 'Select'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {cityData?.map((list, index) => {
                          return <Dropdown.Item key={index} eventKey={list.name} onClick={() => setCityID(list._id)} >
                            {list.name}
                          </Dropdown.Item>
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                />
                {/* <input type="text"  {...register("city")} /> */}
                {/* value={'Bangalore'} */}
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.city?.message}
                </span>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="form-group Operational-days">
                <label htmlFor="">Operational Days</label>
                {/* <Controller
                  control={control}
                  name="days"
                  render={({
                    field: {
                      register,
                      onChange,
                      onBlur,
                      value,
                      name,
                      ref
                    },
                    fieldState: {
                      invalid,
                      isTouched,
                      isDirty,
                      error
                    },
                    formState
                  }) => (
                    <Dropdown
                      id="dropdown-basic-button"
                      drop="down-centered"
                      // onSelect={(e) => onChange(e)}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="icontrol"
                      >
                        {value ?? 'Select'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {Days?.map((list, index) => {
                          return <>
                            <Dropdown.Item  eventKey={list.id} >
                           <input  eventKey={list.id} type="checkbox" multiple />   {list.title}
                            </Dropdown.Item>
                          </>
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                /> */}

                <Controller
                  control={control}
                  name="days"
                  render={({
                    field: {
                      register,
                      onChange,
                      onBlur,
                      value,
                      name,
                      ref
                    },
                    fieldState: {
                      invalid,
                      isTouched,
                      isDirty,
                      error
                    },
                    formState
                  }) => (
                    <Dropdown
                      id="dropdown-basic-button"
                      drop="down-centered"
                      show={toggle}
                      // onSelect={(e) => console.log(e)}
                      ref={dropdownRef}
                    >
                      <Dropdown.Toggle
                        onClick={(e) => setToggle(!toggle)}
                        // variant="success"
                        id="dropdown-basic"
                        className="icontrol"

                      >
                        {/* {selectedItems.length > 0
              ? selectedItems.map(itemId => {
                  // Assuming Days is an array of objects with id and title properties
                  const selectedDay = Days.find(day => day.id === itemId);
                  return selectedDay ? selectedDay.title : null;
                })
              : 
              'Select'
              } */}
                        Select
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {Days?.map((list) => {
                          return (
                            <Dropdown.Item key={list.id} >
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(list.title)}
                                onChange={(e) => {
                                  const { checked } = e.target;
                                  let finaldata = [...selectedItems]
                                  if (checked) {
                                    // Add the selected item to the array
                                    finaldata = [...finaldata, list.title];
                                  } else {
                                    // Remove the selected item from the array
                                    finaldata = finaldata.filter(item => item !== list.title);
                                  }
                                  onChange(finaldata)
                                  setSelectedItems(prevSelected => {
                                    if (checked) {
                                      // Add the selected item to the array
                                      return [...prevSelected, list.title];
                                    } else {
                                      // Remove the selected item from the array
                                      return prevSelected.filter(item => item !== list.title);
                                    }
                                  })
                                }}
                              />
                              {list.title}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                />
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.days?.message}
                </span>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="form-group">
                <label htmlFor="">From Time</label>
                {/* <input type="time"  name="fromtime"  {...register("fromtime")} /> */}
                <Controller
                  control={control}
                  name="fromtime"
                  render={({
                    field: {
                      register,
                      onChange,
                      onBlur,
                      value,
                      name,
                      ref
                    },
                    fieldState: {
                      invalid,
                      isTouched,
                      isDirty,
                      error
                    },
                    formState
                  }) => (
                    <TimePicker
                    showSecond={false}
                    defaultValue={moment().hour(10).minute(0)}
                    onChange={(e) => onChange(moment(e).format("h:mm A"))}
                    format="h:mm a"
                    use12Hours
                    inputReadOnly
                    placeholder=''
                  />
                  )}
                />
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.fromtime?.message}
                </span>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="form-group">
                <label htmlFor="">To Time</label>
                {/* <input type="time" name="totime" {...register("totime")} /> */}
                <Controller
                  control={control}
                  name="totime"
                  render={({
                    field: {
                      register,
                      onChange,
                      onBlur,
                      value,
                      name,
                      ref
                    },
                    fieldState: {
                      invalid,
                      isTouched,
                      isDirty,
                      error
                    },
                    formState
                  }) => (
                    <TimePicker
                    showSecond={false}
                    defaultValue={moment().hour(10).minute(0)}
                    onChange={(e) => onChange(moment(e).format("h:mm A"))}
                    format="h:mm a"
                    use12Hours
                    inputReadOnly
                  />
                  )}
                />
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.totime?.message}
                </span>
              </div>
            </Col>
          </Row>

          <Button commonClass="solid-red-btn" text={homePage.PickupAddress.btnAddress} />
        </form>
      </div>
    </section>
  )
}

export default PickupAddress