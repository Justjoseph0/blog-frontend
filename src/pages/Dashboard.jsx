import CheckProfile from "@/components/CheckProfile";
import Navbar from "@/components/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import CardCarousel from "@/components/CardCarousel";
import api, { imageUrl } from "@/api";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/dashboard/");
        const data = res.data.profile;
        const postData = res.data.posts;
        setPosts(postData);

        setProfile(data);
        // console.log(res.data);

        const getImage = data.profile_picture
          ? `${imageUrl}${data.profile_picture}`
          : "http://bootdey.com/img/Content/avatar/avatar1.png";
        setImage(getImage);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <CheckProfile message="You need to complete your profile before accessing the dasboard.">
        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto p-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg md:p-6 p-4 space-y-4 mb-6 md:flex items-center space-x-4">
              {/* Profile Picture */}
              <img
                src={image}
                alt="user profile"
                className="w-24 h-24 rounded-full border-green-600 border-2 object-contain"
              />

              {/* User Info */}
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold capitalize">
                  {profile.first_name} {profile.last_name}
                </h2>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600">
                  Joined: {formatDate(profile.date_joined)}
                </p>
              </div>

              {/* Edit Profile Button */}
              <div>
                <Link
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
                  to={"/view-profile"}
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* User Stats/Activity Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Posts */}
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Posts</h3>
                {posts.length > 0 ? (
                  <>
                    <p className="text-gray-600">
                      You have published {posts.length} posts.
                    </p>
                    <a
                      href="/my-posts"
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded inline-block"
                    >
                      View Posts
                    </a>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">You have published 0 posts.</p>
                    <Link
                      to="/write"
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded inline-block"
                    >
                      Click here to create post
                    </Link>
                  </>
                )}
              </div>

              {/* Card 2: Followers */}
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Followers</h3>
                <p className="text-gray-600">You have x followers.</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                  View Followers
                </button>
              </div>

              {/* Card 3: Comments */}
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                <p className="text-gray-600">Your posts have X comments.</p>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                  View Comments
                </button>
              </div>
            </div>

            {/* Recent Posts Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
              {/* Post Card */}
              {posts.length > 1 ? (
                <CardCarousel posts={posts} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <Link
                        to={`/post/${post.slug}`}
                        key={post.id}
                        className="max-w-sm rounded-md overflow-hidden shadow-xl bg-white mx-4 group block"
                      >
                        <img
                          className="w-full h-48 object-cover"
                          src={`${imageUrl}${post.post_image}`}
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
                    ))
                  ) : (
                    <div className="col-span-3">
                      <p className="text-center">You have no posts.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </CheckProfile>
    </div>
  );
};

export default Dashboard;
