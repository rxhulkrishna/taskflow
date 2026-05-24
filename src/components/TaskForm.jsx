import { useState } from "react";

const initialTask = {
  title: "",
  category: "",
  priority: "",
  dueDate: "",
};

function TaskForm({ addTasks }) {
  const [formData, setFormData] = useState(initialTask);

  function _handleTaskTitle(e) {
    const targetValue = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, title: targetValue }));
  }

  function _formSubmit(e) {
    e.preventDefault();
    if(formData.title.trim() === '') {
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      category: "Work",
      priority: "Low",
      completed: false,
      dueDate: "May 24, 2026",
    };
    addTasks((prevTasks) => [...prevTasks, newTask]);
    setFormData(initialTask);
  }

  return (
    <form
      className="bg-white w-full flex flex-col gap-4 p-4 border border-gray-200 rounded-xl shadow-md"
      onSubmit={_formSubmit}
    >
      <input
        className="border border-gray-200 p-4 pb-12 outline-none rounded-xl"
        type="text"
        placeholder="What do you want to accomplish?"
        value={formData.title}
        onInput={_handleTaskTitle}
      />
      <div className="flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-row justify-start gap-4">
          <button type="button" className="text-sm font-light w-20">
            Category
          </button>
          <button type="button" className="text-sm font-light w-20">
            Priority
          </button>
        </div>
        <button
          className="w-37.5 border border-gray-200 rounded-md p-2 bg-[#5750e4] text-white font-semibold"
          type="submit"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
