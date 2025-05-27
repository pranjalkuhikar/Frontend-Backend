import http from "http";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";

connectDB();
const server = http.createServer(app);
const PORT = config.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.on("error", (error) => {
  console.error("Server error:", error);
});
