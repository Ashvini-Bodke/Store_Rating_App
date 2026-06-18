import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Stores from "./pages/Stores";
import MyRatings from "./pages/MyRatings";
import OwnerDashBoard from "./pages/OwnerDashBoard";



function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className="container mt-4">

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/ratings" element={<MyRatings/>} />
           <Route path="/owner-dashboard" element={<OwnerDashBoard/>} />


        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;