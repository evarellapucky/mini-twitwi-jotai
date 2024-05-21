import { atom } from "jotai";
import { userAtom, tokenAtom } from "../../atoms/atoms";
import { useState, useEffect } from "react";
import Postform from "../../Components/Postform";


function Home() {
  return (
    <div>
    <h1>Home</h1>
    <Postform />
    </div>
  )
}

export default Home;