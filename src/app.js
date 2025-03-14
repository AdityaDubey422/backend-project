import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// 🌍 Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend to communicate with backend (if they are on different domain)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true, // allow cookies
    })
);

// 📝 Middleware to parse incoming JSON data (API requests)
// - Used when the client sends JSON data in the request body (Content-Type: application/json)
// - Example: { "name": "John", "age": 25 }
// - Without this, req.body will be undefined for JSON requests
app.use(
    express.json({
        limit: "16kb",
    })
);

// 🔗 Middleware to parse URL-encoded form data
// - Used when the client submits an HTML form (Content-Type: application/x-www-form-urlencoded)
// - Example: name=John&age=25 (sent from a traditional HTML form)
// - Converts form data into a JavaScript object: { name: "John", age: "25" }
// - `extended: true` allows parsing of nested objects (e.g., { user: { name: "John" } })
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

// 📂 Serve static files from the "public" directory
// This allows access to images, CSS, JavaScript files, etc.
app.use(express.static("public"));

// 🍪 Middleware to parse cookies
// Extracts cookies from incoming request headers and makes them available in `req.cookies`
app.use(cookieParser());

export default app;
