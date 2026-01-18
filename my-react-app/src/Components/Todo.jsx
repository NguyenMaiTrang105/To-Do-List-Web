export default function Todo({
  input,
  setInput,
  onAdd,
  priority,
  setPriority,
}) {
  return (
    <div className="input-box">
      <input
        className="todo-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a work"
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={onAdd}>Add</button>
    </div>
  );
}
