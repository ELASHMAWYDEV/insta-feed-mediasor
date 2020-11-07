const editJsonFile = require("edit-json-file");
const dataFilePath = `${__dirname}/data.json`;
const scraper = require("./scraper");
let dataFile = editJsonFile(dataFilePath, { autoSave: true });

module.exports = (io) => {
  io.on("connection", (socket) => {
    try {
      console.log("New client connected to socket with id:", socket.id);

      /*
        -----------Handle Get Data-------------
        @event get-data ==> listening
        @event receive-data ==> emitting
        @event error ==> emitting
        @event loading ==> emitting
      */
      socket.on("get-data", async () => {
        try {
          console.log("Getting Data...");
          //Supose dataFile has data
          let fileHasData = true;

          //Check if there any data in the file
          if (Object.keys(dataFile.data).length == 0) {
            fileHasData = false;
          }

          //Emit data from data.json if fileHasData
          if (fileHasData) {
            socket.emit("receive-data", dataFile.data);
          } else {
            //Scrape data & send it to client, mean while send loading event
            socket.emit("loading");

            //Scrape data & send to client
            let data = await scraper() || [];

            if (Object.keys(data).length != 0) {
              socket.emit("receive-data", data);

              //save new data to data.json file
              dataFile.empty();
              dataFile.set(data);
              dataFile.save();
            } else {
              socket.emit("error", "Problem loading feed posts...");
            }
          }
        } catch (e) {
          console.log(e.message);
          socket.emit("error", e);
        }
      });

      /*
        -----------Handle Refresh Data-------------
        @event get-data ==> listening
        @event receive-data ==> emitting
        @event error ==> emitting
        @event loading ==> emitting
      */
      socket.on("refresh-data", async () => {
        try {
          //Scrape data & send to client
          let data = await scraper();

          if (Object.keys(data).length != 0) {
            socket.emit("receive-data", data);

            //save new data to data.json file
            dataFile.empty();
            dataFile.set(data);
            dataFile.save();
          } else {
            socket.emit("error", "Problem loading feed posts...");
          }
        } catch (e) {
          console.log(e.message);
          socket.emit("error", `Error: ${e.message}`);
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  });
};
