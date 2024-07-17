/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CITIES } from "../../constants/cities";
import { DropDown } from "../../components/DropDownSelect"
// import { useSetAtom } from "jotai"
import { selectedCity, dropDownState } from "../../atoms/cityAtoms"
import { useAtomValue, useSetAtom } from "jotai";
import { VerificationTypeDropDown } from "../../components/IdentityTypeDropDown"
import StepCounter from "../../components/StepCounter"


function PrivateClientForm() {

  const cities = CITIES
  const selectedCityValue = useAtomValue(selectedCity)
  const isDropDownVisible = useAtomValue(dropDownState)
  const setDropDownState = useSetAtom(dropDownState)
  const selectCity = useSetAtom(selectedCity)
  const [errors, setErrors] = useState(false)
  const [inputData, setInputData] = useState({
    "name": "",
    "email": "",
  })
  // const selectCity = (city) => {
  //   setSelectedCityAtom(city);
  //   setDropDownVisibleAtom(false);
  // }
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const submit = () => {
    if (inputData.name && inputData.email) {
      console.log("selected city", selectedCityValue)
    } else{
      setErrors(true)
    }
  }

  return (
    <>
      <div className="flex flex-col h-auto">
        <StepCounter step={2} />
        {/* <p>Employer Form</p> */}
        <div className="gap-4 flex flex-col">
          <div className="flex flex-col w-full gap-2">
            <label className="text-white place-self-start">Name</label>
            <input type="text" name="name" onChange={handleChange} className={`bg-gray-700 focus:outline-none text-white rounded-xl pt-2 pb-2 pl-4 placeholder:text-sm font-medium ${errors && 'ring-1 ring-red-500'}`} placeholder="John Doe" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-white place-self-start">Email</label>
            <input type="email" name="email" onChange={handleChange} className={`bg-gray-700 focus:outline-none text-white rounded-xl pt-2 pb-2 pl-4 placeholder:text-sm font-medium ${errors && 'ring-1 ring-red-500'}`} placeholder="johndoe@gmail.com" />
          </div>
          <div className="flex flex-col items-start z-50 text-white gap-2">
            <p>Address</p>
            <DropDown 
              defaultValue={"Select Location"}
              selectedType={selectedCityValue}
              setDropDownVisible={setDropDownState}
              isDropDownVisible={dropDownState}
              setSelectedType={selectCity}
              cities={cities} 
            />
          </div>
          <div className="flex flex-col items-start text-white z-30 gap-2">
            <p>Proof of Identity</p>
            <VerificationTypeDropDown />
          </div>
        </div>
        {/* <p>Employer Form</p> */}
        <div className="absolute w-[92%] top-[84%]">
          <button className="bg-[#768de9] relative active:bg-[#5a74db] text-white font-bold pt-4 pb-4 w-full text-xl rounded-xl mt-10">
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PrivateClientForm;
