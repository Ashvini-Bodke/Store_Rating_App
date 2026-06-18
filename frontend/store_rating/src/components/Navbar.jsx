import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg px-3">

      {/* BRAND */}
      <Link className="navbar-brand" to="/dashboard">
        Store Rating App
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse p-2" id="navbarNav">

        <ul className="navbar-nav me-auto">

          {/* ADMIN DASHBOARD */}
          {role === "ADMIN" && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/dashboard") ? "fw-bold text-warning" : ""}`}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/users") ? "fw-bold text-warning" : ""}`}
                  to="/users"
                >
                  Users
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/stores") ? "fw-bold text-warning" : ""}`}
                  to="/stores"
                >
                  Stores
                </Link>
              </li>
            </>
          )}

          {/* NORMAL USER */}
          {role === "USER" && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/stores") ? "fw-bold text-warning" : ""}`}
                  to="/stores"
                >
                  Stores
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/ratings") ? "fw-bold text-warning" : ""}`}
                  to="/ratings"
                >
                  My Ratings
                </Link>
              </li>
            </>
          )}

          {/* STORE OWNER */}
          {role === "OWNER" && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/owner-dashboard") ? "fw-bold text-warning" : ""}`}
                  to="/owner-dashboard"
                >
                  Owner Dashboard
                </Link>
              </li>
            </>
          )}

        </ul>

        {/* RIGHT SIDE AUTH */}
        <div className="d-flex align-items-center">

          {!token ? (
            <>
              <Link to="/login" className="btn btn-danger btn-sm me-2">
                Login
              </Link>

              <Link to="/signup" className="btn btn-danger btn-sm">
                Signup
              </Link>
            </>
          ) : (
            <button className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;