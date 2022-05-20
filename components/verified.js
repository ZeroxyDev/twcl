import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {useState } from "react";import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
  BadgeCheckIcon as BadgeCheckIconFilled,
} from "@heroicons/react/solid";



export function checkVerified(){
  const { data: session } = useSession();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

let veri = <BadgeCheckIconFilled className="h-5 mb-0.5 inline-block" />;

let veri2 = "";

  if (verifieds.includes(session.user.uid)){
      return (veri);
    }
  else {
      return (veri2);
    }

    
  }
  
  export let verifieds = "112670485784646593078, 101583364194612751990, 104539294365604929004, 93105414"; 


  export default checkVerified


  






  


  