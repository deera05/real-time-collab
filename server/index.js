require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require("./routes/auth");
//const docRoutes = require("./routes/document");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
//app.use("/api/documents", docRoutes);

console.log("Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI, {dbName: "syncwrite" })
  .then(() => {
    console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
})
  .catch((err) => {
    console.error("MongoDB connection eror:",err)
});

io.on("connection", (socket) => {
    socket.on("join-document", (docId) => {
        socket.join(docId);
        socket.on("send-changes", (delta) => {
            socket.broadcast.to(docId).emit("receive-changes", delta);
        });
    });
});

const PORT = process.env.PORT || 5000;
