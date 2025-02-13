import express from "express";
import cors from "cors";
import books from "./routes/books.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/books", books);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});