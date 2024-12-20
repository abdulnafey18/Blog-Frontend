import { useState } from "react";

const NewBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData); // Debug log
  try {
    const response = await fetch(
      "http://ec2-44-221-25-174.compute-1.amazonaws.com/blog_posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blog_post: formData }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create blog post: ${errorMessage}`);
    }

    console.log("Blog post created successfully"); // Debug log
  } catch (error) {
    console.error("Error creating blog post:", error);
  }
  window.location.href = "/";
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="form-check-input"
            checked={formData.published}
            onChange={handleChange}
          />
          <label htmlFor="published" className="form-check-label">Published</label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success mx-2">Save</button>
        </div>
      </form>
    </div>
  );
};

export default NewBlog;