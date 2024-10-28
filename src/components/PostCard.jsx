import React from 'react'
import { imageUrl } from "@/api";
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {
   const image = `${imageUrl}${post.post_image}` 

   const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

 
  
  return (
    <Link to={`/post/${post.slug}`} className="max-w-sm rounded-md overflow-hidden shadow-xl bg-white mx-4 group block">
    <img
      className="w-full h-48 object-cover"
      src={image}
      alt={post.title}
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-500">
        {post.title}
      </h3>
      <p className="text-gray-600 text-sm truncate">
       {post.content}
      </p>
      <div className="mt-4 flex items-center text-gray-500 text-sm">
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0v4M12 6.5v1.5M6 4h.01M18 4h.01M6 20h12"></path>
        </svg>
        <span>{timeAgo(post.created_at)}</span>
      </div>
    </div>
  </Link>
  )
}

export default PostCard