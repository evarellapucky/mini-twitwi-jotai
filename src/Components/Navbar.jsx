import { Link } from "react-router-dom"
import { userAtom, tokenAtom } from "../atoms/atoms"
import { useAtom } from "jotai"


function Navbar() {

  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(tokenAtom)

  const logOut = () => {
    setUser(null);
    setToken(null);
  }

  return (
    <>
        {user ?  <button onClick={logOut}>LogOut</button> : <Link to="/login">Se connecter</Link>}
        <Link to="/">Home</Link>
        { user ?  <Link to={`/users/${user.id}`}>Profil</Link> : ""}
        <Link to="/register">S&apos;inscrire</Link>
        

    </>
  )
}

export default Navbar
