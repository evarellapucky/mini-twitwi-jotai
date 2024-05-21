import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../../atoms/atoms";
import Postform from "../../Components/Postform";
import AllPosts from "../../Components/AllPosts";


function Home() {
  const [user] = useAtom(userAtom)

  return (
    <div>
    {user? <Postform /> : <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">vous devez être connecté pour voir les posts</h2>}
    <AllPosts />
    </div>
  )
}

export default Home;