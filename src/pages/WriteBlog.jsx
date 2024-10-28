import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import CheckProfile from "@/components/CheckProfile";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import BlogForm from "@/components/BlogForm";

const WriteBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createPost = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      setIsSubmitting(false);
      return; 
    }
    setIsSubmitting(true);

    const tagList = formData.tags.split(",").map((tag) => tag.trim());

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);

    tagList.forEach((tag) => {
      data.append("tags", tag);
    });

    
      data.append("post_image", image);
  

    try {
      const res = await api.post("/create_post/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData.content) {
          toast.error(errorData.content);
        }
        if (errorData.title) {
          toast.error(`title: ${errorData.title}`);
        }
        if (errorData.post_image) {
          toast.error(errorData.post_image[0]);
          console.error(errorData.post_image[0]);
        }
      } else {
        toast.error(error.message || "Error Creating Post.");
      }
    }finally{
        setIsSubmitting(false)
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <CheckProfile message="You need to complete your profile before creating a blog post.">
        <div className="md:w-3/6 w-full mx-auto mt-10 bg-white p-8 rounded-lg ">
          <h2 className="md:text-3xl text-2xl font-bold text-gray-800 mb-6 text-center">
            New Blog Post
          </h2>
          <BlogForm
            post={formData}
            onSubmit={createPost}
            onImageChange={handleImageChange}
            onChange={handleInputChange}
            buttonText={isSubmitting ? "Publishing..." : "Publish Post"}
            
            
          />
        </div>

        <Footer />
      </CheckProfile>
    </>
  );
};

export default WriteBlog;
