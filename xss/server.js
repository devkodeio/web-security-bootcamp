const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const CSVToJSON = require("csvtojson");
const logDir = path.resolve(__dirname, "./logs");
const xssCSV = path.resolve(logDir, "xss.csv");
const reportViolationsCSV = path.resolve(logDir, "report-violations.csv");
const commentCSV = path.resolve(logDir, "comment.csv");
const helmet = require("helmet");
const config = JSON.parse(fs.readFileSync("package.json")).config;

const server = express();

server.use(function (req, res, next) {
  const cookie = req.cookies?.secret;
  if (cookie === undefined) {
    res.cookie("secret", "devkode");
  }
  next();
});

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

if (!fs.existsSync(reportViolationsCSV)) {
  fs.writeFileSync(reportViolationsCSV, "time,url,data\n", {
    flag: "wx",
  });
}

if (!fs.existsSync(xssCSV)) {
  fs.writeFileSync(xssCSV, "time,url,message,cookie\n", {
    flag: "wx",
  });
}

if (!fs.existsSync(commentCSV)) {
  fs.writeFileSync(commentCSV, "time,comment\n", {
    flag: "wx",
  });
}

server.post("/api/report-violations", bodyParser.json({ type: "*/*" }), (req, res, next) => {
  const now = new Date().getTime();
  const URL = req.protocol + "://" + req.get("host") + req.originalUrl;
  const record = `${now},${URL},${JSON.stringify(req.body)}`;

  fs.appendFile(reportViolationsCSV, `${record}\n`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
    next();
  });
});

server.get("/api/xss", bodyParser.json({ type: "*/*" }), (req, res, next) => {
  const now = new Date().getTime();
  const URL = req.protocol + "://" + req.get("host") + req.originalUrl;
  const record = `${now},${URL},${req.query.message},${req.query.cookie}`;

  fs.appendFile(xssCSV, `${record}\n`, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
    next();
  });
});

server.post("/api/comment", bodyParser.json({ type: "*/*" }), (req, res, next) => {
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

server.get("/api/view/xss", (req, res) => {
  CSVToJSON()
    .fromFile("./logs/xss.csv")
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/api/view/report-violations", (req, res) => {
  CSVToJSON()
    .fromFile("./logs/report-violations.csv")
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
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
