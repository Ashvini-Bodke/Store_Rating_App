import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/signup", data);

      alert("Signup Successful");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">

      <div className="card shadow-lg w-100" style={{ maxWidth: "400px", borderRadius: 10 }}>

        <div className="card-body">

          {/* Title */}
          <div className="text-center mb-4">
            <h3 className="fw-bold">Create Account</h3>
            <p className="text-muted">Sign up to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup}>

            <div className="mb-3">
              <label className="form-label text-muted">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter name"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter address"
                value={data.address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Signup"}
            </button>

          </form>

          {/* Footer */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer" }}
                className="text-primary fw-semibold"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;