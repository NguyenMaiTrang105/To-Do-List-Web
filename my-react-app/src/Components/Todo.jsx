export default function Todo({ input, setInput, onAdd }) {
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
      <button onClick={onAdd}>Add</button>
    </div>
  );
}
