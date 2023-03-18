import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
// import Navbar from './components/Navbar';
import Home from "./pages/Home";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLogin from "./pages/AdminLogin";
import AdmnLogout from "./pages/AdmnLogout";
import EmpLogout from "./pages/EmpLogout";
import { EmpServices, AddEmployee, ManageEmp } from "./pages/EmpServices";
import {
  LeaveMgnt,
  AllLeaves,
  PendingLeaves,
  ApprovedLeaves,
  NotApprovedLeaves,
} from "./pages/LeaveMgnt";
import { Leaves, LeaveApply, LeaveHistory } from "./pages/Leaves";
// import LeaveDetail from './pages/LeaveDetail';
function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/EmpServices" element={<EmpServices />} />
            <Route
              exact
              path="/EmpServices/AddEmployee"
              element={<AddEmployee />}
            />
            <Route
              exact
              path="/EmpServices/ManageEmp"
              element={<ManageEmp />}
            />
            <Route exact path="/LeaveMgnt" element={<LeaveMgnt />} />
            <Route exact path="/LeaveMgnt/AllLeaves" element={<AllLeaves />} />
            <Route
              exact
              path="/LeaveMgnt/PendingLeaves"
              element={<PendingLeaves />}
            />
            <Route
              exact
              path="/LeaveMgnt/ApprovedLeaves"
              element={<ApprovedLeaves />}
            />
            <Route
              exact
              path="/LeaveMgnt/NotApprovedLeaves"
              element={<NotApprovedLeaves />}
            />
            <Route exact path="/Leaves" element={<Leaves />} />
            <Route exact path="/Leaves/LeaveApply" element={<LeaveApply />} />
            <Route
              exact
              path="/Leaves/LeaveHistory"
              element={<LeaveHistory />}
            />
            <Route exact path="/EmployeeLogin" element={<EmployeeLogin />} />
            <Route exact path="/AdminLogin" element={<AdminLogin />} />
            <Route exact path="/AdmnLogout" element={<AdmnLogout />} />
            <Route exact path="/EmpLogout" element={<EmpLogout />} />
            {/* <Route exact path="/LeaveDetail" element={<LeaveDetail/>}/> */}
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
