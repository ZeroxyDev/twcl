import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchIcon from "@mui/icons-material/SearchRounded";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import Chat from "../pages/chat/index.js";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  UsersIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";


import checkVerified from './verified'
import { useRouter } from "next/router";


function Header() {
 
const { data: session } = useSession();

const router = useRouter();


let veri2 = checkVerified()


  return (
    <nav className="border-gray-700 border-t sm:hidden fixed bottom-0 z-[100] w-screen text-white bg-[#000000] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg  ">
    {/* Left */}
{/*     <div className="ml-0 left-0 absolute"> 

      </div> */}

{/* <div className="hidden  sm:flex items-center justify-center w-16 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/3amls7" width={40} height={40} />
      </div> */}

    <div className="flex text-white justify-center items-center sm:px-8  space-x-7 sm:space-x-6 xl:w-[80vw] w-[90vw]">
    
    <div
        className="text-[#d9d9d9]  w-screen inline-flex items-center justify-center hoverAnimation md:ml-auto md:-mr-5"
      >
        <img
          src={session.user.image}
          alt=""
          className="h-8 w-8 rounded-full md:mr-2.5 object-cover"
          onClick={() => router.push(`/profile`)}
        />
        <div className="hidden lg:inline leading-5">
          <h4 className="font-bold">{session.user.name} {veri2} <p className="inline font-normal text-[#6e767d]">@{session.user.tag}</p> </h4>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>

        <div className="w-screen xl:w-[50vw]" onClick={() => router.push(`/`)}><HeaderLink Icon={HomeIcon} text="Home" feed active /></div>
        <div className="w-screen xl:w-[50vw]" ><HeaderLink Icon={UsersIcon} text="Friends" feed /></div>
        <div className="w-screen xl:w-[50vw]" onClick={() => router.push(`/chat`)}><HeaderLink Icon={InboxIcon} text="Messaging" feed /></div>
        <div className="w-screen xl:w-[50vw]" ><HeaderLink Icon={BellIcon} text="Notifications" feed /></div>
    </div>
    {/* Right */}
{/*      <div className="hidden sm:block sticky top-0 py-1.5 z-50 w-[300px]">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative ">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#ffffff] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search"
          />
        </div>
      </div>  */}

  </nav>
    
  );
}

export default Header;
