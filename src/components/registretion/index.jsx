import axios from "axios";
import { useState, useEffect } from "react";

const URL = "http://localhost:3333/register"; // Указываем точный путь для регистрации

function Registretion() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Обработчик изменения полей формы

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  // Обработчик отправки формы
  async function registerUser(event) {
    event.preventDefault();
    try {
      const response = await axios.post(URL, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("User registered", response.data);
    } catch (error) {
      console.log("Error registered user", error);
    }
    const userPost = await axios.post(URL);
    return userPost.data;
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Registretion;
