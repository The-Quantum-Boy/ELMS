import React, { useState, useEffect } from "react";
// import { useParams,useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import EmpNav from "../components/EmpNav";
import { Table } from "react-bootstrap";
import moment from "moment";
import { Loading } from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";

// import { io } from "socket.io-client";

export const Leaves = () => {
  // let {email}=useParams();
  // let {location}=useLocation();
  // console.log("email2",props.location.state.email);
  // // console.log("email",email);
  const [employeeData, setEmployeeData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [loader, setLoader] = useState(false);
  let empIds;
  let emply;
  let remleave;
  let count;
  // const [empUser,setEmpUser]=useState("");
  const callHistoryPage = async () => {
    try {
      const res = await fetch("/allLeaves", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setLeaveData(data);
      setLoader(true);
      console.log();
      // setEmpUser(data.empId);
      if (!res.status === 200) {
        const error = new Error(res.err);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/Login");
    }
  };
  const fetchEmpDetails = async () => {
    try {
      const res = await fetch("/getEmpDetail", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(JSON.stringify(data), "format");
      setEmployeeData(data);
      if (!res.status === 200) {
        const error = new Error(res.err);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/Login");
    }
  };

  if (leaveData) {
    empIds = leaveData.map((leave) => leave.empId);
  }

  if (employeeData) {
    emply = employeeData
      .filter((emp) => empIds.includes(emp.empId))
      .map((emp) => emp.leaveNum);
  }
  const maxTakenLeave = leaveData.length;

  remleave = emply[0] - maxTakenLeave;
  count = leaveData.filter((leave) => leave.status === 1).length;

  console.log(empIds[0]);
  console.log(emply[0]);

  useEffect(() => {
    callHistoryPage();
    fetchEmpDetails();
  }, []);

  return (
    <>
      <EmpNav empData={leaveData} />
      {loader ? (
        <div
          className="border shadow-lg bg-white rounded mx-auto px-5 mt-5"
          style={{ width: "65%", height: "90%" }}
        >
          <div className="mt-3 mb-3 ml-3">
            <div style={{ display: "flex", marginLeft: "" }}>
              <h5>Leave History</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "350px",
                }}
              >
                Total Leaves
                <Button variant="outline-info">{emply[0]}</Button>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "50px",
                }}
              >
                {" "}
                Remaning Leaves
                <Button variant="outline-info">{remleave}</Button>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "50px",
                }}
              >
                {" "}
                Approved Leaves
                <Button variant="outline-info">{count}</Button>{" "}
              </div>
            </div>
          </div>
          <div className="app-container">
            <form>
              <form method="GET">
                <Table bordered hover responsive>
                  <thead className="">
                    <tr className="">
                      <th>No</th>

                      <th>Leave type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Description</th>
                      <th>Posting Date</th>
                      <th>Admin Remark</th>
                      <th>Status</th>
                      <th>Leave Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveData.map((leaves, index) => (
                      <tr className="">
                        <td key={index}>{index + 1}</td>
                        <td>{leaves.leaveType}</td>
                        <td>{moment(leaves.fromDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(leaves.toDate).format("DD/MM/YYYY")}</td>
                        <td>{leaves.description}</td>
                        <td>
                          {moment(leaves.postingDate).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {(() => {
                            if (leaves.adminRemark === 1) {
                              return (
                                <>
                                  <i>{leaves.adminRemarkDesc}</i> <br />
                                  <b>
                                    <i>at</i>
                                  </b>{" "}
                                  {moment(leaves.postingDate).format(
                                    "DD/MM/YYYY"
                                  )}
                                </>
                              );
                            } else if (leaves.adminRemark === 0) {
                              return (
                                <>
                                  <i>Not Approved</i>{" "}
                                </>
                              );
                            } else if (leaves.status === 2) {
                              return (
                                <>
                                  <i>Waiting for approval</i>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <i>Waiting for Approval</i>{" "}
                                </>
                              );
                            }
                          })()}
                        </td>

                        <td>
                          {(() => {
                            if (leaves.status === 1) {
                              return (
                                <>
                                  <b style={{ color: "#3CB371" }}>Approved</b>
                                </>
                              );
                            } else if (leaves.status === 2) {
                              return (
                                <>
                                  <b style={{ color: "#4B0082" }}>
                                    Waiting for approval
                                  </b>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <b style={{ color: "red" }}>Not Approved</b>
                                </>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {leaves.takenLeave >
                          employeeData.find((emp) => emp.empId === leaves.empId)
                            ?.leaveNum ? (
                            <b style={{ color: "red" }}>Unpaid</b>
                          ) : (
                            <b style={{ color: "#3CB371" }}>Paid</b>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </form>
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export const LeaveApply = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const [leave, setLeave] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
  });
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setLeave({ ...leave, [name]: value }); //here name is property
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { leaveType, fromDate, toDate, description } = leave;
    const res = await fetch("/addLeave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leaveType,
        fromDate,
        toDate,
        description,
      }),
    });
    const data = await res.json();
    console.log(data, "this is empid data");

    if (res.status === 201) {
      toast.success("Leave applied Successfully.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLeave({
        ...leave,
        leaveType: "",
        fromDate: "",
        toDate: "",
        description: "",
      });
      // window.alert("Leave applied successfully");
      console.log("leave applied successfully");
    } else if (res.status === 422) {
      toast.warn("please fill the field properly!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("please fill the fields properly");
    } else {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // window.alert("Employee invalid Registration");
      // console.log("Invalide registration");
      // navigate("/Login");//if successfull then redirect to login page
    }
  };

  const fetchEmpDetails = async () => {
    try {
      const res = await fetch("/getEmpDetail", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setEmployeeData(data);
      if (!res.status === 200) {
        const error = new Error(res.err);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/Login");
    }
  };

  useEffect(() => {
    fetchEmpDetails();
  }, []);

  return (
    <>
      <EmpNav empData={employeeData} />
      <div
        className=" shadow-lg bg-white rounded mx-auto px-5 mt-5"
        style={{ width: "60%" }}
      >
        <Form method="POST">
          <label className="my-4">
            {" "}
            <div style={{ display: "flex" }}>
              <h2>Apply For Leave</h2>
            </div>
          </label>

          <FloatingLabel
            controlId="floatingSelect"
            label="Select leave type..."
          >
            <Form.Select
              name="leaveType"
              value={leave.leaveType}
              autocomplete="off"
              onChange={handleInput}
            >
              <option selected></option>
              <option>Casual</option>
              <option>Medical Leave</option>
              <option>Restricted Hollydays(RH)</option>
            </Form.Select>
          </FloatingLabel>
          <div className="row my-5">
            <div className="col">
              <Form.Group controlId="dob">
                <Col>
                  <FloatingLabel
                    controlId="floatdate"
                    label="From"
                    className="mb-3"
                  >
                    <Form.Control
                      type="date"
                      name="fromDate"
                      value={leave.fromDate}
                      onChange={handleInput}
                      placeholder="from"
                    />
                  </FloatingLabel>
                </Col>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="dob">
                <Col>
                  <FloatingLabel
                    controlId="floatdate"
                    label="To"
                    className="mb-3"
                  >
                    <Form.Control
                      type="date"
                      name="toDate"
                      value={leave.toDate}
                      onChange={handleInput}
                      placeholder="from"
                    />
                  </FloatingLabel>
                </Col>
              </Form.Group>
            </div>
          </div>
          <FloatingLabel controlId="floatingTextarea2" label="">
            {/* <Form.Control
              as="textarea"
              name="description"
              value={leave.description}
           
              style={{ height: '100px' }}
            /> */}
            <textarea
              name="description"
              style={{
                height: "100px",
                width: "100%",
                padding: "20px",
                borderColor: "LightGray",
              }}
              value={leave.description}
              onChange={handleInput}
              placeholder="Description"
            ></textarea>
          </FloatingLabel>
          <Button
            className="mt-4 mb-5 sm-lg"
            size="lg"
            variant="secondary"
            onClick={PostData}
          >
            Submit
          </Button>
        </Form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export const LeaveHistory = () => {
  // let {email}=useParams();
  // let {location}=useLocation();
  // console.log("email2",props.location.state.email);
  // // console.log("email",email);
  const [employeeData, setEmployeeData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [loader, setLoader] = useState(false);
  let empIds;
  let emply;
  let remleave;
  let count;
  // const [empUser,setEmpUser]=useState("");
  const callHistoryPage = async () => {
    try {
      const res = await fetch("/allLeaves", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setLeaveData(data);
      setLoader(true);
      console.log();
      // setEmpUser(data.empId);
      if (!res.status === 200) {
        const error = new Error(res.err);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/Login");
    }
  };
  const fetchEmpDetails = async () => {
    try {
      const res = await fetch("/getEmpDetail", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(JSON.stringify(data), "format");
      setEmployeeData(data);
      if (!res.status === 200) {
        const error = new Error(res.err);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/Login");
    }
  };

  if (leaveData) {
    empIds = leaveData.map((leave) => leave.empId);
  }

  if (employeeData) {
    emply = employeeData
      .filter((emp) => empIds.includes(emp.empId))
      .map((emp) => emp.leaveNum);
  }
  const maxTakenLeave = leaveData.length;

  remleave = emply[0] - maxTakenLeave;
  count = leaveData.filter((leave) => leave.status === 1).length;

  console.log(empIds[0]);
  console.log(emply[0]);

  useEffect(() => {
    callHistoryPage();
    fetchEmpDetails();
  }, []);

  return (
    <>
      <EmpNav empData={leaveData} />
      {loader ? (
        <div
          className="border shadow-lg bg-white rounded mx-auto px-5 mt-5"
          style={{ width: "65%", height: "90%" }}
        >
          <div className="mt-3 mb-3 ml-3">
            <div style={{ display: "flex", marginLeft: "" }}>
              <h5>Leave History</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "350px",
                }}
              >
                Total Leaves
                <Button variant="outline-info">{emply[0]}</Button>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "50px",
                }}
              >
                {" "}
                Remaning Leaves
                <Button variant="outline-info">{remleave}</Button>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "50px",
                }}
              >
                {" "}
                Approved Leaves
                <Button variant="outline-info">{count}</Button>{" "}
              </div>
            </div>
          </div>
          <div className="app-container">
            <form>
              <form method="GET">
                <Table bordered hover responsive>
                  <thead className="">
                    <tr className="">
                      <th>No</th>

                      <th>Leave type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Description</th>
                      <th>Posting Date</th>
                      <th>Admin Remark</th>
                      <th>Status</th>
                      <th>Leave Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveData.map((leaves, index) => (
                      <tr className="">
                        <td key={index}>{index + 1}</td>
                        <td>{leaves.leaveType}</td>
                        <td>{moment(leaves.fromDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(leaves.toDate).format("DD/MM/YYYY")}</td>
                        <td>{leaves.description}</td>
                        <td>
                          {moment(leaves.postingDate).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {(() => {
                            if (leaves.adminRemark === 1) {
                              return (
                                <>
                                  <i>{leaves.adminRemarkDesc}</i> <br />
                                  <b>
                                    <i>at</i>
                                  </b>{" "}
                                  {moment(leaves.postingDate).format(
                                    "DD/MM/YYYY"
                                  )}
                                </>
                              );
                            } else if (leaves.adminRemark === 0) {
                              return (
                                <>
                                  <i>Not Approved</i>{" "}
                                </>
                              );
                            } else if (leaves.status === 2) {
                              return (
                                <>
                                  <i>Waiting for approval</i>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <i>Waiting for Approval</i>{" "}
                                </>
                              );
                            }
                          })()}
                        </td>

                        <td>
                          {(() => {
                            if (leaves.status === 1) {
                              return (
                                <>
                                  <b style={{ color: "#3CB371" }}>Approved</b>
                                </>
                              );
                            } else if (leaves.status === 2) {
                              return (
                                <>
                                  <b style={{ color: "#4B0082" }}>
                                    Waiting for approval
                                  </b>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <b style={{ color: "red" }}>Not Approved</b>
                                </>
                              );
                            }
                          })()}
                        </td>
                        <td>
                          {leaves.takenLeave >
                          employeeData.find((emp) => emp.empId === leaves.empId)
                            ?.leaveNum ? (
                            <b style={{ color: "red" }}>Unpaid</b>
                          ) : (
                            <b style={{ color: "#3CB371" }}>Paid</b>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </form>
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
