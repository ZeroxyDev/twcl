import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function HeaderLink({ Icon, text, feed, active, avatar, hidden }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div
    className={`text-[#d9d9d9] flex items-center justify-center w-full xl:justify-start text-xl space-x-3 hoverAnimation ${
        active && "font-bold"
      }`}
      onClick={() => avatar && signOut()}
    >

      <Icon className="h-7" />

      <h4
        className={`text-sm ${
          feed && "hidden md:flex justify-start w-full mx-auto"
        }`}
      >
        {text}
      </h4>

    </div>
  );
}

export default HeaderLink;