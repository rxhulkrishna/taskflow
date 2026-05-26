import TaskCard from "./TaskCard";

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {tasks.map((item) => (
        <TaskCard
          onToggle={() => onToggleTask(item.id)}
          task={item}
          key={item.id}
          onDelete={() => onDeleteTask(item.id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
