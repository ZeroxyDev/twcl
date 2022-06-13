import Moment from "react-moment";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import checkVerified from '../../../../components/verified'
import Post from "../../../../components/Post";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalcState, editState, postIdState, commentIdState, replyIdState } from "../../../../atoms/modalAtom";
import { setDoc, addDoc, collection, onSnapshot, serverTimestamp, doc, getDocs, getDoc, orderBy, query, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../../../firebase";
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

function Comment({ comment, id}) {
 
  var verifieds = require('../../../../components/verified');

  let veri =  <BadgeCheckIconFilled className="h-5 mb-0.5 inline-block" />

  let veri3 = "";
  
  let veri2 = checkVerified()
  
  function checkVerified(){
    if (verifieds.verifieds.includes(comment?.id)){
      return (veri);
    }
    else{
      return (veri3);
    }
  }


  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [posts, setPosts] = useState([]);
  const [iscOpen, setIscOpen] = useRecoilState(modalcState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [replyId, setReplyId] = useRecoilState(replyIdState);
  const [commentId, setCommentId] = useRecoilState(commentIdState);
  const { data: session } = useSession();
  const router = useRouter();
  const [replies, setReplies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loadedprofile, setLoadedprofile] = useState(false);
  


  const replied = `(Replying to: @${comment?.repliedto})`;

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", comment.replied, "comments", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", comment.replied, "comments", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };


  function checklik(){
    if(comment.replied){
      onSnapshot(collection(db, "posts", comment.replied, "comments", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    )
    }
    else{

    }
  }

  function checkrepls(){
    
    if(postId){
      onSnapshot(
        query(
          collection(db, "posts", comment.replied , "comments", id, "replies"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setReplies(snapshot.docs))
    }
    else{

    }

  }

  useEffect(() => {
    checkrepls();
    checklik();
  }, []) 

  //check profile

  const checkInfo = async () =>{
    console.log("Info Checked")
    if(comment?.id == session.user.uid){
      if(comment?.userImg !== session.user.image || comment?.username !== session.user.name){
        await updateDoc(doc(db, "posts", postId, "comments", id), {
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
    if(comment?.userImg !== session.user.image || comment?.username !== session.user.name){
      await updateDoc(doc(db, "posts", session.user.uid, "userposts", comment.replied, "comments", id), {
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
      setPostId(postId);
      setCommentId(id)
      router.push(`/post/${comment.replied}/comments/${id}`);
    }}>
      <img
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4 object-cover"
      />
      <div className="flex flex-col w-full -mt-1">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username} {veri2}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="mt-0.5 mb-1.5 max-w-lg overflow-auto text-[15px] sm:text-base">{replied}</p>
            <p className="text-[#d9d9d9] mt-0.5 mb-1.5 max-w-lg overflow-auto text-[15px] sm:text-base inline-block">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
        
        
        <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setCommentId(id);
              setPostId(comment.replied),
              setIscOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#ffffff] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#ffffff]" />
            </div>
            {replies.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {replies.length}
              </span>
            )}
          </div>

          {session.user.uid === comment?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                setPostId(comment.replied),
                deleteDoc(doc(db, "posts",comment.replied, "comments", id));
                deleteDoc(doc(db, "posts", comment?.id, "comments", id));
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
              setPostId(comment.replied),
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

export default Comment;
