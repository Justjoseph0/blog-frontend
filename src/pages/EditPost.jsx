import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import BlogForm from "@/components/BlogForm";

const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({ title: "", content: "", image: null , tags: ""});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`posts/${slug}/`);
      setPost(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPost((prevPost) => ({
        ...prevPost,
        image: file,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true)
    const tagList = typeof post.tags === "string"
    ? post.tags.split(",").map(tag => tag.trim())
    : post.tags;



    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    tagList.forEach(tag => {
      formData.append("tags", tag);
  });

    if (selectedImage) {
      formData.append("post_image", selectedImage);
    }

    try {
      const response = await api.put(`posts/edit/${slug}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post updated successfully:", response.data);
      navigate(`/my-posts`);
    } catch (error) {
      console.error("Error updating post:", error);
    }finally{
      setIsSubmitting(false)
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
     <Toaster />
      <Navbar />
      <div className="md:w-2/4 mx-auto my-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Post</h1>
        <BlogForm
         onSubmit={handleSubmit}
        onChange={handleChange} 
        post={post} 
        currentImage={true} 
        onImageChange={handleImageChange} 
        buttonText={isSubmitting ? "Updating..." : "Update Post"}
        />
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
