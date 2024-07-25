import { useState } from "react"
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1322133239.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1400375545.
export const FileUploader = ({name, handleCompanyLogoChange}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  


  const handleChange = (e) => {
    console.log("file: ", e.target.files)
    setSelectedFile(e.target.files[0]);
    handleCompanyLogoChange(e)
  }


  return (
    <div className="relative w-[fit-content] inline-block">
      <input
        type="file"
        id="file"
        name="companyLogo"
        // onChange={(e) => setSelectedFile(e.target.files[0])}
        onChange={(e) => handleChange(e)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <label
        htmlFor="file"
        className="flex gap-2 active:bg-gray-400 cursor-pointer items-center rounded-xl bg-gray-700 px-4 py-2 text-white"
      >
        <div className="h-6 w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <rect
              x="48"
              y="80"
              width="416"
              height="352"
              rx="48"
              ry="48"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <circle
              cx="336"
              cy="176"
              r="32"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              d="M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
        </div>
        <span>{selectedFile ? selectedFile.name : 'Upload Image'}</span>
      </label>
    </div>
  );
};
