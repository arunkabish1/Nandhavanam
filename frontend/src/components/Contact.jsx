import Header from "./Header";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Modal from "./Modal.jsx";
import bg from '../assets/animatedbg.mp4'
export default function Contact() {
  const [isopen, setIsopen] = useState(false);

  const toggleModal = () => {
    setIsopen(!isopen);
    setTimeout(() => {
      setIsopen(false);
    }, 3000);
  };

  const form = useRef();
  const sentEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ib0r9ui", "template_ogr60ds", form.current, {
        publicKey: "tG1QiaaAEXThbq5BH",
      })
      .then(
        () => {
          console.log("message sent");
          toggleModal();
        },
        (error) => {
          console.log(error.text);
          alert("An error occurred, Please try again");
        }
      );
  };
  const resetDetails = () => {
    form.current.reset();
  };

  return (
    <>

      <div>
        <Header />
        <div>
          {/* <video 
  src={bg} 
  autoPlay 
  muted 
  loop 
  playsInline
  className="fixed top-0 left-0 w-full h-full object-cover -z-10"
/> */}

        </div>
        <div className="mt-16 flex flex-col justify-center items-center gap-2 text-center">
          <svg
            width="150"
            height="60"
            className=""
            viewBox="0 0 135 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.28794 27.8578L5.27878 28.3624C3.45454 29.3327 3.41572 29.3327 1.82436 30.3031L1.31978 30.6136C0.0389297 31.3899 -0.388022 33.0589 0.388253 34.3785C0.931645 35.3101 1.9408 35.7758 2.94996 35.6982C3.37691 35.6594 3.76505 35.5429 4.15318 35.3101L4.65776 34.9995C6.13269 34.1068 6.13268 34.1068 7.84049 33.2141L8.84965 32.7095C10.2081 32.0109 10.7127 30.3419 10.0141 29.0222C9.31541 27.6638 7.64642 27.1592 6.28794 27.8578Z"
              fill="#4D00FE"
            />
            <path
              d="M134.102 12.0995C132.665 10.2364 130.375 10.1588 128.163 10.0812C126.572 10.0424 124.903 9.96474 123.505 9.34372C121.021 8.25694 119.779 7.71355 118.576 7.17016C117.373 6.62677 116.131 6.12219 113.685 5.03541C112.288 4.41439 110.697 5.0354 110.076 6.43269C109.455 7.82998 110.076 9.42134 111.473 10.0424C113.957 11.1291 115.199 11.6726 116.402 12.2159C116.791 12.3712 117.179 12.5653 117.606 12.7205C117.373 12.7205 117.101 12.7205 116.868 12.7205C112.909 12.8758 108.795 13.1086 105.069 13.9237C102.662 11.983 99.4409 10.7798 96.1029 9.57659L95.5207 9.34372C91.8334 7.98524 87.3698 6.58795 82.2075 6.70439H81.703C77.5111 6.78202 73.1639 6.85964 68.8556 7.90761C65.6729 8.68388 62.8783 10.3141 60.3942 11.7502C59.1522 12.4488 57.9878 13.1475 56.8622 13.6909C56.5129 13.8461 56.1635 14.0014 55.853 14.1566C51.8552 13.6132 47.741 13.1475 43.4714 13.8073C38.969 14.5448 34.6219 15.9809 30.43 17.3782C29.7702 17.6111 29.1104 17.8051 28.4505 18.038C24.1422 19.4741 20.1444 21.2984 16.6511 22.9285C15.8361 23.3167 15.0598 23.666 14.2835 24.0153C12.925 24.6363 12.304 26.2665 12.925 27.625C13.546 28.9835 15.1762 29.6045 16.5347 28.9835C17.311 28.6341 18.1261 28.246 18.9412 27.8579C22.318 26.3053 26.1217 24.5199 30.1583 23.2002C30.8182 22.9673 31.478 22.7733 32.1766 22.5404C36.1745 21.2207 40.2887 19.8234 44.3253 19.1636C44.9852 19.0472 45.6838 18.9695 46.3437 18.9307C45.8391 19.3189 45.3733 19.7458 44.9075 20.1728C40.1335 25.0245 39.8618 30.342 44.1313 34.7667C48.2843 39.075 53.9123 39.929 60.0449 37.2508C65.2071 34.9608 71.1068 30.6913 72.1936 25.5291C72.6206 23.3943 72.2324 21.376 70.9904 19.6682C69.7095 17.8827 67.536 16.5243 64.5861 15.5927C66.4492 14.5448 68.2734 13.6132 70.2141 13.1087C73.9014 12.1771 77.938 12.1383 81.8582 12.0607H82.3628C86.5935 11.9831 90.4361 13.1863 93.6576 14.3507L94.2786 14.5836C95.7147 15.0882 97.0344 15.5927 98.2376 16.1361C94.3563 17.9216 91.484 20.0951 89.5434 21.8029C84.5364 26.3053 83.7601 32.3991 83.372 35.6594C82.8674 39.7737 83.6437 43.3834 85.5455 45.7898C87.0205 47.6529 89.1164 48.7397 91.6005 49.0114C92.2991 49.089 92.959 49.089 93.6576 49.0502C97.5002 48.7397 101.304 46.5273 104.487 42.6847C107.631 38.9198 108.484 33.9904 108.873 30.1091C108.911 29.7209 108.95 29.294 108.989 28.867C109.338 25.8007 109.726 22.1522 108.523 18.7755C111.24 18.3873 114.151 18.2321 117.023 18.1156C119.973 17.9992 123.389 18.5038 126.999 19.0472C127.154 19.086 127.27 19.086 127.426 19.1248C126.766 19.5517 125.912 19.8622 124.709 20.2504C122.69 20.9102 120.167 21.7253 117.295 23.8601C116.092 24.7528 115.82 26.4606 116.713 27.7026C117.295 28.4789 118.227 28.867 119.119 28.7894C119.624 28.7506 120.129 28.5953 120.556 28.246C122.729 26.6547 124.592 26.0336 126.416 25.4514C129.754 24.3646 133.17 23.239 134.761 16.796C134.917 16.1361 135.46 13.8849 134.102 12.0995ZM66.488 23.0062C66.7209 23.3167 66.9149 23.7436 66.7597 24.5587C66.2551 27.0428 62.4902 30.342 57.7937 32.3991C53.7571 34.1845 50.5744 33.7576 48.0515 31.1182C46.5765 29.6045 45.3345 27.7026 48.7889 24.1706C50.3027 22.618 53.0196 21.4536 55.853 20.1728C56.0859 20.0563 56.3576 19.9399 56.5905 19.8622C57.2503 19.9399 57.9101 20.0563 58.57 20.1339C64.3144 20.7938 66.0222 22.3851 66.488 23.0062ZM103.555 28.4013C103.516 28.8282 103.477 29.2552 103.4 29.6821C102.934 34.301 101.964 37.2508 100.256 39.3079C98.7422 41.0934 95.7147 44.082 92.1439 43.6939C91.0959 43.5774 90.3584 43.1893 89.815 42.4907C88.8447 41.2486 88.4566 39.075 88.8059 36.4357C89.2716 32.7484 89.9703 28.867 93.1918 25.9948C95.2102 24.1706 98.5481 21.7641 103.167 20.1339C104.215 22.4239 103.866 25.4514 103.555 28.4013Z"
              fill="#4D00FE"
            />
            <path
              d="M42.3071 40.7052C42.1518 40.7052 41.9578 40.6664 41.8025 40.5887C35.0101 36.9402 35.1266 28.867 35.1654 28.5177C35.1654 28.0131 35.5923 27.6249 36.0969 27.6249C36.6015 27.6249 36.9896 28.0519 36.9896 28.5565C36.9896 28.6341 36.912 35.8923 42.6952 38.9974C43.1222 39.2303 43.3163 39.7736 43.0834 40.2394C42.8893 40.5111 42.6176 40.6664 42.3071 40.7052Z"
              fill="#151201"
            />
            <path
              d="M94.7056 4.10384C94.5504 4.10384 94.4339 4.10383 94.2787 4.0262C85.468 0.300086 72.1549 2.39604 72.0384 2.43485C71.5338 2.51248 71.0681 2.16315 70.9904 1.69738C70.9128 1.1928 71.2621 0.727032 71.7279 0.649405C72.3101 0.571778 85.662 -1.56297 94.9773 2.35722C95.4431 2.55129 95.676 3.09467 95.4819 3.56044C95.3655 3.87095 95.055 4.06502 94.7056 4.10384Z"
              fill="#151201"
            />
            <path
              d="M100.178 6.00575C100.062 6.00575 99.9066 6.00574 99.7902 5.92811L98.1988 5.30708C97.7331 5.11301 97.5002 4.60843 97.6942 4.14267C97.8883 3.6769 98.3929 3.44403 98.8587 3.63809L100.45 4.25913C100.916 4.4532 101.149 4.95778 100.955 5.42354C100.838 5.77286 100.528 5.96693 100.178 6.00575Z"
              fill="#151201"
            />
          </svg>
          <h1 className="text-center text-4xl font-semibold font-serif ">
            {" "}
            Get in Touch!{" "}
          </h1>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="icons flex justify-center space-x-6 mb-6">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 text-3xl"
            >
              <FaInstagram />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 text-3xl"
            >
              <FaTwitter />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 text-3xl"
            >
              <FaFacebook />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 text-3xl"
            >
              <FaYoutube />
            </a>

            {isopen && <Modal />}
          </div>
          <form
            ref={form}
            onSubmit={sentEmail}
            className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="user_name"
                type="text"
                placeholder="Kabish Muthu"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="user_email"
                type="email"
                placeholder="example@email.com"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                rows="4"
                placeholder="Leave your Message"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                value="Send"
                className="bg-black  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-3xl hover:scale-105  focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Message
              </button>
              <button
                className="bg-gray-800  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-3xl hover:scale-105  focus:outline-none focus:shadow-outline"
                onClick={resetDetails}
                type="reset"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="mt-10 text-center text-gray-600">
          <p>
            Made with ❤️ | Developed by <strong>Arun J</strong>
          </p>
        </div>
      </div>
    </>
  );
}
