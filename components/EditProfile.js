import { useRecoilState } from "recoil";
import { modalState, postIdState, editState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import {
  setDoc, addDoc, collection, onSnapshot, serverTimestamp, doc, getDocs, getDoc, orderBy, query
} from "@firebase/firestore";
import { db, upload, uploadBanner } from "../firebase";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
  CloudUploadIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import {
  BadgeCheckIcon as BadgeCheckIconFilled,
} from "@heroicons/react/solid";


function EditProfile() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [iseOpen, setIseOpen] = useRecoilState(editState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();

  const bioinput = useRef();
  const linkinput = useRef();
  const nameinput = useRef();

  //upload photo
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState();
  const [imagesrc, setImagesrc] = useState(session.user.image);
  
  setTimeout(function() {
    setLoading(false)
}, 3000);

  if(photo == null){
    setPhoto(session.user.image)
  }

  function handleChange(e) {
    setLoading(true)
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
      setImagesrc(URL.createObjectURL(e.target.files[0]))
    }
    setTimeout(function() {
      setLoading(false)
  }, 3000);
  }

  function handleClick() {
    setTimeout(function() {
      if(photo == null){
        setPhoto(session.user.picture)
      }
      else{
        upload(photo, session, setLoading);
      }

  }, 3000);

  }
  

   //fin upload photo

     //upload banner
  const [banner, setBanner] = useState(null);
  const [bannerURL, setBannerURL] = useState();
  const [bannersrc, setBannersrc] = useState(session.user.banner);

  if(banner == null){
    setBanner(session.user.banner)
  }

  function handleChangeBanner(e) {
    setLoading(true)
    if (e.target.files[0]) {
      setBanner(e.target.files[0])
      setBannersrc(URL.createObjectURL(e.target.files[0]))
    }
    setTimeout(function() {
      setLoading(false)
  }, 3000);
  }

  function handleClickBanner() {
    setTimeout(function() {
      if(banner == null){
        setBanner(session.user.banner)
      }
      else{
        uploadBanner(banner, session, setLoading);
      }

  }, 3000);
   
  }

   //fin upload photo


  var verifieds = require('./verified');

  let veri =  <BadgeCheckIconFilled className="h-5 mb-0.5 inline-block" />

  let veri3 = "";
  
  let veri2 = checkVerified()
  
  function checkVerified(){
    if (verifieds.verifieds.includes(post?.id)){
      return (veri);
    }
    else{
      return (veri3);
    }
  }

  const sendComment = async (e) => {
    e.preventDefault();
    setIseOpen(false);
    setComment("");

    router.push(`/post/${postId}`);
  };

  async function changeProfile(){
    var userdataRef = doc(db, "users", session.user.tag);
    const docSnap = await getDoc(userdataRef);

    

    function biock(){

      if(bioinput.current.value < 1){
        return(session.user.bio);
      }
      else{
        return(bioinput.current.value);
      }
  
    }

    function webck(){

      if(linkinput.current.value < 1){
        return(session.user.biolink);
      }
      else{
        return(linkinput.current.value);
      }
  
    }

    function nameck(){

      if(nameinput.current.value < 1){
        return(session.user.name);
      }
      else{
        return(nameinput.current.value);
      }
  
    }
    
    const email = session.user.email;
    const displayName = nameck();
    const firstSeen = docSnap.data().firstSeen;
    const uid = session.user.uid;
    const picture = docSnap.data().picture;
    const biografy = biock();
    const banner = docSnap.data().banner;
    const biolink = webck();
    const tag = session.user.tag;

    const imageRef = ref(db, `users/${session.user.tag}/picture`);
    const bannerRef = ref(db, `users/${session.user.tag}/banner`);
    const nameRef = ref(db, `users/${session.user.tag}/name`);
    const websiteRef = ref(db, `users/${session.user.tag}/biolink`);
    const bioRef = ref(db, `users/${session.user.tag}/biografy`);
    const payloadmedia = { picture, banner, displayName, biografy, biolink }
    await setDoc(nameRef, websiteRef, bioRef,  payloadmedia);


/*     const docRef = doc(db, "users", session.user.tag);
    const payload = { email, displayName, firstSeen, uid, picture, biografy, banner, biolink, tag }
    await setDoc(docRef, payload); */

      handleClick();

      handleClickBanner();

    setIseOpen(false);

    router.push(`/profile`);
  }

  return (
    <Transition.Root show={iseOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 -pt-8 sm:pt-8" onClose={setIseOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-black rounded-2xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => setIseOpen(false)}
                >
                  <XIcon className="h-[22px] text-white" />
                </div>
                <p className="text-white font-bold text-lg ml-2">Edit Profile</p>
                <button
                 disabled={loading}
                 className="bg-[#ffffff] right-0 mr-4 absolute text-black rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#ececec] disabled:opacity-50 disabled:cursor-default"
                 type="submit"
                 onClick={(e) => {
                  e.stopPropagation();
                  changeProfile();
                }} > Save </button>
              </div>


              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">

                  </div>
                  
             <div className="sm:h-[200px] h-[150px] overflow-hidden w-full flex relative">    
               <img
                src={bannersrc}
                 className="xl:h-[560px] sm:h-[800px] h-[540px] xl:w-[700px] sm:w-[1100px] object-cover flex"
                  />
            <label for="banupl" className=" absolute flex items-center justify-center  hover:bg-[#464646] bg-black rounded-full w-12 h-12 m-5 mr-4 cursor-pointer">
            <CloudUploadIcon className="relative w-[50%] h-[50%] text-white top-0 left-0 rounded-full cursor-pointer" />
            <input id="banupl" type="file" className="absolute w-full h-full bg-white top-0 left-0 opacity-0 hidden rounded-full cursor-pointer" placeholder="banner" onChange={handleChangeBanner} />
            </label>
           </div>

           <div className="mb-16 justify-center flex">
             <img
             src={imagesrc}
             alt=""
             className="xl:h-42 xl:w-42 h-36 w-36 sm:-mt-24 -mt-20 absolute object-cover rounded-full mr-4 border-4 border-black"/>
            <label for="picupl" className=" absolute flex items-center justify-center hover:bg-[#464646] bg-black rounded-full w-16 h-16 sm:-mt-14 -mt-10 mr-4 cursor-pointer">
            <CloudUploadIcon className="relative w-[50%] h-[50%] text-white top-0 left-0 rounded-full cursor-pointer" />
            <input id="picupl" type="file" className="absolute hidden w-full h-full bg-white top-0 left-0 opacity-0 rounded-full cursor-pointer" placeholder="banner" onChange={handleChange} />
            </label>
           </div>

                  <div className="mt-7 space-x-3 w-full">

                  <div className="flex-grow mt-2 ml-3">
                    <p className="text-gray-400 mb-1">Name</p>
                      <div className="border rounded-lg border-gray-600">
                      <textarea
                        ref={nameinput}
                        type="hidden"
                        placeholder="Edit name"
                        rows="1"
                        className="bg-transparent ml-2 py-2 resize-none flex-wrap outline-none overflow-hidden text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[30px]"
                      />
                      </div>
                      <div className="flex pt-2.5">
                      </div>
                    </div>

                    <div className="flex-grow mt-2">
                    <p className="text-gray-400 mb-1">Bio</p>
                      <div className="border rounded-lg border-gray-600">
                      <textarea
                      ref={bioinput}
                        type="hidden"
                        placeholder="Edit bio"
                        rows="2"
                        className="bg-transparent ml-2 py-2 resize-none flex-wrap outline-none overflow-hidden text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[30px]"
                      />
                      </div>
                      <div className="flex pt-2.5">
                      </div>
                    </div>

                    <div className="flex-grow mt-2">
                    <p className="text-gray-400 mb-1">Website</p>
                      <div className="border rounded-lg border-gray-600">
                      <textarea
                      ref={linkinput}
                        type="hidden"
                        placeholder="Edit website"
                        rows="1"
                        className="bg-transparent ml-2 py-2 resize-none flex-wrap outline-none overflow-hidden text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[30px]"
                      />
                      </div>
                      <div className="flex pt-2.5">
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default EditProfile;
