import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="bg-[#8AAAE5] rounded-3xl max-w-240 p-3 mx-3 text-white flex justify-between items-center">
        <h1 className="text-black font-mono font-medium text-2xl ">
          Nandavanam
        </h1>

        <nav>
          <ul>
            <li className="bg-gray-200 p-1 rounded-2xl inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              <Link to="/about">About</Link>
            </li>
            <li  className="inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              <Link to="/gallery">Gallery</Link>
            </li>
            <li className="inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              <Link to="/admission">Admissions</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button className="bg-cyan-900 text-white px-4 py-2 rounded-3xl hover:bg-cyan-700">
            <Link to="/login">Login</Link>
            
          </button>
        </div>
      </div>
    </>
  );
}
