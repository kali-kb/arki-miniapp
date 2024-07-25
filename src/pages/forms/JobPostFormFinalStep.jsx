import { useState, useEffect } from "react"
import StepCounter from "../../components/StepCounter"
import { Checkbox } from "@nextui-org/react";
import { Radio, RadioGroup } from '@nextui-org/react'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { Spinner } from '@nextui-org/react'
import { useHapticFeedback, useShowPopup } from '@vkruglikov/react-telegram-web-app'


export default function JobPostFormFinalStep() {

    const webApp = useWebApp()
    const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback();
    const showPopup = useShowPopup();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = useState("monthly");
    const [formData, setFormData] = useState({
        deadline: '',
        salary: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const [errors, setErrors] = useState({})

    const validateForm = () => {
        let newErrors = {}

        if (!formData.deadline) {
            newErrors.deadline = "Deadline is required"
        }

        if (!isSelected && !formData.salary) {
            newErrors.salary = "Salary is required if 'Don't Specify Salary' is not checked"
        }

        if (!isSelected && formData.salary && isNaN(Number(formData.salary))) {
            newErrors.salary = "Salary must be a valid number"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log("Form is valid. Submitting:", formData)
            webApp.close()
            // Add your submission logic here
        } else {
            notificationOccurred('error')
            // const messageContent = Object.values(errors).join('\n')
            showPopup({
                title: 'Error',
                message: "Fill out all fields correctly",
                buttons: [{ text: 'OK' }],
            })
            setIsSubmitting(false)
        }
    }


    useEffect(() => {
        console.log(formData)
        // webApp.close()
    }, [formData])
    
    useEffect(() => {
        console.log(selected)
    }, [selected])


    return (
        <>
            <div>
                <StepCounter step={2} />
            </div>

            <div id="form-container" className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-white self-start" htmlFor="tinNumber">
                        Deadline
                    </label>
                    <input onChange={handleInputChange} name="deadline" type="date" className="bg-gray-700 focus:outline-none text-white p-2 rounded-xl" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col my-5 gap-2">
                        <label className="text-white self-start" htmlFor="tinNumber">
                            Salary
                        </label>
                        <div class="bg-gray-700 w-full pt-2 pb-2 pl-4 rounded-xl">
                            <div className="flex flex-row">
                                <input name="salary" disabled={isSelected} onChange={handleInputChange} placeholder="ex. 10000" type="number" min="0" class="bg-gray-700 focus:outline-none text-white" />
                                <span class="text-gray-300">ETB</span>
                            </div>
                            <hr className="bg-gray-500 mt-5 mb-5"></hr>
                            <RadioGroup onValueChange={setSelected} isDisabled={isSelected} orientation="horizontal" size="sm">
                                <Radio value="monthly"><span className="text-white text-sm font-semibold">Monthly</span></Radio>
                                <Radio value="hourly"><span className="text-white text-sm font-semibold">Hourly</span></Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <Checkbox onValueChange={setIsSelected} isSelected={isSelected} >
                        <span className="self-start text-white">Don't Specify Salary</span>
                    </Checkbox>
                </div>
            </div>
            <div className="absolute w-[92%] top-[84%]">
                <button onClick={handleSubmit} className={`bg-[#768de9] ${isSubmitting ? 'bg-gray-700' :'bg-[#768de9] active:bg-[#5a74db]'} relative text-white font-bold pt-4 pb-4 w-full text-xl rounded-xl mt-10`} disabled={isSubmitting}>
                    {isSubmitting ? <Spinner size="sm" /> : "Done"}
                </button>
            </div>
        </>
    );
}
