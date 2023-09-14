import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from '../../../../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { SELLER_EDITPROFILE, SELLER_VIEWPROFILE } from '../../../../../Redux-Toolkit/Actions/sagaActions'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Loader from '../../../../../components/Loader/Loader'
function ProfileSettings() {
    const dispatch = useDispatch()
    const { data, isloading } = useSelector((action) => action.settingsSlice)
    const validationSchema = yup.object({
        fullName: yup.string().required('Please Enter First Name'),
        storeName: yup.string().required('Please Enter Store Name'),
        email: yup.string().required('Please Enter Email Address'),
        // .max(
        //     30,
        //     'Username or Email must be between 8 to 30 characters long'
        // ),
        phoneNo: yup.string().required('Please Enter Phone Number'),

    })
    const {
        reset,
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' })

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data])

    const onSubmit = (data) => {
        dispatch({ type: SELLER_EDITPROFILE, payload: { fullName: data.fullName, storeName: data.storeName, email: data.email, phoneNo: data.phoneNo } })
        // reset()
    }

    return (

        <div className="admin-card setting-content">
            <div className="head">
                <h2>Profile Settings</h2>
            </div>
            {isloading && <Loader />}
            <div className="support-body-content">
                <form action="" className="profile-setting-form" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        {/* <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="fullName" {...register("fullName")} />
                            <span style={{ color: 'red' }}>
                  {errors.fullName?.message}
                </span>
                            </div>
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lname" {...register("lname")} />
                            <span style={{ color: 'red' }}>
                  {errors.lname?.message}
                </span>
                            </div>
                        </Col> */}
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="fullName" {...register("fullName")} />
                                <span style={{ color: 'red' }}>
                                    {errors.fullName?.message}
                                </span>
                            </div>
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <label>Store Name</label>
                                <input type="text" name="storeName" {...register("storeName")} />
                                <span style={{ color: 'red' }}>
                                    {errors.storeName?.message}
                                </span>
                            </div>
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    {...register("email")}
                                />
                                <span style={{ color: 'red' }}>
                                    {errors.email?.message}
                                </span>
                            </div>
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <label>Phone No</label>
                                <input type="number" name="phoneNo" {...register("phoneNo")} />
                                <span style={{ color: 'red' }}>
                                    {errors.phoneNo?.message}
                                </span>
                            </div>
                        </Col>
                        <Col lg="12">
                            <Button commonClass="solid-red-btn" text={'Edit'} />
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    )
}

export default ProfileSettings
