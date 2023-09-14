import React, { useEffect, useState } from 'react'
import Exlmation from '../../../../../../../../../../assets/images/icons/exlmation.svg'
import { useFieldArray, useForm } from 'react-hook-form'
import DropDown from '../../../../../../../../../../components/DropDown/DropDown'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const AddSizes = ({
    index,
    name,
    control,
    register,
    watch,
    setValue,
    errors,
    addVariantEditDataList,
    priceValue,
    setPriceValue,
    payOutValue,
    setDiscoutName,
    getValues,
    discountValue12,
    updateVariantData,
    variantIndex,
    startName,
    reset: FromReset,
    viewCatalogEditVariantDataList
}) => {
    const { sizeData: sizeDataReducer } = useSelector(
        (action) => action?.catalogSlice
    )
    const [sizeData, setSizeData] = useState(sizeDataReducer)
    const { fields, append, prepend, remove } = useFieldArray({
        control,
        name: name
    })
    const { reset } = useForm({ mode: 'all' })

    useEffect(() => {
        if (
            viewCatalogEditVariantDataList?.length === 0 &&
            addVariantEditDataList?.length === 0
        ) {
            // if(viewCatalogEditVariantDataList?.length === 0){
            prepend({})
        }
    }, [])

    // const calculationPayOutFunction = () => {
    //   const additiondiscount = parseInt(discountValue12 || discountInAll );
    //   fields.forEach((field,i)=> {
    //     setValue(`${name}.${i}.price`,watch(`${name}.${i}.price`))
    //   })
    //   const discountAmountFinal = ((priceValue * additiondiscount) / 100);
    //   const totalValue = (priceValue - discountAmountFinal);
    //   console.log(priceValue,"322222222",parseInt(discountValue12 || discountInAll ),"1111111 additiondiscount");
    //   console.log(totalValue,"totalValue");
    //   // setValue(discoutName,totalValue)
    // };
    //////// end calculation function ///////

    //  for getting discount value on product
    const [discountValue, setDiscountValue] = useState(null)
    useEffect(() => {
        if (sessionStorage.getItem('ProductBD')) {
            const storedDataJSON = JSON.parse(
                sessionStorage.getItem('ProductBD')
            )
            console.log(storedDataJSON, 'storedDataJSON')
            const discountInAll = storedDataJSON.discountInAll
            setDiscountValue(discountInAll)
        }
    }, [sessionStorage.getItem('ProductBD')])

    ////////////////////////////////////////////////////////

    const addSize = () => {
        if (fields.length < 8) {
            const newAddSizeArray = []
            const mainFieldName = `${name}`
            append(mainFieldName, newAddSizeArray)
        }
    }
    const getAvailableSizeOptions = (selectedIndex) => {
        const selectedValues = fields.map((field, i) =>
            watch(`${name}.${i}.size`)
        )
        return sizeDataReducer.filter(
            (option) =>
                !selectedValues?.map((ert) => ert?.name).includes(option?.name)
            // !selectedValues?.map((ert) => ert?.size).includes(option?.size)
        )
    }

    //////// new selling price value function ///////
    const [first, setfirst] = useState(null)
    const [firs1, setfirs1] = useState(null)
    
    /////// new handle change /////
    const handlePriceChange = (e, i) => {
        const newPrice = parseFloat(e.target.value) || 0;
        console.log(newPrice,"newPrice");
        const discount = parseFloat((discountValue12 || discountValue) || 0);
        const payoutPrice = e.target.value - (e.target.value * parseFloat(getValues().addVariant[variantIndex].discountInOne)) / 100;
        setValue(`${startName}.${variantIndex}.addSize.${i}.SellingPrice`, payoutPrice.toFixed(2));
    };
    
    /////// end selling price value function //////
    

    return (
        <div className="size-wrapper">
            <div className="add-basic-details-form add-product-variant-form">
                {fields?.map((sizes, i) => {
                    return (
                        <div className="append-size-row" key={sizes?.id}>
                            <Row>
                                <Col xl="6" lg="12">
                                    <Row>
                                        <Col xl="6" lg="6" md="6">
                                            <div className="form-group">
                                                <label>
                                                    Size
                                                    <span className="error">
                                                        *
                                                    </span>
                                                    <img
                                                        src={Exlmation}
                                                        className="error-icon"
                                                        alt="not found"
                                                    />
                                                </label>
                                                <DropDown
                                                    DropDownCategory={getAvailableSizeOptions(
                                                        i
                                                    )}
                                                    control={control}
                                                    // updateDropdown= {updateDropdown}
                                                    // name={`main.${index}.size`}
                                                    name={`${name}.${i}.size`}
                                                    // ddname="size"
                                                />
                                                {errors && (
                                                    <span
                                                        className="invalid"
                                                        style={{ color: 'red' }}
                                                    >
                                                        {
                                                            errors
                                                                ?.addVariant?.[
                                                                index
                                                            ]?.addSize?.[i]
                                                                ?.size?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </Col>

                                        <Col xl="6" lg="6" md="6">
                                            <div className="form-group">
                                                <label>
                                                    Available Qty
                                                    <span className="error">
                                                        *
                                                    </span>
                                                    <img
                                                        src={Exlmation}
                                                        className="error-icon"
                                                        alt="not found"
                                                    />
                                                </label>
                                                <input
                                                    type="number"
                                                      {...register(`${name}.${i}.availableQty`)}
                                                />
                                                {errors && (
                                                    <span
                                                        className="invalid"
                                                        style={{ color: 'red' }}
                                                    >
                                                        {
                                                            errors
                                                                ?.addVariant?.[
                                                                index
                                                            ]?.addSize?.[i]
                                                                ?.availableQty
                                                                ?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xl="6" lg="12">
                                    <Row>
                                        <Col xl="4" lg="6" md="6">
                                            <div className="form-group">
                                                <label>
                                                    Price
                                                    <span className="error">
                                                        *
                                                    </span>
                                                    <img
                                                        src={Exlmation}
                                                        className="error-icon"
                                                        alt="not found"
                                                    />
                                                </label>
                                                <input
                                                    type="number"
                                                      {...register(`${name}.${i}.price`)}
                                                    autoFocus={false}
                                                    onChange={(e) => {
                                                        handlePriceChange(e, i) ////// new function added
                                                        // setfirst(e.target.value)
                                                        setPriceValue(e.target.value)
                                                    }}
                                                    // onChange={TEST}
                                                    // onChange={(e) =>
                                                    //     handleInputChange(e, i)
                                                    // }
                                                />
                                                {errors && (
                                                    <span
                                                        className="invalid"
                                                        style={{ color: 'red' }}
                                                    >
                                                        {
                                                            errors
                                                                ?.addVariant?.[
                                                                index
                                                            ]?.addSize?.[i]
                                                                ?.price?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xl="4" lg="6" md="6">
                                            <div className="form-group">
                                                <label>
                                                    Payout Price
                                                    <span className="error">
                                                        *
                                                    </span>
                                                    <img
                                                        src={Exlmation}
                                                        className="error-icon"
                                                        alt="not found"
                                                    />
                                                </label>
                                                <input
                                                    type="number"
                                                    //   name="payoutPrice"
                                                    {...register(`${name}.${i}.SellingPrice`)}
                                                    // defaultValue={!priceValue ? 0 : payOutValue }
                                                    // value={payOutValue}
                                                    //   value={
                                                    //     // `${name}[${i}].SellingPrice` ==
                                                    //       priceValue -
                                                    //       (priceValue *
                                                    //           (discountValue12 ||
                                                    //               discountValue)) /
                                                    //           100
                                                    //   }
                                                    autoFocus={false}
                                                    disabled
                                                />
                                            </div>
                                        </Col>

                                        {fields.length > 1 && (
                                            <Col xl="4" lg="6" md="6">
                                                <div className="form-group mb-0">
                                                    {/* {fields.length > 1 && (  */}
                                                    {/* Only show the "Remove" button when more than one item is present */}
                                                    <button
                                                        type="button"
                                                        className="border-red-btn remove-btn"
                                                        onClick={() => {
                                                            remove(i)
                                                            // setSizeData((pre)=>{
                                                            //   alert(i)
                                                            //   let final= initialValue.splice(i,1)
                                                            //   console.log({final,pre})
                                                            //   return [...pre,...final]
                                                            // })
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                    {/* )}  */}
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    )
                })}
                {/* <label>Service Charges for all is 10%</label>  */}
                <button
                    type="button"
                    className="solid-black-btn add-size"
                    onClick={
                        addSize
                        // if (fields.length < 4) {
                        //   append({ size: "", price: "", availableQty: "" });
                        // }
                    }
                >
                    Add Size
                </button>
            </div>
        </div>
    )
}

export default React.memo(AddSizes)
