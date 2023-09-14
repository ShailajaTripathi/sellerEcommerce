import React, { useState } from "react";
import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

const DropDown = ({
  DropDownCategory,
  control,
  name = "filter",
  defaultValue = null,
  updateDropdown,
  ddname = "name",
  materialDataList,
  setAddMaterialModal,
  typeDD,
  setColorModalShow,
  colorData,
  setAddTypeModal,
  valueFromViewEdit,
  setfirst
}) => {
  const {
    control: control2,
    register: register2,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      [name]: defaultValue,
    },
  });
  DropDownCategory = materialDataList
    ? [...DropDownCategory, { [ddname]: "Add Product" }]
    : DropDownCategory;

  const [searchInput, setSearchInput] = useState("");
  const filteredOptions = DropDownCategory.filter((item) =>
    item[ddname].toLowerCase().includes(searchInput.toLowerCase())
  );

  console.log(ddname,"999");

  // useEffect(() => {
  //     console.log(valueFromViewEdit,"-----");
  //     if (valueFromViewEdit) {
  //         setValue(name, valueFromViewEdit);
  //     }
  // }, [valueFromViewEdit]);

  return (
    <Controller
      control={control ? control : control2}
      name={name}
      render={({
        field: { register, onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <Dropdown
          id="dropdown-basic-button"
          drop="down-centered"
          onSelect={(e) => {
            const parsedData = JSON.parse(e);
            const nameValue = parsedData.name;
            // const idValue = parsedData._id
            if (nameValue === "Add Product") {
              setAddMaterialModal(true);
              // setAddTypeModal(true)
            }
            if (nameValue === "Add Type") {
              setAddTypeModal(true);
            }
            if (nameValue === "Add Color") {
              setColorModalShow(true);
            }
            onChange(JSON.parse(e));
            if(typeof setfirst === "function"){
              setfirst(JSON.parse(e))
            }
            // setId(idValue)
          }}
        >
           {console.log(value?.[ddname],"list?.[ddname]")}
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="icontrol"
          >
            {value?.[ddname] === "Add Product"
              ? "Select"
              : value?.[ddname] === "Add Type"
              ? "Select"
              : value?.[ddname] === "Add Color"
              ? "Select"
              : value?.[ddname]
              ? value[ddname]
              : "Select"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* {DropDownCategory &&
              DropDownCategory?.map((list, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={JSON.stringify(list)}
                  className={value?.[ddname] === list?.name ? "active" : ""}
                >
                  {list?.[ddname]}
                </Dropdown.Item>
              ))} */}
              {name === "country" && filteredOptions && <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />}
            {filteredOptions.length === 0 && (
              <Dropdown.Item disabled>No options found</Dropdown.Item>
            )}
            {
              (name === "country" ? filteredOptions:DropDownCategory).map((list, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={JSON.stringify(list)}
                  className={value?.[ddname] === list?.name ? "active" : ""}
                >
                
                 

                  {list?.[ddname]}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    />
  );
};

export default DropDown;
