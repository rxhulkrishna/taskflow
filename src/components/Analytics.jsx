function Analytics({ data }) {
  return (
    <div>
      <div className="flex flex-col bg-white p-6 rounded-xl gap-4">
        <h2 className="text-xl">Task Overview</h2>
        <div className="flex flex-col text-sm text-gray-700">
          {data.all !== 0 ? (
            <>
              <span>All : {data.all}</span>
              <span>Completed : {data.completed}</span>
              <span>Pending : {data.pending}</span>
            </>
          ) : (
            <span>No tasks.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
