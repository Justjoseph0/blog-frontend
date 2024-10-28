import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect,useState } from 'react'
import Loading from '@/components/Loading'
import api, { imageUrl } from '@/api';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserDetail = () => {
    const { author } = useParams();
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState('')
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const res = await api.get(`/profile/${author}/`);
            const data = res.data.user_profile
            setProfile(data)
            setPosts(res.data.posts)

            
           
          } catch (error) {
            console.error("Error fetching profile:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProfile();
      }, []);
    
      if (loading) {
        return <Loading />;
      }


  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <div className="text-center">
            <img
              src={
                profile.profile_picture
                  ? `${imageUrl}${profile.profile_picture}`
                  : "/images/user.png"
              }
              alt={`${"profile.name"}'s avatar`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold mb-2 capitalize">{profile.first_name} {profile.last_name}</h1>
            <p className="text-gray-500">{profile.email}</p>
            <p className="text-gray-500">Joined on {new Date(profile.date_joined).toLocaleDateString()}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">About {profile.first_name}</h2>
            <p className="text-gray-700 capitalize">{profile.bio || "No bio available"}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Additional Info</h2>
            <p className="text-gray-700">
              Country: {profile.country || "Not provided"}
            </p>
            <p className="text-gray-700">
              Phone: {profile.phone_number || "Not provided"}
            </p>
            <p className="text-gray-700">
              Gender: {profile.gender || "Not provided"}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Social medias</h2>
            <div className="flex space-x-8">
            <a href={profile.instagram_url} target="_blank"  className="text-blue-500 hover:text-blue-600">
              <i className="fa-brands fa-instagram text-3xl text-red-400"></i>
              </a>
              <a href={profile.facebook_url || ""} target="_blank" className="text-blue-500 hover:text-blue-600">
              <i className="fa-brands fa-twitter text-3xl"></i>
              </a>
            </div>
          </div>
        </div>

       <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col h-full group"
              >
                <Link to={`/post/${post.slug}`} className="w-full">
                  <img
                    src={`${imageUrl}${post.post_image}`}
                    alt={post.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-xl font-semibold mb-4 truncate group-hover:text-blue-500"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-700 mb-6">
                      {post.content.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3">
              <p className="text-center">
                {profile.first_name} have no posts.
              </p>
            </div>
          )}
        </div>
       </div>
      </div>

      <Footer />
    </>
  );
};

export default UserDetail;
