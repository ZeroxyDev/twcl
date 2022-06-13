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
import { modalState, modalcState } from "../../atoms/modalAtom";
import Modal from "../../components/Modal";
import Modalcomment from "../../components/Modalcomment";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import Post from "../../components/Post";
import { db } from "../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Comment from "../../components/Comment";
import Head from "next/head";
import Register from "../../components/Register";
import Header from "../../components/Header";



function PostPage({ trendingResults, followResults, providers, articles }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [iscOpen, setIscOpen] = useRecoilState(modalcState);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

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

  if (!session) return <Register providers={providers} />;

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Kron: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="bg-black min-h-[100vh] flex max-w-[1402px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2x1 sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Post
          </div>

          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
/*           articles={articles} */
        />

        {isOpen && <Modal />}
        {iscOpen && <Modalcomment />}
      </main>
    </div>
  );
}

export default PostPage;

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
