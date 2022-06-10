import Image from "next/image";
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
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import ChatIcon from "@mui/icons-material/Chat";

import checkVerified from './verified'
import { useRouter } from "next/router";

  
function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

let veri2 = checkVerified()


  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full ">

      <div className="hidden  sm:flex items-center justify-center w-16 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/3amls7" width={40} height={40} />
      </div> 

      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24 ">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <div onClick={() => router.push("/chat")}><SidebarLink text="Messages" Icon={InboxIcon} /></div>
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <div onClick={() => router.push("/profile")}><SidebarLink text="Profile" Icon={UserIcon} /></div>
        <div  onClick={signOut}> <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} /></div>

      </div>
      <button className="hidden xl:inline ml-auto bg-[#ffffff] text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#cacaca]">
        Post
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5"
        onClick={() => router.push(`/profile`)}
      >
         <div onClick={() => router.push("/profile")}>
           <img
          src={session.user.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5 object-cover "
        /></div>
        
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{session.user.name} {veri2} </h4>
          <p className="text-[#6e767d]">@{session.user.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;
