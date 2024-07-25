import { useState } from "react";
import { FileUploader } from "../../components/FileUploader";
import { CITIES } from "../../constants/cities";
import StepCounter from "../../components/StepCounter"
import { INDUSTRIES } from "../../constants/industries";
import { DropDown } from "../../components/DropDownSelect";
import { selectedIndustryType, industryDropDownState } from "../../atoms/industryTypeAtom"
import { dropDownState, selectedCity } from "../../atoms/cityAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { request } from '@telegram-apps/sdk';
import { useWebApp } from "@vkruglikov/react-telegram-web-app"


const CompanyRegistrationForm = () => {

  const webApp = useWebApp();
  const industries = INDUSTRIES;
  const cities = CITIES;
  const selectedIndustry = useAtomValue(selectedIndustryType)
  const setIndustry = useSetAtom(selectedIndustryType);
  const setIndustryDropDown = useSetAtom(industryDropDownState);
  const industryDropDown = useAtomValue(industryDropDownState);

  const setDropDownVisible = useSetAtom(dropDownState);
  const dropDownVisible = useAtomValue(dropDownState);
  const setSelectedCity = useSetAtom(selectedCity);
  const selectedCityValue = useAtomValue(selectedCity);
  const [file, setFile] = useState(null);


  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    tinNumber: "",
    industry: "",
    location: "",
  })

  // Suggested code may be subject to a license. Learn more: ~LicenseLog:3276614840.
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };



  const submit = async () => {
    const isCompanyNameValid = formData.companyName !== "";
    const isContactEmailValid = formData.contactEmail !== "" && validateEmail(formData.contactEmail);
    const isTinNumberValid = formData.tinNumber !== "";
    const isIndustryValid = selectedIndustry !== "";
    const isLocationValid = selectedCityValue !== "";
    const isFileValid = file !== null;
    if (!isCompanyNameValid || !isContactEmailValid || !isTinNumberValid || !isIndustryValid || !isLocationValid || !isFileValid) {
      const buttonId = await request({
        method: 'web_app_open_popup',
        event: 'popup_closed',
        params: {
          title: 'Error',
          message: 'Please fill all the fields and enter a valid email',
          buttons: [
            { id: 'yes', type: 'ok' },
          ],
        },
      });
      return;
    }

    const finalFormData = new FormData();
    finalFormData.append("companyName", formData.companyName);
    finalFormData.append("contactEmail", formData.contactEmail);
    finalFormData.append("tinNumber", formData.tinNumber);
    finalFormData.append("industry", selectedIndustry);
    finalFormData.append("location", selectedCityValue);
    finalFormData.append("companyLogo", file);

    for (let pair of finalFormData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    const data = JSON.stringify({name: formData.companyName}) 
    webApp.sendData(data)
    // webApp.close()

  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, industry: selectedIndustry, location: selectedCityValue });
    console.log("formData: ", formData)
  };

  const handleFileChange = (e) => { setFile(e.target.files[0]) };



  return (
    <>
      <div>
        <StepCounter step={2} />
      </div>
      <div id="form-container" className="flex flex-col gap-4">
        {/* company registration form */}
        <div className="flex flex-col gap-2">
          <label className="text-white self-start" htmlFor="companyName">
            Company Name
          </label>
          <input
            onChange={handleInputChange}
            className="w-full bg-gray-700 pt-2 pb-2 pl-4 rounded-xl focus:outline-none text-white"
            name="companyName"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start" htmlFor="contactEmail">
            Contact Email
          </label>
          <input
            onChange={handleInputChange}
            name="contactEmail"
            className="w-full bg-gray-700 pt-2 pb-2 pl-4 text-white focus:outline-none placeholder:pl-2 placeholder:text-italicize p-2 rounded-xl"
            type="email"
            placeholder="contact@email.com"
          />
        </div>
        <div className="flex flex-col w-[11rem] gap-2">
          <label className="text-white self-start" htmlFor="company-logo">
            Company Logo
          </label>
          <FileUploader handleCompanyLogoChange={handleFileChange} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start" htmlFor="address">
            Address
          </label>
          {/* <DropDown cities={cities} /> */}
          <DropDown
            defaultValue={"Select Location"}
            setDropDownVisible={setDropDownVisible}
            isDropDownVisible={dropDownVisible}
            selectedType={selectedCityValue}
            setSelectedType={setSelectedCity}
            list={cities}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start" htmlFor="industry">
            Industry
          </label>
          <DropDown
            defaultValue={"Select Industry"}
            selectedType={selectedIndustry}
            setSelectedType={setIndustry}
            setDropDownVisible={setIndustryDropDown}
            isDropDownVisible={industryDropDown}
            list={industries}
          />
        </div>
        <div className="flex flex-col  gap-2">
          <label className="text-white self-start" htmlFor="tinNumber">
            Tin No
          </label>
          <input
            onChange={handleInputChange}
            name="tinNumber"
            className="w-full pt-2 text-white pb-2 pl-4 focus:outline-none bg-gray-700 p-2 rounded-xl"
            type="text"
          />
        </div>
        {/* company registration form */}
        <div className="w-full top-[81%]">
          <button onClick={submit} className="bg-[#768de9] relative active:bg-[#5a74db] text-white font-bold pt-4 pb-4 w-full text-xl rounded-xl mt-10">
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyRegistrationForm;
