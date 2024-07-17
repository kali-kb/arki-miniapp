/* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedVerificationType, verificationTypeDropdown } from "../atoms/verificationTypesAtom";

export const VerificationTypeDropDown = () => {


  const identityVerificationTypes = ["Passport", "National Id/Fayda", "Driver Lisence"]
  const dropDownVisible = useAtomValue(verificationTypeDropdown);
  const verificationType = useAtomValue(selectedVerificationType)
  const setDropDownVisible = useSetAtom(verificationTypeDropdown);
  const setSelectedVerificationType = useSetAtom(selectedVerificationType);

  return (
    <>
      <div id="dropdown" className="relative z-30 inline-block text-left w-full">
        <div>
          <button
            onClick={() => setDropDownVisible(!dropDownVisible)}
            type="button"
            className="inline-flex justify-between w-full rounded-xl border border-none shadow-sm active:outline-none px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {verificationType == "" ? "Pick Verification Type" : verificationType}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {dropDownVisible && (
          <div
            className="origin-top-right absolute z-40 right-0 mt-2 w-full rounded-xl shadow-lg ring-1 bg-gray-700 ring-black overflow-y-scroll ring-opacity-5 focus:outline-none scrollbar-hide"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {identityVerificationTypes.map((identityVerificationType, index) => {
                return (
                  <a
                    key={index}
                    onClick={() => setSelectedVerificationType(identityVerificationType) && setDropDownVisible(false)}
                    // href="#"
                    className="m-2 rounded-lg text-white block px-4 py-2 text-sm hover:bg-gray-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    {identityVerificationType}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
