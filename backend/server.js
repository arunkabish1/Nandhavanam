import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// ---- Cloudinary ----
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const eventStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "events",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gallery",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadEvent = multer({ storage: eventStorage });
const uploadGallery = multer({ storage: galleryStorage });

// ---- App ----
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nfakuwait.com",
      "https://www.nfakuwait.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// ---- Mongo ----
mongoose
  .connect(process.env.MONGOURI, {
    // For Mongoose 7+, these options are no longer required, but harmless:
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ---- Schemas & Models ----
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // NOTE: not hashed in this demo
  mobile: String,
  role: String,
});
const User = mongoose.model("User", UserSchema);

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

const GallerySchema = new mongoose.Schema({
  mname: String,
  position: String,
  email: String,
  image: String,
  description: String,
});
const Gallery = mongoose.model("Gallery", GallerySchema);

const ContactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  message: String,
  respond: { type: Boolean, default: false },
});
const Contact = mongoose.model("Contact", ContactSchema);

// ---- Routes ----

// Users
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

// Login (demo only; plaintext password)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    return res.status(200).json({ message: "Success", user });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Events
app.post("/events", uploadEvent.single("image"), async (req, res) => {
  try {
    const { event, post, sms, mail, home, date } = req.body;

    // Coerce booleans (FormData sends strings)
    const toBool = (v) => v === true || v === "true" || v === "on" || v === 1 || v === "1";
    const newEvent = new Event({
      event,
      post,
      sms: toBool(sms),
      mail: toBool(mail),
      home: toBool(home),
      date,
      image: req.file?.path || "",
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Homepage notifications
app.get("/notifications", async (req, res) => {
  try {
    const data = await Event.find({ home: true });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

// Gallery
app.post("/gallery", uploadGallery.single("image"), async (req, res) => {
  try {
    const { mname, email, description, position } = req.body;
    const newMember = new Gallery({
      mname,
      email,
      position,
      description,
      image: req.file?.path || "",
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving gallery member" });
  }
});

app.get("/members", async (req, res) => {
  try {
    const data = await Gallery.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching members" });
  }
});

// Contacts
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    const newContact = new Contact({ name, email, mobile, message, respond: false });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving contact" });
  }
});

// NEW: standardized GET /contacts (frontend uses this)
app.get("/contacts", async (req, res) => {
  try {
    const data = await Contact.find().sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
});

// keep old route if you still want it
app.get("/viewcontacts", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
});

app.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Contact.findByIdAndUpdate(
      id,
      { respond: !!req.body.respond },
      { new: true }
    );
    res.status(200).json(update);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating contact" });
  }
});

// AI generation via Google Generative AI SDK (server-side only)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return res.status(200).json({ text });
  } catch (err) {
    console.error("AI Generation error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

// ---- Start ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
