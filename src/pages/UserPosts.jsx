import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { imageUrl } from "@/api";
import Loading from "@/components/Loading";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";

const UserPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/dashboard/");
        const data = res.data.posts;
        // console.log(data);
        
        setPosts(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);



  const handleDelete = async () => {
    console.log("Deleting post:", selectedPost);
    try {
      await api.delete(`/posts/delete/${selectedPost.slug}/`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.slug !== selectedPost.slug)
      );
      
     
      
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div
        className={
          posts.length > 0
            ? "container mx-auto my-8"
            : "container mx-auto my-8 h-[70vh]"
        }
      >
        {posts.length > 0 && (
          <h1 className="md:text-5xl text-3xl font-bold mb-6 text-center">Your Posts</h1>
        )}

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

                  <div className="flex space-x-4">
                    <Link to={`/edit-post/${post.slug}`}>
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => {
                        setShowDialog(!showDialog);
                        setSelectedPost(post);
                      }}
                      className="bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </Button>
                    <ConfirmationDialog
                      open={showDialog}
                      onOpenChange={setShowDialog}
                      title="Confirm Deletion"
                      description="Are you sure you want to delete this Post? This action cannot be undone."
                      confirmText="Delete"
                      cancelText="Cancel"
                      onConfirm={handleDelete}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3">
              <p className="text-center">
                You have no posts.{" "}
                <Link to="/write" className="text-blue-500 underline">
                  Click here to create a post
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserPosts;
