import Moment from "react-moment";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import checkVerified from './verified'
import Post from "./Post";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState, editState, postIdState, commentIdState, replyIdState } from "../atoms/modalAtom";
import { setDoc, addDoc, collection, onSnapshot, serverTimestamp, doc, getDocs, getDoc, orderBy, query, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase";
import { useSession } from "next-auth/react";
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
import { useRouter } from "next/router";

function Reply({ reply, id }) {
 
  var verifieds = require('./verified');

  let veri =  <BadgeCheckIconFilled className="h-5 mb-0.5 inline-block" />

  let veri3 = "";
  
  let veri2 = checkVerified()
  
  function checkVerified(){
    if (verifieds.verifieds.includes(reply?.id)){
      return (veri);
    }
    else{
      return (veri3);
    }
  }

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [replyId, setReplyId] = useRecoilState(replyIdState);
  const [commentId, setCommentId] = useRecoilState(commentIdState);
  const { data: session } = useSession();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [loadedprofile, setLoadedprofile] = useState(false);

  const replied = `(Replying to: @${reply?.repliedto})`;

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", postId, "comments", commentId, "replies", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ), setReplyId(id),
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
      await deleteDoc(doc(db, "posts", postId, "comments", commentId, "replies", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", postId, "comments", commentId, "replies", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

//check profile

const checkInfo = async () =>{
  console.log("Info Checked")
  if(reply?.id == session.user.uid){
    if(reply?.userImg !== session.user.image || reply?.username !== session.user.name){
      await updateDoc(doc(db, "posts", postId, "comments", commentId, "replies", id), {
        username: session.user.name,
        userImg: session.user.image
      });
    }
  }
 
}

if(!loaded){
  checkInfo() 
  setLoaded(true)
}



const checkInfoProfile = async () =>{
  console.log("Profile Info Checked")
  if(reply?.userImg !== session.user.image || reply?.username !== session.user.name){
    await updateDoc(doc(db, "posts", session.user.uid, "userposts", postId, "comments", commentId, "replies", id), {
      username: session.user.name,
      userImg: session.user.image
    });
  }
}


if(!loadedprofile){
  checkInfoProfile() 
  setLoadedprofile(true)
}

//fin check profile
  


  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700"     
     onClick={(e) => {
      e.stopPropagation();
    }}>
      <img
        src={reply?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4 object-cover"
      />
      <div className="flex flex-col w-full -mt-1">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {reply?.username} {veri2}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{reply?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{reply?.timestamp?.toDate()}</Moment>
            </span>
{/*             <p className="mt-0.5 mb-1.5 max-w-lg overflow-auto text-[15px] sm:text-base">{replied}</p> */}
            <p className="text-[#d9d9d9] mt-0.5 mb-1.5 max-w-lg overflow-auto text-[15px] sm:text-base inline-block">
              {reply?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
          
          
{/*           <div className="icon group">
            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div> */}

          {session.user.uid === reply?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", postId, "comments", commentId, "replies", id));
                deleteDoc(doc(db, "posts", reply?.id, "comments", commentId, "replies", id));
                router.push(`/posts/${postId}`);
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
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reply;
