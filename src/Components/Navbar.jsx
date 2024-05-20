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
        {user ?  <button onClick={logOut}>LogOut</button> : <p>pas de button a la con</p>}
        <Link to="/">Home</Link>
        <Link to="/profile">Profil</Link>
        <Link to="/register">S&apos;inscrire</Link>
        <Link to="/login">Se connecter</Link>

    </>
  )
}

export default Navbar
