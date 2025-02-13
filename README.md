# 📚 MERN Bookstore

## 📝 Description
MERN Bookstore is a full-stack web application for managing books in a database. Users can view, add, update, and delete books. This project follows the MERN stack, which includes MongoDB, Express, React, and Node.js.

## 🚀 Technologies Used
### Backend:
- **🟢 Node.js**: JavaScript runtime for executing server-side code.
- **⚡ Express**: Web framework for Node.js to create API endpoints.
- **🔗 CORS**: Middleware to handle Cross-Origin Resource Sharing.
- **🗄️ MongoDB**: NoSQL database for storing book data.
- **☁️ MongoDB Atlas**: Cloud-based database solution for MongoDB.

### Frontend:
- **⚡ Vite**: Fast development environment for React projects.
- **⚛️ React**: JavaScript library for building the user interface.
- **🌍 React Router DOM**: For handling client-side routing.
- **🎨 TailwindCSS**: Utility-first CSS framework for styling.
- **💫 Framer Motion**: Library for animations.
- **🎛️ Tailwind Merge**: Utility for merging Tailwind classes.

### Additional Tools:
- **📦 NPM**: Package manager for Node.js.
- **🛠️ Postman**: API testing tool.
- **💻 Visual Studio Code**: Recommended IDE.

## 🔗 API Endpoints (Testable via Postman)
### 📖 Get all books:
```http
GET http://localhost:3000/books
```

### 📖 Get a book by ID:
```http
GET http://localhost:3000/books/:id
```

### ✍️ Create a book:
```http
POST http://localhost:3000/books
```
#### Request Body:
```json
{
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "author": "J.R.R. Tolkien",
    "rating": 9,
    "pages": 423,
    "genres": ["fantasy", "magic"],
    "reviews": [
        { "name": "Shaun", "body": "Couldn't put this book down" },
        { "name": "Chun-Li", "body": "Love it" }
    ]
}
```

### 🔄 Update a book by ID:
```http
PATCH http://localhost:3000/books/:id
```

### 🗑️ Delete a book by ID:
```http
DELETE http://localhost:3000/books/:id
```

## ✅ Prerequisites
- **🟢 Node.js** v20 or higher
- **📦 NPM** v10 or higher
- **🗄️ MongoDB** (Local or Atlas)
- **💻 Visual Studio Code** (Recommended IDE)
- **🛠️ Postman** (Optional for API testing)

## 🔧 Installation and Setup
1. 📥 Clone the repository:
   ```sh
   git clone https://github.com/SeniorSon/mern-bookstore.git
   ```
2. 📂 Navigate to the project directory and open it in VSCode:
   ```sh
   cd mern-bookstore
   ```
3. 🖥️ Open a terminal and switch to the server directory:
   ```sh
   cd server
   ```
4. 📦 Install dependencies:
   ```sh
   npm install
   ```
5. ▶️ Start the backend server:
   ```sh
   node --env-file=config.env server
   ```
6. 🖥️ Open a second terminal and switch to the client directory:
   ```sh
   cd client
   ```
7. 📦 Install frontend dependencies:
   ```sh
   npm install
   ```
8. ▶️ Start the frontend application:
   ```sh
   npm run dev
   ```
9. 🌍 Open the app in your browser at:
   ```
   http://localhost:5173/
   ```