/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { FilterIcon } from "../icons/FilterIcon";
import { RSSIcon } from "../icons/RSSIcon";
import { SearchResultCard } from "../components/SearchResultCard";
import {
  BrowserNavigator,
  createBrowserNavigatorFromLocation,
} from "@telegram-apps/sdk";
import { initHapticFeedback } from '@telegram-apps/sdk';
import { initNavigator } from "@telegram-apps/sdk-react";
import { request } from '@telegram-apps/sdk';
import { Link } from "react-router-dom";
import data from "../mock-server/search-result.json";

function JobSearchPage() {
  // const navigator = useMemo(() => initNavigator('app-navigation-state'), [])
  const navigator = new BrowserNavigator(["/"], 0);


  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <>
      <div className="">
        <div className="flex gap-3 bg-[#212332] items-center">
          {/* <button onClick={closeMiniapp}>Do thingss</button> */}
          <Link to="/employer-type">
            <p>Hello</p>
          </Link>
          <Input
            isClearble
            classNames={{
              input: [
                "bg-gray-700",
                "text-white/90",
                "group-data-[hover=true]:bg-gray-700",
                " dark:text-white/90",
              ],
              innerWrapper: ["bg-gray-700", "text-white"],
              inputWrapper: [
                "bg-gray-700",
                "hover:bg-black/90",
                "group-data-[focus=true]:bg-gray-700",
                "dark:group-data-[focus=true]:bg-default/60",
              ],
            }}
            placeholder="Search Jobs.."
            startContent={<SearchIcon className="text-white" />}
          />
          <div className="bg-gray-700 w-10 h-9 rounded-lg p-2">
            <FilterIcon />
          </div>
        </div>

        <div className="flex mt-5 gap-2">
          <div className="h-5 w-5 p-1 rounded bg-blue-500/20">
            <RSSIcon />
          </div>
          <p className="text-white text-sm font-bold">All Jobs</p>
        </div>
        {/* search result card */}
        {data.map((item, index) => (
          <SearchResultCard key={index} {...item} />
        ))}
        {/* search result card */}
      </div>
    </>
  );
}

export default JobSearchPage;
