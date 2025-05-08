import express from "express";
import dotenv from "dotenv";
import realtyRouter from "./routes/realtyRoute";
import cors from "cors"; // Later

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/realty', realtyRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});