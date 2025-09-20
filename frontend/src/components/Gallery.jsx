import { useEffect, useState } from "react";
import Header from "./Header";

export default function Gallery() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/members")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMembers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 pt-28 px-6">
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-center text-blue-900 tracking-tight mb-14">
          Our <span className="text-blue-600">Members</span>
        </h1>

        {/* Cards Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {members.map((item) => (
            <div
              key={item._id}
              className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              {/* Image Section */}
              <div className="w-full h-auto overflow-hidden">
                <img
                  src={item.image}
                  alt={item.mname}
                  className="w-full h-96  transform group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition">
                  {item.mname}
                </h2>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mt-1">
                  {item.position}
                </p>
                <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
