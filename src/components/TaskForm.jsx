import { useState } from "react";
import SelectionButton from "./SelectionButton";
import { Flag, Tag } from "lucide-react";

const initialTask = {
  title: "",
  category: "",
  priority: "",
  dueDate: "",
};

const options = {
  category: ["Work", "Shopping", "Fitness", "Study"],
  priority: ["High", "Medium", "Low"],
};

function TaskForm({ addTasks }) {
  const [formData, setFormData] = useState(initialTask);

  function _handleTitleChange(e) {
    const targetValue = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, title: targetValue }));
  }

  function onCategory(value) {
    setFormData((prevFormData) => ({...prevFormData, category: value}));
  }

  function onPriority(value) {
    setFormData((prevFormData) => ({...prevFormData, priority: value}));
  }

  function _formSubmit(e) {
    e.preventDefault();
    if (formData.title.trim() === "") {
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      category: formData.category,
      priority: formData.priority,
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
        onInput={_handleTitleChange}
      />
      <div className="flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-col justify-start gap-4">
          <SelectionButton
            title="Category"
            icon={<Tag size={18} />}
            options={options.category}
            selected={formData.category}
            onSelection={onCategory}
          />
          <SelectionButton
            title="Priority"
            icon={<Flag size={18} />}
            options={options.priority}
            selected={formData.priority}
            onSelection={onPriority}
          />
        </div>
        <button
          className="w-37.5 border border-gray-200 rounded-md p-2 bg-[#5750e4] text-white font-semibold self-end"
          type="submit"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
