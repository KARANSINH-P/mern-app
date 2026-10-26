import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const load = async () => setTodos((await axios.get(API)).data);
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!text.trim()) return;
    await axios.post(API, { text });
    setText("");
    load();
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <div>
      <h1>Todos</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.text} <button onClick={() => remove(t._id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}