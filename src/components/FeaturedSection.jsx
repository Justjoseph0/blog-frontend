import { Link } from "react-router-dom";
import FeaturedPostSkeleton from "./FeaturedPostSkeleton";
import React, { useEffect, useState } from "react";
import api, { imageUrl,apiUrl } from "@/api";
import CardCarousel from "./CardCarousel";
import CardSkelenton from "./CardSkelenton";

const FeaturedSection = () => {
  const [posts, setPosts] = useState([]);
  const [entaintainmentPost, setEntertainmentPost] = useState([]);
  const [loading, setLoading] = useState();

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("posts/");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };


  

  const getEntertainmentPost = async () => {
    setLoading(true);
    try {
      const res = await api.get("posts/?tag=entertainment");
      setEntertainmentPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    getPosts();
    getEntertainmentPost();
  }, []);

  function truncateTitle(title, maxWords) {
    const words = title.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return title;
  }

  return (
    <section className="max-w-7xl mx-auto py-10 md:px-4">
      {loading ? (
        <FeaturedPostSkeleton />
      ) : (
        <div className="flex flex-col md:flex-row justify-between gap-1">
          {/* Main Feature Post */}

          {posts.slice(0, 1).map((post) => {
            const formattedDate = new Date(post.created_at).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            );

            return (
              <Link
                to={`/post/${post.slug}`}
                key={post.id}
                className="w-full md:w-1/2 relative overflow-hidden group h-96"
              >
                <img
                  src={`${imageUrl}${post.post_image}`}
                  alt={post.title}
                  className="w-full h-full object-fill transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4 md:p-6 transition duration-300 ease-in-out group-hover:bg-opacity-80">
                  <div className="flex flex-wrap mb-2">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-xs capitalize px-2 py-1 mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="md:text-2xl text-xl leading-6 font-semibold mt-2 group-hover:text-yellow-300 transition-colors">
                    {truncateTitle(post.title, 5)}
                  </h2>
                  <p className="mt-2 text-sm">
                    {post.author} - <span>{formattedDate}</span>
                  </p>
                </div>
              </Link>
            );
          })}

          {/* Side Posts */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-1 h-96">
            {posts.slice(1, 5).map((post) => (
              <Link
                to={`/post/${post.slug}`}
                key={post.id}
                className="relative h-full overflow-hidden group"
              >
                <img
                  src={`${imageUrl}${post.post_image}`}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-fill transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 transition duration-300 ease-in-out group-hover:bg-opacity-80">
                  <div className="flex flex-wrap mb-2">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-xs capitalize px-2 py-1 mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-medium md:font-semibold mt-2 group-hover:text-yellow-300 transition-colors">
                    {truncateTitle(post.title, 8)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Trending Blog Categories Section */}
      <section className="mt-16">
        <h1 className="md:text-3xl text-xl font-semibold mb-8 md:px-0 px-4">
          Trending Blog Categories
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          <Link
            to={"/sport"}
            className="relative rounded-md overflow-hidden w-full md:w-1/3 flex flex-col h-full"
          >
            <img
              src="/images/basketball.jpg"
              alt="Sport Blog"
              className="w-full h-72 object-cover" 
            />
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <h3 className="text-lg font-semibold">Sport</h3>
              <p className="mt-1 text-sm">Sport Blog</p>
            </div>
          </Link>

          <Link
            to={"/science"}
            className="relative rounded-md overflow-hidden w-full md:w-1/3 flex flex-col h-full"
          >
            <img
              src="/images/science.jpg"
              alt="Science Blog"
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <h3 className="text-lg font-semibold">Science</h3>
              <p className="mt-1 text-sm">Science Blog</p>
            </div>
          </Link>

          <Link
            to={"/entertainment"}
            className="relative rounded-md overflow-hidden w-full md:w-1/3 flex flex-col h-full"
          >
            <img
              src="/images/entertainment.jpg"
              alt="Entertainment Blog"
              className="w-full h-72 object-cover" 
            />
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <h3 className="text-lg font-semibold">Entertainment</h3>
              <p className="mt-1 text-sm">Entertainment Blog</p>
            </div>
          </Link>
        </div>
      </section>

      {/* popular Blog post Section */}
      <section className="mt-10">
        <h1 className="md:text-5xl text-3xl font-semibold md:px-0 px-4">
          Popular Topics.
        </h1>
        <p className="text-xs md:text-xl mb-4 md:font-medium md:px-0 px-4">
          Trending and popular topics for you to engage in. Dive in and enjoy
          the momen
        </p>
        {loading ? <CardSkelenton /> : <CardCarousel posts={posts} />}
      </section>

      {/* Latest Blog post Section */}
      <section className="mt-10">
        <h1 className="md:text-5xl text-3xl font-semibold md:px-0 px-4 mb-4">
          Latest Posts
        </h1>
        {loading ? <CardSkelenton /> : <CardCarousel posts={posts} />}
      </section>

      {/* entaintainment Blog post Section */}
      <section className="mt-10">
        <h1 className="md:text-5xl text-3xl font-semibold md:px-0 px-4 mb-4">
          Entaintainment
        </h1>
        <p className="text-xs md:text-xl mb-4 md:font-medium md:px-0 px-4">
          Trending and popular topics on entertainment for you to engage in.
          Dive in and enjoy the moment.
        </p>
        {loading ? (
          <CardSkelenton />
        ) : (
          <CardCarousel posts={entaintainmentPost} />
        )}
      </section>
    </section>
  );
};

export default FeaturedSection;
