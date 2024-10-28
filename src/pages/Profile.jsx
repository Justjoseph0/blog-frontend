import Navbar from '@/components/Navbar';
import React from 'react';
import { useEffect,useState } from 'react'
import api, { apiUrl } from '@/api';
import { Link } from 'react-router-dom'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState('')
    const [posts, setPosts] = useState([])
    const [profile, setProfile] = useState([])


   
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

      
    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const res = await api.get("/dashboard/");
            const data = res.data.profile
            setProfile(data)
            setPosts(res.data.posts)
            
            // console.log(res.data);
            
           
    
            const imageUrl = data.profile_picture
              ? `${apiUrl}${data.profile_picture}`
              : "http://bootdey.com/img/Content/avatar/avatar1.png";
            setImage(imageUrl);
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
        <div className="min-h-screen bg-gray-100 p-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <img
                src={image}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full border-green-600 border-2 object-contain"
              />
              {/* Profile Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                  {profile.first_name} {profile.last_name}
                </h2>
                <p className="text-gray-600">{}</p>
                <div className="mt-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Link to="/profile">Edit Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* First Name */}
              <div>
                <label className="block text-gray-600">First Name</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {profile.first_name}
                </p>
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-gray-600">Last Name</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {profile.last_name}
                </p>
              </div>
              {/* Gender */}
              <div>
                <label className="block text-gray-600">Gender</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {profile.gender}
                </p>
              </div>
              {/* Birthday */}
              <div>
                <label className="block text-gray-600">Birthday</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {formatDate(profile.birthday)}
                </p>
              </div>
              {/* Location */}
              <div>
                <label className="block text-gray-600">Country</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {profile.country}
                </p>
              </div>
              {/* city */}
              <div>
                <label className="block text-gray-600">City</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {profile.city}
                </p>
              </div>
              {/* street */}
              <div>
                <label className="block text-gray-600">Street address</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {profile.street_address}
                </p>
              </div>
              {/* phone */}
              <div>
                <label className="block text-gray-600">Phone number</label>
                <p className="mt-1 text-gray-800 font-semibold capitalize">
                  {profile.phone_number}
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
            <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
            <p className="mt-4 text-gray-600">{profile.bio}</p>
          </div>

          {/* Blog Posts */}
          {posts.length > 0 && (
         <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
         <h3 className="text-xl font-semibold text-gray-800">
           Recent Blog Posts
         </h3>
         <div className="mt-4">
           {posts.map((post) => {
             const formattedPostDate = formatDate(post.created_at); 
       
             return (
               <Link to={`/post/${post.slug}`}  key={post.id}>
                 <div className="border-b border-gray-200 py-4">
                   <h4 className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                     {post.title}
                   </h4>
                   <p className="text-gray-600">Posted on {formattedPostDate}</p> 
                 </div>
               </Link>
             );
           })}
         </div>
       </div>
       
          )}

          {/* Social Media Links */}
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Social Medias</h3>
            <div className="flex space-x-8 mt-4">
              <a href={profile.instagram_url} target="_blank"  className="text-blue-500 hover:text-blue-600">
              <i className="fa-brands fa-instagram text-3xl text-red-400"></i>
              </a>
              <a href={profile.facebook_url} target="_blank" className="text-blue-500 hover:text-blue-600">
              <i className="fa-brands fa-twitter text-3xl"></i>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default Profile;
