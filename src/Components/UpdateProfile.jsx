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
  const [description, setDescription] = useState('');
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
  <form onSubmit={handleUpdateProfile} className="flex flex-col items-center bg-gray-200 justify-center">
  <div className="flex justify-center py-4">
  </div>

  <div className="grid grid-cols-1 mt-5 mx-7">
    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Name</label>
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-blue-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Input 1" />
  </div>

  <div className="grid grid-cols-1 mt-5 mx-7">
    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Email</label>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-blue-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"/>
    
  </div>

  <div className="grid grid-cols-1 mt-5 mx-7">
    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Description</label>
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-blue-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="ta description ici"/>
  </div>

  <div className='flex items-center justify-center md:gap-8 gap-4 pt-5 pb-5'>
    <button type="submit" className='w-auto bg-blue-500 hover:bg-blue-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Enregistrer</button>
  </div>
</form>
  ) : (
    <Navigate to="/login" />
  )}
</>

// {user ? (

//   <div>
//     <form onSubmit={handleUpdateProfile}>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//       <button type="submit">Enregistrer</button>
//     </form>
//   </div>
// ) : (
//   <Navigate to="/login" />
// )}
//   </>
)
}
export default UpdateProfile;