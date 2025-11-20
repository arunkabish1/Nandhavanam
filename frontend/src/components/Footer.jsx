import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900/90 backdrop-blur-xl text-white pt-20 pb-10 px-6 border-t border-white/10">

      {/* Floating subtle glows */}
      <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* LOGO + ABOUT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={logo}
            alt="Nandhavanam Logo"
            className="w-24 h-24 rounded-full shadow-md border border-white/20 mb-4"
          />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            நந்தவனம்
          </h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Kuwait Nandhavanam Tamil Family Association promotes Tamil culture,
            education, and unity across the Tamil community in Kuwait.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-slate-300 font-medium">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Members", "/gallery"],
              ["Teachers", "/teacher"],
              ["Admissions", "/admission"],
              ["Contact", "/contact"],
            ].map(([name, link]) => (
              <li key={name}>
                <a
                  href={link}
                  className="hover:text-blue-400 transition-colors"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT + SOCIALS */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-slate-300">
            <p className="flex justify-center md:justify-start items-center gap-2">
              <FaPhoneAlt className="text-blue-400" />
              +965 6669 3181
            </p>

            <p className="flex justify-center md:justify-start items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              info@nandhavanamkuwait.org
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-6 mt-6 text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-pink-400 hover:text-white transition hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-blue-400 hover:text-white transition hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-sky-400 hover:text-white transition hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              className="text-red-400 hover:text-white transition hover:scale-110"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT SECTION */}
      <div className="relative z-10 text-center mt-14 pt-6 border-t border-white/10">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Kuwait Nandhavanam Tamil Family
          Association. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
