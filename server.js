import express from "express";
// const express = require('express); // common JS
import { dirname, join } from "path";
import { fileURLToPath } from "url";

let app = express();

app.use(express.json());

const db = [
  {
    name: "jake",
    power: 2,
    health: 1,
  },
  {
    name: "jake",
    power: 2,
    health: 1,
  },
  {
    name: "jake",
    power: 2,
    health: 1,
  },
  {
    name: "jake",
    power: 2,
    health: 1,
  },
  {
    name: "jake",
    power: 2,
    health: 1,
  },
];

//ANCHOR Path Bulding Demonstration

// this gives you the full file url to this file (including the file prefix)
console.log(import.meta.url); // file:///C:/Users/yummy/OneDrive/Documents/Software%20Dev/DevMountain/week-3/friday-test/fighters/server.js

// this turns file URL into a file path to this file
console.log(fileURLToPath(import.meta.url)); // C:\Users\yummy\OneDrive\Documents\Software Dev\DevMountain\week-3\friday-test\fighters\server.js

// this will give you a path to the directory of your current file
console.log(dirname(fileURLToPath(import.meta.url))); // C:\Users\yummy\OneDrive\Documents\Software Dev\DevMountain\week-3\friday-test\fighters

// this will create a full path to a specific folder or path from a base path
console.log(
  join(dirname(fileURLToPath(import.meta.url)), "/public/index.html")
); // C:\Users\yummy\OneDrive\Documents\Software Dev\DevMountain\week-3\friday-test\fighters\public\index.html

// this version serves up the whole public folder in one fell swoop
app.use(
  express.static(join(dirname(fileURLToPath(import.meta.url)), "/public"))
);

//ANCHOR Routes

app.get("/", (req, res) => {
  res.sendFile(
    join(dirname(fileURLToPath(import.meta.url)), "/public/index.html")
  );
});

app.get("/css", (req, res) => {
  res.sendFile(
    join(dirname(fileURLToPath(import.meta.url)), "/public/styles.css")
  );
});

app.get("/js", (req, res) => {
  res.sendFile(
    join(dirname(fileURLToPath(import.meta.url)), "/public/main.js")
  );
});

app.post("/create-ighter", (req, res) => {
  console.log(req.body);
  db.push(req.body);
  res.status(200).send("Fighter created!");
});

app.get("/fighters", (req, res) => {
  res.status(200).send(db);
});

app.delete("/delete-fighter", (req, res) => {
  const deleteFighter = req.query.name;
  // let fighterDeleted = false;

  for (let i = 0; i < db.length; i++) {
    if (db[i].name === deleteFighter) {
      db.splice(i, 1);
      // fighterDeleted = true;
      // break;
    }
  }

  res.status(200).send(db);

  // if (fighterDeleted) {
  //   res.status(200).send({
  //     message: `fighter ${deleteFighter} was deleted!`,
  //   });
  // } else {
  //   res.status(201).send({
  //     message: ``,
  //   });
  // }
});

//ANCHOR Listen to Server

app.listen(8080, () => {
  console.log("🎉 running server on port 8008 🎉");
});
