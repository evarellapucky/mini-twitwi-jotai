import { userAtom, tokenAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function UpdateProfile() {

  const [user, setUser] = useAtom(userAtom);
  console.log(user) 
  const [token] = useAtom(tokenAtom);
  const [username, setUsername] = useState(user ? user.username : '');
  const [description, setDescription] = useState(user === true && user.description !== null ? user.description : 'No description');
  const [email, setEmail] = useState(user ? user.email : '' );

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:1337/api/users-permissions/users/me', {
        username,
        description,
        email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data)
    } catch (error) {
      console.error(error)
    }
  }

return (
  <>
    {user ? (
      <div>
        <h1> Modifier le profil</h1>
        <form onSubmit={handleUpdateProfile}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    ) : (
      <Navigate to="/login" />
    )}
  </>
);
}
export default UpdateProfile;