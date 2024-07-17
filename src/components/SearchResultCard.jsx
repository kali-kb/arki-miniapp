/* eslint-disable react/prop-types */
import { Avatar } from "@nextui-org/avatar";

export const SearchResultCard = ({job_title, job_type, location, company, job_description}) => {
  return (
    <>
      {/* search result card */}
      <div className="bg-gray-700 p-4 mt-5 rounded-lg">
        <div className="flex gap-2">
          <Avatar
            className="h-5 w-5 mt-1 text-tiny"
            isBordered
            color="primary"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
          <div className="flex flex-col place-items-start">
            <p className="text-xs text-white font-semibold text-start">
              {job_title}
            </p>
            <span className="text-xs text-gray-400 text-start">{company}</span>
          </div>
        </div>
        <div id="tags" className="flex gap-2 mt-2 flex-wrap">
          <div>{job_type}</div>
          <div>{location}</div>
        </div>
        <div>
          <p className="text-white text-xs mt-2 text-justify">
            {job_description}
          </p>
        </div>
      </div>
      {/* search result card */}
    </>
  );
};
