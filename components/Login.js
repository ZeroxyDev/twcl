import { signIn } from "next-auth/react";
import Image from "next/image";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
  BadgeCheckIcon as BadgeCheckIconFilled,
} from "@heroicons/react/solid";

function Login({ providers }) {
  return (
    
    <div className="flex flex-col items-center space-y-20 pt-[20vh] sm:pt-[25vh]">
{/*       <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      /> */}


      <div className="flex flex-row fixed justify-center items-center] ">
          <div className="bg-[#ffffff] rounded-xl flex justify-center items-center w-[320px] h-[400px]">
            <div className=" text-black absolute -mt-5 text-center">
              <h1 className=" text-2xl font-medium mb-2">LOGIN</h1>
              <form className="text-white text-center mt-[20px]">        
              <input className="text-center w-[150px] m-auto block my-3 px-2 rounded-3xl bg-black py-3 transition-padding duration-300 ease-in-out hover:w-[250px]" placeholder="Username"></input>
              <input className="text-center w-[150px] m-auto block my-3 px-2 rounded-3xl bg-black py-3 transition-padding duration-300 ease-in-out hover:w-[250px]" placeholder="Password" type="password"></input>
              <button className="text-center m-auto mt-5 block py-1 bg-black w-[120px] text-white rounded-md transition-padding duration-300 ease-in-out hover:w-[180px]">LOGIN</button>
              <p className="inline-block text-black font-bold max-m-[30px] ml-[88px] mt-[17px] absolute text-center">OR</p>
              <div className="h-[3px] w-[80px] mr-10 bg-black mx-auto inline-block mt-7"></div>
              <div className="h-[3px] w-[80px] bg-black inline-block mx-auto mt-7"></div>
              <div className="flex justify-center">
         {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <button
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-black rounded hover:bg-black group mt-[20px]"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#3ccdf1] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
         ))}
         </div>
              </form>

            </div>

          </div>
                
      </div>

      <footer className="w-[100%] h-[40px] bg-white absolute bottom-0 flex justify-center items-center ">
      <p className="font-bold text-xl text-center"><a href="test"><p>Coded with<HeartIconFilled className="h-5 inline-block ml-2 mb-1 transition-colors ease-out duration-400 hover:text-[#f34d42]" /> by Zeroxy</p></a></p>
      </footer>


    </div>
    
  );
}

export default Login;
