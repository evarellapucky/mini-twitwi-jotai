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
    <div>
      <form onSubmit={handleNewPost}>
        <textarea name="message" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <button type="submit">Créer le post</button>
      </form>
    </div>
  )
}

export default Postform
