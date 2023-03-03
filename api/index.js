import express from "express";
import dotenv from "dotenv";
import {connect} from "./mongoDB-connexion.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = 8800 || process.env.PORT

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);

app.use((err,req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})



app.listen(port, ()=>{
    connect();
    console.log("Connected to backend server on port " + port);
});