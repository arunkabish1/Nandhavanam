import React from "react";
import { motion } from "framer-motion";
import { HoverImageLinks } from "./HoverImageLinks";

export default function About() {
  return (
    <><div className="relative pt-20 min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 text-gray-800 px-6 py-16 overflow-hidden">
      {/* 🌸 Background Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-300/30 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div
        className="absolute w-[28rem] h-[28rem] bg-yellow-300/30 rounded-full blur-3xl top-1/3 right-10"
        animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />

      {/* 💫 Introduction */}
      <motion.section
        className="max-w-5xl mx-auto text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
          About <span className="text-yellow-600">Kuwait Nandhavanam</span>
        </h1>

        <img
          src="https://scontent.fmaa2-2.fna.fbcdn.net/v/t1.6435-9/55649770_2211823662403487_6317640375494246400_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RpFFcrz_08wQ7kNvwEON8Lu&_nc_oc=Admm_2TcLo6b5TzkxS8bWCsq5aIdMA-vQxFbyJ5DYgFqH-zAepasSkuMs1GQ1X_WsR21MetiBFiHs-IoMqE5Ws7U&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=u71NLNeC1miFIxfz1yrVtg&oh=00_AfjWhc8a8XXanOZts8eSK4p7M1SSWk20EQ2Li8M3xLqxbg&oe=693161FE"
          alt="Nandhavanam Group"
          className="rounded-2xl shadow-lg mx-auto mb-10 w-full max-w-3xl" />

        <p className="text-lg leading-relaxed mb-4 text-gray-700">
          The <strong>Kuwait Nandhavanam Tamil Family Association</strong> is a
          well-recognized organization in Kuwait. It was founded in{" "}
          <strong>2013</strong> by a group of like-minded individuals with the
          aim of creating a social and cultural environment for the Tamil
          community living in Kuwait.
        </p>

        <p className="text-lg leading-relaxed text-gray-600">
          As a socio-cultural organization, the association is officially
          registered with the <strong>Embassy of India, Kuwait</strong>.
        </p>

        <div className="p-10">
          <blockquote className="italic text-center text-gray-800 border-l-4 border-yellow-400 pl-6">
            " Registered under the Indian Embassy - INDEMB/KWT/ASSN/245 ,
            Kuwait on 12th August 2013 "
          </blockquote>
        </div>
      </motion.section>

      {/* 🎭 Key Activities */}
      <motion.section
        className="max-w-6xl mx-auto mb-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Key Activities
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Promotion of Tamil Language */}
          <div className="bg-white/80 backdrop-blur-xl border border-yellow-100 rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
            <img
              src="https://scontent.fmaa2-3.fna.fbcdn.net/v/t39.30808-6/547151790_3984595761792926_4438388912605419073_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GrgHLe9ePr0Q7kNvwHvZuKj&_nc_oc=AdmHHJTsernPc2w1s0OifHCI9NpOu0zCEWLoyIGfNNjyy24nUNH8rPEESleOkwUVpGz1ZEH5gLI1Ri_aaQ3C_8NK&_nc_zt=23&_nc_ht=scontent.fmaa2-3.fna&_nc_gid=DAugEKKFdmdOxu1Rx16tCA&oh=00_AfgalIAU_vH6N3qWcRirG--IP3IdEF31Ui_e9Nw_4seztw&oe=690FBF8E"
              alt="Tamil Classes"
              className="rounded-2xl w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-semibold text-yellow-700 mb-3">
              1. Promotion of the Tamil Language
            </h3>
            <p className="text-gray-700 mb-2">
              The association strives to preserve and promote the Tamil
              language by organizing literary events, Tamil debates, and inviting
              scholars and speakers from Tamil Nadu.
            </p>
            <p className="text-gray-700">
              Volunteers conduct Tamil classes for children, fostering a love
              for our heritage and linguistic roots.
            </p>
          </div>

          {/* 2. Social Initiatives */}
          <div className="bg-white/80 backdrop-blur-xl border border-green-100 rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
            <img
              src="https://scontent.fmaa2-1.fna.fbcdn.net/v/t39.30808-6/485801507_3817758038476700_7643677831592977098_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bxzbr_SZr-cQ7kNvwHNqIFt&_nc_oc=AdnXkn_9qDSLqNKEkm0cSXOwhbkzgrWE5eXzI5FlYI371dSKy_hVFkuAPjpZhpK1U130ZJe3BWgACF4ZnGMIlPtA&_nc_zt=23&_nc_ht=scontent.fmaa2-1.fna&_nc_gid=i02Y8CiT2-39SxcCHOySRg&oh=00_AfhKRVjrTWY-pWIBCBqYsFFbPOASljKupvTGM8Lz2265TA&oe=691000EC"
              alt="Social Welfare"
              className="rounded-2xl w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              2. Social Initiatives
            </h3>
            <p className="text-gray-700">
              Nandhavanam contributes towards education and welfare in Tamil Nadu
              by supporting underprivileged students and institutions serving
              differently-abled and economically weaker communities.
            </p>
          </div>

          {/* 3. Cultural Events */}
          <div className="bg-white/80 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
            <img
              src="https://scontent.fmaa2-1.fna.fbcdn.net/v/t39.30808-6/502681634_3890807697838400_1828521536295120010_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KDSKbHG01loQ7kNvwGISN_T&_nc_oc=Adli0C0gdfeeE-IJI32oS_K8zsdpu7DNYB8Tpr8xu7VnFn-DSrJsVZmzi23CtDHosD7Xc8EZqAGTyFIk8J9_it7v&_nc_zt=23&_nc_ht=scontent.fmaa2-1.fna&_nc_gid=KZCmPKhxxcCfrTIrLaQDgA&oh=00_Afgc0mLR6T-lTbxUseUT7IZRfU1Y4Ric4Nubr34JJaktwA&oe=690FCF9D"
              alt="Cultural Programs"
              className="rounded-2xl w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-semibold text-purple-700 mb-3">
              3. Cultural Events
            </h3>
            <p className="text-gray-700">
              Regular cultural programs celebrate Tamil festivals, music, and
              art — inviting renowned artists from Tamil Nadu and promoting unity
              among the Tamil community in Kuwait.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 🚀 Call to Action */}
      <motion.section
        className="text-center max-w-3xl mx-auto mb-10 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us</h2>
        <p className="text-gray-600 mb-6">
          Want to be part of our journey? Explore opportunities to connect with
          our cultural, social, and educational initiatives.
        </p>
        <a
          href="/admission"
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
        >
          Explore Admissions
        </a>
      </motion.section>

    </div><HoverImageLinks /></>
  );
}
