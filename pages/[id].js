import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { modalState } from "../atoms/modalAtom";
  import Modal from "../components/Modal";
  import Sidebar from "../components/Sidebar";
  import Widgets from "../components/Widgets";
  import Post from "../components/Post";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/solid";
  import Comment from "../components/Comment";
  import Head from "next/head";
  import Register from "../components/Register";
  import Header from "../components/Header";
  import { LinkIcon, BookmarkAltIcon } from "@heroicons/react/outline";
  import Moment from "react-moment";

  import {
    HeartIcon as HeartIconFilled,
    ChatIcon as ChatIconFilled,
    BadgeCheckIcon as BadgeCheckIconFilled,
  } from "@heroicons/react/solid";
  
  
  
  function profilePage({ trendingResults, followResults, providers, articles }) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [profile, setProfile] = useState();
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState();
    const [posts, setPosts] = useState([]);


    
    var verifieds = require('../components/verified');


    let veri =  <BadgeCheckIconFilled className="h-5 mb-0.5 inline-block" />

    let veri3 = "";
    
    let veri2 = checkVerified()
    
    function checkVerified(){
      if (verifieds.verifieds.includes(profile?.uid)){
        return (veri);
      }
      else{
        return (veri3);
      }
    }


    useEffect(
      () =>
        onSnapshot(doc(db, "users", id), (snapshot) => {
          setProfile(snapshot.data());
        }),
      [db]
    );

    const isLog = profile?.uid;
    const noLog = session.user.uid;

    if(profile){
      checkProfile()
    }


    function checkProfile(){
      if(profile){
        onSnapshot(
          query(collection(db, "posts", profile.uid, "userposts"), orderBy("timestamp", "desc")),
          (snapshot) => {
            setPosts(snapshot.docs);
          }
        )
        return (isLog);
  
      }
      else{
        return (noLog);

      }
    }


    


  
    if (!session) return <Register providers={providers} />;
  
    return (
      <div>
        <Head>
          <title>
            {profile?.displayName} on Kron
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <main className="bg-[#000] min-h-[100vh] flex max-w-[1500px] mx-auto">
          <Sidebar />
          <div className="flex-grow border-l border-r border-gray-700 max-w-2x1 sm:ml-[73px] xl:ml-[370px]">
          <div>
      <main className="">
        <div className="">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-bold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            {profile?.displayName}
          </div>
          <div>
          <div className="sm:h-[200px] h-[150px] overflow-hidden w-full flex relative">          
            <img
            src={profile?.banner}
            className="xl:h-[560px] sm:h-[800px] h-[540px] xl:w-[700px] sm:w-[1100px] object-cover flex"
        />
        </div>

          <img
          src={profile?.picture}
          alt=""
          className="sm:h-36 sm:w-36 h-32 w-32  absolute sm:-mt-24 -mt-20  sm:ml-6 ml-4 mb-2 object-cover rounded-full md:mr-2.5 border-4 border-black"
        />
        <div className="flex justify-end mr-3 mt-2">
        <div className="top-0 py-1.5 z-50 w-[120px] ">
        <div className="flex items-center justify-center py-[18px] p-3 rounded-full relative ">
          <button 
            className="bg-white placeholder-gray-500 font-bold outline-none text-[#000] absolute inset-0 text-center w-full rounded-full focus:bg-[#e0e0e0] focus:shadow-lg"

          >
           Follow
          </button>
        </div>
      </div> 
        </div>

         <h4 className="font-bold  mt-4 ml-4 text-white">{profile?.displayName} {veri2} </h4>
         <p className="ml-4 inline font-normal text-[#6e767d]">@{profile?.tag}</p>

         <p className="text-white ml-4 mt-2 max-w-[210px] max-h-[100px] break-all overflow-hidden">{profile?.biografy}</p>

  
         <div className="mt-2 inline-block truncate max-w-[240px] sm:max-w-[240px] text-[#1d9bf0]">
           
           <LinkIcon className="h-5 inline-flex ml-4 text-[#6e767d]" />
           <a className="ml-2" href={profile?.biolink}>{profile?.biolink}</a>
           
          </div> 
          
          <div className="inline-flex items-center max-w-[240px]">
          <BookmarkAltIcon className="h-5 ml-4 inline-flex items-center  text-[#6e767d]" />
          <p className="text-[#6e767d] ml-2"> Joined <Moment format="D MMM YYYY" withTitle>{profile?.firstSeen.toDate()}</Moment></p>
          </div>

          <div>
          <div className="ml-4 mt-2 text-[14px] inline-flex">
            <span className="text-white inline font-bold">
              0 <p className="text-[#6e767d] inline font-normal">Following</p>
            </span>
          </div>

          <div className="ml-4 mt-2 text-[14px] inline-flex">
            <span className="text-white inline font-bold">
              0 <p className="text-[#6e767d] inline font-normal">Followers</p>
            </span>
          </div>
          </div>

        



         <div className="text-white w-full font-bold flex items-center justify-around py-1.5 pt-10 px-3 focus-within:shadow-lg space-x-8">
         <span className="xl:hoverAnimation bg-[#1a1a1a] px-3 py-2 rounded-full transition-colors ease-out duration-400 cursor-pointer">Posts</span>
         <span className="xl:hoverAnimation hover:bg-[#1a1a1a] transition-colors ease-out duration-400 px-3 py-2 rounded-full cursor-pointer">Replies</span>
         <span className="xl:hoverAnimation hover:bg-[#1a1a1a] transition-colors ease-out duration-400 px-3 py-2 rounded-full cursor-pointer">Media</span>
         <span className="xl:hoverAnimation hover:bg-[#1a1a1a] transition-colors ease-out duration-400 px-3 py-2 rounded-full cursor-pointer">Likes</span>
         </div>
         <div className="w-full h-[20px] border-b border-gray-700"></div>
         <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
          </div>
        </div>

      </main>
    </div>
          </div>
          <Widgets
            trendingResults={trendingResults}
            followResults={followResults}
/*             articles={articles} */
          />
  
          {isOpen && <Modal />}
        </main>
      </div>
    );
  }
  
  export default profilePage;
  
  export async function getServerSideProps(context) {
    const providers = await getProviders();
    const session = await getSession(context);
  
    const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
      (res) => res.json()
    );
    
  
    // Get Google News API
    const results = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=007dcd42690848ef90a5a3e94774f5d9`
    ).then((res) => res.json());
  
    return {
      props: {
        session,
/*         articles: results.articles, */
        followResults,
        providers,
      },
    };
  }