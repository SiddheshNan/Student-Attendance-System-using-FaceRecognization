import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../helpers";
import axios from "axios";

export default function DashboardPage({ isLoggedin, state, setState }) {
  let history = useHistory();

//   React.useEffect(() => !isLoggedin && history.push("/login"), [isLoggedin]);

  const TakeAttn = () => {
    axios
      .get(`${API_URL}/take_attendance`, {
        params: {
          subject: state.subject,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Camera Starting! Please Wait..",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Somthing went wrong..",
          icon: "error",
        });
        console.log(error);
      });
  };





  return (
    <>
      <div>
        <nav className="flex items-center justify-center flex-wrap bg-indigo-500 py-5 shadow-md">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-3xl tracking-tight">
              🚀 Smart Attendance System
            </span>
          </div>
        </nav>
      </div>

      <div class="grid grid-cols-2 gap-4 w-full mt-6">
        <div className=" flex w-full  flex-col justify-center items-center content-center">
          <button
            onClick={TakeAttn}
            className="mt-6 block bg-blue-500 text-white text-xl px-12 py-3 rounded-lg shadow-md"
          >
            Take Student Attendance
          </button>

          <a
            href={`http://localhost:8080/excel/attendance-${state.subject}.xlsx`}
            className="mt-6 block bg-green-500 text-white text-xl px-12 py-3 rounded-lg shadow-md"
            download={true}
          >
            Download Excel Sheet
          </a>

          <button
            onClick={() => history.push("/stud")}
            className="mt-6 block bg-purple-500 text-white text-xl px-12 py-3 rounded-lg shadow-md"
          >
            View Attendance
          </button>
        </div>

        <div className=" p-6 flex w-full text-3xl text-center border-gray-500 rounded-lg text-gray-800 border flex-col justify-center items-center content-center">
          🏫
          <br />
          Teacher Name: {state.name} <br />
          Subject: {state.subject}
          <br />
          Email: {state.email}
          <br />
          <span
              onClick={() => {
                localStorage.removeItem("app_state_attn");
                setState({
                  isLoggedin: false,
                  email: "",
                  name: "",
                  password: "",
                  subject: "",
                });
                window.location.reload();
              }}
              className="mt-4 bg-red-500 cursor-pointer text-white px-4 shadow-md py-2 font-bold text-xl rounded-lg"
            >
              Logout
            </span>
        </div>
      </div>
    </>
  );
}
