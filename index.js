const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//IGQVJWSXRIZAExlWEZAYM2t3cjc5VklOOU9FaGZAjOEpKRkI4ZAHFLbDFnSFBXRmwwNHBBa1pLcWJQRE1QeWhpaU5HWTRyQWh6a2M1bEpEejlPS29mSENybGdlM2tqMVNWSDZAmMmhDbTBsUWdqTDF4ZAnpxQQZDZD


//For the react app
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
