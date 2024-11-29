import React from "react";

export default function ListAction({ tasks, isOngoing, completeTask, handleUpdate, handleDelete  }) {
  const isDeadlineSoon = (deadlineTime) => {
    const currentTime = new Date();
    const deadline = new Date(deadlineTime);
    const timeDifference = deadline - currentTime;
    return timeDifference <= 12 * 60 * 60 * 1000 && timeDifference > 0; 
  };
  return (
    <>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">
          {isOngoing ? "Danh Sách Đang Diễn Ra" : "Danh Sách Đã Hoàn Thành"}
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Tên Công Việc
              </th>
              <th className="border border-gray-300 px-4 py-2">Bắt Đầu</th>
              <th className="border border-gray-300 px-4 py-2">Hạn</th>
              {isOngoing && (
                <th className="border border-gray-300 px-4 py-2">Hành Động</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={isDeadlineSoon(task.deadlineTime) ? "bg-red-300" : ""}>
                <td className="border border-gray-300 px-4 py-2">
                  {task.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.startTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.deadlineTime}
                </td>
                {isOngoing && (
                  <td className="border border-gray-300 px-4 py-2 ">
                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-5"
                    >
                      Hoàn Thành
                    </button>
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded mr-5"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded mr-5"
                    >
                      Xóa
                    </button>
                  </td>
                  
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
