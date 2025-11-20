import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Resend } from "resend";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodeMailer from "nodemailer";

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

const teacherStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "teacher",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadEvent = multer({ storage: eventStorage });
const uploadGallery = multer({ storage: galleryStorage });
const uploadTeacher = multer({ storage: teacherStorage });

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
  createdAt: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", ContactSchema);

const TeacherSchema = new mongoose.Schema({
  mname: String,
  position: String,
  email: String,
  image: String,
  description: String,
});
const Teacher = mongoose.model("Teacher", TeacherSchema);

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

app.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching teachers" });
  }
});

// Login (demo only; plaintext password)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Success", user });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Events
app.post("/events", uploadEvent.single("image"), async (req, res) => {
  try {
    const { event, post, sms, mail, home, date, toEmail } = req.body;

    // Coerce booleans coming from FormData
    const toBool = (v) =>
      v === true || v === "true" || v === "on" || v === 1 || v === "1";

    const mailBool = toBool(mail);
    const smsBool = toBool(sms);
    const homeBool = toBool(home);

    const newEvent = new Event({
      event,
      post,
      sms: smsBool,
      mail: mailBool,
      home: homeBool,
      date,
      image: req.file?.path || "",
    });

    await newEvent.save();
    const imageUrl = newEvent.image;
    3;
    // console.log(imageUrl)
    // respond to client ONCE
    // res.status(201).json(newEvent);

    if (mailBool) {
      const transporter = nodeMailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const members = await Gallery.find({}, { email: 1, _id: 0 });
      const recipients = members.map((m) => m.email);

      // console.log(recipients);

      if (recipients.length) {
        const formattedDate = date
          ? new Date(date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "TBA";

        const html = `
          <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px; display:flex; justify-content:center;">
            <div style="max-width:900px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 3px 12px rgba(0,0,0,0.08);">
              <div style="background:#0A2753; padding:24px; text-align:center;">
                <img src="https://res.cloudinary.com/delx0bz9t/image/upload/v1762606982/ede80afc-7fe7-4e07-8841-1807b2a6eebd.png" style="width:120px;margin-bottom:12px;" />
                <h2 style="color:#ffffff; margin:0;">NFA Kuwait</h2>
              </div>
              <div style="padding:24px; color:#1a1a1a;">
                <h3 style="margin-top:0;">You're Invited for the ${event} at NFA Kuwait</h3>
                <p><b>Date:</b> ${formattedDate}</p>

                <img src="${imageUrl}" alt="Event Image" style="width:100%; max-width:600px; border-radius:8px; margin-top:10px;" />
                
                <div style="background:#f1f5f9; padding:16px; border-left:4px solid #0A2753; border-radius:6px; margin:20px 0;">
                  <p style="margin:0; white-space:pre-wrap; line-height:1.5;">${post}</p>
                </div>
                <a href="https://nfakuwait.com" style="display:inline-block; margin-top:12px; padding:10px 16px; background:#0A2753; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">Visit Our Website</a>
              </div>
              <div style="background:#eceff3; padding:14px; text-align:center; font-size:12px; color:#666;">
                This is an automated email. Please do not reply directly.
              </div>
            </div>
          </div>`;
        await transporter.sendMail({
          from: '"NFA Team" <nfa-team@nfakuwait.com>',
          bcc: recipients,
          subject: `Invitation: ${event} From NFA Kuwait Team`,
          html,
        });
      }
    }

    if (smsBool) {
      const formattedDate = date
        ? new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "TBA";

      // WhatsApp formatted message (bold, icons, clickable)
      const whatsappMessage = encodeURIComponent(
        `📢 *NFA Kuwait Event Announcement*\n\n` +
          `*Event:* ${event}\n` +
          `*Date:* ${formattedDate}\n\n` +
          `${imageUrl}\n\n` +
          `${post}\n\n` +
          `🌐 Visit Our Website:\nhttps://nfakuwait.com`
      );

      // Share link (this opens WhatsApp with message pre-filled)
      const whatsappShareURL = `https://wa.me/?text=${whatsappMessage}`;

      // console.log("✅ WhatsApp Share Link Generated:");
      // console.log(whatsappShareURL);
      res.status(201).json({
        ...newEvent.toObject(),
        whatsappShareURL,
      });
    }
  } catch (err) {
    console.error(err);
    // If save failed before res, client needs an error
    // If it failed after res, this will be ignored (which is fine)
    if (!res.headersSent) {
      res.status(500).json({ error: "Server Error" });
    }
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

    const newContact = new Contact({
      name,
      email,
      mobile,
      message,
      respond: false,
      createdAt: new Date(),
    });

    await newContact.save();
    res.status(201).json(newContact);

    const transporter = nodeMailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: '"NFA Team" <nfa-team@nfakuwait.com>',
      to: email,
      subject: "We Received Your Message ✅",
      html: `
  <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px; display:flex; justify-content:center;">
    <div style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 3px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:#0A2753; padding:24px; text-align:center;">
        <img src="https://res.cloudinary.com/delx0bz9t/image/upload/v1762606982/ede80afc-7fe7-4e07-8841-1807b2a6eebd.png" alt="NFA Logo" style="width:120px; margin-bottom:12px;" />
        <h2 style="color:#ffffff; margin:0; font-size:20px; font-weight:600;">NFA Kuwait</h2>
      </div>

      <!-- Body -->
      <div style="padding:24px; color:#1a1a1a;">
        <h3 style="margin-top:0; font-size:18px;">Thank you for contacting us!</h3>

        <p>We have received your message and our team will get back to you within <b>24 hours.</b></p>


        <div style="background:#f1f5f9; padding:16px; border-left:4px solid #0A2753; border-radius:6px; margin:20px 0;">
          <p style="margin:6px 0;"><b>Name:</b> ${name}</p>
          <p style="margin:6px 0;"><b>Email:</b> ${email}</p>
          <p style="margin:6px 0;"><b>Mobile:</b> ${mobile}</p>
          <p style="margin:6px 0;"><b>Message:</b><br>${message.replace(
            /\n/g,
            "<br>"
          )}</p>
        </div>

        <p>We appreciate your trust and will respond as soon as possible.</p>
        <p style="margin-top:20px;">Warm regards,<br><b>NFA Support Team</b></p>

        <a href="https://nfakuwait.com" style="display:inline-block; margin-top:12px; padding:10px 16px; background:#0A2753; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">Visit Our Website</a>
      </div>

      <!-- Footer -->
      <div style="background:#eceff3; padding:14px; text-align:center; font-size:12px; color:#666;">
        This is an automated email. Please do not reply directly.
      </div>
    </div>
  </div>
  `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });

    const adminMailOptions = {
      from: '"NFA Team" <nfa-team@nfakuwait.com>',
      to: "nandavanamkuwait@gmail.com",
      subject: "New Contact Form Submission 📬",
      html: `
        <h3>New contact form submission received:</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };
    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        return console.log("Error sending admin email:", error);
      }
      console.log("Admin email sent:", info.response);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving contact" });
  }
});

app.get("/contactsview", async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
});

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

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-09-2025",
});
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    return res.status(200).json({ text: aiText });
  } catch (err) {
    console.error("AI generation error:", err);
    return res.status(500).json({ error: "Error generating AI text" });
  }
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/sent-reply", async (req, res) => {
  const { toEmail, message, date } = req.body;

  try {
    const formatted = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const response = await resend.emails.send({
      from: "NFA Kuwait <nfa-team@nfakuwait.com>",
      to: toEmail,
      subject: "Response to Your Contact Submission",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px; display:flex; justify-content:center;">
  <div style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 3px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#0A2753; padding:24px; text-align:center;">
      <img src="https://res.cloudinary.com/delx0bz9t/image/upload/v1762606982/ede80afc-7fe7-4e07-8841-1807b2a6eebd.png" 
           alt="NFA Logo" 
           style="width:120px; margin-bottom:12px;" />
      <h2 style="color:#ffffff; margin:0;">NFA Kuwait</h2>
    </div>

    <!-- Body -->
    <div style="padding:24px; color:#1a1a1a;">
      <h3 style="margin-top:0;">Greetings from NFA Support Team 👋</h3>

      <p>You contacted us on <b>${formatted}</b>. Here is our reply:</p>

      <div style="background:#f1f5f9; padding:16px; border-left:4px solid #0A2753; border-radius:6px; margin:20px 0;">
        <p style="margin:0; white-space:pre-wrap; line-height:1.5;">
          ${message}
        </p>
      </div>

      <p>Feel free to reply if you need more help.</p>
      <p>Warm regards,<br><b>NFA Support Team</b></p>

      <a href="https://nfakuwait.com" 
         style="display:inline-block; margin-top:12px; padding:10px 16px; background:#0A2753; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">
        Visit Our Website
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#eceff3; padding:14px; text-align:center; font-size:12px; color:#666;">
      This is an automated email. Please do not reply directly.
    </div>

  </div>
</div>

      `,
    });

    console.log("Resend success:", response);
    return res.status(200).json({ message: "Reply email sent!", response });
  } catch (e) {
    console.error("Resend Email Error:", e);
    return res.status(500).json({ error: "Failed to send email", details: e });
  }
});
// teacher

app.post("/teacher", uploadTeacher.single("image"), async (req, res) => {
  try {
    const { mname, email, description, position } = req.body;
    const newTeacher = new Teacher({
      mname,
      email,
      position,
      description,
      image: req.file?.path || "",
    });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving Teacher member" });
  }
});
app.get("/teacher", async (req, res) => {
  try {
    const data = await Teacher.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching teachers" });
  }
});

app.delete("/teacher/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const update = await Teacher.findByIdAndDelete(_id);
    res.status(200).json(update);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating contact" });
  }
});

app.delete("/members/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    const update = await Gallery.findByIdAndDelete(_id);
    res.status(200).json(update);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating contact" });
  }
});

app.delete("/users/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    const update = await User.findByIdAndDelete(_id);
    res.status(200).json(update);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user" });
  }
});

app.delete("/events/:_id", async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    const update = await Event.findByIdAndDelete(_id);
    res.status(200).json(update);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating contact" });
  }
});

app.get("/", (req, res) => {
  res.send("NFA Kuwait API is running");
});

// ---- Start ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
