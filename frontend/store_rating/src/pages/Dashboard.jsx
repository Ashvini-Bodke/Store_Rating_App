import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {

    const fetchData = async () => {

      const token = localStorage.getItem("token");

      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(res.data);
    };

    fetchData();

  }, []);

  return (
    <div className="row">

      <div className="col-md-4">
        <div className="card text-center p-3 shadow">
          <h5>Total Users</h5>
          <h2>{data.totalUsers}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center p-3 shadow">
          <h5>Total Stores</h5>
          <h2>{data.totalStores}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-center p-3 shadow">
          <h5>Total Ratings</h5>
          <h2>{data.totalRatings}</h2>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;