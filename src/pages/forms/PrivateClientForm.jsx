/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { CITIES } from "../../constants/cities";
import { DropDown } from "../../components/DropDownSelect"
// import { useSetAtom } from "jotai"
import { selectedCity, dropDownState } from "../../atoms/cityAtoms"
import { selectedVerificationType, verificationTypeDropdown } from "../../atoms/verificationTypesAtom"
import { useAtomValue, useSetAtom } from "jotai";
import StepCounter from "../../components/StepCounter"
import { initMainButton } from '@telegram-apps/sdk';
import { request } from '@telegram-apps/sdk';
import { useWebApp } from "@vkruglikov/react-telegram-web-app"

// Output:
// {
//   is_state_stable: true,
//   is_expanded: false,
//   height: 320
// };
// web_app_setup_main_button
function PrivateClientForm() {

  const cities = CITIES
  const identityVerificationTypes = ["Passport", "National Id/Fayda", "Driver Licence"]
  const webApp = useWebApp()
  // const [mainButton] = initMainButton()

  const clickHandler = () => {
    setText("Clicked")
    console.log("Clicked")
  }


  // mainButton.setParams({
  //   backgroundColor: '#aa1388',
  //   text: 'Finish',
  //   isVisible: true,
  // });

  const selectedCityValue = useAtomValue(selectedCity)
  const isDropDownVisible = useAtomValue(dropDownState)
  const setDropDownState = useSetAtom(dropDownState)
  const selectCity = useSetAtom(selectedCity)
  const [errors, setErrors] = useState(false)
  
  const verificationType = useAtomValue(selectedVerificationType)
  const isIdentityDropDownVisible = useAtomValue(verificationTypeDropdown)
  const setVerificationType = useSetAtom(selectedVerificationType)
  const setIdentityDropDown = useSetAtom(verificationTypeDropdown)

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

  const submit = async() => {
    const isValidName = inputData.name;
    const isValidEmail = inputData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData.email);
    const isValidCity = selectedCityValue !== "Select Location";
    const isValidVerificationType = verificationType !== "Select Identity Verification Type";
    if (isValidName && isValidEmail && isValidCity && isValidVerificationType) {
      const formData = {
        ...inputData,
        city: selectedCityValue,
        verificationType: verificationType
      }
      // send API request to backend
      console.log("formdata", formData)
      console.log("selected city", selectedCityValue)
      setErrors(false)
      webApp.close()
    } else{
      setErrors(true)
      const buttonId = await request({
        method: 'web_app_open_popup',
        event: 'popup_closed',
        params: {
          title: 'Error',
          message: 'All Fields Should be Filled Out Correctly',
          buttons: [
            { id: 'yes', type: 'ok' },
          ],
        },
      });
    }

  }

  // mainButton.on('click', submit)

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
              errors={errors}
              defaultValue={"Select Location"}
              selectedType={selectedCityValue}
              setDropDownVisible={setDropDownState}
              isDropDownVisible={isDropDownVisible}
              setSelectedType={selectCity}
              list={cities} 
            />
          </div>
          <div className="flex flex-col items-start text-white z-30 gap-2">
            <p>Proof of Identity</p>
            <DropDown
              errors={errors}
              defaultValue={"Select Identity Verification Type"}
              selectedType={verificationType}
              setDropDownVisible={setIdentityDropDown}
              isDropDownVisible={isIdentityDropDownVisible}
              setSelectedType={setVerificationType}
              list={identityVerificationTypes}  
            />
          </div>
        </div>
        {/* <p>Employer Form</p> */}
        <div className="absolute w-[92%] top-[84%]">
          <button onClick={submit} className="bg-[#768de9] relative active:bg-[#5a74db] text-white font-bold pt-4 pb-4 w-full text-xl rounded-xl mt-10">
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default PrivateClientForm;
