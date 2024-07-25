import { useEffect, useState } from "react"
import { DropDown } from "../../components/DropDownSelect";
import StepCounter from "../../components/StepCounter";
import TextInput from "../../components/TextInput";
import { CITIES } from "../../constants/cities";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedCity, dropDownState } from "../../atoms/cityAtoms"
import { selectedExperienceAtom, experienceDropDownState } from "../../atoms/experienceLevelAtom";
import { useWebApp, useShowPopup, useHapticFeedback } from "@vkruglikov/react-telegram-web-app"
import { Spinner } from "@nextui-org/react"

const ProfileBuilderForm = () => {

    const webApp = useWebApp()
    const showPopup = useShowPopup()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        jobDescription: '',
        website: '',
        skills: [],
        linkedinUrl: ''
    })
    const cities = CITIES;
    const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback();
    const experienceLevels = ["Junior (0-2 years)", "Mid-level (3-5 years)", "Senior (5+ years)"];
    const selectedCityValue = useAtomValue(selectedCity)
    const isDropDownVisible = useAtomValue(dropDownState)
    const setDropDownState = useSetAtom(dropDownState)
    const selectCity = useSetAtom(selectedCity)

    const selectedExperience = useAtomValue(selectedExperienceAtom)
    const setSelectedExperience = useSetAtom(selectedExperienceAtom)
    const experienceDropDownStateValue = useAtomValue(experienceDropDownState)
    const setExperienceDropDownState = useSetAtom(experienceDropDownState)
    

    const skillsInputHandler = (e) => {
        const value = e.target.value;
        if (value.endsWith(' ') && formData.skills.length < 3) {
            const newSkill = value.trim();
            if (newSkill) {
                setFormData(prevData => ({
                    ...prevData,
                    skills: [...prevData.skills, newSkill]
                }));
                e.target.value = ''; // Clear the input after adding skill
            }
        }
    }

    const removeSkill = (skill) => {
        setFormData(prevData => ({
            ...prevData,
            skills: prevData.skills.filter(s => s !== skill)
        }));
    }

    const submitForm = () => {
        const isExperienceSelected = selectedExperience !== ""
        const isLocationSelected = selectedCityValue !== ""
        const isNameEntered = formData.fullName && formData.fullName.trim() !== ''
        console.log(formData)
        console.log(isExperienceSelected, isLocationSelected , isNameEntered)
        if (isExperienceSelected && isLocationSelected && isNameEntered) {
            webApp.close()
            console.log(formData)
        } else {
            notificationOccurred('error');
            showPopup({
                title: "Form Error",
                message: "Please select experience level, location, and enter your name.",
                buttons: [{text: 'Close'}]
            })
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    return (
        <>
            {/* <div>
                <StepCounter step={2} />
            </div> */}
            <div id="form-container" className="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label className="text-white place-self-start">Full Name</label>
                    <input
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 pt-2 pb-2 pl-4 rounded-xl focus:outline-none text-white"
                        name="fullName"
                        type="text"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label className="text-white place-self-start">Select Your Location</label>
                    <DropDown
                        defaultValue={"Select Your Location"}
                        setSelectedType={selectCity}
                        selectedType={selectedCityValue}
                        setDropDownVisible={setDropDownState}
                        isDropDownVisible={isDropDownVisible}
                        list={cities}
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label className="text-white place-self-start">Experience Level</label>
                    <DropDown 
                        defaultValue={"Select Your Experience Level"}
                        setSelectedType={setSelectedExperience}
                        selectedType={selectedExperience}
                        setDropDownVisible={setExperienceDropDownState}
                        isDropDownVisible={experienceDropDownStateValue}
                        list={experienceLevels}
                    />
                </div>
                {/* <div class="flex flex-col gap-2">
                    <label className="text-white place-self-start">Skills (max 3)</label>
                    <div class="bg-gray-700 p-2 rounded-xl flex">
                        {formData.skills.map((skill, index) => {
                            return (
                                <div key={index} onClick={() => removeSkill(skill)} class="bg-[#768de9] text-white p-1 m-1 inline-block rounded-xl">{skill}</div>
                            )
                        })}
                        <input onChange={skillsInputHandler} name="website" type="url" placeholder="Add Skill..." class="bg-gray-700 mx-2 focus:outline-none text-white" />
                    </div>
                </div> */}
                <div class="flex flex-col">
                    <label className="text-white place-self-start">Describe more about yourself</label>
                    <div class="bg-gray-700 p-2 rounded-xl ">
                        <TextInput handleChange={handleInputChange} count={0} />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label className="text-white place-self-start">Website</label>
                    <div class="bg-gray-700 p-2 rounded-xl flex">
                        <span class="text-white">https://</span>
                        <input onChange={handleInputChange} name="website" type="url" class="bg-gray-700 focus:outline-none text-white" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label className="text-white place-self-start">LinkedIn Profile Url</label>
                    <input
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 pt-2 pb-2 pl-4 rounded-xl focus:outline-none text-white"
                        name="linkedinUrl"
                        type="text"
                    />
                </div>
            </div>
            <div className="absolute w-[92%] top-[84%]">
                <button onClick={submitForm} className={`bg-[#768de9] ${isSubmitting ? 'bg-gray-700' :'bg-[#768de9] active:bg-[#5a74db]'} relative text-white font-bold pt-4 pb-4 w-full text-xl rounded-xl mt-10`} disabled={isSubmitting}>
                    {isSubmitting ? <Spinner size="sm" /> : "Done"}
                </button>
            </div>
        </>
    )
};

export default ProfileBuilderForm;