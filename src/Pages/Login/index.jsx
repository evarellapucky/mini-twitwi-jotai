import { userAtom, tokenAtom, } from "../../atoms/atoms";
import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";

function Login() {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e) => { 
    e.preventDefault();
    
    try{
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password
      })
      console.log("LOGIN LOG")
      console.log(response.data.user);
      setUser(response.data.user);
      setToken(response.data.jwt);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <h1>Login</h1>
      <form onSubmit={handleLogin}>        
        <input type="email" placeholder="Email" value={identifier} onChange={(e) => setIdentifier(e.target.value)}></input>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Login</button>
      </form>
</>

  )
}

export default Login;