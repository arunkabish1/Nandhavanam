import express from "express";
import cors from "cors";
import mongoose, { STATES } from "mongoose";
import dotenv from "dotenv";

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "events",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const gallerystorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gallery",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage, gallerystorage });

const app = express();
app.use(cors());
app.use(express.json());

// const SaltRounds = 10;

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ✅ Define Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  role: String,
});

// ✅ Create Model
const User = mongoose.model("User", UserSchema);

// ✅ Routes
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Check Values Given" });
    }
    res.json({ message: "Success", user });

    console.log("done");
  } catch (err) {
    console.log(err);
  }
});

// event adding functionality

const EventsSchema = new mongoose.Schema({
  event: String,
  post: String,
  sms: Boolean,
  home: Boolean,
  mail: Boolean,
  image: String,
});

const Event = mongoose.model("Event", EventsSchema);

app.post("/events", upload.single("image"), async (req, res) => {
  try {
    const { event, post, sms, mail, home } = req.body;
    const newEvent = new Event({
      event,
      post,
      sms,
      home,
      mail,
      image: req.file?.path,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// homepage events getting

app.get("/notifications", async (req, res) => {
  try {
    const data = await Event.find({ home: true });
    res.json(data);
    // console.log("///////////////////////////")
    console.log(res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

// gallery memebers adding

const gallerySchema = new mongoose.Schema({
  mname: String,
  position: String,
  email: String,
  image: String,
  description: String,
});

const Gallery = mongoose.model("Gallery", gallerySchema);

app.post("/gallery", upload.single("image"), async (req, res) => {
  const { mname, email, description, position } = req.body;
  console.log(mname)
  try {
    const newMember = new Gallery({
      mname,
      email,
      position,
      description,
      image: req.file?.path,
    });
    await newMember.save();
    res.status(201).json(newMember);
    console.log(res.data)
  } catch (err) {
    console.log(err);
  }
});

// geting gallery data

app.get('/members',async (req,res)=>{
 
  try {
     
  const data = await Gallery.find();
  res.json(data)
  console.log(data)
  
  } catch (error) {
    console.log(err)  
  }



})






app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
