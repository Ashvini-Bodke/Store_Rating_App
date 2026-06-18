import React, { useState, useEffect } from "react";
import axios from "axios";

function OwnerDashBoard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [dashboardRes, ratingsRes] = await Promise.all([
        axios.get("/api/owner/owner-dashboard", config),
        axios.get("/api/owner/ratings", config),
      ]);

      console.log("Dashboard:", dashboardRes.data);
      console.log("Ratings:", ratingsRes.data);

      // ✅ SAFE DATA HANDLING
      setStores(Array.isArray(dashboardRes.data) ? dashboardRes.data : []);
      setRatings(Array.isArray(ratingsRes.data) ? ratingsRes.data : []);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Store Owner Dashboard</h2>

      {/* ================= STORES ================= */}
      <div className="card mb-4">
        <div className="card-header bg-warning">
          <h4>My Stores & Average Ratings</h4>
        </div>

        <div className="card-body">
          {stores.length === 0 ? (
            <p className="text-muted">No stores found for this owner.</p>
          ) : (
            <div className="row">
              {stores.map((store) => (
                <div className="col-md-4 mb-3" key={store.id || store._id}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        {store.name || "Unnamed Store"}
                      </h5>

                      <div className="d-flex align-items-center">
                        <span className="fs-4 me-2">
                          {store.averageRating ?? "0.0"}
                        </span>
                        <span className="text-warning">★</span>

                        <span className="text-muted ms-2">
                          ({store.totalRatings ?? 0} ratings)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= RATINGS ================= */}
      <div className="card">
        <div className="card-header bg-info">
          <h4>Users Who Rated My Stores</h4>
        </div>

        <div className="card-body">
          {ratings.length === 0 ? (
            <p className="text-muted">No user ratings yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Rating</th>
                  </tr>
                </thead>

                <tbody>
                  {ratings.map((r, index) => (
                    <tr key={r.id || index}>
                      <td>{r.id || "-"}</td>
                      <td>{r.name || "-"}</td>
                      <td>{r.email || "-"}</td>
                      <td>
                        <span className="badge bg-warning">
                          {r.rating ?? 0} ★
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnerDashBoard;