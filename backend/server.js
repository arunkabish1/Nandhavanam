import express from "express";
import cors from "cors";
import mongoose, { STATES } from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
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
// app.use(cors());
// const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nfakuwait.com",       // ✅ Add your real site
      "https://www.nfakuwait.com",  // ✅ In case your domain redirects
      "https://api.nfakuwait.com"  // ✅ If your frontend accesses a different subdomain
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("User logged in:", user);
    return res.status(200).json({ message: "Success", user });
  } catch (err) {
    console.log(err);
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
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
  date: String,
});

const Event = mongoose.model("Event", EventsSchema);

app.post("/events", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const { event, post, sms, mail, home, date } = req.body;
    const newEvent = new Event({
      event,
      post,
      sms,
      home,
      mail,
      date,
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
    console.log("///////////////////////////");
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
  console.log(mname);
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
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
});

// geting gallery data

app.get("/members", async (req, res) => {
  try {
    const data = await Gallery.find();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(err);
  }
});

// mailer for contact form

const contactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  message: String,
  respond: { type: Boolean, default: false },
});
const Contact = mongoose.model("Contact", contactSchema);

app.post("/contacts", async (req, res) => {
  const { name, email,mobile, message } = req.body;
  const respond = false;
  console.log(name);
  try {
    const newContact = new Contact({
      name,
      email,
      mobile,
      message,
      respond,
    });
    await newContact.save();
    res.status(201).json(newContact);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
});

// geting gallery data

app.get("/viewcontacts", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(err);
  }
});

// google gemini ai
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch(
      "https://gemini.googleapis.com/v1/models/gemini-1.5-pro-preview:generateText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: {
            text: prompt,
            context: "You are a helpful assistant.",
          },
          maxOutputTokens: 256,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("AI Generation error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// contact respond update
app.put("/contacts/:id" ,async(req,res)=>{
  const {id}=req.params;
  
  try{
    const update = await Contact.findByIdAndUpdate(id,{respond:req.body.respond},{new:true});
    res.status(200).json(update);

  }catch(err){
    console.log(err);
  }



})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});