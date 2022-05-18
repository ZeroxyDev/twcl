import { signIn } from "next-auth/react";
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

function Login({ providers }) {
  return (
    
    <div className="flex flex-col items-center h-{100vh} pt-[20vh] sm:pt-[25vh]">
{/*       <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      /> */}


      <div className="flex flex-row justify-center items-center] ">
          <div className="bg-[#ffffff] rounded-xl flex justify-center items-center w-[320px] h-[430px]">
            <div className=" text-black absolute -mt-5 text-center">
              <h1 className=" text-2xl font-medium mb-2">LOGIN</h1>
              <form className="text-white text-center mt-[20px]">        
              <input className="text-center w-[150px] m-auto block my-3 px-2 rounded-3xl bg-black py-3 transition-padding duration-300 ease-in-out hover:w-[237px]" placeholder="Username"></input>
              <input className="text-center w-[150px] m-auto block my-3 px-2 rounded-3xl bg-black py-3 transition-padding duration-300 ease-in-out hover:w-[237px]" placeholder="Password" type="password"></input>
              <button className="text-center m-auto mt-5 block py-1 bg-black w-[120px] text-white rounded-md transition-padding duration-300 ease-in-out hover:w-[180px]">LOGIN</button>
              <p className="text-black block text-xs mt-4">You dont have an account? - <a href="register"><u className="inline-block font-semibold  ">Create Account</u></a></p>
              <p className="inline-block text-black font-bold max-m-[30px] ml-[88px] mt-[17px] absolute text-center">OR</p>
              <div className="h-[3px] w-[80px] mr-10 bg-black mx-auto inline-block mt-7"></div>
              <div className="h-[3px] w-[80px] bg-black inline-block mx-auto mt-7"></div>
              <div className="flex flex-col justify-center mt-3 -mb-2">
              <button
              className="px-[18px] py-[8px] bg-black rounded hover:bg-black group mt-[10px]"
              onClick={() => signIn('google')}
            >
              <span className=" relative w-full text-left text-white transition-padding duration-300 ease-in-out hover:w-[300px] group-hover:text-white">
                Sign in with Google <p className="inline-block ml-2"><i class="fa-brands fa-google"></i></p>
              </span>
            </button>
            <button
              className="px-[18px] py-[8px] bg-black rounded hover:bg-black group mt-[10px]"
              onClick={() => signIn('github')}
            >
              <span className=" relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with GitHub <p className="inline-block ml-2"><i class="fa-brands fa-github"></i></p>
              </span>
            </button>
         </div>
              </form>

            </div>

          </div>
                
      </div>

      <footer className="w-[100%] h-[40px] bg-black absolute bottom-0 flex justify-center items-center ">
      <p className="font-bold text-sm text-center text-white mb-10"><a href="https://twitter.com/thezeroxy"><p>Coded with<HeartIconFilled className="h-5 inline-block ml-1 mb-1 transition-colors ease-out duration-400 hover:text-[#f34d42]" /> by Zeroxy</p></a></p>
      </footer>


    </div>
    
  );
}

export default Login;
