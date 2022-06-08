import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../helpers";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ViewStud({ subj }) {
  const [state, setState] = React.useState({});

  const ViewStud = () => {
    axios
      .get(`${API_URL}/view_stud`, {
        params: {
          subj: subj,
        },
      })
      .then(({ data }) => {
        setState(data.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "No Data Available to Show! Please Take Attendance First!",
          icon: "info",
        });
        console.log(error);
      });
  };

  React.useEffect(() => ViewStud(), []);

  const getData = () => {};
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

      <div class="grid grid-cols-1 gap-4 w-full mt-6">
        <div className=" flex w-full  flex-col justify-center items-center content-center">
          {Object.keys(state).map((key) => (
            <div className="block border-gray-500 text-xl border mb-5 p-3 rounded">
              {key} -{" "}
              <div>
                <MyPieChart
                  prsentCount={getCount(state[key])}
                  absentCount={31 - getCount(state[key])}
                />

                Attendance Level: {getStr(getCount(state[key]))}
                <br/>Present days: {getCount(state[key])} | Absent: {31 - getCount(state[key])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const getStr = (num) => {
  if (num > 27) return "Good";
  else if (num > 23) return "Average";
  else return "Poor";
};

const getCount = (arr) => arr.filter((item) => item == "Present").length;

function MyPieChart({ prsentCount, absentCount }) {
  return (
    <Pie
      data={{
        labels: ["Present", "Absent"],
        datasets: [
          {
            label: "# of Attendance",
            data: [prsentCount, absentCount],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}
