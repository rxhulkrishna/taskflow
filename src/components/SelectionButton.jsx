const btnStyle =
  "border border-gray-200 text-sm text-gray-500 rounded-full p-2 hover:bg-blue-100 transition";

function SelectionButton({ title, icon, options, selected, onSelection }) {
  function handleClick(e, option) {
    e.preventDefault();
    if (selected === option) {
      onSelection("");
    } else {
      onSelection(option);
    }
  }

  if (!options) return;
  return (
    <div className="flex gap-6 items-baseline text-gray-500">
      <div className="flex gap-2 items-center w-20">
        <i>{icon}</i>
        <span className="text-sm">{title}</span>
      </div>
      <div className="flex gap-4 flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`${btnStyle} ${selected === option ? "bg-blue-100" : ""}`}
            onClick={(e) => handleClick(e, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectionButton;
