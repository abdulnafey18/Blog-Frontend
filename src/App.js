// Import necessary modules and components
import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";
import ShowBlog from "./components/ShowBlog";
import EditBlog from "./components/EditBlog";
import client from "./client"; // Import the axios client

const App = () => {
  // State variables for managing the current view, selected blog post, and all blog posts
  const [currentView, setCurrentView] = useState("list"); // Tracks which view to display
  const [selectedBlog, setSelectedBlog] = useState(null); // Stores the currently selected blog post
  const [blogPosts, setBlogPosts] = useState([]); // List of all blog posts fetched from the backend

  // Fetch blog posts from the backend when the component mounts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await client.get("/blog_posts"); // Fetch data
        console.log("API Response:", response.data); // Log API response
        setBlogPosts(response.data); // Update state
        console.log("Full Blog Post List:", response.data); // Log blogPosts state
      } catch (error) {
        console.error("Error fetching blog posts:", error.message);
      }
    };
    fetchBlogPosts();
  }, []);

  // Show a specific blog post by updating the current view and selected blog post
  const handleShow = (blogPost) => {
    if (!blogPost || !blogPost.id) {
      console.error("Invalid blogPost data:", blogPost);
      return;
    }
    setSelectedBlog(blogPost);
    setCurrentView("show");
  };

  // Navigate to the "create new blog post" view
  const handleCreate = () => setCurrentView("new");

  // Navigate to the "edit blog post" view with the selected post
  const handleEdit = (blogPost) => {
    if (!blogPost || !blogPost.id) {
      console.error("Invalid blogPost data:", blogPost);
      return;
    }
    setSelectedBlog(blogPost);
    setCurrentView("edit");
  };

  // Delete a blog post by making an API call and updating the state
  const handleDelete = async (id) => {
    try {
      await client.delete(`/blog_posts/${id}`); // Use the client for API calls
      setBlogPosts(blogPosts.filter((post) => post.id !== id)); // Remove the deleted post from the state
      setCurrentView("list"); // Navigate back to the list view
    } catch (error) {
      console.error("Error deleting blog post:", error.message); // Log any errors
    }
  };

  // Save a new blog post by making an API call and adding it to the state
  const handleSaveNew = async (formData) => {
    try {
      console.log("Sending Form Data:", formData); // Log data being sent
      const response = await client.post("/blog_posts", {
        blog_post: formData,
      });
      console.log("Response from API:", response.data); // Log response
      setBlogPosts([...blogPosts, response.data]); // Append the new post
      setCurrentView("list"); // Navigate back to the list view
    } catch (error) {
      console.error("Error creating blog post:", error.response?.data || error.message); // Log errors
    }
  };

  // Update an existing blog post by making an API call and modifying the state
  const handleUpdate = async (formData) => {
    try {
      const response = await client.put(`/blog_posts/${selectedBlog.id}`, {
        blog_post: formData,
      }); // Use the client for API calls
      setBlogPosts(
        blogPosts.map((post) =>
          post.id === selectedBlog.id ? response.data : post
        )
      );
      setCurrentView("list"); // Navigate back to the list view
    } catch (error) {
      console.error("Error updating blog post:", error.message); // Log any errors
    }
  };

  // Render views based on `currentView`
  switch (currentView) {
    case "list":
      return (
        <BlogList
          blogPosts={blogPosts}
          onShow={handleShow}
          onCreate={handleCreate}
        />
      );

    case "new":
      return (
        <NewBlog
          onCreate={handleSaveNew}
          onBack={() => setCurrentView("list")}
        />
      );

    case "show":
      return (
        <ShowBlog
          blogPost={selectedBlog}
          onBack={() => setCurrentView("list")}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );

    case "edit":
      if (!selectedBlog) {
        console.error("No blog selected for editing.");
        setCurrentView("list"); // Fallback to list view if no blog is selected
        return null;
      }
      return (
        <EditBlog
          blogPost={selectedBlog}
          onUpdate={handleUpdate}
          onBack={() => setCurrentView("list")}
        />
      );

    default:
      console.error("Invalid view:", currentView); // Handle invalid views
      return null;
  }
};

export default App;