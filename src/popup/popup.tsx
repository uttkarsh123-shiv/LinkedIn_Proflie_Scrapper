import React, { useState } from "react";
import "./popup.css";
export default function Popup() {
  const [title, setTitle] = useState<string>("");

  const handleClick = () => {
    chrome.runtime.sendMessage({ action: "fetchTitle" }, (response) => {
      if (response?.title) {
        setTitle(response.title);
      }
    });
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-2 text-center">Page Title Picker</h1>
      <button
        onClick={handleClick}
        className="ml-16 mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 transition-colors duration-200"
      >
        Get Page Title
      </button>
      {title && (
        <div className=" m-2 p-2 bg-white rounded border border-gray-300 text-gray-800">
          {title}
        </div>
      )}
    </>
  );
}
