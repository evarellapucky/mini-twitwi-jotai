import { useAtom } from "jotai"
import { postsAtom, tokenAtom, userAtom } from "../atoms/atoms"
import { useState } from "react"
import axios from 'axios';

function Postform() {
  const [posts, setPosts] = useAtom(postsAtom)
  const [token] = useAtom(tokenAtom)
  const [user] = useAtom(userAtom)
  const [text, setText] = useState("");

 const handleNewPost = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.post('http://localhost:1337/api/posts',{
        data: {
        text: text,
        author: user.id
        }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      
      
    });
    console.log(response)
    setPosts(response.data)
    setText("")
  } catch(error) {
    console.error(error)
  }
 }

  return (
<>
    <div className="heading text-center font-bold text-3xl m-5 tracking-tight text-gray-900 sm:text-4xl">New Post</div>
<style>
{`body {background:white !important;}`}
</style>
  <form onSubmit={handleNewPost} className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    
    <textarea name="message" value={text} onChange={(e) => setText(e.target.value)} className="description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none" spellCheck="false" placeholder="Dis-nous tout !"></textarea>
    
    {/* <!-- icons --> */}
    <div className="icons flex text-gray-500 m-2">
      <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
      <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
    </div>
    {/* <!-- buttons --> */}
    <div className="buttons flex">
      <button type="submit" className="btn border p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-500 hover:bg-blue-700">Créer le post</button>
    </div>
  </form>
    {/* <div>
      <form onSubmit={handleNewPost}>
        <textarea name="message" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <button type="submit">Créer le post</button>
      </form>
    </div> */}
    </>
  )
}

export default Postform
