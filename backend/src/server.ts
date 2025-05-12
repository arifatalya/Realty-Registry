import express from "express";
import dotenv from "dotenv";
import registrarRouter from "./routes/registrarRoute";
import authorityRouter from "./routes/authorityRoute";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:4000"],
    credentials: true,
}));

app.use('/registrar', registrarRouter);
app.use('/authority', authorityRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});