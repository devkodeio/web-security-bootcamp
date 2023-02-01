const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const CSVToJSON = require("csvtojson");
const logDir = path.resolve(__dirname, "./logs");
const commentCSV = path.resolve(logDir, "comment.csv");
const config = JSON.parse(fs.readFileSync("package.json")).config;

const server = express();
server.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
server.use(bodyParser.json()); // support json encoded bodies

// server.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("access-control-allow-methods", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

if (!fs.existsSync(commentCSV)) {
  fs.writeFileSync(commentCSV, "time,comment\n", {
    flag: "wx",
  });
}

server.post("/api/comment", (req, res, next) => {
  const now = new Date().getTime();
  const URL = req.protocol + "://" + req.get("host") + req.originalUrl;
  const record = `${now},${req.body.comment}`;

  fs.appendFile(commentCSV, `${record}\n`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
    next();
  });
});

server.get("/api/comment", (req, res) => {
  CSVToJSON()
    .fromFile("./logs/comment.csv")
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});
server.use(express.static("./", { etag: false }));

const port = parseInt(config["port"], 10);
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}/`);
});
