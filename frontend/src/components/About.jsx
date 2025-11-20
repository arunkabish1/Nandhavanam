import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function About() {
  return (
    <>
    <div className="relative pt-24 min-h-screen bg-gradient-to-b from-white via-blue-50 to-slate-100 text-gray-800 px-6 md:px-10 py-16 overflow-hidden">

      {/* 🌫 Background Floating Blobs – matching homepage */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -top-10 -left-10"
        animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[26rem] h-[26rem] bg-yellow-300/20 rounded-full blur-3xl top-1/2 right-0"
        animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🏛 Introduction Section */}
      <motion.section
        className="max-w-5xl mx-auto text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          About <span className="text-blue-700">Kuwait Nandhavanam</span>
        </h1>

        <img
          src="https://scontent.fmaa2-2.fna.fbcdn.net/v/t1.6435-9/55649770_2211823662403487_6317640375494246400_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RpFFcrz_08wQ7kNvwEON8Lu&_nc_oc=Admm_2TcLo6b5TzkxS8bWCsq5aIdMA-vQxFbyJ5DYgFqH-zAepasSkuMs1GQ1X_WsR21MetiBFiHs-IoMqE5Ws7U&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=u71NLNeC1miFIxfz1yrVtg&oh=00_AfjWhc8a8XXanOZts8eSK4p7M1SSWk20EQ2Li8M3xLqxbg&oe=693161FE"
          alt="Nandhavanam Group"
          className="rounded-2xl shadow-xl mx-auto mb-10 w-full max-w-3xl object-cover"
        />

        <p className="text-lg leading-relaxed mb-4 text-gray-700">
          The <strong>Kuwait Nandhavanam Family Association</strong> is a
          well-recognized organization in Kuwait. It was founded in{" "}
          <strong>2013</strong> by a group of like-minded individuals with the
          aim of creating a social and cultural environment for the
          community living in Kuwait.
        </p>

        <p className="text-lg leading-relaxed text-gray-600">
          As a socio-cultural organization, the association is officially
          registered with the <strong>Embassy of India, Kuwait</strong>.
        </p>

        <blockquote className="italic bg-white/70 backdrop-blur-sm shadow-md rounded-xl px-6 py-4 mt-10 border-l-4 border-yellow-500 mx-auto max-w-xl">
          " Registered under the Indian Embassy - INDEMB/KWT/ASSN/245 , Kuwait on 12th August 2013 "
        </blockquote>
      </motion.section>

      {/* 🎭 Key Activities — refined cards */}
      <motion.section
        className="max-w-6xl mx-auto mb-20 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Our Key Activities
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* CARD TEMPLATE */}
          {[
            {
              img: "https://scontent.fmaa2-3.fna.fbcdn.net/v/t39.30808-6/547151790_3984595761792926_4438388912605419073_n.jpg?...",
              title: "1. Promotion of the Tamil Language",
              color: "text-blue-700",
              text: "The association promotes Tamil through debates, literature events, and guest speakers.",
              text2: "Volunteers conduct Tamil classes to strengthen our linguistic roots.",
            },
            {
              img: "https://scontent.fmaa2-1.fna.fbcdn.net/v/t39.30808-6/485801507_3817758038476700_7643677831592977098_n.jpg?...",
              title: "2. Social Initiatives",
              color: "text-green-700",
              text: "We support underprivileged children and institutions helping the differently-abled.",
            },
            {
              img: "https://scontent.fmaa2-1.fna.fbcdn.net/v/t39.30808-6/502681634_3890807697838400_1828521536295120010_n.jpg?...",
              title: "3. Cultural Events",
              color: "text-purple-700",
              text: "We host vibrant cultural programs celebrating Tamil festivals, art, and music.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center"
            >
              <img
                src={item.img}
                alt="Activity"
                className="rounded-xl w-full h-48 object-cover mb-4"
              />

              <h3 className={`text-xl font-semibold ${item.color} mb-3`}>
                {item.title}
              </h3>

              <p className="text-gray-700 mb-2">{item.text}</p>
              {item.text2 && (
                <p className="text-gray-700">{item.text2}</p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 🚀 CTA Section */}
      <motion.section
        className="text-center max-w-3xl mx-auto mb-10 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Join Us</h2>
        <p className="text-gray-600 mb-6">
          Want to be part of our journey? Explore opportunities to connect with
          our cultural, social, and educational initiatives.
        </p>

        <a
          href="/admission"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-xl transition"
        >
          Explore Admissions
        </a>
      </motion.section>
    </div>
    <Footer />
    </>
  );
}
