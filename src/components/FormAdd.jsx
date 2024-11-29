import React, { useEffect, useState } from "react";

import Tab from "./Tab";
import ListAction from "./ListAction";

export default function FormAdd() {
  const [actions, setActions] = useState(() => {
    const actionsLocal = JSON.parse(localStorage.getItem("actions")) || [];
    return actionsLocal;
  });
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [error, setError] = useState("");
  const [showOngoing, setShowOngoing] = useState(true); 
  const [editingTask, setEditingTask] = useState(null); 

  const ongoingTasks = actions.filter((task) => !task.completed);
  const completedTasks = actions.filter((task) => task.completed);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "taskTitle") {
      setTitle(value);
    } else if (id === "startTime") {
      setStartTime(value);
    } else if (id === "deadlineTime") {
      setDeadlineTime(value);
    }
  };
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStartTime(editingTask.startTime);
      setDeadlineTime(editingTask.deadlineTime);
    }
  }, [editingTask]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startTime || !deadlineTime) {
      setError("Vui lòng điền vào tất cả các trường.");
      return;
    }

    const selectedStartTime = new Date(startTime);
    const selectedDeadlineTime = new Date(deadlineTime);
    if (selectedDeadlineTime <= selectedStartTime) {
      setError("Thời gian kết thúc phải lớn hơn thời gian bắt đầu.");
      return;
    }

    if (editingTask) {
     
      const updatedActions = actions.map((task) =>
        task.id === editingTask.id
          ? { ...task, title, startTime, deadlineTime }
          : task
      );
      setActions(updatedActions);
      localStorage.setItem("actions", JSON.stringify(updatedActions));
      setEditingTask(null); 
    } else {
      
      const newAction = {
        id: Date.now(),
        title,
        startTime,
        deadlineTime,
        completed: false,
      };
      const updatedActions = [...actions, newAction];
      setActions(updatedActions);
      localStorage.setItem("actions", JSON.stringify(updatedActions));
    }

    setTitle("");
    setStartTime("");
    setDeadlineTime("");
    setError("");
  };

  const handleUpdate = (taskId) => {
    const taskToEdit = actions.find((task) => task.id === taskId);
    setEditingTask(taskToEdit); 
  };

  const handleDelete = (taskId) => {
    const updatedActions = actions.filter((task) => task.id !== taskId);
    setActions(updatedActions);
    localStorage.setItem("actions", JSON.stringify(updatedActions));
  };
  const completeTask = (taskId) => {
    const updatedActions = actions.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setActions(updatedActions);
    localStorage.setItem("actions", JSON.stringify(updatedActions));
  };

  return (
    <>
      <Tab showOngoing={showOngoing} setShowOngoing={setShowOngoing} />
      <div id="taskForm" className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {editingTask ? "Cập Nhật Công Việc" : "Thêm Công Việc"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            id="taskTitle"
            type="text"
            placeholder="Tên công việc"
            value={title}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            id="deadlineTime"
            type="datetime-local"
            value={deadlineTime}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            id="addTask"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingTask ? "Cập Nhật Công Việc" : "Thêm Công Việc"}
          </button>
        </div>
        {error && (
          <p id="error" className="text-red-500 mt-2">
            {error}
          </p>
        )}
      </div>

      
      <ListAction
        tasks={showOngoing ? ongoingTasks : completedTasks}
        isOngoing={showOngoing}
        completeTask={completeTask}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </>
  );
}
