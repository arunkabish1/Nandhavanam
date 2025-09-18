import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
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
  
});

const Event = mongoose.model("Event", EventsSchema);

app.post("/events",async (req,res)=>{
  try{
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);

  }catch(err){
     console.error(err.message);
     res.status(500).json({ error: err.message });
  }
})

// homepage events getting

app.get("/notifications", async (req, res) => {
  try {
    const data = await Event.find({ home: true });
    res.json(data);
    // console.log("///////////////////////////")
    console.log(res)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error fetching notifications" });
  }
});






app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
