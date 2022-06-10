import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import Image from "next/image";
import TimeAgo from "timeago-react";

import { SearchIcon } from "@heroicons/react/outline";

function Widgets({ articles, followResults}) {
  
  return (
    <div className="hidden lg:inline ml-8 mt-4 xl:w-[450px] py-1 space-y-5">
     <div className="hidden sm:block sticky top-0 py-1.5 z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative ">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#ffffff] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search"
          />
        </div>
      </div> 

      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 pb-2 rounded-xl w-11/12 xl:w-9/12 ">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
{/*         {articles.slice(0, 5).map((article) => (
       <div
       key={article.url}
       className="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1"
       >
        <FiberManualRecordRoundedIcon className="!h-2 !w-2" />
        <div>
         <h5 className="xl:max-w-[244px] 2xl:max-w-[284px]  max-w-xs font-medium text-sm truncate pr-10">
        {article.title}
         </h5>
         <TimeAgo
          datetime={article.PostedAt}
          className="text-xs mt-0.5 dark:text-white/75 opacity-80"
         />
      </div>
  </div>
  ))} */}
{/*         <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#ffffff] font-light">
          Show more
        </button> */}
      </div>

      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] py-2 rounded-xl w-11/12 xl:w-9/12 object-cover overflow-hidden">
        <div className="dark:bg-[#1D2226] w-12/12 h-64 py-1.5 px-2.5 rounded-xl sticky border border-none dark:border-none object-cover">
        <div className="relative w-full h-full">
          <Image
            src="https://rb.gy/mekybv"
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-xl"
          />
        </div>
{/*         <h4 className="font-bold text-sm px-4 relative ml-[260px] inline-flex">Ads <InfoRoundedIcon className="h-4 w-4 mt-[2px] ml-[2px] inline-flex" /></h4> */}
      </div>
        
{/*         <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button> */}
      </div>

    </div>
  );
  
}

export default Widgets;
