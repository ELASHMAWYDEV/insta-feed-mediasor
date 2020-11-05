const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5001;

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


//For the react app
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


//Socket Hanler
require("./socket")(io);






http.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
