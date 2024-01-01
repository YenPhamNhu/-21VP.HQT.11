import React, { useEffect, useState } from "react";
import axios from "axios";
import { style } from "@mui/system";

// export default function Statistique() {
//   return (
//     <div className='container mt-5'>
//       <div className='row'>
//         {/* Thống kê số lượng bệnh nhân */}
//         <div className='col-md-4'>
//           <div className='card'>
//             <div className='card-body'>
//               <h5 className='card-title'>Số lượng bệnh nhân</h5>
//               <p className='card-text'>100</p>
//             </div>
//           </div>
//         </div>

//         {/* Thống kê lịch hẹn */}
//         <div className='col-md-4'>
//           <div className='card'>
//             <div className='card-body'>
//               <h5 className='card-title'>Lịch hẹn</h5>
//               <p className='card-text'>50</p>
//             </div>
//           </div>
//         </div>

//         {/* Thống kê số tiền thu được */}
//         <div className='col-md-4'>
//           <div className='card'>
//             <div className='card-body'>
//               <h5 className='card-title'>Số tiền thu được</h5>
//               <p className='card-text'>$10,000</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function Statistique() {
  const [dashboardStats, setDashboardStats] = useState({
    dailyAppointments: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalRenvenue: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admins/getDashboardStats`
      );
      const { success, data, error } = response.data;

      if (success) {
        setDashboardStats(data);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className='container mt-5 mb-4'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Số lượt khám trong ngày</h5>
              <p className='card-text'>{dashboardStats.dailyAppointments}</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Tổng số bệnh nhân</h5>
              <p className='card-text'>{dashboardStats.totalPatients}</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Tổng số lịch hẹn</h5>
              <p className='card-text'>{dashboardStats.totalAppointments}</p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Số tiền thu được</h5>
              <p className='card-text'>
                {dashboardStats.totalRenvenue.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
