import api, { imageUrl } from "@/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import Notfound from "./Notfound";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { ACCESS_TOKEN } from "@/constants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const [postComment, setPostComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isComment, setIsComment] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchCurrentUser();
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

  const fetchComments = async () => {
    try {
      const res = await api.get(`posts/get_comments/${slug}/`);
      setPostComment(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", newComment);

    try {
      const res = await api.post(`posts/comments/${slug}/`, formData);
      setPostComment((prevComment) => [...prevComment, res.data]);
      setIsComment(true);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("auth/user/");
      setCurrentUserId(res.data.id);
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await api.delete(`comment/delete/${selectedComment.id}/`);
      setPostComment(
        postComment.filter((comment) => comment.id !== selectedComment.id)
      );
      setShowDialog(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthorized(true);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!post) {
    return <Notfound />;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Post Header */}
        <header className="mb-6">
          <div className="mb-6">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white text-lg font-medium capitalize px-4 py-2 mr-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4 capitalize">{post.title}</h1>
          <div className="text-sm text-gray-500">
            <div>
             <Link to={`/user/${post.author}`}  className="flex items-center gap-4 mb-3">
             <img
                src={post.author_pics ? post.author_pics : "/images/user.png"}
                className="w-12 h-12 rounded-full object-cover"
                alt="User Profile"
              />
                <span className="font-medium text-gray-700 text-xl capitalize">
                  {post.author}
                </span>
             </Link>
            </div>
            <p className="mb-4">
              Published on{" "}
              <span className="font-medium">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>
        </header>

        <div className="mb-8">
          <img
            src={`${imageUrl}${post.post_image}`}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* Post Content */}
        <article className="prose max-w-none mb-8">
          <p>{post.content}</p>
        </article>

        {/* Post Footer */}
        <footer className="text-gray-700 border-t border-gray-200 pt-4">
          <p className="text-sm">
            This post was written by{" "}
            <span className="font-medium text-gray-800">{post.author}</span>.
          </p>
        </footer>

        <div className="space-y-6 mt-8">
          {isAuthorized ? (
            <Button
              onClick={() => setIsComment(!isComment)}
              className="flex items-center"
            >
              <i className="fa-regular fa-comment mr-1"></i>
              <span>Comment</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="flex items-center"
            >
              <i className="fa-regular fa-comment mr-1"></i>
              <span>Log in to comment</span>
            </Button>
          )}
          {/* Comment List */}
          {postComment.length > 0 ? (
            postComment.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-200 p-4 rounded-lg"
              >
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {comment.author} -{" "}
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                  <p>{comment.text}</p>
                </div>
                {comment.author_id === currentUserId && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        setShowDialog(!showDialog);
                        setSelectedComment(comment);
                      }}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </Button>

                    <ConfirmationDialog
                      open={showDialog}
                      onOpenChange={setShowDialog}
                      title="Confirm Deletion"
                      description="Are you sure you want to delete this comment? This action cannot be undone."
                      confirmText="Delete"
                      cancelText="Cancel"
                      onConfirm={handleDeleteComment}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}

          {/* Comment Form */}
          <div className="mt-8">
            {isComment ? null : (
              <form onSubmit={handleComment}>
                <div className="mb-4">
                  <Textarea
                    id="content"
                    name="text"
                    rows="4"
                    className="mt-1 block border w-full rounded-md border-gray-300 shadow-sm"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    placeholder="write your comments"
                  ></Textarea>
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Submit
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostDetail;
