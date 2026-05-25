function TaskCard({ task }) {
  const due = task.dueDate.split(",")[0];
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4">
      <h3 className={`text-lg ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
      <div className="flex gap-2">
        <span className="text-sm text-gray-500">{due}</span>
        {task.category ? <span className="text-sm text-gray-500">#{task.category}</span> : ''}
        {task.priority ? <span className="text-sm text-gray-500">#{task.priority}</span> : ''}
      </div>
    </div>
  );
}

export default TaskCard;
