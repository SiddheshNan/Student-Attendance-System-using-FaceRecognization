import React from "react";
import Swal from "sweetalert2";
import { PASSWORD, USERNAME, API_URL } from "../helpers";
import axios from "axios";

export default function AdminPage() {
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");


  const AddStud = (data) => {
    Swal.fire({
      title: "Enter Student Data",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Done",
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(`${API_URL}/add_student`, {
            params: {
              data: result.value,
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
      }
    });
  };


  const AddTeacher = async () => {
      try {
       const name = await Swal.fire({
            title: "Enter Teacher Name",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Done",
            allowOutsideClick: () => !Swal.isLoading(),
          })


        if (!name.isConfirmed) return;

          const email = await Swal.fire({
            title: "Enter Teacher Email",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Done",
            allowOutsideClick: () => !Swal.isLoading(),
          })


          if (!email.isConfirmed) return;


          const subject = await Swal.fire({
            title: "Enter Teacher Subject",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Done",
            allowOutsideClick: () => !Swal.isLoading(),
          })


          if (!subject.isConfirmed) return;


          const passwd = await Swal.fire({
            title: "Enter Teacher Password",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Done",
            allowOutsideClick: () => !Swal.isLoading(),
          })


          if (!passwd.isConfirmed) return;

          const {data} = await axios.post(`${API_URL}/teacher_add`, {
            name: name.value,
            email: email.value,
            subject: subject.value,
            password: passwd.value
          });

          Swal.fire({
            title: "Teacher add Success!",
            icon: "success",
          })



      } catch (error) {
        Swal.fire({
            title: "Somthing went wrong..",
            icon: "error",
          });
          console.log(error);
     
      }
  }

  if (!isLoggedin)
    return (
      <div className="w-full flex justify-center">
        <div className="bg-white shadow-xl border border-gray-400 rounded-lg px-8 pt-6 mt-16 pb-8 mb-4 flex flex-col">
          <div className="text-xl text-gray-800 font-bold text-center my-5">
            Admin Login
          </div>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              name="username"
              type="text"
              placeholder="Enter Username"
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
              onClick={() => {
                if (username != USERNAME) {
                  return Swal.fire({
                    title: "Invalid Username",
                    icon: "error",
                  });
                }

                if (password != PASSWORD) {
                  return Swal.fire({
                    title: "Invalid Password",
                    icon: "error",
                  });
                }
                setIsLoggedin(true);
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div>
        <nav className="flex items-center justify-center flex-wrap bg-indigo-500 py-5 shadow-md">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-3xl tracking-tight">
              Smart Attendance System [Admin]
            </span>
          </div>
        </nav>
      </div>

      <div class="grid grid-cols-1 gap-4 w-full mt-6">
        <div className=" flex w-full  flex-col justify-center items-center content-center">
          <button
            onClick={AddTeacher}
            className="mt-6 block bg-purple-500 text-white text-xl px-12 py-3 rounded-lg shadow-md"
          >
            Add Teacher in Database
          </button>

          <button
            onClick={AddStud}
            className="mt-6 block bg-green-500 text-white text-xl px-12 py-3 rounded-lg shadow-md"
          >
            Add New Student in Database
          </button>
        </div>
      </div>
    </>
  );
}
