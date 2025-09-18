export default function Header() {
  return (
    <>
      <div className="bg-white rounded-3xl max-w-240 p-3 m-4 text-white flex justify-between items-center">
        <h1 className="text-black font-mono font-medium text-2xl ">
          Nandavanam
        </h1>

        <nav>
          <ul>
            <li className="bg-gray-200 p-1 rounded-2xl inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              Home
            </li>
            <li className="inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              About
            </li>
            <li  className="inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              Contact
            </li>
            <li className="inline-block px-4 text-black font-semibold hover:text-cyan-900 cursor-pointer">
              Services
            </li>
          </ul>
        </nav>
        <div>
          <button className="bg-cyan-900 text-white px-4 py-2 rounded-3xl hover:bg-cyan-700">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
