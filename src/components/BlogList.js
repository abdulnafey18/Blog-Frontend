// Import necessary React functionality and the BlogPost component
import React, { useState } from "react";
import BlogPost from "./BlogPost";

// Define the BlogList component which displays a list of blog posts
const BlogList = ({ blogPosts, onCreate, onShow }) => {
  // State for filtering blog posts by category
  const [filter, setFilter] = useState("");

  // Filter blog posts based on the entered filter value
  const filteredPosts = filter
    ? blogPosts.filter((post) =>
        post.category?.toLowerCase().includes(filter.toLowerCase())
      )
    : blogPosts;

  return (
    <div className="container">
      {/* Header for the blog posts list */}
      <h1 className="text-center my-4">Blog Posts</h1>

      {/* Input for filtering blog posts by category */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by category..."
          value={filter} // Controlled input for the filter value
          onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
        />
      </div>

      {/* Display the filtered blog posts */}
      <div className="row">
        {filteredPosts.map((blogPost) => (
          <div className="col-md-4 d-flex align-items-stretch mb-4" key={blogPost.id}>
            {/* Render each blog post using the BlogPost component */}
            <BlogPost blogPost={blogPost} onShow={onShow} />
          </div>
        ))}
      </div>

      {/* Button to create a new blog post */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={onCreate}>
          New Blog Post
        </button>
      </div>
    </div>
  );
};

// Export the BlogList component as the default export
export default BlogList;