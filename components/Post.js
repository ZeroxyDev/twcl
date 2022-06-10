import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
  BadgeCheckIcon as BadgeCheckIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';




function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  var verifieds = require('./verified');

    /* Función para calcular el tamaño de imagen y carácteres y definir una clase */

    let imagepx = post?.image;
    let textcount = post?.text.length;
/*     let checkncharacters = textcount.length; */
  
    let nolimits = "rounded-2xl max-h-[500px] object-cover mr-3 ml-3 mb-3 mt-2"
  
    let limits = "rounded-2xl max-h-[500px] object-cover mr-3 ml-3 -mb-1 mt-0"

    let combolimits = "rounded-2xl max-h-[500px] object-cover mr-3 ml-3 mb-3 mt-7"
  
    let checkch = marginCheck()
  
    function marginCheck(){
      if(imagepx > "30px" && textcount > 75){
        return(combolimits);
      }
      else if (imagepx > "30px"){
        return(nolimits);
      }
      else if(textcount > 75){
        return(nolimits)
      }
      else{
        return(limits);
      }
    }

/*     Función para saber si tiene imagen o no y arreglar margin */
    let imgclassnotex = "sm:mt-[10px]";
    let textnormalclass = "sm:mt-[8px]";

    let imgnotext = marginimage()


    function marginimage(){
      if(textcount > 1){
        return(imgclassnotex);
      }
      else{
        return(textnormalclass);
      }
    }

/*     Fin de la función */

/*     Función para saber si tiene imagen o no y arreglar margin (main page)*/
let imgclassnotex2 = "sm:-mt-2";
let textnormalclass2 = "sm:mt-[13px]";

let imgnotextfront = marginimage2()


function marginimage2(){
  if(textcount >= 1){
    return(imgclassnotex2);
  }
  else{
    return(textnormalclass2);
  }
}

/*     Fin de la función */

/*     Funcíon para quitar marging de sección en grande de imagen */
let imgclassnotex3 = "text-[#d9d9d9] ml-4 mr-4 mt-2 mb-3 md:mr-4 lg:mr-4 sm:ml-4 text-xl sm:mt-3 overflow-auto break-words";
let textnormalclass3 = "text-[#d9d9d9] ml-4 mr-4 mt-2 mb-3 md:mr-4 lg:mr-4 sm:ml-4 text-xl sm:mt-0 overflow-auto break-words";

let imagefixmargin = marginimage3()


function marginimage3(){
  if(textcount > 1){
    return(imgclassnotex3);
  }
  else{
    return(textnormalclass3);
  }
}

/*     Fin de la función */

  
  /*   Final de función de checkeo */


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

  

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };


  return (
    <div
      className="flex-col p-3 max-w-[1024px] flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/post/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4 object-cover "
        />
      )}
      <div className="flex flex-col">
        <div className={`flex ${!postPage && "justify-between max-w-[1024px] pl-[55px] -mt-12 mb-6"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4 object-cover "
            />
          )}
          <div className="text-[#6e767d] text-ellipsis w-full">
            <div className="inline-block group max-w-[370px]" >
              <h4
                className={`inline-block font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${imgnotext}  ${
                  !postPage && `${imgnotextfront} inline-block max-w-[370px]`
                }`}
                onClick={() => router.push(`${post?.tag}`)}
              >
                {post?.username} {veri2}
                
              </h4>              
              <span
                className={`ml-2 text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post?.tag}
              </span>
            </div>
            <span className="hover:underline text-sm sm:text-[15px]">
            </span> · {" "}
            <span className="hover:underline text-sm block sm:text-[15px] sm:inline-block">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5 -mb-4 lg:-mb-8 overflow-auto break-words">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className={imagefixmargin}>{post?.text}</p>
        )}
        <img  
          src={post?.image}
          alt=""
          className={checkch}
        />

        <div
          className={`text-[#6e767d] flex justify-between w-[100%] px-11 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#ffffff] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#ffffff]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {session.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                deleteDoc(doc(db, "posts", session.user.uid, "userposts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#ffffff]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#ffffff]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
