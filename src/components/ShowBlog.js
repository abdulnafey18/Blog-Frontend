// Import necessary React functionality
import React from "react";

// Define the ShowBlog component to display a single blog post
const ShowBlog = ({ blogPost, onBack, onEdit, onDelete }) => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          {/* Blog post title */}
          <h1 className="card-title text-center">{blogPost.title}</h1>

{/* Blog post details */}
<div className="card-text">
            <div>
              <strong>Content:</strong>
              <div
                style={{
                  whiteSpace: "pre-wrap", // Preserve line breaks in content
                }}
              >
                {blogPost.content}
              </div>
            </div>

            <div>
              <strong>Published:</strong> {blogPost.published ? "Yes" : "No"}
            </div>

            <div>
              <strong>Word Count:</strong> {blogPost.wordCount || "N/A"}
            </div>

            <div>
              <strong>Reading Time:</strong> {blogPost.readingTime || "N/A"}
            </div>

            <div>
              <strong>Published on:</strong>{" "}
              {blogPost.createdAt
                ? new Date(blogPost.createdAt).toLocaleString()
                : "N/A"}
            </div>

            <div>
              <strong>Last updated:</strong>{" "}
              {blogPost.updatedAt
                ? new Date(blogPost.updatedAt).toLocaleString()
                : "N/A"}
            </div>
          </div>

          {/* Action buttons */}
          <div className="text-center mt-4">
            <button
              className="btn btn-warning mx-2"
              onClick={() => onEdit(blogPost)} // Trigger edit callback
            >
              Edit
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={onBack} // Trigger back navigation callback
            >
              Back to Blog Posts
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => onDelete(blogPost.id)} // Trigger delete callback
            >
              Destroy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the ShowBlog component as the default export
export default ShowBlog;