import TaskCard from "./TaskCard";

function TaskList({tasks}) {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((item) => (
        <TaskCard task={item} key={item.id} />
      ))}
    </div>
  );
}

export default TaskList;