import { useState, useEffect } from "react";
import "./App.css";
// vì compoenent con không được đụng vào state của cha
// nên cha phải đưa quyền cho con thông qua property
// react tạo virtualDOM tả UI mới sau đó so sánh với virtual dom cũ và chỉ ra chỗ cần sửa
// js thuần thì sẽ điều khiển browser trực tiếp qua DOM
function Todo({ input, setInput, onAdd }) {
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
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <li className="li">
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
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const counter = list.filter((todo) => todo.completed === false).length;
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
  }, [list]);
  const handleAddTodo = () => {
    if (input.trim() === "") return;
    // tạo 1 mảng mới
    setList([
      ...list,
      // lưu các todo vào list và tạo 1 todo mới (object)
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);
    setInput("");
  };
  function handleDeleteTodo(id) {
    setList(list.filter((todo) => todo.id !== id));
  }
  function handleToggleTodo(id) {
    setList(
      list.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div className="app">
      <h1>To do with me</h1>
      <p>Tasks left: {counter}</p>
      <Todo input={input} setInput={setInput} onAdd={handleAddTodo} />
      <ul>
        {list.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
export default App;
