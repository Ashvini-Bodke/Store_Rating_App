import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" d-flex align-items-center justify-content-center">

      <div className="card shadow-lg w-100" style={{ maxWidth: "400px" ,borderRadius:10}}>

        <div className="card-body">

          {/* Title */}
          <div className="text-center mb-4">
            <h3 className="fw-bold">Store Rating App</h3>
            <p className="text-muted">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>

            <div className="mb-3">
              <label className="form-label text-muted">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="enter email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="enter password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-dark w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Footer */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Don’t have an account?{" "}
              <span
                style={{ cursor: "pointer" }}
                className="text-primary fw-semibold"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;