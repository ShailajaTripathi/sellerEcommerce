import React, { useState } from 'react'
import Button from '../Button/Button'
import { Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import DropDown from '../DropDown/DropDown'

const validationSchema = Yup.object().shape({
    // dob: Yup.string()
    //     .required('Date of Birth is required')
    //     .matches(
    //         /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
    //         'Date of Birth must be a valid date in the format YYYY-MM-DD'
    //     )
})

const FilterModal = ({ id }) => {
  const DropDownCategory = [{name : "Women",id : "1"},{name : "Man",id : "2"},{name : "Kids",id : "3"}]
  const DropDownCourier = [{name : "FedEx", id : "1"},{name : "FedEx 1",id : "2"},{name : "FedEx 2",id : "3"}]
  const DropDownReturn = [{name : "Detective Product", id : "1"},{name : "Detective Product 1",id : "2"},{name : "Detective Product 2",id : "3"}]

    const [toggle, setToggle] = useState(false)
    const ToggleDiv = (e) => {
        setToggle(!toggle)
    }
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({ resolver: yupResolver(validationSchema) })

    const onSubmit = (data) => { console.log(data)}
console.log(errors);
    return (
        <div className="admin-card">
            <div className={`head ${toggle ? ' active' : ''}`}>
                <h2>Filter</h2>
                <div className="head-btn-roup">
                    <Button className="clear-btn" text={'Clear'} />
                    <span className="mobile-toggle" onClick={ToggleDiv}></span>
                </div>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`filter-body ${toggle ? ' active' : ''}`}
            >
                <Row>
                    {id === 1 ? (
                        ''
                    ) : (
                        <>
                            <Col lg="12">
                                <div className="form-group">
                                    <label htmlFor="">SKU ID</label>
                                    <input
                                        type="text"
                                        placeholder="SKU ID"
                                        {...register('skuid')}
                                    />
                                </div>
                            </Col>
                            <Col lg="6" md="6" sm="6">
                                <div className="form-group">
                                    <label htmlFor="">Order Date Min</label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        {...register('orderdatemin')}
                                    />
                                </div>
                            </Col>
                            <Col lg="6" md="6" sm="6">
                                <div className="form-group">
                                    <label htmlFor="">Order Date Max</label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        {...register('orderdatemax')}
                                    />
                                </div>
                            </Col>
                            <Col lg="6" md="6" sm="6">
                                <div className="form-group">
                                    <label htmlFor="">Dispatch Date Min</label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        {...register('dispatchdatemin')}
                                    />
                                </div>
                            </Col>
                            <Col lg="6" md="6" sm="6">
                                <div className="form-group">
                                    <label htmlFor="">Dispatch date Max</label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        {...register('dispatchdatemax')}
                                    />
                                </div>
                            </Col>
                        </>
                    )}
                    {id === 1 && (
                        <>
                            {/* Show Hiden Field */}
                            <Col lg="6" md="6" sm="6">
                                <div className="form-group">
                                    <label htmlFor="">Created Date</label>
                                    <input
                                        type="text"
                                        value={'18/07/2022'}
                                        {...register('createddate')}
                                    />
                                </div>
                            </Col>
                            <Col lg="6" md="6" sm="6">
                                <div className="form-group">
                                    <label htmlFor="">Delivered Date</label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        {...register('delivereddate')}
                                    />
                                </div>
                            </Col>
                            <Col lg="12">
                                <div className="form-group">
                                    <label htmlFor="">Category</label>
                                    <DropDown DropDownCategory={DropDownCategory} control={control} name='category'/>
                                </div>
                            </Col>
                            <Col lg="12">
                                <div className="form-group">
                                    <label htmlFor="">Courier Partner</label>
                                    <DropDown DropDownCategory={DropDownCourier} control={control} name = "courier"/>
                                </div>
                            </Col>
                            <Col lg="12">
                                <div className="form-group">
                                    <label htmlFor="">Return Type</label>
                                    <DropDown DropDownCategory={DropDownReturn} control={control} name = "return"/>
                                </div>
                            </Col>
                            {/* End Show Hiden Field */}
                        </>
                    )}
                    <Col lg="6" md="6" sm="6">
                        <Button
                            className="solid-black-btn filter-btn"
                            text={'Filter'}
                        />
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default FilterModal
