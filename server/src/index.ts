import express, { Request, Response } from "express";
import { initializeApp } from "firebase/app";
import { child, getDatabase, push, ref, set } from "firebase/database";

const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeUserData(userId: any, name: any, email: any, imageUrl: any) {
  const userID = push(child(ref(db), "users")).key;

  set(ref(db, "users/" + userId), {
    name,
    email,
    profile_picture: imageUrl,
  })
    .then(() => {
      console.log("data updated");
    })
    .catch((error) => {
      console.log(error);
    });
}

writeUserData(1, "a", "a", "a");

const app2 = express();
const port = process.env.PORT;

app2.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app2.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
