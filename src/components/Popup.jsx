import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>{" "}
      <div className="bg-white p-6 rounded shadow-lg relative z-10">
        {" "}
        <h2 className="text-lg font-semibold">Notification</h2>
        <p>{message}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
