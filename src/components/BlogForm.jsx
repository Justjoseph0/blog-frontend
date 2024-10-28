import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { imageUrl } from "@/api";

const BlogForm = ({
  onSubmit,
  onChange,
  post,
  onImageChange,
  buttonText = "",
  currentImage
}) => {
  return (
    <form
      encType="multipart/form-data"
      className="space-y-6"
      onSubmit={onSubmit}
    >
      {/* Post Title */}
      <div>
        <Label
          htmlFor="title"
          className="block text-lg font-medium text-gray-700 mb-1"
        >
          Title
        </Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter the post title"
          value={post.title}
          onChange={onChange}
          required
        />
      </div>

      {/* Post Body */}
      <div>
        <Label
          htmlFor="content"
          className="block text-lg font-medium text-gray-700 mb-1"
        >
          Content
        </Label>
        <Textarea
          rows="9"
          name="content"
          id="content"
          placeholder="Write your post..."
          value={post.content}
          onChange={onChange}
          required
        />
      </div>
      
     {
        currentImage &&   <div className="mb-4">
        <label className="block text-gray-700">Current Image:</label>
        <img
          src={`${imageUrl}${post.post_image}`}
          alt="Current"
          className="w-full h-44 mb-2 rounded"
        />
      </div>
     }
      {/* Upload Image */}
      <div>
        <Label
          htmlFor="post_images"
          className="block text-lg font-medium text-gray-700 mb-1"
        >
          Upload Image
        </Label>
        <Input
          type="file"
          name="post_images"
          id="post_images"
          onChange={onImageChange}
        />
      </div>

      {/* Tags */}
      <div>
        <Label
          htmlFor="tags"
          className="block text-lg font-medium text-gray-700 mb-1"
        >
          Tags
        </Label>
        <Input
          type="text"
          name="tags"
          id="tags"
          value={post.tags}
          onChange={onChange}
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Please separate tags with commas (e.g., python, django, crime).
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
