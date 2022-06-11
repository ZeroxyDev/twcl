import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { setDoc, addDoc, collection, onSnapshot, serverTimestamp, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../../firebase"
import { useEffect } from "react";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
    // ...add more providers here
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
  },
    
    async session({ session, token }) {
/*       session.user.tag = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase(); */

      session.user.uid = token.sub;

      var palabrasProhibidas = ['@gmail.com'];
      var numeroPalabrasProhibidas = palabrasProhibidas.length;

      var emailnsw = session.user.email;

      while(numeroPalabrasProhibidas--) {
       if (emailnsw.indexOf(palabrasProhibidas[numeroPalabrasProhibidas])!=-1) {
       emailnsw = emailnsw.replace(new RegExp(palabrasProhibidas[numeroPalabrasProhibidas], 'ig'), "");
        }
      }

      session.user.emailnsw = emailnsw;
      
      
      //moded
      
      
      var userdataRef = doc(db, "users", emailnsw);
      const docSnap = await getDoc(userdataRef);

  
        const noteSnapshot = await getDoc(doc(db, 'users', emailnsw));
        if (!noteSnapshot.exists()) {
          const email = session.user.email;
          const displayName = session.user.name;
          const firstSeen = serverTimestamp();
          const uid = session.user.uid;
          const picture = session.user.image;
          const biografy = ""
          const banner = "https://cdn.wallpapersafari.com/27/35/8X1gKn.png"
          const biolink = ""
          const tag = session.user.emailnsw;
    
   
          const docRef = doc(db, "users", emailnsw);
          const payload = { email, displayName, firstSeen, uid, picture, biografy, banner, biolink, tag }
          await setDoc(docRef, payload);

        }
        else if (noteSnapshot.exists() && session.user.uid == docSnap.data().uid){
          session.user.name = docSnap.data().displayName;
          session.user.email = docSnap.data().email;
          session.user.image = docSnap.data().picture;
          session.user.bio = docSnap.data().biografy;
          session.user.firstseen = docSnap.data().firstSeen.toDate();
          session.user.banner = docSnap.data().banner;
          session.user.biolink = docSnap.data().biolink;
          session.user.tag = docSnap.data().tag;
        }
        else
        {
          alert("El nombre de usuario no está disponible, cambialo en tu cuenta de google.") //Error que no deja iniciar sesión si no esta disp el username
          console.log("El nombre de usuario no está disponible, cambialo en tu cuenta de google.")
        }
 
 




 






      //fin moded

      return session;
    },
  },
  secret: process.env.JWT_SECRET
});
