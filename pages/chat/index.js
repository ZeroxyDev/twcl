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
import { modalState } from "../../atoms/modalAtom";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import Post from "../../components/Post";
import { db } from "../../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Comment from "../../components/Comment";
import Head from "next/head";
import Login from "../../components/Login";
import Header from "../../components/Header";



function Chat({ providers }) {

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  if (!session) return <Login providers={providers} />;
    return (
      
      <div>
          <h1 className="text-white">test</h1>
      </div>
      
    );
  }
  
  export default Chat;