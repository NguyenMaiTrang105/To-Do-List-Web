import { useState } from "react";
// vì compoenent con không được đụng vào state của cha
// nên cha phải đưa quyền cho con thông qua property
// react tạo virtualDOM tả UI mới sau đó so sánh với virtual dom cũ và chỉ ra chỗ cần sửa
// js thuần thì sẽ điều khiển browser trực tiếp qua DOM
function Todo({ input, setInput, onAdd, onDelete }) {
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a work"
      />
      <button onClick={onAdd}>Add</button>
    </>
  );
}
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const handleAddTodo = () => {
    if (input.trim() === "") return;
    setList([...list, input]);
    setInput("");
  };
  function handleDeleteTodo(index) {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  }
  return (
    <>
      <h1>This is Mai Trang to do app</h1>
      <Todo input={input} setInput={setInput} onAdd={handleAddTodo} />
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button
              onClick={() => {
                handleDeleteTodo(index);
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
