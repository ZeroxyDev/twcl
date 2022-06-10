import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import Register from "../components/Register";
import Header from "../components/Header";

export default function Home({ trendingResults, followResults, providers, articles }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>Home / Kron</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="bg-[#000] sm:min-h-[100vh] flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
          followResults={followResults}
/*           articles={articles} */
        />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

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
