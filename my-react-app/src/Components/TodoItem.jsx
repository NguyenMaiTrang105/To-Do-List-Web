const getColor = (priority) => {
  if (priority === "high") return "red";
  if (priority === "medium") return "gold";
  return "green";
};
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <li
        className="li"
        style={{
          borderLeft: `10px solid ${getColor(todo.priority)}`,
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className="todo-text"
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </span>

        <button onClick={() => onDelete(todo.id)}>X</button>
      </li>
    </div>
  );
}
