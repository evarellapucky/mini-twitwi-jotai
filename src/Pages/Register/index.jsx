import { useState } from 'react';
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../../atoms/atoms";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
          username,
          email,
          password
        });
        console.log("Register succeed")
       setUser(response.data.user)
       setToken(response.data.jwt)
       redirect("/")
    } catch (error){
      console.error(error);
    }
  };
  
  return (
    <>
    <h1>Register</h1>
  
    <form onSubmit={handleRegister}>
      <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} ></input>
      <input type ='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button type='submit'>Register</button>
    </form>
    </>
  )
}

export default Register;