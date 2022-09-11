// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function (req, res) {
    console.log(process.env);
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.get("/topshow", function (req, res) {
    let doc = fs.readFileSync("./app/data/topshow.html", "utf8");
    res.send(doc);
});

app.get("/topshow-spotify", function (req, res) {
    let doc = fs.readFileSync("./app/data/topshow-spotify.html", "utf8");
    res.send(doc);
});

app.get("/topshow-stitcher", function (req, res) {
    let doc = fs.readFileSync("./app/data/topshow-stitcher.html", "utf8");
    res.send(doc);
});

app.get("/othershows", function (req, res) {
    let doc = fs.readFileSync("./app/data/othershows.html", "utf8");
    res.send(doc);
});

app.get("/othershows-spotify", function (req, res) {
    let doc = fs.readFileSync("./app/data/othershows-spotify.html", "utf8");
    res.send(doc);
});

app.get("/othershows-stitcher", function (req, res) {
    let doc = fs.readFileSync("./app/data/othershows-stitcher.html", "utf8");
    res.send(doc);
});


app.get("/genres2", function (req, res) {
    let doc = fs.readFileSync("./app/data/genres.json", "utf8");
    res.send(doc);
});


// for page not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Running on " + port + "!");
});
