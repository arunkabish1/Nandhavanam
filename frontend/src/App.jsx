import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import AdminDash from "./components/AdminDash.jsx";
import Login from "./components/Login.jsx";
import Gallery from "./components/Gallery.jsx";
import { Admission } from "./components/Admission.jsx";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import InstallPrompt from "./components/InstallPrompt.jsx";
import TranslateFloatingButton from "./components/TranslateFloatingButton.jsx";
import Teacher from "./components/Teacher.jsx";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {" "}
                <AdminDash />{" "}
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/admission" element={<Admission />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/teacher" element={<Teacher />}></Route>
        </Routes>
      </Router>
      <InstallPrompt/>
      <TranslateFloatingButton />
    </>
  );  
}
