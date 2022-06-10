import { signIn, getProviders, getSession, useSession  } from "next-auth/react";
import Image from "next/image";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
  BadgeCheckIcon as BadgeCheckIconFilled,
} from "@heroicons/react/solid";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import Link from "next/link";
import { signup, useAuth, logout } from "../../firebase"
import { setDoc, addDoc, collection, onSnapshot, serverTimestamp, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

function Register({ providers }) {

  const [ loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const { data: session } = useSession();
  const router = useRouter();
  const currentUser = useAuth();
  const [displayName, setDisplayName] = useState("Null");
  const [userId, setUserId] = useState();

  async function checkinfo(){
    if (currentUser){
      var userdataRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(userdataRef);
    
      currentUser.name = docSnap.data().displayName;
      currentUser.email = docSnap.data().email;
      currentUser.pic = docSnap.data().picture;
      currentUser.bio = docSnap.data().biografy;
      currentUser.lastseen = docSnap.data().lastSeen.toDate();
      currentUser.banner = docSnap.data().banner;
      currentUser.link = docSnap.data().biolink;
      currentUser.tag = docSnap.data().tag;
    }
    else{

      alert("No log")
    }
  }

  function chinf(){
    console.log(currentUser)
  }


  /* useEffect(() => {
    
    checkinfo();
    
    async function checkinfo(){
      if (currentUser){
        var userdataRef = doc(db, "users", currentUser?.email);
        const docSnap = await getDoc(userdataRef);
      
        currentUser.name = docSnap.data().displayName;
        currentUser.email = docSnap.data().email;
        currentUser.pic = docSnap.data().picture;
        currentUser.bio = docSnap.data().biografy;
        currentUser.lastseen = docSnap.data().lastSeen.toDate();
        currentUser.banner = docSnap.data().banner;
        currentUser.link = docSnap.data().biolink;
        currentUser.tag = docSnap.data().tag;
      }
      else{
  
        alert("No log")
      }
    }

  }, []);  
   */
  const saveData = async () => {
    
    currentUser.pic = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.drupal.org%2Ffiles%2Fprofile_default.jpg&f=1&nofb=1"
    currentUser.bio = ""
    currentUser.banner = ""
    currentUser.link = ""
    currentUser.tag = usernameRef.current.value;

    
    const email = currentUser.email;
    const displayName = usernameRef.current.value;
    const lastSeen = serverTimestamp();
    const uid = currentUser.uid;
    const picture =  currentUser.pic;
    const biografy = currentUser.bio;
    const banner = currentUser.pic;
    const biolink = currentUser.link;
    const tag = usernameRef.current.value;


    const docRef = doc(db, "users", currentUser?.email);
    const payload = { email, displayName, lastSeen, uid, picture, biografy, banner, biolink, tag }
    await setDoc(docRef, payload);

    currentUser.photoURL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.drupal.org%2Ffiles%2Fprofile_default.jpg&f=1&nofb=1";
    currentUser.displayName = usernameRef.current.value;
    

    router.push("/")

  }

  async function handleLogout(){
    try{
      await logout();
      console.log("Sesión cerrada")

    } catch{
      console.log("Error cerrando sesión")
    }
  }


  if (session || currentUser){
/*     router.push("/") */


  }

  async function handleSignup(){
    
    if (!currentUser){
      try{
        await signup(emailRef.current.value, passwordRef.current.value);
        console.log("Cuenta creada")
        saveData()
  
      } catch{
        console.log("Error en la creacion")
      }
    }
    else{
      console.log("Persona logueada")
    }
    

  }

  //saber los tags de los usuarios
/*   useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        setUserId(snapshot.docs.map((doc) => (doc.id)));
      }),
    [db, userId]
  );
   
  const withoutNumbers = JSON.stringify(userId);

  //funcion para check de users

  function checkUsertag(){
    
    if (withoutNumbers.includes(session.user.tag)){
      handleSignup()
      return ("algo");
    }
   else {

      return ("algo");
    }
  } */

/*   console.log(console.log(withoutNumbers)) */


  //acaba la funcion


  return (
    
    <div className="flex flex-col items-center h-[65vh] sm:h-[75vh] bg-black mt-[15vh] sm:mt-[25vh]">
{/*       <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      /> */}


      <div className="flex flex-row justify-center items-center ">
          <div className="bg-[#ffffff] rounded-xl flex justify-center items-center w-[320px] h-[500px]">
            <div className=" text-black absolute -mt-5 text-center">
              <h1 className=" text-2xl font-medium mb-2">REGISTER</h1>
{/*               <button onClick={saveData}>Save data</button>
              <button onClick={checkinfo}>check</button>
              <button onClick={handleLogout}>logout</button>
              <p className="text-black text-xl">{currentUser?.email}</p> 
              <p className="text-black text-xl">{currentUser?.name}</p>  */}
              <form className="text-white text-center mt-[20px]">   
              <input ref={emailRef} className="text-center w-[150px] m-auto block my-3 px-2 rounded-3xl bg-black py-3 transition-padding duration-300 ease-in-out hover:w-[237px]" placeholder="Email" type="email"></input>     
              <input ref={usernameRef} className="text-center w-[150px] m-auto block my-3 px-2 rounded-3xl bg-black py-3 transition-padding duration-300 ease-in-out hover:w-[237px]" placeholder="Username"></input>
              <input ref={passwordRef} className="text-center w-[150px] m-auto block my-3 px-2 rounded-3xl bg-black py-3 transition-padding duration-300 ease-in-out hover:w-[237px]" placeholder="Password" type="password"></input>
              <button onClick={handleSignup} className="text-center m-auto mt-5 block py-1 bg-black w-[120px] text-white rounded-md transition-padding duration-300 ease-in-out hover:w-[180px]">REGISTER</button>
              <p className="text-black block text-xs mt-4">You have an account? - <Link href="/"><u className="inline-block font-semibold cursor-pointer">Login</u></Link></p>
              <div className="flex justify-center items-center mt-7">
                <p className="inline-block text-black font-bold max-w-[30px] absolute text-center">OR</p>
                <div className="h-[3px] w-[80px] mr-10 bg-black mx-auto inline-block"></div>
              <div className="h-[3px] w-[80px] bg-black inline-block mx-auto "></div>      
                 </div>
              </form>
              <div className="flex flex-col justify-center mt-3 -mb-2">
              <button
              className="px-[36px] py-[8px] bg-black rounded group mt-[10px] transition-color duration-300 ease-in-out hover:bg-[#242424]"
              onClick={() => signIn('google' , {callbackUrl: `/`})}
            >
              <span className=" relative w-full text-left text-white group-hover:text-white">
                Sign in with Google <p className="inline-block ml-2"><i className="fa-brands fa-google"></i></p>
              </span>
            </button>
            <button
              className="px-[18px] py-[8px] bg-black rounded group mt-[10px] transition-color duration-300 ease-in-out hover:bg-[#242424]"
              onClick={() => signIn('github' , {callbackUrl: `/`})}
            >
              <span className=" relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with GitHub <p className="inline-block ml-2"><i className="fa-brands fa-github"></i></p>
              </span>
            </button>
         </div>

            </div>

          </div>
                
      </div>

      <footer className="w-[100%] h-[40px] bg-[#fff0] absolute bottom-0 flex justify-center items-center ">
      <div className="font-bold text-sm text-center text-white -mt-10"><a target="_blank" href="https://twitter.com/thezeroxy"><p>Coded with<HeartIconFilled className="h-5 inline-block ml-1 mb-1 transition-colors ease-out duration-400 hover:text-[#f34d42]" /> by Zeroxy</p></a></div>
      </footer>


    </div>
    
  );
}

export default Register;
