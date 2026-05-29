import TaskCard from "./TaskCard";
import { emptyMessage } from "../constants/constants";

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  filterStatus,
}) {
  if (tasks.length === 0) {
    return (
      <span className="text-sm text-gray-500">
        {emptyMessage[filterStatus]}
      </span>
    );
  }
  return (
    <div className="flex flex-col gap-4 w-full">
      {tasks.map((item) => (
        <TaskCard
          onToggle={() => onToggleTask(item.id)}
          task={item}
          key={item.id}
          onDelete={() => onDeleteTask(item.id)}
          onEdit={() => onEditTask(item)}
        />
      ))}
    </div>
  );
}

export default TaskList;
