import { Calendar, EditIcon, Trash } from "lucide-react";

function TaskCard({ task, onToggle, onDelete, onEdit }) {
  function getPriorityStyles() {
    if (task.priority === "High") {
      return "bg-red-100 text-red-500";
    }
    if (task.priority === "Medium") {
      return "bg-yellow-100 text-yellow-500";
    }
    if (task.priority === "Low") {
      return "bg-green-100 text-green-500";
    }
    return "bg-gray-100 text-gray-500";
  }

  return (
    <div className="group bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2 w-full transition hover:opacity-80">
      <div className="flex items-center gap-3">
        <input
          className="size-5"
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggle()}
        />
        <label
          htmlFor={`task-${task.id}`}
          className={`transition group-hover:text-blue-600 text-lg font-semibold w-max ${task.completed ? "line-through" : ""}`}
        >
          {task.title}
        </label>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex gap-4 text-sm text-gray-500 items-center">
            <div className="flex gap-1 items-center">
              <Calendar size="16" />
              <span>{task.dueDate}</span>
            </div>
            {task.category && <span>#{task.category}</span>}
          </div>
        </div>
        {task.priority && (
          <span
            className={`text-sm text-gray-500 md:ml-auto w-max p-1 h-max rounded-md ${getPriorityStyles()}`}
          >
            {task.priority}
          </span>
        )}
        <div className="flex gap-3">
          <button type="button" onClick={() => onEdit()}>
            <EditIcon size="18" />
          </button>
          <button type="button" onClick={() => onDelete()}>
            <Trash size="18" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
