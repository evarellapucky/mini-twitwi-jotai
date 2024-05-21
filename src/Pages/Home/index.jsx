import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../../atoms/atoms";
import { useState, useEffect } from "react";
import Postform from "../../Components/Postform";
import AllPosts from "../../Components/AllPosts";


function Home() {
  const [user] = useAtom(userAtom)

  return (
    <div>
    <h1>Bonjour {user ? user.username : ""}</h1>
    
    <Postform />

    <AllPosts />
    </div>
  )
}

export default Home;