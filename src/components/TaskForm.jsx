import { useState } from "react";
import SelectionButton from "./SelectionButton";
import { Flag, Plus, Tag } from "lucide-react";
import { options, dateOptions } from "../constants/constants";

const initialTask = {
  title: "",
  category: "",
  priority: "",
  dueDate: "",
};

function TaskForm({ onAddTask, editTask, onEditTask }) {
  const [formData, setFormData] = useState(editTask || initialTask);

  function handleChange(field, value) {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: value }));
  }

  function onCancel() {
    onEditTask(null);
    setFormData(initialTask);
  }

  function formSubmit(e) {
    e.preventDefault();
    if (formData.title.trim() === "") {
      return;
    }

    if (editTask) {
      onAddTask((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask.id ? { ...task, ...formData } : task,
        ),
      );
    } else {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", dateOptions);
      const newTask = {
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        category: formData.category,
        priority: formData.priority ? formData.priority : "Low",
        completed: false,
        dueDate: formattedDate,
      };
      onAddTask((prevTasks) => [...prevTasks, newTask]);
    }
    setFormData(initialTask);
  }

  return (
    <form
      className="bg-white w-full flex flex-col gap-4 p-4 rounded-xl shadow-md"
      onSubmit={formSubmit}
    >
      <input
        className="border border-gray-200 p-4 pb-12 outline-none rounded-xl"
        type="text"
        placeholder="What do you want to accomplish?"
        value={formData.title}
        onChange={({ target }) => handleChange("title", target.value)}
      />
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="flex flex-col justify-start gap-4">
          <SelectionButton
            title="Category"
            icon={<Tag size={18} />}
            options={options.category}
            selected={formData.category}
            onSelection={(value) => handleChange("category", value)}
          />
          <SelectionButton
            title="Priority"
            icon={<Flag size={18} />}
            options={options.priority}
            selected={formData.priority}
            onSelection={(value) => handleChange("priority", value)}
          />
        </div>
        <div className="flex gap-2 text-sm lg:self-end">
          <button
            className="border border-gray-200 rounded-md p-2 gap-2 bg-[#5750e4] text-white font-semibold flex items-center w-max justify-center"
            type="submit"
          >
            <Plus size="18" />
            {editTask ? "Edit Task" : "Add Task"}
          </button>
          {editTask ? (
            <button
              className="border border-gray-200 rounded-md p-2 gap-2 bg-gray-500 text-white font-semibold flex items-center w-max justify-center"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
