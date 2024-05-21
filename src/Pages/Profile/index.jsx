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



  const [posts, setPosts] = useState([])
  console.log(posts)
  
useEffect(() =>  {
  const displayPosts = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/posts?populate=author', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      setPosts(response.data.data);
      console.log('fdsfdshbgjfgdsqkfjhdsqjk')
      console.log(response)
    } catch (error) {
      console.error(error)
      }
      }
      displayPosts()
    }, [token])

    const userPosts = posts.filter(post => post.attributes.author.data.id === user.id);
    console.log(userPosts)

  
return (
  
  <>
  {!user ? <p>LOADING..</p> : 
<div>
    <p>Coucou Profil</p>
    <p>{user.username}</p>
    <p>{user.email}</p>
    <p>{user.description}</p>

{ user.id === actualUser.id ? <UpdateProfile /> : ""}
<div className="all-posts">
<h1>ALL POSTS OF THE USER</h1>
{userPosts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-time">{post.attributes.createdAt}</div>
            <div className="contentPost">{post.attributes.text}</div>
            <button className="likePost">LIKE ME</button>
          </div>
          
        ))}
</div>
</div>
  }
  
  </>
  );
}
export default Profile;