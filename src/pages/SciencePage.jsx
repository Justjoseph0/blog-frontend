import React from 'react'
import api from "@/api";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import PostCard from '@/components/PostCard';


const SciencePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState();
  
    const getPosts = async () => {
      setLoading(true);
      try {
        const res = await api.get("posts/?tag=science");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    
  
  
  
    useEffect(() => {
      getPosts();
    }, []);
  
    if (loading) {
      return <Loading />;
    }

  return (
   
    <>
      <Navbar />
      <div className='container mx-auto '>
        <h1 className="text-6xl text-center my-8 font-semibold">Science</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}


export default SciencePage