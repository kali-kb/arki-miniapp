/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { BrowserNavigator, createBrowserNavigatorFromLocation } from "@telegram-apps/sdk";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import StepCounter from "../../components/StepCounter"
import { Link } from "react-router-dom"


function EmployerType() {
  const [selected, setSelected] = useState("");
  // const navigator = new BrowserNavigator(['/'], 0);


  // const launchParams = retrieveLaunchParams();
  // console.log(launchParams.initData.user)
  // useEffect(() => {
  //   navigator.attach();
  //   return () => navigator.detach();
  // }, [navigator]);
  

  useEffect(() => {
    // console.log(launchParams.initData.user)
    console.log(selected) 
  })

  return (
    <>
      <div className="flex flex-col h-full">
        <StepCounter step={1} />
        {/* <p>Type of Organization?</p> */}
        <div className="bg-gray-700 p-6 rounded-lg ">
          <RadioGroup value={selected} onValueChange={setSelected}>
            <Radio
              className={{ base: cn("text-white") }}
              name="location"
              value="private-client"
            >
              <span className="text-white">Private Client</span>
            </Radio>
            <hr className="mt-2 mb-2 border-gray-600" />
            <Radio value="company">
              <span className="text-white">Company</span>
            </Radio>
          </RadioGroup>
        </div>
        <div className="absolute w-[92%] top-[84%]">
          <Link to="/private-client-form">
            <button className="bg-[#768de9] active:bg-[#5a74db] text-white font-bold pt-4 pb-4 w-full text-xl rounded-lg mt-10">
              Next
            </button>
          </Link>
        </div>

      </div>
    </>
  );
}

export default EmployerType;
