import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Database");
    } catch (error) {
        throw error;
    }
};

export const disconnected = mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
});
    
export const connected = mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected")
});
    