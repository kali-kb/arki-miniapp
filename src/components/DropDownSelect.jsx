/* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";

export const DropDown = ({ errors, list, defaultValue, selectedType, setSelectedType, isDropDownVisible, setDropDownVisible }) => {

  const onSelectAction = (item) => {
    setSelectedType(item) 
    console.log("chosen item:", item)
    setDropDownVisible(false)
  }

  return (
    <>
      <div id="dropdown" className="relative z-999 inline-block text-left w-full">
        <div>
          <button
            onClick={() => setDropDownVisible(!isDropDownVisible)}
            type="button"
            className={`inline-flex justify-between w-full ${errors && 'ring-1 ring-red-500'} rounded-xl border border-none shadow-sm active:outline-none px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none`}
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {selectedType == "" ? `${defaultValue}` : selectedType}
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
        {isDropDownVisible && (
          <div
            className="origin-top-right mb-2 absolute z-40 right-0 h-[150px] mt-2 w-full rounded-xl shadow-lg ring-1 bg-gray-700 ring-black overflow-y-scroll ring-opacity-5 focus:outline-none scrollbar-hide"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {list.map((item, index) => {
                return (
                  <a
                    key={index}
                    onClick={() => onSelectAction(item)}
                    // href="#"
                    className="m-2 rounded-lg text-white block px-4 py-2 text-sm hover:bg-gray-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    {item}
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
