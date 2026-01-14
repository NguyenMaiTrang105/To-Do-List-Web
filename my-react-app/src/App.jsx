import { useState, useEffect } from "react";
import "./App.css";
// vì compoenent con không được đụng vào state của cha
// nên cha phải đưa quyền cho con thông qua property
// react tạo virtualDOM tả UI mới sau đó so sánh với virtual dom cũ và chỉ ra chỗ cần sửa
// js thuần thì sẽ điều khiển browser trực tiếp qua DOM
function Todo({ input, setInput, onAdd }) {
  return (
    <>
      <input
        className="todo-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a work"
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
      />
      <button onClick={onAdd}>Add</button>
    </>
  );
}
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
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
  return (
    <>
      <h1>To do with me</h1>
      <Todo input={input} setInput={setInput} onAdd={handleAddTodo} />
      <ul>
        {list.map((item) => (
          <li
            className="li"
            key={item.id}
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                setList(
                  list.map((todo) =>
                    todo.id === item.id
                      ? { ...todo, completed: !todo.completed }
                      : todo
                  )
                )
              }
            />
            {item.text}
            <button
              onClick={() => {
                handleDeleteTodo(item.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
