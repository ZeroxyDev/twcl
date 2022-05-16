import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {useState } from "react";



export function checkVerified(){
  const { data: session } = useSession();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

let veri = "fa-solid fa-circle-check";

let veri2 = "false";

  if (verifieds.includes(session.user.uid)){
      return (veri);
    }
  else {
      return (veri2);
    }

    
  }
  
  export let verifieds = "112670485784646593078, 101583364194612751990"; 


  export default checkVerified


  






  


  