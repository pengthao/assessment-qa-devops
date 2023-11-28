const express = require("express");
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");
const botsArr = require('./src/botsData')
const baseURL = "http://3.138.35.207:4000"


var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'ef519cf0eb024024bc89a36565294c79',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

rollbar.log('Hello rollbar check 2!')

const playerRecord = {
  wins: 0,
  losses: 0,
};

const app = express();
app.use(express.json());

const cors = require('cors')
app.use(cors());

app.use(express.static((`${__dirname}/public`)))


// Add up the total health of all the robots
const calculateTotalHealth = (robots) =>
  robots.reduce((total, { health }) => total + health, 0);

// Add up the total damage of all the attacks of all the robots
const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
    )
    .reduce((total, damage) => total + damage, 0);

// Calculate both players' health points after the attacks
const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get(`/api/robots`, (req, res) => {
  rollbar.info("wow look at all those bots.")
  try {
    res.status(200).send(botsArr);
  } catch (error) {
    console.error("ERROR GETTING BOTS", error);
    res.sendStatus(400);
  }
});

app.get(`/api/robots/shuffled`, (req, res) => {
  rollbar.info("Hope i get a good one.")
  try {
    let shuffled = shuffle(bots);
    rollbar.log("robots have been shuffled", {author: "Peng", Type: "manual entry"});
    res.status(200).send(shuffled);
  } catch (error) {
    console.error("ERROR GETTING SHUFFLED BOTS", error);
    res.sendStatus(400);
  }
});

app.post(`/api/duel`, (req, res) => {
  rollbar.info("Robits are fighting.")
  try {
    const { compDuo, playerDuo } = req.body;

    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });

    // comparing the total health to determine a winner
    if (compHealth > playerHealth) {
      playerRecord.losses += 1;
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses += 1;
      //This is where the loss error is//
      res.status(200).send("You won!");
    }
  } catch (error) {
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get(`/api/player`, (req, res) => {
  rollbar.info("We now see the score.")
  try {
    res.status(200).send(playerRecord);
  } catch (error) {
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

/*  -no longer necessary
app.get("", (req, res) => {
  res.sendFile(`${__dirname}/public`);
});  */



app.use(rollbar.errorHandler());

const port = process.env.PORT || 4000

/* app.listen(4000, () => {
  console.log(`Listening on 4000`);
}); */

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

