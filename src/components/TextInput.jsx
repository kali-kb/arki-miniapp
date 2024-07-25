import React from 'react';

export default function TextInput({count, handleChange}) {
    // const handleChange = () => {
    //     console.log("Hello")
    // }
    return (
        <div class="relative rounded-lg p-2 bg-gray-700">
            <textarea id="description" name="jobDescription" onChange={(e) => handleChange(e)} rows="2" maxlength="2000" class="w-full rounded-md border border-none px-3 bg-gray-700 text-white py-2 focus:border-none focus:outline-none"></textarea>
            <div class="char-counter">{count}/2000</div>
        </div>
    );
}
