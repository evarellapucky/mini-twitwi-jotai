import { Link, useNavigate } from "react-router-dom"
import { userAtom, tokenAtom } from "../atoms/atoms"
import { useAtom } from "jotai"


function Navbar() {

  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(tokenAtom)
  const redirect = useNavigate();

  const logOut = () => {
    setUser(null);
    setToken(null);
    redirect("/");
  }

  return (
    <>
  <nav className="bg-white shadow dark:bg-gray-800">
    <div className="container flex items-center justify-between p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
      <div>
        <Link to="/" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Home</Link>
        {user && <Link to={`/users/${user.id}`} className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Profil</Link>}
        <Link to="/register" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">S&apos;inscrire</Link>
        {!user ? 
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Se connecter</Link>
          :
          <button onClick={logOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">LogOut</button>
        }
      </div>
      <p className="text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg border-2 border-blue-300 mt-1 font-bold">{user ? `Bonjour ${user.username}`  : ""}</p>
    </div>
  </nav>
        {/* {user ?  <button onClick={logOut}>LogOut</button> : <Link to="/login">Se connecter</Link>}
       
   
         */}

    </>
  )
}

export default Navbar
