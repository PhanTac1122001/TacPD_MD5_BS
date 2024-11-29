import React from "react";

export default function Tab({ showOngoing, setShowOngoing }) {
  return (
    <>
      <div className="mb-4 pl-[600px]">
        <button
          onClick={() => setShowOngoing(true)}
          className={`px-4 py-2 mr-4 ${
            showOngoing ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
        >
          Đang Diễn Ra
        </button>
        <button
          onClick={() => setShowOngoing(false)}
          className={`px-4 py-2 ${
            !showOngoing ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
        >
          Đã Hoàn Thành
        </button>
      </div>
    </>
  );
}
