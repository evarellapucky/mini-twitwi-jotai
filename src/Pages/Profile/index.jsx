import { userAtom, tokenAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UpdateProfile from "../../Components/UpdateProfile";



function Profile() {
  const { id } = useParams();
  console.log(id)
  const [actualUser] = useAtom(userAtom);
  const [user, setUser] = useState('');
  const [token] = useAtom(tokenAtom)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProfile();
  }, [id, token])

  
return (
  
  <>
  {!user ? <p>LOADING..</p> : 
<div>
    <p>Coucou Profil</p>
    <p>{user.username}</p>
    <p>{user.email}</p>
    <p>{user.description}</p>

{ user.id === actualUser.id ? <UpdateProfile /> : ""}
</div>
  }
  
  </>
  );
}
export default Profile;