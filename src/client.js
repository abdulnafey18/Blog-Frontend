// Import necessary modules
import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

// Options for axios-case-converter
const options = {
    ignoreHeaders: true,
  };

// Define the base URL for API requests
const baseURL = "http://ec2-44-221-25-174.compute-1.amazonaws.com/";

// Create the axios client with middleware
const client = applyCaseMiddleware(
  axios.create({
    baseURL, // Use the base URL for all API requests
  }),
  options
);

// Export the configured axios client
export default client;