
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import Post from "../../components/Post";
import { db } from "../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Comment from "../../components/Comment";
import Head from "next/head";
import Header from "../../components/Header";
import checkVerified from "../../components/verified";
import Login from "../../components/Login";
import { LinkIcon, BookmarkAltIcon } from "@heroicons/react/outline";
import { signup, useAuth, logout } from "../../firebase"
import { setDoc, addDoc, collection, onSnapshot, serverTimestamp, doc, getDocs, getDoc, orderBy, query } from "firebase/firestore"
import Moment from "react-moment";


function Profile({ trendingResults, followResults, providers, articles }) {
  
  const bioinput = useRef();
  const linkinput = useRef();

  const saveData = async () => {;
    
    var userdataRef = doc(db, "users", session.user.tag);
    const docSnap = await getDoc(userdataRef);

    
    const email = session.user.email;
    const displayName = session.user.name;
    const lastSeen = docSnap.data().lastSeen;
    const uid = session.user.uid;
    const picture = session.user.image;
    const biografy = bioinput.current.value;
    const banner = session.user.banner;
    const biolink = linkinput.current.value;
    const tag = session.user.tag;


    const docRef = doc(db, "users", session.user.tag);
    const payload = { email, displayName, lastSeen, uid, picture, biografy, banner, biolink, tag }
    await setDoc(docRef, payload);

  }

  async function changeBio(){
    var userdataRef = doc(db, "users", session.user.tag);
    const docSnap = await getDoc(userdataRef);

    
    const email = session.user.email;
    const displayName = session.user.name;
    const lastSeen = docSnap.data().lastSeen;
    const uid = session.user.uid;
    const picture = session.user.image;
    const biografy = "I like cheese! is a joke...";
    const banner = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblueeyesandbluebonnets.com%2Fwp-content%2Fuploads%2F2020%2F12%2F9691c1d64dceadee032af0a3b787c084-1024x683.jpg";
    const biolink = "hi.world";
    const tag = session.user.tag;


    const docRef = doc(db, "users", session.user.tag);
    const payload = { email, displayName, lastSeen, uid, picture, biografy, banner, biolink, tag }
    await setDoc(docRef, payload);
  }



  
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);


  if (!session) return <Login providers={providers} />;

  let veri2 = checkVerified()


  async function getUserData(){
    var userdataRef = doc(db, "users", session.user.uid);
    const docSnap = await getDoc(userdataRef);

    const username = docSnap.data().picture;

    console.log(username)

  }

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts", session.user.uid, "userposts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );


  return (
    <div>
      <Head>
        <title>
          {session.user.name} on Kron
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="bg-black min-h-[100vh] flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2x1 sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-bold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            {session.user.name}
          </div>
          <div>
          <div className="sm:h-[200px] h-[150px] overflow-hidden w-full flex relative">          
            <img
            src={session.user.banner}
            className="xl:h-[560px] sm:h-[800px] h-[540px] object-cover flex"
        />
        </div>

          <img
          src={session.user.image}
          alt=""
          className="sm:h-36 sm:w-36 h-32 w-32  absolute sm:-mt-24 -mt-20  sm:ml-6 ml-4 mb-2 object-cover rounded-full md:mr-2.5 border-4 border-black"
        />
        <div className="flex justify-end mr-3 mt-2">
        <div className="top-0 py-1.5 z-50 w-[120px] ">
        <div className="flex items-center justify-center py-[18px] border-gray border-[0.1px] p-3 rounded-full relative ">
          <button onClick={changeBio}
            className="bg-transparent inline-block placeholder-gray-500 font-bold outline-none text-[#d9d9d9] absolute inset-0 text-center border border-transparent w-full focus:border-[#ffffff] rounded-full focus:bg-black focus:shadow-lg"

          >
           Edit Profile
          </button>
        </div>

{/* input change bio,etc */}

{/*         <div className="flex items-center justify-center py-[16px] p-3 rounded-full relative mr-4">
          <input placeholder="type a bio"className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] inset-0 p-3 mt-2 absolute w-[7vw] h-[3vh] border border-transparent  border-[#ffffff] rounded-full focus:bg-black focus:shadow-lg" ref={bioinput} ></input>
          </div>
          <div className="flex items-center justify-center py-[16px] p-3 rounded-full relative mr-4">
          <input ref={linkinput} placeholder="type a website for bio"className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] inset-0 p-3 mt-2 absolute w-[7vw] h-[3vh] border border-transparent  border-[#ffffff] rounded-full focus:bg-black focus:shadow-lg" ></input>
          </div> */}
        
      </div> 
        </div>

         <h4 className="font-bold  mt-4 ml-4 text-white">{session.user.name} {veri2} </h4>
         <p className="ml-4 inline font-normal text-[#6e767d]">@{session.user.tag}</p>

         <p className="text-white ml-4 mt-2 max-w-[210px] max-h-[100px] break-all overflow-hidden">{session.user.bio}</p>

  
         <div className="mt-2 inline-block truncate max-w-[240px] sm:max-w-[240px] text-[#1d9bf0]">
           
           <LinkIcon className="h-5 inline-flex ml-4 text-[#6e767d]" />
           <a className="ml-2" href={session.user.biolink}>{session.user.biolink}</a>
           
          </div> 
          
          <div className="inline-flex items-center max-w-[240px]">
          <BookmarkAltIcon className="h-5 ml-4 inline-flex items-center  text-[#6e767d]" />
          <p className="text-[#6e767d] ml-2"> <Moment format="D MMM YYYY" withTitle element="span">{session.user.lastseen}</Moment></p>
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
          </div>
          <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
        </div>

        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
/*           articles={articles} */
        />
      </main>
    </div>
  );
}

export default Profile;

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
/*       articles: results.articles, */
      followResults,
      providers,
    },
  };
}
