import { useState } from "react";

export default function Modal( {toggleModal} ) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Message Sent Successfully!
          </h2>
          <p className="mb-4">
            Thank you for reaching out to us. We will get back to you shortly.
          </p>
          
        </div>
      </div>
    </>
  );
}
