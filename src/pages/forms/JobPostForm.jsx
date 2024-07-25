import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react"
import StepCounter from "../../components/StepCounter"
import TextInput from "../../components/TextInput"
import { DropDown } from "../../components/DropDownSelect";
import { dropDownState, selectedCity } from "../../atoms/cityAtoms";
import { selectedJobType, jobTypeDropDown } from "../../atoms/jobTypeAtom";
import { educationLevelDropDown, selectedEducationLevel } from "../../atoms/educationLevelAtom";
// import { MainButton, useShowPopup } from '@vkruglikov/react-telegram-web-app';
import { CITIES } from "../../constants/cities"
import { JobTypes } from "../../constants/jobTypes";
import { useAtomValue, useSetAtom } from "jotai";
import { request } from '@telegram-apps/sdk'
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';


export default function JobPostForm() {
  


  const [jobPostForm, setJobPostForm] = useState({
    jobTitle: "",
    jobDescription: "",
  })

  const navigate = useNavigate()
  const [impactOccurred, notificationOccurred, selectionChanged] =
  useHapticFeedback();

  const cities = CITIES;
  const jobTypes = JobTypes;

  const educationLevels = [
    "Not Required",
    "Diploma",
    "Short Training/Certificate",
    "Bachelors Degree",
    "Masters Degree",
    "Ph.D Doctoral Degree"
  ]

  const setDropDownVisible = useSetAtom(dropDownState);
  const dropDownVisible = useAtomValue(dropDownState);
  const setSelectedCity = useSetAtom(selectedCity);
  const selectedCityValue = useAtomValue(selectedCity);



  const setEducationLevelDropDownVisible = useSetAtom(educationLevelDropDown);
  const educationLevelDropDownVisible = useAtomValue(educationLevelDropDown);
  const setEducationLevel = useSetAtom(selectedEducationLevel);
  const selectedEducationLevelValue = useAtomValue(selectedEducationLevel);


  const setJobTypeDropDownVisible = useSetAtom(jobTypeDropDown);
  const jobTypeDropDownVisible = useAtomValue(jobTypeDropDown);
  const setSelectedJobType = useSetAtom(selectedJobType);
  const selectedJobTypeValue = useAtomValue(selectedJobType);

  const saveData = () => {
    console.log("executed")
  }


  const saveForm = async () => {
    console.log("Saved!!")
    console.log(selectedCityValue)
    console.log(selectedJobTypeValue)
    console.log(selectedEducationLevelValue)

    if (jobPostForm.jobTitle === "" || jobPostForm.jobDescription === "" || selectedCityValue === "" || selectedJobTypeValue === "" || selectedEducationLevelValue === "") {
      notificationOccurred('error');
      const buttonId = await request({
        method: 'web_app_open_popup',
        event: 'popup_closed',
        params: {
          title: 'Error',
          message: 'Please fill all the fields',
          buttons: [
            { id: 'yes', type: 'ok' },
          ],
        },
      });
    } else {
      navigate("/job-post-form/final-step")
    }
  };


  const handleInputChange = (e) => {
    setJobPostForm({ ...jobPostForm, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    console.log(jobPostForm)
  }, [jobPostForm])



  return (
    <>
      {/* job post form */}
      <div>
        <StepCounter step={1} />
      </div>
      <div id="form-container" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-white self-start">Job Title</label>
          <input name="jobTitle" onChange={(e) => handleInputChange(e)} type="text" className="bg-gray-700 text-white rounded-xl p-2 mt-2 focus:outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start">Job Description</label>
          <TextInput handleChange={handleInputChange} count={jobPostForm.jobDescription.length} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start">Job Location</label>
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
          <label className="text-white self-start">Job Type</label>
          <DropDown
            defaultValue={"Select Job Type"}
            setDropDownVisible={setJobTypeDropDownVisible}
            isDropDownVisible={jobTypeDropDownVisible}
            selectedType={selectedJobTypeValue}
            setSelectedType={setSelectedJobType}
            list={jobTypes}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white self-start">Education Required</label>
          <DropDown
            defaultValue={"Select Education Level"}
            setDropDownVisible={setEducationLevelDropDownVisible}
            isDropDownVisible={educationLevelDropDownVisible}
            selectedType={selectedEducationLevelValue}
            setSelectedType={setEducationLevel}
            list={educationLevels}
          />
        </div>
      </div>
      <div className="absolute w-[92%] top-[84%]">
        <button onClick={saveForm} className="bg-[#768de9] relative active:bg-[#5a74db] text-white font-bold pt-4 pb-4 w-full text-xl rounded-xl mt-10">
          Next
        </button>
      </div>
      {/* <MainButton isVisible={true} text="Next" onClick={saveData} /> */}
      {/* job post form */}
    </>
  );
}
