const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const scraper = require("./scraper");


//For the react app
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

(async () => {
  try {

    let data = await scraper();
    // console.log(data);
  } catch (e) {
    console.log(e.message);
  }
})();


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
