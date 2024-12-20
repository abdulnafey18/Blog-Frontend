// Import necessary React functionality
import React from "react";

// Define the BlogPost component, which displays details of a single blog post
const BlogPost = ({ blogPost, onShow }) => {
  return (
    // Card container for a single blog post
    <div
      className="card mb-4 p-4" // Styling classes for spacing and padding
      id={`blog_post_${blogPost.id}`} // Unique ID for the blog post element
      style={{ width: "25rem", height: "auto" }} // Inline styling for card size
    >
      {/* Card body containing the blog post details */}
      <div className="card-body d-flex flex-column">
        {/* Display the blog post title */}
        <h5 className="card-title">{blogPost.title}</h5>

        {/* Display blog post summary */}
        <p className="card-text"><strong>Summary:</strong> {blogPost.summary}</p>

        {/* Display blog post category, fallback to "Uncategorized" if none */}
        <p><strong>Category:</strong> {blogPost.category || "Uncategorized"}</p>

        {/* Display whether the blog post is published */}
        <p><strong>Published:</strong> {blogPost.published ? "Yes" : "No"}</p>

        {/* Display the word count of the blog post */}
        <p><strong>Word Count:</strong> {blogPost.wordCount || "N/A"}</p>

        {/* Display the estimated reading time */}

        <p><strong>Reading Time:</strong> {blogPost.readingTime || "N/A"}</p>

        {/* Display the blog post creation date in a user-friendly format */}
        <p><strong>Created At:</strong> {new Date(blogPost.createdAt).toLocaleString()}</p>

        {/* Display the blog post last updated date in a user-friendly format */}
        <p><strong>Updated At:</strong> {new Date(blogPost.updatedAt).toLocaleString()}</p>

        {/* Button to trigger the "Show" action for this blog post */}
        <div className="mt-auto"> {/* Ensures the button aligns at the bottom */}
          <button className="btn btn-primary" onClick={() => onShow(blogPost)}>
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the BlogPost component as the default export
export default BlogPost;