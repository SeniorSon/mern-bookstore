import express from "express"
import cors from "cors"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// start express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});