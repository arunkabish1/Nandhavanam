import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import AdminDash from "./components/AdminDash.jsx";
import Login from "./components/Login.jsx";
import Gallery from "./components/Gallery.jsx";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin" element={<AdminDash/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/" element={<Homepage />}></Route>
          
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </Router>
    </>
  );
}
