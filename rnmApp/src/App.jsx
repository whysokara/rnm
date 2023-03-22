import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <span>Username</span>
        <input type="text" name="username" onChange={handleForm} />
        <span>Password</span>
        <input type="text" name="password" onChange={handleForm} />
        <input type="submit" />
      </form>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.username},{user.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
