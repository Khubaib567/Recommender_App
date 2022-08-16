if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");
const {spawn} = require('child_process');
const Setscore = require("./models/setscore");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false })); // this will help to get the user input.


app.get("/my-quiz", function (req, res) {
  res.redirect("http://localhost:3000/");
});

// if a GET request comes in that is not handled by our /api route, our server will respond with our React app.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.post("/setscore", async (req, res) => {
  global.set_score = new Setscore({
    score: req.body.score,
  });
  await set_score.save()
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    });
});

//For model prediction
app.get("/predict", (req, res) => {
  //
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['script.py',set_score.score]);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    return res.send(dataToSend);
  });
});

app.listen(4000);

//Connected with mongoodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Connected with Database!");
});
