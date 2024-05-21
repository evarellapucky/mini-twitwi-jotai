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
      {user ? (
        !posts ? (
          <p>LOADING...</p>
        ) : (
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Check the last posts !</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">THIS IS NOT A GOSSIP PROJECT !</p>
              </div>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
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
                    <button type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                      </svg>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )
      ) : null}
    </>
    );
    
}

export default AllPosts