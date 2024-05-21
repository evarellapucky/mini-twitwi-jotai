import { userAtom, tokenAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UpdateProfile from "../../Components/UpdateProfile";
import { Link } from "react-router-dom";



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
      const sortedPosts = response.data.data.sort((a, b) => {
        return new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt);
      });
      setPosts(sortedPosts);
      console.log('fdsfdshbgjfgdsqkfjhdsqjk')
      console.log(response)
    } catch (error) {
      console.error(error)
      }
      }
      displayPosts()
    }, [token])

    const dateFormat = (d) => {
      const date = new Date(d);
      return date.toLocaleString();
    };

    const userPosts = posts.filter(post => post.attributes.author.data.id === user.id);
    console.log(userPosts)

  
return (
    <>
      {!user ? (
        <p>LOADING..</p>
      ) : (
        <div className="flex flex-col items-center justify-center p-5 border rounded text-center text-gray-500 max-w-3xl mx-auto">
          <div className="mb-5">
            <div className="heading font-bold text-3xl m-5 tracking-tight text-gray-900 sm:text-4xl">Mon profil</div>
            <img className="w-32 h-32 rounded-full mx-auto" src="https://www.journee-mondiale.com/medias/grande/images/journee/chat-noir.jpg" alt="" />
            <div className="text-sm mt-5">
              <div className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
                {user.username}
              </div>
              <p>{user.email}</p>
            </div>
            <p className="mt-2 text-sm text-gray-900">{user.description}</p>
            <div className="flex mt-4 justify-center">
              <a href="#" className="w-6 mx-1">
                <svg className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600" width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
                  <path id="Twitter" d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627 5.373,-12 12,-12c6.627,0 12,5.373 12,12Zm-6.465,-3.192c-0.379,0.168 -0.786,0.281 -1.213,0.333c0.436,-0.262 0.771,-0.676 0.929,-1.169c-0.408,0.242 -0.86,0.418 -1.341,0.513c-0.385,-0.411 -0.934,-0.667 -1.541,-0.667c-1.167,0 -2.112,0.945 -2.112,2.111c0,0.166 0.018,0.327 0.054,0.482c-1.754,-0.088 -3.31,-0.929 -4.352,-2.206c-0.181,0.311 -0.286,0.674 -0.286,1.061c0,0.733 0.373,1.379 0.94,1.757c-0.346,-0.01 -0.672,-0.106 -0.956,-0.264c-0.001,0.009 -0.001,0.018 -0.001,0.027c0,1.023 0.728,1.877 1.694,2.07c-0.177,0.049 -0.364,0.075 -0.556,0.075c-0.137,0 -0.269,-0.014 -0.397,-0.038c0.268,0.838 1.048,1.449 1.972,1.466c-0.723,0.566 -1.633,0.904 -2.622,0.904c-0.171,0 -0.339,-0.01 -0.504,-0.03c0.934,0.599 2.044,0.949 3.237,0.949c3.883,0 6.007,-3.217 6.007,-6.008c0,-0.091 -0.002,-0.183 -0.006,-0.273c0.413,-0.298 0.771,-0.67 1.054,-1.093Z"></path>
                </svg>
              </a>
            </div>
          </div>
  
          <div className="mb-5">
            
            <div className="heading font-bold text-3xl m-5 tracking-tight text-gray-900 sm:text-4xl">Mise à jour du profil</div>
            {user.id === actualUser.id ? <UpdateProfile /> : "tu ne peux mettre à jour que ton propre  profil"}
          </div>
  
          <div className="mb-5">
            <div className="heading font-bold text-3xl m-5 tracking-tight text-gray-900 sm:text-4xl">Publications</div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {userPosts.map((post) => (
                <article className="flex max-w-xl flex-col items-start p-3 justify-between border-solid border border-grey rounded-md" key={post.id}>
                  <div className="relative mb-2 flex items-center gap-x-4">
                    <img src="https://www.journee-mondiale.com/medias/grande/images/journee/chat-noir.jpg" alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0"></span>
                        <Link to={`/users/${post.attributes.author.data.id}`} className="authorPost">{post.attributes.author.data.attributes.username}</Link>
                      </p>
                    </div>
                  </div>
                  <div className="post mb-3">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime="2020-03-16" className="text-gray-500">{dateFormat(post.attributes.createdAt)}</time>
                    </div>
                    <div className="group relative">
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.attributes.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  
  );
}
export default Profile;