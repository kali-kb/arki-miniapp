import { FileUploader } from "../../components/FileUploader";
// import { DropDown } from "../../components/DropDown";
import { cities } from "../../constants/cities";
import StepCounter from "../../components/StepCounter"
import { INDUSTRIES } from "../../constants/industries";
import { DropDown } from "../../components/DropDownSelect";
import { selectedIndustryType, industryDropDownState } from "../../atoms/industryTypeAtom"
import { dropDownState, selectedCity } from "../../atoms/cityAtoms";

import { useAtomValue, useSetAtom } from "jotai";

const CompanyRegistrationForm = () => {

  const industries = INDUSTRIES;
  const selectedIndustry = useAtomValue(selectedIndustryType)
  const setIndustry = useSetAtom(selectedIndustryType);
  const setIndustryDropDown = useSetAtom(industryDropDownState);
  const industryDropDown = useAtomValue(industryDropDownState);

  const setDropDownVisible = useSetAtom(dropDownState);
  const dropDownVisible = useAtomValue(dropDownState);
  const setSelectedCity = useSetAtom(selectedCity);
  const selectedCityValue = useAtomValue(selectedCity);



  return (
    <>
      <div>
        <StepCounter step={2} />
      </div>
      <div id="form-container" className="flex flex-col gap-4">
        {/* company registration form */}
        <div className="flex flex-col gap-2">
          <label className="text-white self-start" htmlFor="company-name">
            Company Name
          </label>
          <input
            className="w-full bg-gray-700 pt-2 pb-2 pl-4 rounded-xl focus:outline-none text-white"
            name="company-name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start" htmlFor="company-email">
            Contact Email
          </label>
          <input
            name="company-email"
            className="w-full bg-gray-700 pt-2 pb-2 pl-4 text-white focus:outline-none placeholder:pl-2 placeholder:text-italicize p-2 rounded-xl"
            type="email"
            placeholder="contact@email.com"
          />
        </div>
        <div className="flex flex-col w-[11rem] gap-2">
          <label className="text-white self-start" htmlFor="company-logo">
            Company Logo
          </label>
          <FileUploader />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start" htmlFor="tin-number">
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
          <label className="text-white self-start" htmlFor="tin-number">
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
          <label className="text-white self-start" htmlFor="tin-number">
            Tin No
          </label>
          <input
            name="tin-number"
            className="w-full pt-2 text-white pb-2 pl-4 focus:outline-none bg-gray-700 p-2 rounded-xl"
            type="text"
          />
        </div>
        {/* company registration form */}
      </div>
    </>
  );
};

export default CompanyRegistrationForm;
