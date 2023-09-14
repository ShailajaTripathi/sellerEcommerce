import React, { useEffect, useRef, useState } from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import Button from '../../../../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import { SELLER_CITY, SELLER_EDITPROFILE, SELLER_PICKUPADDRESS, SELLER_STATE, SELLER_VIEWPROFILE } from '../../../../../Redux-Toolkit/Actions/sagaActions'
import Loader from '../../../../../components/Loader/Loader'
import OutsideClickListener from '../../../../../components/OutsideClickListener/OutsideClickListener'

function ShippingAndReturn() {
  const { data: viewProfileData, isloading } = useSelector((action) => action.settingsSlice)
  const { data, cityData } = useSelector((action) => action.cityStateSlice)
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch()
  const validationSchema = yup.object({
    buildingName: yup.string().required('Please Enter Building Name'),
    streetName: yup.string().required('Please Enter StreetName Name'),
    pincode: yup.string().required('Please Enter Pincode'),
    state: yup.mixed().required('Please Enter State'),
    city: yup.mixed().required('Please Enter City'),
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
  // const validationSchema2 = yup.object({
  //   buildingName: yup.string().required('Please Enter Building Name'),
  //   streetName: yup.string().required('Please Enter StreetName Name'),
  //   pincode: yup.string().required('Please Enter Pincode'),
  //   state: yup.mixed().required('Please Enter State'),
  //   city: yup.mixed().required('Please Enter City'),
  // })
  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' ,defaultValues : {
     days : []
  }})

  // const {
  //   reset: rest2,
  //   register: register2,
  //   handleSubmit: handleSubmit2,
  //   control: control2,
  //   setValue: setValue2,
  //   watch: watch2,
  //   formState: { errors: errors2 }
  // } = useForm({ resolver: yupResolver(validationSchema2), mode: 'all' })
  //Get the State Details using through API calling
  useEffect(() => {
    dispatch({
      type: SELLER_STATE, payload: {
        search: "",
        countryId: "64899170dc7f78ae40c645cb"
      }
    })
  }, [])

  // When Click any State on DropDown then get state id and API Calling
  useEffect(() => {
    if (watch('state')?.stateId != null
      //  || watch2('state')?.stateId != null
    ) {
      dispatch({
        type: SELLER_CITY, payload: {
          "stateId": watch('state')?.stateId
          , "search": "",
        }
      })
    }
  }, [watch('state')?.stateId,
    // watch2('state')?.stateId
  ])
  const Days = [{ id: "1", title: "Monday" }, { id: "2", title: "Tuesday" }, { id: "3", title: "Wednesday" }, { id: "4", title: "Thursday" }, { id: "5", title: "Friday" }, { id: "6", title: "Saturday" }, { id: "7", title: "Sunday" }]
  const [toggle, setToggle] = useState(false)
console.log("selectedItems",selectedItems)
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


  useEffect(() => {
    if (viewProfileData) {
      setValue("buildingName", viewProfileData?.pickupAddress?.buildingName)
      setValue("streetName", viewProfileData?.pickupAddress?.streetName)
      setValue("pincode", viewProfileData?.pickupAddress?.pincode)
      setValue("state", { stateId: viewProfileData?.pickupAddress?.stateId, state: viewProfileData?.pickupAddress?.state })
      setValue("city", { cityId: viewProfileData?.pickupAddress?.cityId, city: viewProfileData?.pickupAddress?.city })
      setValue("fromtime",viewProfileData?.pickupAddress?.fromTime)
      setValue("totime",viewProfileData?.pickupAddress?.toTime)
      setValue("days",viewProfileData?.pickupAddress?.operationalDays)
      setSelectedItems(viewProfileData?.pickupAddress?.operationalDays)
      // setValue("days", viewProfileData?.pickupAddress?.operationalDays)
      // setValue2("buildingName", viewProfileData?.pickupAddress?.buildingName)
      // setValue2("streetName", viewProfileData?.pickupAddress?.streetName)
      // setValue2("pincode", viewProfileData?.pickupAddress?.pincode)
      // setValue2("state", { stateId: viewProfileData?.pickupAddress?.stateId, state: viewProfileData?.pickupAddress?.state })
      // setValue2("city", { cityId: viewProfileData?.pickupAddress?.cityId, city: viewProfileData?.pickupAddress?.city })
    }
  }, [viewProfileData])

  const onSubmit = (data) => {
    console.log(data,"datatatattaatt")
    dispatch({
      type: SELLER_PICKUPADDRESS, payload: {
        buildingName: data?.buildingName,
        streetName: data?.streetName,
        pincode: data?.pincode,
        cityId: data.city.cityId,
        stateId: data?.state?.stateId,
        countryId: "64899170dc7f78ae40c645cb",
        fromTime : data?.fromtime,
        toTime : data?.totime,
        operationalDays : data?.days
      }
    })
    dispatch({ type: SELLER_VIEWPROFILE })
  }
  // const onSubmit2 = (data) => {
  //   dispatch({
  //     type: SELLER_PICKUPADDRESS, payload: {
  //       buildingName: data.buildingName,
  //       streetName: data.streetName,
  //       pincode: data.pincode,
  //       cityId: data.city.cityId,
  //       stateId: data.state.stateId,
  //       countryId: "64899170dc7f78ae40c645cb"
  //     }
  //   })
  //   dispatch({ type: SELLER_VIEWPROFILE })
  //   // reset()
  // }
  return (
    <>
      <div className="admin-card setting-content">
        <div className="head">
          <h2>Shipping Address & Details</h2>
        </div>
        {isloading && <Loader />}
        <div className="support-body-content">
          <form action="" className='profile-setting-form' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* <Col xxl="6" lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">Operation Days</label>
                  <Dropdown
                    id="dropdown-basic-button"
                    drop="down-centered"
                  >
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
                      All Days
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Women">Day 1</Dropdown.Item>
                      <Dropdown.Item eventKey="Man">Day 2</Dropdown.Item>
                      <Dropdown.Item eventKey="Kids">Day 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
              <Col xxl="6" lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">Shipping Fees</label>
                  <input type="text" />
                </div>
              </Col> */}

              <Col xxl="12">
                <div className="form-group">
                  <p className='text-red address-head'>Address Details</p>
                  <label htmlFor="">Room/ Floor/ Building Name</label>
                  <input type="text" name="buildingName" {...register("buildingName")} />
                  <span style={{ color: 'red' }}>
                    {errors.buildingName?.message}
                  </span>
                </div>
              </Col>
              <Col xxl="12">
                <div className="form-group">
                  <label htmlFor="">Street/ Area Name</label>
                  <input type="text" name="streetName" {...register("streetName")} />
                  <span style={{ color: 'red' }}>
                    {errors.streetName?.message}
                  </span>
                </div>
              </Col>
              <Col xxl="4" lg="4" md="4">
                <div className="form-group">
                  <label htmlFor="">Pincode</label>
                  <input type="text" name="pincode" {...register("pincode")} />
                  <span style={{ color: 'red' }}>
                    {errors.pincode?.message}
                  </span>
                </div>
              </Col>
              <Col xxl="4" lg="4" md="4">
                <div className="form-group">
                  <label htmlFor="">State</label>
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
                          onChange(JSON.parse(e))
                          setValue("city", null)
                        }}
                      >
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="icontrol"
                        >
                          {value?.state ?? "Select"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {data?.map((list, index) => (
                            <Dropdown.Item key={index} eventKey={JSON.stringify({ stateId: list._id, state: list.name })} >
                              {list.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  />
                  <span style={{ color: 'red' }}>
                    {errors?.state?.message}
                  </span>
                </div>
              </Col>
              <Col xxl="4" lg="4" md="4">
                <div className="form-group">
                  <label htmlFor="">City</label>
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
                        onSelect={(e) => onChange(JSON.parse(e))}
                      >
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="icontrol"
                        >
                          {value?.city ?? "Select"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {cityData?.map((list, index) => (
                            <Dropdown.Item key={index} eventKey={JSON.stringify({ cityId: list._id, city: list.name })} >
                              {list.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  />
                  <span style={{ color: 'red' }}>
                    {errors?.city?.message}
                  </span>
                </div>
              </Col>
              <Col xxl="4" lg="4" md="4">
                <div className="form-group Operational-days">
                  <label htmlFor="">Operational Days</label>
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
                        {console.log(value,"value")}
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
                          {
                            console.log(value,"value")
                          }
                          {Days?.map((list) => {
                            return (
                              <Dropdown.Item key={list.id} >
                                {/* {
                                  console.log(value,".includes",(list.title))
                                } */}
                                <input
                                  type="checkbox"
                                  checked={value.includes(list.title)}
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
              <Col xxl="4" lg="4" md="4">
                <div className="form-group">
                  <label htmlFor="">From Time</label>
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
                        // defaultValue={moment()?.format(value)}
                        value={value ? moment(value, 'h:mm A') : null }
                        onChange={(e) => onChange(moment(e)?.format("h:mm A"))}
                        format="h:mm a"
                        use12Hours
                        inputReadOnly
                      />
                    )}
                  />
                  <span className='invalid' style={{ color: 'red' }}>
                    {errors.fromtime?.message}
                  </span>
                </div>
              </Col>
              <Col xxl="4" lg="4" md="4">
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
                    value={value ? moment(value, "h:mm A"): null}
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
              <Col lg="12">
                <Button commonClass='solid-red-btn' text={'Edit'} />
              </Col>
            </Row>
          </form>
        </div>
      </div>
      {/* <div className="admin-card setting-content">
        <div className="head">
          <h2>Return Address & Details</h2>
        </div>
        <div className="support-body-content">
          <form action="" className='profile-setting-form' onSubmit={handleSubmit2(onSubmit2)}>
            <Row>
              <Col xxl="6" lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">Operation Days</label>
                  <Dropdown
                    id="dropdown-basic-button"
                    drop="down-centered"
                  >
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
                      All Days
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Women">Day 1</Dropdown.Item>
                      <Dropdown.Item eventKey="Man">Day 2</Dropdown.Item>
                      <Dropdown.Item eventKey="Kids">Day 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
              <Col xxl="6" lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">Shipping Fees</label>
                  <input type="text" />
                </div>
              </Col>
              <Col xxl="12">
                <div className="form-group">
                  <p className='text-red address-head'>Address Details</p>
                  <label htmlFor="">Room/ Floor/ Building Name</label>
                  <input type="text" {...register2("buildingName")} />
                </div>
              </Col>
              <Col xxl="12">
                <div className="form-group">
                  <label htmlFor="">Street/ Area Name</label>
                  <input type="text" {...register2("streetName")} />
                </div>
              </Col>
              <Col xxl="6" lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">Pincode</label>
                  <input type="text" {...register2("pincode")} />
                </div>
              </Col>
              <Col xxl="6" lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">State</label>
                  <Controller
                    control={control2}
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
                          onChange(JSON.parse(e))
                          setValue2("city", null)
                        }}
                      >
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="icontrol"
                        >
                          {value?.state ?? "Select"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {data?.map((list, index) => (
                            <Dropdown.Item key={index} eventKey={JSON.stringify({ stateId: list._id, state: list.name })} >
                              {list.name}
                            </Dropdown.Item>

                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  />
                </div>
              </Col>
              <Col xxl="6" lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">City</label>
                  <Controller
                    control={control2}
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
                        onSelect={(e) => onChange(JSON.parse(e))}
                      >
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown-basic"
                          className="icontrol"
                        >
                          {value?.city ?? "Select"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {cityData?.map((list, index) => (
                            <Dropdown.Item key={index} eventKey={JSON.stringify({ cityId: list._id, city: list.name })} >
                              {list.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  />
                </div>
              </Col>
              <Col lg="12">
                <Button commonClass='solid-red-btn' text={'Edit'} />
              </Col>
            </Row>
          </form>
        </div>
      </div> */}
    </>
  )
}

export default ShippingAndReturn