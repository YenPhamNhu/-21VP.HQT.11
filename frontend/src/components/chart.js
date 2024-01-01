import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const ChartComponent = () => {
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);

  useEffect(() => {
    fetchMonthlyAppointments();
  }, []);

  const fetchMonthlyAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admins/getMonthlyAppointments`
      );
      const { success, data, error } = response.data;

      if (success) {
        setMonthlyAppointments(data);
        drawChart(data);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const drawChart = (data) => {
    const ctx = document
      .getElementById("monthlyAppointmentsChart")
      .getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((entry) => `${entry.year} - ${entry.month}`),
        datasets: [
          {
            label: "Số lượt khám trong tháng",
            data: data.map((entry) => entry.appointmentCount),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      <h2>Thống kê lịch hẹn theo tháng</h2>
      <canvas id='monthlyAppointmentsChart' width='400' height='200'></canvas>
    </div>
  );
};

export default ChartComponent;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Chart from "chart.js/auto";

// const ChartComponent = () => {
//   const [monthlyAppointments, setMonthlyAppointments] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     fetchMonthlyAppointments(selectedYear);
//   }, [selectedYear]);

//   const fetchMonthlyAppointments = async (year) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/admins/getMonthlyAppointments?year=${year}`
//       );
//       const { success, data, error } = response.data;

//       if (success) {
//         setMonthlyAppointments(data);
//         drawChart(data);
//       } else {
//         console.error(error);
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const drawChart = (data) => {
//     const selectedYearData = data.filter(
//       (entry) => entry.year === selectedYear
//     );
//     const ctx = document
//       .getElementById("monthlyAppointmentsChart")
//       .getContext("2d");

//     new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: selectedYearData.map((entry) => entry.month),
//         datasets: [
//           {
//             label: "Monthly Appointments",
//             data: selectedYearData.map((entry) => entry.appointmentCount),
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   };

//   const handleYearChange = (newYear) => {
//     setSelectedYear(newYear);
//   };

//   return (
//     <div>
//       <h2>Monthly Appointments Statistics</h2>
//       <div>
//         <button onClick={() => handleYearChange(selectedYear - 1)}>
//           Previous Year
//         </button>
//         <span>{selectedYear}</span>
//         <button onClick={() => handleYearChange(selectedYear + 1)}>
//           Next Year
//         </button>
//       </div>
//       <canvas id='monthlyAppointmentsChart' width='400' height='200'></canvas>
//     </div>
//   );
// };

// export default ChartComponent;
