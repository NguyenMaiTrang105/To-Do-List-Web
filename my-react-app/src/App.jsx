import { useState, useEffect } from "react";
import "./App.css";
// vì compoenent con không được đụng vào state của cha
// nên cha phải đưa quyền cho con thông qua property
// react tạo virtualDOM tả UI mới sau đó so sánh với virtual dom cũ và chỉ ra chỗ cần sửa
// js thuần thì sẽ điều khiển browser trực tiếp qua DOM
import Todo from "./Components/Todo";
import TodoItem from "./Components/TodoItem";
import Countdown from "./Components/Countdown";
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const [time, setTime] = useState(1500);
  const [state, setState] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  useEffect(() => {
    if (!state) return;
    if (time === 0) {
      setState(false);
      return;
    }
    const id = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [state, time]);
  function handleToggle() {
    setState(!state);
  }
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
      <Countdown
        time={time}
        isRunning={state}
        customMinutes={customMinutes}
        setCustomMinutes={setCustomMinutes}
        onToggle={handleToggle}
        onSetTime={() => {
          setTime(customMinutes * 60);
          setState(false);
        }}
      />

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
