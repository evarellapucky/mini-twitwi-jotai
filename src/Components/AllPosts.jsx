import axios from "axios";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../atoms/atoms";
import { postsAtom } from "../atoms/atoms";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [atomPost] = useAtom(postsAtom)
  console.log(posts)
  const [token] = useAtom(tokenAtom);
  const [user] = useAtom(userAtom);
  
useEffect(() =>  {
  const displayPosts = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/posts?populate=author', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      const sortedPosts = response.data.data.sort((a, b) => {
        return new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt);
      });
      setPosts(sortedPosts);
      console.log(response)
    } catch (error) {
      console.error(error)
      }
      }
      displayPosts()
    }, [token, atomPost])

    const dateFormat = (d) => {
      const date = new Date(d);
      return date.toLocaleString();
    };

    return (
      <>
      { !posts ? 
        <p>LOADING...</p> :
        <div>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h3><Link to={`/users/${post.attributes.author.data.id}`} className="authorPost">{post.attributes.author.data.attributes.username}</Link></h3>
            <div className="post-time">{dateFormat(post.attributes.createdAt)}</div>
            <div className="contentPost">{post.attributes.text}</div>
            <button className="likePost">LIKE ME</button>
          </div>
          
        ))}
        </div>
      }
    
      </>
    );
}

export default AllPosts
