// Import necessary React functionality
import React, { useState } from "react";

// Define the EditBlog component for editing a blog post
const EditBlog = ({ blogPost, onUpdate, onBack }) => {
  // Initialize form state with existing blog post data or defaults
  const [formData, setFormData] = useState({
    title: blogPost.title || "", // Default to an empty string if no title exists
    content: blogPost.content || "", // Default to an empty string if no content exists
    published: blogPost.published || false, // Default to false if not explicitly published
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Destructure event target properties
    setFormData({
      ...formData, // Preserve other form data
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes separately
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onUpdate(formData); // Call the onUpdate function with updated form data
  };

  return (
    // Container for the edit form
    <div className="container">
      <h1 className="text-center my-4">Edit Blog Post</h1> {/* Page title */}
      <form onSubmit={handleSubmit} className="needs-validation">
        {/* Title input field */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title} // Bind input value to form state
            onChange={handleChange} // Update form state on change
            required // Mark field as required
          />
        </div>
        {/* Content text area */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            value={formData.content} // Bind input value to form state
            onChange={handleChange} // Update form state on change
            required // Mark field as required
          ></textarea>
        </div>
        {/* Published checkbox */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="form-check-input"
            checked={formData.published} // Bind checkbox state to form state
            onChange={handleChange} // Update form state on change
          />
          <label htmlFor="published" className="form-check-label">
            Published
          </label>
        </div>
        {/* Action buttons */}
        <div className="text-center">
          <button type="submit" className="btn btn-success mx-2">
            Save Changes {/* Button to save changes */}
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={(e) => {
              e.preventDefault(); // Prevent default button behavior
              onBack(); // Call the onBack function to navigate back
            }}
          >
            Back to Blog Posts
          </button>
        </div>
      </form>
    </div>
  );
};

// Export the EditBlog component as the default export
export default EditBlog;