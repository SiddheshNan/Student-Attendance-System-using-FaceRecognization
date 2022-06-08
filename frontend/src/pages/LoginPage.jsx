import React from "react";
import axios from "axios";
import { API_URL } from "../helpers";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function LoginPage({ setLoginStatus, isLoggedin }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  let history = useHistory();

  const LoginUser = async (e) => {
    e.preventDefault();

    try {
    const {data} = await axios.post(`${API_URL}/teacher_login`, {
        email: username,
        password: password,
      });
      setLoginStatus({
        isLoggedin: true,
        email: username,
        name:  data.name,
        password:  data.password,
        subject:  data.subject,
      })
      history.push("/dashboard");

    } catch (e) {
      console.log(e);
      Swal.fire({
          title:e.response.data.error,
          icon: 'error'
      })
     
    }
  };


  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-xl border border-gray-400 rounded-lg px-8 pt-6 mt-16 pb-8 mb-4 flex flex-col">
        <div className="text-xl text-gray-800 font-bold text-center my-5">
          Teacher Login
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            name="username"
            type="email"
            placeholder="Enter Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full content-center justify-between">
          <button
            className="flex self-center bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            type="button"
            onClick={LoginUser}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
